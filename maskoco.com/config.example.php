<?php
/**
 * MASKO — mail configuration SAMPLE
 * ---------------------------------------------------------------------------
 * HOW TO USE:  copy this file to  config.php  on the server and fill in the
 * real values.  config.php is git-ignored so credentials never enter the repo.
 *
 *     cp config.example.php config.php
 *
 * You do NOT need the client's mailbox password. Pick ONE option below.
 * Enquiries are always delivered to MAIL_TO (info@maskoco.com) — the inbox the
 * client reads — regardless of which sending account you authenticate with.
 * ---------------------------------------------------------------------------
 *
 *  OPTION A — On-domain mailbox (RECOMMENDED, best deliverability)
 *  ..........................................................................
 *  Create a mailbox on the maskoco.com hosting (e.g. Hostinger hPanel →
 *  Emails), such as  no-reply@maskoco.com  or  website@maskoco.com  — a NEW
 *  address you create, NOT the client's personal password. Then:
 *      SMTP_HOST   = 'smtp.hostinger.com'
 *      SMTP_PORT   = 465
 *      SMTP_SECURE = 'ssl'
 *      SMTP_USER   = 'no-reply@maskoco.com'   // the mailbox you created
 *      SMTP_PASS   = '<that mailbox password>'
 *      SMTP_FROM   = 'no-reply@maskoco.com'   // MUST equal SMTP_USER
 *  Because the From is on maskoco.com, the host auto-signs it with SPF + DKIM,
 *  which is the single biggest reason mail lands in the inbox, not spam.
 *
 *  OPTION B — Gmail App Password (no client password at all)
 *  ..........................................................................
 *  Use a Gmail account YOU control (e.g. an agency Gmail). Turn on 2-Step
 *  Verification, then create a 16-char App Password
 *  (myaccount.google.com → Security → App passwords). Then:
 *      SMTP_HOST   = 'smtp.gmail.com'
 *      SMTP_PORT   = 587
 *      SMTP_SECURE = 'tls'
 *      SMTP_USER   = 'youragencymail@gmail.com'
 *      SMTP_PASS   = 'xxxxxxxxxxxxxxxx'        // the 16-char App Password
 *      SMTP_FROM   = 'youragencymail@gmail.com'  // MUST equal SMTP_USER
 *  Keep SMTP_FROM = the Gmail address (aligned with what you authenticate as).
 *  Do NOT forge …@maskoco.com as the From with Gmail, or SPF/DKIM alignment
 *  fails and the mail is flagged. The visitor is set as Reply-To, so hitting
 *  "Reply" still answers the customer.
 * ---------------------------------------------------------------------------
 */

return [
    // --- SMTP transport (fill from Option A or Option B above) -----------
    'SMTP_HOST'   => 'smtp.hostinger.com',
    'SMTP_PORT'   => 465,
    'SMTP_SECURE' => 'ssl',                 // 'ssl' for 465, 'tls' for 587
    'SMTP_USER'   => 'no-reply@maskoco.com',
    'SMTP_PASS'   => 'CHANGE_ME',           // mailbox password OR Gmail App Password

    // --- Addresses -------------------------------------------------------
    // Where enquiries are delivered (the inbox the client reads):
    'MAIL_TO'      => 'info@maskoco.com',
    'MAIL_TO_NAME' => 'MASKO Contracting Company',

    // The header "From" — MUST match SMTP_USER (the account you authenticate
    // with). The visitor's address is set as Reply-To automatically.
    'SMTP_FROM'      => 'no-reply@maskoco.com',
    'SMTP_FROM_NAME' => 'MASKO Website',

    // --- Behaviour -------------------------------------------------------
    'SMTP_DEBUG'   => false,                 // true only while troubleshooting
    'ALLOW_ORIGIN' => 'https://maskoco.com', // '' = same-origin only
];
