<?php
/**
 * Front controller — clean-URL router.
 * .htaccess rewrites all requests here as ?route=<path>.
 */
// Let PHP's built-in dev server serve real static files (Apache does this via .htaccess).
if (php_sapi_name() === 'cli-server') {
    $p = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    if ($p !== '/' && is_file(__DIR__ . $p)) return false;
}

require __DIR__ . '/includes/init.php';

// ---- Resolve the route ----
$route = $_GET['route'] ?? '';
if ($route === '') {
    // fall back to REQUEST_URI when mod_rewrite isn't passing ?route=
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
    $route = trim($uri, '/');
}
$route = trim(preg_replace('#[^a-zA-Z0-9/_-]#', '', $route), '/');
$parts = $route === '' ? [] : explode('/', $route);
$seg0  = $parts[0] ?? '';
$seg1  = $parts[1] ?? '';

$GLOBALS['CURRENT_ROUTE'] = $route;

// ---- Homepage is the self-contained SPA (index.html) ----
// Serve it directly for the site root so the live homepage never depends on
// the server's DirectoryIndex order (some hosts prefer index.php over
// index.html, which would otherwise show the legacy PHP template hero).
if ($seg0 === '' || $seg0 === 'home') {
    $spa = __DIR__ . '/index.html';
    if (is_file($spa)) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile($spa);
        exit;
    }
}

// ---- Map route → view file + params ----
$view = null; $params = [];
switch ($seg0) {
    case '': case 'home':          $view = 'home'; break;
    case 'about-us':               $view = 'about'; break;
    case 'our-facilities':         $view = 'facilities'; break;
    case 'departments':
        if ($seg1) { $view = 'department'; $params['slug'] = $seg1; }
        else       { $view = 'departments'; }
        break;
    case 'why-choose-us':          $view = 'why-choose-us'; break;
    case 'doctors':
        if ($seg1) { $view = 'doctor'; $params['id'] = (int)$seg1; }
        else       { $view = 'doctors'; }
        break;
    case 'visiting-doctors':       $view = 'visiting-doctors'; break;
    case 'support-staff':          $view = 'support-staff'; break;
    case 'careers':                $view = 'careers'; break;
    case 'events':                 $view = 'events'; break;
    case 'gallery':                $view = 'gallery'; break;
    case 'blog':
        if ($seg1) { $view = 'blog-single'; $params['slug'] = $seg1; }
        else       { $view = 'blog'; }
        break;
    case 'patient-information':     $view = 'patient-information'; break;
    case 'contact':                $view = 'contact'; break;
    default:                       $view = null;
}

$file = $view ? ROOT_PATH . '/pages/' . $view . '.php' : null;
if (!$file || !is_file($file)) {
    http_response_code(404);
    $file = ROOT_PATH . '/pages/404.php';
}

require $file;
