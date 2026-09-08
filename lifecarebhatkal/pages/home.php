<?php
$meta = [
    'title' => setting('site_name') . ' — ' . setting('tagline') . ' | Bhatkal',
    'desc'  => 'Life Care Specialty Hospital, Bhatkal — 32-slice CT, 24×7 accident & emergency, experienced specialists and modern diagnostics. Keeping you well.',
    'route' => '', 'has_hero' => true, 'home_hero' => true, 'use_swiper' => true,
    'body_class' => 'home',
];
$depts = get_departments();
$docs  = get_doctors('resident');
$testi = get_testimonials();
$posts = get_posts(3);
$faqs  = get_faqs();
$flag  = content('flagship');
$why   = content('why_reasons');
$s     = $GLOBALS['SETTINGS'];
require ROOT_PATH . '/includes/head.php';
require ROOT_PATH . '/includes/header.php';
$wa = wa_href(setting('whatsapp'), 'Hello Life Care, I would like to make an enquiry.');
?>

<!-- 01 · HERO — <HomeHero /> (homepage-only animated hero) -->
<?php require ROOT_PATH . '/includes/hero-home.php'; ?>

<!-- Trust marquee -->
<div class="marquee-strip" aria-hidden="true">
  <div class="marquee">
    <?php $chips=['32-Slice CT Scan','24×7 Accident & Emergency','Modular Operation Theatre','Hi-Tech Laboratory','Ultrasound & Colour Doppler','Digital X-Ray','ICU & Critical Care','24×7 Pharmacy'];
    for($k=0;$k<2;$k++) foreach($chips as $c) echo '<span>'.icon('check').e($c).'</span>'; ?>
  </div>
</div>

<!-- 02 · INTRO / WELCOME -->
<section class="section" id="welcome">
  <div class="container split">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid tr"></span>
      <div class="frame"><?= img('assets/images/about/about-1.jpg','Inside Life Care Specialty Hospital',['w'=>1200,'h'=>900]) ?></div>
      <div class="badge-float br">
        <span class="num" data-count="<?= e($s['stat_years']) ?>"><?= e($s['stat_years']) ?></span>
        <small><?= e($s['stat_years_label']) ?> in Bhatkal</small>
      </div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Welcome to Life Care</span>
      <h2 class="h2">Modern healthcare, close to home.</h2>
      <?php foreach (content('intro_lines') as $line): ?>
        <p class="lead" style="font-size:1.1rem"><?= e($line) ?></p>
      <?php endforeach; ?>
      <div class="flex gap wrap mt-2">
        <a href="<?= url('about-us') ?>" class="btn btn-primary">More About Us <?= icon('arrow') ?></a>
        <a href="<?= url('why-choose-us') ?>" class="btn btn-ghost">Why Choose Us</a>
      </div>
    </div>
  </div>
</section>

<!-- 03 · TRUST / STATS -->
<section class="section-sm">
  <div class="container">
    <div class="stats" data-reveal>
      <?php
      $stat_rows = [
        ['stat_years','stat_years_label'],['stat_patients','stat_patients_label'],
        ['stat_beds','stat_beds_label'],['stat_doctors','stat_doctors_label'],
        ['stat_surgeries','stat_surgeries_label'],['stat_slice','stat_slice_label'],
      ];
      foreach ($stat_rows as $r): ?>
        <div class="stat">
          <div class="num" data-count="<?= e($s[$r[0]]) ?>"><?= e($s[$r[0]]) ?></div>
          <div class="lbl"><?= e($s[$r[1]]) ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 04 · FLAGSHIP SERVICES -->
<section class="section bg-soft">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">What we do best</span>
      <h2 class="h2">Flagship services under one roof</h2>
      <p>Advanced diagnostics, surgery and emergency care — so residents of Bhatkal receive quality treatment without travelling to distant cities.</p>
    </div>
    <div class="grid feature-grid" data-stagger>
      <?php foreach ($flag as $f): ?>
        <a class="feature" href="<?= url($f['link']) ?>">
          <span class="ic"><?= icon($f['icon']) ?></span>
          <h3><?= e($f['title']) ?></h3>
          <p><?= e($f['text']) ?></p>
          <span class="text-link"><?= t('read_more') ?> <?= icon('arrow') ?></span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 05 · OUR FACILITIES (feature split) -->
