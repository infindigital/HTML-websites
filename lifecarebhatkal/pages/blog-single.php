<?php
$slug = $params['slug'] ?? '';
$post = get_post($slug);
if (!$post) {
    http_response_code(404);
    require ROOT_PATH . '/pages/404.php';
    return;
}
$crumbs = [['Blog','blog'], [$post['title'],'']];
$related = array_values(array_filter(get_posts(), fn($p) => $p['slug'] !== $slug));
$related = array_slice($related, 0, 3);

$meta = [
    'title' => ($post['seo_title'] ?? $post['title']),
    'desc'  => ($post['meta_description'] ?? excerpt($post['excerpt'], 26)),
    'route' => 'blog/' . $slug,
    'og'    => $post['featured_image'],
    'schema'=> [breadcrumb_schema($crumbs), [
        '@context'=>'https://schema.org','@type'=>'Article',
        'headline'=>$post['title'],
        'image'=>site_url($post['featured_image']),
        'datePublished'=>$post['publish_date'],
        'author'=>['@type'=>'Person','name'=>$post['author']],
        'publisher'=>['@type'=>'Organization','name'=>setting('site_name')],
        'mainEntityOfPage'=>site_url('blog/'.$slug),
    ]],
];
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero($post['title'], '', $crumbs, $post['featured_image']);
?>

<section class="section">
  <div class="container" style="max-width:820px">
    <div class="tag-list" data-reveal style="margin-bottom:22px">
      <span class="chip"><?= e($post['category']) ?></span>
      <span class="chip"><?= icon('clock') ?><?= e(fmt_date($post['publish_date'])) ?></span>
      <span class="chip"><?= icon('users') ?><?= e($post['author']) ?></span>
    </div>
    <article class="prose" data-reveal><?= $post['content'] ?></article>

    <div class="divider" style="margin:32px 0"></div>
    <div class="flex gap wrap items-center" style="justify-content:space-between">
      <a href="<?= url('blog') ?>" class="text-link"><?= icon('arrow') ?> Back to all articles</a>
      <a href="<?= e(wa_href(setting('whatsapp'), 'I read your article "' . $post['title'] . '" and would like to enquire.')) ?>" class="btn btn-ghost" target="_blank" rel="noopener"><?= icon('whatsapp') ?>Ask a question</a>
    </div>
  </div>
</section>

<?php if ($related): ?>
<section class="section bg-soft">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Keep reading</span>
      <h2 class="h2">Related articles</h2>
    </div>
    <div class="grid dept-grid" data-stagger>
      <?php foreach ($related as $p): ?>
        <a class="dept-card" href="<?= url('blog/' . $p['slug']) ?>">
          <div class="card-media"><?= img($p['featured_image'], e($p['title']), ['w'=>560,'h'=>350]) ?></div>
          <div class="card-body">
            <span class="badge badge-teal"><?= e($p['category']) ?></span>
            <h3><?= e($p['title']) ?></h3>
            <span class="text-link"><?= t('read_more') ?> <?= icon('arrow') ?></span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
