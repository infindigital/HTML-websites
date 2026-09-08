<?php
/** Enquiries — overall list + per-doctor filter; read/new/delete. */
$action = $parts[1] ?? '';
$id     = isset($parts[2]) ? (int)$parts[2] : 0;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify()) { flash('error', 'Session expired.'); redirect('enquiries'); }
    if ($action === 'read')   { q("UPDATE enquiries SET status='read' WHERE id=?", [$id]); flash('ok', 'Marked as read.'); }
    if ($action === 'unread') { q("UPDATE enquiries SET status='new' WHERE id=?", [$id]); flash('ok', 'Marked as new.'); }
    if ($action === 'delete') { q("DELETE FROM enquiries WHERE id=?", [$id]); flash('ok', 'Enquiry deleted.'); }
    redirect('enquiries');
}

// ---- filters ----
$f   = in_array($_GET['f'] ?? '', ['contact','doctor'], true) ? $_GET['f'] : '';
$doc = trim($_GET['doc'] ?? '');
$where = []; $args = [];
if ($f !== '')   { $where[] = 'source = ?'; $args[] = $f; }
if ($doc !== '') { $where[] = 'subject = ?'; $args[] = $doc; }
$sql = "SELECT * FROM enquiries" . ($where ? ' WHERE ' . implode(' AND ', $where) : '') . " ORDER BY created_at DESC";
$rows = q($sql, $args) ?? [];

$cTotal = (int)(q1("SELECT COUNT(*) c FROM enquiries")['c'] ?? 0);
$cNew   = (int)(q1("SELECT COUNT(*) c FROM enquiries WHERE status='new'")['c'] ?? 0);
$cDoc   = (int)(q1("SELECT COUNT(*) c FROM enquiries WHERE source='doctor'")['c'] ?? 0);
$docList = q("SELECT subject, COUNT(*) n FROM enquiries WHERE source='doctor' AND subject <> '' GROUP BY subject ORDER BY subject") ?? [];

function enq_doc_label(string $s): string { return trim(preg_replace('/^Doctor enquiry:\s*/i', '', $s)); }

admin_head('Enquiries');
?>
<div class="adm-grid-stats" style="margin-bottom:16px">
  <div class="adm-stat"><span class="adm-stat-ic"><?= icon('mail') ?></span><div><b><?= $cTotal ?></b><span>Total enquiries</span></div></div>
  <div class="adm-stat"><span class="adm-stat-ic"><?= icon('emergency') ?></span><div><b><?= $cNew ?></b><span>New / unread</span></div></div>
  <div class="adm-stat"><span class="adm-stat-ic"><?= icon('users') ?></span><div><b><?= $cDoc ?></b><span>Doctor enquiries</span></div></div>
</div>

<div class="adm-filterbar">
  <a class="adm-chip <?= $f===''&&$doc===''?'on':'' ?>" href="<?= admin_url('enquiries') ?>">All</a>
  <a class="adm-chip <?= $f==='contact'?'on':'' ?>" href="<?= admin_url('enquiries') ?>&f=contact">General</a>
  <a class="adm-chip <?= ($f==='doctor'&&$doc==='')?'on':'' ?>" href="<?= admin_url('enquiries') ?>&f=doctor">Doctor enquiries</a>
</div>
<?php if ($docList): ?>
<div class="adm-filterbar" style="margin-top:6px">
  <span class="muted" style="font-size:.82rem;align-self:center">By doctor:</span>
  <?php foreach ($docList as $dl): ?>
    <a class="adm-chip sm <?= $doc===$dl['subject']?'on':'' ?>" href="<?= admin_url('enquiries') ?>&f=doctor&doc=<?= rawurlencode($dl['subject']) ?>"><?= e(enq_doc_label($dl['subject'])) ?> <em><?= (int)$dl['n'] ?></em></a>
  <?php endforeach; ?>
</div>
<?php endif; ?>

<div class="adm-card" style="margin-top:16px">
  <div class="adm-bar" style="margin:0 0 12px"><p class="muted" style="margin:0"><?= count($rows) ?> shown</p></div>
  <?php if (!$rows): ?>
    <p class="muted" style="padding:12px">No enquiries in this view yet. Submissions from the website contact form and the per-doctor enquiry form appear here.</p>
  <?php else: ?>
  <div class="adm-enquiries">
    <?php foreach ($rows as $r): $isDoc = $r['source']==='doctor'; ?>
      <details class="adm-enq <?= $r['status']==='new'?'is-new':'' ?>">
        <summary>
          <span class="adm-enq-name"><?= e($r['name']) ?> <?php if ($r['status']==='new'): ?><em class="adm-dot">new</em><?php endif; ?></span>
          <span class="adm-enq-meta">
            <?php if ($isDoc): ?><span class="adm-tag"><?= icon('users') ?><?= e(enq_doc_label($r['subject'] ?: 'Doctor')) ?></span><?php else: ?><?= e($r['department'] ?: 'General') ?><?php endif; ?>
            · <?= e(date('d M Y, H:i', strtotime($r['created_at']))) ?>
          </span>
        </summary>
        <div class="adm-enq-body">
          <div class="adm-enq-grid">
            <div><b>Phone</b><a href="tel:<?= e($r['phone']) ?>"><?= e($r['phone'] ?: '—') ?></a></div>
            <div><b>Email</b><a href="mailto:<?= e($r['email']) ?>"><?= e($r['email'] ?: '—') ?></a></div>
            <div><b><?= $isDoc ? 'Doctor' : 'Subject' ?></b><span><?= e($isDoc ? enq_doc_label($r['subject'] ?: '—') : ($r['subject'] ?: '—')) ?></span></div>
            <div><b>Source</b><span><?= $isDoc ? 'Doctor enquiry' : 'Contact form' ?></span></div>
          </div>
          <div class="adm-enq-msg"><?= $r['message'] !== '' ? nl2br(e($r['message'])) : '<span class="muted">No message provided.</span>' ?></div>
          <div class="flex gap wrap mt-2">
            <?php if ($r['status']==='new'): ?>
              <form method="post" action="<?= admin_url('enquiries/read/' . $r['id']) ?>"><?= csrf_field() ?><button class="adm-act"><?= icon('check') ?>Mark read</button></form>
            <?php else: ?>
              <form method="post" action="<?= admin_url('enquiries/unread/' . $r['id']) ?>"><?= csrf_field() ?><button class="adm-act"><?= icon('clock') ?>Mark new</button></form>
            <?php endif; ?>
            <a class="adm-act" href="mailto:<?= e($r['email']) ?>?subject=<?= rawurlencode('Re: ' . ($isDoc ? enq_doc_label($r['subject'] ?: 'your enquiry') : ($r['subject'] ?: 'Your enquiry to Life Care'))) ?>"><?= icon('mail') ?>Reply</a>
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
