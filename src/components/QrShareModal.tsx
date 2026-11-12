import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, UserPlus, MapPin, Phone, MessageCircle } from 'lucide-react';
import { CLINIC_INFO, downloadClinicVCard } from '../data/clinicData';
import { KdcLogo } from './KdcLogo';

interface QrShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrShareModal: React.FC<QrShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<'url' | 'phone' | 'address' | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : CLINIC_INFO.instagramUrl;

  const copyToClipboard = async (text: string, type: 'url' | 'phone' | 'address') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: `${CLINIC_INFO.nameAr} - ${CLINIC_INFO.doctorName}`,
      text: `${CLINIC_INFO.nameAr} (${CLINIC_INFO.doctorName}) - ${CLINIC_INFO.doctorTitle}\nالعنوان: ${CLINIC_INFO.addressFull}\nللحجز والاستفسار: ${CLINIC_INFO.phonePrimary}`,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share sheet
      }
    } else {
      copyToClipboard(currentUrl, 'url');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clinic-card-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden kdc-case-frame text-white p-6 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <KdcLogo className="h-14 mb-2" variant="gold" />
          <h3 id="clinic-card-modal-title" className="text-xl font-extrabold text-white mt-1">
            {CLINIC_INFO.nameAr}
          </h3>
          <p className="text-sm font-bold text-[#F3D87D] mt-0.5">{CLINIC_INFO.doctorName}</p>
          <p className="text-xs text-gray-300 mt-0.5">{CLINIC_INFO.doctorTitle}</p>
        </div>

        <div className="kdc-gold-line my-5" />

        {/* Save Contact Directly to Phone (Crucial for Street QR Code Scanners) */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={downloadClinicVCard}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-l from-[#D4AF37] to-[#B58E1C] text-[#05080A] font-extrabold text-sm sm:text-base shadow-lg hover:brightness-110 transition cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <UserPlus className="w-5 h-5 shrink-0" />
              <span>حفظ أرقام وعنوان العيادة بالهاتف</span>
            </span>
            <span className="text-xs bg-black/15 px-2.5 py-1 rounded-full font-bold">vCard</span>
          </button>

          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm sm:text-base transition cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <Share2 className="w-5 h-5 text-[#F3D87D] shrink-0" />
              <span>مشاركة بيانات العيادة مع صديق أو قريب</span>
            </span>
            <span className="text-xs text-gray-300">إرسال</span>
          </button>
        </div>

        {/* Quick Copy Details */}
        <div className="mt-5 space-y-2.5 text-right bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs sm:text-sm">
              <span className="text-gray-400 block text-xs">أرقام التواصل المباشر:</span>
              <span className="font-num font-bold text-white" dir="ltr">
                {CLINIC_INFO.phonePrimary} / {CLINIC_INFO.phoneWhatsapp}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(CLINIC_INFO.phonePrimary, 'phone')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 text-[#F3D87D] transition cursor-pointer shrink-0"
            >
              {copiedType === 'phone' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ الرقم</span>
                </>
              )}
            </button>
          </div>

          <div className="border-t border-white/10 pt-2.5 flex items-center justify-between gap-2">
            <div className="text-xs sm:text-sm">
              <span className="text-gray-400 block text-xs">العنوان التفصيلي:</span>
              <span className="font-semibold text-gray-100 leading-snug block">
                {CLINIC_INFO.addressFull}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(CLINIC_INFO.addressFull, 'address')}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold flex items-center gap-1.5 text-[#F3D87D] transition cursor-pointer shrink-0"
            >
              {copiedType === 'address' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ العنوان</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Direct Action Row */}
        <div className="grid grid-cols-3 gap-2.5 mt-5">
          <a
            href={CLINIC_INFO.whatsappDefaultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-[#1E9E55] hover:bg-[#178044] text-white text-xs font-bold transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب</span>
          </a>
          <a
            href={`tel:${CLINIC_INFO.phonePrimary}`}
            className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-[#0F5C6E] hover:bg-[#0B4654] text-white text-xs font-bold transition"
          >
            <Phone className="w-4 h-4" />
            <span>اتصال</span>
          </a>
          <a
            href={CLINIC_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
          >
            <MapPin className="w-4 h-4 text-[#F3D87D]" />
            <span>الخريطة</span>
          </a>
        </div>
      </div>
    </div>
  );
};
