<?php
/**
 * Shared helpers + data-access layer.
 * Every get_* function reads from MySQL when available and falls back to
 * includes/seed_data.php so the site renders fully even before the DB import.
 */

/* -------------------------------------------------- output helpers */
function e($s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

function seed(): array {
    static $d = null;
    if ($d === null) $d = require ROOT_PATH . '/includes/seed_data.php';
    return $d;
}

/** Root-relative URL for internal links (clean URLs). */
function url(string $path = ''): string {
    return '/' . ltrim($path, '/');
}
/** Absolute URL (for canonical / OG / schema). */
function site_url(string $path = ''): string {
    $base = defined('BASE_URL') ? rtrim(BASE_URL, '/') : '';
    return $base . '/' . ltrim($path, '/');
}
function asset(string $path): string { return url('assets/' . ltrim($path, '/')); }

/* -------------------------------------------------- images (webp + lazy) */
/**
 * Responsive <picture>/<img>. $path is web path from site root,
 * e.g. "assets/images/hero/hero-1.jpg" or an upload "uploads/doctors/x.jpg".
 */
function img(string $path, string $alt = '', array $o = []): string {
    $path = ltrim($path, '/');
    $class  = $o['class']  ?? '';
    $eager  = !empty($o['eager']);
    $w      = $o['w'] ?? null;
    $h      = $o['h'] ?? null;
    $sizes  = $o['sizes'] ?? null;
    $style  = $o['style'] ?? null;
    $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    $attrs  = 'alt="' . e($alt) . '"';
    $attrs .= $class ? ' class="' . e($class) . '"' : '';
    $attrs .= $eager ? ' loading="eager" fetchpriority="high"' : ' loading="lazy"';
    $attrs .= ' decoding="async"';
    if ($w) $attrs .= ' width="' . (int)$w . '"';
    if ($h) $attrs .= ' height="' . (int)$h . '"';
    if ($sizes) $attrs .= ' sizes="' . e($sizes) . '"';
    if ($style) $attrs .= ' style="' . e($style) . '"';

    if ($ext === 'svg') {
        return '<img src="' . url($path) . '" ' . $attrs . '>';
    }
    // Look for a .webp sibling on disk (only for bundled assets)
    $webpRel = preg_replace('/\.(jpe?g|png)$/i', '.webp', $path);
    if ($webpRel !== $path && is_file(ROOT_PATH . '/' . $webpRel)) {
        return '<picture>'
            . '<source type="image/webp" srcset="' . url($webpRel) . '">'
            . '<img src="' . url($path) . '" ' . $attrs . '></picture>';
    }
    return '<img src="' . url($path) . '" ' . $attrs . '>';
}

/* -------------------------------------------------- settings */
function load_settings(): array {
    $out = seed()['settings'];
    $pdo = db();
    if ($pdo) {
        try {
            $rows = $pdo->query('SELECT setting_key, setting_value FROM site_settings')->fetchAll();
            foreach ($rows as $r) $out[$r['setting_key']] = $r['setting_value'];
        } catch (Throwable $e) { /* table not imported yet */ }
    }
    return $out;
}
function setting(string $key, string $default = ''): string {
    return $GLOBALS['SETTINGS'][$key] ?? $default;
}

/* -------------------------------------------------- CSRF */
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}
function csrf_field(): string {
    return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
}
function csrf_verify(): bool {
    return isset($_POST['csrf'], $_SESSION['csrf'])
        && hash_equals($_SESSION['csrf'], (string)$_POST['csrf']);
}

/* -------------------------------------------------- small utils */
function slugify(string $s): string {
    $s = strtolower(trim($s));
    $s = preg_replace('/[^a-z0-9]+/', '-', $s);
    return trim($s, '-');
}
function excerpt(string $html, int $words = 26): string {
    $t = trim(preg_replace('/\s+/', ' ', strip_tags($html)));
    $a = explode(' ', $t);
    return count($a) <= $words ? $t : implode(' ', array_slice($a, 0, $words)) . '…';
}
function fmt_date($d): string {
    if (!$d) return '';
    $ts = is_numeric($d) ? (int)$d : strtotime((string)$d);
    return $ts ? date('M j, Y', $ts) : '';
}
function tel_href(string $n): string { return 'tel:' . preg_replace('/[^0-9+]/', '', $n); }
function wa_href(string $n, string $msg = ''): string {
    $n = preg_replace('/[^0-9]/', '', $n);
    if (strlen($n) === 10) $n = '91' . $n;               // add India code
    $u = 'https://wa.me/' . $n;
    return $msg ? $u . '?text=' . rawurlencode($msg) : $u;
}

/* -------------------------------------------------- data access
 * Each returns rows with the SAME keys whether from DB or seed. */
function q(string $sql, array $args = []): ?array {
    $pdo = db(); if (!$pdo) return null;
    try { $st = $pdo->prepare($sql); $st->execute($args); return $st->fetchAll(); }
    catch (Throwable $e) { return null; }
}
function q1(string $sql, array $args = []): ?array {
    $r = q($sql, $args); return $r ? ($r[0] ?? null) : null;
}

