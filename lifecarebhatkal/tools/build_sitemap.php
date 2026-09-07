<?php
/**
 * Sitemap generator. Reads seed_data (departments, doctors, posts, events)
 * and writes sitemap.xml. Re-run after adding content:  php tools/build_sitemap.php
 */
declare(strict_types=1);
define('ROOT_PATH', dirname(__DIR__));
$seed = require ROOT_PATH . '/includes/seed_data.php';

// Base URL — from config if present, else production default.
$base = 'https://lifecarebhatkal.com';
if (is_file(ROOT_PATH . '/config/config.php')) {
    $src = file_get_contents(ROOT_PATH . '/config/config.php');
    if (preg_match("/define\(\s*'BASE_URL'\s*,\s*'([^']+)'/", $src, $m)) $base = rtrim($m[1], '/');
}

$today = date('Y-m-d');
$urls = [];
$add = function(string $loc, string $prio = '0.6', string $freq = 'monthly') use (&$urls, $base, $today) {
    $urls[] = ['loc'=>$base . '/' . ltrim($loc, '/'), 'prio'=>$prio, 'freq'=>$freq, 'last'=>$today];
};

// Static pages
$add('', '1.0', 'weekly');
foreach (['about-us','our-facilities','departments','why-choose-us','doctors','visiting-doctors',
          'support-staff','careers','events','gallery','blog','patient-information','contact'] as $p) {
    $add($p, '0.8', 'monthly');
}
// Dynamic
foreach ($seed['departments'] as $d) $add('departments/' . $d['slug'], '0.7');
foreach ($seed['doctors'] as $d)     $add('doctors/' . $d['id'], '0.6');
foreach ($seed['posts'] as $p)       $add('blog/' . $p['slug'], '0.6');

$xml  = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
    $xml .= "  <url>\n    <loc>" . htmlspecialchars($u['loc'], ENT_XML1) . "</loc>\n"
          . "    <lastmod>{$u['last']}</lastmod>\n"
          . "    <changefreq>{$u['freq']}</changefreq>\n"
          . "    <priority>{$u['prio']}</priority>\n  </url>\n";
}
$xml .= "</urlset>\n";

file_put_contents(ROOT_PATH . '/sitemap.xml', $xml);
echo 'Wrote sitemap.xml with ' . count($urls) . " URLs (base: $base)\n";
