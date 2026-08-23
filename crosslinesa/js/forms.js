/* =====================================================================
   forms.js — client-side validation + submission for contact / ask forms
   Submits to contact-handler.php (PHPMailer / SMTP) and only reports
   success on a real 2xx response from the server.
   ===================================================================== */
(function () {
    'use strict';

    var ENDPOINT = 'contact-handler.php';
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

    function collect(form) {
        var payload = {};
        form.querySelectorAll('input, textarea').forEach(function (el) {
            if (el.name) payload[el.name] = el.value.trim();
        });
        payload.form_source = form.getAttribute('data-source') || 'Website';
        return payload;
    }

    function setStatus(status, kind, text) {
        if (!status) return;
        status.className = 'form-status' + (kind ? ' is-' + kind : '');
        status.textContent = text || '';
    }

    function initForm(form) {
        var fields = form.querySelectorAll('.field');
        var status = form.querySelector('.form-status');
        var button = form.querySelector('button[type="submit"]');

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

            setStatus(status, '', '');

            if (!valid) {
                setStatus(status, 'error', 'Please correct the highlighted fields and try again.');
                var firstError = form.querySelector('.field.has-error input, .field.has-error textarea');
                if (firstError) firstError.focus();
                return;
            }

            var originalLabel = button ? button.textContent : '';
            if (button) { button.disabled = true; button.textContent = 'Sending…'; }
            setStatus(status, 'pending', 'Sending your message…');

            fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(collect(form))
            })
                .then(function (res) {
                    return res.json().catch(function () { return {}; })
                        .then(function (body) { return { ok: res.ok, body: body }; });
                })
                .then(function (result) {
                    if (result.ok && result.body && result.body.ok) {
                        setStatus(status, 'success',
                            result.body.message ||
                            form.getAttribute('data-success') ||
                            'Thank you! Your message has been sent.');
                        form.reset();
                    } else {
                        setStatus(status, 'error',
                            (result.body && result.body.message) ||
                            'Sorry, your message could not be sent. Please email info@crosslinesa.com or call +966 59 398 1232.');
                    }
                })
                .catch(function () {
                    setStatus(status, 'error',
                        'Network error — please email info@crosslinesa.com or call +966 59 398 1232.');
                })
                .finally(function () {
                    if (button) { button.disabled = false; button.textContent = originalLabel; }
                });
        });

        // no native browser bubbles — we handle messaging ourselves
        form.setAttribute('novalidate', 'novalidate');
    }

    document.querySelectorAll('form[data-form]').forEach(initForm);
})();
