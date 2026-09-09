<?php
/**
 * <HomeHero /> — Life Care Specialty Hospital
 * Homepage-only hero. A clean, text-free brand background carries the
 * artwork; the "Welcome To Life Care Specialty Hospital" wordmark is
 * rendered as crisp navy HTML text (razor-sharp at any size, and real
 * text for SEO). Only the PERSON changes: the doctor cutout cross-
 * dissolves to the two-nurse cutout and back. A light 3D scene adds
 * depth: pointer tilt, layer parallax, orbit rings and drifting dots.
 * Styles: assets/css/hero.css · behaviour: assets/js/hero.js
 */
?>
<section class="home-hero" id="home-hero" aria-label="Welcome to <?= e(setting('site_name')) ?>, Bhatkal">
  <div class="hh-scene">
    <div class="hh-stage" data-hero-stage>

      <!-- clean brand background (text-free) -->
      <div class="hh-layer hh-bg" aria-hidden="true">
        <div class="hh-inner"><?= img('assets/images/hero/background.jpg', '', ['eager'=>true,'w'=>1806,'h'=>871]) ?></div>
      </div>

      <!-- wordmark as crisp navy HTML text -->
      <div class="hh-layer hh-text">
        <p class="wm-eyebrow">Keeping<br>You Well,<br>Bhatkal</p>
        <h1 class="hh-wordmark">
          <span class="wm-welcome">Welcome To</span>
          <span class="wm-life">Life</span>
          <span class="wm-care">Care</span>
          <span class="wm-sub">Specialty Hospital</span>
        </h1>
      </div>

      <!-- 3D orbit ring behind the person -->
      <span class="hh-orbit hh-orbit-back" aria-hidden="true"></span>

      <!-- the person — cross-dissolves doctor <-> nurses -->
      <div class="hh-layer hh-cut hh-doctor is-show" data-person="doctor">
        <div class="hh-inner"><?= img('assets/images/hero/hero-doctor-cut.png', 'A specialist doctor at ' . setting('site_name') . ', Bhatkal', ['eager'=>true,'w'=>1808,'h'=>870]) ?></div>
      </div>
      <div class="hh-layer hh-cut hh-nurses" data-person="nurses" aria-hidden="true">
        <div class="hh-inner"><?= img('assets/images/hero/hero-nurses-cut.png', 'The nursing team at ' . setting('site_name') . ', Bhatkal', ['eager'=>true,'w'=>1808,'h'=>870]) ?></div>
      </div>

      <!-- 3D orbit ring in front + light sweep on each change -->
      <span class="hh-orbit hh-orbit-front" aria-hidden="true"></span>
      <span class="hh-sweep" aria-hidden="true"></span>

      <!-- drifting particles -->
      <div class="hh-objects" aria-hidden="true">
        <i style="--x:16%;--y:30%;--d:11s;--s:8px;--z:70px"></i>
        <i style="--x:26%;--y:66%;--d:14s;--s:6px;--z:40px"></i>
        <i style="--x:47%;--y:22%;--d:12s;--s:5px;--z:90px"></i>
        <i style="--x:70%;--y:72%;--d:15s;--s:7px;--z:55px"></i>
        <i style="--x:82%;--y:30%;--d:13s;--s:6px;--z:80px"></i>
        <i style="--x:90%;--y:58%;--d:16s;--s:5px;--z:45px"></i>
      </div>
    </div>
  </div>
</section>
