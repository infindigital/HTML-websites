<?php
/**
 * Crossline — mail configuration (SAMPLE)
 * ---------------------------------------------------------------------------
 * 1. Copy this file to  config.php
 * 2. Fill in the real SMTP details below
 * 3. NEVER commit config.php — it holds a password (it is git-ignored)
 *
 * WHICH SMTP SHOULD I USE?  (both avoid the spam folder when set up right)
 *
 *  ── Option A · Hostinger mailbox  (recommended for this site) ─────────────
 *     The domain crosslinesa.com is hosted on Hostinger, so sending from a
 *     Hostinger mailbox keeps the "From" address on the same domain. Hostinger
 *     signs the mail with SPF + DKIM automatically, which is the single most
 *     important thing for staying out of spam.
 *
 *       Create the mailbox in hPanel → Emails → Email Accounts
 *       (e.g. info@crosslinesa.com or noreply@crosslinesa.com), then:
 *
 *       SMTP_HOST = smtp.hostinger.com
 *       SMTP_PORT = 465
 *       SMTP_SECURE = 'ssl'          // 465 = ssl, 587 = tls
 *       SMTP_USER = the full mailbox address
 *       SMTP_PASS = that mailbox's password
 *       SMTP_FROM = the same mailbox address   (must match the domain!)
 *
 *  ── Option B · Gmail / Google Workspace SMTP ─────────────────────────────
 *       SMTP_HOST = smtp.gmail.com
 *       SMTP_PORT = 587
 *       SMTP_SECURE = 'tls'
 *       SMTP_USER = your-sender@gmail.com   (or a Workspace address)
 *       SMTP_PASS = a Google *App Password* (NOT the normal login password;
 *                   create one at  myaccount.google.com → Security →
 *                   2-Step Verification → App passwords)
 *       SMTP_FROM = the SAME Gmail/Workspace address as SMTP_USER
 *
 *       IMPORTANT with Gmail: the "From" MUST be the Gmail address you
 *       authenticate with. Setting From to info@crosslinesa.com while sending
 *       through Gmail fails SPF/DKIM alignment and gets flagged as spam or
 *       rejected. The visitor's address is used as Reply-To instead, so you
 *       still just hit "Reply" to answer them.
 *
 * In BOTH options the client's own mailbox password is never needed — only
 * the credentials of the account that SENDS the mail.
 * ---------------------------------------------------------------------------
 */

return [
    // --- SMTP transport --------------------------------------------------
    'SMTP_HOST'   => 'smtp.hostinger.com',
    'SMTP_PORT'   => 465,
    'SMTP_SECURE' => 'ssl',            // 'ssl' for 465, 'tls' for 587
    'SMTP_USER'   => 'info@crosslinesa.com',
    'SMTP_PASS'   => 'CHANGE_ME',      // mailbox password / Gmail App Password

    // --- Addresses -------------------------------------------------------
    // Where enquiries are delivered (the inbox you read):
    'MAIL_TO'      => 'info@crosslinesa.com',
    'MAIL_TO_NAME' => 'Crossline',

    // The envelope / header "From". For no-spam delivery this MUST be on the
    // domain you authenticate with (see notes above). Usually == SMTP_USER.
    'SMTP_FROM'      => 'info@crosslinesa.com',
    'SMTP_FROM_NAME' => 'Crossline Website',

    // --- Behaviour -------------------------------------------------------
    'SMTP_DEBUG'   => false,           // true only while troubleshooting
    'ALLOW_ORIGIN' => 'https://crosslinesa.com', // '' = same-origin only
];
