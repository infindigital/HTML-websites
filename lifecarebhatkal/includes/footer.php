<?php
/** Footer + sticky mobile CTAs + scripts. Closes </main> from header. */
$wa = wa_href(setting('whatsapp'), 'Hello Life Care, I would like to make an enquiry.');
?>
</main>

<!-- Final emergency CTA -->
<section class="emergency-band section-sm" aria-label="Emergency contact">
  <div class="container emergency-inner">
    <div data-reveal>
      <span class="pulse-badge"><span class="dot"></span><?= e(setting('emergency_line')) ?></span>
      <h2>Medical emergency? We are open 24×7.</h2>
      <p class="lead" style="color:rgba(255,255,255,.85);max-width:52ch"><?= e(t('duty')) ?>. Our Accident &amp; Emergency department and duty doctors are ready around the clock.</p>
      <div class="flex gap wrap mt-2">
        <a href="<?= e(tel_href(setting('phone1'))) ?>" class="btn btn-light btn-lg"><?= icon('phone') ?>Call <?= e(setting('phone1')) ?></a>
        <a href="<?= e($wa) ?>" class="btn btn-on-dark btn-lg" target="_blank" rel="noopener"><?= icon('whatsapp') ?>WhatsApp</a>
      </div>
    </div>
    <div class="emergency-card" data-reveal>
      <div class="chip" style="background:rgba(255,255,255,.14);color:#fff"><?= icon('location') ?>Find us</div>
      <div class="callnum"><?= e(setting('phone2')) ?></div>
      <p style="color:rgba(255,255,255,.82);margin-bottom:16px"><?= e(setting('address')) ?></p>
      <a href="<?= url('contact') ?>" class="btn btn-light btn-block"><?= icon('arrow') ?><?= e(t('cta_directions')) ?></a>
    </div>
  </div>
</section>

<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="<?= asset('images/brand/logo-white.png') ?>" alt="<?= e(setting('site_name')) ?>">
        <p><?= e(setting('footer_about')) ?></p>
        <p class="serif-italic" style="color:var(--teal-300);margin-top:10px">“<?= e(setting('tagline')) ?>”</p>
        <div class="footer-social">
          <a href="<?= e(setting('facebook')) ?>" aria-label="Facebook" target="_blank" rel="noopener"><?= icon('facebook') ?></a>
          <a href="<?= e(setting('instagram')) ?>" aria-label="Instagram" target="_blank" rel="noopener"><?= icon('instagram') ?></a>
          <a href="<?= e(setting('youtube')) ?>" aria-label="YouTube" target="_blank" rel="noopener"><?= icon('youtube') ?></a>
        </div>
      </div>
      <div>
        <h4>Explore</h4>
        <div class="footer-links">
          <a href="<?= url('about-us') ?>">About Us</a>
          <a href="<?= url('our-facilities') ?>">Our Facilities</a>
          <a href="<?= url('departments') ?>">Departments</a>
          <a href="<?= url('doctors') ?>">Doctors</a>
          <a href="<?= url('visiting-doctors') ?>">Visiting Doctors</a>
          <a href="<?= url('careers') ?>">Careers</a>
          <a href="<?= url('gallery') ?>">Gallery</a>
          <a href="<?= url('blog') ?>">Blog</a>
          <a href="<?= url('contact') ?>">Contact Us</a>
        </div>
      </div>
      <div>
        <h4>Get in touch</h4>
        <ul class="footer-contact">
          <li><?= icon('location') ?><span><?= e(setting('address')) ?></span></li>
          <li><?= icon('phone') ?><span><a href="<?= e(tel_href(setting('phone1'))) ?>"><?= e(setting('phone1')) ?></a> / <a href="<?= e(tel_href(setting('phone2'))) ?>"><?= e(setting('phone2')) ?></a></span></li>
          <li><?= icon('mail') ?><span><a href="mailto:<?= e(setting('email')) ?>"><?= e(setting('email')) ?></a></span></li>
          <li><?= icon('whatsapp') ?><span><a href="<?= e($wa) ?>" target="_blank" rel="noopener">WhatsApp <?= e(setting('whatsapp')) ?></a></span></li>
        </ul>
      </div>
      <div>
        <h4>Hours</h4>
        <div class="footer-hours">
          <div class="row"><span>OPD</span><b><?= e(setting('opd_hours')) ?></b></div>
          <div class="row"><span>Visiting</span><b><?= e(setting('visiting_hours')) ?></b></div>
          <div class="row"><span>Pharmacy / Lab</span><b>24×7</b></div>
          <div class="row"><span>Emergency</span><b class="em">24×7</b></div>
        </div>
        <div class="footer-map">
          <iframe src="<?= e(setting('map_embed')) ?>" loading="lazy" title="Map to <?= e(setting('site_name')) ?>" referrerpolicy="no-referrer-when-downgrade" style="margin-top:16px"></iframe>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span><?= e(setting('copyright')) ?></span>
      <span>Bhatkal · Uttara Kannada · Karnataka · <a href="<?= url('patient-information') ?>">Patient Information</a></span>
    </div>
  </div>
</footer>

<!-- Sticky mobile CTAs -->
<nav class="sticky-cta" aria-label="Quick contact">
  <a href="<?= e(tel_href(setting('phone1'))) ?>" class="call"><?= icon('phone') ?>Call Now</a>
  <a href="<?= e($wa) ?>" class="wa" target="_blank" rel="noopener"><?= icon('whatsapp') ?>WhatsApp</a>
</nav>
<a href="<?= e($wa) ?>" class="fab-wa desktop" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><?= icon('whatsapp') ?></a>

<!-- Libraries (deferred, CDN) + app JS -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<?php if (!empty($meta['use_swiper'])): ?>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.1.14/swiper-bundle.min.css">
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.1.14/swiper-bundle.min.js"></script>
<?php endif; ?>
<script defer src="<?= asset('js/main.js') ?>?v=1"></script>
<?php if (!empty($meta['home_hero'])): ?>
<script defer src="<?= asset('js/hero.js') ?>?v=1"></script>
<?php endif; ?>
</body>
</html>