<section class="section">
  <div class="container split reverse">
    <div class="split-media" data-reveal="clip">
      <span class="dot-grid bl"></span>
      <div class="frame"><?= img('assets/images/facilities/ct-scan.jpg','32-slice CT scanner at Life Care',['w'=>1200,'h'=>800]) ?></div>
      <div class="badge-float tl">
        <span class="ic" style="width:auto"><span class="chip"><?= icon('scan') ?>32 Slice</span></span>
      </div>
    </div>
    <div class="split-body" data-reveal>
      <span class="eyebrow">Our Facilities</span>
      <h2 class="h2">Integrated healthcare, under one roof</h2>
      <p class="lead">From a 32-slice CT scanner and hi-tech laboratory to a modular operation theatre and 24×7 pharmacy — Life Care brings advanced facilities to Bhatkal.</p>
      <ul class="list-check">
        <li><?= icon('check') ?><span><b>32-Slice CT Scan</b> — head, thorax, abdomen and angiography imaging.</span></li>
        <li><?= icon('check') ?><span><b>Ultrasound, Digital X-Ray &amp; Cardiac</b> — ECG, ECHO and TMT, 24×7.</span></li>
        <li><?= icon('check') ?><span><b>Modular OT, ICU &amp; comfortable rooms</b> for safe treatment and recovery.</span></li>
      </ul>
      <a href="<?= url('our-facilities') ?>" class="btn btn-primary">View all facilities <?= icon('arrow') ?></a>
    </div>
  </div>
</section>

<!-- 06 · 24/7 EMERGENCY highlight -->
<section class="section bg-teal" style="position:relative;overflow:hidden">
  <div class="container split">
    <div class="split-body" data-reveal>
      <span class="eyebrow on-dark">Round the clock</span>
      <h2 class="h2" style="color:#fff">24×7 Accident &amp; Emergency</h2>
      <p class="lead" style="color:rgba(255,255,255,.86)">Always striving to serve round the clock. Our casualty is open for all kinds of accidents and emergencies, supported by ICU and duty doctors available every single day.</p>
      <div class="flex gap wrap mt-2">
        <a href="<?= e(tel_href(setting('phone2'))) ?>" class="btn btn-light btn-lg"><?= icon('phone') ?>Call <?= e(setting('phone2')) ?></a>
        <a href="<?= e($wa) ?>" class="btn btn-on-dark btn-lg" target="_blank" rel="noopener"><?= icon('whatsapp') ?>WhatsApp</a>
      </div>
    </div>
    <div class="split-media" data-reveal="clip">
      <div class="frame"><?= img('assets/images/facilities/emergency.jpg','24x7 Accident and Emergency at Life Care',['w'=>1100,'h'=>800]) ?></div>
    </div>
  </div>
</section>

<!-- 07 · DEPARTMENTS -->
<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Specialties</span>
      <h2 class="h2">Our departments</h2>
      <p>Dedicated care across medicine, surgery, orthopaedics, dental, physiotherapy and visiting super-specialties.</p>
    </div>
    <div class="grid dept-grid" data-stagger>
      <?php foreach (array_slice($depts, 0, 8) as $d): ?>
        <a class="dept-card" href="<?= url('departments/' . $d['slug']) ?>">
          <div class="card-media">
            <?= img($d['thumb_image'], e($d['name']) . ' — Life Care Bhatkal', ['w'=>560,'h'=>350]) ?>
            <span class="ic"><?= icon(dept_icon($d['slug'])) ?></span>
          </div>
          <div class="card-body">
            <?php if ($d['category']==='visiting'): ?><span class="badge badge-visiting">Visiting</span><?php endif; ?>
            <h3><?= e($d['name']) ?></h3>
            <p class="muted" style="font-size:.92rem"><?= e(excerpt($d['short_desc'], 16)) ?></p>
            <span class="text-link"><?= t('read_more') ?> <?= icon('arrow') ?></span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
    <div class="center mt-3"><a href="<?= url('departments') ?>" class="btn btn-ghost btn-lg"><?= t('view_all') ?> departments <?= icon('arrow') ?></a></div>
  </div>
</section>

<!-- 08 · DOCTORS -->
<section class="section bg-soft">
  <div class="container">
    <div class="flex wrap items-center" style="justify-content:space-between;gap:20px;margin-bottom:36px">
      <div class="section-head" style="margin-bottom:0">
        <span class="eyebrow">Our specialists</span>
        <h2 class="h2">Doctors &amp; consultants</h2>
      </div>
      <div class="flex gap">
        <button class="btn btn-ghost sw-prev" aria-label="Previous"><?= icon('chevron') ?></button>
        <button class="btn btn-ghost sw-next" aria-label="Next"><?= icon('chevron') ?></button>
      </div>
    </div>
    <div class="swiper doctors-swiper">
      <div class="swiper-wrapper">
        <?php foreach ($docs as $d): ?>
          <div class="swiper-slide">
            <a class="doc-card" href="<?= url('doctors/' . $d['id']) ?>">
              <div class="doc-photo">
                <?= img($d['image'], e($d['name']), ['w'=>500,'h'=>500]) ?>
                <span class="dept-tag"><?= e(explode(' — ', $d['department'])[0]) ?></span>
              </div>
              <div class="doc-body">
                <h3><?= e($d['name']) ?></h3>
                <div class="doc-qual"><?= e($d['qualification']) ?></div>
                <div class="doc-desig"><?= e($d['designation']) ?></div>
              </div>
            </a>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
    <div class="center mt-3"><a href="<?= url('doctors') ?>" class="btn btn-primary">Meet all our doctors <?= icon('arrow') ?></a></div>
  </div>
