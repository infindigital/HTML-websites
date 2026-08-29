<?php
/**
 * Flash Print Solution — mail configuration (SAMPLE).
 *
 * Copy this file to "send.config.php" and fill in the real values, then keep
 * send.config.php OUT of version control (see .gitignore). Alternatively, set
 * the same names as environment variables on the server and delete this file.
 *
 *   cp send.config.sample.php send.config.php
 */

/* Gmail SMTP host/port — leave as-is for a standard Gmail / Google Workspace box */
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', '587'); // 587 = STARTTLS

/* The Gmail address that will authenticate and send the mail */
define('SMTP_USER', 'your-account@gmail.com');

/**
 * A Google **App Password** (NOT the account login password).
 * Create one at: Google Account → Security → 2-Step Verification → App passwords.
 * It is a 16-character code, shown here without spaces, and can be revoked anytime.
 */
define('SMTP_PASS', 'xxxxxxxxxxxxxxxx');

/* Where enquiries are delivered */
define('MAIL_TO', 'sales@flashprintsolution.com');

/* The visible "From" — must be the Gmail account above or a verified alias of it */
define('MAIL_FROM', 'your-account@gmail.com');

define('SITE_NAME', 'Flash Print Solution');
