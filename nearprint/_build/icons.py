# -*- coding: utf-8 -*-
"""Inline SVG icon set (stroke style, 24 viewBox). currentColor aware."""

_S = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" '
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" '
      'aria-hidden="true" focusable="false">%s</svg>')

_PATHS = {
    # service icons
    "stationery": '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 9h6M7 13h4"/><path d="M17 4v14"/>',
    "megaphone": '<path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M14 8a5 5 0 0 1 0 8"/><path d="M17 5a9 9 0 0 1 0 14"/>',
    "signage": '<rect x="6" y="3" width="12" height="6" rx="1"/><rect x="4" y="11" width="16" height="6" rx="1"/><path d="M12 9v2M12 17v4M9 21h6"/>',
    "branding": '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
    "sticker": '<path d="M15 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9l5-5V5a2 2 0 0 0-2-2Z"/><path d="M15 21v-4a1 1 0 0 1 1-1h4"/>',
    "box": '<path d="m21 8-9-5-9 5 9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
    "shirt": '<path d="M15 3l4 2.5-2 3-2-1V21H7V7.5l-2 1-2-3L7 3a3 3 0 0 0 8 0Z"/>',
    "gift": '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M4 12v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8"/><path d="M12 8v13"/><path d="M12 8S9 8 8 6a2 2 0 1 1 4-2 2 2 0 1 1 4 2c-1 2-4 2-4 2Z"/>',
    # utility icons
    "check": '<path d="M20 6 9 17l-5-5"/>',
    "arrow-right": '<path d="M5 12h14M13 6l6 6-6 6"/>',
    "arrow-up": '<path d="M12 19V5M6 11l6-6 6 6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    "zoom": '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
    "phone": '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/>',
    "mail": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    "pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    "globe": '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"/>',
    "layers": '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    "factory": '<path d="M3 21h18M4 21V10l5 3V10l5 3V6l5 3v12"/><path d="M8 21v-4M13 21v-4M18 21v-4"/>',
    "users": '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5M21 20a6 6 0 0 0-5-5.9"/>',
    "handshake": '<path d="m11 17 2 2a1 1 0 0 0 3-3"/><path d="m14 16 2.5 2.5a1 1 0 0 0 3-3l-4-4"/><path d="M3 9l4-4 6 3 3-1"/><path d="m3 9 5 5a1.4 1.4 0 0 0 2 0l2-2"/>',
    "whatsapp": '<path d="M20 12a8 8 0 0 1-11.9 7L4 20l1-4A8 8 0 1 1 20 12Z"/><path d="M9 9c0 4 2 6 6 6 .6 0 1-.6 1-1.2 0-.3-.2-.5-.5-.7l-1.4-.6a.7.7 0 0 0-.8.2l-.3.4c-.9-.4-1.6-1.1-2-2l.4-.3a.7.7 0 0 0 .2-.8L11 8.5a.8.8 0 0 0-.8-.5C9.6 8 9 8.4 9 9Z" fill="currentColor" stroke="none"/>',
    "facebook": '<path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2l1-3h-3V8a1 1 0 0 1 1-1Z" fill="currentColor" stroke="none"/>',
    "instagram": '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>',
    "linkedin": '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v6M8 7v.01M12 16v-3a2 2 0 0 1 4 0v3M12 16v-6" />',
    "flag": '<path d="M5 21V4M5 4c3-2 7 2 10 0v9c-3 2-7-2-10 0"/>',
    "truck": '<path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/>',
    "sparkle": '<path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z"/>',
}


def icon(name):
    return _S % _PATHS.get(name, "")
