/* Product archive: client-side search + category filter + pagination.
   Works purely on the DOM already rendered (no backend). */
(function () {
  "use strict";
  var grid = document.getElementById("archiveGrid");
  if (!grid) return;

  var PER_PAGE = parseInt(grid.dataset.perPage || "12", 10);
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".product-cell"));
  var searchInput = document.getElementById("archiveSearch");
  var chips = Array.prototype.slice.call(document.querySelectorAll(".filter-chip"));
  var pagination = document.getElementById("archivePagination");
  var countEl = document.getElementById("archiveCount");
  var noResults = document.getElementById("noResults");

  var activeCat = "all";
  var query = "";
  var page = 1;

  function matches(card) {
    var okCat = activeCat === "all" || card.dataset.category === activeCat;
    var okQ = !query || card.dataset.name.indexOf(query) !== -1;
    return okCat && okQ;
  }

  function render() {
    var visible = cards.filter(matches);
    var pages = Math.max(1, Math.ceil(visible.length / PER_PAGE));
    if (page > pages) page = pages;
    var start = (page - 1) * PER_PAGE;
    var end = start + PER_PAGE;

    cards.forEach(function (c) { c.style.display = "none"; });
    visible.slice(start, end).forEach(function (c) { c.style.display = ""; });

    if (countEl) {
      countEl.textContent = visible.length + (visible.length === 1 ? " product" : " products");
    }
    if (noResults) noResults.style.display = visible.length ? "none" : "block";

    renderPagination(pages);
  }

  function renderPagination(pages) {
    if (!pagination) return;
    pagination.innerHTML = "";
    if (pages <= 1) return;

    function pageBtn(label, target, opts) {
      opts = opts || {};
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      if (opts.current) b.setAttribute("aria-current", "true");
      if (opts.disabled) b.disabled = true;
      b.setAttribute("aria-label", opts.aria || ("Go to page " + target));
      b.addEventListener("click", function () {
        page = target;
        render();
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return b;
    }

    pagination.appendChild(pageBtn("‹", page - 1, { disabled: page === 1, aria: "Previous page" }));
    for (var i = 1; i <= pages; i++) {
      pagination.appendChild(pageBtn(String(i), i, { current: i === page }));
    }
    pagination.appendChild(pageBtn("›", page + 1, { disabled: page === pages, aria: "Next page" }));
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      query = searchInput.value.trim().toLowerCase();
      page = 1;
      render();
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      chip.setAttribute("aria-pressed", "true");
      activeCat = chip.dataset.category;
      page = 1;
      render();
    });
  });

  render();
})();
