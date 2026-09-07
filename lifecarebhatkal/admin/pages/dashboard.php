<?php
/** Admin dashboard — at-a-glance counts + quick links. */
$cards = [
    ['doctors','Doctors','users'],
    ['departments','Departments','stethoscope'],
    ['blog_posts','Blog Posts','quote'],
    ['events','Events','award'],
    ['gallery_images','Gallery','scan'],
    ['careers','Careers','shield'],
    ['testimonials','Testimonials','star'],
    ['enquiries','Enquiries','mail'],
];
$newEnq = q1("SELECT COUNT(*) c FROM enquiries WHERE status='new'");
$newEnq = $newEnq ? (int)$newEnq['c'] : 0;
$recent = q("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 6") ?? [];

admin_head('Dashboard');
?>
<div class="adm-grid-stats">
  <?php foreach ($cards as [$tbl,$label,$ic]): ?>
    <a class="adm-stat" href="<?= admin_url($tbl==='enquiries'?'enquiries':$tbl) ?>">
      <span class="adm-stat-ic"><?= icon($ic) ?></span>
      <div>
        <b><?= tbl_count($tbl) ?></b>
        <span><?= e($label) ?><?php if ($tbl==='enquiries' && $newEnq): ?> <em class="adm-dot"><?= $newEnq ?> new</em><?php endif; ?></span>
      </div>
    </a>
  <?php endforeach; ?>
</div>

<div class="adm-card">
  <div class="adm-bar" style="margin:0 0 14px">
    <h2 style="font-size:1.15rem">Recent enquiries</h2>
    <a href="<?= admin_url('enquiries') ?>" class="text-link">View all <?= icon('arrow') ?></a>
  </div>
  <?php if (!$recent): ?>
    <p class="muted">No enquiries yet. Submissions from the website contact form will appear here.</p>
  <?php else: ?>
    <div style="overflow-x:auto">
    <table class="adm-table">
      <thead><tr><th>Name</th><th>Phone</th><th>Department</th><th>Received</th><th>Status</th></tr></thead>
      <tbody>
      <?php foreach ($recent as $r): ?>
        <tr>
          <td><b><?= e($r['name']) ?></b><br><span class="muted" style="font-size:.82rem"><?= e($r['email']) ?></span></td>
          <td><?= e($r['phone']) ?></td>
          <td><?= e($r['department'] ?: '—') ?></td>
          <td><?= e(date('d M, H:i', strtotime($r['created_at']))) ?></td>
          <td><span class="pill-status <?= $r['status']==='new'?'draft':'published' ?>"><?= e($r['status']) ?></span></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    </div>
  <?php endif; ?>
</div>

<div class="adm-card" style="margin-top:20px">
  <h2 style="font-size:1.15rem;margin-bottom:6px">Welcome</h2>
  <p class="muted">Use the sidebar to manage doctors, departments, blog posts, events, the gallery, careers, testimonials and FAQs. Edit contact details and stats under <a href="<?= admin_url('settings') ?>">Site Settings</a>. Remember to change your admin password from the default.</p>
</div>
<?php
admin_foot();
