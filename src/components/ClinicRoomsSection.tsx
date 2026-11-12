import React from 'react';
import { Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import { CLINIC_ROOMS, ClinicRoomItem } from '../data/clinicData';

interface ClinicRoomsSectionProps {
  onOpenLightbox: (index: number) => void;
}

export const ClinicRoomsSection: React.FC<ClinicRoomsSectionProps> = ({ onOpenLightbox }) => {
  return (
    <section
      id="clinic-tour"
      aria-labelledby="clinic-tour-heading"
      className="py-8 sm:py-12 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F5C6E]/10 dark:bg-[#2AA6BE]/15 border border-[#0F5C6E]/20 dark:border-[#2AA6BE]/30 text-[#0F5C6E] dark:text-[#2AA6BE] text-xs font-extrabold mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>بيئة طبية متكاملة ومعقمة</span>
          </div>
          <h2
            id="clinic-tour-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[var(--ink)]"
          >
            العيادة من الداخل
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-1.5 max-w-2xl">
            تجهيزات طبية حديثة ومساحات استقبال مصممة بعناية لتوفير أقصى درجات الراحة والخصوصية والتعقيم.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--brand)] bg-[var(--surface)] px-3.5 py-2 rounded-xl border border-[var(--line)] shrink-0">
          <Sparkles className="w-4 h-4 text-[#C9A227]" />
          <span>٦ صور حقيقية من داخل العيادة</span>
        </div>
      </div>

      {/* Responsive Bento Grid (2 cols mobile/tablet, 12-col architectural Bento on desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-12 gap-2.5 sm:gap-5 duo-safe-grid">
        {CLINIC_ROOMS.map((room: ClinicRoomItem, idx: number) => (
          <article
            key={room.id}
            onClick={() => onOpenLightbox(idx)}
            role="button"
            tabIndex={0}
            aria-label={`عرض صورة ${room.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenLightbox(idx);
              }
            }}
            className={`${room.spanClass.replace('md:col-span-2 ', '')} group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--surface)] border border-[var(--line)] shadow-[var(--card-shadow)] cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)]`}
          >
            {/* Image Container */}
            <div className="relative aspect-square sm:aspect-auto sm:h-[300px] lg:h-[350px] w-full overflow-hidden bg-slate-900">
              <img
                src={room.image}
                alt={room.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-2 right-2 left-2 sm:top-3.5 sm:right-3.5 sm:left-3.5 flex items-center justify-between gap-1">
                <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white text-[9.5px] sm:text-xs font-bold leading-tight">
                  {room.badge}
                </span>

                <span className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-black/65 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[var(--brand)] group-hover:text-[var(--brand-ink)] transition shrink-0">
                  <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </span>
              </div>

              {/* Bottom Overlay Title & Description */}
              <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-5 text-white">
                <h3 className="text-xs sm:text-xl font-extrabold leading-snug drop-shadow-sm">
                  {room.title}
                </h3>
                <p className="hidden sm:block text-xs sm:text-sm text-gray-200 mt-1 line-clamp-2 leading-relaxed">
                  {room.subtitle}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
