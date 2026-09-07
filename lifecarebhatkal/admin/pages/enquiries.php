<?php
/** Enquiries — read, mark read/new, delete. */
$action = $parts[1] ?? '';
$id     = isset($parts[2]) ? (int)$parts[2] : 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify()) { flash('error', 'Session expired.'); redirect('enquiries'); }
    if ($action === 'read')   { q("UPDATE enquiries SET status='read' WHERE id=?", [$id]); flash('ok', 'Marked as read.'); }
    if ($action === 'unread') { q("UPDATE enquiries SET status='new' WHERE id=?", [$id]); flash('ok', 'Marked as new.'); }
    if ($action === 'delete') { q("DELETE FROM enquiries WHERE id=?", [$id]); flash('ok', 'Enquiry deleted.'); }
    redirect('enquiries');
}

$rows = q("SELECT * FROM enquiries ORDER BY created_at DESC") ?? [];
admin_head('Enquiries');
?>
<div class="adm-bar"><p class="muted"><?= count($rows) ?> enquiries received</p></div>
<div class="adm-card">
  <?php if (!$rows): ?>
    <p class="muted" style="padding:12px">No enquiries yet.</p>
  <?php else: ?>
  <div class="adm-enquiries">
    <?php foreach ($rows as $r): ?>
      <details class="adm-enq <?= $r['status']==='new'?'is-new':'' ?>">
        <summary>
          <span class="adm-enq-name"><?= e($r['name']) ?> <?php if ($r['status']==='new'): ?><em class="adm-dot">new</em><?php endif; ?></span>
          <span class="adm-enq-meta"><?= e($r['department'] ?: 'General') ?> · <?= e(date('d M Y, H:i', strtotime($r['created_at']))) ?></span>
        </summary>
        <div class="adm-enq-body">
          <div class="adm-enq-grid">
            <div><b>Email</b><a href="mailto:<?= e($r['email']) ?>"><?= e($r['email'] ?: '—') ?></a></div>
            <div><b>Phone</b><a href="tel:<?= e($r['phone']) ?>"><?= e($r['phone'] ?: '—') ?></a></div>
            <div><b>Subject</b><span><?= e($r['subject'] ?: '—') ?></span></div>
            <div><b>Source</b><span><?= e($r['source']) ?></span></div>
          </div>
          <div class="adm-enq-msg"><?= nl2br(e($r['message'])) ?></div>
          <div class="flex gap wrap mt-2">
            <?php if ($r['status']==='new'): ?>
              <form method="post" action="<?= admin_url('enquiries/read/' . $r['id']) ?>"><?= csrf_field() ?><button class="adm-act"><?= icon('check') ?>Mark read</button></form>
            <?php else: ?>
              <form method="post" action="<?= admin_url('enquiries/unread/' . $r['id']) ?>"><?= csrf_field() ?><button class="adm-act"><?= icon('clock') ?>Mark new</button></form>
            <?php endif; ?>
            <a class="adm-act" href="mailto:<?= e($r['email']) ?>?subject=<?= rawurlencode('Re: ' . ($r['subject'] ?: 'Your enquiry to Life Care')) ?>"><?= icon('mail') ?>Reply</a>
            <form method="post" action="<?= admin_url('enquiries/delete/' . $r['id']) ?>" onsubmit="return confirm('Delete this enquiry?');"><?= csrf_field() ?><button class="adm-act danger"><?= icon('close') ?>Delete</button></form>
          </div>
        </div>
      </details>
    <?php endforeach; ?>
  </div>
  <?php endif; ?>
</div>
<?php
admin_foot();
