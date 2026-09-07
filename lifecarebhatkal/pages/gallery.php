<?php
$crumbs = [['Gallery','']];
$meta = [
    'title' => 'Photo Gallery | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Photo gallery of Life Care Specialty Hospital, Bhatkal — our facilities, operation theatres, laboratory, diagnostics, team and community events.',
    'route' => 'gallery',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$all = get_gallery();
// Group by album, preserving order
$albums = [];
foreach ($all as $g) { $albums[$g['album'] ?? 'Gallery'][] = $g; }
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Photo Gallery', 'A visual walk through Life Care — our facilities, our team and moments from our community.', $crumbs, 'assets/images/gallery/gallery-1.jpg');

// Album filter chips (progressive; sections shown by default)
?>

<?php $first = true; foreach ($albums as $name => $items): ?>
<section class="section<?= $first ? '' : ' bg-soft' ?>" id="album-<?= e(slugify($name)) ?>">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line"><?= e($name) ?></span>
      <h2 class="h2"><?= $name === 'Events' ? 'Community & event moments' : 'Facilities & hospital' ?></h2>
    </div>
    <div class="masonry" data-stagger>
      <?php foreach ($items as $g): ?>
        <button class="cell" style="border:0;padding:0;cursor:zoom-in;display:block;width:100%;background:none" data-lightbox="<?= e(url($g['image'])) ?>" data-alt="<?= e($g['title']) ?>">
          <?= img($g['image'], e($g['title']) . ' — Life Care Bhatkal', ['w'=>600,'h'=>0]) ?>
        </button>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php $first = false; endforeach; ?>

<!-- CTA -->
<section class="section bg-teal" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow on-dark center-line">Visit us</span>
    <h2 class="h2" style="color:#fff;margin:14px 0">Experience Life Care in person</h2>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= url('contact') ?>" class="btn btn-light btn-lg"><?= icon('location') ?>Find us</a>
      <a href="<?= url('events') ?>" class="btn btn-on-dark btn-lg">See our events <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
