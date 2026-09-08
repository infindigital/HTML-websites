<?php
/** Top bar + main navigation + mobile drawer. */
$hasHero = !empty($meta['has_hero']);       // homepage: transparent header over hero
$depts   = get_departments();
$cur     = $GLOBALS['CURRENT_ROUTE'] ?? '';
$lang    = $GLOBALS['LANG'] ?? 'en';
function nav_active(string $prefix): string {
    $c = $GLOBALS['CURRENT_ROUTE'] ?? '';
    return ($c === $prefix || ($prefix !== '' && str_starts_with($c, $prefix))) ? ' aria-current="page"' : '';
}
$wa = wa_href(setting('whatsapp'), 'Hello Life Care, I would like to make an enquiry.');
?>
<!-- Top utility bar -->
<div class="topbar">
  <div class="container topbar-inner">
    <div class="topbar-info">
      <span><?= icon('mail') ?><a href="mailto:<?= e(setting('email')) ?>"><?= e(setting('email')) ?></a></span>
      <span class="hide-md"><?= icon('phone') ?><a href="<?= e(tel_href(setting('phone1'))) ?>"><?= e(setting('phone1')) ?></a> / <a href="<?= e(tel_href(setting('phone2'))) ?>"><?= e(setting('phone2')) ?></a></span>
      <?php if ($hasHero): ?>
      <span class="hide-md"><?= icon('location') ?>Nawayath Colony, Jali Road, Bhatkal</span>
      <?php else: ?>
      <span class="hide-md"><?= icon('clock') ?>OPD: <?= e(setting('opd_hours')) ?></span>
      <?php endif; ?>
    </div>
    <div class="topbar-right">
      <span class="emg"><?= icon('emergency') ?><?= e(t('emergency_line')) ?></span>
      <span class="lang-switch" role="group" aria-label="Language">
        <a href="?lang=en" class="<?= $lang==='en'?'active':'' ?>">EN</a>
        <a href="?lang=kn" class="<?= $lang==='kn'?'active':'' ?>">KN</a>
        <a href="?lang=ur" class="<?= $lang==='ur'?'active':'' ?>">UR</a>
      </span>
    </div>
  </div>
</div>

<header class="site-header<?= $hasHero ? '' : ' solid' ?>">
  <div class="nav-wrap">
    <div class="container nav-inner">
      <a href="<?= url() ?>" class="brand" aria-label="<?= e(setting('site_name')) ?> — home">
        <img src="<?= asset('images/brand/logo-white.png') ?>" alt="<?= e(setting('site_name')) ?>" class="logo-white" width="150" height="59">
        <img src="<?= asset('images/brand/logo.png') ?>" alt="<?= e(setting('site_name')) ?>" class="logo-dark" width="150" height="29">
      </a>

      <nav class="main-nav" aria-label="Primary">
        <ul class="main-nav" style="display:flex">
          <li><a href="<?= url() ?>"<?= nav_active('') ?>><?= t('nav_home') ?></a></li>
          <li class="has-dropdown">
            <a href="<?= url('about-us') ?>"<?= nav_active('about-us') ?>><?= t('nav_about') ?> <?= icon('chevron-down') ?></a>
            <div class="dropdown">
              <a href="<?= url('about-us') ?>">Overview · Mission · Vision</a>
              <a href="<?= url('why-choose-us') ?>"><?= t('nav_why') ?></a>
              <a href="<?= url('patient-information') ?>"><?= t('nav_patient') ?></a>
            </div>
          </li>
          <li><a href="<?= url('our-facilities') ?>"<?= nav_active('our-facilities') ?>><?= t('nav_facilities') ?></a></li>
          <li class="has-dropdown">
            <a href="<?= url('departments') ?>"<?= nav_active('departments') ?>><?= t('nav_departments') ?> <?= icon('chevron-down') ?></a>
            <div class="dropdown wide">
              <?php foreach ($depts as $d): ?>
                <a href="<?= url('departments/' . $d['slug']) ?>"><?= e($d['name']) ?></a>
              <?php endforeach; ?>
            </div>
          </li>
          <li class="has-dropdown">
            <a href="<?= url('doctors') ?>"<?= nav_active('doctors') ?>>Our Team <?= icon('chevron-down') ?></a>
            <div class="dropdown">
              <a href="<?= url('doctors') ?>"><?= t('nav_doctors') ?></a>
              <a href="<?= url('visiting-doctors') ?>"><?= t('nav_visiting') ?></a>
              <a href="<?= url('support-staff') ?>"><?= t('nav_support') ?></a>
              <a href="<?= url('careers') ?>"><?= t('nav_careers') ?></a>
            </div>
          </li>
          <li class="has-dropdown">
            <a href="<?= url('events') ?>"<?= nav_active('events') ?>>Media <?= icon('chevron-down') ?></a>
            <div class="dropdown">
              <a href="<?= url('events') ?>"><?= t('nav_events') ?></a>
              <a href="<?= url('gallery') ?>"><?= t('nav_gallery') ?></a>
              <a href="<?= url('blog') ?>"><?= t('nav_blog') ?></a>
            </div>
          </li>
          <li><a href="<?= url('contact') ?>"<?= nav_active('contact') ?>><?= t('nav_contact') ?></a></li>
        </ul>
      </nav>

      <div class="nav-cta">
        <a href="<?= url('contact') ?>" class="btn btn-primary"><?= icon('mail') ?><?= t('cta_enquire') ?></a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNav"><?= icon('menu') ?></button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile drawer -->
