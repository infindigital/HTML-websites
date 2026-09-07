<?php
/**
 * Generic CRUD engine driven by admin/config/entities.php.
 * One list renderer + one edit renderer + delete, for every entity.
 */

/** Handle an uploaded image for $fieldKey. Returns new web path, or $current if none. */
function handle_upload(string $fieldKey, string $entityKey, string $current): string {
    if (empty($_FILES[$fieldKey]) || ($_FILES[$fieldKey]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return $current;
    }
    $f = $_FILES[$fieldKey];
    if ($f['error'] !== UPLOAD_ERR_OK) { flash('error', 'Upload failed for ' . $fieldKey . '.'); return $current; }
    if ($f['size'] > 6 * 1024 * 1024) { flash('error', 'Image too large (max 6 MB).'); return $current; }

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime  = finfo_file($finfo, $f['tmp_name']);
    finfo_close($finfo);
    $ext = ['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'][$mime] ?? null;
    if (!$ext) { flash('error', 'Only JPG, PNG or WebP images are allowed.'); return $current; }

    $dir = ROOT_PATH . '/uploads/' . preg_replace('/[^a-z_]/', '', $entityKey);
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    $name = date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
    if (!move_uploaded_file($f['tmp_name'], $dir . '/' . $name)) {
        flash('error', 'Could not save the uploaded image.'); return $current;
    }
    return 'uploads/' . preg_replace('/[^a-z_]/', '', $entityKey) . '/' . $name;
}

/** LIST view. */
function crud_list(string $key, array $cfg): void {
    $rows = q("SELECT * FROM `{$cfg['table']}` ORDER BY {$cfg['order']}") ?? [];
    admin_head($cfg['label']);
    ?>
    <div class="adm-bar">
      <p class="muted"><?= count($rows) ?> <?= e(strtolower($cfg['label'])) ?></p>
      <a href="<?= admin_url($key . '/new') ?>" class="btn btn-primary"><?= icon('check') ?>Add <?= e($cfg['singular']) ?></a>
    </div>
    <div class="adm-card">
      <div style="overflow-x:auto">
      <table class="adm-table">
        <thead><tr>
          <?php foreach ($cfg['list_cols'] as $label): ?><th><?= e($label) ?></th><?php endforeach; ?>
          <th style="text-align:right">Actions</th>
        </tr></thead>
        <tbody>
        <?php if (!$rows): ?>
          <tr><td colspan="<?= count($cfg['list_cols'])+1 ?>" class="muted" style="padding:24px;text-align:center">No entries yet. Click “Add <?= e($cfg['singular']) ?>”.</td></tr>
        <?php endif; ?>
        <?php foreach ($rows as $r): ?>
          <tr>
            <?php foreach ($cfg['list_cols'] as $col => $label): ?>
              <td>
                <?php if ($col === 'status'): ?><span class="pill-status <?= e($r[$col] ?? '') ?>"><?= e($r[$col] ?? '') ?></span>
                <?php else: ?><?= e(mb_strimwidth((string)($r[$col] ?? ''), 0, 60, '…')) ?><?php endif; ?>
              </td>
            <?php endforeach; ?>
            <td style="text-align:right;white-space:nowrap">
              <a href="<?= admin_url($key . '/edit/' . $r['id']) ?>" class="adm-act"><?= icon('scan') ?>Edit</a>
              <form method="post" action="<?= admin_url($key . '/delete/' . $r['id']) ?>" style="display:inline" onsubmit="return confirm('Delete this <?= e($cfg['singular']) ?>? This cannot be undone.');">
                <?= csrf_field() ?>
                <button type="submit" class="adm-act danger"><?= icon('close') ?>Delete</button>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
      </div>
    </div>
    <?php
    admin_foot();
}

/** EDIT / NEW view (handles its own POST). */
function crud_edit(string $key, array $cfg, ?int $id): void {
    $isNew = !$id;
    $row = $isNew ? [] : (q1("SELECT * FROM `{$cfg['table']}` WHERE id=? LIMIT 1", [$id]) ?? []);
    if (!$isNew && !$row) { flash('error', ucfirst($cfg['singular']) . ' not found.'); redirect($key); }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!csrf_verify()) { flash('error', 'Session expired. Please try again.'); redirect($key . ($isNew ? '/new' : '/edit/' . $id)); }
        $data = []; $errors = [];
        foreach ($cfg['fields'] as [$fk,$flabel,$ftype,$opts]) {
            if ($ftype === 'image') {
                $existing = (string)($_POST['__existing_' . $fk] ?? '');
                if (!empty($_POST['__remove_' . $fk])) $existing = '';
                $data[$fk] = handle_upload($fk, $key, $existing);
            } else {
                $val = trim((string)($_POST[$fk] ?? ''));
                if (!empty($opts['required']) && $val === '') $errors[] = $flabel . ' is required.';
                if ($ftype === 'email' && $val !== '' && !filter_var($val, FILTER_VALIDATE_EMAIL)) $errors[] = $flabel . ' must be a valid email.';
                // Coerce so empty values are valid for INT / DATE columns (MySQL strict mode)
                if ($ftype === 'number')      $val = ($val === '') ? 0 : (int)$val;
                elseif ($ftype === 'date')    $val = ($val === '') ? null : $val;
                $data[$fk] = $val;
            }
        }
        if ($errors) {
            foreach ($errors as $er) flash('error', $er);
            $_SESSION['old'] = $data;
            redirect($key . ($isNew ? '/new' : '/edit/' . $id));
        }
        // Build query
        $cols = array_keys($data);
        if ($isNew) {
            $ph = implode(', ', array_fill(0, count($cols), '?'));
            $sql = "INSERT INTO `{$cfg['table']}` (`" . implode('`,`', $cols) . "`) VALUES ($ph)";
            q($sql, array_values($data));
            flash('ok', $cfg['singular'] . ' created.');
        } else {
            $set = implode(', ', array_map(fn($c) => "`$c`=?", $cols));
            q("UPDATE `{$cfg['table']}` SET $set WHERE id=?", [...array_values($data), $id]);
            flash('ok', $cfg['singular'] . ' updated.');
        }
        redirect($key);
    }

    $old = $_SESSION['old'] ?? []; unset($_SESSION['old']);
    $val = fn($k) => e((string)($old[$k] ?? $row[$k] ?? ''));
    $raw = fn($k) => (string)($old[$k] ?? $row[$k] ?? '');

    admin_head(($isNew ? 'Add ' : 'Edit ') . $cfg['singular']);
    ?>
    <div class="adm-bar">
      <a href="<?= admin_url($key) ?>" class="text-link"><?= icon('arrow') ?> Back to <?= e($cfg['label']) ?></a>
    </div>
    <form method="post" enctype="multipart/form-data" class="adm-card" style="max-width:840px">
      <?= csrf_field() ?>
      <?php foreach ($cfg['fields'] as [$fk,$flabel,$ftype,$opts]): ?>
        <div class="field">
          <label for="f-<?= e($fk) ?>"><?= e($flabel) ?><?php if (!empty($opts['required'])): ?> <span class="req">*</span><?php endif; ?></label>
          <?php if ($ftype === 'textarea' || $ftype === 'html'): ?>
            <textarea id="f-<?= e($fk) ?>" name="<?= e($fk) ?>" <?= $ftype==='html'?'style="min-height:200px;font-family:monospace;font-size:.85rem"':'' ?>><?= $val($fk) ?></textarea>
          <?php elseif ($ftype === 'select'): ?>
            <select id="f-<?= e($fk) ?>" name="<?= e($fk) ?>">
              <?php foreach ($opts['options'] as $ov => $ol): ?>
                <option value="<?= e($ov) ?>" <?= $raw($fk)===(string)$ov?'selected':'' ?>><?= e($ol) ?></option>
              <?php endforeach; ?>
            </select>
          <?php elseif ($ftype === 'image'): $cv = $raw($fk); ?>
            <div class="adm-image-field">
              <?php if ($cv): ?><div class="adm-thumb"><img src="<?= url($cv) ?>" alt=""></div><?php endif; ?>
              <div style="flex:1">
                <input type="file" id="f-<?= e($fk) ?>" name="<?= e($fk) ?>" accept="image/jpeg,image/png,image/webp">
                <input type="hidden" name="__existing_<?= e($fk) ?>" value="<?= e($cv) ?>">
                <?php if ($cv): ?><label class="adm-check"><input type="checkbox" name="__remove_<?= e($fk) ?>" value="1"> Remove current image</label><?php endif; ?>
                <p class="muted" style="font-size:.8rem;margin-top:4px">JPG, PNG or WebP · max 6 MB. Current: <?= $cv ? e($cv) : '—' ?></p>
              </div>
            </div>
          <?php elseif ($ftype === 'number'): ?>
            <input id="f-<?= e($fk) ?>" type="number" name="<?= e($fk) ?>" value="<?= $val($fk) ?>">
          <?php elseif ($ftype === 'date'): ?>
            <input id="f-<?= e($fk) ?>" type="date" name="<?= e($fk) ?>" value="<?= $val($fk) ?>">
          <?php elseif ($ftype === 'email'): ?>
            <input id="f-<?= e($fk) ?>" type="email" name="<?= e($fk) ?>" value="<?= $val($fk) ?>" placeholder="<?= e($opts['placeholder'] ?? '') ?>">
          <?php else: ?>
            <input id="f-<?= e($fk) ?>" type="text" name="<?= e($fk) ?>" value="<?= $val($fk) ?>" placeholder="<?= e($opts['placeholder'] ?? '') ?>">
          <?php endif; ?>
          <?php if (!empty($opts['help'])): ?><p class="muted" style="font-size:.82rem;margin-top:5px"><?= e($opts['help']) ?></p><?php endif; ?>
        </div>
      <?php endforeach; ?>
      <div class="flex gap wrap mt-2">
        <button type="submit" class="btn btn-primary btn-lg"><?= icon('check') ?><?= $isNew ? 'Create' : 'Save changes' ?></button>
        <a href="<?= admin_url($key) ?>" class="btn btn-ghost btn-lg">Cancel</a>
      </div>
    </form>
    <?php
    admin_foot();
}

/** DELETE (POST only). */
function crud_delete(string $key, array $cfg, int $id): void {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !csrf_verify()) { flash('error', 'Invalid delete request.'); redirect($key); }
    q("DELETE FROM `{$cfg['table']}` WHERE id=?", [$id]);
    flash('ok', $cfg['singular'] . ' deleted.');
    redirect($key);
}
