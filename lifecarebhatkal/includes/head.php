<?php
/** <head> + opening <body>. Expects $meta (set by router). */
$m = $meta ?? [];
$title   = $m['title'] ?? (setting('site_name') . ' — ' . setting('tagline'));
$desc    = $m['desc']  ?? setting('footer_about');
$route   = $m['route'] ?? '';
$canon   = site_url($route);
$ogimg   = site_url($m['og'] ?? 'assets/images/hero/hero-1.jpg');
$lang    = $GLOBALS['LANG'] ?? 'en';
$bodyCls = $m['body_class'] ?? '';
?>
<!doctype html>
<html lang="<?= e($lang) ?>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($title) ?></title>
<meta name="description" content="<?= e($desc) ?>">
<link rel="canonical" href="<?= e($canon) ?>">
<meta name="theme-color" content="#0d6e6b">
<meta name="robots" content="index, follow">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="<?= e(setting('site_name')) ?>">
<meta property="og:title" content="<?= e($title) ?>">
<meta property="og:description" content="<?= e($desc) ?>">
<meta property="og:url" content="<?= e($canon) ?>">
<meta property="og:image" content="<?= e($ogimg) ?>">
<meta property="og:locale" content="en_IN">
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= e($title) ?>">
<meta name="twitter:description" content="<?= e($desc) ?>">
<meta name="twitter:image" content="<?= e($ogimg) ?>">

<link rel="icon" type="image/png" sizes="32x32" href="<?= asset('images/brand/favicon-32.png') ?>">
<link rel="icon" type="image/png" sizes="16x16" href="<?= asset('images/brand/favicon-16.png') ?>">
<link rel="apple-touch-icon" href="<?= asset('images/brand/apple-touch-icon.png') ?>">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap">

<link rel="stylesheet" href="<?= asset('css/main.css') ?>?v=1">
<?php if (!empty($m['home_hero'])): ?>
<link rel="stylesheet" href="<?= asset('css/hero.css') ?>?v=3">
<link rel="preload" as="image" href="<?= asset('images/hero/hero-bg-plate.webp') ?>" type="image/webp">
<link rel="preload" as="image" href="<?= asset('images/hero/hero-doctor-cut.webp') ?>" type="image/webp">
<?php elseif (!empty($m['eager_hero'])): ?>
<link rel="preload" as="image" href="<?= asset('images/hero/hero-1.webp') ?>" type="image/webp">
<?php endif; ?>

<!-- Organization / Hospital schema -->
<script type="application/ld+json"><?= json_encode([
  '@context' => 'https://schema.org', '@type' => ['Hospital','MedicalOrganization'],
  'name' => setting('site_name'),
  'url' => site_url(),
  'logo' => site_url('assets/images/brand/logo.png'),
  'image' => $ogimg,
  'telephone' => setting('phone1'),
  'email' => setting('email'),
  'slogan' => setting('tagline'),
  'medicalSpecialty' => ['Emergency','Orthopedic','Surgical','Radiography','Physiotherapy'],
  'address' => ['@type'=>'PostalAddress','streetAddress'=>'Nawayath Colony, Jali Road',
    'addressLocality'=>'Bhatkal','addressRegion'=>'Karnataka','postalCode'=>'581320','addressCountry'=>'IN'],
  'openingHours' => 'Mo-Su 00:00-23:59',
  'availableService' => ['@type'=>'MedicalProcedure','name'=>'24x7 Accident & Emergency'],
], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) ?></script>
<?php if (!empty($m['schema'])) { foreach ((array)$m['schema'] as $s) {
  echo '<script type="application/ld+json">' . json_encode($s, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE) . '</script>';
}} ?>
</head>
<body class="<?= e($bodyCls) ?>">
<a href="#main" class="btn btn-primary" style="position:absolute;left:-9999px;top:0;z-index:999" onfocus="this.style.left='12px';this.style.top='12px'" onblur="this.style.left='-9999px'">Skip to content</a>
