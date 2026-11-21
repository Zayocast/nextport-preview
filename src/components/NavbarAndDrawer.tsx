import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Globe, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PROFILE_CONFIG, type Lang } from '../data/portfolioData'
import { BrandLogo } from './BrandLogo'

interface NavbarAndDrawerProps {
  lang: Lang
  onToggleLang: () => void
  reducedMotion: boolean
  onToggleMotion: () => void
  activeSection: string
  onNavigate: (id: string) => void
  onOpenContact: () => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}

const NAV_ITEMS: { id: string; label: Record<Lang, string> }[] = [
  { id: 'hero', label: { bg: 'НАЧАЛО', en: 'HOME' } },
  { id: 'services', label: { bg: 'УСЛУГИ', en: 'SERVICES' } },
  { id: 'process', label: { bg: 'ПРОЦЕС', en: 'PROCESS' } },
  { id: 'projects', label: { bg: 'ПРОЕКТИ', en: 'PROJECTS' } },
  { id: 'configurator', label: { bg: 'КОНФИГУРАТОР', en: 'CONFIGURATOR' } },
  { id: 'stack', label: { bg: 'ТЕХНОЛОГИИ', en: 'TECH STACK' } },
  { id: 'faq', label: { bg: 'ВЪПРОСИ', en: 'FAQ' } },
  { id: 'footer', label: { bg: 'КОНТАКТ', en: 'CONTACT' } },
]

const TOP_BAR_LINKS: { id: string; label: Record<Lang, string> }[] = [
  { id: 'services', label: { bg: 'Услуги', en: 'Services' } },
  { id: 'projects', label: { bg: 'Проекти', en: 'Projects' } },
  { id: 'configurator', label: { bg: 'Конфигуратор', en: 'Estimator' } },
  { id: 'stack', label: { bg: 'Технологии', en: 'Stack' } },
  { id: 'faq', label: { bg: 'Въпроси', en: 'FAQ' } },
]

