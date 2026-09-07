<?php
/**
 * Bootstrap — loaded by every front-end and admin request.
 * Loads config, sets up sessions, PDO, helpers and i18n.
 */
declare(strict_types=1);

define('ROOT_PATH', dirname(__DIR__));

// ---- Load config (fall back to example so the site still renders) ----
if (is_file(ROOT_PATH . '/config/config.php')) {
    require ROOT_PATH . '/config/config.php';
} else {
    require ROOT_PATH . '/config/config.example.php';
    define('CONFIG_MISSING', true);
}

// ---- Error handling ----
if (defined('APP_ENV') && APP_ENV === 'production') {
    error_reporting(0);
    ini_set('display_errors', '0');
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}

date_default_timezone_set('Asia/Kolkata');

// ---- Sessions (secure) ----
if (session_status() === PHP_SESSION_NONE) {
    session_name(defined('SESSION_NAME') ? SESSION_NAME : 'lifecare_sess');
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure'   => $secure,
    ]);
    session_start();
}

// ---- Database (PDO) ----
function db(): ?PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    if (defined('CONFIG_MISSING')) return null;
    try {
        $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
        return $pdo;
    } catch (Throwable $e) {
        return null;
    }
}

require ROOT_PATH . '/includes/functions.php';
require ROOT_PATH . '/includes/icons.php';
require ROOT_PATH . '/includes/i18n.php';

// Load site settings from DB (cached in a static)
$GLOBALS['SETTINGS'] = load_settings();
