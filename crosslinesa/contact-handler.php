<?php
/**
 * Crossline — contact / enquiry form handler
 * ---------------------------------------------------------------------------
 * Receives POSTs from the contact form (contact.html) and the FAQ "ask a
 * question" form (index.html), validates them, and emails the enquiry to the
 * business inbox via authenticated SMTP (PHPMailer).
 *
 * Anti-spam measures baked in:
 *   • Authenticated SMTP with a domain-aligned From  (SPF/DKIM friendly)
 *   • Reply-To set to the visitor  → hit Reply to answer them directly
 *   • Envelope sender aligned with From  (clean Return-Path)
 *   • Hidden honeypot field  → silently drops bots
 *   • Server-side validation of every field
 *
 * Requirements: PHP 8.0+, PHPMailer (installed via Composer in ./vendor),
 * and a filled-in ./config.php  (copy from config.example.php).
 * ---------------------------------------------------------------------------
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

/* --- Load dependencies --------------------------------------------------- */
$autoload = __DIR__ . '/vendor/autoload.php';
$configPath = __DIR__ . '/config.php';

if (!is_file($autoload) || !is_file($configPath)) {
    respond(500, false, 'The mail service is not configured yet. Please email info@crosslinesa.com directly.');
}
require $autoload;
$config = require $configPath;

/* --- CORS / method guards ------------------------------------------------ */
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowOrigin = $config['ALLOW_ORIGIN'] ?? '';
if ($allowOrigin !== '' && $origin !== '' && $origin === $allowOrigin) {
    header('Access-Control-Allow-Origin: ' . $allowOrigin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

/* --- Read input (JSON or classic form-encoded) --------------------------- */
$raw = file_get_contents('php://input');
$data = [];
if ($raw !== false && $raw !== '' && str_contains($_SERVER['CONTENT_TYPE'] ?? '', 'application/json')) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (!$data) {
    $data = $_POST;
}

/* --- Honeypot: bots fill hidden fields, humans don't --------------------- */
if (!empty(trim((string)($data['company'] ?? '')))) {
    // Pretend success so the bot moves on without learning anything.
    respond(200, true, 'Thank you for your message.');
}

/* --- Collect + validate -------------------------------------------------- */
$name    = clean($data['name']    ?? '');
$email   = clean($data['email']   ?? '');
$phone   = clean($data['phone']   ?? '');
// contact form uses "message", the FAQ form uses "question"
$message = clean($data['message'] ?? ($data['question'] ?? ''));
$source  = clean($data['form_source'] ?? 'Website');

$errors = [];
if ($name === '')                          $errors[] = 'name';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($message === '')                       $errors[] = 'message';
if (strlen($name) > 120 || strlen($email) > 190 || strlen($message) > 5000) {
    $errors[] = 'length';
}
// Header-injection guard on the name (email is validated above)
if (preg_match('/[\r\n]/', $name . $email)) {
    $errors[] = 'invalid';
}

if ($errors) {
    respond(422, false, 'Please check the highlighted fields and try again.', $errors);
}

/* --- Build + send the email --------------------------------------------- */
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = $config['SMTP_HOST'];
    $mail->Port       = (int) $config['SMTP_PORT'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['SMTP_USER'];
    $mail->Password   = $config['SMTP_PASS'];
    $mail->SMTPSecure = $config['SMTP_SECURE'] === 'tls'
        ? PHPMailer::ENCRYPTION_STARTTLS
        : PHPMailer::ENCRYPTION_SMTPS;
    $mail->CharSet    = PHPMailer::CHARSET_UTF8;

    if (!empty($config['SMTP_DEBUG'])) {
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    }

    // Domain-aligned sender keeps SPF/DKIM happy (no spam).
    $mail->setFrom($config['SMTP_FROM'], $config['SMTP_FROM_NAME']);
    $mail->Sender = $config['SMTP_FROM']; // Return-Path / envelope sender
    $mail->addAddress($config['MAIL_TO'], $config['MAIL_TO_NAME']);

    // Reply straight to the visitor.
    $mail->addReplyTo($email, $name);

    $mail->Subject = sprintf('New enquiry from %s — %s', $name, $source);

    $safeName    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safeEmail   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safePhone   = $phone !== '' ? htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') : '&mdash;';
    $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
    $safeSource  = htmlspecialchars($source, ENT_QUOTES, 'UTF-8');

    $mail->isHTML(true);
    $mail->Body = <<<HTML
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#222;line-height:1.6">
          <h2 style="margin:0 0 12px;color:#00b492">New website enquiry</h2>
          <table cellpadding="6" style="border-collapse:collapse">
            <tr><td style="color:#777">Name</td><td><strong>{$safeName}</strong></td></tr>
            <tr><td style="color:#777">Email</td><td><a href="mailto:{$safeEmail}">{$safeEmail}</a></td></tr>
            <tr><td style="color:#777">Phone</td><td>{$safePhone}</td></tr>
            <tr><td style="color:#777">Source</td><td>{$safeSource}</td></tr>
          </table>
          <p style="margin:16px 0 4px;color:#777">Message</p>
          <div style="padding:12px 14px;background:#f4f4f4;border-radius:8px">{$safeMessage}</div>
        </div>
        HTML;
    $mail->AltBody = "New website enquiry\n\n"
        . "Name: {$name}\nEmail: {$email}\nPhone: " . ($phone !== '' ? $phone : '-') . "\n"
        . "Source: {$source}\n\nMessage:\n{$message}\n";

    $mail->send();
    respond(200, true, 'Thank you! Your message has been sent — our team will get back to you shortly.');
} catch (Exception $e) {
    error_log('Crossline contact form mail error: ' . $mail->ErrorInfo);
    respond(500, false, 'Sorry, your message could not be sent right now. Please email info@crosslinesa.com or call +966 59 398 1232.');
}

/* --- Helpers ------------------------------------------------------------- */
function clean($v): string
{
    return trim((string) $v);
}

function respond(int $status, bool $ok, string $message, array $fields = []): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => $ok, 'message' => $message, 'fields' => $fields]);
    exit;
}
