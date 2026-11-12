import React from 'react';

interface KdcLogoProps {
  className?: string;
  variant?: 'gold' | 'brand';
  showText?: boolean;
}

export const KdcLogo: React.FC<KdcLogoProps> = ({
  className = 'h-12',
  variant = 'gold',
  showText = false,
}) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const gradId = `kdcGrad_${uniqueId}`;

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`} dir="ltr">
      <svg
        viewBox="0 0 240 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="KDC - عيادة الكحلوت للأسنان"
        role="img"
      >
        <defs>
          {variant === 'gold' ? (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3B8" />
              <stop offset="35%" stopColor="#E5C158" />
              <stop offset="70%" stopColor="#C9A227" />
              <stop offset="100%" stopColor="#9A740C" />
            </linearGradient>
          ) : (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F5C6E" />
              <stop offset="60%" stopColor="#1B7F96" />
              <stop offset="100%" stopColor="#C9A227" />
            </linearGradient>
          )}
        </defs>

        {/* Letter K */}
        <path
          d="M20 14H33V43L59 14H75L46 46L77 78H60L33 49V78H20V14Z"
          fill={`url(#${gradId})`}
        />

        {/* Outer D Frame */}
        <path
          d="M84 14H114C135 14 149 27 149 46C149 65 135 78 114 78H84V14ZM97 25V67H113C127 67 136 58 136 46C136 34 127 25 113 25H97Z"
          fill={`url(#${gradId})`}
        />

        {/* Stylized Tooth Silhouette inside D */}
        <path
          d="M106 31C102 31 99 34.5 99 39.5C99 45.5 102 49.5 103.5 55.5C104.8 60.5 106 63 108 63C109.8 63 110.5 58 112.5 58C114.5 58 115.2 63 117 63C119 63 120.2 60.5 121.5 55.5C123 49.5 126 45.5 126 39.5C126 34.5 123 31 119 31C116 31 114.2 33 112.5 33C110.8 33 109 31 106 31Z"
          stroke={`url(#${gradId})`}
          strokeWidth="3.2"
          fill="none"
        />

        {/* Letter C */}
        <path
          d="M192 26C178 26 169 34.5 169 46C169 57.5 178 66 192 66C199 66 205 63.5 210 59L218 68C211 75 202 78.5 191 78.5C170 78.5 155 65 155 46C155 27 170 13.5 191 13.5C202 13.5 211 17 218 24L210 33C205 28.5 199 26 192 26Z"
          fill={`url(#${gradId})`}
        />

        {/* Signature KDC Sparkle Stars at top right */}
        <path
          d="M225 6L227.2 14.8L236 17L227.2 19.2L225 28L222.8 19.2L214 17L222.8 14.8L225 6Z"
          fill="#F5D77F"
        />
        <path
          d="M212 20L213.1 24.4L217.5 25.5L213.1 26.6L212 31L210.9 26.6L206.5 25.5L210.9 24.4L212 20Z"
          fill="#E5C158"
        />
      </svg>

      {showText && (
        <div className="text-center mt-1" dir="rtl">
          <div className="text-xs font-extrabold tracking-wide text-[#F3D87D]">
            عيادة الكحلوت للأسنان
          </div>
          <div
            className="text-[10px] font-semibold tracking-[0.18em] text-[#D4AF37]/90 uppercase"
            dir="ltr"
          >
            ELKAHLOT DENTAL CLINIC
          </div>
        </div>
      )}
    </div>
  );
};
