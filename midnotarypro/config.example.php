<?php
/**
 * Midwest Apostille & Notary — mail configuration SAMPLE
 * ---------------------------------------------------------------------------
 * Copy this file to config.php on the server and fill in the real values.
 * config.php is git-ignored so credentials never enter the repo.
 *
 *     cp config.example.php config.php
 *
 * Authenticate with a sending account you control (an on-domain mailbox such
 * as no-reply@midnotarypro.com, or a Gmail App Password). Enquiries are always
 * delivered to MAIL_TO regardless of which account sends them.
 *
 *  OPTION A — on-domain mailbox (best deliverability)
 *      SMTP_HOST 'smtp.hostinger.com', SMTP_PORT 465, SMTP_SECURE 'ssl',
 *      SMTP_USER / SMTP_FROM 'no-reply@midnotarypro.com'
 *  OPTION B — Gmail App Password (defaults below)
 *      SMTP_FROM must equal SMTP_USER so SPF/DKIM stay aligned.
 * ---------------------------------------------------------------------------
 */

return [
    'SMTP_HOST'   => 'smtp.gmail.com',
    'SMTP_PORT'   => 587,
    'SMTP_SECURE' => 'tls',                        // 'tls' for 587, 'ssl' for 465

    'SMTP_USER'   => 'youragencymail@gmail.com',   // <-- EDIT
    'SMTP_PASS'   => 'xxxxxxxxxxxxxxxx',            // <-- EDIT: App Password, no spaces

    'MAIL_TO'      => 'moservices.midwest@gmail.com',
    'MAIL_TO_NAME' => 'Midwest Apostille & Notary Services',

    'SMTP_FROM'      => 'youragencymail@gmail.com', // <-- EDIT: same as SMTP_USER
    'SMTP_FROM_NAME' => 'Midwest Apostille & Notary Website',

    'SMTP_DEBUG'   => false,
    'ALLOW_ORIGIN' => 'https://midnotarypro.com',
];
