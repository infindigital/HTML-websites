<?php
$crumbs = [['Our Facilities','']];
$meta = [
    'title' => 'Our Facilities — CT Scan, Emergency, ICU, Lab | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Explore Life Care Bhatkal facilities: 32-slice CT scan, 24×7 accident & emergency, ICU, modular OT, ultrasound, digital X-ray, hi-tech lab, 24×7 pharmacy and comfortable in-patient rooms.',
    'route' => 'our-facilities',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$facils = content('facilities');
$cts    = content('ct_scans');
$labs   = content('lab_tests');
$rooms  = content('rooms');
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Our Facilities', 'Advanced diagnostics, emergency care and comfortable recovery — integrated healthcare under one roof in Bhatkal.', $crumbs, 'assets/images/facilities/ct-scan.jpg');
?>

<!-- Intro split -->
<section class="section">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid tr"></span>
      <div class="frame"><?= img('assets/images/facilities/ultrasound.jpg','Modern diagnostic facilities at Life Care',['w'=>1200,'h'=>900]) ?></div>
      <div class="badge-float br"><span class="num" data-count="<?= e(setting('stat_slice')) ?>"><?= e(setting('stat_slice')) ?></span><small>Slice CT Scanner</small></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Everything in one place</span>
      <h2 class="h2">Modern facilities, close to home</h2>
      <p class="lead">Life Care Specialty Hospital brings advanced medical facilities to Bhatkal so residents no longer need to travel long distances for quality diagnosis and treatment — saving time, money and worry.</p>
      <ul class="list-check">
        <li><?= icon('check') ?><span><b>Diagnostics under one roof</b> — CT, ultrasound, X-ray, ECG, ECHO and TMT.</span></li>
        <li><?= icon('check') ?><span><b>24×7 services</b> — emergency, pharmacy and laboratory that never close.</span></li>
        <li><?= icon('check') ?><span><b>Safe treatment &amp; recovery</b> — modular OT, ICU and comfortable rooms.</span></li>
      </ul>
      <a href="<?= url('contact') ?>" class="btn btn-primary">Enquire about a facility <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<!-- All facilities grid -->
<section class="section bg-soft">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">What we offer</span>
      <h2 class="h2">Complete list of facilities</h2>
      <p>From advanced imaging to round-the-clock support services, every facility is designed for accessible, quality care.</p>
    </div>
    <div class="grid feature-grid" data-stagger>
      <?php foreach ($facils as $f): ?>
        <div class="feature" id="<?= e($f['anchor']) ?>">
          <span class="ic"><?= icon($f['icon']) ?></span>
          <h3><?= e($f['title']) ?></h3>
          <p><?= e($f['text']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CT scan feature -->
<section class="section" id="ct-scan">
  <div class="container split reverse">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid bl"></span>
      <div class="frame"><?= img('assets/images/facilities/ct-scan.jpg','32-slice CT scanner at Life Care Bhatkal',['w'=>1200,'h'=>850]) ?></div>
      <div class="badge-float tl"><span class="chip"><?= icon('scan') ?>32-Slice</span></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Advanced imaging</span>
      <h2 class="h2">32-Slice CT Scan in Bhatkal</h2>
      <p class="lead">High-resolution CT imaging for fast, precise diagnosis — now available locally, supported by our full-time in-house radiologist.</p>
      <div class="tag-list mt-2">
        <?php foreach ($cts as $c): ?><span class="chip"><?= e($c) ?></span><?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<!-- Laboratory feature -->
<section class="section bg-mint" id="lab">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <div class="frame"><?= img('assets/images/facilities/lab.jpg','Hi-tech laboratory at Life Care',['w'=>1200,'h'=>850]) ?></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Hi-Tech Laboratory</span>
      <h2 class="h2">Full pathology, available 24×7</h2>
      <p class="lead">A complete diagnostic laboratory operating round the clock, all days — so essential tests are always within reach.</p>
      <div class="tag-list mt-2">
        <?php foreach ($labs as $l): ?><span class="chip"><?= e($l) ?></span><?php endforeach; ?>
      </div>
    </div>
  </div>
</section>

<!-- Rooms -->
<section class="section" id="rooms">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Comfortable recovery</span>
      <h2 class="h2">In-patient wards &amp; rooms</h2>
      <p>A choice of well-appointed rooms designed for rest, dignity and a comfortable recovery.</p>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))" data-stagger>
      <?php foreach ($rooms as $r): ?>
        <div class="card">
          <div class="card-media"><?= img($r['image'], e($r['title']) . ' — Life Care Bhatkal', ['w'=>560,'h'=>385]) ?></div>
          <div class="card-body">
            <h3><?= e($r['title']) ?></h3>
            <p><?= e($r['text']) ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section bg-teal" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow on-dark center-line">Need care today?</span>
    <h2 class="h2" style="color:#fff;margin:14px 0">Our facilities are ready when you are</h2>
    <p class="lead" style="color:rgba(255,255,255,.86)">Call us for appointments, diagnostics or emergencies — our team is available round the clock.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= e(tel_href(setting('phone1'))) ?>" class="btn btn-light btn-lg"><?= icon('phone') ?>Call <?= e(setting('phone1')) ?></a>
      <a href="<?= url('departments') ?>" class="btn btn-on-dark btn-lg">View departments <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
