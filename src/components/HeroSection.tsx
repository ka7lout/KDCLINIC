import React from 'react';
import {
  Phone,
  MapPin,
  Award,
  UserPlus,
  Share2,
  ArrowUpLeft,
  Sparkles,
  Images,
} from 'lucide-react';
import { CLINIC_INFO, CLINIC_ROOMS, downloadClinicVCard } from '../data/clinicData';
import { KdcLogo } from './KdcLogo';

interface HeroSectionProps {
  onOpenShareModal: () => void;
  onOpenClinicLightbox: (index: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenShareModal,
  onOpenClinicLightbox,
}) => {
  return (
    <section className="pt-4 sm:pt-8 pb-6 sm:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start duo-safe-grid">
        {/* Right Column (in RTL): Identity + Primary Action Hub */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prestigious Doctor & Clinic Identity Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-[var(--surface)] border border-[var(--line)] shadow-[var(--card-shadow)] relative overflow-hidden">
            {/* Subtle top decorative accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-l from-[#0F5C6E] via-[#C9A227] to-[#1E9E55]" />

            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F5C6E]/10 dark:bg-[#2AA6BE]/15 border border-[#0F5C6E]/20 dark:border-[#2AA6BE]/30 text-[var(--brand)] text-xs sm:text-sm font-extrabold">
                <Award className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>{CLINIC_INFO.doctorName}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadClinicVCard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg)] hover:bg-[var(--brand)] hover:text-[var(--brand-ink)] border border-[var(--line)] text-xs font-extrabold text-[var(--ink)] transition cursor-pointer"
                  title="حفظ رقم وعنوان العيادة في جهات الاتصال"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>حفظ الرقم</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenShareModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg)] hover:bg-[var(--brand)] hover:text-[var(--brand-ink)] border border-[var(--line)] text-xs font-extrabold text-[var(--ink)] transition cursor-pointer"
                  title="مشاركة صفحة العيادة"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>مشاركة</span>
                </button>
              </div>
            </div>

            <h1 className="compact-text-scale text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--ink)] tracking-tight leading-[1.25]">
              {CLINIC_INFO.nameAr}
            </h1>

            <p className="text-base sm:text-xl font-extrabold text-[var(--brand)] mt-2">
              {CLINIC_INFO.tagline}
            </p>

            <div className="mt-4 pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[var(--muted)] font-semibold">
              <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#1E9E55]" />
                {CLINIC_INFO.doctorTitle}
              </span>
              <span className="hidden sm:inline text-[var(--line)]">|</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                {CLINIC_INFO.doctorMembership}
              </span>
            </div>
          </div>

          {/* Primary Contact & Social Actions Hub (All 5 Official Links) */}
          <nav aria-label="طرق التواصل والحجز المباشر" className="space-y-3">
            {/* 1. Primary WhatsApp CTA + 2. Direct Phone Call */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* WhatsApp */}
              <a
                href={CLINIC_INFO.whatsappDefaultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-2 px-3.5 py-3 sm:px-5 sm:py-4 rounded-2xl bg-[#1E9E55] hover:bg-[#178044] text-white shadow-lg shadow-[#1E9E55]/20 transition-all duration-200 hover:-translate-y-0.5 min-h-[64px] sm:min-h-[74px] focus:outline-none focus:ring-3 focus:ring-[#1E9E55]/50"
              >
                <div className="min-w-0">
                  <span className="text-sm sm:text-xl font-black block leading-tight">
                    احجز على واتساب
                  </span>
                  <span className="text-[11px] sm:text-sm font-semibold text-white/90 mt-0.5 block">
                    رد سريع على استفسارك
                  </span>
                </div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 sm:w-7 sm:h-7"
                    aria-hidden="true"
                  >
                    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.3z" />
                  </svg>
                </div>
              </a>

              {/* Direct Call */}
              <a
                href={`tel:${CLINIC_INFO.phonePrimary}`}
                className="group flex items-center justify-between gap-2 px-3.5 py-3 sm:px-5 sm:py-4 rounded-2xl bg-[var(--brand)] hover:opacity-95 text-[var(--brand-ink)] shadow-lg shadow-[#0F5C6E]/20 transition-all duration-200 hover:-translate-y-0.5 min-h-[64px] sm:min-h-[74px] focus:outline-none focus:ring-3 focus:ring-[var(--brand)]/50"
              >
                <div className="min-w-0">
                  <span className="text-sm sm:text-xl font-black block leading-tight">
                    اتصل بالعيادة
                  </span>
                  <span
                    className="text-[11px] sm:text-sm font-num font-extrabold opacity-95 mt-0.5 block"
                    dir="ltr"
                  >
                    {CLINIC_INFO.phonePrimary}
                  </span>
                </div>
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-black/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <Phone className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
              </a>
            </div>

            {/* 3. Google Maps Location */}
            <a
              href={CLINIC_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-0.5 min-h-[72px] focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#0F5C6E]/10 dark:bg-[#2AA6BE]/15 text-[var(--brand)] flex items-center justify-center shrink-0 group-hover:bg-[var(--brand)] group-hover:text-[var(--brand-ink)] transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-base sm:text-lg font-extrabold block leading-snug group-hover:text-[var(--brand)] transition-colors">
                    موقع العيادة على الخريطة
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[var(--muted)] block mt-0.5">
                    {CLINIC_INFO.addressShort} — {CLINIC_INFO.addressLandmark}
                  </span>
                </div>
              </div>
              <ArrowUpLeft className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--brand)] shrink-0 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* 4. Instagram & 5. Facebook */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {/* Instagram */}
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-1.5 px-2.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-0.5 min-h-[60px] sm:min-h-[66px]"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-base font-extrabold block leading-tight">
                      تابعنا على انستجرام
                    </span>
                    <span
                      className="text-[9px] sm:text-xs font-num font-semibold text-[var(--muted)] block tracking-tight break-all sm:truncate"
                      dir="ltr"
                    >
                      {CLINIC_INFO.instagramHandle}
                    </span>
                  </div>
                </div>
                <ArrowUpLeft className="hidden sm:block w-4 h-4 text-[var(--muted)] group-hover:text-[var(--brand)] shrink-0" />
              </a>

              {/* Facebook */}
              <a
                href={CLINIC_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-1.5 px-2.5 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] shadow-[var(--card-shadow)] transition-all duration-200 hover:-translate-y-0.5 min-h-[60px] sm:min-h-[66px]"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      aria-hidden="true"
                    >
                      <path d="M13.5 22v-8.2h2.8l.5-3.4h-3.3V8.3c0-1 .3-1.7 1.7-1.7h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.8H7.5v3.4h2.8V22h3.2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] sm:text-base font-extrabold block leading-tight">
                      صفحتنا على فيسبوك
                    </span>
                    <span className="text-[9.5px] sm:text-xs font-semibold text-[var(--muted)] block leading-tight mt-0.5">
                      تابع آخر الأخبار والحالات
                    </span>
                  </div>
                </div>
                <ArrowUpLeft className="hidden sm:block w-4 h-4 text-[var(--muted)] group-hover:text-[var(--brand)] shrink-0" />
              </a>
            </div>
          </nav>
        </div>

        {/* Left Column (in RTL): Visual Clinic Preview Showcase */}
        <div className="lg:col-span-5">
          <div className="kdc-case-frame rounded-3xl p-4 sm:p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 mb-3 px-1">
              <div className="flex items-center gap-2.5">
                <KdcLogo className="h-8" variant="gold" />
                <div>
                  <span className="text-xs font-extrabold text-white block">
                    عيادة الكحلوت للأسنان
                  </span>
                  <span className="text-[10px] text-[#F3D87D] font-num tracking-wider uppercase block">
                    ELKAHLOT DENTAL CLINIC
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3D87D] text-[11px] font-bold">
                جسر السويس
              </span>
            </div>

            {/* Featured Main Clinic Reception Photo */}
            <div
              onClick={() => onOpenClinicLightbox(0)}
              role="button"
              tabIndex={0}
              aria-label="عرض صور العيادة من الداخل"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onOpenClinicLightbox(0);
                }
              }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4AF37]/50 cursor-pointer group"
            >
              <img
                src={CLINIC_ROOMS[0].image}
                alt="استقبال عيادة الكحلوت للأسنان"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-extrabold">
                    العيادة من الداخل
                  </span>
                  <h2 className="text-sm sm:text-base font-extrabold text-white mt-1">
                    تجهيزات حديثة وبيئة طبية متكاملة
                  </h2>
                </div>
              </div>
            </div>

            {/* 3 Mini Preview Thumbnails of Treatment Rooms */}
            <div className="grid grid-cols-3 gap-2.5 mt-2.5">
              {[1, 2, 3].map((roomIdx) => (
                <button
                  key={CLINIC_ROOMS[roomIdx].id}
                  type="button"
                  onClick={() => onOpenClinicLightbox(roomIdx)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/15 hover:border-[#D4AF37] group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  aria-label={`عرض ${CLINIC_ROOMS[roomIdx].title}`}
                >
                  <img
                    src={CLINIC_ROOMS[roomIdx].image}
                    alt={CLINIC_ROOMS[roomIdx].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition" />
                </button>
              ))}
            </div>

            {/* Quick Section Jump Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3.5 border-t border-white/10">
              <a
                href="#cases"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl kdc-gold-pill text-[#F3D87D] hover:bg-[#D4AF37] hover:text-black text-xs font-extrabold transition"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>نتائج الحالات (٤)</span>
              </a>
              <a
                href="#clinic-tour"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold transition"
              >
                <Images className="w-3.5 h-3.5 text-[#F3D87D] shrink-0" />
                <span>صور العيادة (٦)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
