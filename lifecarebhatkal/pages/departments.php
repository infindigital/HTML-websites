<?php
$crumbs = [['Departments','']];
$meta = [
    'title' => 'Departments & Specialties | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Explore departments at Life Care Bhatkal — General Medicine, Gynaecology, Orthopaedics, Laparoscopic Surgery, Dental, Physiotherapy, plus visiting Cardiology, Neurology, Dermatology and more.',
    'route' => 'departments',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$depts = get_departments();
$opd   = array_values(array_filter($depts, fn($d) => $d['category'] === 'opd'));
$vis   = array_values(array_filter($depts, fn($d) => $d['category'] === 'visiting'));
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Departments & Specialties', 'Dedicated care across medicine, surgery and diagnostics — with resident consultants and visiting super-specialists.', $crumbs, 'assets/images/facilities/equipment.jpg');

$render_grid = function(array $list) {
    echo '<div class="grid dept-grid" data-stagger>';
    foreach ($list as $d) {
        echo '<a class="dept-card" href="' . url('departments/' . $d['slug']) . '">'
           . '<div class="card-media">' . img($d['thumb_image'], e($d['name']) . ' — Life Care Bhatkal', ['w'=>560,'h'=>350])
           . '<span class="ic">' . icon(dept_icon($d['slug'])) . '</span></div>'
           . '<div class="card-body">'
           . ($d['category']==='visiting' ? '<span class="badge badge-visiting">Visiting</span>' : '<span class="badge badge-teal">OPD</span>')
           . '<h3>' . e($d['name']) . '</h3>'
           . '<p class="muted" style="font-size:.92rem">' . e(excerpt($d['short_desc'], 18)) . '</p>'
           . '<span class="text-link">' . t('read_more') . ' ' . icon('arrow') . '</span>'
           . '</div></a>';
    }
    echo '</div>';
};
?>

<!-- OPD / resident specialties -->
<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">In-house specialties</span>
      <h2 class="h2">Out-patient &amp; resident departments</h2>
      <p>Everyday specialist care from our resident consultants — available during regular OPD hours, six days a week.</p>
    </div>
    <?php $render_grid($opd); ?>
  </div>
</section>

<!-- Visiting specialties -->
<section class="section bg-soft">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Visiting super-specialists</span>
      <h2 class="h2">Specialist consultations, close to home</h2>
      <p>Visiting super-specialists bring advanced expertise to Bhatkal — supported by our in-house diagnostics. Please contact reception for visiting schedules.</p>
    </div>
    <?php $render_grid($vis); ?>
  </div>
</section>

<!-- CTA -->
<section class="section" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow center-line">Not sure which department?</span>
    <h2 class="h2" style="margin:14px 0">We'll guide you to the right specialist</h2>
    <p class="lead">Call our reception and our team will help you book the right consultation for your needs.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= e(tel_href(setting('phone1'))) ?>" class="btn btn-primary btn-lg"><?= icon('phone') ?>Call reception</a>
      <a href="<?= url('doctors') ?>" class="btn btn-ghost btn-lg">Meet our doctors <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
