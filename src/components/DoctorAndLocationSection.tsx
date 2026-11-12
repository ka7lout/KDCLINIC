import React, { useState } from 'react';
import {
  Award,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  Copy,
  Check,
  ShieldCheck,
  UserCheck,
  Handshake,
} from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { KdcLogo } from './KdcLogo';

export const DoctorAndLocationSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CLINIC_INFO.addressFull);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="about-location"
      aria-labelledby="about-doctor-heading"
      className="py-8 sm:py-12 scroll-mt-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 duo-safe-grid">
        {/* Doctor Credentials Card */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 kdc-case-frame text-white flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3D87D] text-xs font-extrabold">
                <Award className="w-4 h-4" />
                <span>إشراف طبي متخصص</span>
              </span>
              <KdcLogo className="h-10" variant="gold" />
            </div>

            <span className="text-xs sm:text-sm font-bold text-[#F3D87D] block">عن الدكتور</span>
            <h2
              id="about-doctor-heading"
              className="text-2xl sm:text-3xl font-black text-white mt-1"
            >
              {CLINIC_INFO.doctorName}
            </h2>

            <div className="kdc-gold-line my-5" />

            <ul className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              <li className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 bg-white/[0.05] border border-white/10 rounded-2xl p-3 sm:p-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F3D87D] shrink-0">
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base font-extrabold text-white leading-snug">
                    {CLINIC_INFO.doctorTitle}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-300 mt-1 leading-relaxed">
                    خبرة إكلينيكية دقيقة في جراحات الفم، غرسات الأسنان التعويضية، وتصميم الابتسامة التجميلية.
                  </p>
                </div>
              </li>

              <li className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 bg-white/[0.05] border border-white/10 rounded-2xl p-3 sm:p-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F3D87D] shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base font-extrabold text-white leading-snug">
                    {CLINIC_INFO.doctorMembership}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-300 mt-1 leading-relaxed">
                    تطبيق أحدث البروتوكولات المعتمدة في زراعة الأسنان وإعادة تأهيل الفكين.
                  </p>
                </div>
              </li>

              <li className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 bg-white/[0.05] border border-white/10 rounded-2xl p-3 sm:p-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F3D87D] shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base font-extrabold text-white leading-snug">
                    أعلى معايير التعقيم ومكافحة العدوى
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-300 mt-1 leading-relaxed">
                    بيئة علاجية آمنة ومجهزة بأحدث الأجهزة لضمان راحة المريض ودقة النتائج.
                  </p>
                </div>
              </li>

              <li className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 bg-white/[0.05] border border-white/10 rounded-2xl p-3 sm:p-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#F3D87D] shrink-0">
                  <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-base font-extrabold text-white leading-snug">
                    التأمين الطبي والتعاقدات المعتمدة
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-200 mt-1 font-semibold leading-relaxed">
                    متعاقدون مع جميع شركات التأمين الطبي والهيئات والنقابات الحكومية وقطاع البترول.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
            <a
              href={CLINIC_INFO.whatsappDefaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-[#1E9E55] hover:bg-[#178044] text-white font-extrabold text-xs sm:text-base shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>احجز كشفك عبر واتساب</span>
            </a>

            <a
              href={`tel:${CLINIC_INFO.phonePrimary}`}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-extrabold text-xs sm:text-base transition"
            >
              <Phone className="w-4 h-4 text-[#F3D87D] shrink-0" />
              <span className="font-num" dir="ltr">
                {CLINIC_INFO.phonePrimary}
              </span>
            </a>
          </div>
        </div>

        {/* Location & Directions Card */}
        <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-[var(--surface)] border border-[var(--line)] shadow-[var(--card-shadow)] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F5C6E]/10 dark:bg-[#2AA6BE]/15 border border-[#0F5C6E]/20 dark:border-[#2AA6BE]/30 text-[#0F5C6E] dark:text-[#2AA6BE] text-xs font-extrabold mb-4">
              <MapPin className="w-4 h-4" />
              <span>عنوان العيادة والاتجاهات</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
              موقع العيادة على الخريطة
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted)] mt-1.5">
              موقع مميز يسهل الوصول إليه عبر المترو أو السيارة في جسر السويس.
            </p>

            {/* Address Detail Box */}
            <div className="mt-6 rounded-2xl bg-[var(--bg)] border border-[var(--line)] p-4 sm:p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand)] text-[var(--brand-ink)] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[var(--muted)] block">العنوان بالتفصيل:</span>
                  <p className="text-base sm:text-lg font-extrabold text-[var(--ink)] leading-snug mt-0.5">
                    {CLINIC_INFO.addressShort}
                  </p>
                  <p className="text-sm font-bold text-[var(--brand)] mt-1">
                    {CLINIC_INFO.addressLandmark}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--muted)]">
                  انسخ العنوان لمشاركته أو البحث عنه بسهولة
                </span>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-xs font-extrabold text-[var(--ink)] transition cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-4 h-4 text-[#1E9E55]" />
                      <span className="text-[#1E9E55]">تم نسخ العنوان</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[var(--brand)]" />
                      <span>نسخ العنوان</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Phone Numbers Box */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-3">
              <a
                href={`tel:${CLINIC_INFO.phonePrimary}`}
                className="flex items-center justify-between gap-1.5 p-2.5 sm:p-4 rounded-2xl bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] transition group"
              >
                <div className="min-w-0">
                  <span className="text-[10.5px] sm:text-xs text-[var(--muted)] block font-semibold">
                    اتصال مباشر ١
                  </span>
                  <span className="text-[11.5px] sm:text-base font-num font-black text-[var(--ink)] group-hover:text-[var(--brand)] whitespace-nowrap" dir="ltr">
                    {CLINIC_INFO.phonePrimary}
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-[var(--brand)] shrink-0">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </a>

              <a
                href={`tel:${CLINIC_INFO.phoneWhatsapp}`}
                className="flex items-center justify-between gap-1.5 p-2.5 sm:p-4 rounded-2xl bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] transition group"
              >
                <div className="min-w-0">
                  <span className="text-[10.5px] sm:text-xs text-[var(--muted)] block font-semibold">
                    اتصال / واتساب ٢
                  </span>
                  <span className="text-[11.5px] sm:text-base font-num font-black text-[var(--ink)] group-hover:text-[var(--brand)] whitespace-nowrap" dir="ltr">
                    {CLINIC_INFO.phoneWhatsapp}
                  </span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-[#1E9E55] shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </a>
            </div>
          </div>

          {/* Primary Google Maps Navigation CTA */}
          <div className="mt-6">
            <a
              href={CLINIC_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between gap-4 px-6 py-4 rounded-2xl bg-[var(--brand)] hover:opacity-95 text-[var(--brand-ink)] font-extrabold text-base sm:text-lg shadow-lg transition group"
            >
              <span className="flex items-center gap-3">
                <Navigation className="w-5 h-5 shrink-0" />
                <span>افتح موقع العيادة على خرائط جوجل</span>
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/15">
                اتجاهات الوصول
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
