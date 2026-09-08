<?php
/**
 * <HomeHero /> — Life Care Specialty Hospital
 * Homepage-only hero. Shows the supplied brand banners exactly as they are
 * (doctor / two nurses) and animates them:
 *   - a slow cinematic cross-transition between the two banners
 *   - gentle "moving objects" drifting over the artwork (glow dots + rings)
 *   - a soft light sweep on each change
 * Styles: assets/css/hero.css · behaviour: assets/js/hero.js
 * (both loaded only when $meta['home_hero'] is set — see head.php / footer.php)
 */
?>
<section class="home-hero" id="home-hero" aria-label="Welcome to <?= e(setting('site_name')) ?>, Bhatkal">
  <div class="hh-slides" data-hero-slides>
    <div class="hh-slide is-show" data-slide="doctor">
      <?= img('assets/images/hero/banner-doctor.jpg', 'Welcome to ' . setting('site_name') . ', Bhatkal — our specialist doctors', ['eager'=>true,'w'=>1808,'h'=>870]) ?>
    </div>
    <div class="hh-slide" data-slide="nurses" aria-hidden="true">
      <?= img('assets/images/hero/banner-nurses.jpg', 'Welcome to ' . setting('site_name') . ', Bhatkal — our nursing team', ['eager'=>true,'w'=>1808,'h'=>870]) ?>
    </div>
    <span class="hh-sweep" aria-hidden="true"></span>
  </div>

  <!-- moving objects drifting over the artwork -->
  <div class="hh-objects" aria-hidden="true">
    <span class="hh-ringobj hh-ring-1"></span>
    <span class="hh-ringobj hh-ring-2"></span>
    <i class="hh-dot" style="--x:12%;--y:30%;--d:11s;--s:8px"></i>
    <i class="hh-dot" style="--x:22%;--y:68%;--d:14s;--s:6px"></i>
    <i class="hh-dot" style="--x:38%;--y:20%;--d:12s;--s:5px"></i>
    <i class="hh-dot" style="--x:63%;--y:74%;--d:15s;--s:7px"></i>
    <i class="hh-dot" style="--x:80%;--y:26%;--d:13s;--s:6px"></i>
    <i class="hh-dot" style="--x:90%;--y:60%;--d:16s;--s:5px"></i>
    <i class="hh-dot" style="--x:50%;--y:88%;--d:12s;--s:6px"></i>
  </div>

  <!-- slide indicators -->
  <div class="hh-nav" data-hero-nav>
    <button type="button" class="is-active" data-go="0" aria-label="Show doctor banner"></button>
    <button type="button" data-go="1" aria-label="Show nursing team banner"></button>
  </div>
</section>
