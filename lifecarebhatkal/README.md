# Life Care Specialty Hospital — Bhatkal

A complete, production-ready website for **Life Care Specialty Hospital, Bhatkal**:
a fast, premium front-end plus a PHP 8 + MySQL back-end with a full content-management
admin dashboard. Built for **Hostinger shared hosting** (cPanel/hPanel) — deploy by
uploading files; no Node, Composer, Laravel or React required.

---

## ✨ What's included

- **13 public pages** — Home, About, Facilities, Departments (+ per-department), Why Choose Us,
  Doctors (+ per-doctor), Visiting Doctors, Support Staff, Careers, Events, Gallery, Blog
  (+ per-post), Patient Information, Contact, and a styled 404.
- **Enquiry system** — validated, CSRF-protected contact form that saves to the database
  **and** emails the hospital (native `mail()` or SMTP via PHPMailer).
- **Admin dashboard** (`/admin/`) — secure login (password hashing, CSRF, rate-limiting),
  dashboard stats, and full CRUD for Doctors, Departments, Blog, Events, Gallery, Careers,
  Testimonials, FAQs, Enquiries and Site Settings, with image uploads.
- **SEO** — per-page titles/meta, Open Graph & Twitter cards, canonical URLs, JSON-LD
  (Hospital, MedicalClinic, Physician, Article, BreadcrumbList, FAQ), `sitemap.xml`, `robots.txt`.
- **Performance & motion** — responsive mobile-first layout, WebP images via `<picture>`,
  lazy-loading, deferred JS, GSAP + IntersectionObserver scroll animations, Swiper carousels,
  and full `prefers-reduced-motion` support.
- **Graceful data layer** — every page renders from bundled seed content even **before** the
  database is imported, then reads live data from MySQL once it is.

## 🧱 Tech stack

HTML5 · CSS3 (custom-property design system) · Vanilla JS · GSAP + ScrollTrigger · Swiper.js ·
PHP 8+ · MySQL (PDO, prepared statements) · Apache (`.htaccess` clean URLs).

---

## 📁 Project structure

```
lifecarebhatkal/
├── index.php                 # Front controller (clean-URL router)
├── .htaccess                 # Rewrite rules, security headers, caching
├── robots.txt · sitemap.xml
├── config/
│   ├── config.example.php    # Copy → config.php and fill in credentials
│   └── config.php            # YOUR settings (git-ignored, never committed)
├── includes/                 # init, functions (data layer), head/header/footer,
│                             # icons, i18n, seed_data.php, mailer.php
├── pages/                    # One file per view
├── assets/{css,js,images}/   # Front-end assets
├── uploads/                  # Admin-uploaded images (writable)
├── admin/                    # Admin dashboard (router, auth, generic CRUD, pages)
├── database/schema.sql       # GENERATED — import this in phpMyAdmin
└── tools/                    # build_sql.php · build_sitemap.php · make_webp.php
```

Content lives in **one place** — `includes/seed_data.php`. `database/schema.sql` is generated
from it, so the site copy and the DB import never drift apart.

---

## 🚀 Deploy to Hostinger (step by step)

### 1. Upload the files
- **hPanel → Files → File Manager** (or SFTP). Upload the **contents** of `lifecarebhatkal/`
  into your domain's document root (usually `public_html/`).
- Ensure hidden files (`.htaccess`) are uploaded. In File Manager: Settings → *Show hidden files*.

### 2. Create the database
- **hPanel → Databases → MySQL Databases**. Create a database and a user, and attach the user
  to the database (note the DB name, user and password — Hostinger prefixes them, e.g.
  `u123456789_lifecare`).

### 3. Import the schema + content
- **hPanel → Databases → phpMyAdmin** → open your database → **Import** →
  choose `database/schema.sql` → **Go**.
- This creates every table and loads all seed content, plus the default admin account.

### 4. Create your config file
- Copy `config/config.example.php` to `config/config.php` and edit:
  ```php
  define('DB_HOST', 'localhost');            // Hostinger default
  define('DB_NAME', 'u123456789_lifecare');
  define('DB_USER', 'u123456789_lcuser');
  define('DB_PASS', 'your-db-password');
  define('BASE_URL', 'https://lifecarebhatkal.com');   // no trailing slash
  define('CSRF_KEY', 'paste-a-long-random-string-here');
  define('APP_ENV', 'production');           // hides PHP errors
  ```
- `config/config.php` is git-ignored — keep your credentials out of version control.

### 5. Enable SSL and force HTTPS
- **hPanel → Security → SSL** — install the free SSL certificate for your domain.
- Then uncomment the *Force HTTPS* / *www→non-www* block near the top of `.htaccess`.

### 6. Set folder permissions
- Ensure `uploads/` (and its sub-folders) is writable so admin image uploads work
  (typically `755`; use `775` if your host requires it).

### 7. Email delivery (enquiry form)
- **Default:** `MAIL_METHOD = 'mail'` — works on most Hostinger plans out of the box.
- **Recommended (SMTP):** in Hostinger, create a mailbox (e.g. `no-reply@lifecarebhatkal.com`),
  then over SSH run `composer require phpmailer/phpmailer`, set `MAIL_METHOD = 'smtp'` and fill
  the `SMTP_*` values in `config.php`. Enquiries are always saved to the DB regardless of email.

### 8. Log in to the admin and secure it
- Visit `https://lifecarebhatkal.com/admin/`.
- **Default login →** username `admin`, password `lifecare@admin`.
- **Immediately** go to **Site Settings → Change password** and set a strong password.

You're live. 🎉

---

## 🛠️ Maintenance tools (run locally or over SSH)

| Command | What it does |
|---|---|
| `php tools/build_sql.php` | Regenerate `database/schema.sql` from `seed_data.php`. |
| `php tools/build_sitemap.php` | Regenerate `sitemap.xml` (uses `BASE_URL`). |
| `php tools/make_webp.php` | Create `.webp` versions of all JPG/PNG images (auto-served by `<picture>`). Add `--force` to rebuild. |

## 💻 Local development

```bash
# From the project root
php -S localhost:8000
# open http://localhost:8000
```
The site runs immediately from bundled seed content — no database needed for a local preview.
To test the DB-backed features and admin locally, import `database/schema.sql` into a local
MySQL/MariaDB and create `config/config.php` pointing to it.

---

## 🔐 Security notes

- All queries use **PDO prepared statements**. Output is escaped via `e()`.
- Forms are **CSRF-protected**; admin login is **rate-limited** (5 attempts → 15-min lock).
- `config/`, `includes/`, `admin/includes/` and `admin/config/` are denied direct web access,
  and PHP execution is disabled inside `uploads/` (`.htaccess`).
- Sessions are HttpOnly + SameSite=Lax, and Secure once HTTPS is on.

## 🌐 Multilingual UI

The interface ships with an EN / KN / UR switcher for navigation and key calls-to-action.
Long-form page content is in English and can be translated later via the admin.

---

_Some content (leadership names, exact trust statistics, visiting-doctor schedules) uses
sensible placeholders drawn from the client brief — all editable via the admin dashboard._
