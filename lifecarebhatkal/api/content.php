<?php
/**
 * Public content endpoint — returns published dashboard content as JSON so the
 * public website can render blog posts and career openings live from the admin.
 *
 * GET /api/content.php?type=blog      published blog posts (newest first)
 * GET /api/content.php?type=careers   active job openings
 *
 * Degrades gracefully: if the database is not configured or a query fails it
 * returns {"ok":false,"items":[]} and the website keeps its built-in content.
 */
require dirname(__DIR__) . '/includes/init.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed', 'items' => []]);
    exit;
}

// Each entry: table, ordering, selected columns, and an OPTIONAL status value.
// When 'status' is omitted the table has no status column (e.g. gallery) and
// every row is returned.
$MAP = [
    'blog' => [
        'table'  => 'blog_posts',
        'status' => 'published',
        'order'  => 'publish_date DESC, id DESC',
        'cols'   => 'id, title, slug, category, author, publish_date, featured_image, excerpt, content',
    ],
    'careers' => [
        'table'  => 'careers',
        'status' => 'active',
        'order'  => 'display_order, id',
        'cols'   => 'id, title, department, location, type, description, requirements, apply_email',
    ],
    'departments' => [
        'table'  => 'departments',
        'status' => 'published',
        'order'  => 'display_order, id',
        'cols'   => 'id, name, slug, category, thumb_image, hero_image, short_desc, overview, services',
    ],
    'events' => [
        'table'  => 'events',
        'status' => 'published',
        'order'  => 'event_date DESC, id DESC',
        'cols'   => 'id, title, slug, event_date, cover_image, description, gallery',
    ],
    'gallery' => [
        'table'  => 'gallery_images',
        'order'  => 'display_order, id',
        'cols'   => 'id, album, title, image, display_order',
    ],
    'faqs' => [
        'table'  => 'faqs',
        'status' => 'published',
        'order'  => 'display_order, id',
        'cols'   => 'id, question, answer',
    ],
];

$type = preg_replace('/[^a-z]/', '', strtolower($_GET['type'] ?? '')) ?: '';
if (!isset($MAP[$type])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Unknown type', 'items' => []]);
    exit;
}
$cfg = $MAP[$type];

try {
    $pdo = db();
    if (!$pdo) {
        echo json_encode(['ok' => false, 'reason' => 'db-not-configured', 'items' => []]);
        exit;
    }
    if (isset($cfg['status'])) {
        $st = $pdo->prepare(
            "SELECT {$cfg['cols']} FROM {$cfg['table']} WHERE status = ? ORDER BY {$cfg['order']}"
        );
        $st->execute([$cfg['status']]);
    } else {
        $st = $pdo->prepare(
            "SELECT {$cfg['cols']} FROM {$cfg['table']} ORDER BY {$cfg['order']}"
        );
        $st->execute();
    }
    $rows = $st->fetchAll();

    foreach ($rows as &$r) {
        foreach ($r as $k => $v) { if ($v === null) $r[$k] = ''; }
        $r['id'] = (int) $r['id'];
    }
    unset($r);

    echo json_encode(['ok' => true, 'type' => $type, 'items' => $rows], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    echo json_encode(['ok' => false, 'reason' => 'error', 'items' => []]);
}
