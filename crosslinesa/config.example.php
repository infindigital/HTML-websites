<?php
/**
 * Crossline — mail configuration (SAMPLE)
 * ---------------------------------------------------------------------------
 * 1. Copy this file to  config.php
 * 2. Fill in the real SMTP details below
 * 3. NEVER commit config.php — it holds a password (it is git-ignored)
 *
 * TWO SEPARATE THINGS — only one of them ever needs a password:
 *     • WHO SENDS  the mail  → SMTP_USER / SMTP_PASS  (needs a password)
 *     • WHO RECEIVES the enquiry → MAIL_TO            (no password needed)
 * So you can DELIVER to info@crosslinesa.com while SENDING from a completely
 * different account you control. The client's mailbox password is never
 * required for this.
 *
 * WHICH SMTP SHOULD I USE?  (all avoid the spam folder when set up right)
 *
 *  ── Option A · Dedicated Gmail sender → client inbox  (recommended) ───────
 *     Use a Gmail you control (e.g. smtpinfin@gmail.com) as the SENDER, and
 *     deliver every enquiry to the client's info@crosslinesa.com. You never
 *     need the client's password. This is the block filled in below.
 *
 *       SMTP_HOST = smtp.gmail.com
 *       SMTP_PORT = 587
 *       SMTP_SECURE = 'tls'
 *       SMTP_USER = the Gmail you control   (e.g. smtpinfin@gmail.com)
 *       SMTP_PASS = a Google *App Password* for THAT Gmail (NOT the login
 *                   password; create one at myaccount.google.com → Security →
 *                   2-Step Verification → App passwords — remove the spaces)
 *       SMTP_FROM = the SAME Gmail as SMTP_USER  (SPF/DKIM alignment)
 *       MAIL_TO   = info@crosslinesa.com          (the client reads here)
 *
 *       The visitor's address is set as Reply-To, so the client just hits
 *       "Reply" to answer the customer directly. Do NOT set SMTP_FROM to
 *       info@crosslinesa.com while sending through Gmail — that fails
 *       SPF/DKIM alignment and gets flagged as spam or rejected.
 *
 *  ── Option B · Hostinger mailbox (for later, when From must be on-domain) ─
 *     Only needed if the client wants the "From" to literally read
 *     info@crosslinesa.com. This DOES require that mailbox's password — but
 *     the domain owner creates it and enters it on the server; you don't have
 *     to hold it. Swap the SMTP_* lines to:
 *
 *       SMTP_HOST = smtp.hostinger.com
 *       SMTP_PORT = 465
 *       SMTP_SECURE = 'ssl'          // 465 = ssl, 587 = tls
 *       SMTP_USER = info@crosslinesa.com
 *       SMTP_PASS = that mailbox's password
 *       SMTP_FROM = info@crosslinesa.com   (same domain — auto SPF/DKIM)
 *
 * RULE: host/port/secure and user/pass must ALL belong to the same provider.
 * ---------------------------------------------------------------------------
 */

return [
    // --- SMTP transport --------------------------------------------------
    // Sender = a Gmail you control (Option A). The client's password is NOT
    // needed — enquiries are simply delivered to MAIL_TO below.
    'SMTP_HOST'   => 'smtp.gmail.com',
    'SMTP_PORT'   => 587,
    'SMTP_SECURE' => 'tls',            // 'tls' for 587, 'ssl' for 465
    'SMTP_USER'   => 'smtpinfin@gmail.com',
    'SMTP_PASS'   => 'CHANGE_ME',      // 16-char Gmail App Password, no spaces

    // --- Addresses -------------------------------------------------------
    // Where enquiries are delivered (the inbox the client reads):
    'MAIL_TO'      => 'info@crosslinesa.com',
    'MAIL_TO_NAME' => 'Crossline',

    // The header "From". For no-spam delivery this MUST match SMTP_USER (the
    // account you authenticate with). The visitor is set as Reply-To.
    'SMTP_FROM'      => 'smtpinfin@gmail.com',   // must == SMTP_USER
    'SMTP_FROM_NAME' => 'Crossline Website',

    // --- Behaviour -------------------------------------------------------
    'SMTP_DEBUG'   => false,           // true only while troubleshooting
    'ALLOW_ORIGIN' => 'https://crosslinesa.com', // '' = same-origin only
];
