<?php
/**
 * Lightweight i18n for UI labels. English is the source; Kannada + Urdu
 * translations cover navigation and key calls-to-action so the EN/KN/UR
 * switcher works. Long-form page copy stays in English (client to supply
 * translated content later, editable via the admin).
 */
function current_lang(): string {
    $allowed = ['en', 'kn', 'ur'];
    if (isset($_GET['lang']) && in_array($_GET['lang'], $allowed, true)) {
        setcookie('lc_lang', $_GET['lang'], time() + 31536000, '/');
        return $_GET['lang'];
    }
    $c = $_COOKIE['lc_lang'] ?? 'en';
    return in_array($c, $allowed, true) ? $c : 'en';
}

$GLOBALS['I18N'] = [
    'en' => [
        'nav_home' => 'Home', 'nav_about' => 'About Us', 'nav_facilities' => 'Our Facilities',
        'nav_departments' => 'Departments', 'nav_why' => 'Why Choose Us', 'nav_doctors' => 'Doctors',
        'nav_visiting' => 'Visiting Doctors', 'nav_support' => 'Support Staff', 'nav_careers' => 'Careers',
        'nav_events' => 'Events', 'nav_gallery' => 'Gallery', 'nav_blog' => 'Blog',
        'nav_patient' => 'Patient Information', 'nav_contact' => 'Contact',
        'cta_enquire' => 'Enquire Now', 'cta_call' => 'Call', 'cta_emergency' => '24×7 Emergency',
        'cta_directions' => 'Get Directions', 'read_more' => 'Read More', 'view_all' => 'View All',
        'emergency_line' => '24×7 Accident & Emergency', 'duty' => 'Duty Doctors available every day, 24×7',
    ],
    'kn' => [
        'nav_home' => 'ಮುಖಪುಟ', 'nav_about' => 'ನಮ್ಮ ಬಗ್ಗೆ', 'nav_facilities' => 'ಸೌಲಭ್ಯಗಳು',
        'nav_departments' => 'ವಿಭಾಗಗಳು', 'nav_why' => 'ನಮ್ಮನ್ನೇ ಏಕೆ', 'nav_doctors' => 'ವೈದ್ಯರು',
        'nav_visiting' => 'ಭೇಟಿ ವೈದ್ಯರು', 'nav_support' => 'ಸಹಾಯಕ ಸಿಬ್ಬಂದಿ', 'nav_careers' => 'ಉದ್ಯೋಗ',
        'nav_events' => 'ಕಾರ್ಯಕ್ರಮಗಳು', 'nav_gallery' => 'ಗ್ಯಾಲರಿ', 'nav_blog' => 'ಬ್ಲಾಗ್',
        'nav_patient' => 'ರೋಗಿ ಮಾಹಿತಿ', 'nav_contact' => 'ಸಂಪರ್ಕ',
        'cta_enquire' => 'ವಿಚಾರಿಸಿ', 'cta_call' => 'ಕರೆ ಮಾಡಿ', 'cta_emergency' => '24×7 ತುರ್ತು',
        'cta_directions' => 'ದಾರಿ ಪಡೆಯಿರಿ', 'read_more' => 'ಇನ್ನಷ್ಟು', 'view_all' => 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
        'emergency_line' => '24×7 ಅಪಘಾತ ಮತ್ತು ತುರ್ತು', 'duty' => 'ಪ್ರತಿದಿನ 24×7 ಕರ್ತವ್ಯ ವೈದ್ಯರು ಲಭ್ಯ',
    ],
    'ur' => [
        'nav_home' => 'ہوم', 'nav_about' => 'ہمارے بارے میں', 'nav_facilities' => 'سہولیات',
        'nav_departments' => 'شعبہ جات', 'nav_why' => 'ہمیں کیوں چنیں', 'nav_doctors' => 'ڈاکٹرز',
        'nav_visiting' => 'وزٹنگ ڈاکٹرز', 'nav_support' => 'معاون عملہ', 'nav_careers' => 'ملازمتیں',
        'nav_events' => 'تقریبات', 'nav_gallery' => 'گیلری', 'nav_blog' => 'بلاگ',
        'nav_patient' => 'مریض کی معلومات', 'nav_contact' => 'رابطہ',
        'cta_enquire' => 'رابطہ کریں', 'cta_call' => 'کال کریں', 'cta_emergency' => '24×7 ایمرجنسی',
        'cta_directions' => 'راستہ حاصل کریں', 'read_more' => 'مزید پڑھیں', 'view_all' => 'سب دیکھیں',
        'emergency_line' => '24×7 حادثہ و ایمرجنسی', 'duty' => 'ڈیوٹی ڈاکٹرز ہر روز 24×7 دستیاب',
    ],
];

function t(string $key): string {
    $lang = $GLOBALS['LANG'] ?? current_lang();
    return $GLOBALS['I18N'][$lang][$key] ?? $GLOBALS['I18N']['en'][$key] ?? $key;
}
$GLOBALS['LANG'] = current_lang();
