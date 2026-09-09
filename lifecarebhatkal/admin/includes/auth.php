<?php
/**
 * Admin authentication — DB-backed login with hashing, CSRF and
 * per-account rate limiting (LOGIN_MAX_ATTEMPTS / LOGIN_LOCK_SECONDS).
 */

function admin_url(string $path = ''): string {
    $path = ltrim($path, '/');
    // Use the front-controller directly so the admin works even where
    // clean-URL rewriting (admin/.htaccess) is unavailable on the host.
    return url('admin/index.php' . ($path !== '' ? '?p=' . $path : ''));
}

/** The logged-in admin row, or null. */
function current_admin(): ?array {
    if (empty($_SESSION['admin_id'])) return null;
    static $cache = null;
    if ($cache !== null) return $cache ?: null;
    $row = q1("SELECT id, username, email, name, role FROM admins WHERE id=? LIMIT 1", [(int)$_SESSION['admin_id']]);
    $cache = $row ?: false;
    return $row;
}

function is_logged_in(): bool { return current_admin() !== null; }

/**
 * Role-based access.
 * The agency account (role 'admin') has full access — admin_allowed_sections()
 * returns null meaning "everything". A hospital account (role 'hospital') is
 * limited to the sections below; every other section is hidden from the sidebar
 * and blocked in the router. 'dashboard', 'logout' and "View site" are always
 * available to any logged-in user.
 */
const HOSPITAL_SECTIONS = ['dashboard', 'doctors', 'blog_posts', 'enquiries', 'settings'];

/** Allowed section slugs for the current admin, or null for full access. */
function admin_allowed_sections(): ?array {
    $admin = current_admin();
    $role  = $admin['role'] ?? 'admin';
    return $role === 'hospital' ? HOSPITAL_SECTIONS : null;
}

/** True if the current admin may open the given section slug. */
function admin_can(string $section): bool {
    $allowed = admin_allowed_sections();
    return $allowed === null || in_array($section, $allowed, true);
}

/** Redirect to login if not authenticated. */
function require_login(): void {
    if (!is_logged_in()) {
        header('Location: ' . admin_url('login'));
        exit;
    }
}

/** Attempt login. Returns [ok(bool), message(string)]. */
function attempt_login(string $username, string $password): array {
    $pdo = db();
    if (!$pdo) return [false, 'Database not configured. Import database/schema.sql and set config/config.php first.'];

    $max  = defined('LOGIN_MAX_ATTEMPTS') ? LOGIN_MAX_ATTEMPTS : 5;
    $lock = defined('LOGIN_LOCK_SECONDS') ? LOGIN_LOCK_SECONDS : 900;

    $admin = q1("SELECT * FROM admins WHERE username=? LIMIT 1", [$username]);
    if (!$admin) return [false, 'Invalid username or password.'];

    // Locked out?
    if (!empty($admin['locked_until']) && strtotime($admin['locked_until']) > time()) {
        $mins = ceil((strtotime($admin['locked_until']) - time()) / 60);
        return [false, "Account locked due to failed attempts. Try again in {$mins} minute(s)."];
    }

    if (!password_verify($password, $admin['password_hash'])) {
        $attempts = (int)$admin['failed_attempts'] + 1;
        if ($attempts >= $max) {
            $until = date('Y-m-d H:i:s', time() + $lock);
            q("UPDATE admins SET failed_attempts=?, locked_until=? WHERE id=?", [$attempts, $until, $admin['id']]);
            return [false, 'Too many failed attempts. Account locked for ' . ceil($lock / 60) . ' minutes.'];
        }
        q("UPDATE admins SET failed_attempts=? WHERE id=?", [$attempts, $admin['id']]);
        $left = $max - $attempts;
        return [false, "Invalid username or password. {$left} attempt(s) left."];
    }

    // Success — rehash if needed, reset counters, regenerate session
    if (password_needs_rehash($admin['password_hash'], PASSWORD_DEFAULT)) {
        q("UPDATE admins SET password_hash=? WHERE id=?", [password_hash($password, PASSWORD_DEFAULT), $admin['id']]);
    }
    q("UPDATE admins SET failed_attempts=0, locked_until=NULL, last_login=NOW() WHERE id=?", [$admin['id']]);
    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int)$admin['id'];
    return [true, 'Welcome back, ' . ($admin['name'] ?: $admin['username']) . '.'];
}

function logout(): void {
    unset($_SESSION['admin_id']);
    session_regenerate_id(true);
}

/** Change the current admin's password. Returns [ok, message]. */
function change_password(string $current, string $new): array {
    $admin = q1("SELECT * FROM admins WHERE id=? LIMIT 1", [(int)$_SESSION['admin_id']]);
    if (!$admin || !password_verify($current, $admin['password_hash'])) return [false, 'Current password is incorrect.'];
    if (strlen($new) < 8) return [false, 'New password must be at least 8 characters.'];
    q("UPDATE admins SET password_hash=? WHERE id=?", [password_hash($new, PASSWORD_DEFAULT), $admin['id']]);
    return [true, 'Password updated successfully.'];
}
