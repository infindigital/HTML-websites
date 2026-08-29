/* Client-side contact form validation + submission UI.
   Submissions POST to send.php, which delivers the enquiry by email using
   PHPMailer + Gmail SMTP (see send.php and README for setup). If the endpoint
   is unreachable — e.g. previewing the static files without PHP — a friendly
   demo confirmation is shown instead. */
(function () {
  "use strict";

  /* PHP mail handler (PHPMailer + Gmail SMTP). Leave blank to force demo mode. */
  var FORM_ENDPOINT = "send.php";

  var form = document.querySelector(".contact-form");
  if (!form) return;

  var status = form.querySelector(".form-status");

  function setError(field, msg) {
    field.classList.add("field--error");
    var el = field.querySelector(".field__error");
    if (el && msg) el.textContent = msg;
  }
  function clearError(field) { field.classList.remove("field--error"); }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = true;
    var fields = form.querySelectorAll(".field");
    fields.forEach(clearError);

    var name = form.querySelector('[name="name"]');
    var email = form.querySelector('[name="email"]');
    var message = form.querySelector('[name="message"]');

    if (name && !name.value.trim()) { setError(name.closest(".field"), "Please enter your name."); ok = false; }
    if (email && !validEmail(email.value.trim())) { setError(email.closest(".field"), "Please enter a valid email address."); ok = false; }
    if (message && message.value.trim().length < 10) { setError(message.closest(".field"), "Please add a few more details (min. 10 characters)."); ok = false; }

    if (!ok) {
      if (status) { status.className = "form-status is-error"; status.textContent = "Please correct the highlighted fields."; }
      return;
    }

    var submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.label = submitBtn.textContent; submitBtn.textContent = "Sending…"; }

    function done(success) {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.label || "Send"; }
      if (!status) return;
      if (success) {
        status.className = "form-status is-success";
        status.textContent = "Thank you! Your message has been received. Our team will get back to you shortly.";
        form.reset();
      } else {
        status.className = "form-status is-error";
        status.textContent = "Something went wrong. Please call us on +971 58 891 7109 or email sales@flashprintsolution.com.";
      }
    }

    if (!FORM_ENDPOINT) {
      /* Demo mode — no endpoint configured. */
      setTimeout(function () { done(true); }, 700);
      return;
    }

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name ? name.value.trim() : "",
        email: email ? email.value.trim() : "",
        message: message ? message.value.trim() : "",
        /* honeypot — real users leave this empty */
        company: (form.querySelector('[name="company"]') || {}).value || ""
      })
    })
      .then(function (r) { done(r.ok); })
      .catch(function () { done(false); });
  });

  /* clear error state as the user types */
  form.querySelectorAll("input, textarea").forEach(function (el) {
    el.addEventListener("input", function () { clearError(el.closest(".field")); });
  });
})();
