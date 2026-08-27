/* ==========================================================================
   Alwan Pest Control — Main interactions
   Hero slider, animated counters, testimonial carousel, scroll reveal, footer year.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Home hero slider (crossfade) ---- */
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    var hi = 0;
    setInterval(function () {
      slides[hi].classList.remove("active");
      hi = (hi + 1) % slides.length;
      slides[hi].classList.add("active");
    }, 5000);
  }

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll("[data-count]");
  var counted = false;
  function animateCounters() {
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      var dur = 1600, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var val = Math.floor(p * target);
        el.textContent = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      }
      requestAnimationFrame(step);
    });
  }
  if (counters.length) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !counted) { counted = true; animateCounters(); }
      });
    }, { threshold: 0.4 });
    statObserver.observe(counters[0].closest("section") || counters[0]);
  }

  /* ---- Testimonial carousel ---- */
  var tst = document.querySelector("[data-testimonials]");
  if (tst) {
    var items = tst.querySelectorAll(".tst-item");
    var dotsWrap = tst.querySelector(".tst-dots");
    var idx = 0, timer;

    // build dots
    items.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Show testimonial " + (i + 1));
      if (i === 0) b.classList.add("active");
      b.addEventListener("click", function () { go(i); reset(); });
      dotsWrap.appendChild(b);
    });
    var dots = dotsWrap.querySelectorAll("button");

    function go(n) {
      items[idx].classList.remove("active");
      dots[idx].classList.remove("active");
      idx = (n + items.length) % items.length;
      items[idx].classList.add("active");
      dots[idx].classList.add("active");
    }
    function reset() { clearInterval(timer); timer = setInterval(function () { go(idx + 1); }, 6000); }

    var prev = tst.querySelector(".tst-arrow.prev");
    var next = tst.querySelector(".tst-arrow.next");
    prev && prev.addEventListener("click", function () { go(idx - 1); reset(); });
    next && next.addEventListener("click", function () { go(idx + 1); reset(); });
    reset();
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }
})();
