<?php
/**
 * Inline SVG line-icon set. Usage: echo icon('emergency', 'w-6');
 * Stroke-based, uses currentColor so it inherits text colour.
 */
function icon(string $name, string $class = ''): string {
    static $p = null;
    if ($p === null) $p = [
        // medical / service
        'scan'        => '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>',
        'emergency'   => '<path d="M12 3l7 4v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V7z"/><path d="M12 8.5v5M9.5 11h5"/>',
        'bone'        => '<path d="M8.5 8.5l7 7"/><path d="M8.5 8.5a2.2 2.2 0 10-2.4 2.4L8 12.6M15.5 15.5a2.2 2.2 0 102.4-2.4L16 11.4"/><path d="M6.1 10.9a2.2 2.2 0 10-.1 3.1 2.2 2.2 0 103.1-.1M17.9 13.1a2.2 2.2 0 10.1-3.1 2.2 2.2 0 10-3.1.1"/>',
        'surgery'     => '<path d="M4 5l9 9M6.5 5H4v2.5M14 15l4.5 4.5a1.8 1.8 0 002.5-2.5L16.5 12.5"/><circle cx="15" cy="9" r="3"/>',
        'tooth'       => '<path d="M12 4c-2.5-1.5-6 0-6 3.5 0 2 .5 3 1 5s.7 5 1.6 5 1-2.5 1.4-4.2c.2-.9.5-1.3 1-1.3s.8.4 1 1.3C13.4 20.5 13.5 23 14.4 23s1.1-3 1.6-5 1-3 1-5C17 4 14.5 2.5 12 4z"/>',
        'diagnostic'  => '<path d="M3 12h3l2-5 3 10 2.5-7 1.5 4h4"/>',
        'stethoscope' => '<path d="M6 3v4a4 4 0 008 0V3"/><path d="M6 3H4.5M8 3H9.5M10 11v3a5 5 0 0010 0v-1"/><circle cx="19" cy="12" r="2"/>',
        'heart'       => '<path d="M12 20s-7-4.6-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.4-7 10-7 10z"/><path d="M8 12h2l1-2 1.5 3 1-1.5H16"/>',
        'ultrasound'  => '<path d="M4 14a8 8 0 0116 0"/><path d="M4 14l2 4h12l2-4"/><path d="M9 8.5c1.5-1 3-1 4.5 0"/>',
        'xray'        => '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 6v12M9 9c2 1 4 1 6 0M9 15c2-1 4-1 6 0"/>',
        'lab'         => '<path d="M9 3v6l-4 8a2 2 0 001.8 3h10.4a2 2 0 001.8-3l-4-8V3"/><path d="M8 3h8M7.5 14h9"/>',
        'daycare'     => '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        'bed'         => '<path d="M3 8v11M3 12h18v7M21 12v-2a2 2 0 00-2-2h-7v4"/><circle cx="7" cy="11" r="1.6"/>',
        'physio'      => '<circle cx="9" cy="5" r="1.8"/><path d="M9 8l-2 5 3 1 1 5M7 13l-3 1M12 14l4 2 3-2"/>',
        'pharmacy'    => '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M8 7V5a4 4 0 018 0v2M12 11v5M9.5 13.5h5"/>',
        'ambulance'   => '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/><path d="M7 9v3M5.5 10.5h3"/>',
        // ui
        'phone'       => '<path d="M5 4h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
        'whatsapp'    => '<path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z"/><path d="M8.5 8.5c-.3 1 .2 2.4 1.3 3.6s2.6 1.8 3.6 1.5c.6-.2 1-.9 1.1-1.4l-1.8-1-.9.9c-.7-.3-1.4-1-1.8-1.8l.9-.9-1-1.8c-.5.1-1.2.4-1.4 1z"/>',
        'mail'        => '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
        'location'    => '<path d="M12 21s-6-5.3-6-10a6 6 0 1112 0c0 4.7-6 10-6 10z"/><circle cx="12" cy="11" r="2.2"/>',
        'clock'       => '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        'arrow'       => '<path d="M5 12h14M13 6l6 6-6 6"/>',
        'arrow-up'    => '<path d="M12 19V5M6 11l6-6 6 6"/>',
        'chevron'     => '<path d="M9 6l6 6-6 6"/>',
        'chevron-down'=> '<path d="M6 9l6 6 6-6"/>',
        'check'       => '<path d="M5 12l5 5 9-11"/>',
        'star'        => '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9z"/>',
        'menu'        => '<path d="M4 7h16M4 12h16M4 17h16"/>',
        'close'       => '<path d="M6 6l12 12M18 6L6 18"/>',
        'quote'       => '<path d="M7 7h4v5c0 2.2-1.3 3.6-3.5 4.2M13 7h4v5c0 2.2-1.3 3.6-3.5 4.2"/>',
        'globe'       => '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/>',
        'facebook'    => '<path d="M14 8h2V5h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.5c0-.3.2-.5.5-.5z"/>',
        'instagram'   => '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="0.6" fill="currentColor"/>',
        'youtube'     => '<rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="M10 9.2l5 2.8-5 2.8z" fill="currentColor" stroke="none"/>',
        'award'       => '<circle cx="12" cy="9" r="5"/><path d="M9 13l-1.5 7L12 18l4.5 2L15 13"/>',
        'shield'      => '<path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
        'users'       => '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16 5.5a3 3 0 010 5.8M21 20c0-2.6-1.6-4.5-4-5.2"/>',
    ];
    $body = $p[$name] ?? $p['check'];
    $cls = $class ? ' class="' . e($class) . '"' : '';
    return '<svg' . $cls . ' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" '
        . 'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $body . '</svg>';
}
