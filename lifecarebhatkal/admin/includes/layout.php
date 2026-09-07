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
<link rel="icon" type="image/png" sizes="32x32" href="<?= asset('images/brand/favicon-32.png') ?>">
<link rel="apple-touch-icon" href="<?= asset('images/brand/apple-touch-icon.png') ?>">
<link rel="stylesheet" href="<?= asset('css/main.css') ?>">
<link rel="stylesheet" href="<?= url('admin/assets/admin.css') ?>">
</head>
<body>
<div class="adm">
  <aside class="adm-side" id="admSide">
    <div class="adm-brand"><a href="<?= admin_url('dashboard') ?>"><img class="adm-logo-img" src="<?= asset('images/brand/logo-white.png') ?>" alt="Life Care Specialty Hospital"></a></div>
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
<div class="adm-progress" id="admBar"></div>
<script>
(function(){
  var side=document.getElementById('admSide'), bar=document.getElementById('admBar');
  document.getElementById('admBurger')&&document.getElementById('admBurger').addEventListener('click',function(){side.classList.toggle('open');});
  if(!window.fetch||!window.history.pushState||!window.DOMParser) return;
  function swap(url,push){
    bar.className='adm-progress go';
    fetch(url,{credentials:'same-origin',headers:{'X-Pjax':'1'}}).then(function(r){return r.text();}).then(function(t){
      var d=new DOMParser().parseFromString(t,'text/html');
      var nc=d.querySelector('.adm-content'), cur=document.querySelector('.adm-content');
      if(!nc||!cur){ window.location=url; return; }
      cur.replaceWith(nc);
      var tt=d.querySelector('title'); if(tt) document.title=tt.textContent;
      var h1=d.querySelector('.adm-top h1'), ch1=document.querySelector('.adm-top h1'); if(h1&&ch1) ch1.textContent=h1.textContent;
      var act=d.querySelector('.adm-nav a.active');
      document.querySelectorAll('.adm-nav a').forEach(function(a){a.classList.remove('active');});
      if(act){ document.querySelectorAll('.adm-nav a').forEach(function(a){ if(a.getAttribute('href')===act.getAttribute('href')) a.classList.add('active'); }); }
      if(push) history.pushState({p:1},'',url);
      window.scrollTo(0,0); side.classList.remove('open');
      bar.className='adm-progress done'; setTimeout(function(){ bar.className='adm-progress'; },260);
    }).catch(function(){ window.location=url; });
  }
  document.querySelectorAll('.adm-nav a').forEach(function(a){
    a.addEventListener('click',function(e){ if(e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return; e.preventDefault(); swap(a.href,true); });
  });
  window.addEventListener('popstate',function(){ swap(location.href,false); });
})();
</script>
</body>
</html>
<?php }
