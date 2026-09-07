<?php
$id  = (int)($params['id'] ?? 0);
$doc = get_doctor($id);
if (!$doc) {
    http_response_code(404);
    require ROOT_PATH . '/pages/404.php';
    return;
}
$typeLabels = ['resident'=>'Resident Consultant','visiting'=>'Visiting Specialist','support'=>'Support Staff'];
$typeLabel  = $typeLabels[$doc['doctor_type']] ?? 'Consultant';
$crumbs = [['Doctors','doctors'], [$doc['name'],'']];

// Colleagues of the same type (exclude self)
$peers = array_values(array_filter(get_doctors($doc['doctor_type']), fn($d) => (int)$d['id'] !== $id));
shuffle($peers);
$peers = array_slice($peers, 0, 4);

$meta = [
    'title' => $doc['name'] . ' — ' . $doc['designation'] . ' | ' . setting('site_name'),
    'desc'  => excerpt($doc['short_bio'] ?: $doc['full_bio'], 28),
    'route' => 'doctors/' . $id,
    'og'    => $doc['image'],
    'schema'=> [breadcrumb_schema($crumbs), [
        '@context'=>'https://schema.org','@type'=>'Physician',
        'name'=>$doc['name'],
        'medicalSpecialty'=>$doc['department'],
        'url'=>site_url('doctors/'.$id),
        'image'=>site_url($doc['image']),
        'worksFor'=>['@type'=>'Hospital','name'=>setting('site_name')],
    ]],
];
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero($doc['name'], $doc['designation'], $crumbs, 'assets/images/facilities/equipment.jpg');
?>

<section class="section">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid tr"></span>
      <div class="frame"><?= img($doc['image'], e($doc['name']) . ' — ' . e($doc['designation']), ['w'=>800,'h'=>900]) ?></div>
      <div class="badge-float br"><span class="chip"><?= icon('users') ?><?= e($typeLabel) ?></span></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow"><?= e($doc['department']) ?></span>
      <h2 class="h2"><?= e($doc['name']) ?></h2>
      <div class="doc-qual" style="font-size:1.05rem;color:var(--teal-700);font-weight:650;margin-bottom:6px"><?= e($doc['qualification']) ?></div>
      <p class="lead"><?= e($doc['short_bio']) ?></p>
      <?php if (!empty($doc['full_bio'])): ?><div class="prose" style="max-width:none"><?= $doc['full_bio'] ?></div><?php endif; ?>

      <div class="doc-meta" style="margin-top:20px">
        <div class="row"><?= icon('stethoscope') ?><span><b>Department:</b> <?= e($doc['department']) ?></span></div>
        <div class="row"><?= icon('clock') ?><span><b>Available:</b> <?= e($doc['available_days']) ?> · <?= e($doc['available_time']) ?></span></div>
        <?php if (!empty($doc['base_city'])): ?><div class="row"><?= icon('location') ?><span><b>Note:</b> <?= e($doc['base_city']) ?></span></div><?php endif; ?>
      </div>

      <?php if ($doc['doctor_type'] === 'visiting'): ?>
        <div class="alert alert-ok mt-2"><?= icon('clock') ?> This is a <b>visiting specialist</b>. Please contact reception on <a href="<?= e(tel_href(setting('phone1'))) ?>"><?= e(setting('phone1')) ?></a> for the current visiting schedule.</div>
      <?php endif; ?>

      <div class="flex gap wrap mt-2">
        <a href="<?= url('contact') ?>" class="btn btn-primary">Book an appointment <?= icon('arrow') ?></a>
        <a href="<?= e(wa_href(setting('whatsapp'), 'Hello Life Care, I would like to book an appointment with ' . $doc['name'] . '.')) ?>" class="btn btn-ghost" target="_blank" rel="noopener"><?= icon('whatsapp') ?>WhatsApp</a>
      </div>
    </div>
  </div>
</section>

<?php if ($peers): ?>
<section class="section bg-mint">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">More of our team</span>
      <h2 class="h2">Other specialists</h2>
    </div>
    <div class="grid doctor-grid" data-stagger>
      <?php foreach ($peers as $d): ?>
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

<?php require ROOT_PATH . '/includes/footer.php'; ?>