<div class="mobile-nav" id="mobileNav">
  <div class="backdrop"></div>
  <div class="panel" role="dialog" aria-label="Menu">
    <div class="mnav-head">
      <img src="<?= asset('images/brand/logo.png') ?>" alt="<?= e(setting('site_name')) ?>">
      <button class="nav-toggle" data-close aria-label="Close menu"><?= icon('close') ?></button>
    </div>
    <nav class="mnav-list" aria-label="Mobile">
      <a href="<?= url() ?>"><?= t('nav_home') ?></a>
      <div class="mnav-group"><span>About</span>
        <a href="<?= url('about-us') ?>"><?= t('nav_about') ?></a>
        <a href="<?= url('why-choose-us') ?>"><?= t('nav_why') ?></a>
        <a href="<?= url('patient-information') ?>"><?= t('nav_patient') ?></a>
      </div>
      <div class="mnav-group"><span>Care</span>
        <a href="<?= url('our-facilities') ?>"><?= t('nav_facilities') ?></a>
        <a href="<?= url('departments') ?>"><?= t('nav_departments') ?></a>
      </div>
      <div class="mnav-group"><span>Our Team</span>
        <a href="<?= url('doctors') ?>"><?= t('nav_doctors') ?></a>
        <a href="<?= url('visiting-doctors') ?>"><?= t('nav_visiting') ?></a>
        <a href="<?= url('support-staff') ?>"><?= t('nav_support') ?></a>
        <a href="<?= url('careers') ?>"><?= t('nav_careers') ?></a>
      </div>
      <div class="mnav-group"><span>Media</span>
        <a href="<?= url('events') ?>"><?= t('nav_events') ?></a>
        <a href="<?= url('gallery') ?>"><?= t('nav_gallery') ?></a>
        <a href="<?= url('blog') ?>"><?= t('nav_blog') ?></a>
      </div>
      <a href="<?= url('contact') ?>"><?= t('nav_contact') ?></a>
    </nav>
    <div class="mnav-foot">
      <a href="<?= e(tel_href(setting('phone1'))) ?>" class="btn btn-ghost btn-block"><?= icon('phone') ?><?= t('cta_call') ?> <?= e(setting('phone1')) ?></a>
      <a href="<?= e($wa) ?>" class="btn btn-primary btn-block" target="_blank" rel="noopener"><?= icon('whatsapp') ?>WhatsApp</a>
    </div>
  </div>
</div>

<main id="main">
