<?php
/**
 * Public doctors endpoint — returns published doctors of a given type as JSON
 * so the public website can render them live from the dashboard database.
 *
 * GET /api/doctors.php?type=visiting  (type: visiting | resident | support)
 *
 * Degrades gracefully: if the database is not configured or a query fails it
 * returns {"ok":false, "doctors":[]} and the website keeps its built-in
 * (static) doctor list, so the page never breaks.
 */
require dirname(__DIR__) . '/includes/init.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed', 'doctors' => []]);
    exit;
}

$type = preg_replace('/[^a-z]/', '', strtolower($_GET['type'] ?? 'visiting')) ?: 'visiting';
if (!in_array($type, ['visiting', 'resident', 'support'], true)) {
    $type = 'visiting';
}

try {
    $pdo = db();
    if (!$pdo) {
        echo json_encode(['ok' => false, 'reason' => 'db-not-configured', 'doctors' => []]);
        exit;
    }
    $st = $pdo->prepare(
        "SELECT id, name, department, qualification, designation, image,
                available_days, available_time, base_city, short_bio, full_bio
           FROM doctors
          WHERE doctor_type = ? AND status = 'published'
          ORDER BY display_order, name"
    );
    $st->execute([$type]);
    $rows = $st->fetchAll();

    // Normalise nulls to empty strings for a predictable client contract.
    foreach ($rows as &$r) {
        foreach ($r as $k => $v) { if ($v === null) $r[$k] = ''; }
        $r['id'] = (int) $r['id'];
    }
    unset($r);

    echo json_encode(['ok' => true, 'type' => $type, 'doctors' => $rows], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    echo json_encode(['ok' => false, 'reason' => 'error', 'doctors' => []]);
}
