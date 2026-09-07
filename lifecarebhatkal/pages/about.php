<?php
$crumbs = [['About Us','']];
$meta = [
    'title' => 'About Us | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'About Life Care Specialty Hospital, Bhatkal — our mission, vision, aims and leadership. Bringing accessible, compassionate, technology-enabled healthcare to Bhatkal.',
    'route' => 'about-us',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$board = content('board');
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('About Life Care', 'Bringing modern health facilities, advanced diagnostics and compassionate care to Bhatkal and its surroundings.', $crumbs, 'assets/images/about/about-2.jpg');
?>

<!-- Overview -->
<section class="section">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid tr"></span>
      <div class="frame"><?= img('assets/images/about/about-1.jpg','Life Care Specialty Hospital, Bhatkal',['w'=>1200,'h'=>900]) ?></div>
      <div class="badge-float br"><span class="num" data-count="<?= e(setting('stat_years')) ?>"><?= e(setting('stat_years')) ?></span><small>Serving Bhatkal</small></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Who we are</span>
      <h2 class="h2">Healthcare, reimagined for our town</h2>
      <p class="serif-italic" style="font-size:1.3rem;color:var(--teal-700);margin-bottom:18px">“<?= e(content('about_quote')) ?>”</p>
      <div class="prose" style="max-width:none"><?= content('about_overview') ?></div>
    </div>
  </div>
</section>

<!-- Aims & Objectives -->
<section class="section bg-soft">
  <div class="container split reverse">
    <div class="split-media" data-reveal="clip">
      <div class="frame"><?= img('assets/images/about/stethoscope.jpg','Compassionate care at Life Care',['w'=>1200,'h'=>900]) ?></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Our purpose</span>
      <h2 class="h2">Aims &amp; objectives</h2>
      <ul class="list-check">
        <?php foreach (content('aims') as $a): ?><li><?= icon('check') ?><span><?= e($a) ?></span></li><?php endforeach; ?>
      </ul>
    </div>
  </div>
</section>

<!-- Mission & Vision -->
<section class="section">
  <div class="container">
    <div class="grid" style="grid-template-columns:1fr 1fr;gap:clamp(24px,3vw,40px)" data-stagger>
      <div class="feature" style="background:var(--teal-800);color:#fff;border:0">
        <span class="ic" style="background:rgba(255,255,255,.14);color:#fff"><?= icon('shield') ?></span>
        <h3 style="color:#fff">Our Mission</h3>
        <p style="color:rgba(255,255,255,.85)"><?= e(content('mission')) ?></p>
      </div>
      <div class="feature" style="background:var(--teal-50);border-color:var(--teal-100)">
        <span class="ic"><?= icon('award') ?></span>
        <h3>Our Vision</h3>
        <p><?= e(content('vision')) ?></p>
        <div class="pill-list mt-2">
          <?php foreach (content('vision_pillars') as $p): ?><span class="p"><?= e($p) ?></span><?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Board / Leadership -->
<section class="section bg-mint">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Leadership</span>
      <h2 class="h2">Members of the board</h2>
      <p>The people guiding Life Care's mission for Bhatkal. <em>(Leadership details to be confirmed by the client.)</em></p>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(190px,1fr))" data-stagger>
      <?php foreach ($board as $b): ?>
        <div class="doc-card">
          <div class="doc-photo" style="aspect-ratio:3/4"><?= img($b['image'], e($b['name']), ['w'=>400,'h'=>533]) ?></div>
          <div class="doc-body"><h3 style="font-size:1.05rem"><?= e($b['name']) ?></h3><div class="doc-qual"><?= e($b['role']) ?></div></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Ethics / CTA -->
<section class="section">
  <div class="container center" style="max-width:760px">
    <span class="eyebrow center-line">Our promise</span>
    <h2 class="h2" style="margin:16px 0">Ethics, trust &amp; a culture of excellence</h2>
    <p class="lead">We are driven by a culture of excellence, trust and ethics — with transparency and accountability at the heart of everything we do. Your feedback is always welcome and reaches our Hospital Administrator directly.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= url('why-choose-us') ?>" class="btn btn-primary">Why choose Life Care <?= icon('arrow') ?></a>
      <a href="<?= url('contact') ?>" class="btn btn-ghost">Share feedback</a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
