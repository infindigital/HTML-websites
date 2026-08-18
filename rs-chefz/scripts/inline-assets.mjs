// Post-processes dist-single/index.html: every runtime image reference of the
// form ./assets/... (loaded at runtime by URL, so it bypasses the bundler) is
// replaced with a base64 data URI read from the source public/ folder. The
// result is a truly single-file page with no network dependencies.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const htmlPath = join(root, 'dist-single', 'index.html');
const publicDir = join(root, 'public');

const MIME = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

let html = readFileSync(htmlPath, 'utf8');
let replaced = 0;
let missing = 0;

for (const file of walk(join(publicDir, 'assets'))) {
  const ext = extname(file).toLowerCase();
  const mime = MIME[ext];
  if (!mime) continue;
  const rel = relative(publicDir, file).replace(/\\/g, '/'); // assets/products/.../front.webp
  const dataUri = `data:${mime};base64,${readFileSync(file).toString('base64')}`;

  // Match ./assets/... and assets/... (with either quote), replace whole token.
  const pattern = new RegExp(`(["'\`])\\.?/?${rel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
  const before = html.length;
  let hit = false;
  html = html.replace(pattern, (_m, q) => { hit = true; replaced++; return `${q}${dataUri}${q}`; });
  if (!hit) missing++;
}

writeFileSync(htmlPath, html);
const kb = (Buffer.byteLength(html) / 1024 / 1024).toFixed(2);
console.log(`inlined ${replaced} asset refs, ${missing} source files had no match; final size ${kb} MB`);
