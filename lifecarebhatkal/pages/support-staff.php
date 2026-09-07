<?php
$crumbs = [['Support Staff','']];
$meta = [
    'title' => 'Support & Allied Health Staff | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Meet the allied health and support team at Life Care Bhatkal — physiotherapists and clinical support staff dedicated to recovery, rehabilitation and compassionate care.',
    'route' => 'support-staff',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$support = get_doctors('support');
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Support & Allied Staff', 'The dedicated professionals behind every recovery — physiotherapy and allied health experts supporting your journey back to wellbeing.', $crumbs, 'assets/images/facilities/physiotherapy.jpg');
?>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Allied health</span>
      <h2 class="h2">Physiotherapy & rehabilitation team</h2>
      <p>Our specialised physiotherapy unit supports pain relief, rehabilitation and recovery — for joints, spine, sports injuries and neurological conditions.</p>
    </div>
    <div class="grid doctor-grid" data-stagger>
      <?php foreach ($support as $d): ?>
        <a class="doc-card" href="<?= url('doctors/' . $d['id']) ?>">
          <div class="doc-photo"><?= img($d['image'], e($d['name']), ['w'=>500,'h'=>500]) ?></div>
          <div class="doc-body">
            <h3><?= e($d['name']) ?></h3>
            <div class="doc-qual"><?= e($d['qualification']) ?></div>
            <div class="doc-desig"><?= e($d['designation']) ?></div>
            <span class="dept-tag"><?= e($d['department']) ?></span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Rehabilitation focus -->
<section class="section bg-mint">
  <div class="container split reverse">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid bl"></span>
      <div class="frame"><?= img('assets/images/facilities/physiotherapy.jpg','Physiotherapy unit at Life Care Bhatkal',['w'=>1100,'h'=>820]) ?></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">What we treat</span>
      <h2 class="h2">Recovery, guided by experts</h2>
      <ul class="list-check">
        <li><?= icon('check') ?><span>Joint, knee, back &amp; neck pain relief</span></li>
        <li><?= icon('check') ?><span>Sports injury &amp; post-surgical rehabilitation</span></li>
        <li><?= icon('check') ?><span>Stroke &amp; paralysis rehabilitation</span></li>
        <li><?= icon('check') ?><span>Care for cerebral palsy &amp; Parkinson's</span></li>
      </ul>
      <a href="<?= url('departments/physiotherapy') ?>" class="btn btn-primary">Physiotherapy department <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<!-- Join CTA -->
<section class="section" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow center-line">Grow with us</span>
    <h2 class="h2" style="margin:14px 0">Join the Life Care team</h2>
    <p class="lead">We're always looking for compassionate, skilled professionals to join our growing family.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= url('careers') ?>" class="btn btn-primary btn-lg">View open positions <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
