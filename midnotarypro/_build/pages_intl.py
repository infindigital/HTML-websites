"""Arabic and French pages (change list, section 3): apostille, embassy legalization and translation.

Written by hand, not machine-translated. Each page stays noindex (and out of the sitemap and hreflang) until the
client's native speaker has reviewed it: set facts.INTL_REVIEWED[lang] = True after review.
"""
from components import cta_final, page_hero, rows, shead
from facts import FBI_APOSTILLE, FBI_PACKAGE, INTL_REVIEWED, KS_SAME, KS_STD, MO_SAME, MO_STD
from lib import PHONE, call_btn, cta_btn, page, service_schema
from pages_new import sec

AR = dict(
    path="/ar/", lang="ar",
    title="أبوستيل وتصديق وترجمة معتمدة في كانساس سيتي",
    desc="أبوستيل لمستندات ميزوري وكانساس وسائر الولايات، وتصديق السفارات للإمارات وقطر ومصر، وترجمة معتمدة إلى العربية، في كانساس سيتي.",
    crumb="العربية", lab="خدمات باللغة العربية",
    h1="أبوستيل وتصديق السفارات والترجمة المعتمدة في كانساس سيتي",
    lead="نجهّز مستنداتك الأمريكية لاستخدامها في الخارج: الأبوستيل للدول الأعضاء في اتفاقية لاهاي، وتصديق السفارة للدول غير الأعضاء، والترجمة المعتمدة. فريقنا يتحدث العربية.",
    cta="ابدأ مراجعة مستنداتك", call=f"اتصل <bdi dir='ltr'>{PHONE}</bdi>",
    s1=("الأبوستيل", "شهادة واحدة تكفي في دول اتفاقية لاهاي.",
        "<p>الأبوستيل شهادة تُثبت صحة التوقيع والختم على مستند رسمي أمريكي حتى يُعترف به في الدول الأعضاء في اتفاقية لاهاي لعام 1961، مثل المملكة العربية السعودية (منذ ديسمبر 2022) والمغرب وتونس والبحرين وسلطنة عُمان.</p>"
        "<p>تصدر شهادة الأبوستيل لمستندات ولاية ميزوري من مكتب سكرتير ولاية ميزوري (<bdi>Missouri Secretary of State</bdi>)، ولمستندات كانساس من مكتب سكرتير ولاية كانساس. أما المستندات الفدرالية مثل تقرير السوابق الجنائية من FBI فتصدر شهادتها من وزارة الخارجية الأمريكية.</p>"),
    prices=[("ميزوري", f"{MO_STD} عادي، {MO_SAME} في نفس اليوم للمستندات المستلمة قبل الساعة 1 ظهرًا."),
            ("كانساس", f"{KS_STD} عادي، {KS_SAME} في نفس اليوم للمستندات المستلمة قبل الساعة 10 صباحًا."),
            ("تقرير FBI", f"أبوستيل تقرير FBI بسعر {FBI_APOSTILLE}، وباقة البصمات مع الأبوستيل بسعر {FBI_PACKAGE}."),
            ("رسوم الولاية", "رسوم الولاية مشمولة في أسعارنا.")],
    s2=("تصديق السفارة", "للدول التي لا تقبل الأبوستيل.",
        "<p>الدول غير الأعضاء في اتفاقية لاهاي، مثل الإمارات العربية المتحدة وقطر ومصر والكويت، لا تقبل الأبوستيل. تحتاج المستندات إلى تصديق على مراحل: توثيق من وزارة الخارجية الأمريكية، ثم تصديق سفارة الدولة في واشنطن، ثم غالبًا تصديق وزارة الخارجية في بلد الوجهة.</p>"
        "<p>نتولى المراحل الأمريكية كاملة، ونقدّم لك السعر الكامل قبل أن ترسل أي مستند، لأن لكل سفارة رسومها الخاصة.</p>"),
    s3=("الترجمة المعتمدة", "ترجمة معتمدة إلى العربية ومن العربية.",
        "<p>نترجم شهادات الميلاد والزواج والطلاق والشهادات الدراسية وتقارير FBI ترجمة معتمدة. السعر 45 دولارًا للصفحة، و35 دولارًا للصفحة لكل الصفحات في المستندات المكونة من ثلاث صفحات أو أكثر.</p>"
        "<p>بلد الوجهة هو من يحدد إن كانت الترجمة تتم قبل الأبوستيل أو التصديق أو بعده، ونؤكد ذلك لكل عميل قبل البدء.</p>"),
    steps=("كيف تعمل الخدمة", "أربع خطوات.", [
        ("أخبرنا عن المستند", "ما هو المستند وإلى أي بلد سيُرسل. نؤكد لك المسار والسعر والمدة."),
        ("أرسل المستند أو أحضره", "إلى مكتبنا في <bdi dir='ltr'>8101 E. Bannister Rd., Kansas City, MO 64134</bdi>، أو بالبريد مع رقم تتبع."),
        ("التوثيق والترجمة", "نتولى الأبوستيل أو التصديق والترجمة عند الحاجة."),
        ("الإرجاع", "نعيد المستندات عبر FedEx مع التتبع داخل الولايات المتحدة، أو نشحنها إلى الخارج."),
    ]),
    disclaimer="لسنا محامين ولا نقدم استشارات قانونية أو استشارات هجرة. Midwest Apostille &amp; Notary Services خدمة مستندات خاصة وغير تابعة لأي جهة حكومية.",
    cta_h="تأكد من المسار قبل أن ترسل مستنداتك.",
    cta_t="أخبرنا ما هو المستند وإلى أين سيذهب، ونؤكد لك المسار والسعر والمدة قبل أي خطوة.",
    labels=("السعر", "الأسعار.", "01", "02", "03", "04", "05"),
)

