<?php
/**
 * Lightweight mail helper for enquiry / contact notifications.
 * - MAIL_METHOD 'mail'  → PHP native mail() (default; works on most Hostinger plans)
 * - MAIL_METHOD 'smtp'  → PHPMailer over SMTP if installed (composer require phpmailer/phpmailer)
 * Never throws — returns bool so the form flow continues even if mail fails.
 */

/** Persist an enquiry to the database (if available). Returns inserted id or null. */
function save_enquiry(array $d): ?int {
    $pdo = db();
    if (!$pdo) return null;
    try {
        $st = $pdo->prepare(
            "INSERT INTO enquiries (name, email, phone, subject, department, message, source, ip_address, created_at)
             VALUES (:name, :email, :phone, :subject, :department, :message, :source, :ip, NOW())"
        );
        $st->execute([
            ':name'       => $d['name']       ?? '',
            ':email'      => $d['email']      ?? '',
            ':phone'      => $d['phone']      ?? '',
            ':subject'    => $d['subject']    ?? '',
            ':department' => $d['department'] ?? '',
            ':message'    => $d['message']    ?? '',
            ':source'     => $d['source']     ?? 'contact',
            ':ip'         => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);
        return (int)$pdo->lastInsertId();
    } catch (Throwable $e) {
        return null;
    }
}

/** Build a readable plain-text body from enquiry fields. */
function enquiry_body(array $d): string {
    $lines = [
        'New enquiry from the Life Care website',
        str_repeat('=', 40), '',
        'Name:       ' . ($d['name'] ?? ''),
        'Email:      ' . ($d['email'] ?? ''),
        'Phone:      ' . ($d['phone'] ?? ''),
        'Department: ' . ($d['department'] ?? '—'),
        'Subject:    ' . ($d['subject'] ?? '—'),
        '', 'Message:', trim((string)($d['message'] ?? '')),
        '', str_repeat('-', 40),
        'Sent: ' . date('D, d M Y H:i') . ' IST',
        'IP:   ' . ($_SERVER['REMOTE_ADDR'] ?? ''),
    ];
    return implode("\n", $lines);
}

/** Send the enquiry notification email. Returns true on apparent success. */
function send_enquiry_mail(array $d): bool {
    $to      = defined('MAIL_TO') ? MAIL_TO : 'info@lifecarebhatkal.com';
    $from    = defined('MAIL_FROM') ? MAIL_FROM : 'no-reply@lifecarebhatkal.com';
    $fromNm  = defined('MAIL_FROM_NAME') ? MAIL_FROM_NAME : 'Life Care Website';
    $subject = 'Website Enquiry: ' . (($d['subject'] ?? '') ?: 'General') . ' — ' . ($d['name'] ?? '');
    $body    = enquiry_body($d);
    $method  = defined('MAIL_METHOD') ? MAIL_METHOD : 'mail';

    // --- SMTP via PHPMailer (optional) ---
    if ($method === 'smtp' && class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
        try {
            $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = SMTP_HOST;
            $mail->SMTPAuth   = true;
            $mail->Username   = SMTP_USER;
            $mail->Password   = SMTP_PASS;
            $mail->SMTPSecure = SMTP_SECURE;
            $mail->Port       = SMTP_PORT;
            $mail->setFrom($from, $fromNm);
            $mail->addAddress($to);
            if (!empty($d['email'])) $mail->addReplyTo($d['email'], $d['name'] ?? '');
            $mail->Subject = $subject;
            $mail->Body    = $body;
            return $mail->send();
        } catch (Throwable $e) {
            // fall through to mail()
        }
    }

    // --- Native mail() ---
    $headers   = [];
    $headers[] = 'From: ' . $fromNm . ' <' . $from . '>';
    if (!empty($d['email']) && filter_var($d['email'], FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $d['email'];
    }
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'X-Mailer: PHP/' . phpversion();
    try {
        return @mail($to, $subject, $body, implode("\r\n", $headers));
    } catch (Throwable $e) {
        return false;
    }
}
