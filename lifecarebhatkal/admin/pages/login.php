<?php
/** Admin login page (standalone — no sidebar). */
$err = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify()) {
        $err = 'Session expired. Please try again.';
    } else {
        [$ok, $msg] = attempt_login(trim($_POST['username'] ?? ''), (string)($_POST['password'] ?? ''));
        if ($ok) { flash('ok', $msg); redirect('dashboard'); }
        $err = $msg;
    }
}
$dbMissing = defined('CONFIG_MISSING') || !db();
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Admin Login · Life Care</title>
<link rel="icon" type="image/png" sizes="32x32" href="<?= asset('images/brand/favicon-32.png') ?>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="<?= asset('css/main.css') ?>">
<link rel="stylesheet" href="<?= url('admin/assets/admin.css') ?>">
</head>
<body class="adm-login-body">
  <div class="adm-login">
    <div class="adm-login-brand"><img class="adm-logo-img" src="<?= asset('images/brand/logo-white.png') ?>" alt="Life Care Specialty Hospital"></div>
    <div class="form-card">
      <h1 style="font-size:1.5rem;margin-bottom:4px">Sign in</h1>
      <p class="muted" style="margin-bottom:22px">Manage your hospital website content.</p>
      <?php if ($dbMissing): ?>
        <div class="alert alert-err"><?= icon('close') ?> Database not connected. Create <code>config/config.php</code> and import <code>database/schema.sql</code> first.</div>
      <?php endif; ?>
      <?php if ($err): ?><div class="alert alert-err"><?= icon('close') ?> <?= e($err) ?></div><?php endif; ?>
      <form method="post" action="<?= admin_url('login') ?>">
        <?= csrf_field() ?>
        <div class="field">
          <label for="u">Username</label>
          <input id="u" type="text" name="username" autofocus required autocomplete="username">
        </div>
        <div class="field">
          <label for="p">Password</label>
          <input id="p" type="password" name="password" required autocomplete="current-password">
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-lg"><?= icon('shield') ?>Sign in</button>
      </form>
    </div>
    <p class="adm-login-foot"><a href="<?= url() ?>">← Back to website</a></p>
  </div>
</body>
</html>