function get_departments(): array {
    $r = q("SELECT * FROM departments WHERE status='published' ORDER BY display_order, name");
    return $r ?? seed()['departments'];
}
function get_department(string $slug): ?array {
    $r = q("SELECT * FROM departments WHERE slug=? AND status='published' LIMIT 1", [$slug]);
    if ($r !== null) return $r[0] ?? null;
    foreach (seed()['departments'] as $d) if ($d['slug'] === $slug) return $d;
    return null;
}
/** $type: resident | visiting | support | null(all) */
function get_doctors(?string $type = null): array {
    if ($type) {
        $r = q("SELECT * FROM doctors WHERE status='published' AND doctor_type=? ORDER BY display_order, name", [$type]);
    } else {
        $r = q("SELECT * FROM doctors WHERE status='published' ORDER BY display_order, name");
    }
    if ($r !== null) return $r;
    return array_values(array_filter(seed()['doctors'], fn($d) => !$type || $d['doctor_type'] === $type));
}
function get_doctor(int $id): ?array {
    $r = q("SELECT * FROM doctors WHERE id=? AND status='published' LIMIT 1", [$id]);
    if ($r !== null) return $r[0] ?? null;
    foreach (seed()['doctors'] as $d) if ((int)$d['id'] === $id) return $d;
    return null;
}
function get_testimonials(): array {
    $r = q("SELECT * FROM testimonials WHERE status='published' ORDER BY display_order, id");
    return $r ?? seed()['testimonials'];
}
function get_faqs(): array {
    $r = q("SELECT * FROM faqs WHERE status='published' ORDER BY display_order, id");
    return $r ?? seed()['faqs'];
}
function get_posts(int $limit = 0, ?string $category = null): array {
    $sql = "SELECT * FROM blog_posts WHERE status='published'";
    $args = [];
    if ($category) { $sql .= " AND category=?"; $args[] = $category; }
    $sql .= " ORDER BY publish_date DESC, id DESC";
    if ($limit) $sql .= " LIMIT " . (int)$limit;
    $r = q($sql, $args);
    if ($r === null) {
        $r = seed()['posts'];
        if ($category) $r = array_values(array_filter($r, fn($p) => $p['category'] === $category));
        if ($limit) $r = array_slice($r, 0, $limit);
    }
    return $r;
}
function get_post(string $slug): ?array {
    $r = q("SELECT * FROM blog_posts WHERE slug=? AND status='published' LIMIT 1", [$slug]);
    if ($r !== null) return $r[0] ?? null;
    foreach (seed()['posts'] as $p) if ($p['slug'] === $slug) return $p;
    return null;
}
function get_events(): array {
    $r = q("SELECT * FROM events WHERE status='published' ORDER BY event_date DESC, id DESC");
    return $r ?? seed()['events'];
}
function get_gallery(): array {
    $r = q("SELECT gi.* FROM gallery_images gi ORDER BY gi.display_order, gi.id");
    return $r ?? seed()['gallery'];
}
function get_careers(): array {
    $r = q("SELECT * FROM careers WHERE status='active' ORDER BY display_order, id");
    return $r ?? seed()['careers'];
}

/* Static content blocks that live in seed only (approved copy) */
function content(string $key) { return seed()['content'][$key] ?? null; }

/** Render an inner-page hero with breadcrumb. $crumbs: [[label,url],...] (last has empty url). */
function page_hero(string $title, string $subtitle = '', array $crumbs = [], string $image = ''): void {
    $has = $image !== '';
    echo '<section class="page-hero' . ($has ? ' has-img' : '') . '">';
    if ($has) { echo '<div class="bgimg">' . img($image, e($title), ['eager'=>true]) . '</div>'; }
    echo '<div class="container">';
    if ($crumbs) {
        echo '<nav class="breadcrumb" aria-label="Breadcrumb"><a href="' . url() . '">Home</a>';
        foreach ($crumbs as $c) {
            echo icon('chevron');
            if (!empty($c[1])) echo '<a href="' . url($c[1]) . '">' . e($c[0]) . '</a>';
            else echo '<span class="current">' . e($c[0]) . '</span>';
        }
        echo '</nav>';
    }
    echo '<h1>' . e($title) . '</h1>';
    if ($subtitle) echo '<p>' . e($subtitle) . '</p>';
    echo '</div></section>';
}

/** Build BreadcrumbList JSON-LD from crumbs (label,url). */
function breadcrumb_schema(array $crumbs): array {
    $items = [['@type'=>'ListItem','position'=>1,'name'=>'Home','item'=>site_url()]];
    $i = 2;
    foreach ($crumbs as $c) {
        $items[] = ['@type'=>'ListItem','position'=>$i++,'name'=>$c[0],
            'item'=> !empty($c[1]) ? site_url($c[1]) : null];
    }
    return ['@context'=>'https://schema.org','@type'=>'BreadcrumbList','itemListElement'=>$items];
}

/** Map a department slug to an icon name (see includes/icons.php). */
function dept_icon(string $slug): string {
    $map = [
        'general-medicine' => 'stethoscope', 'gynaecology-obstetrics' => 'heart',
        'orthopaedics' => 'bone', 'general-laparoscopic-surgery' => 'surgery',
        'dental' => 'tooth', 'physiotherapy' => 'physio', 'cardiology' => 'heart',
        'neurology' => 'scan', 'dermatology' => 'stethoscope', 'psychiatry' => 'users',
        'diabetology-endocrinology' => 'lab', 'pulmonology' => 'xray',
    ];
    return $map[$slug] ?? 'stethoscope';
}
