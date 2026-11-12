import React, { useState } from 'react';
import { Maximize2, MessageCircle, Sparkles, CheckCircle2, Eye } from 'lucide-react';
import { CLINICAL_CASES, CLINIC_INFO, buildWhatsAppUrl, ClinicalCaseItem } from '../data/clinicData';
import { KdcLogo } from './KdcLogo';

interface ClinicalCasesSectionProps {
  onOpenLightbox: (index: number) => void;
}

export const ClinicalCasesSection: React.FC<ClinicalCasesSectionProps> = ({ onOpenLightbox }) => {
  const [selectedFocus, setSelectedFocus] = useState<Record<string, 'both' | 'after' | 'before'>>({});

  const getFocusMode = (id: string) => selectedFocus[id] || 'both';

  const setFocusMode = (id: string, mode: 'both' | 'after' | 'before') => {
    setSelectedFocus((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <section
      id="cases"
      aria-labelledby="cases-heading"
      className="py-8 sm:py-12 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F5C6E]/10 dark:bg-[#2AA6BE]/15 border border-[#0F5C6E]/20 dark:border-[#2AA6BE]/30 text-[#0F5C6E] dark:text-[#2AA6BE] text-xs font-extrabold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>نتائج موثقة داخل العيادة</span>
          </div>
          <h2
            id="cases-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[var(--ink)]"
          >
            نتائج حالات حقيقية (قبل وبعد)
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-1.5 max-w-2xl">
            نماذج واقعية لحالات تم علاجها وتأهيلها بالكامل في عيادة الكحلوت للأسنان تحت إشراف{' '}
            <strong className="text-[var(--ink)] font-bold">{CLINIC_INFO.doctorName}</strong>.
          </p>
        </div>

        <div className="text-xs sm:text-sm text-[var(--muted)] flex items-center gap-2 shrink-0 bg-[var(--surface)] px-3.5 py-2 rounded-xl border border-[var(--line)]">
          <Eye className="w-4 h-4 text-[#C9A227]" />
          <span>اضغط على أي صورة للتكبير بملء الشاشة</span>
        </div>
      </div>

      {/* Cases Grid: 1 col on mobile, 2 cols on Foldable/Tablet/Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 duo-safe-grid">
        {CLINICAL_CASES.map((item: ClinicalCaseItem, idx: number) => {
          const focusMode = getFocusMode(item.id);

          return (
            <article
              key={item.id}
              className="kdc-case-frame rounded-3xl overflow-hidden flex flex-col justify-between text-white transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Top Luxury KDC Gold Header */}
              <div className="px-4 sm:px-6 pt-5 pb-3 text-center relative">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#F3D87D] text-[11px] font-bold">
                    حالة رقم {idx + 1}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F3D87D] text-[11px] font-bold">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center my-1">
                  <KdcLogo className="h-10 sm:h-11" variant="gold" />
                  <div className="mt-1 text-xs sm:text-sm font-extrabold text-white tracking-wide">
                    {CLINIC_INFO.nameAr}
                  </div>
                  <div className="mt-1.5 inline-block px-4 py-0.5 rounded-full kdc-gold-pill text-[11px] sm:text-xs font-extrabold text-[#F3D87D]">
                    د/ عبدالرحمن الكحلوت
                  </div>
                </div>

                <div className="kdc-gold-line mt-3" />
              </div>

              {/* Image Showcase Area with Interactive Focus Controls */}
              <div className="px-4 sm:px-6">
                <div
                  className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/70 bg-black group cursor-pointer shadow-inner"
                  onClick={() => onOpenLightbox(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`تكبير صورة ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenLightbox(idx);
                    }
                  }}
                >
                  <div className="aspect-[3/2] w-full overflow-hidden relative bg-[#08090C]">
                    <img
                      src={item.image}
                      alt={`${item.title} - قبل وبعد العلاج في عيادة الكحلوت للأسنان`}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        focusMode === 'after'
                          ? 'scale-[1.85] origin-right'
                          : focusMode === 'before'
                          ? 'scale-[1.85] origin-left'
                          : 'group-hover:scale-[1.03]'
                      }`}
                    />

                    {/* Subtle Top-Right Expand Button */}
                    <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/50 text-white text-xs font-bold shadow-lg group-hover:bg-[#D4AF37] group-hover:text-black transition">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>تكبير</span>
                    </span>
                  </div>

                  {/* BEFORE / AFTER Signature Gold Bar under photo */}
                  <div
                    className="grid grid-cols-2 gap-2 px-3 py-2.5 bg-gradient-to-b from-black/90 to-[#0B0D10] border-t border-[#D4AF37]/40"
                    dir="ltr"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setFocusMode(item.id, focusMode === 'before' ? 'both' : 'before')}
                      className={`py-1.5 px-3 rounded-full text-xs font-num font-extrabold tracking-widest uppercase transition cursor-pointer flex items-center justify-center gap-2 ${
                        focusMode === 'before'
                          ? 'bg-[#D4AF37] text-black shadow-md'
                          : 'kdc-gold-pill text-[#F3D87D] hover:bg-white/10'
                      }`}
                    >
                      <span>BEFORE</span>
                      <span className="text-[10px] opacity-85 font-sans">قبل</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFocusMode(item.id, focusMode === 'after' ? 'both' : 'after')}
                      className={`py-1.5 px-3 rounded-full text-xs font-num font-extrabold tracking-widest uppercase transition cursor-pointer flex items-center justify-center gap-2 ${
                        focusMode === 'after'
                          ? 'bg-[#D4AF37] text-black shadow-md'
                          : 'kdc-gold-pill text-[#F3D87D] hover:bg-white/10'
                      }`}
                    >
                      <span>AFTER</span>
                      <span className="text-[10px] opacity-85 font-sans">بعد</span>
                    </button>
                  </div>
                </div>

                {focusMode !== 'both' && (
                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setFocusMode(item.id, 'both')}
                      className="text-xs text-[#F3D87D] underline hover:text-white cursor-pointer"
                    >
                      إعادة عرض الصورتين (قبل وبعد) معاً
                    </button>
                  </div>
                )}
              </div>

              {/* Clinical Details & Action Footer */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
                    {item.procedureSummary}
                  </p>

                  {/* Before & After Comparison Notes */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-3.5 sm:mt-4">
                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2 sm:p-2.5">
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-amber-300/90 block mb-0.5">
                        الحالة قبل الإجراء:
                      </span>
                      <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">{item.beforeNote}</p>
                    </div>
                    <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/30 p-2 sm:p-2.5">
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-300 flex items-center gap-1 mb-0.5">
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                        <span>النتيجة بعد الإجراء:</span>
                      </span>
                      <p className="text-[11px] sm:text-xs text-emerald-100/90 leading-relaxed">{item.afterNote}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom KDC Signature Bar + WhatsApp Inquiry */}
                <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-gray-300 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-num font-bold text-[#F3D87D]" dir="ltr">
                      {CLINIC_INFO.phonePrimary} | {CLINIC_INFO.phoneWhatsapp}
                    </span>
                    <span className="hidden sm:inline text-[#D4AF37]">•</span>
                    <span>جسر السويس - التجاريين</span>
                  </div>

                  <a
                    href={buildWhatsAppUrl(item.whatsappInquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E9E55] hover:bg-[#178044] text-white font-bold text-xs sm:text-sm shadow-md transition shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>احجز لحالة مشابهة</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
