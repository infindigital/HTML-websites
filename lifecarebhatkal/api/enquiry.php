<?php
/**
 * Public enquiry endpoint — receives the website contact form and the
 * per-doctor enquiry form, saves to the `enquiries` table.
 * source: 'contact' (general) or 'doctor' (per-doctor; doctor name in subject).
 */
require dirname(__DIR__) . '/includes/init.php';
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// Honeypot — bots fill hidden "company"; silently accept and drop.
if (trim($_POST['company'] ?? '') !== '') { echo json_encode(['ok' => true]); exit; }

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$phone   = trim($_POST['phone'] ?? '');
$dept    = trim($_POST['department'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');
$source  = preg_replace('/[^a-z]/', '', strtolower($_POST['source'] ?? 'contact')) ?: 'contact';

if ($name === '' || ($email === '' && $phone === '')) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please enter your name and a phone number or email.']);
    exit;
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

try {
    $pdo = db();
    if (!$pdo) { echo json_encode(['ok' => false, 'error' => 'Server not configured yet. Please call us.']); exit; }
    $st = $pdo->prepare(
        "INSERT INTO enquiries (name, email, phone, subject, department, message, source, status, ip_address, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?, NOW())"
    );
    $st->execute([
        mb_substr($name, 0, 160), mb_substr($email, 0, 160), mb_substr($phone, 0, 40),
        mb_substr($subject, 0, 200), mb_substr($dept, 0, 160), $message,
        mb_substr($source, 0, 40), $_SERVER['REMOTE_ADDR'] ?? null,
    ]);
    // best-effort email notification (never blocks the save)
    if (function_exists('send_enquiry_mail')) { try { send_enquiry_mail(compact('name','email','phone','subject','dept','message','source')); } catch (Throwable $e) {} }
    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not save your enquiry. Please call +91 8385992233.']);
}
