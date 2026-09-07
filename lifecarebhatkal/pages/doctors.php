<?php
$crumbs = [['Our Doctors','']];
$meta = [
    'title' => 'Our Doctors | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Meet the resident consultants at Life Care Specialty Hospital, Bhatkal — experienced physicians, surgeons and specialists across medicine, orthopaedics, dental, surgery, radiology and emergency care.',
    'route' => 'doctors',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$residents = get_doctors('resident');
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Meet Our Doctors', 'Experienced resident consultants delivering everyday specialist care, supported by visiting super-specialists and a dedicated clinical team.', $crumbs, 'assets/images/facilities/equipment.jpg');
?>

<!-- Resident consultants -->
<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">In-house team</span>
      <h2 class="h2">Resident consultants</h2>
      <p>Our full-time consultants and duty doctors care for patients across departments — available during OPD hours and round the clock for emergencies.</p>
    </div>
    <div class="grid doctor-grid" data-stagger>
      <?php foreach ($residents as $d): ?>
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

<!-- Explore team -->
<section class="section-sm bg-soft">
  <div class="container">
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:clamp(20px,2.5vw,32px)" data-stagger>
      <a class="feature" style="text-decoration:none" href="<?= url('visiting-doctors') ?>">
        <span class="ic"><?= icon('users') ?></span>
        <h3>Visiting super-specialists <?= icon('arrow') ?></h3>
        <p>Cardiology, neurology and psychiatry consultations, supported by our in-house diagnostics.</p>
      </a>
      <a class="feature" style="text-decoration:none" href="<?= url('support-staff') ?>">
        <span class="ic"><?= icon('physio') ?></span>
        <h3>Support &amp; allied staff <?= icon('arrow') ?></h3>
        <p>Physiotherapists and allied health professionals supporting recovery and rehabilitation.</p>
      </a>
      <a class="feature" style="text-decoration:none" href="<?= url('departments') ?>">
        <span class="ic"><?= icon('stethoscope') ?></span>
        <h3>Browse departments <?= icon('arrow') ?></h3>
        <p>Explore all specialties and find the right consultation for your needs.</p>
      </a>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section bg-teal" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow on-dark center-line">Book with confidence</span>
    <h2 class="h2" style="color:#fff;margin:14px 0">Need to see a specialist?</h2>
    <p class="lead" style="color:rgba(255,255,255,.86)">Call our reception and we'll help you book the right doctor at a convenient time.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= e(tel_href(setting('phone1'))) ?>" class="btn btn-light btn-lg"><?= icon('phone') ?>Call <?= e(setting('phone1')) ?></a>
      <a href="<?= url('contact') ?>" class="btn btn-on-dark btn-lg">Book an appointment <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
