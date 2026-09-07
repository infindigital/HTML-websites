<?php
/**
 * Canonical seed content for Life Care Specialty Hospital.
 * - The public site reads this when the database is not yet imported.
 * - database/schema.sql is GENERATED from this file (tools/build_sql.php),
 *   so content lives in exactly one place.
 * All copy is transcribed/polished from the approved client documents.
 * "CLIENT PROVIDES" values are placeholders — editable later via /admin/.
 */

$PH = 'assets/images/doctors/placeholder.svg'; // doctor placeholder

return [

/* ============================================================ SETTINGS */
'settings' => [
    'site_name'      => 'Life Care Specialty Hospital',
    'tagline'        => 'Keeping you well.',
    'email'          => 'info@lifecarebhatkal.com',
    'phone1'         => '+91 8385992233',
    'phone2'         => '08385 227997',
    'whatsapp'       => '8385992233',
    'address'        => 'Nawayath Colony, Jali Road, Bhatkal 581320, Uttara Kannada Dist., Karnataka',
    'address_short'  => 'Nawayath Colony, Jali Road, Bhatkal 581320',
    'opd_hours'      => '9:00 AM – 1:30 PM & 4:00 PM – 7:30 PM',
    'visiting_hours' => '11:00 AM – 12:30 PM & 5:00 PM – 8:00 PM',
    'pharmacy_hours' => '24×7, all days',
    'emergency_line' => '24×7 Accident & Emergency',
    'map_embed'      => 'https://www.google.com/maps?q=Life+Care+Specialty+Hospital+Bhatkal&output=embed',
    'facebook'       => '#',
    'instagram'      => '#',
    'youtube'        => '#',
    'footer_about'   => 'Life Care Specialty Hospital — bringing modern health facilities to Bhatkal and its surroundings.',
    'copyright'      => '© 2020–2025 Life Care Specialty Hospital, Bhatkal. All Rights Reserved.',
    'logo'           => 'assets/images/brand/logo.png',
    'logo_white'     => 'assets/images/brand/logo-white.png',
    'established_year'=> '2020',
    // Trust stats (CLIENT PROVIDES exact numbers) — placeholders
    'stat_years'     => '5+',      'stat_years_label'    => 'Years of Service',
    'stat_patients'  => '50,000+', 'stat_patients_label' => 'Patients Cared For',
    'stat_beds'      => '50',      'stat_beds_label'     => 'In-patient Beds',
    'stat_doctors'   => '13',      'stat_doctors_label'  => 'Doctors & Specialists',
    'stat_surgeries' => '5,000+',  'stat_surgeries_label'=> 'Successful Surgeries',
    'stat_slice'     => '32',      'stat_slice_label'    => 'Slice CT Scanner',
],

/* ============================================================ DEPARTMENTS */
'departments' => (function () {
    $d = [
        ['general-medicine','General Medicine','opd','facilities/daycare',
         'Comprehensive diagnosis and treatment of adult illnesses — from fever, infections and lifestyle disorders to chronic disease management.',
         ['General consultation & health check-ups','Management of diabetes, hypertension & thyroid','Infectious & seasonal illnesses','Respiratory & gastrointestinal care','Preventive health screening']],
        ['gynaecology-obstetrics','Gynaecology & Obstetrics','opd','facilities/ot',
         'Complete women\'s health care — antenatal care, safe deliveries in our modern labour theatre, and treatment of gynaecological conditions.',
         ['Antenatal & postnatal care','Normal & assisted deliveries','Anomaly & pregnancy ultrasound scanning','Gynaec surgeries','Menstrual & menopausal care']],
        ['orthopaedics','Orthopaedics','opd','facilities/ot-2',
         'Expert care for bones, joints and the musculoskeletal system, including joint replacement and trauma surgery, supported by digital X-ray and CT.',
         ['Fracture & trauma management','Total knee & hip replacement','Arthroscopy & sports injuries','Spine & joint pain treatment','Post-operative physiotherapy']],
        ['general-laparoscopic-surgery','General & Laparoscopic Surgery','opd','facilities/laparoscopy',
         'Bhatkal\'s first full-time laparoscopy service — minimally invasive keyhole surgery with faster recovery and smaller scars.',
         ['Laparoscopic (keyhole) surgery','General & onco-surgery','Colonoscopy & endoscopy','Hernia, gallbladder & appendix surgery','Day-care surgical procedures']],
        ['dental','Dental — Oral & Maxillofacial','opd','about/about-1',
         'Complete dental and oral-maxillofacial care led by experienced surgeons — from routine dentistry to complex facial surgery.',
         ['Dental check-ups, fillings & extractions','Root canal & crowns','Oral & maxillofacial surgery','Orthodontics & cosmetic dentistry','Paediatric dental care']],
        ['physiotherapy','Physiotherapy','opd','facilities/physiotherapy',
         'A specialised physiotherapy unit for pain relief, rehabilitation and recovery — for joints, spine, sports injuries and neurological conditions.',
         ['Joint, knee, back & neck pain','Sports injury rehabilitation','Spondylosis & post-surgical recovery','Stroke & paralysis rehabilitation','Care for cerebral palsy & Parkinson\'s']],
        ['cardiology','Cardiology','visiting','facilities/ultrasound',
         'Visiting cardiology consultation supported by in-house ECG, ECHO and TMT for the diagnosis and management of heart conditions.',
         ['Cardiac consultation (visiting)','ECG, ECHO & TMT — 24×7','Hypertension & heart-failure care','Cardiac risk assessment','Follow-up & medication management']],
        ['neurology','Neurology','visiting','facilities/ct-scan',
         'Visiting neurology services for disorders of the brain, spine and nervous system, backed by 32-slice CT imaging.',
         ['Neurology consultation (visiting)','Stroke evaluation & follow-up','Headache, epilepsy & seizure care','Nerve & spine disorder assessment','CT-supported diagnosis']],
        ['dermatology','Dermatology','visiting','about/stethoscope',
         'Visiting dermatology care for skin, hair and nail conditions — medical and cosmetic.',
         ['Dermatology consultation (visiting)','Acne, allergy & infection treatment','Skin & hair disorder care','Cosmetic dermatology','Chronic skin condition management']],
        ['psychiatry','Psychiatry','visiting','about/vision',
         'Visiting psychiatry services offering compassionate, confidential mental-health care for individuals and families.',
         ['Psychiatry consultation (visiting)','Anxiety, depression & stress care','Sleep & mood disorders','Counselling & follow-up','De-addiction guidance']],
        ['diabetology-endocrinology','Diabetology & Endocrinology','visiting','facilities/lab',
         'Visiting diabetology and endocrinology care for diabetes, thyroid and hormonal disorders, supported by our hi-tech laboratory.',
         ['Diabetes & endocrine consultation (visiting)','Thyroid & hormonal disorder care','Diabetic foot & complication screening','Lab-supported monitoring','Diet & lifestyle guidance']],
        ['pulmonology','Pulmonology','visiting','facilities/xray',
         'Visiting pulmonology services for respiratory and lung conditions, supported by digital X-ray and HRCT thorax imaging.',
         ['Pulmonology consultation (visiting)','Asthma & COPD management','Respiratory infection care','HRCT thorax & digital X-ray','Breathing & lung-function assessment']],
    ];
    $out = []; $i = 1;
    foreach ($d as $r) {
        $out[] = [
            'id' => $i, 'name' => $r[1], 'slug' => $r[0], 'category' => $r[2],
            'thumb_image' => 'assets/images/'.$r[3].'.jpg', 'hero_image' => 'assets/images/'.$r[3].'.jpg',
            'short_desc' => $r[4],
            'overview' => '<p>'.$r[4].'</p><p>At Life Care Specialty Hospital, our '.strtolower($r[1]).' care is delivered with modern diagnostics, experienced clinicians and a focus on accessible, affordable treatment — so residents of Bhatkal and its surroundings receive quality care close to home.</p>',
            'services' => implode("\n", $r[5]),
            'seo_title' => $r[1].' in Bhatkal | Life Care Specialty Hospital',
            'meta_description' => substr($r[4], 0, 155),
            'display_order' => $i, 'status' => 'published',
        ];
        $i++;
    }
    return $out;
})(),

/* ============================================================ DOCTORS */
'doctors' => [
 ['id'=>1,'name'=>'Dr. Mohammad Yasin (Saudagar)','doctor_type'=>'resident','department'=>'Dental — Oral & Maxillofacial','qualification'=>'BDS, MDS, FAM (Germany)','designation'=>'Consultant Dental & Maxillofacial Surgeon','image'=>'assets/images/doctors/dr-mohammad-yasin.jpg','available_days'=>'Mon – Sat','available_time'=>'9:00 AM – 1:30 PM & 4:00 PM – 7:30 PM','base_city'=>'','short_bio'=>'Consultant dental and oral & maxillofacial surgeon with advanced fellowship training in Germany.','full_bio'=>'<p>Dr. Mohammad Yasin leads the dental and oral & maxillofacial services at Life Care Specialty Hospital, bringing advanced training including a fellowship in Germany. He handles routine dentistry through to complex maxillofacial surgery.</p>','display_order'=>1,'status'=>'published'],
 ['id'=>2,'name'=>'Dr. Kenneth Crispin','doctor_type'=>'resident','department'=>'Physician / Diabetology','qualification'=>'MBBS, MD','designation'=>'Consultant Physician & Diabetologist','image'=>'assets/images/doctors/dr-kenneth-crispin.png','available_days'=>'Mon – Sat','available_time'=>'9:00 AM – 1:30 PM & 4:00 PM – 7:30 PM','base_city'=>'','short_bio'=>'Consultant physician and diabetologist managing adult medicine, diabetes and chronic disease.','full_bio'=>'<p>Dr. Kenneth Crispin provides comprehensive internal medicine and diabetology care, from acute illness to long-term management of diabetes, hypertension and lifestyle disorders.</p>','display_order'=>2,'status'=>'published'],
 ['id'=>3,'name'=>'Dr. Mohammed Nawab','doctor_type'=>'resident','department'=>'Orthopaedics','qualification'=>'MBBS, MS','designation'=>'Consultant Orthopaedic Surgeon','image'=>'assets/images/doctors/dr-mohammed-nawab.png','available_days'=>'Mon – Sat','available_time'=>'9:00 AM – 1:30 PM & 4:00 PM – 7:30 PM','base_city'=>'','short_bio'=>'Consultant orthopaedic surgeon specialising in trauma, joint replacement and sports injuries.','full_bio'=>'<p>Dr. Mohammed Nawab handles the full range of orthopaedic care — fracture and trauma management, joint replacement, arthroscopy and treatment of chronic joint and spine pain, supported by digital X-ray and CT.</p>','display_order'=>3,'status'=>'published'],
 ['id'=>4,'name'=>'Dr. Mohammed Naushad','doctor_type'=>'resident','department'=>'Radiology','qualification'=>'MBBS, MD','designation'=>'Consultant Radiologist','image'=>'assets/images/doctors/dr-mohammed-naushad.png','available_days'=>'Mon – Sat','available_time'=>'24×7 (on call)','base_city'=>'','short_bio'=>'In-house full-time radiologist performing ultrasound, CT and diagnostic imaging.','full_bio'=>'<p>Dr. Mohammed Naushad is our full-time in-house radiologist, performing ultrasound, colour Doppler, 32-slice CT and a wide range of scans, providing accurate reports round the clock.</p>','display_order'=>4,'status'=>'published'],
 ['id'=>5,'name'=>'Dr. Shravya Acharya','doctor_type'=>'resident','department'=>'Dental','qualification'=>'BDS','designation'=>'Dental Surgeon','image'=>$PH,'available_days'=>'Mon – Sat','available_time'=>'9:00 AM – 1:30 PM & 4:00 PM – 7:30 PM','base_city'=>'','short_bio'=>'Dental surgeon providing routine and preventive dental care.','full_bio'=>'<p>Dr. Shravya Acharya provides general and preventive dentistry as part of the Life Care dental team.</p>','display_order'=>5,'status'=>'published'],
 ['id'=>6,'name'=>'Dr. Riyaz Husain Kashralli','doctor_type'=>'resident','department'=>'Casualty / Emergency','qualification'=>'MBBS','designation'=>'Emergency Medical Officer','image'=>$PH,'available_days'=>'Every day (rotational)','available_time'=>'24×7','base_city'=>'','short_bio'=>'Emergency medical officer for the 24×7 accident & emergency department.','full_bio'=>'<p>Dr. Riyaz Husain Kashralli is part of the duty-doctor team staffing our 24×7 Accident & Emergency department.</p>','display_order'=>6,'status'=>'published'],
 ['id'=>7,'name'=>'Dr. Dheeraj Shetty','doctor_type'=>'resident','department'=>'Casualty / Emergency','qualification'=>'MBBS','designation'=>'Emergency Medical Officer','image'=>$PH,'available_days'=>'Every day (rotational)','available_time'=>'24×7','base_city'=>'','short_bio'=>'Emergency medical officer for the 24×7 accident & emergency department.','full_bio'=>'<p>Dr. Dheeraj Shetty is part of the duty-doctor team staffing our 24×7 Accident & Emergency department.</p>','display_order'=>7,'status'=>'published'],
 ['id'=>8,'name'=>'Dr. El Roy Saldanha','doctor_type'=>'resident','department'=>'Onco & General Surgery','qualification'=>'MBBS, MS','designation'=>'Consultant Onco & General Surgeon','image'=>$PH,'available_days'=>'By appointment','available_time'=>'Contact reception','base_city'=>'','short_bio'=>'Consultant surgeon for general and onco-surgical care.','full_bio'=>'<p>Dr. El Roy Saldanha provides general and onco-surgical care, including laparoscopic procedures, at Life Care Specialty Hospital.</p>','display_order'=>8,'status'=>'published'],
 // Support staff (physiotherapy)
 ['id'=>9,'name'=>'Ms. Ashwini Shetty','doctor_type'=>'support','department'=>'Physiotherapy','qualification'=>'BPT','designation'=>'Physiotherapist','image'=>'assets/images/doctors/ms-ashwini-shetty.png','available_days'=>'Mon – Sat','available_time'=>'9:00 AM – 1:30 PM & 4:00 PM – 7:30 PM','base_city'=>'','short_bio'=>'Physiotherapist in the specialised physiotherapy & rehabilitation unit.','full_bio'=>'<p>Ms. Ashwini Shetty is a qualified physiotherapist supporting pain relief, rehabilitation and post-surgical recovery.</p>','display_order'=>9,'status'=>'published'],
 ['id'=>10,'name'=>'Dr. Afra Maqiyah','doctor_type'=>'support','department'=>'Physiotherapy','qualification'=>'BPT, MIAP','designation'=>'Physiotherapist','image'=>$PH,'available_days'=>'Mon – Sat','available_time'=>'9:00 AM – 1:30 PM & 4:00 PM – 7:30 PM','base_city'=>'','short_bio'=>'Physiotherapist in the specialised physiotherapy & rehabilitation unit.','full_bio'=>'<p>Dr. Afra Maqiyah is a qualified physiotherapist providing rehabilitation and physiotherapy care.</p>','display_order'=>10,'status'=>'published'],
 // Visiting super-specialists
 ['id'=>11,'name'=>'Dr. Narasimha Pai','doctor_type'=>'visiting','department'=>'Cardiology','qualification'=>'MBBS, MD, DM, DNB','designation'=>'Visiting Cardiologist','image'=>'assets/images/doctors/dr-narasimha-pai.png','available_days'=>'Visiting — contact reception','available_time'=>'By schedule','base_city'=>'Base city / hospital — to be confirmed','short_bio'=>'Visiting cardiologist supported by in-house ECG, ECHO and TMT.','full_bio'=>'<p>Dr. Narasimha Pai visits Life Care Specialty Hospital for cardiology consultation, supported by 24×7 ECG, ECHO and TMT facilities.</p>','display_order'=>1,'status'=>'published'],
 ['id'=>12,'name'=>'Dr. Raghavendra','doctor_type'=>'visiting','department'=>'Neurology','qualification'=>'MBBS, MD, DM','designation'=>'Visiting Neurologist','image'=>'assets/images/doctors/dr-raghavendra.png','available_days'=>'Visiting — contact reception','available_time'=>'By schedule','base_city'=>'Base city / hospital — to be confirmed','short_bio'=>'Visiting neurologist for brain, spine and nervous-system disorders.','full_bio'=>'<p>Dr. Raghavendra visits Life Care Specialty Hospital for neurology consultation, backed by 32-slice CT imaging.</p>','display_order'=>2,'status'=>'published'],
 ['id'=>13,'name'=>'Dr. Mahima Acharya','doctor_type'=>'visiting','department'=>'Psychiatry','qualification'=>'MBBS, MD','designation'=>'Visiting Psychiatrist','image'=>'assets/images/doctors/dr-mahima-acharya.png','available_days'=>'Visiting — contact reception','available_time'=>'By schedule','base_city'=>'Base city / hospital — to be confirmed','short_bio'=>'Visiting psychiatrist offering confidential mental-health care.','full_bio'=>'<p>Dr. Mahima Acharya visits Life Care Specialty Hospital for psychiatry consultation, offering compassionate and confidential mental-health care.</p>','display_order'=>3,'status'=>'published'],
],

/* ============================================================ TESTIMONIALS */
'testimonials' => [
 ['id'=>1,'name'=>'Mohammed','location'=>'Bhatkal','quote'=>'Impressed with the hospital standards and the wonderful attention from the staff.','rating'=>5,'display_order'=>1,'status'=>'published'],
 ['id'=>2,'name'=>'Ameena','location'=>'Bhatkal','quote'=>'I had a total knee replacement here — it was a great experience from start to finish.','rating'=>5,'display_order'=>2,'status'=>'published'],
 ['id'=>3,'name'=>'Ganesh','location'=>'Bhatkal','quote'=>'Thank you to the whole team. Life Care is very special for us.','rating'=>5,'display_order'=>3,'status'=>'published'],
 ['id'=>4,'name'=>'Mubeen','location'=>'Bhatkal','quote'=>'Excellent treatment and care, with seamless coordination between departments.','rating'=>5,'display_order'=>4,'status'=>'published'],
 ['id'=>5,'name'=>'Ahmed','location'=>'Bhatkal','quote'=>'The staff\'s treatment of patients is remarkable and truly worthy of appreciation.','rating'=>5,'display_order'=>5,'status'=>'published'],
],

/* ============================================================ FAQ */
'faqs' => [
 ['id'=>1,'question'=>'What are the hospital and OPD timings?','answer'=>'OPD consultation hours are 9:00 AM – 1:30 PM and 4:00 PM – 7:30 PM. Duty doctors are available 24×7 every day, and the Accident & Emergency department is open round the clock.','display_order'=>1,'status'=>'published'],
 ['id'=>2,'question'=>'Where is Life Care Specialty Hospital located?','answer'=>'We are at Nawayath Colony, Jali Road, Bhatkal 581320, Uttara Kannada District, Karnataka. You will find a Google Map with directions on our Contact page and in the footer.','display_order'=>2,'status'=>'published'],
 ['id'=>3,'question'=>'What are the pharmacy and laboratory timings?','answer'=>'Our in-house pharmacy and hi-tech laboratory operate 24×7, all days of the week.','display_order'=>3,'status'=>'published'],
 ['id'=>4,'question'=>'How many visitors are allowed for an in-patient?','answer'=>'Two visitors are allowed at a time. For the safety of patients, we request you avoid bringing young children or elderly visitors. Visiting hours are 11:00 AM – 12:30 PM and 5:00 PM – 8:00 PM.','display_order'=>4,'status'=>'published'],
 ['id'=>5,'question'=>'Is a deposit required for admission?','answer'=>'Yes. At the time of admission, a deposit of 50% of the estimated cost is collected.','display_order'=>5,'status'=>'published'],
 ['id'=>6,'question'=>'What modes of payment are accepted?','answer'=>'We accept Cash, e-Wallet and Online payments. Cheques are not accepted.','display_order'=>6,'status'=>'published'],
],

/* ============================================================ BLOG */
'posts' => [
 ['id'=>1,'title'=>'COVID-19: Understanding the New Strain','slug'=>'covid-19-new-strain','category'=>'Medical Updates','author'=>'Dr. Saad Mohammed Athanikar','publish_date'=>'2021-01-05','featured_image'=>'assets/images/about/stethoscope.jpg','excerpt'=>'What a new variant means for you and your family, and the simple precautions that continue to protect our community.','content'=>'<p>As the COVID-19 virus evolves, new strains emerge that can spread more easily. While this can sound alarming, the fundamentals of protection remain the same.</p><p>Continue to practise good hand hygiene, wear a mask in crowded indoor settings when you are unwell, and keep your vaccinations up to date. If you develop fever, cough or breathing difficulty, seek medical advice early rather than waiting.</p><p>Our 24×7 Accident & Emergency and diagnostic services remain available for anyone who needs assessment. This article is for general awareness and is not a substitute for professional medical advice.</p>','seo_title'=>'Understanding the New COVID-19 Strain | Life Care Bhatkal','meta_description'=>'General awareness on new COVID-19 variants and everyday precautions, from Life Care Specialty Hospital, Bhatkal.','status'=>'published'],
 ['id'=>2,'title'=>'Diabetes: An Insight','slug'=>'diabetes-an-insight','category'=>'Health','author'=>'Dr. Saad Mohammed Athanikar','publish_date'=>'2020-11-14','featured_image'=>'assets/images/facilities/lab.jpg','excerpt'=>'Diabetes is manageable with the right care. Here is what everyone in Bhatkal should know about prevention and control.','content'=>'<p>Diabetes is one of the most common lifestyle conditions today, yet it is highly manageable with early detection and consistent care.</p><p>Simple steps make a real difference: a balanced diet, regular physical activity, maintaining a healthy weight, and routine blood-sugar monitoring. Our hi-tech laboratory and diabetology care make regular monitoring convenient close to home.</p><p>If you have a family history of diabetes or notice symptoms such as increased thirst, frequent urination or fatigue, speak to a physician. This article is for general awareness and is not a substitute for professional medical advice.</p>','seo_title'=>'Diabetes: An Insight | Life Care Specialty Hospital Bhatkal','meta_description'=>'Understanding diabetes — prevention, monitoring and everyday management, from Life Care Specialty Hospital, Bhatkal.','status'=>'published'],
 ['id'=>3,'title'=>'Is the COVID-19 Vaccine a Dream or Reality?','slug'=>'covid-19-vaccine-dream-or-reality','category'=>'Medical Updates','author'=>'Dr. Saad Mohammed Athanikar','publish_date'=>'2020-09-25','featured_image'=>'assets/images/gallery/gallery-9.jpg','excerpt'=>'A look at how vaccines are developed and why they became one of our strongest tools against the pandemic.','content'=>'<p>When the pandemic began, a safe and effective vaccine felt like a distant hope. Through unprecedented global collaboration, that hope became reality faster than many expected.</p><p>Vaccines work by training the immune system to recognise and fight the virus. Alongside vaccination, everyday precautions continue to keep our community safe.</p><p>Speak to a qualified doctor about which vaccinations are appropriate for you. This article is for general awareness and is not a substitute for professional medical advice.</p>','seo_title'=>'COVID-19 Vaccine — Dream or Reality? | Life Care Bhatkal','meta_description'=>'How COVID-19 vaccines were developed and why they matter — general awareness from Life Care Specialty Hospital.','status'=>'published'],
],

/* ============================================================ EVENTS */
'events' => [
 ['id'=>1,'title'=>'Independence Day Celebration','slug'=>'independence-day-celebration','event_date'=>'2023-08-15','cover_image'=>'assets/images/events/event-1.jpg','description'=>'<p>The Life Care family came together to celebrate Independence Day with flag hoisting and a warm gathering of our staff and well-wishers.</p>','gallery'=>'assets/images/events/event-1.jpg|assets/images/events/event-2.jpg|assets/images/events/event-3.jpg|assets/images/events/event-4.jpg','status'=>'published'],
 ['id'=>2,'title'=>'Happy Moments at Life Care','slug'=>'happy-moments','event_date'=>'2023-09-30','cover_image'=>'assets/images/events/event-5.jpg','description'=>'<p>Moments of joy and gratitude shared by our patients and team — the heart of what we do.</p>','gallery'=>'assets/images/events/event-5.jpg|assets/images/events/event-6.jpg|assets/images/events/event-7.jpg','status'=>'published'],
 ['id'=>3,'title'=>'Happy Customers','slug'=>'happy-customers','event_date'=>'2023-09-15','cover_image'=>'assets/images/events/event-8.jpg','description'=>'<p>Grateful patients and families who trusted Life Care with their care.</p>','gallery'=>'assets/images/events/event-8.jpg|assets/images/events/event-9.jpg','status'=>'published'],
 ['id'=>4,'title'=>'Life at Life Care Specialty Hospital','slug'=>'life-at-lifecare','event_date'=>'2023-07-01','cover_image'=>'assets/images/events/event-10.jpg','description'=>'<p>A glimpse into daily life, facilities and the team at Life Care Specialty Hospital, Bhatkal.</p>','gallery'=>'assets/images/events/event-10.jpg|assets/images/events/event-11.jpg|assets/images/events/event-12.jpg','status'=>'published'],
],

/* ============================================================ GALLERY */
'gallery' => (function () {
    $out = []; $i = 1;
    $facil = [['Reception & facilities','gallery/gallery-1'],['Hospital interiors','gallery/gallery-2'],
      ['Modern equipment','gallery/gallery-3'],['Patient care area','gallery/gallery-4'],
      ['Hospital building','gallery/gallery-5'],['Operation theatre','gallery/gallery-6'],
      ['Clinical facilities','gallery/gallery-7'],['Laboratory','gallery/gallery-8'],
      ['Diagnostics','gallery/gallery-9'],['Ultrasound suite','gallery/gallery-10']];
    foreach ($facil as $g) { $out[] = ['id'=>$i,'album'=>'Facilities','title'=>$g[0],'image'=>'assets/images/'.$g[1].'.jpg','display_order'=>$i]; $i++; }
    for ($n = 1; $n <= 12; $n++) { $out[] = ['id'=>$i,'album'=>'Events','title'=>'Life Care event photo','image'=>'assets/images/events/event-'.$n.'.jpg','display_order'=>$i]; $i++; }
    return $out;
})(),

/* ============================================================ CAREERS (sample — client edits via admin) */
'careers' => [
 ['id'=>1,'title'=>'Staff Nurse (GNM / B.Sc Nursing)','department'=>'Nursing','location'=>'Bhatkal','type'=>'Full-time','description'=>'<p>Provide compassionate round-the-clock nursing care to in-patients and support clinical teams across departments.</p>','requirements'=>'<ul><li>GNM or B.Sc Nursing qualification</li><li>Valid registration</li><li>Freshers and experienced candidates welcome</li></ul>','apply_email'=>'info@lifecarebhatkal.com','display_order'=>1,'status'=>'active'],
 ['id'=>2,'title'=>'Laboratory Technician (DMLT / BMLT)','department'=>'Laboratory','location'=>'Bhatkal','type'=>'Full-time','description'=>'<p>Perform diagnostic laboratory tests accurately and maintain quality standards in our 24×7 hi-tech laboratory.</p>','requirements'=>'<ul><li>DMLT or BMLT qualification</li><li>Attention to detail</li><li>Willingness to work in shifts</li></ul>','apply_email'=>'info@lifecarebhatkal.com','display_order'=>2,'status'=>'active'],
 ['id'=>3,'title'=>'Physiotherapist (BPT / MPT)','department'=>'Physiotherapy','location'=>'Bhatkal','type'=>'Full-time','description'=>'<p>Deliver physiotherapy and rehabilitation care in our specialised physiotherapy unit.</p>','requirements'=>'<ul><li>BPT or MPT qualification</li><li>Good communication skills</li></ul>','apply_email'=>'info@lifecarebhatkal.com','display_order'=>3,'status'=>'active'],
 ['id'=>4,'title'=>'Front Desk / Reception Executive','department'=>'Administration','location'=>'Bhatkal','type'=>'Full-time','description'=>'<p>Be the welcoming face of Life Care — manage reception, guide patients and coordinate appointments.</p>','requirements'=>'<ul><li>Graduate in any discipline</li><li>Fluent in Kannada, Urdu and English preferred</li><li>Basic computer skills</li></ul>','apply_email'=>'info@lifecarebhatkal.com','display_order'=>4,'status'=>'active'],
],

/* ============================================================ STATIC CONTENT BLOCKS (approved copy) */
'content' => [
  'intro_lines' => [
    'Life Care Specialty Hospital is an ambitious start to bring modern health facilities to our town and its surroundings.',
    'Situated in the fast-developing coastal town of Bhatkal, with NH-66 passing through it.',
    'Life Care Accident & Emergency Centre is well equipped to meet all kinds of casualties and situations.',
  ],
  'about_quote' => 'He who has health has hope, and he who has hope has everything.',
  'about_overview' => '<p>Healthcare is the key to physical and mental wellbeing. Life Care Specialty Hospital was created so residents of Bhatkal need no longer travel long distances to neighbouring cities for quality care.</p><p>Our aim is to provide essential health services with innovative care and quality, advanced facilities, hygienic conditions, and a positive culture of collaboration, innovation and learning.</p>',
  'aims' => [
    'Provide essential health services with innovative strategies of care and quality.',
    'Deliver effective treatment at economical cost in the most hygienic environment.',
    'Introduce advanced medical facilities so residents avoid travelling to distant cities — saving time and money.',
    'Bring specialised medical professionals and a full range of diagnostic services under one roof.',
  ],
  'mission' => 'To bring quality healthcare to all residents of Bhatkal and its surroundings by providing accessible and compassionate services through the integration of expertise and technology.',
  'vision' => 'At Life Care, we endeavour to deliver personalised care through the integration of technology.',
  'vision_pillars' => ['Transforming healthcare to a new level', 'Human-centred', 'Technology-enabled'],
  'board' => [
    ['name'=>'Mr. Yunus Kazia','role'=>'Chairman','image'=>'assets/images/board/yunus-kazia.png'],
    ['name'=>'Mr. Salman Ahmed Jubapu','role'=>'Managing Director','image'=>'assets/images/board/salman-jubapu.png'],
    ['name'=>'Dr. Ismail Kazia','role'=>'Partner','image'=>'assets/images/board/ismail-kazia.png'],
    ['name'=>'Mr. Altaf Musba','role'=>'Partner','image'=>'assets/images/board/altaf-musba.png'],
    ['name'=>'Mr. Abdulqadir Jilani Kobatte','role'=>'Partner','image'=>'assets/images/board/abdulqadir-kobatte.png'],
  ],
  'flagship' => [
    ['icon'=>'scan','title'=>'32-Slice CT Scan','text'=>'Advanced 32-slice CT imaging now available in Bhatkal for fast, precise diagnosis.','link'=>'our-facilities#ct-scan'],
    ['icon'=>'emergency','title'=>'24×7 Accident & Emergency','text'=>'Round-the-clock casualty and ICU support for all kinds of accidents and emergencies.','link'=>'departments'],
    ['icon'=>'bone','title'=>'Orthopaedic Surgeries','text'=>'Trauma, joint replacement and arthroscopy by experienced orthopaedic surgeons.','link'=>'departments/orthopaedics'],
    ['icon'=>'surgery','title'=>'General & Laparoscopic Surgery','text'=>'Bhatkal\'s first full-time laparoscopy service — keyhole surgery with faster recovery.','link'=>'departments/general-laparoscopic-surgery'],
    ['icon'=>'tooth','title'=>'Dental Procedures','text'=>'Complete dental and oral & maxillofacial care under one roof.','link'=>'departments/dental'],
    ['icon'=>'diagnostic','title'=>'Diagnostics','text'=>'X-Ray, Ultrasound, CT, TMT and Cardiac Echo — all in-house.','link'=>'our-facilities'],
  ],
  'facilities' => [
    ['icon'=>'scan','title'=>'CT Scan (32-Slice)','anchor'=>'ct-scan','text'=>'High-resolution 32-slice CT for head, thorax, abdomen, angiography and more.'],
    ['icon'=>'emergency','title'=>'24×7 Accident & Emergency','anchor'=>'emergency','text'=>'Round-the-clock casualty open for all accidents and emergencies, with ICU support.'],
    ['icon'=>'stethoscope','title'=>'Out-patient Clinics','anchor'=>'opd','text'=>'Specialty OPD clinics across medicine, surgery, ortho, dental and more.'],
    ['icon'=>'heart','title'=>'Intensive Care Unit (ICU/CCU)','anchor'=>'icu','text'=>'Critical care with constant supervision and life-support systems.'],
    ['icon'=>'surgery','title'=>'Modular OT & Labour Theatre','anchor'=>'ot','text'=>'Hygienic modular operation theatre with laminar flow and modern controls.'],
    ['icon'=>'ultrasound','title'=>'Ultrasound / Sonography','anchor'=>'ultrasound','text'=>'In-house radiologist for pregnancy, anomaly, Doppler and organ scans.'],
    ['icon'=>'xray','title'=>'Digital High-Frequency X-Ray','anchor'=>'xray','text'=>'Real-time digital radiography — faster, chemical-free imaging.'],
    ['icon'=>'lab','title'=>'Hi-Tech Laboratory','anchor'=>'lab','text'=>'Full pathology testing — blood, biochemistry, serology and more, 24×7.'],
    ['icon'=>'daycare','title'=>'Day Care Facilities','anchor'=>'daycare','text'=>'Day-care services with ECG, defibrillator, monitoring and central oxygen.'],
    ['icon'=>'bed','title'=>'In-patient Wards & Rooms','anchor'=>'rooms','text'=>'General ward, semi-private and deluxe rooms for comfortable recovery.'],
    ['icon'=>'physio','title'=>'Specialised Physiotherapy','anchor'=>'physio','text'=>'Rehabilitation for joints, spine, sports injuries and neurological care.'],
    ['icon'=>'surgery','title'=>'Laparoscopy & Endoscopy','anchor'=>'laparoscopy','text'=>'Keyhole surgery and colonoscopy by Bhatkal\'s first full-time laparoscopy surgeon.'],
    ['icon'=>'pharmacy','title'=>'24×7 Pharmacy','anchor'=>'pharmacy','text'=>'In-house pharmacy open round the clock, all days.'],
    ['icon'=>'ambulance','title'=>'Ambulance Service','anchor'=>'ambulance','text'=>'Ambulance support for emergencies and patient transfers.'],
    ['icon'=>'heart','title'=>'ECG · ECHO · TMT','anchor'=>'cardiac','text'=>'Cardiac diagnostics available 24×7 to support timely care.'],
  ],
  'why_reasons' => [
    ['icon'=>'scan','title'=>'32-Slice CT & Advanced Imaging','text'=>'Fast, precise diagnostics with CT, ultrasound and digital X-ray — no need to travel out of town.'],
    ['icon'=>'emergency','title'=>'24×7 Emergency & ICU','text'=>'Duty doctors every day and a round-the-clock casualty backed by intensive care.'],
    ['icon'=>'stethoscope','title'=>'Experienced Specialists','text'=>'Resident consultants plus visiting super-specialists in cardiology, neurology and more.'],
    ['icon'=>'heart','title'=>'Affordable, Transparent Care','text'=>'Quality treatment at economical cost, delivered with compassion and clarity.'],
    ['icon'=>'lab','title'=>'Hi-Tech Lab & 24×7 Pharmacy','text'=>'Complete pathology and an in-house pharmacy that never closes.'],
    ['icon'=>'surgery','title'=>'Modern OT & Comfortable Rooms','text'=>'Hygienic modular operation theatre and a choice of well-appointed in-patient rooms.'],
  ],
  'ct_scans' => ['CT Head','CT PNS','CT Face 3D','HRCT Temporal Bone','CT Neck','HRCT Thorax','CT Thorax','CT Spine','CT Abdomen & Pelvis','CT KUB','CT Limbs / Joints','CT Pulmonary Angiography','CT Renal Angiography','CT Peripheral Angiography'],
  'lab_tests' => ['Blood Test','BioChemistry Test','Serology Test','Urine Analysis','Stool Test','Sputum Test','Semen Analysis','Executive Health Test'],
  'rooms' => [
    ['title'=>'General Ward','image'=>'assets/images/rooms/general-ward.jpg','text'=>'Comfortable shared ward with nurse-calling system, side locker and common bathroom.'],
    ['title'=>'Semi-Private Room','image'=>'assets/images/rooms/semi-private.jpg','text'=>'A/C and non-A/C options with closet, attached bathroom, personal locker and relative bed.'],
    ['title'=>'Deluxe Room','image'=>'assets/images/rooms/deluxe.jpg','text'=>'Private deluxe room with balcony, A/C, nurse-call, storage, couch, attached bath and extra bed.'],
  ],
  'patient_info' => [
    ['title'=>'Admission & Deposit','body'=>'<p>At the time of admission, a deposit of <strong>50% of the estimated cost</strong> of treatment is collected. The balance is settled at the time of discharge based on the final bill.</p>'],
    ['title'=>'Payment Methods','body'=>'<p>We accept <strong>Cash, e-Wallet and Online</strong> payments. Please note that <strong>cheques are not accepted</strong>.</p>'],
    ['title'=>'Visitor Rules','body'=>'<p>To protect patients, <strong>two visitors are allowed at a time</strong>. We request you avoid bringing young children or elderly visitors. Visiting hours are <strong>11:00 AM – 12:30 PM</strong> and <strong>5:00 PM – 8:00 PM</strong>.</p>'],
    ['title'=>'What to Bring','body'=>'<p>Please carry a valid photo ID, any previous medical records, prescriptions and current medications, and insurance / TPA details if applicable.</p>'],
    ['title'=>'Pharmacy & Laboratory','body'=>'<p>Our in-house pharmacy and hi-tech laboratory operate <strong>24×7, all days</strong>, so essential medicines and tests are always within reach.</p>'],
    ['title'=>'Insurance & TPA','body'=>'<p>Life Care works with insurance and TPA tie-ups. Please confirm current empanelments (e.g. Ayushman Bharat, ESI) with our reception at the time of admission.</p>'],
  ],
],
];
