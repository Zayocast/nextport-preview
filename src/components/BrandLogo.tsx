interface BrandLogoProps {
  className?: string
  showText?: boolean
}

export function BrandLogo({ className = 'h-11 w-auto', showText = true }: BrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-3 select-none group">
      {/* Brand-New Open Aerodynamic Brushed-Chrome & Racing-Crimson ZR Vector Mark */}
      <svg
        viewBox="0 0 118 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="zrChrome" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="48%" stopColor="#E2E8F0" />
            <stop offset="72%" stopColor="#9BA5B4" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="zrRedArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9E0613" />
            <stop offset="38%" stopColor="#E11122" />
            <stop offset="56%" stopColor="#FF3B4B" />
            <stop offset="100%" stopColor="#9E0613" />
          </linearGradient>
          <filter id="zrShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.6" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        <g filter="url(#zrShadow)">
          {/* Slanted Aerodynamic Blade Z */}
          <path
            d="M17 8 H58 L54.5 14.2 L29.5 34.5 H51.5 L48.8 40.5 H10.5 L14 34.2 L39.2 14 H14.2 L17 8 Z"
            fill="url(#zrChrome)"
          />
          {/* Subtle blade notch accent on Z */}
          <path d="M23 21.5 H38 L35.5 24.5 H20.5 L23 21.5 Z" fill="#FFFFFF" fillOpacity="0.9" />

          {/* Interlocking Slanted Aerodynamic R */}
          <path
            d="M65.5 8 H92.5 C102.5 8 107.2 12.6 105.6 19.6 C104.3 25.1 99.6 28.5 92.2 29.4 L103 40.5 H91.6 L82.2 30.1 H71.5 L67.6 40.5 H58.2 L65.5 8 Z M73.2 24 H88.6 C93.2 24 95.8 22.1 96.5 19.1 C97.1 16.3 95 14.3 90.4 14.3 H75.6 L73.2 24 Z"
            fill="url(#zrChrome)"
          />

          {/* Signature Tapered Racing-Crimson Swoosh Arc Underneath */}
          <path
            d="M12 52.5 C34 43.2 78 41.8 106 49.5 C80 46.2 38 47.4 12 52.5 Z"
            fill="url(#zrRedArc)"
          />

          {/* Subtle Chrome </> Accent */}
          <path
            d="M52.5 49.5 L49.2 52.2 L52.5 54.9 M63.5 49.5 L66.8 52.2 L63.5 54.9 M59.6 48.3 L56.4 56"
            stroke="#F1F5F9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>

      {showText && (
        <span className="hidden sm:flex flex-col leading-none text-left border-l border-white/15 pl-3">
          <span className="font-condensed text-[15px] font-bold tracking-[0.1em] uppercase text-white">
            Zlatin Raykov
          </span>
          <span className="mt-0.5 font-mono-code text-[9px] tracking-[0.22em] uppercase text-[#8b92a0]">
            Web Dev
          </span>
        </span>
      )}
    </span>
  )
}
