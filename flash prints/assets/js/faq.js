/* FAQ accordions (used on home + FAQ page) */
(function () {
  "use strict";
  var items = document.querySelectorAll(".faq-item");
  items.forEach(function (item) {
    var btn = item.querySelector(".faq-item__q");
    var body = item.querySelector(".faq-item__a");
    if (!btn || !body) return;

    btn.addEventListener("click", function () {
      var open = item.classList.contains("is-open");
      /* single-open behaviour within the same faq group */
      var group = item.closest(".faq") || document;
      group.querySelectorAll(".faq-item.is-open").forEach(function (other) {
        if (other !== item) {
          other.classList.remove("is-open");
          other.querySelector(".faq-item__q").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-item__a").style.maxHeight = null;
        }
      });
      item.classList.toggle("is-open", !open);
      btn.setAttribute("aria-expanded", !open ? "true" : "false");
      body.style.maxHeight = !open ? body.scrollHeight + "px" : null;
    });
  });

  /* keep open panels sized correctly on resize */
  window.addEventListener("resize", function () {
    document.querySelectorAll(".faq-item.is-open .faq-item__a").forEach(function (b) {
      b.style.maxHeight = b.scrollHeight + "px";
    });
  });
})();
