<?php
/** Admin front controller. .htaccess rewrites /admin/* here. */
if (php_sapi_name() === 'cli-server') {
    $p = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    if ($p !== '/' && $p !== '/admin/' && is_file(dirname(__DIR__) . $p)) return false;
}
require __DIR__ . '/includes/bootstrap.php';
require __DIR__ . '/includes/layout.php';

// ---- Resolve admin route (strip leading /admin/) ----
$uri  = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
$path = $_GET['p'] ?? '';
if ($path === '') {
    $path = preg_replace('#^.*?/admin/?#', '', $uri);
}
$path  = trim(preg_replace('#[^a-zA-Z0-9/_-]#', '', (string)$path), '/');
$parts = $path === '' ? [] : explode('/', $path);
$seg0  = $parts[0] ?? 'dashboard';

// ---- Public route: login ----
if ($seg0 === 'login') {
    if (is_logged_in()) redirect('dashboard');
    require __DIR__ . '/pages/login.php';
    exit;
}
if ($seg0 === 'logout') { logout(); flash('ok', 'You have been logged out.'); redirect('login'); }

// ---- Everything else requires auth ----
require_login();

$GLOBALS['ADMIN_PAGE'] = $seg0;

// Entity CRUD?
if (isset($ENTITIES[$seg0])) {
    $cfg = $ENTITIES[$seg0];
    $action = $parts[1] ?? 'list';
    $id     = isset($parts[2]) ? (int)$parts[2] : null;
    require __DIR__ . '/includes/crud.php';
    switch ($action) {
        case 'new':    crud_edit($seg0, $cfg, null); break;
        case 'edit':   crud_edit($seg0, $cfg, $id); break;
        case 'delete': crud_delete($seg0, $cfg, (int)$id); break;
        default:       crud_list($seg0, $cfg);
    }
    exit;
}

// Special pages
switch ($seg0) {
    case 'dashboard':  require __DIR__ . '/pages/dashboard.php'; break;
    case 'enquiries':  require __DIR__ . '/pages/enquiries.php'; break;
    case 'settings':   require __DIR__ . '/pages/settings.php'; break;
    default:
        $GLOBALS['ADMIN_PAGE'] = 'dashboard';
        require __DIR__ . '/pages/dashboard.php';
}
