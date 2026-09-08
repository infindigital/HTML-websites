<?php
/**
 * <HomeHero /> — Life Care Specialty Hospital
 * Self-contained, homepage-only animated hero. Isolated from the rest of the
 * site: all styles live in assets/css/hero.css and behaviour in assets/js/hero.js,
 * both loaded only when $meta['home_hero'] is set (see head.php / footer.php).
 *
 * Composition layers (back -> front):
 *   1 gradient background + soft blobs + faint dot grids + light beam
 *   2 orbiting 3D medical lines (behind the person)
 *   3 radial glow halo behind the person
 *   4 the person — doctor <-> two nurses, cinematic cross-transition
 *   5 orbiting lines (in front, low + to the side, never over the face)
 *   6 floating particles + scroll cue
 * Copy lives as real HTML for SEO/accessibility.
 */
$emg = tel_href(setting('phone1'));
?>
<section class="home-hero" id="home-hero" aria-label="Welcome to <?= e(setting('site_name')) ?>">

  <!-- 1 · background -->
  <div class="hh-bg" aria-hidden="true">
    <span class="hh-blob hh-blob-1"></span>
    <span class="hh-blob hh-blob-2"></span>
    <span class="hh-blob hh-blob-3"></span>
    <span class="hh-grid hh-grid-tr"></span>
    <span class="hh-grid hh-grid-bl"></span>
    <span class="hh-beam"></span>
  </div>

  <!-- 2 · orbit lines behind the person -->
  <svg class="hh-orbits hh-orbits-back" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="hhLineA" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#eaf6ff" stop-opacity="0"/>
        <stop offset=".5" stop-color="#bfe7f7" stop-opacity=".9"/>
        <stop offset="1" stop-color="#2aa8e0" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="hhLineB" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8fd6f5" stop-opacity="0"/>
        <stop offset=".5" stop-color="#ffffff" stop-opacity=".8"/>
        <stop offset="1" stop-color="#4bc0ea" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <g class="hh-orbit-spin hh-spin-slow">
      <ellipse cx="980" cy="450" rx="560" ry="250" transform="rotate(-16 980 450)" stroke="url(#hhLineA)" fill="none" stroke-width="1.6"/>
      <ellipse cx="980" cy="450" rx="430" ry="180" transform="rotate(-16 980 450)" stroke="url(#hhLineB)" fill="none" stroke-width="1.3" opacity=".8"/>
    </g>
    <g class="hh-orbit-spin hh-spin-med">
      <ellipse cx="980" cy="460" rx="640" ry="330" transform="rotate(14 980 460)" stroke="url(#hhLineB)" fill="none" stroke-width="1.2" opacity=".55"/>
    </g>
    <g class="hh-flow">
      <path d="M300,720 C620,560 780,760 1180,540" stroke="url(#hhLineA)" fill="none" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M420,180 C760,300 1040,180 1360,360" stroke="url(#hhLineB)" fill="none" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>
    </g>
  </svg>

  <!-- 3 · glow halo -->
  <span class="hh-glow" aria-hidden="true"></span>

  <div class="hh-wrap container">
    <!-- content (left) -->
    <div class="hh-content">
      <span class="hh-eyebrow">Keeping you well, Bhatkal</span>
      <h1 class="hh-title">
        <span class="hh-line">Quality healthcare,</span>
        <span class="hh-line hh-strong">close to home.</span>
      </h1>
      <p class="hh-lead">Life Care Specialty Hospital brings comprehensive medical care, advanced diagnostics and specialist services to Bhatkal and surrounding communities.</p>
      <div class="hh-cta">
        <a href="<?= url('departments') ?>" class="hh-btn hh-btn-primary">Explore Our Services <?= icon('arrow') ?></a>
        <a href="<?= e($emg) ?>" class="hh-btn hh-btn-ghost"><?= icon('emergency') ?>24x7 Emergency</a>
      </div>
    </div>

    <!-- person (right) -->
    <div class="hh-figure" data-hero-figure>
      <span class="hh-ring" aria-hidden="true"></span>
      <div class="hh-stage">
        <figure class="hh-person is-doctor is-show" data-person="doctor">
          <?= img('assets/images/hero/hero-doctor-cut.png', 'A specialist doctor at ' . setting('site_name') . ', Bhatkal', ['eager'=>true,'w'=>852,'h'=>812]) ?>
        </figure>
        <figure class="hh-person is-nurses" data-person="nurses" aria-hidden="true">
          <?= img('assets/images/hero/hero-nurses-cut.png', 'Nursing team at ' . setting('site_name') . ', Bhatkal', ['eager'=>true,'w'=>852,'h'=>812]) ?>
        </figure>
        <span class="hh-sweep" aria-hidden="true"></span>
        <span class="hh-floor" aria-hidden="true"></span>
      </div>
      <span class="hh-chip" aria-hidden="true"><span class="hh-dot"></span>24&times;7 Accident &amp; Emergency</span>
    </div>
  </div>

  <!-- 5 · orbit lines in front (lower / to the side) -->
  <svg class="hh-orbits hh-orbits-front" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g class="hh-flow hh-flow-front">
      <path d="M560,860 C760,700 980,860 1240,690" stroke="url(#hhLineB)" fill="none" stroke-width="1.8" stroke-linecap="round"/>
    </g>
  </svg>

  <!-- 6 · particles + scroll cue -->
  <div class="hh-particles" aria-hidden="true">
    <i style="--x:14%;--y:32%;--d:9s;--s:5px"></i>
    <i style="--x:26%;--y:68%;--d:12s;--s:4px"></i>
    <i style="--x:60%;--y:22%;--d:11s;--s:3px"></i>
    <i style="--x:78%;--y:74%;--d:14s;--s:5px"></i>
    <i style="--x:88%;--y:40%;--d:10s;--s:3px"></i>
    <i style="--x:44%;--y:86%;--d:13s;--s:4px"></i>
  </div>

  <a href="#welcome" class="hh-scroll" aria-label="Scroll to explore"><span class="hh-mouse"></span></a>
</section>
