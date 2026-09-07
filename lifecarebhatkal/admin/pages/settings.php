<?php
/** Site settings key/value editor + change password. */

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify()) { flash('error', 'Session expired.'); redirect('settings'); }

    if (($_POST['form'] ?? '') === 'password') {
        [$ok, $msg] = change_password((string)($_POST['current'] ?? ''), (string)($_POST['new'] ?? ''));
        flash($ok ? 'ok' : 'error', $msg);
        redirect('settings');
    }

    // Save settings
    $vals = $_POST['s'] ?? [];
    foreach ($vals as $k => $v) {
        $k = preg_replace('/[^a-z0-9_]/', '', (string)$k);
        // upsert
        q("INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)", [$k, trim((string)$v)]);
    }
    flash('ok', 'Settings saved.');
    redirect('settings');
}

// Load current settings (DB), falling back to seed keys so nothing is missing
$rows = q("SELECT setting_key, setting_value FROM site_settings ORDER BY setting_key") ?? [];
$cur = [];
foreach ($rows as $r) $cur[$r['setting_key']] = $r['setting_value'];
$seedSettings = seed()['settings'];
$cur = $cur + $seedSettings; // ensure all keys present

// Logical grouping for a tidy UI
$groups = [
  'Contact & Identity' => ['site_name','tagline','email','phone1','phone2','whatsapp','address','address_short','established_year'],
  'Hours' => ['opd_hours','visiting_hours','pharmacy_hours','emergency_line'],
  'Trust Stats' => ['stat_years','stat_years_label','stat_patients','stat_patients_label','stat_beds','stat_beds_label','stat_doctors','stat_doctors_label','stat_surgeries','stat_surgeries_label','stat_slice','stat_slice_label'],
  'Links & Media' => ['map_embed','facebook','instagram','youtube','footer_about','copyright'],
];
$longKeys = ['address','footer_about','about','map_embed','overview'];

admin_head('Site Settings');
?>
<form method="post" action="<?= admin_url('settings') ?>">
  <?= csrf_field() ?>
  <?php foreach ($groups as $title => $keys): ?>
    <div class="adm-card" style="margin-bottom:20px">
      <h2 style="font-size:1.15rem;margin-bottom:16px"><?= e($title) ?></h2>
      <div class="adm-settings-grid">
        <?php foreach ($keys as $k): if (!array_key_exists($k, $cur)) continue; ?>
          <div class="field">
            <label for="s-<?= e($k) ?>"><?= e(ucwords(str_replace('_',' ',$k))) ?></label>
            <?php if (in_array($k, $longKeys, true)): ?>
              <textarea id="s-<?= e($k) ?>" name="s[<?= e($k) ?>]" style="min-height:80px"><?= e($cur[$k]) ?></textarea>
            <?php else: ?>
              <input id="s-<?= e($k) ?>" type="text" name="s[<?= e($k) ?>]" value="<?= e($cur[$k]) ?>">
            <?php endif; ?>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  <?php endforeach; ?>
  <button type="submit" class="btn btn-primary btn-lg"><?= icon('check') ?>Save settings</button>
</form>

<div class="adm-card" style="margin-top:28px;max-width:520px">
  <h2 style="font-size:1.15rem;margin-bottom:6px">Change password</h2>
  <p class="muted" style="margin-bottom:16px">Use a strong password of at least 8 characters.</p>
  <form method="post" action="<?= admin_url('settings') ?>">
    <?= csrf_field() ?>
    <input type="hidden" name="form" value="password">
    <div class="field"><label for="cp">Current password</label><input id="cp" type="password" name="current" required autocomplete="current-password"></div>
    <div class="field"><label for="np">New password</label><input id="np" type="password" name="new" required autocomplete="new-password"></div>
    <button type="submit" class="btn btn-primary"><?= icon('shield') ?>Update password</button>
  </form>
</div>
<?php
admin_foot();
