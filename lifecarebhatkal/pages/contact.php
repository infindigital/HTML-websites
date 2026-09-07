<?php
require_once ROOT_PATH . '/includes/mailer.php';

$crumbs = [['Contact Us','']];
$errors = [];
$old    = ['name'=>'','email'=>'','phone'=>'','department'=>'','subject'=>'','message'=>''];
$sent   = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Honeypot (bots fill hidden field) + CSRF
    $hp = trim($_POST['website'] ?? '');
    if ($hp !== '') {
        $sent = true; // silently accept & drop
    } elseif (!csrf_verify()) {
        $errors['form'] = 'Your session expired. Please try submitting the form again.';
    } else {
        foreach ($old as $k => $_) $old[$k] = trim((string)($_POST[$k] ?? ''));

        if ($old['name'] === '' || mb_strlen($old['name']) < 2)      $errors['name'] = 'Please enter your name.';
        if ($old['email'] !== '' && !filter_var($old['email'], FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Please enter a valid email address.';
        if (!preg_match('/^[0-9+\s()-]{7,20}$/', $old['phone']))      $errors['phone'] = 'Please enter a valid phone number.';
        if ($old['email'] === '')                                     $errors['email'] = 'Please enter your email address.';
        if (mb_strlen($old['message']) < 10)                          $errors['message'] = 'Please enter a short message (at least 10 characters).';

        if (!$errors) {
            $data = $old + ['source' => 'contact'];
            save_enquiry($data);          // store (if DB available)
            send_enquiry_mail($data);     // notify (best-effort)
            $sent = true;
            $old  = array_fill_keys(array_keys($old), ''); // clear
        }
    }
}

$meta = [
    'title' => 'Contact Us & Directions | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Contact Life Care Specialty Hospital, Bhatkal — phone, WhatsApp, email, address and map. Send an enquiry or appointment request. 24×7 Accident & Emergency.',
    'route' => 'contact',
    'schema'=> [breadcrumb_schema($crumbs)],
];
$depts = get_departments();
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Contact & Directions', 'We\'re here to help — call, message or visit us. For emergencies, our Accident & Emergency department is open 24×7.', $crumbs, 'assets/images/about/about-1.jpg');
?>

<style>
  .contact-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(28px,4vw,56px);align-items:start}
  @media (max-width:880px){.contact-grid{grid-template-columns:1fr}}
