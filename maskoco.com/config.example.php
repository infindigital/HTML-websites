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
    // --- SMTP transport --------------------------------------------------
    // Defaults below are for OPTION B (Gmail App Password) — the right choice
    // when you do NOT have a mailbox on maskoco.com. You authenticate with a
    // Gmail account YOU control; no client password is ever needed. Enquiries
    // are still delivered to info@maskoco.com (see MAIL_TO below).
    //
    // >>> YOU ONLY NEED TO EDIT THE TWO LINES MARKED  <-- EDIT  <<<
    'SMTP_HOST'   => 'smtp.gmail.com',
    'SMTP_PORT'   => 587,
    'SMTP_SECURE' => 'tls',                        // 'tls' for 587, 'ssl' for 465

    'SMTP_USER'   => 'youragencymail@gmail.com',   // <-- EDIT: your Gmail address
    'SMTP_PASS'   => 'xxxxxxxxxxxxxxxx',            // <-- EDIT: 16-char Gmail App Password, NO spaces

    // --- Addresses -------------------------------------------------------
    // Where enquiries are delivered (the client's inbox). You do NOT log in to
    // this — it is only the destination, so no access/password is required.
    'MAIL_TO'      => 'info@maskoco.com',
    'MAIL_TO_NAME' => 'MASKO Contracting Company',

    // The header "From" — with Gmail this MUST equal SMTP_USER (your Gmail),
    // or SPF/DKIM alignment fails and mail may be flagged as spam. The
    // visitor's address is set as Reply-To automatically, so hitting "Reply"
    // in the info@maskoco.com inbox answers the customer directly.
    'SMTP_FROM'      => 'youragencymail@gmail.com', // <-- EDIT: same Gmail address as SMTP_USER
    'SMTP_FROM_NAME' => 'MASKO Website',

    // --- Behaviour -------------------------------------------------------
    'SMTP_DEBUG'   => false,                 // true only while troubleshooting
    'ALLOW_ORIGIN' => 'https://maskoco.com', // '' = same-origin only
];

/*
 * ---------------------------------------------------------------------------
 * TEST (you can't open info@maskoco.com, so send the test to your own inbox):
 *     https://maskoco.com/smtp-test.php?run=1&to=you@youragency.com
 * When it says SUCCESS and the mail arrives, DELETE smtp-test.php.
 *
 * ALTERNATIVE — OPTION A (on-domain mailbox, best deliverability) needs a
 * mailbox on the maskoco.com hosting, e.g. no-reply@maskoco.com:
 *     'SMTP_HOST' => 'smtp.hostinger.com', 'SMTP_PORT' => 465, 'SMTP_SECURE' => 'ssl',
 *     'SMTP_USER' => 'no-reply@maskoco.com', 'SMTP_PASS' => '<that mailbox password>',
 *     'SMTP_FROM' => 'no-reply@maskoco.com',
 * Use this only if you can create a mailbox on the domain.
 * ---------------------------------------------------------------------------
 */
