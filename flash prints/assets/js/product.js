/* Product page: thumbnail gallery, zoom lightbox, and Description/Reviews
   accordion. All progressive — the page is fully readable without JS. */
(function () {
  "use strict";

  /* ---- Gallery thumbnails + zoom ---- */
  var gallery = document.querySelector("[data-gallery]");
  var lightbox = document.querySelector("[data-lightbox]");
  if (gallery) {
    var mainImg = gallery.querySelector(".product-gallery__main img");
    var thumbs = Array.prototype.slice.call(gallery.querySelectorAll(".product-thumbs__btn"));

    thumbs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var full = btn.getAttribute("data-full");
        if (full && mainImg) mainImg.setAttribute("src", full);
        thumbs.forEach(function (b) { b.removeAttribute("aria-current"); });
        btn.setAttribute("aria-current", "true");
        if (lightbox) {
          var li = lightbox.querySelector("img");
          if (li && full) li.setAttribute("src", full);
        }
      });
    });

    var zoomBtn = gallery.querySelector("[data-zoom]");
    if (zoomBtn && lightbox) {
      var lbImg = lightbox.querySelector("img");
      var closeBtn = lightbox.querySelector("[data-lightbox-close]");
      var open = function () {
        if (mainImg && lbImg) lbImg.setAttribute("src", mainImg.getAttribute("src"));
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      };
      var close = function () {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      };
      zoomBtn.addEventListener("click", open);
      if (closeBtn) closeBtn.addEventListener("click", close);
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) close();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
      });
    }
  }

  /* ---- Accordion ---- */
  document.querySelectorAll("[data-accordion]").forEach(function (acc) {
    var heads = Array.prototype.slice.call(acc.querySelectorAll(".product-accordion__head"));
    heads.forEach(function (head) {
      head.addEventListener("click", function () {
        var expanded = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", expanded ? "false" : "true");
        var panelId = head.getAttribute("aria-controls");
        var panel = panelId && document.getElementById(panelId);
        if (panel) panel.hidden = expanded;
        var ic = head.querySelector(".pa-icon");
        if (ic) ic.innerHTML = expanded ? "+" : "−";
      });
    });
  });

  /* ---- Review form (static site: acknowledge, don't reload) ---- */
  document.querySelectorAll("[data-review-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (typeof form.reportValidity === "function" && !form.reportValidity()) return;
      var thanks = form.querySelector(".review-form__thanks");
      var submit = form.querySelector(".review-form__submit");
      if (thanks) thanks.hidden = false;
      if (submit) submit.disabled = true;
    });
  });
})();