</style>
<section class="section">
  <div class="container contact-grid">
    <!-- Contact details -->
    <div data-reveal>
      <span class="eyebrow">Get in touch</span>
      <h2 class="h2">Reach Life Care</h2>
      <p class="lead">Call our reception for appointments and enquiries, message us on WhatsApp, or send the form and we'll get back to you.</p>

      <div class="grid" style="grid-template-columns:1fr 1fr;gap:16px;margin-top:8px">
        <div class="info-tile"><span class="ic"><?= icon('phone') ?></span><div><b>Call us</b><a href="<?= e(tel_href(setting('phone1'))) ?>"><?= e(setting('phone1')) ?></a><br><a href="<?= e(tel_href(setting('phone2'))) ?>"><?= e(setting('phone2')) ?></a></div></div>
        <div class="info-tile"><span class="ic"><?= icon('whatsapp') ?></span><div><b>WhatsApp</b><a href="<?= e(wa_href(setting('whatsapp'), 'Hello Life Care, I would like to make an enquiry.')) ?>" target="_blank" rel="noopener"><?= e(setting('whatsapp')) ?></a></div></div>
        <div class="info-tile"><span class="ic"><?= icon('mail') ?></span><div><b>Email</b><a href="mailto:<?= e(setting('email')) ?>"><?= e(setting('email')) ?></a></div></div>
        <div class="info-tile"><span class="ic"><?= icon('clock') ?></span><div><b>OPD Hours</b><span><?= e(setting('opd_hours')) ?></span></div></div>
        <div class="info-tile" style="grid-column:1/-1"><span class="ic"><?= icon('location') ?></span><div><b>Address</b><span><?= e(setting('address')) ?></span></div></div>
      </div>

      <div class="alert alert-err" style="margin-top:22px;background:var(--teal-800);color:#fff;border:0;display:flex;align-items:center;gap:12px">
        <?= icon('emergency') ?><span><b>Medical emergency?</b> Our Accident &amp; Emergency is open 24×7. Call <a href="<?= e(tel_href(setting('phone1'))) ?>" style="color:#fff;text-decoration:underline"><?= e(setting('phone1')) ?></a> now.</span>
      </div>
    </div>

    <!-- Enquiry form -->
    <div class="form-card" id="enquire" data-reveal>
      <h3 style="margin-bottom:6px">Send an enquiry</h3>
      <p class="muted" style="font-size:.92rem;margin-bottom:20px">Fields marked <span style="color:#d9534f">*</span> are required.</p>

      <?php if ($sent): ?>
        <div class="alert alert-ok"><?= icon('check') ?> Thank you — your enquiry has been received. Our team will get back to you soon. For urgent matters, please call <a href="<?= e(tel_href(setting('phone1'))) ?>"><?= e(setting('phone1')) ?></a>.</div>
      <?php endif; ?>
      <?php if (!empty($errors['form'])): ?>
        <div class="alert alert-err"><?= icon('close') ?> <?= e($errors['form']) ?></div>
      <?php endif; ?>

      <form method="post" action="<?= url('contact') ?>#enquire" novalidate>
        <?= csrf_field() ?>
        <!-- honeypot -->
        <div style="position:absolute;left:-9999px" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>

        <div class="form-row">
          <div class="field">
            <label for="f-name">Name <span class="req">*</span></label>
            <input id="f-name" type="text" name="name" value="<?= e($old['name']) ?>" required>
            <?php if (!empty($errors['name'])): ?><span class="err"><?= e($errors['name']) ?></span><?php endif; ?>
          </div>
          <div class="field">
            <label for="f-phone">Phone <span class="req">*</span></label>
            <input id="f-phone" type="tel" name="phone" value="<?= e($old['phone']) ?>" required>
            <?php if (!empty($errors['phone'])): ?><span class="err"><?= e($errors['phone']) ?></span><?php endif; ?>
          </div>
        </div>

        <div class="field">
          <label for="f-email">Email <span class="req">*</span></label>
          <input id="f-email" type="email" name="email" value="<?= e($old['email']) ?>" required>
          <?php if (!empty($errors['email'])): ?><span class="err"><?= e($errors['email']) ?></span><?php endif; ?>
        </div>

        <div class="form-row">
          <div class="field">
            <label for="f-dept">Department</label>
            <select id="f-dept" name="department">
              <option value="">General enquiry</option>
              <?php foreach ($depts as $d): ?>
                <option value="<?= e($d['name']) ?>" <?= $old['department']===$d['name']?'selected':'' ?>><?= e($d['name']) ?></option>
              <?php endforeach; ?>
            </select>
          </div>
          <div class="field">
            <label for="f-subject">Subject</label>
            <input id="f-subject" type="text" name="subject" value="<?= e($old['subject']) ?>" placeholder="e.g. Appointment request">
          </div>
        </div>

        <div class="field">
          <label for="f-message">Message <span class="req">*</span></label>
          <textarea id="f-message" name="message" required placeholder="How can we help you?"><?= e($old['message']) ?></textarea>
          <?php if (!empty($errors['message'])): ?><span class="err"><?= e($errors['message']) ?></span><?php endif; ?>
        </div>

        <button type="submit" class="btn btn-primary btn-block btn-lg"><?= icon('mail') ?>Send enquiry</button>
        <p class="muted" style="font-size:.82rem;margin-top:12px">By submitting, you agree to be contacted by Life Care regarding your enquiry.</p>
      </form>
    </div>
  </div>
</section>

<!-- Map -->
<section class="section-sm" style="padding-top:0">
  <div class="container">
    <div class="frame" style="aspect-ratio:16/7;border-radius:var(--r-lg,20px);overflow:hidden">
      <iframe src="<?= e(setting('map_embed')) ?>" width="100%" height="100%" style="border:0;display:block" loading="lazy" title="Map to <?= e(setting('site_name')) ?>" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
