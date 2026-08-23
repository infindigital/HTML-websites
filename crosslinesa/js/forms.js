/* =====================================================================
   forms.js — client-side validation for contact / ask forms
   NOTE: This is a static website. No message is sent to a server here.
         Wire the marked TODO up to your production email/API endpoint.
   ===================================================================== */
(function () {
    'use strict';

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(field, message) {
        field.classList.add('has-error');
        var err = field.querySelector('.field-error');
        if (err && message) err.textContent = message;
    }
    function clearError(field) {
        field.classList.remove('has-error');
    }

    function validateField(field) {
        var input = field.querySelector('input, textarea');
        if (!input) return true;
        var value = input.value.trim();
        var type = input.getAttribute('data-validate');

        if (input.hasAttribute('required') && !value) {
            showError(field, 'This field is required.');
            return false;
        }
        if (type === 'email' && value && !EMAIL_RE.test(value)) {
            showError(field, 'Please enter a valid email address.');
            return false;
        }
        if (type === 'phone' && value && value.replace(/\D/g, '').length < 7) {
            showError(field, 'Please enter a valid phone number.');
            return false;
        }
        clearError(field);
        return true;
    }

    function initForm(form) {
        var fields = form.querySelectorAll('.field');
        var status = form.querySelector('.form-status');

        // live-clear errors while typing
        fields.forEach(function (field) {
            var input = field.querySelector('input, textarea');
            if (input) {
                input.addEventListener('input', function () {
                    if (field.classList.contains('has-error')) validateField(field);
                });
                input.addEventListener('blur', function () { validateField(field); });
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;
            fields.forEach(function (field) {
                if (!validateField(field)) valid = false;
            });

            if (status) { status.className = 'form-status'; status.textContent = ''; }

            if (!valid) {
                if (status) {
                    status.classList.add('is-error');
                    status.textContent = 'Please correct the highlighted fields and try again.';
                }
                var firstError = form.querySelector('.field.has-error input, .field.has-error textarea');
                if (firstError) firstError.focus();
                return;
            }

            /* --------------------------------------------------------
               TODO — INTEGRATION POINT
               Connect this form to your production email / API endpoint.
               Example:
                 fetch('https://your-endpoint.example/contact', {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify(collect(form))
                 })
                 .then(...)  // show success only on a real 2xx response
                 .catch(...) // show error otherwise

               Until a real backend is connected we DO NOT claim the
               message was delivered — we only acknowledge validation.
               -------------------------------------------------------- */
            if (status) {
                status.classList.add('is-success');
                status.textContent = form.getAttribute('data-success') ||
                    'Thank you — your details are valid. This demo form is not yet connected to a mail server, so please also reach us at info@crosslinesa.com or +966 59 398 1232.';
            }
            form.reset();
        });

        // no native browser bubbles — we handle messaging ourselves
        form.setAttribute('novalidate', 'novalidate');
    }

    document.querySelectorAll('form[data-form]').forEach(initForm);
})();
