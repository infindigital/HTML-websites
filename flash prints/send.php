<?php
/**
 * Flash Print Solution — contact form mail handler.
 *
 * Delivers contact-form enquiries by email using PHPMailer over Gmail SMTP.
 *
 * Why Gmail SMTP with an App Password works "without the client's password":
 *   You never store the Google account's real login password. Instead the
 *   account owner enables 2-Step Verification and generates a 16-character
 *   **App Password** (Google Account → Security → App passwords). That app
 *   password is used only by this script to authenticate SMTP, can be revoked
 *   at any time, and grants nothing beyond sending mail. So the site can send
 *   from the business inbox without ever holding the account password itself.
 *
 * Setup (once):
 *   1. composer require phpmailer/phpmailer      (creates vendor/)
 *   2. cp send.config.sample.php send.config.php  and fill in the values,
 *      OR set the SMTP_* environment variables on the server.
 *   3. Upload to a PHP-capable host. Point the contact form at send.php
 *      (already wired in assets/js/forms.js).
 *
 * Never commit send.config.php or vendor/ with real credentials — see .gitignore.
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');

/* ---- Only accept POST ---------------------------------------------------- */
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

/* ---- Load configuration -------------------------------------------------- */
/* Priority: send.config.php constants → environment variables → safe defaults */
$configFile = __DIR__ . '/send.config.php';
if (is_readable($configFile)) {
    require $configFile;
}
function cfg(string $const, string $env, string $default = ''): string
{
    if (defined($const)) {
        return (string) constant($const);
    }
    $v = getenv($env);
    return $v !== false && $v !== '' ? (string) $v : $default;
}

$SMTP_HOST  = cfg('SMTP_HOST', 'SMTP_HOST', 'smtp.gmail.com');
$SMTP_PORT  = (int) cfg('SMTP_PORT', 'SMTP_PORT', '587');
$SMTP_USER  = cfg('SMTP_USER', 'SMTP_USER');           // your Gmail address
$SMTP_PASS  = cfg('SMTP_PASS', 'SMTP_PASS');           // 16-char Gmail App Password
$MAIL_TO    = cfg('MAIL_TO', 'MAIL_TO', 'sales@flashprintsolution.com');
$MAIL_FROM  = cfg('MAIL_FROM', 'MAIL_FROM', $SMTP_USER); // must be the Gmail account or an alias
$SITE_NAME  = cfg('SITE_NAME', 'SITE_NAME', 'Flash Print Solution');

/* ---- Read the payload (JSON body or classic form POST) ------------------- */
$raw  = file_get_contents('php://input');
$data = [];
if ($raw !== '' && $raw !== false) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (!$data) {
    $data = $_POST;
}

$name    = trim((string) ($data['name'] ?? ''));
$email   = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));
$company = trim((string) ($data['company'] ?? '')); // honeypot

/* ---- Honeypot: silently accept bots without sending ---------------------- */
if ($company !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

/* ---- Validate ------------------------------------------------------------ */
$errors = [];
if ($name === '') {
    $errors[] = 'Please enter your name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}
if (mb_strlen($message) < 10) {
    $errors[] = 'Please add a few more details.';
}
if ($errors) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => implode(' ', $errors)]);
    exit;
}

if ($SMTP_USER === '' || $SMTP_PASS === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail service is not configured yet.']);
    exit;
}

/* ---- Locate PHPMailer ---------------------------------------------------- */
$autoload = __DIR__ . '/vendor/autoload.php';
if (is_readable($autoload)) {
    require $autoload;
} else {
    // Fallback: manual include if PHPMailer was copied to /PHPMailer/src
    $base = __DIR__ . '/PHPMailer/src/';
    foreach (['Exception.php', 'PHPMailer.php', 'SMTP.php'] as $f) {
        if (is_readable($base . $f)) {
            require $base . $f;
        }
    }
}
if (!class_exists(\PHPMailer\PHPMailer\PHPMailer::class)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail library is not installed on the server.']);
    exit;
}

/* ---- Send ---------------------------------------------------------------- */
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = $SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = $SMTP_USER;
    $mail->Password   = $SMTP_PASS;                 // Gmail App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $SMTP_PORT;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($MAIL_FROM, $SITE_NAME . ' Website');
    $mail->addAddress($MAIL_TO);
    $mail->addReplyTo($email, $name);               // reply goes straight to the visitor

    $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safeMail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safeMsg  = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    $mail->Subject = 'New enquiry from ' . $name . ' — ' . $SITE_NAME;
    $mail->isHTML(true);
    $mail->Body =
        '<h2 style="font-family:Arial,sans-serif;color:#2a160d">New website enquiry</h2>' .
        '<p style="font-family:Arial,sans-serif;color:#3f4145"><strong>Name:</strong> ' . $safeName . '<br>' .
        '<strong>Email:</strong> ' . $safeMail . '</p>' .
        '<p style="font-family:Arial,sans-serif;color:#3f4145"><strong>Message:</strong><br>' . $safeMsg . '</p>';
    $mail->AltBody =
        "New website enquiry\n\nName: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    http_response_code(500);
    // Do not leak SMTP internals to the client; log server-side instead.
    error_log('[send.php] Mail error: ' . $mail->ErrorInfo);
    echo json_encode(['ok' => false, 'error' => 'Message could not be sent. Please email us directly.']);
}