export function NavbarAndDrawer({
  lang,
  onToggleLang,
  reducedMotion,
  onToggleMotion,
  activeSection,
  onNavigate,
  onOpenContact,
  drawerOpen,
  setDrawerOpen,
}: NavbarAndDrawerProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (id: string) => {
    setDrawerOpen(false)
    onNavigate(id)
  }

  return (
    <>
      {/* Open Full-Width Top Navigation - NO pill wrapper around header */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#07080a]/85 backdrop-blur-xl border-b border-white/8 py-3'
            : 'bg-transparent border-b border-transparent py-4 sm:py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left: New Open Aerodynamic Brushed-Chrome ZR Brand Logo */}
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            aria-label="Начало"
            className="cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
          >
            <BrandLogo className="h-10 sm:h-11 w-auto" showText />
          </button>

          {/* Center (Desktop): Clean Direct Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {TOP_BAR_LINKS.map((link) => {
              const active = activeSection === link.id
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`cursor-pointer relative px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                    active ? 'text-white' : 'text-[#9aa3b2] hover:text-white'
                  }`}
                >
                  <span>{link.label[lang]}</span>
                  {active && (
                    <motion.span
                      layoutId="topNavUnderline"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#e11d2e]"
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Controls: Direct Contact (Desktop) + Language + Fullscreen Menu */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenContact}
              className="hidden md:inline-flex cursor-pointer btn-solid-crimson items-center gap-1.5 rounded-lg px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em]"
            >
              <span>{lang === 'bg' ? 'Пиши ми' : 'Contact'}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={onToggleLang}
              aria-label="Toggle language"
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-white/14 bg-black/35 px-3 py-2 text-xs font-semibold tracking-wider text-slate-200 transition hover:border-white/35 hover:text-white"
            >
              <Globe className="h-3.5 w-3.5 text-[#98a0ad]" />
              <span>{lang.toUpperCase()}</span>
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              className="cursor-pointer relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/16 bg-black/40 text-white transition hover:border-[#e11d2e] active:scale-95"
            >
              {drawerOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <div className="flex flex-col gap-1.5 w-4">
                  <span className="h-[2px] w-full bg-white" />
                  <span className="h-[2px] w-3/4 ml-auto bg-[#e11d2e]" />
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 50/50 Split Full-Screen Architectural Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.05 : 0.24 }}
            className="fixed inset-0 z-50 flex flex-col lg:flex-row bg-[#07080a]/98 backdrop-blur-2xl overflow-y-auto overscroll-contain"
          >
            {/* Left Half (Desktop) */}
            <motion.div
              initial={reducedMotion ? false : { x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reducedMotion ? undefined : { x: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex lg:w-[46%] flex-col justify-between p-12 xl:p-16 bg-[#0b0d11] border-r border-white/8"
            >
              <div>
                <img
                  src={PROFILE_CONFIG.signatureSrc}
                  alt="Подпис на Златин Райков"
                  className="h-24 xl:h-28 w-auto object-contain select-none"
                />
                <p className="mt-6 max-w-sm text-sm text-[#98a0ad] leading-relaxed">
                  {lang === 'bg'
                    ? 'Самостоятелен уеб разработчик с фокус върху TypeScript, React и PHP. Създавам бързи сайтове и бизнес системи с внимание към всеки детайл.'
                    : 'Independent web developer focused on TypeScript, React, and PHP. Building fast websites and practical business systems with sharp attention to craft.'}
                </p>
              </div>

              <div className="my-auto py-8 border-y border-white/8 space-y-3">
                <div className="font-mono-code text-[11px] uppercase tracking-[0.2em] text-[#6d7482]">
                  {lang === 'bg' ? 'Живи клиентски сайтове' : 'Live Client Websites'}
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { name: 'sistavto.com', role: lang === 'bg' ? 'Автосервиз & портал' : 'Automotive portal', href: 'https://sistavto.com' },
                    { name: 'toplina93.com', role: lang === 'bg' ? 'Отоплителни горива & PHP заявки' : 'Heating fuels & PHP quotes', href: 'https://toplina93.com' },
                    { name: 'ivasalon.com', role: lang === 'bg' ? 'Онлайн резервации за салон' : 'Salon booking engine', href: 'https://ivasalon.com' },
                  ].map((site) => (
                    <a
                      key={site.name}
                      href={site.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between py-1 text-sm text-slate-300 hover:text-white transition"
                    >
                      <span>
                        <span className="font-semibold text-white group-hover:text-[#e11d2e] transition">
                          {site.name}
                        </span>
                        <span className="ml-2.5 text-xs text-[#7d8594]">- {site.role}</span>
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 text-[#6d7482] group-hover:text-white transition" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-mono-code uppercase tracking-wider text-[#6d7482]">
                    {lang === 'bg' ? 'Директен имейл' : 'Direct Email'}
                  </div>
                  <a
                    href={`mailto:${PROFILE_CONFIG.email}`}
                    className="mt-1 block text-sm font-medium text-white hover:text-[#e11d2e] transition"
                  >
                    {PROFILE_CONFIG.email}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false)
                    onOpenContact()
                  }}
                  className="cursor-pointer btn-solid-crimson inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  <span>{lang === 'bg' ? 'Пиши ми' : 'Contact'}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* Right Half (and Mobile Fullscreen View) */}
            <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 pt-20 lg:pt-14">
              <div className="absolute top-4 right-4 sm:top-6 sm:right-8">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation"
                  className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] text-white transition hover:border-[#e11d2e]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Centered Signature on Mobile Drawer */}
              <div className="flex justify-center lg:hidden mb-8">
                <img
                  src={PROFILE_CONFIG.signatureSrc}
                  alt="Златин Райков"
                  className="h-14 w-auto object-contain"
                />
              </div>

              <nav className="my-auto flex flex-col">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      initial={reducedMotion ? false : { x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: reducedMotion ? 0 : 0.035 * idx, duration: 0.25 }}
                      onClick={() => handleLinkClick(item.id)}
                      className={`cursor-pointer group flex items-center justify-between py-3.5 sm:py-4 text-left border-b border-white/8 transition ${
                        isActive ? 'text-[#e11d2e]' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      <span className="font-condensed text-3xl sm:text-5xl font-bold tracking-tight uppercase leading-[1.1] transition-transform duration-200 group-hover:translate-x-2">
                        {item.label[lang]}
                      </span>
                      <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 opacity-40 transition-all group-hover:opacity-100 group-hover:text-[#e11d2e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                  )
                })}

                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false)
                    onOpenContact()
                  }}
                  className="lg:hidden mt-6 cursor-pointer btn-solid-crimson inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-bold uppercase tracking-wider"
                >
                  <span>{lang === 'bg' ? 'Свържи се с мен' : 'Contact Me'}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </nav>

              <div className="mt-10 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#98a0ad]">
                <button
                  type="button"
                  onClick={onToggleLang}
                  className="cursor-pointer inline-flex items-center gap-2 hover:text-white transition"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>{lang === 'bg' ? 'Език: Български' : 'Language: English'}</span>
                </button>

                <button
                  type="button"
                  onClick={onToggleMotion}
                  className="cursor-pointer inline-flex items-center gap-2 hover:text-white transition"
                >
                  <span>
                    {lang === 'bg' ? 'Анимации:' : 'Motion:'}{' '}
                    <strong className="text-white">
                      {reducedMotion ? (lang === 'bg' ? 'Намалени' : 'Reduced') : 'ON'}
                    </strong>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
