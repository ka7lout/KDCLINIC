import React from 'react';
import { MessageCircle, ArrowUpLeft, Stethoscope } from 'lucide-react';
import { SERVICES_LIST, buildWhatsAppUrl, ServiceItem } from '../data/clinicData';

const ServiceIcon: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'implants':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-6 h-6">
          <path d="M7 4c-1.5 0-2.5 1.5-2.5 3.5 0 2.5 1.5 4 3 4.5h9c1.5-.5 3-2 3-4.5C19.5 5.5 18.5 4 17 4c-1.5 0-2.5 1-5 1S8.5 4 7 4Z" />
          <path d="M9 12v7a3 3 0 0 0 6 0v-7" />
          <path d="M9 15h6M9.5 18h5" />
        </svg>
      );
    case 'oral-surgery':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-6 h-6">
          <path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 14.6l-5 3.6 1.9-5.8L4 8.8h6.1L12 3z" />
        </svg>
      );
    case 'jaw-rehab':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-6 h-6">
          <path d="M4 10c2 4 5.5 6 8 6s6-2 8-6" />
          <path d="M6 8c1.8 2.5 4 3.5 6 3.5S16.2 10.5 18 8" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case 'hollywood-smile':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-6 h-6">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'root-canal':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-6 h-6">
          <path d="M7 3C4.8 3 3.5 5 3.5 7.8c0 3.2 2 5.2 2.8 8.8.5 2.5 1.3 4.4 2.4 4.4 1 0 1.4-2.5 3.3-2.5s2.3 2.5 3.3 2.5c1.1 0 1.9-1.9 2.4-4.4.8-3.6 2.8-5.6 2.8-8.8C20.5 5 19.2 3 17 3c-1.8 0-3 1.2-5 1.2S8.8 3 7 3Z" />
          <path d="M10 9l2 3 2-3M12 12v5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-6 h-6">
          <path d="M7 3C4.8 3 3.5 5 3.5 7.8c0 3.2 2 5.2 2.8 8.8.5 2.5 1.3 4.4 2.4 4.4 1 0 1.4-2.5 3.3-2.5s2.3 2.5 3.3 2.5c1.1 0 1.9-1.9 2.4-4.4.8-3.6 2.8-5.6 2.8-8.8C20.5 5 19.2 3 17 3c-1.8 0-3 1.2-5 1.2S8.8 3 7 3Z" />
        </svg>
      );
  }
};

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-8 sm:py-12 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F5C6E]/10 dark:bg-[#2AA6BE]/15 border border-[#0F5C6E]/20 dark:border-[#2AA6BE]/30 text-[#0F5C6E] dark:text-[#2AA6BE] text-xs font-extrabold mb-2.5">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>تخصصات طب وجراحة الأسنان</span>
          </div>
          <h2
            id="services-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[var(--ink)]"
          >
            الخدمات العلاجية والتجميلية
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-1.5 max-w-2xl">
            اختر الخدمة المطلوبة للتواصل المباشر وحجز موعدك أو الاستفسار عبر واتساب العيادة.
          </p>
        </div>
      </div>

      {/* Responsive Services Grid: 2 cols on mobile & tablet, 3 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 duo-safe-grid">
        {SERVICES_LIST.map((service: ServiceItem, idx: number) => {
          const isLastOdd = idx === SERVICES_LIST.length - 1 && SERVICES_LIST.length % 2 === 1;
          return (
            <a
              key={service.id}
              href={buildWhatsAppUrl(service.whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                isLastOdd ? 'col-span-2 lg:col-span-1' : ''
              } group relative flex flex-col justify-between rounded-2xl p-3.5 sm:p-5 bg-[var(--surface)] border border-[var(--line)] shadow-[var(--card-shadow)] hover:border-[var(--brand)] transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5 sm:mb-3.5">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0F5C6E]/10 dark:bg-[#2AA6BE]/15 text-[var(--brand)] flex items-center justify-center group-hover:bg-[var(--brand)] group-hover:text-[var(--brand-ink)] transition-colors shrink-0">
                    <ServiceIcon id={service.id} />
                  </div>

                  {service.badge ? (
                    <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#C9A227]/15 border border-[#C9A227]/35 text-[#9A740C] dark:text-[#F3D87D] text-[10px] sm:text-xs font-extrabold whitespace-nowrap">
                      {service.badge}
                    </span>
                  ) : (
                    <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--bg)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--brand)] transition shrink-0">
                      <ArrowUpLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-xl font-extrabold text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors leading-snug">
                  {service.title}
                </h3>

                <p className="text-[11px] sm:text-sm text-[var(--muted)] mt-1 sm:mt-1.5 leading-relaxed">
                  {service.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t border-[var(--line)]/70 flex items-center justify-between gap-1 text-[11px] sm:text-xs font-extrabold text-[#1E9E55] dark:text-[#34C173]">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 leading-tight">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>احجز أو استفسر عبر واتساب</span>
                </span>
                <ArrowUpLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
