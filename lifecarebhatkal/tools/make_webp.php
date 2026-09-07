<?php
/**
 * Generate .webp siblings for every JPG/PNG under assets/images and uploads,
 * using PHP-GD (no ImageMagick needed). The img() helper automatically serves
 * the .webp version via <picture> when a sibling exists.
 *
 * Run:  php tools/make_webp.php            (all images)
 *       php tools/make_webp.php --force    (rebuild even if .webp exists)
 *
 * Safe to run on Hostinger over SSH, or locally before uploading.
 */
declare(strict_types=1);
define('ROOT_PATH', dirname(__DIR__));

if (!function_exists('imagewebp')) {
    fwrite(STDERR, "GD with WebP support is not available in this PHP build.\n");
    exit(1);
}
$force   = in_array('--force', $argv, true);
$quality = 82;
$dirs    = [ROOT_PATH . '/assets/images', ROOT_PATH . '/uploads'];
$made = 0; $skipped = 0; $failed = 0;

foreach ($dirs as $root) {
    if (!is_dir($root)) continue;
    $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS));
    foreach ($it as $file) {
        $path = $file->getPathname();
        if (!preg_match('/\.(jpe?g|png)$/i', $path)) continue;
        $webp = preg_replace('/\.(jpe?g|png)$/i', '.webp', $path);
        if (!$force && is_file($webp)) { $skipped++; continue; }

        $ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        $img = $ext === 'png' ? @imagecreatefrompng($path) : @imagecreatefromjpeg($path);
        if (!$img) { $failed++; echo "  ! could not read $path\n"; continue; }
        if ($ext === 'png') { imagepalettetotruecolor($img); imagealphablending($img, true); imagesavealpha($img, true); }
        if (imagewebp($img, $webp, $quality)) { $made++; }
        else { $failed++; echo "  ! could not write $webp\n"; }
        imagedestroy($img);
    }
}
echo "WebP generation complete — created: $made, skipped(existing): $skipped, failed: $failed\n";
