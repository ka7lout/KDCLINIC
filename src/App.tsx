import { useState, useEffect, useMemo } from 'react';
import {
  Sun,
  Moon,
  MessageCircle,
  Phone,
  MapPin,
  Share2,
  UserPlus,
} from 'lucide-react';
import {
  CLINIC_INFO,
  CLINICAL_CASES,
  CLINIC_ROOMS,
  downloadClinicVCard,
} from './data/clinicData';
import { KdcLogo } from './components/KdcLogo';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ClinicalCasesSection } from './components/ClinicalCasesSection';
import { ClinicRoomsSection } from './components/ClinicRoomsSection';
import { DoctorAndLocationSection } from './components/DoctorAndLocationSection';
import { ImageLightboxModal, LightboxSlide } from './components/ImageLightboxModal';
import { QrShareModal } from './components/QrShareModal';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kdc-theme');
        if (saved === 'light' || saved === 'dark') return saved;
      } catch {
        // Ignore storage errors
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [lightboxState, setLightboxState] = useState<{
    group: 'cases' | 'rooms';
    index: number;
  } | null>(null);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('kdc-theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const caseSlides: LightboxSlide[] = useMemo(
    () =>
      CLINICAL_CASES.map((c) => ({
        id: c.id,
        image: c.image,
        title: c.title,
        subtitle: `${c.procedureSummary} — (${c.afterNote})`,
        badge: c.category,
        whatsappInquiry: c.whatsappInquiry,
      })),
    []
  );

  const roomSlides: LightboxSlide[] = useMemo(
    () =>
      CLINIC_ROOMS.map((r) => ({
        id: r.id,
        image: r.image,
        title: r.title,
        subtitle: r.subtitle,
        badge: r.badge,
      })),
    []
  );

  const activeSlides = lightboxState?.group === 'cases' ? caseSlides : roomSlides;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] pb-20 md:pb-0">
      {/* Top Sticky Glassmorphic Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--surface-glass)] backdrop-blur-xl transition-colors">
        <div className="ultrawide-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={CLINIC_INFO.nameAr}
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl kdc-case-frame flex items-center justify-center p-1.5 shrink-0 shadow-sm">
              <KdcLogo className="h-6 sm:h-7" variant="gold" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black text-[var(--ink)] group-hover:text-[var(--brand)] transition-colors block leading-tight">
                {CLINIC_INFO.nameAr}
              </span>
              <span className="text-xs font-bold text-[var(--muted)] block">
                {CLINIC_INFO.doctorName}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="أقسام الموقع"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-extrabold text-[var(--muted)]"
          >
            <a
              href="#services"
              className="px-3.5 py-2 rounded-xl hover:bg-[var(--bg)] hover:text-[var(--brand)] transition"
            >
              الخدمات العلاجية
            </a>
            <a
              href="#cases"
              className="px-3.5 py-2 rounded-xl hover:bg-[var(--bg)] hover:text-[var(--brand)] transition"
            >
              نتائج حالات حقيقية
            </a>
            <a
              href="#clinic-tour"
              className="px-3.5 py-2 rounded-xl hover:bg-[var(--bg)] hover:text-[var(--brand)] transition"
            >
              العيادة من الداخل
            </a>
            <a
              href="#about-location"
              className="px-3.5 py-2 rounded-xl hover:bg-[var(--bg)] hover:text-[var(--brand)] transition"
            >
              عن الدكتور والموقع
            </a>
          </nav>

          {/* Right Utility Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[var(--bg)] hover:bg-[var(--brand)] hover:text-[var(--brand-ink)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              aria-label={theme === 'dark' ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
              title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-[#F3D87D]" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Quick Save / Share Modal Trigger */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="w-10 h-10 sm:w-auto sm:px-3.5 sm:h-11 rounded-xl bg-[var(--bg)] hover:bg-[var(--brand)] hover:text-[var(--brand-ink)] border border-[var(--line)] flex items-center justify-center gap-2 text-xs font-extrabold text-[var(--ink)] transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              aria-label="حفظ رقم العيادة أو مشاركة الصفحة"
              title="حفظ رقم العيادة أو مشاركة الصفحة"
            >
              <Share2 className="w-4 h-4 text-[#C9A227]" />
              <span className="hidden sm:inline">بطاقة العيادة</span>
            </button>

            {/* Desktop WhatsApp CTA */}
            <a
              href={CLINIC_INFO.whatsappDefaultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-[#1E9E55] hover:bg-[#178044] text-white font-extrabold text-xs sm:text-sm shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>احجز الآن</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 ultrawide-container max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Hero & Quick-Action Hub */}
        <HeroSection
          onOpenShareModal={() => setIsShareModalOpen(true)}
          onOpenClinicLightbox={(idx) => setLightboxState({ group: 'rooms', index: idx })}
        />

        {/* 2. Dental Services Section (9 Services) */}
        <ServicesSection />

        {/* 3. Real Clinical Results (4 Before & After Cases) */}
        <ClinicalCasesSection
          onOpenLightbox={(idx) => setLightboxState({ group: 'cases', index: idx })}
        />

        {/* 4. Clinic Interior Tour (6 Photos) */}
        <ClinicRoomsSection
          onOpenLightbox={(idx) => setLightboxState({ group: 'rooms', index: idx })}
        />

        {/* 5. Doctor Credentials & Clinic Location */}
        <DoctorAndLocationSection />
      </main>

      {/* Official Clinic Footer */}
      <footer className="mt-12 border-t border-[var(--line)] bg-[var(--surface)] py-8 sm:py-10">
        <div className="ultrawide-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl kdc-case-frame flex items-center justify-center p-1.5">
              <KdcLogo className="h-7" variant="gold" />
            </div>
            <div>
              <p className="text-base font-black text-[var(--ink)]">
                عيادة الكحلوت · KDC Dental
              </p>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-0.5">
                {CLINIC_INFO.doctorName} — {CLINIC_INFO.doctorTitle}
              </p>
              <p className="text-xs text-[var(--muted)] mt-0.5">{CLINIC_INFO.addressFull}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={downloadClinicVCard}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--bg)] hover:bg-[var(--brand)] hover:text-[var(--brand-ink)] border border-[var(--line)] text-xs font-extrabold text-[var(--ink)] transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#C9A227]" />
              <span>حفظ جهة الاتصال</span>
            </button>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--bg)] hover:bg-[var(--brand)] hover:text-[var(--brand-ink)] border border-[var(--line)] text-xs font-extrabold text-[var(--ink)] transition cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة الصفحة</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile & Foldable Sticky Bottom Action Bar */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--surface-glass)] backdrop-blur-xl border-t border-[var(--line)] px-3 py-2.5 shadow-2xl"
        style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto">
          <a
            href={CLINIC_INFO.whatsappDefaultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1E9E55] text-white font-extrabold text-xs sm:text-sm shadow-sm"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>حجز واتساب</span>
          </a>

          <a
            href={`tel:${CLINIC_INFO.phonePrimary}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[var(--brand)] text-[var(--brand-ink)] font-extrabold text-xs sm:text-sm shadow-sm"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span>اتصال مباشر</span>
          </a>

          <a
            href={CLINIC_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[var(--bg)] border border-[var(--line)] text-[var(--ink)] font-extrabold text-xs sm:text-sm"
          >
            <MapPin className="w-4 h-4 text-[var(--brand)] shrink-0" />
            <span>الخريطة</span>
          </a>
        </div>
      </div>

      {/* Full-Screen Lightbox Viewer for Cases & Clinic Rooms */}
      <ImageLightboxModal
        slides={activeSlides}
        activeIndex={lightboxState ? lightboxState.index : null}
        onClose={() => setLightboxState(null)}
        onNavigate={(newIndex) =>
          setLightboxState((prev) => (prev ? { ...prev, index: newIndex } : null))
        }
      />

      {/* Clinic Contact Card & Share Modal */}
      <QrShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}

export default App;
