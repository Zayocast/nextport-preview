import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Clock, Layers } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Lang } from '../data/portfolioData'

interface KillerHeroProps {
  lang: Lang
  reducedMotion: boolean
  onExplore: () => void
  onContact: () => void
}

const CYCLING_ROLES: Record<Lang, string[]> = {
  bg: [
    'TypeScript & React интерфейси',
    'Реални клиентски PHP & MySQL системи',
    'Модерен, бърз и мобилно оптимизиран уеб',
  ],
  en: [
    'TypeScript & React interfaces',
    'Production PHP & MySQL client systems',
    'Fast, modern, mobile-first web experiences',
  ],
}

export function KillerHero({ lang, reducedMotion, onExplore, onContact }: KillerHeroProps) {
  const [roleIdx, setRoleIdx] = useState(0)

  const firstName = lang === 'bg' ? 'Златин' : 'Zlatin'
  const lastName = lang === 'bg' ? 'Райков' : 'Raykov'

  useEffect(() => {
    if (reducedMotion) return
    const timer = window.setInterval(() => {
      setRoleIdx((i) => (i + 1) % CYCLING_ROLES[lang].length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [lang, reducedMotion])

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-24 sm:pt-28 px-4 sm:px-8"
    >
      {/* Clean Uniform Dark Architectural Backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="./images/hero-obsidian.jpg"
          alt=""
          aria-hidden="true"
          className="parallax-img h-full w-full object-cover object-center opacity-44"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,8,10,0.8) 0%, rgba(7,8,10,0.56) 44%, rgba(7,8,10,0.93) 86%, #07080a 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-28"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
      </div>

      {/* Subtle Architectural Corner Crosshair Marks */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute inset-x-8 top-24 bottom-24 z-[2]"
      >
        <span className="absolute top-0 left-0 h-5 w-px bg-white/15" />
        <span className="absolute top-0 left-0 h-px w-5 bg-white/15" />
        <span className="absolute top-0 right-0 h-5 w-px bg-white/15" />
        <span className="absolute top-0 right-0 h-px w-5 bg-white/15" />
        <span className="absolute bottom-0 left-0 h-5 w-px bg-white/15" />
        <span className="absolute bottom-0 left-0 h-px w-5 bg-white/15" />
        <span className="absolute bottom-0 right-0 h-5 w-px bg-white/15" />
        <span className="absolute bottom-0 right-0 h-px w-5 bg-white/15" />
      </div>

      {/* BALANCED 3-ZONE HERO STAGE (Left Architectural Flank | Center Signature Name | Right Architectural Flank) */}
      <div className="hero-content-depth relative z-10 mx-auto my-auto w-full max-w-7xl py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          {/* LEFT FLANK (Desktop): Two Crisp Floating Architectural Proof Cards */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-start"
          >
            <motion.button
              type="button"
              onClick={onExplore}
              animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="cursor-pointer group w-full max-w-[235px] rounded-xl border border-white/10 bg-[#0b0d12]/85 backdrop-blur-md p-4 text-left transition hover:border-[#d90d1e]/60"
            >
              <div className="flex items-center justify-between text-[10px] font-mono-code uppercase tracking-[0.18em] text-[#8d95a4]">
                <span>{lang === 'bg' ? 'В продукция' : 'In Production'}</span>
                <Layers className="h-3.5 w-3.5 text-[#d90d1e]" />
              </div>
              <div className="mt-2 font-condensed text-3xl font-bold text-white leading-none">
                4+ {lang === 'bg' ? 'Системи' : 'Systems'}
              </div>
              <p className="mt-1.5 text-[11px] text-[#98a0ad] leading-relaxed">
                SistAvto · Toplina 93 · Iva Salon · Vodazamen
              </p>
            </motion.button>

            <motion.div
              animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 6.2, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
              className="ml-6 w-full max-w-[225px] rounded-xl border border-white/10 bg-[#0b0d12]/80 backdrop-blur-md p-4 text-left"
            >
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none">
                  <rect width="24" height="24" rx="4" fill="#3178C6" />
                  <text x="12" y="17" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="800" fontFamily="Inter, sans-serif">TS</text>
                </svg>
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none">
                  <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
                  <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" />
                  <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
                  <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
                </svg>
                <span className="font-mono-code text-xs font-semibold text-white">TS & React</span>
              </div>
              <p className="mt-2 text-[11px] text-[#98a0ad] leading-relaxed">
                {lang === 'bg'
                  ? 'Типизирани, бързи и модерни интерфейси с чиста архитектура.'
                  : 'Typed, fast, modern frontends built with clean architecture.'}
              </p>
            </motion.div>
          </motion.div>

          {/* CENTER 6 COLS: Signature Name + Exact Crimson Swoosh & </> + Pitch + CTAs */}
          <div className="lg:col-span-6 flex flex-col items-center text-center">
            {/* Clean Centered Kicker */}
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3.5 text-[11px] sm:text-xs font-mono-code uppercase tracking-[0.28em] text-[#a2aab8] mb-4"
            >
              <span className="h-[1.5px] w-7 sm:w-10 bg-[#d90d1e]" />
              <span>{lang === 'bg' ? 'УЕБ РАЗРАБОТЧИК' : 'WEB DEVELOPER'}</span>
              <span className="h-[1.5px] w-7 sm:w-10 bg-[#d90d1e]" />
            </motion.div>

            {/* Unclipped Solid Chrome-White Italic Name (ZERO background-clip:text clipping bug!) */}
            <div className="relative flex flex-col items-center w-full">
              <h1
                key={`name-${lang}`}
                className="font-display italic font-black tracking-[-0.02em] leading-[1.16] select-none text-[48px] sm:text-[84px] md:text-[98px] xl:text-[112px] text-[#f3f5f8]"
                style={{
                  textShadow:
                    '0 2px 0 rgba(165, 175, 190, 0.32), 0 18px 42px rgba(0, 0, 0, 0.92)',
                }}
              >
                {/* Row 1: Златин / Zlatin - extra horizontal padding + whitespace-nowrap so italic glyphs never clip or wrap */}
                <span className="block whitespace-nowrap px-3 sm:px-5 -translate-x-2 sm:-translate-x-5">
                  {firstName.split('').map((char, i) => (
                    <motion.span
                      key={`fn-${lang}-${i}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.035 * i,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block pr-[0.02em]"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                {/* Row 2: Райков / Raykov - clean gap above Й, whitespace-nowrap so never wraps mid-word */}
                <span className="block whitespace-nowrap px-3 sm:px-5 mt-1.5 sm:mt-2.5 translate-x-2 sm:translate-x-6">
                  {lastName.split('').map((char, i) => (
                    <motion.span
                      key={`ln-${lang}-${i}`}
                      initial={reducedMotion ? false : { opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.52,
                        delay: 0.16 + 0.035 * i,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="inline-block pr-[0.02em]"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* AUTHENTIC SIGNATURE-MATCHED TAPERED CRIMSON SWOOSH + CHROME </> */}
              <div className="mt-2 sm:mt-3 w-full max-w-[320px] sm:max-w-[500px] md:max-w-[560px]">
                <svg
                  viewBox="0 0 720 74"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="sigRedLeft" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FF4252" />
                      <stop offset="42%" stopColor="#DC1020" />
                      <stop offset="100%" stopColor="#7C0510" />
                    </linearGradient>
                    <linearGradient id="sigRedRight" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FF4252" />
                      <stop offset="40%" stopColor="#DC1020" />
                      <stop offset="100%" stopColor="#7A0510" />
                    </linearGradient>
                    <linearGradient id="sigChromeCode" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="55%" stopColor="#DCE3EC" />
                      <stop offset="100%" stopColor="#94A0B0" />
                    </linearGradient>
                    <filter id="sigBevelShadow" x="-8%" y="-15%" width="116%" height="145%">
                      <feDropShadow dx="0" dy="3.5" stdDeviation="2.2" floodColor="#000000" floodOpacity="0.92" />
                    </filter>
                    <clipPath id="revealSwooshLeft">
                      <motion.rect
                        x="0"
                        y="0"
                        height="74"
                        initial={reducedMotion ? { width: 325 } : { width: 0 }}
                        animate={{ width: 325 }}
                        transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </clipPath>
                    <clipPath id="revealSwooshRight">
                      <motion.rect
                        x="400"
                        y="0"
                        height="74"
                        initial={reducedMotion ? { width: 320 } : { width: 0 }}
                        animate={{ width: 320 }}
                        transition={{ duration: 0.78, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </clipPath>
                  </defs>

                  <g filter="url(#sigBevelShadow)">
                    <g clipPath="url(#revealSwooshLeft)">
                      <path
                        d="M 18 52 C 110 31, 205 24, 314 23 C 319 23, 321 26, 320 29 C 319 32, 316 33.5, 311 33.5 C 212 34.5, 118 40, 22 55.5 C 16 56.4, 13 53.3, 18 52 Z"
                        fill="url(#sigRedLeft)"
                        stroke="#1A0205"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M 48 46.5 C 132 32.5, 218 26.5, 312 25.5"
                        stroke="#FF8590"
                        strokeOpacity="0.55"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </g>

                    <motion.g
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.65 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.42, delay: 0.52, type: 'spring', stiffness: 320, damping: 20 }}
                    >
                      <path
                        d="M 353 18 L 333 29.5 L 350 40.5 L 353.5 35.5 L 343.5 29.5 L 356 22.8 Z"
                        fill="url(#sigChromeCode)"
                        stroke="#0A0B0E"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 372.5 11.5 L 356.5 48.5 L 363 48.5 L 379 11.5 Z"
                        fill="url(#sigChromeCode)"
                        stroke="#0A0B0E"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 384 18 L 403.5 29.5 L 386.5 40.5 L 383 35.5 L 393 29.5 L 380.8 22.8 Z"
                        fill="url(#sigChromeCode)"
                        stroke="#0A0B0E"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                    </motion.g>

                    <g clipPath="url(#revealSwooshRight)">
                      <path
                        d="M 412 23.5 C 510 18.5, 628 16, 688 26.5 C 708 30.2, 711 40.5, 695 49.5 C 674 61.5, 636 67, 600 68.5 C 594 68.8, 594 65.5, 600 64 C 632 58.5, 668 51, 681 41.5 C 687.5 36.8, 684 33, 672 31.2 C 618 24.5, 512 28.5, 413 33 C 408 33.2, 407 23.8, 412 23.5 Z"
                        fill="url(#sigRedRight)"
                        stroke="#1A0205"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M 418 26 C 516 21.5, 626 19.5, 684 28.5"
                        stroke="#FF8590"
                        strokeOpacity="0.55"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            {/* Cycling Specialty + Pitch + Single-Line CTAs */}
            <div className="mt-6 sm:mt-7 flex flex-col items-center text-center max-w-xl">
              <div className="h-7 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${lang}-${roleIdx}`}
                    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.32 }}
                    className="text-base sm:text-xl font-semibold text-white"
                  >
                    {CYCLING_ROLES[lang][roleIdx]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.p
                initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.48 }}
                className="mt-3 text-sm sm:text-base text-[#a4acb9] leading-relaxed"
              >
                {lang === 'bg'
                  ? 'Изграждам бързи уеб приложения, клиентски портали и бизнес системи с TypeScript, React и PHP - проектирани да работят безупречно на телефон и десктоп.'
                  : 'Building fast web applications, client portals, and business systems with TypeScript, React, and PHP - crafted to run cleanly on both mobile and desktop.'}
              </motion.p>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.56 }}
                className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
              >
                <button
                  type="button"
                  onClick={onExplore}
                  className="cursor-pointer w-full sm:w-auto btn-solid-white whitespace-nowrap inline-flex items-center justify-center gap-2.5 rounded-lg px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.12em]"
                >
                  <span>{lang === 'bg' ? 'Разгледай проектите' : 'Explore Projects'}</span>
                  <ArrowDown className="h-4 w-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={onContact}
                  className="cursor-pointer w-full sm:w-auto btn-solid-crimson whitespace-nowrap inline-flex items-center justify-center gap-2.5 rounded-lg px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.12em]"
                >
                  <span>{lang === 'bg' ? 'Свържи се с мен' : 'Contact Me'}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* RIGHT FLANK (Desktop): Two Matching Floating Architectural Cards */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-end"
          >
            <motion.button
              type="button"
              onClick={onContact}
              animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 5.8, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
              className="cursor-pointer group mr-5 w-full max-w-[235px] rounded-xl border border-white/10 bg-[#0b0d12]/85 backdrop-blur-md p-4 text-left transition hover:border-[#d90d1e]/60"
            >
              <div className="flex items-center justify-between text-[10px] font-mono-code uppercase tracking-[0.18em] text-[#8d95a4]">
                <span>{lang === 'bg' ? 'Срок на изработка' : 'Delivery Speed'}</span>
                <Clock className="h-3.5 w-3.5 text-[#d90d1e]" />
              </div>
              <div className="mt-2 font-condensed text-3xl font-bold text-white leading-none">
                3 - 14 {lang === 'bg' ? 'дни' : 'days'}
              </div>
              <p className="mt-1.5 text-[11px] text-[#98a0ad] leading-relaxed">
                {lang === 'bg'
                  ? 'От структура и дизайн до качен жив проект.'
                  : 'From structure and UI to live production deploy.'}
              </p>
            </motion.button>

            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 6.4, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-[225px] rounded-xl border border-white/10 bg-[#0b0d12]/80 backdrop-blur-md p-4 text-left"
            >
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none">
                  <ellipse cx="12" cy="12" rx="11" ry="6.8" fill="#4F5B93" />
                  <text x="12" y="14.6" textAnchor="middle" fill="#FFF" fontSize="7.5" fontWeight="800" fontStyle="italic" fontFamily="Inter, sans-serif">php</text>
                </svg>
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none">
                  <ellipse cx="12" cy="6.5" rx="7.5" ry="3" stroke="#60A5FA" strokeWidth="1.5" />
                  <path d="M4.5 6.5v11c0 1.6 3.4 3 7.5 3s7.5-1.4 7.5-3v-11" stroke="#60A5FA" strokeWidth="1.5" />
                </svg>
                <span className="font-mono-code text-xs font-semibold text-white">PHP & MySQL</span>
              </div>
              <p className="mt-2 text-[11px] text-[#98a0ad] leading-relaxed">
                {lang === 'bg'
                  ? 'Портали, онлайн резервации, админ панели и 100% Mobile-First.'
                  : 'Portals, online bookings, admin dashboards & 100% Mobile-First.'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* FULL-WIDTH ARCHITECTURAL HERO FLOOR DOCK */}
      <div className="relative z-10 mx-auto w-full max-w-7xl border-t border-white/10 py-5 sm:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs font-mono-code text-slate-300">
            <span className="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <rect width="24" height="24" rx="4" fill="#3178C6" />
                <text x="12" y="17" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="800" fontFamily="Inter, sans-serif">TS</text>
              </svg>
              <span>TypeScript</span>
            </span>

            <span className="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
                <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" />
                <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
                <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
              </svg>
              <span>React</span>
            </span>

            <span className="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <ellipse cx="12" cy="12" rx="11" ry="6.8" fill="#4F5B93" />
                <text x="12" y="14.6" textAnchor="middle" fill="#FFF" fontSize="7.5" fontWeight="800" fontStyle="italic" fontFamily="Inter, sans-serif">php</text>
              </svg>
              <span>PHP</span>
            </span>

            <span className="inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <ellipse cx="12" cy="6.5" rx="7.5" ry="3" stroke="#60A5FA" strokeWidth="1.5" />
                <path d="M4.5 6.5v11c0 1.6 3.4 3 7.5 3s7.5-1.4 7.5-3v-11" stroke="#60A5FA" strokeWidth="1.5" />
              </svg>
              <span>MySQL</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-8 text-xs font-mono-code text-[#98a0ad]">
            <span>
              <strong className="text-white font-semibold">4+</strong>{' '}
              {lang === 'bg' ? 'Живи системи' : 'Live Systems'}
            </span>
            <span className="h-3.5 w-px bg-white/15" />
            <span>
              <strong className="text-white font-semibold">Mobile-First</strong>{' '}
              {lang === 'bg' ? 'изработка' : 'craft'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