FR = dict(
    path="/fr/", lang="fr",
    title="Apostille, légalisation et traduction à Kansas City",
    desc="Apostille pour les documents du Missouri, du Kansas et des autres États, légalisation consulaire et traduction certifiée en français, à Kansas City.",
    crumb="Français", lab="Services en français",
    h1="Apostille, légalisation et traduction certifiée à Kansas City",
    lead="Nous préparons vos documents américains pour l’étranger : apostille pour les pays membres de la Convention de La Haye, légalisation consulaire pour les autres, et traduction certifiée. Notre équipe parle français.",
    cta="Faire vérifier mon document", call=f"Appeler le {PHONE}",
    s1=("Apostille", "Un seul certificat pour les pays de La Haye.",
        "<p>L’apostille certifie l’origine d’un document public américain pour qu’il soit reconnu dans un pays membre de la Convention de La Haye de 1961, comme la France, la Belgique, la Suisse, le Canada, le Maroc, la Tunisie ou le Sénégal.</p>"
        "<p>Pour un document du Missouri, l’apostille est délivrée par le Missouri Secretary of State ; pour un document du Kansas, par le Kansas Secretary of State. Pour un document fédéral, comme le relevé d’antécédents du FBI, elle est délivrée par le Département d’État des États-Unis.</p>"),
    prices=[("Missouri", f"{MO_STD} en délai standard, {MO_SAME} le jour même pour les documents reçus avant 13 h."),
            ("Kansas", f"{KS_STD} en délai standard, {KS_SAME} le jour même pour les documents reçus avant 10 h."),
            ("Relevé du FBI", f"Apostille du relevé du FBI : {FBI_APOSTILLE}. Forfait empreintes digitales et apostille : {FBI_PACKAGE}."),
            ("Frais de l’État", "Les frais de dépôt de l’État sont inclus dans nos prix.")],
    s2=("Légalisation consulaire", "Pour les pays qui n’acceptent pas l’apostille.",
        "<p>Les pays qui ne sont pas membres de la Convention, comme les Émirats arabes unis, le Qatar ou l’Égypte, n’acceptent pas l’apostille. Le document doit être légalisé : authentification par le Département d’État des États-Unis, puis par l’ambassade du pays à Washington, et souvent une dernière étape auprès du ministère des Affaires étrangères du pays de destination.</p>"
        "<p>Nous prenons en charge toutes les étapes américaines et vous donnons le prix complet avant tout envoi, car chaque ambassade fixe ses propres frais.</p>"),
    s3=("Traduction certifiée", "Traduction certifiée vers le français et depuis le français.",
        "<p>Nous traduisons les actes de naissance, de mariage et de divorce, les diplômes et les relevés du FBI. Le tarif est de 45 $ par page, et de 35 $ par page pour toutes les pages des documents de trois pages ou plus.</p>"
        "<p>C’est le pays de destination qui décide si la traduction se fait avant ou après l’apostille. Nous le confirmons pour chaque client avant de commencer.</p>"),
    steps=("Comment ça marche", "Quatre étapes.", [
        ("Décrivez votre document", "De quel document s’agit-il et dans quel pays sera-t-il utilisé ? Nous confirmons la démarche, le prix et le délai."),
        ("Envoyez-le ou déposez-le", "À notre bureau, 8101 E. Bannister Rd., Kansas City, MO 64134, ou par courrier suivi."),
        ("Apostille et traduction", "Nous obtenons l’apostille ou la légalisation, et la traduction si nécessaire."),
        ("Retour", "Nous vous renvoyons les documents par FedEx avec suivi aux États-Unis, ou les expédions à l’étranger."),
    ]),
    disclaimer="Nous ne sommes pas avocats et ne donnons pas de conseils juridiques ou en matière d’immigration. Midwest Apostille &amp; Notary Services est un service privé de documents et n’est affilié à aucun organisme gouvernemental.",
    cta_h="Vérifiez la démarche avant d’envoyer vos documents.",
    cta_t="Dites-nous de quel document il s’agit et où il va. Nous confirmons la démarche, le prix et un délai réaliste avant tout envoi.",
    labels=("Prix", "Tarifs.", "01", "02", "03", "04", "05"),
)


def intl_page(T):
    lang = T["lang"]
    crumbs = [(T["crumb"], T["path"])]
    body = page_hero(T["h1"], T["lead"], crumbs, lab=T["lab"], lang=lang,
                     buttons=cta_btn(label=T["cta"]) + call_btn(label=T["call"]))
    body += sec("01", T["s1"][0], T["s1"][1], "i1-h", f'<div class="prose-block">{T["s1"][2]}</div>')
    body += sec("02", T["labels"][0], T["labels"][1], "i2-h", rows(T["prices"], cls="rows--4"), tone="section--paper")
    body += sec("03", T["s2"][0], T["s2"][1], "i3-h", f'<div class="prose-block">{T["s2"][2]}</div>')
    body += sec("04", T["s3"][0], T["s3"][1], "i4-h", f'<div class="prose-block">{T["s3"][2]}</div>', tone="section--paper")
    body += sec("05", T["steps"][0], T["steps"][1], "i5-h", rows(T["steps"][2], cls="rows--4")
                + f'<p class="fine">{T["disclaimer"]}</p>')
    body += cta_final(heading=T["cta_h"], text=T["cta_t"], lang=lang)
    return page(T["path"], T["title"], T["desc"], body, active="resources", lang=lang, crumbs=crumbs,
                index=INTL_REVIEWED[lang], keyword=T["title"],
                schema=[service_schema(T["path"], T["h1"], T["lead"], "Apostille services")])


def build_all():
    return [intl_page(AR), intl_page(FR)]
