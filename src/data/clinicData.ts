import clinicImg1 from '../assets/images/clinic-1.jpg';
import clinicImg2 from '../assets/images/clinic-2.jpg';
import clinicImg3 from '../assets/images/clinic-3.jpg';
import clinicImg4 from '../assets/images/clinic-4.jpg';
import clinicImg5 from '../assets/images/clinic-5.jpg';
import clinicImg6 from '../assets/images/clinic-6.jpg';
import caseImg1 from '../assets/images/case-1.jpg';
import caseImg2 from '../assets/images/case-2.jpg';
import caseImg3 from '../assets/images/case-3.jpg';
import caseImg4 from '../assets/images/case-4.jpg';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'surgical' | 'cosmetic' | 'general';
  badge?: string;
  whatsappText: string;
}

export interface ClinicalCaseItem {
  id: string;
  title: string;
  category: string;
  procedureSummary: string;
  beforeNote: string;
  afterNote: string;
  image: string;
  whatsappInquiry: string;
}

export interface ClinicRoomItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  spanClass: string;
}

export const CLINIC_INFO = {
  nameAr: 'عيادة الكحلوت للأسنان',
  nameEn: 'ELKAHLOT DENTAL CLINIC',
  shortCode: 'KDC',
  doctorName: 'د. عبدالرحمن الكحلوت',
  doctorTitle: 'أخصائي جراحة وزراعة وتجميل الأسنان',
  doctorMembership: 'عضو الجمعية المصرية لزراعة الأسنان',
  tagline: 'زراعة وتجميل الفم والأسنان',
  phonePrimary: '01019616260',
  phonePrimaryIntl: '+201019616260',
  phoneWhatsapp: '01006641810',
  phoneWhatsappIntl: '201006641810',
  whatsappDefaultUrl:
    'https://wa.me/201006641810?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%AD%D8%AC%D8%B2%20%D9%83%D8%B4%D9%81',
  addressShort: '٦٤ شارع عبدالعزيز حجازي، التجاريين، جسر السويس',
  addressLandmark: 'بجوار محطة مترو الهايكستب - القاهرة',
  addressFull: '٦٤ شارع عبدالعزيز حجازي، التجاريين، جسر السويس، بجوار محطة مترو الهايكستب - القاهرة',
  mapsUrl:
    'https://www.google.com/maps/place/%D8%B9%D9%8A%D8%A7%D8%AF%D8%A9+%D8%A7%D9%84%D9%83%D8%AD%D9%84%D9%88%D8%AA+%D9%84%D9%84%D8%A7%D8%B3%D9%86%D8%A7%D9%86%E2%80%AD/@30.1434572,31.4008353,19z/data=!4m6!3m5!1s0x145817f20c7771ef:0x448a435c7e12c875!8m2!3d30.1438252!4d31.4007022!16s%2Fg%2F11k9kjqbrd',
  instagramUrl: 'https://www.instagram.com/elkahlot_dental_clinic?srtk=a2I4bmN1bGo1bWU4',
  instagramHandle: '@elkahlot_dental_clinic',
  facebookUrl: 'https://www.facebook.com/share/1DzCcQCesE/',
  vezeetaUrl:
    'https://www.vezeeta.com/ar/dr/%D8%AF%D9%83%D8%AA%D9%88%D8%B1-%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86-%D8%A7%D9%84%D9%83%D8%AD%D9%84%D9%88%D8%AA-%D8%A7%D8%B3%D9%86%D8%A7%D9%86',
} as const;

export function buildWhatsAppUrl(customMessage: string): string {
  const encoded = encodeURIComponent(customMessage.trim());
  return `https://wa.me/${CLINIC_INFO.phoneWhatsappIntl}?text=${encoded}`;
}

