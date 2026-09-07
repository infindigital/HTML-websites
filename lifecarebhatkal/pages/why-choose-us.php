<?php
$crumbs = [['Why Choose Us','']];
$meta = [
    'title' => 'Why Choose Us | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Why families in Bhatkal trust Life Care Specialty Hospital — 32-slice CT, 24×7 emergency & ICU, experienced specialists, affordable transparent care, hi-tech lab and 24×7 pharmacy.',
    'route' => 'why-choose-us',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$why = content('why_reasons');
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Why Choose Life Care', 'Quality treatment, modern facilities and compassionate care — reasons families across Bhatkal put their trust in us.', $crumbs, 'assets/images/about/about-2.jpg');
?>

<!-- Reasons grid -->
<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">The Life Care difference</span>
      <h2 class="h2">Reasons to choose us</h2>
      <p>We combine advanced technology with a human touch — so quality healthcare is accessible, affordable and close to home.</p>
    </div>
    <div class="grid feature-grid" data-stagger>
      <?php foreach ($why as $r): ?>
        <div class="feature">
          <span class="ic"><?= icon($r['icon']) ?></span>
          <h3><?= e($r['title']) ?></h3>
          <p><?= e($r['text']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Stats -->
<section class="section-sm bg-soft">
  <div class="container">
    <div class="stats" data-reveal>
      <?php foreach ([['stat_years','stat_years_label'],['stat_patients','stat_patients_label'],['stat_beds','stat_beds_label'],['stat_doctors','stat_doctors_label'],['stat_surgeries','stat_surgeries_label'],['stat_slice','stat_slice_label']] as $r): ?>
        <div class="stat">
          <div class="num" data-count="<?= e(setting($r[0])) ?>"><?= e(setting($r[0])) ?></div>
          <div class="lbl"><?= e(setting($r[1])) ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Mission split -->
<section class="section">
  <div class="container split reverse">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid bl"></span>
      <div class="frame"><?= img('assets/images/about/stethoscope.jpg','Compassionate care at Life Care',['w'=>1100,'h'=>820]) ?></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Our promise</span>
      <h2 class="h2">Care built on trust &amp; ethics</h2>
      <p class="lead"><?= e(content('mission')) ?></p>
      <ul class="list-check">
        <?php foreach (content('aims') as $a): ?><li><?= icon('check') ?><span><?= e($a) ?></span></li><?php endforeach; ?>
      </ul>
      <a href="<?= url('about-us') ?>" class="btn btn-primary">More about us <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section bg-teal" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow on-dark center-line">Experience the difference</span>
    <h2 class="h2" style="color:#fff;margin:14px 0">Quality healthcare, right here in Bhatkal</h2>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= url('contact') ?>" class="btn btn-light btn-lg">Book an appointment <?= icon('arrow') ?></a>
      <a href="<?= e(tel_href(setting('phone1'))) ?>" class="btn btn-on-dark btn-lg"><?= icon('phone') ?>Call us</a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
