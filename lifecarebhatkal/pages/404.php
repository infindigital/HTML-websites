<?php
if (!headers_sent()) http_response_code(404);
$meta = [
    'title' => 'Page Not Found | ' . setting('site_name'),
    'desc'  => 'The page you were looking for could not be found.',
    'route' => '404',
    'body_class' => 'is-404',
];
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
?>

<section class="section" style="text-align:center;min-height:52vh;display:flex;align-items:center">
  <div class="container" style="max-width:640px">
    <span class="display" style="font-size:clamp(4rem,14vw,8rem);color:var(--teal-600);line-height:1;font-family:var(--f-display)">404</span>
    <h1 class="h2" style="margin:12px 0">We couldn't find that page</h1>
    <p class="lead">The page may have moved or no longer exists. Let's get you back to care.</p>
    <div class="flex gap wrap center mt-3" style="justify-content:center">
      <a href="<?= url() ?>" class="btn btn-primary btn-lg"><?= icon('arrow') ?>Back to home</a>
      <a href="<?= url('departments') ?>" class="btn btn-ghost btn-lg">Departments</a>
      <a href="<?= url('contact') ?>" class="btn btn-ghost btn-lg">Contact us</a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
