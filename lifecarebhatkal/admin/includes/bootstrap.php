<?php
/** Admin bootstrap — loads the site core, auth and entity config. */
require dirname(__DIR__, 2) . '/includes/init.php';   // ROOT_PATH, db(), helpers, session
require __DIR__ . '/auth.php';

$ENTITIES = require ROOT_PATH . '/admin/config/entities.php';

/** Flash messages (survive one redirect). */
function flash(string $type, string $msg): void { $_SESSION['flash'][] = ['type'=>$type,'msg'=>$msg]; }
function take_flash(): array { $f = $_SESSION['flash'] ?? []; unset($_SESSION['flash']); return $f; }

/** Redirect helper. */
function redirect(string $path): void { header('Location: ' . admin_url($path)); exit; }

/** Small count helper for the dashboard. */
function tbl_count(string $table): int {
    $r = q1("SELECT COUNT(*) c FROM `$table`");
    return $r ? (int)$r['c'] : 0;
}