export function downloadClinicVCard(): void {
  const vcardLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${CLINIC_INFO.nameAr} - ${CLINIC_INFO.doctorName}`,
    `ORG:${CLINIC_INFO.nameAr} (${CLINIC_INFO.shortCode})`,
    `TITLE:${CLINIC_INFO.doctorTitle}`,
    `TEL;TYPE=WORK,VOICE:${CLINIC_INFO.phonePrimaryIntl}`,
    `TEL;TYPE=CELL,VOICE:+${CLINIC_INFO.phoneWhatsappIntl}`,
    `ADR;TYPE=WORK:;;${CLINIC_INFO.addressShort} - ${CLINIC_INFO.addressLandmark};القاهرة;;11769;مصر`,
    `URL:${CLINIC_INFO.mapsUrl}`,
    `NOTE:${CLINIC_INFO.doctorTitle} - ${CLINIC_INFO.doctorMembership}`,
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vcardLines], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'ElKahlot-Dental-Clinic-KDC.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'implants',
    title: 'زراعة الأسنان',
    subtitle: 'تعويض الأسنان المفقودة بغرسات تيتانيوم عالية الثبات تدوم طويلاً بمظهر طبيعي تماماً',
    category: 'surgical',
    badge: 'تخصص دقيق',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد حجز موعد واستفسار بخصوص زراعة الأسنان',
  },
  {
    id: 'oral-surgery',
    title: 'جراحة الفم والأسنان',
    subtitle: 'إجراءات جراحية دقيقة وآمنة تحت إشراف أخصائي جراحة الفم والأسنان بأعلى معايير التعقيم',
    category: 'surgical',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد حجز موعد بخصوص جراحة الفم والأسنان',
  },
  {
    id: 'jaw-rehab',
    title: 'إعادة تأهيل الفكين',
    subtitle: 'خطط علاجية متكاملة لاستعادة كفاءة المضغ وتناسق الفكين والابتسامة بالكامل',
    category: 'surgical',
    badge: 'تأهيل شامل',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد استشارة بخصوص إعادة تأهيل الفكين',
  },
  {
    id: 'hollywood-smile',
    title: 'تجميل الأسنان وابتسامة هوليود',
    subtitle: 'تركيبات الزيركون والإيماكس وعدسات الأسنان التجميلية لتصميم ابتسامة مشرقة ومتناسقة',
    category: 'cosmetic',
    badge: 'الأكثر طلباً',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد حجز موعد بخصوص تجميل الأسنان وابتسامة هوليود',
  },
  {
    id: 'root-canal',
    title: 'حشو عصب',
    subtitle: 'علاج الجذور والأعصاب بأحدث التقنيات الرقمية للحفاظ على السن الطبيعي بدون ألم',
    category: 'general',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد حجز موعد كشف بخصوص حشو عصب',
  },
  {
    id: 'regular-filling',
    title: 'حشو عادي',
    subtitle: 'حشوات تجميلية ضوئية (كومبوزيت) مطابقة للون الأسنان الطبيعي بدقة ومتانة عالية',
    category: 'general',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد حجز موعد بخصوص حشو الأسنان',
  },
  {
    id: 'orthodontics',
    title: 'تقويم الأسنان',
    subtitle: 'تصحيح اصطفاف الأسنان وإطباق الفكين للحصول على ابتسامة صحية ومتوازنة',
    category: 'cosmetic',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد حجز موعد بخصوص تقويم الأسنان',
  },
  {
    id: 'pediatric',
    title: 'أسنان الأطفال',
    subtitle: 'رعاية طبية لطيفة ومتخصصة لعلاج وحماية أسنان الأطفال في بيئة مريحة ومطمئنة',
    category: 'general',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد حجز موعد كشف أسنان أطفال',
  },
  {
    id: 'consultation',
    title: 'كشف واستشارة',
    subtitle: 'فحص إكلينيكي شامل وتشخيص دقيق مع شرح خطة العلاج المناسبة لحالتك بالتفصيل',
    category: 'general',
    badge: 'احجز الآن',
    whatsappText: 'مرحباً عيادة د. عبدالرحمن الكحلوت، أريد حجز موعد كشف واستشارة',
  },
];

export const CLINICAL_CASES: ClinicalCaseItem[] = [
  {
    id: 'case-1',
    title: 'إعادة تأهيل وتجميل الفكين بالكامل (ابتسامة متكاملة)',
    category: 'إعادة تأهيل الفكين وابتسامة هوليود',
    procedureSummary: 'استبدال التركيبات القديمة غير المتناسقة وإعادة تأهيل الفكين العلوي والسفلي بتركيبات تجميلية عالية الشفافية وعلاج اللثة لاستعادة التناسق والإطباق المثالي.',
    beforeNote: 'تركيبات علوية قديمة غير متناسقة مع تآكل وتصبغ بالأسنان السفلية وتراجع في اللثة',
    afterNote: 'ابتسامة متكاملة وإطباق متناسق للفكين العلوي والسفلي بلون أبيض طبيعي مشرق',
    image: caseImg1,
    whatsappInquiry: 'مرحباً د. عبدالرحمن، شاهدت الحالة الأولى (إعادة تأهيل وتجميل الفكين بالكامل) وأريد حجز كشف لحالة مشابهة',
  },
  {
    id: 'case-2',
    title: 'إزالة التكلسات الشديدة وتأهيل الأسنان السفلية',
    category: 'علاج لثة وتركيبات تجميلية',
    procedureSummary: 'إزالة تراكمات الجير العميقة والتصبغات الشديدة من الأسنان السفلية مع علاج التهابات اللثة وإعادة بناء الأسنان بتركيبات خزفية ناصعة.',
    beforeNote: 'تراكمات جيرية شديدة جداً وتصبغات مع التهاب حاد في اللثة السفلية',
    afterNote: 'أسنان سفلية نظيفة وناصعة مع استعادة صحة اللثة بالكامل',
    image: caseImg2,
    whatsappInquiry: 'مرحباً د. عبدالرحمن، شاهدت الحالة الثانية (إزالة التكلسات وتأهيل الأسنان السفلية) وأريد الاستفسار عن حالة مشابهة',
  },
  {
    id: 'case-3',
    title: 'تركيبات الزيركون التجميلية للأسنان الأمامية العلوية',
    category: 'تجميل الأسنان الأمامية',
    procedureSummary: 'ترميم الأسنان الأمامية العلوية المكسورة والمتهدمة بتركيبات زيركون دقيقة تحاكي شكل ولون الأسنان الطبيعية مع سد الفراغات.',
    beforeNote: 'كسور وتهدم في الأسنان الأمامية العلوية مع فراغات وعدم تناسق واضح',
    afterNote: 'تناسق تام في شكل وطول ولون الأسنان الأمامية مع انسجام اللثة',
    image: caseImg3,
    whatsappInquiry: 'مرحباً د. عبدالرحمن، شاهدت الحالة الثالثة (تركيبات الزيركون للأسنان الأمامية) وأريد حجز استشارة',
  },
  {
    id: 'case-4',
    title: 'إعادة تأهيل شامل للفك السفلي بالتركيبات الثابتة',
    category: 'إعادة تأهيل الفكين والتركيبات الثابتة',
    procedureSummary: 'تعويض الأسنان المفقودة في الفك السفلي بجسر تعويضي ثابت كامل لاستعادة كفاءة المضغ والمظهر الجمالي الطبيعي.',
    beforeNote: 'فقدان عدد من الأسنان السفلية مع تصبغ وتحضير الدعامات المتبقية',
    afterNote: 'قوس سني سفلي مكتمل وثابت بمظهر طبيعي يعيد الوظيفة الكاملة',
    image: caseImg4,
    whatsappInquiry: 'مرحباً د. عبدالرحمن، شاهدت الحالة الرابعة (إعادة تأهيل الفك السفلي بالتركيبات الثابتة) وأريد حجز موعد كشف',
  },
];

export const CLINIC_ROOMS: ClinicRoomItem[] = [
  {
    id: 'room-6',
    title: 'كاونتر الاستقبال ومنصة تقييم الخدمة',
    subtitle: 'استقبال شامل بمنصة تقييم الخدمة الذكية (Rate Us) وكاونتر تنسيق المواعيد ومقاعد انتظار مريحة.',
    badge: 'الاستقبال الرئيسي',
    image: clinicImg6,
    spanClass: 'md:col-span-2 lg:col-span-7',
  },
  {
    id: 'room-1',
    title: 'غرفة الكشف والعلاج الرئيسية',
    subtitle: 'غرفة علاج مجهزة بأحدث كرسي أسنان طبي ودواليب تعقيم وأدراج منظمة لجميع الأدوات والمعدات الطبية.',
    badge: 'وحدة العلاج المتكاملة',
    image: clinicImg1,
    spanClass: 'md:col-span-1 lg:col-span-5',
  },
  {
    id: 'room-5',
    title: 'مكتب الدكتور وغرفة الاستشارة',
    subtitle: 'مساحة مخصصة تجمع بين كرسي الكشف ومكتب الدكتور لمناقشة خطة العلاج ومراحل الإجراء الطبي بخصوصية تامة.',
    badge: 'مكتب د. عبدالرحمن الكحلوت',
    image: clinicImg5,
    spanClass: 'md:col-span-1 lg:col-span-5',
  },
  {
    id: 'room-4',
    title: 'صالة استراحة المراجعين',
    subtitle: 'صالة انتظار واسعة بكنبة مريحة ومقاعد وثيرة ونجفة عصرية مع كاونتر استقبال لتجربة مريحة ومطمئنة.',
    badge: 'صالة الانتظار',
    image: clinicImg4,
    spanClass: 'md:col-span-2 lg:col-span-7',
  },
  {
    id: 'room-3',
    title: 'منطقة الاستقبال والانتظار',
    subtitle: 'استقبال أنيق بكاونتر خشبي وجدار أخضر مميز مع مقاعد مريحة ومنظومة كمبيوتر لتنسيق المواعيد.',
    badge: 'خدمة المراجعين',
    image: clinicImg3,
    spanClass: 'md:col-span-1 lg:col-span-6',
  },
  {
    id: 'room-2',
    title: 'الممر الداخلي للعيادة',
    subtitle: 'ممر بتصميم معماري حديث بإضاءة LED خطية مدمجة وأرضيات رخامية لامعة تعكس معايير النظافة الفائقة.',
    badge: 'التصميم الداخلي',
    image: clinicImg2,
    spanClass: 'md:col-span-1 lg:col-span-6',
  },
];
