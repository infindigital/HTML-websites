<?php
$crumbs = [['Visiting Doctors','']];
$meta = [
    'title' => 'Visiting Doctors & Super-Specialists | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Visiting super-specialists at Life Care Bhatkal — cardiology, neurology and psychiatry consultations, supported by in-house ECG, ECHO, TMT and 32-slice CT. Contact reception for schedules.',
    'route' => 'visiting-doctors',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$visiting = get_doctors('visiting');
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Visiting Super-Specialists', 'Advanced specialist expertise brought to Bhatkal — supported by our in-house diagnostics, so you can consult close to home.', $crumbs, 'assets/images/facilities/ultrasound.jpg');
?>

<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">By appointment</span>
      <h2 class="h2">Our visiting specialists</h2>
      <p>Visiting super-specialists consult at Life Care on scheduled days. Please contact reception on <a href="<?= e(tel_href(setting('phone1'))) ?>" class="text-teal"><?= e(setting('phone1')) ?></a> to confirm the current schedule and book.</p>
    </div>
    <div class="grid doctor-grid" data-stagger>
      <?php foreach ($visiting as $d): ?>
        <a class="doc-card" href="<?= url('doctors/' . $d['id']) ?>">
          <div class="doc-photo"><?= img($d['image'], e($d['name']), ['w'=>500,'h'=>500]) ?><span class="badge badge-visiting" style="position:absolute;top:12px;left:12px">Visiting</span></div>
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

<!-- Supported by diagnostics -->
<section class="section bg-soft">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid tr"></span>
      <div class="frame"><?= img('assets/images/facilities/ct-scan.jpg','In-house diagnostics supporting visiting specialists',['w'=>1100,'h'=>820]) ?></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Fully supported</span>
      <h2 class="h2">Backed by in-house diagnostics</h2>
      <p class="lead">Every visiting consultation is supported by our own diagnostic services — so investigations and follow-up happen under one roof.</p>
      <ul class="list-check">
        <li><?= icon('check') ?><span><b>Cardiac</b> — ECG, ECHO and TMT, available 24×7.</span></li>
        <li><?= icon('check') ?><span><b>Imaging</b> — 32-slice CT, ultrasound and digital X-ray.</span></li>
        <li><?= icon('check') ?><span><b>Laboratory</b> — full pathology round the clock.</span></li>
      </ul>
      <a href="<?= url('our-facilities') ?>" class="btn btn-primary">Explore our facilities <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section bg-teal" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow on-dark center-line">Plan your visit</span>
    <h2 class="h2" style="color:#fff;margin:14px 0">Check the visiting schedule</h2>
    <p class="lead" style="color:rgba(255,255,255,.86)">Visiting days vary by specialty. Call reception to confirm timings and reserve your consultation.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= e(tel_href(setting('phone1'))) ?>" class="btn btn-light btn-lg"><?= icon('phone') ?>Call reception</a>
      <a href="<?= url('doctors') ?>" class="btn btn-on-dark btn-lg">Resident doctors <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
