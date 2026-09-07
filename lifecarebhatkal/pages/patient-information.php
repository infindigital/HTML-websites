<?php
$crumbs = [['Patient Information','']];
$meta = [
    'title' => 'Patient Information & FAQs | ' . setting('site_name') . ' Bhatkal',
    'desc'  => 'Patient information for Life Care Specialty Hospital, Bhatkal — admission & deposit, payment methods, visitor rules, what to bring, pharmacy & lab timings, insurance and frequently asked questions.',
    'route' => 'patient-information',
    'schema'=> [breadcrumb_schema($crumbs), (function(){
        $faqs = get_faqs();
        return ['@context'=>'https://schema.org','@type'=>'FAQPage','mainEntity'=>array_map(fn($f)=>[
            '@type'=>'Question','name'=>$f['question'],
            'acceptedAnswer'=>['@type'=>'Answer','text'=>strip_tags($f['answer'])],
        ], $faqs)];
    })()],
];
$info = content('patient_info');
$faqs = get_faqs();
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
page_hero('Patient Information', 'Everything you need to know before your visit or admission — timings, admission process, visitor guidance and answers to common questions.', $crumbs, 'assets/images/facilities/daycare.jpg');
?>

<!-- Quick contact strip -->
<section class="section-sm bg-soft">
  <div class="container">
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px" data-stagger>
      <div class="info-tile"><span class="ic"><?= icon('clock') ?></span><div><b>OPD Hours</b><span><?= e(setting('opd_hours')) ?></span></div></div>
      <div class="info-tile"><span class="ic"><?= icon('emergency') ?></span><div><b>Emergency</b><span>24×7, all days</span></div></div>
      <div class="info-tile"><span class="ic"><?= icon('pharmacy') ?></span><div><b>Pharmacy & Lab</b><span>24×7, all days</span></div></div>
      <div class="info-tile"><span class="ic"><?= icon('phone') ?></span><div><b>Reception</b><a href="<?= e(tel_href(setting('phone1'))) ?>"><?= e(setting('phone1')) ?></a></div></div>
    </div>
  </div>
</section>

<!-- Info cards -->
<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Before you visit</span>
      <h2 class="h2">Admission & visitor information</h2>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(18px,2.4vw,26px)" data-stagger>
      <?php foreach ($info as $item): ?>
        <div class="card">
          <div class="card-body">
            <h3 style="font-size:1.15rem"><?= e($item['title']) ?></h3>
            <div class="prose" style="max-width:none;font-size:1rem"><?= $item['body'] ?></div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- FAQs -->
<section class="section bg-mint">
  <div class="container" style="max-width:860px">
    <div class="section-head center">
      <span class="eyebrow center-line">Questions</span>
      <h2 class="h2">Frequently asked questions</h2>
    </div>
    <div class="faq" data-stagger>
      <?php foreach ($faqs as $f): ?>
        <div class="faq-item">
          <button class="faq-q" type="button" aria-expanded="false"><span><?= e($f['question']) ?></span><?= icon('chevron-down') ?></button>
          <div class="faq-a"><div class="faq-a-inner"><?= $f['answer'] ?></div></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section" style="text-align:center">
  <div class="container" style="max-width:720px">
    <span class="eyebrow center-line">Still have a question?</span>
    <h2 class="h2" style="margin:14px 0">We're here to help</h2>
    <p class="lead">Call our reception or send us a message — our team will be glad to assist.</p>
    <div class="flex gap wrap center mt-2" style="justify-content:center">
      <a href="<?= e(tel_href(setting('phone1'))) ?>" class="btn btn-primary btn-lg"><?= icon('phone') ?>Call reception</a>
      <a href="<?= url('contact') ?>" class="btn btn-ghost btn-lg">Contact us <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