</section>

<!-- 09 · WHY CHOOSE -->
<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Why Life Care</span>
      <h2 class="h2">Reasons families in Bhatkal trust us</h2>
    </div>
    <div class="grid feature-grid" data-stagger>
      <?php foreach ($why as $r): ?>
        <div class="feature">
          <span class="ic"><?= icon($r['icon']) ?></span>
          <h3><?= e($r['title']) ?></h3>
          <p><?= e($r['text']) ?></p>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 10 · TESTIMONIALS -->
<section class="section bg-mint">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Happy patients</span>
      <h2 class="h2">Kind words from our community</h2>
    </div>
    <div class="swiper testi-swiper">
      <div class="swiper-wrapper">
        <?php foreach ($testi as $tt): ?>
          <div class="swiper-slide">
            <div class="testi-card">
              <?= icon('quote','qmark') ?>
              <blockquote><?= e($tt['quote']) ?></blockquote>
              <div class="stars" aria-label="<?= (int)$tt['rating'] ?> out of 5"><?php for($i=0;$i<(int)$tt['rating'];$i++) echo icon('star'); ?></div>
              <div class="who">
                <span class="av"><?= e(mb_substr($tt['name'],0,1)) ?></span>
                <div><b><?= e($tt['name']) ?></b><small><?= e($tt['location']) ?></small></div>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
      <div class="sw-dots center mt-2"></div>
    </div>
  </div>
</section>

<!-- 11 · GALLERY preview -->
<?php $gal = array_slice(get_gallery(), 0, 6); ?>
<section class="section">
  <div class="container">
    <div class="flex wrap items-center" style="justify-content:space-between;gap:20px;margin-bottom:36px">
      <div class="section-head" style="margin-bottom:0">
        <span class="eyebrow">A look inside</span>
        <h2 class="h2">Facility &amp; life at Life Care</h2>
      </div>
      <a href="<?= url('gallery') ?>" class="btn btn-ghost"><?= t('view_all') ?> gallery <?= icon('arrow') ?></a>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))" data-stagger>
      <?php foreach ($gal as $g): ?>
        <button class="cell" data-lightbox="<?= e(url($g['image'])) ?>" data-alt="<?= e($g['title']) ?>" style="border:0;padding:0;border-radius:var(--r);overflow:hidden;aspect-ratio:1;background:var(--teal-50);cursor:pointer">
          <?= img($g['image'], e($g['title']), ['w'=>400,'h'=>400,'style'=>'width:100%;height:100%;object-fit:cover']) ?>
        </button>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 12 · BLOG -->
<section class="section bg-soft">
  <div class="container">
    <div class="flex wrap items-center" style="justify-content:space-between;gap:20px;margin-bottom:36px">
      <div class="section-head" style="margin-bottom:0">
        <span class="eyebrow">Health blog</span>
        <h2 class="h2">Latest health news &amp; awareness</h2>
      </div>
      <a href="<?= url('blog') ?>" class="btn btn-ghost"><?= t('view_all') ?> articles <?= icon('arrow') ?></a>
    </div>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))" data-stagger>
      <?php foreach ($posts as $p): ?>
        <a class="card" href="<?= url('blog/' . $p['slug']) ?>">
          <div class="card-media"><?= img($p['featured_image'], e($p['title']), ['w'=>560,'h'=>385]) ?></div>
          <div class="card-body">
            <span class="badge badge-teal"><?= e($p['category']) ?></span>
            <h3 style="margin-top:12px"><?= e($p['title']) ?></h3>
            <p><?= e(excerpt($p['excerpt'] ?: $p['content'], 18)) ?></p>
            <div class="flex items-center gap" style="justify-content:space-between">
              <small class="muted"><?= e(fmt_date($p['publish_date'])) ?></small>
              <span class="text-link"><?= t('read_more') ?> <?= icon('arrow') ?></span>
            </div>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- 13 · FAQ -->
<section class="section">
  <div class="container">
    <div class="section-head center">
      <span class="eyebrow center-line">Good to know</span>
      <h2 class="h2">Frequently asked questions</h2>
    </div>
    <div class="faq" data-reveal>
      <?php foreach ($faqs as $f): ?>
        <div class="faq-item">
          <button class="faq-q"><span><?= e($f['question']) ?></span><span class="ic"><?= icon('chevron-down') ?></span></button>
          <div class="faq-a"><div class="faq-a-inner"><?= e($f['answer']) ?></div></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require ROOT_PATH . '/includes/footer.php'; ?>
