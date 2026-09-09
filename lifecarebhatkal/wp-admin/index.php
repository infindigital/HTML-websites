<?php
/**
 * Convenience redirect: this site's dashboard is a standalone PHP app at
 * /admin/ (it is NOT WordPress). Anyone visiting /wp-admin out of habit is
 * sent to the real dashboard. Implemented as a physical file so it works even
 * if mod_rewrite / .htaccess is not honored by the host.
 */
header('Location: /admin/', true, 302);
echo '<!doctype html><meta charset="utf-8">'
   . '<meta http-equiv="refresh" content="0;url=/admin/">'
   . '<title>Redirecting…</title>'
   . 'Redirecting to <a href="/admin/">/admin/</a>…';
exit;
