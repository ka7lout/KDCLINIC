import React, { useEffect, useState } from 'react';
import { X, ChevronRight, ChevronLeft, ZoomIn, ZoomOut, MessageCircle } from 'lucide-react';
import { CLINIC_INFO, buildWhatsAppUrl } from '../data/clinicData';

export interface LightboxSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  whatsappInquiry?: string;
}

interface ImageLightboxModalProps {
  slides: LightboxSlide[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  slides,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        // In RTL, left arrow goes to next slide
        onNavigate((activeIndex + 1) % slides.length);
      } else if (e.key === 'ArrowRight') {
        // In RTL, right arrow goes to previous slide
        onNavigate((activeIndex - 1 + slides.length) % slides.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, slides.length, onClose, onNavigate]);

  if (activeIndex === null || !slides[activeIndex]) return null;

  const currentSlide = slides[activeIndex];
  const waHref = currentSlide.whatsappInquiry
    ? buildWhatsAppUrl(currentSlide.whatsappInquiry)
    : CLINIC_INFO.whatsappDefaultUrl;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/92 backdrop-blur-xl text-white select-none"
      role="dialog"
      aria-modal="true"
      aria-label={currentSlide.title}
      onClick={onClose}
    >
      {/* Top Toolbar */}
      <div
        className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs sm:text-sm font-num font-bold text-[#F3D87D]">
            {activeIndex + 1} / {slides.length}
          </span>
          {currentSlide.badge && (
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#0F5C6E]/80 text-xs font-bold text-white border border-white/15">
              {currentSlide.badge}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsZoomed((z) => !z)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            aria-label={isZoomed ? 'تصغير الصورة' : 'تكبير الصورة'}
            title={isZoomed ? 'تصغير الصورة' : 'تكبير الصورة'}
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-white transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="إغلاق العرض"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-auto p-3 sm:p-6">
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((activeIndex - 1 + slides.length) % slides.length);
              }}
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-[#0F5C6E] border border-white/20 flex items-center justify-center text-white shadow-xl transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((activeIndex + 1) % slides.length);
              }}
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/65 hover:bg-[#0F5C6E] border border-white/20 flex items-center justify-center text-white shadow-xl transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </>
        )}

        <div
          className={`transition-transform duration-300 ease-out flex items-center justify-center ${
            isZoomed ? 'scale-125 sm:scale-150 cursor-zoom-out' : 'cursor-zoom-in max-h-full max-w-5xl'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed((z) => !z);
          }}
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="max-h-[70vh] sm:max-h-[74vh] w-auto max-w-full object-contain rounded-2xl border border-white/15 shadow-2xl"
          />
        </div>
      </div>

      {/* Bottom Caption & Thumbnail Strip */}
      <div
        className="px-4 sm:px-8 py-4 bg-black/80 border-t border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base sm:text-lg font-extrabold text-white">{currentSlide.title}</h4>
            {currentSlide.subtitle && (
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5 max-w-2xl leading-relaxed">
                {currentSlide.subtitle}
              </p>
            )}
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E9E55] hover:bg-[#178044] text-white font-bold text-sm shadow-lg transition shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>احجز استشارة عبر واتساب</span>
          </a>
        </div>

        {/* Thumbnail Dots / Strip */}
        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-3 overflow-x-auto py-1">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => onNavigate(idx)}
                className={`relative h-11 w-16 rounded-lg overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                  idx === activeIndex
                    ? 'border-[#D4AF37] scale-105 opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
                aria-label={`عرض صورة ${idx + 1}`}
              >
                <img src={slide.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
