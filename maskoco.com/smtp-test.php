<?php
/**
 * ---------------------------------------------------------------------------
 *  TEMPORARY SMTP TEST  —  ⚠️ DELETE THIS FILE AFTER TESTING ⚠️
 * ---------------------------------------------------------------------------
 *  Upload this into the same folder as config.php and vendor/, then visit:
 *
 *      https://maskoco.com/smtp-test.php?run=1
 *
 *  It uses your real config.php settings to send ONE test email and prints the
 *  full SMTP conversation so you can see exactly where it succeeds or fails.
 *
 *  Send the test to a specific inbox:
 *      https://maskoco.com/smtp-test.php?run=1&to=you@example.com
 *
 *  When it says SUCCESS and the mail arrives, DELETE this file — it exposes
 *  your SMTP debug output and should never stay on a live site.
 * ---------------------------------------------------------------------------
 */

declare(strict_types=1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: text/plain; charset=utf-8');

$autoload = __DIR__ . '/vendor/autoload.php';
$configPath = __DIR__ . '/config.php';

if (!is_file($autoload)) { exit("❌ vendor/autoload.php not found — upload the vendor/ folder.\n"); }
if (!is_file($configPath)) { exit("❌ config.php not found — copy config.example.php to config.php and fill it in.\n"); }

require $autoload;
$config = require $configPath;

echo "MASKO SMTP test\n";
echo str_repeat('=', 60) . "\n";
echo "Host      : {$config['SMTP_HOST']}\n";
echo "Port      : {$config['SMTP_PORT']}  (secure: {$config['SMTP_SECURE']})\n";
echo "Username  : {$config['SMTP_USER']}\n";
echo "From      : {$config['SMTP_FROM']}\n";
echo "Send to   : " . ($_GET['to'] ?? $config['MAIL_TO']) . "\n";
echo str_repeat('=', 60) . "\n\n";

if (($_GET['run'] ?? '') !== '1') {
    echo "Add ?run=1 to the URL to actually send the test.\n";
    echo "e.g.  https://maskoco.com/smtp-test.php?run=1\n";
    exit;
}

$to = $_GET['to'] ?? $config['MAIL_TO'];

$mail = new PHPMailer(true);
try {
    $mail->SMTPDebug   = SMTP::DEBUG_SERVER;   // verbose handshake output
    $mail->Debugoutput = 'echo';

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

    $mail->setFrom($config['SMTP_FROM'], $config['SMTP_FROM_NAME']);
    $mail->Sender = $config['SMTP_FROM'];
    $mail->addAddress($to);

    $mail->Subject = 'MASKO SMTP test ✔';
    $mail->Body    = "This is a test email from the MASKO contact form setup.\n"
                   . "If you can read this, SMTP is working correctly.";

    $mail->send();
    echo "\n\n✅ SUCCESS — test email sent to {$to}. Check that inbox (and Spam).\n";
    echo "Now DELETE smtp-test.php from the server.\n";
} catch (Exception $e) {
    echo "\n\n❌ FAILED to send.\n";
    echo "Reason: {$mail->ErrorInfo}\n\n";
    echo "Common fixes:\n";
    echo " • 'Username and Password not accepted' → wrong password. For Gmail use a\n";
    echo "   16-char App Password (not your normal login); for Hostinger use the\n";
    echo "   mailbox password.\n";
    echo " • 'Could not connect' / timeout → wrong host/port. Hostinger = 465/ssl,\n";
    echo "   Gmail = 587/tls. Some hosts block one port; try the other pair.\n";
    echo " • 'SMTP connect() failed' with Gmail → 2-Step Verification must be ON and\n";
    echo "   the App Password created under it.\n";
    echo " • Mail 'sends' but never arrives → check Spam, and make sure SMTP_FROM is\n";
    echo "   on a domain you're allowed to send as (see README §9).\n";
}
