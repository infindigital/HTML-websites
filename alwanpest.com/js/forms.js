/* ==========================================================================
   Alwan Pest Control — Forms
   Client-side validation + graceful (no-backend) submission handling.
   ========================================================================== */
(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setInvalid(field, msg) {
    field.classList.add("invalid");
    var err = field.querySelector(".form-error");
    if (err && msg) err.textContent = msg;
  }
  function clearInvalid(field) { field.classList.remove("invalid"); }

  function validateField(input) {
    var field = input.closest(".field") || input.parentElement;
    var val = (input.value || "").trim();
    if (input.hasAttribute("required") && !val) {
      setInvalid(field, "This field is required."); return false;
    }
    if (input.type === "email" && val && !EMAIL_RE.test(val)) {
      setInvalid(field, "Please enter a valid email address."); return false;
    }
    if (input.type === "tel" && val && val.replace(/[^0-9]/g, "").length < 7) {
      setInvalid(field, "Please enter a valid phone number."); return false;
    }
    clearInvalid(field);
    return true;
  }

  document.querySelectorAll("form[data-validate]").forEach(function (form) {
    var controls = form.querySelectorAll("input, textarea");

    controls.forEach(function (input) {
      input.addEventListener("blur", function () { validateField(input); });
      input.addEventListener("input", function () {
        var field = input.closest(".field") || input.parentElement;
        if (field.classList.contains("invalid")) validateField(input);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      controls.forEach(function (input) { if (!validateField(input)) ok = false; });
      var status = form.querySelector(".form-status");

      if (!ok) {
        var firstBad = form.querySelector(".field.invalid input, .field.invalid textarea");
        firstBad && firstBad.focus();
        return;
      }
      // No backend on this static site — acknowledge gracefully.
      if (status) {
        status.className = "form-status success";
        status.textContent = "Thank you! Your message has been received. Our team will contact you shortly.";
      }
      form.reset();
    });
  });
})();
