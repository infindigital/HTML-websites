<?php
$slug = $params['slug'] ?? '';
$dept = get_department($slug);
if (!$dept) {
    http_response_code(404);
    require ROOT_PATH . '/pages/404.php';
    return;
}
$crumbs = [['Departments','departments'], [$dept['name'],'']];
$services = array_filter(array_map('trim', preg_split('/\r?\n/', (string)($dept['services'] ?? ''))));
$isVisiting = ($dept['category'] ?? '') === 'visiting';

// Related doctors (match on department name fragment) + siblings
$allDocs = get_doctors();
$key = strtok($dept['name'], ' &—');
$related = array_values(array_filter($allDocs, fn($d) => stripos($d['department'] ?? '', $key) !== false));

$depts = get_departments();
$others = array_values(array_filter($depts, fn($d) => $d['slug'] !== $slug));
shuffle($others);
$others = array_slice($others, 0, 3);

$meta = [
    'title' => ($dept['seo_title'] ?? $dept['name']),
    'desc'  => ($dept['meta_description'] ?? $dept['short_desc']),
    'route' => 'departments/' . $slug,
    'og'    => $dept['hero_image'] ?? 'assets/images/hero/hero-1.jpg',
    'schema'=> [breadcrumb_schema($crumbs), [
        '@context'=>'https://schema.org','@type'=>'MedicalClinic',
        'name'=>$dept['name'].' — '.setting('site_name'),
        'url'=>site_url('departments/'.$slug),
        'medicalSpecialty'=>$dept['name'],
        'parentOrganization'=>['@type'=>'Hospital','name'=>setting('site_name')],
    ]],
];
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero($dept['name'], $dept['short_desc'], $crumbs, $dept['hero_image'] ?? '');
?>

<section class="section">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid tr"></span>
      <div class="frame"><?= img($dept['thumb_image'], e($dept['name']) . ' at Life Care Bhatkal', ['w'=>1100,'h'=>820]) ?></div>
      <div class="badge-float br" style="display:flex;align-items:center;gap:10px">
        <span class="ic" style="width:44px;height:44px;display:inline-flex;align-items:center;justify-content:center;background:var(--teal-50);border-radius:12px;color:var(--teal-700)"><?= icon(dept_icon($slug)) ?></span>
        <small><?= $isVisiting ? 'Visiting specialty' : 'Resident specialty' ?></small>
      </div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow"><?= $isVisiting ? 'Visiting consultation' : 'Out-patient department' ?></span>
      <h2 class="h2">About <?= e($dept['name']) ?></h2>
      <div class="prose"><?= $dept['overview'] ?></div>
      <?php if ($isVisiting): ?>
        <div class="alert alert-ok mt-2"><?= icon('clock') ?> This is a <b>visiting specialist</b> service. Please contact reception on <a href="<?= e(tel_href(setting('phone1'))) ?>"><?= e(setting('phone1')) ?></a> for the current visiting schedule.</div>
      <?php endif; ?>
      <div class="flex gap wrap mt-2">
        <a href="<?= url('contact') ?>" class="btn btn-primary">Book an appointment <?= icon('arrow') ?></a>
        <a href="<?= e(wa_href(setting('whatsapp'), 'Hello Life Care, I would like to enquire about ' . $dept['name'] . '.')) ?>" class="btn btn-ghost" target="_blank" rel="noopener"><?= icon('whatsapp') ?>WhatsApp</a>
      </div>
    </div>
  </div>
</section>

<?php if ($services): ?>
<section class="section bg-soft">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Care we provide</span>
      <h2 class="h2">Services &amp; treatments</h2>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))" data-stagger>
      <?php foreach ($services as $s): ?>
        <div class="info-tile">
          <span class="ic"><?= icon('check') ?></span>
          <div><b><?= e($s) ?></b></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<?php if ($related): ?>
<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Meet the team</span>
      <h2 class="h2">Doctors in this department</h2>
    </div>
    <div class="grid doctor-grid" data-stagger>
      <?php foreach ($related as $d): ?>
        <a class="doc-card" href="<?= url('doctors/' . $d['id']) ?>">
          <div class="doc-photo"><?= img($d['image'], e($d['name']), ['w'=>500,'h'=>500]) ?></div>
          <div class="doc-body">
            <h3><?= e($d['name']) ?></h3>
            <div class="doc-qual"><?= e($d['qualification']) ?></div>
            <div class="doc-desig"><?= e($d['designation']) ?></div>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- Other departments -->
<section class="section bg-mint">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Explore more</span>
      <h2 class="h2">Other departments</h2>
    </div>
    <div class="grid dept-grid" data-stagger>
      <?php foreach ($others as $d): ?>
        <a class="dept-card" href="<?= url('departments/' . $d['slug']) ?>">
          <div class="card-media"><?= img($d['thumb_image'], e($d['name']), ['w'=>560,'h'=>350]) ?><span class="ic"><?= icon(dept_icon($d['slug'])) ?></span></div>
          <div class="card-body"><h3><?= e($d['name']) ?></h3><span class="text-link"><?= t('read_more') ?> <?= icon('arrow') ?></span></div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
