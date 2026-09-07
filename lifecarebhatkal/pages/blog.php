<?php
$crumbs = [['Blog','']];
$meta = [
    'title' => 'Health Blog & Articles | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Health articles and awareness from Life Care Specialty Hospital, Bhatkal — practical guidance on wellbeing, prevention and living well, written by our medical team.',
    'route' => 'blog',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$posts = get_posts();
$featured = $posts[0] ?? null;
$rest = array_slice($posts, 1);
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Health Blog', 'Awareness, guidance and updates from our medical team — helping you and your family stay well.', $crumbs, 'assets/images/facilities/lab.jpg');
?>

<?php if ($featured): ?>
<!-- Featured post -->
<section class="section">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid tr"></span>
      <a class="frame" href="<?= url('blog/' . $featured['slug']) ?>" style="display:block"><?= img($featured['featured_image'], e($featured['title']), ['w'=>1100,'h'=>760]) ?></a>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow"><?= icon('star') ?> Latest article</span>
      <div class="tag-list" style="margin-bottom:12px">
        <span class="chip"><?= e($featured['category']) ?></span>
        <span class="chip"><?= icon('clock') ?><?= e(fmt_date($featured['publish_date'])) ?></span>
      </div>
      <h2 class="h2"><a href="<?= url('blog/' . $featured['slug']) ?>" style="color:inherit"><?= e($featured['title']) ?></a></h2>
      <p class="lead"><?= e($featured['excerpt']) ?></p>
      <p class="muted" style="font-size:.9rem">By <?= e($featured['author']) ?></p>
      <a href="<?= url('blog/' . $featured['slug']) ?>" class="btn btn-primary mt-2">Read article <?= icon('arrow') ?></a>
    </div>
  </div>
</section>
<?php endif; ?>

<?php if ($rest): ?>
<section class="section bg-soft">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">More reading</span>
      <h2 class="h2">Recent articles</h2>
    </div>
    <div class="grid dept-grid" data-stagger>
      <?php foreach ($rest as $p): ?>
        <a class="dept-card" href="<?= url('blog/' . $p['slug']) ?>">
          <div class="card-media"><?= img($p['featured_image'], e($p['title']), ['w'=>560,'h'=>350]) ?></div>
          <div class="card-body">
            <span class="badge badge-teal"><?= e($p['category']) ?></span>
            <h3><?= e($p['title']) ?></h3>
            <p class="muted" style="font-size:.92rem"><?= e(excerpt($p['excerpt'], 20)) ?></p>
            <span class="text-link"><?= t('read_more') ?> <?= icon('arrow') ?></span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- Disclaimer -->
<section class="section-sm">
  <div class="container center" style="max-width:720px">
    <p class="muted" style="font-size:.9rem"><em>The articles on this blog are for general awareness only and are not a substitute for professional medical advice. Please consult a qualified doctor for diagnosis and treatment.</em></p>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
