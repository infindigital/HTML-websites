<?php
$crumbs = [['Events','']];
$meta = [
    'title' => 'Events & Community | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Events, celebrations and community moments at Life Care Specialty Hospital, Bhatkal — glimpses of life, care and togetherness at our hospital.',
    'route' => 'events',
    'use_swiper' => false,
    'schema'=> [breadcrumb_schema($crumbs)],
];
$events = get_events();
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Events & Community', 'Moments of celebration, gratitude and togetherness — a glimpse into life at Life Care Specialty Hospital.', $crumbs, 'assets/images/events/event-1.jpg');
?>

<section class="section">
  <div class="container">
    <?php foreach ($events as $i => $ev):
        $imgs = array_filter(array_map('trim', explode('|', (string)($ev['gallery'] ?? ''))));
        $reverse = $i % 2 === 1;
    ?>
    <div class="split <?= $reverse ? 'reverse' : '' ?>" style="margin-bottom:clamp(48px,6vw,80px)">
      <div class="split-media" data-reveal="clip">
        <span class="dot-grid <?= $reverse ? 'bl' : 'tr' ?>"></span>
        <button class="frame" style="border:0;padding:0;cursor:zoom-in;width:100%;background:none" data-lightbox="<?= e(url($ev['cover_image'])) ?>" data-alt="<?= e($ev['title']) ?>">
          <?= img($ev['cover_image'], e($ev['title']), ['w'=>1100,'h'=>760]) ?>
        </button>
      </div>
      <div class="split-body" data-reveal>
        <span class="eyebrow"><?= icon('clock') ?> <?= e(fmt_date($ev['event_date'])) ?></span>
        <h2 class="h2"><?= e($ev['title']) ?></h2>
        <div class="prose" style="max-width:none"><?= $ev['description'] ?></div>
        <?php if (count($imgs) > 1): ?>
          <div class="tag-list mt-2" style="gap:12px">
            <?php foreach ($imgs as $g): ?>
              <button style="border:0;padding:0;width:78px;height:78px;border-radius:14px;overflow:hidden;cursor:zoom-in;background:none" data-lightbox="<?= e(url($g)) ?>" data-alt="<?= e($ev['title']) ?>">
                <?= img($g, e($ev['title']) . ' photo', ['w'=>160,'h'=>160,'style'=>'width:100%;height:100%;object-fit:cover']) ?>
              </button>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- Gallery link -->
<section class="section bg-soft" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow center-line">See more</span>
    <h2 class="h2" style="margin:14px 0">Explore our photo gallery</h2>
    <p class="lead">Browse photos of our facilities, team and community moments.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= url('gallery') ?>" class="btn btn-primary btn-lg">Open gallery <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
