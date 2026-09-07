<?php
/**
 * Life Care Specialty Hospital — Configuration
 * ------------------------------------------------------------------
 * 1. Copy this file to config/config.php
 * 2. Fill in your Hostinger MySQL credentials and mail settings
 * 3. NEVER commit config.php (it is git-ignored)
 */

// ---- Database (Hostinger → MySQL Databases / phpMyAdmin) ----
define('DB_HOST', 'localhost');          // Hostinger is usually 'localhost'
define('DB_NAME', 'u000000000_lifecare'); // your database name
define('DB_USER', 'u000000000_lcuser');   // your database user
define('DB_PASS', 'CHANGE_ME');            // your database password
define('DB_CHARSET', 'utf8mb4');

// ---- Site base URL (no trailing slash) ----
// Local: http://localhost:8000  |  Live: https://lifecarebhatkal.com
define('BASE_URL', 'https://lifecarebhatkal.com');

// ---- Admin session / security ----
define('SESSION_NAME', 'lifecare_sess');
define('CSRF_KEY', 'change-this-to-a-long-random-string');   // used to salt CSRF tokens
define('LOGIN_MAX_ATTEMPTS', 5);         // lock after N failed logins
define('LOGIN_LOCK_SECONDS', 900);       // 15 min lockout window

// ---- Email / Enquiry delivery ----
// The enquiry form saves to DB always. It also tries to email you.
// 'mail'  = PHP native mail() (works out-of-the-box on most Hostinger plans)
// 'smtp'  = PHPMailer over SMTP (recommended; run `composer require phpmailer/phpmailer`)
define('MAIL_METHOD', 'mail');
define('MAIL_TO',   'info@lifecarebhatkal.com');
define('MAIL_FROM', 'no-reply@lifecarebhatkal.com');
define('MAIL_FROM_NAME', 'Life Care Website');

// SMTP settings (only used when MAIL_METHOD = 'smtp')
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_PORT', 465);
define('SMTP_SECURE', 'ssl');            // 'ssl' (465) or 'tls' (587)
define('SMTP_USER', 'no-reply@lifecarebhatkal.com');
define('SMTP_PASS', 'CHANGE_ME');

// ---- Environment ----
define('APP_ENV', 'production');         // 'production' hides PHP errors
