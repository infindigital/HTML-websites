import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Produces ONE self-contained index.html (all JS/CSS inlined) into dist-single/.
// A post-build step (scripts/inline-assets.mjs) then inlines the runtime image
// assets as data URIs so the page needs zero network requests — suitable for
// publishing as a Claude Artifact / dropping on any static host as a single file.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    target: 'es2020',
    outDir: 'dist-single',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
