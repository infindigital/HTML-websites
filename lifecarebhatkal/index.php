<?php
/**
 * Public front controller.
 *
 * The public website is the single-page app in index.html. This file serves
 * that SPA for EVERY public URL, so the older PHP page templates in /pages are
 * never displayed — not on the homepage, not on a deep link like
 * /departments, and not as a fallback if index.html is briefly missing during
 * an upload.
 *
 * The admin dashboard at /admin is a separate application and is handled by
 * .htaccess (RewriteRule ^admin ... [L]) before this file ever runs, so it is
 * not affected. Real files (assets, uploads, api/enquiry.php, sitemap.xml…)
 * are also served directly by .htaccess and never reach this file.
 */

// Let PHP's built-in dev server serve real static assets directly.
if (php_sapi_name() === 'cli-server') {
    $p = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    if ($p !== '/' && is_file(__DIR__ . $p)) {
        return false;
    }
}

// Serve the single-page app for every public request.
$spa = __DIR__ . '/index.html';
if (is_file($spa)) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile($spa);
    exit;
}

// index.html missing (e.g. mid-upload): show a small notice — never the old
// design.
http_response_code(503);
header('Retry-After: 30');
header('Content-Type: text/html; charset=UTF-8');
echo '<!doctype html><meta charset="utf-8">'
   . '<title>Life Care Specialty Hospital</title>'
   . '<div style="font:16px/1.6 system-ui,-apple-system,sans-serif;max-width:520px;'
   . 'margin:18vh auto;text-align:center;color:#0b2a4a;padding:0 20px">'
   . '<h1 style="font-size:20px;margin:0 0 8px">We\'ll be right back</h1>'
   . 'The website is being updated. Please refresh in a moment.</div>';
exit;
