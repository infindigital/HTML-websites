/* Homepage product collections — paginated pages inside each tab panel.
   Each [data-collection] holds several .collection__page blocks and a
   .collection__pager with numbered buttons + prev/next. */
(function () {
  "use strict";

  function setupCollection(root) {
    var pages = Array.prototype.slice.call(root.querySelectorAll(".collection__page"));
    var pager = root.querySelector(".collection__pager");
    if (!pages.length || !pager) return;
    var numBtns = Array.prototype.slice.call(pager.querySelectorAll(".collection__pagebtn"));
    var total = pages.length;
    var current = 1;

    function show(n) {
      n = Math.max(1, Math.min(total, n));
      current = n;
      pages.forEach(function (pg) {
        var pn = parseInt(pg.getAttribute("data-page"), 10);
        if (pn === n) { pg.hidden = false; } else { pg.hidden = true; }
      });
      numBtns.forEach(function (b) {
        if (parseInt(b.getAttribute("data-goto"), 10) === n) {
          b.setAttribute("aria-current", "true");
        } else {
          b.removeAttribute("aria-current");
        }
      });
      var navs = pager.querySelectorAll(".collection__nav");
      navs.forEach && navs.forEach(function (nav) {
        var dir = nav.getAttribute("data-goto");
        if (dir === "prev") nav.disabled = (n === 1);
        if (dir === "next") nav.disabled = (n === total);
      });
    }

    pager.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-goto]");
      if (!btn || btn.disabled) return;
      var goto = btn.getAttribute("data-goto");
      if (goto === "prev") show(current - 1);
      else if (goto === "next") show(current + 1);
      else show(parseInt(goto, 10));
    });

    show(1);
  }

  document.querySelectorAll("[data-collection]").forEach(setupCollection);
})();
