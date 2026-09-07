<?php
$crumbs = [['Careers','']];
$meta = [
    'title' => 'Careers & Jobs | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Join Life Care Specialty Hospital, Bhatkal. Explore openings for nurses, lab technicians, physiotherapists and administrative staff — and grow your healthcare career close to home.',
    'route' => 'careers',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$careers = get_careers();
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Careers at Life Care', 'Build a rewarding healthcare career with a team that values compassion, learning and excellence — right here in Bhatkal.', $crumbs, 'assets/images/about/about-1.jpg');
?>

<!-- Why work with us -->
<section class="section">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid tr"></span>
      <div class="frame"><?= img('assets/images/about/about-2.jpg','Working at Life Care Specialty Hospital',['w'=>1100,'h'=>820]) ?></div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Why join us</span>
      <h2 class="h2">A culture of care & growth</h2>
      <p class="lead">At Life Care we're building more than a hospital — a positive culture of collaboration, innovation and learning that supports both patients and staff.</p>
      <ul class="list-check">
        <li><?= icon('check') ?><span>Work with modern facilities &amp; advanced diagnostics</span></li>
        <li><?= icon('check') ?><span>Supportive, team-oriented environment</span></li>
        <li><?= icon('check') ?><span>Opportunities to learn and grow</span></li>
        <li><?= icon('check') ?><span>Serve your own community close to home</span></li>
      </ul>
    </div>
  </div>
</section>

<!-- Open positions -->
<section class="section bg-soft">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">We're hiring</span>
      <h2 class="h2">Current openings</h2>
      <p>Found a role that fits? Apply by email with your CV. <em>(Openings are indicative — please confirm current vacancies with reception.)</em></p>
    </div>

    <?php if (!$careers): ?>
      <div class="alert alert-ok" style="max-width:640px;margin:0 auto"><?= icon('mail') ?> There are no open positions listed right now. You're welcome to send your CV to <a href="mailto:<?= e(setting('email')) ?>"><?= e(setting('email')) ?></a> for future opportunities.</div>
    <?php else: ?>
    <div class="faq" data-stagger>
      <?php foreach ($careers as $job): ?>
        <div class="faq-item">
          <button class="faq-q" type="button" aria-expanded="false">
            <span>
              <b style="font-size:1.08rem"><?= e($job['title']) ?></b>
              <span class="tag-list" style="margin-top:8px">
                <span class="chip"><?= icon('stethoscope') ?><?= e($job['department']) ?></span>
                <span class="chip"><?= icon('location') ?><?= e($job['location']) ?></span>
                <span class="chip"><?= icon('clock') ?><?= e($job['type']) ?></span>
              </span>
            </span>
            <?= icon('chevron-down') ?>
          </button>
          <div class="faq-a">
            <div class="faq-a-inner">
              <div class="prose" style="max-width:none"><?= $job['description'] ?>
                <h3 style="font-size:1.1rem">Requirements</h3>
                <?= $job['requirements'] ?>
              </div>
              <a href="mailto:<?= e($job['apply_email']) ?>?subject=<?= rawurlencode('Application: ' . $job['title']) ?>" class="btn btn-primary mt-2"><?= icon('mail') ?>Apply for this role</a>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>
  </div>
</section>

<!-- General application CTA -->
<section class="section bg-teal" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow on-dark center-line">Don't see your role?</span>
    <h2 class="h2" style="color:#fff;margin:14px 0">Send us your CV anyway</h2>
    <p class="lead" style="color:rgba(255,255,255,.86)">We're always glad to hear from talented, caring professionals. Email your CV and we'll keep it on file.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="mailto:<?= e(setting('email')) ?>?subject=<?= rawurlencode('Career enquiry') ?>" class="btn btn-light btn-lg"><?= icon('mail') ?>Email your CV</a>
      <a href="<?= url('contact') ?>" class="btn btn-on-dark btn-lg">Contact us <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
