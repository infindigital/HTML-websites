<?php
/** Admin chrome — sidebar + topbar. Call admin_head($title) then admin_foot(). */

function admin_nav_items(): array {
    global $ENTITIES;
    $items = [['dashboard','Dashboard','scan']];
    foreach ($ENTITIES as $key => $cfg) $items[] = [$key, $cfg['label'], $cfg['icon'] ?? 'check'];
    $items[] = ['enquiries','Enquiries','mail'];
    $items[] = ['settings','Site Settings','shield'];
    return $items;
}

function admin_head(string $title): void {
    $admin = current_admin();
    $cur   = $GLOBALS['ADMIN_PAGE'] ?? '';
    ?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title><?= e($title) ?> · Life Care Admin</title>
<link rel="stylesheet" href="<?= asset('css/main.css') ?>">
<link rel="stylesheet" href="<?= url('admin/assets/admin.css') ?>">
</head>
<body>
<div class="adm">
  <aside class="adm-side" id="admSide">
    <div class="adm-brand"><a href="<?= admin_url('dashboard') ?>"><span class="adm-logo"><?= icon('heart') ?></span> Life Care <b>Admin</b></a></div>
    <nav class="adm-nav">
      <?php foreach (admin_nav_items() as [$slug,$label,$ic]): ?>
        <a href="<?= admin_url($slug) ?>" class="<?= $cur===$slug?'active':'' ?>"><?= icon($ic) ?><span><?= e($label) ?></span></a>
      <?php endforeach; ?>
    </nav>
    <div class="adm-side-foot">
      <a href="<?= url() ?>" target="_blank" rel="noopener"><?= icon('globe') ?><span>View site</span></a>
      <a href="<?= admin_url('logout') ?>"><?= icon('arrow') ?><span>Log out</span></a>
    </div>
  </aside>
  <div class="adm-main">
    <header class="adm-top">
      <button class="adm-burger" id="admBurger" aria-label="Toggle menu"><?= icon('menu') ?></button>
      <h1><?= e($title) ?></h1>
      <div class="adm-user"><?= icon('users') ?><span><?= e($admin['name'] ?? $admin['username'] ?? 'Admin') ?></span></div>
    </header>
    <main class="adm-content">
      <?php foreach (take_flash() as $f): ?>
        <div class="alert alert-<?= $f['type']==='error'?'err':'ok' ?>"><?= $f['type']==='error'?icon('close'):icon('check') ?> <?= e($f['msg']) ?></div>
      <?php endforeach; ?>
<?php }

function admin_foot(): void { ?>
    </main>
  </div>
</div>
<script>
  document.getElementById('admBurger')?.addEventListener('click',function(){document.getElementById('admSide').classList.toggle('open');});
</script>
</body>
</html>
<?php }
