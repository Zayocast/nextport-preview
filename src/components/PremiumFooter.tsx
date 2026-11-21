import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Check, ChevronDown, Copy, Mail, Send, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { PROFILE_CONFIG, type Lang } from '../data/portfolioData'

interface PremiumFooterProps {
  lang: Lang
  reducedMotion: boolean
  formOpen: boolean
  setFormOpen: (open: boolean) => void
  prefillMessage: string
  onNavigate: (id: string) => void
}

export function PremiumFooter({
  lang,
  reducedMotion,
  formOpen,
  setFormOpen,
  prefillMessage,
  onNavigate,
}: PremiumFooterProps) {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (prefillMessage) {
      setMessage(prefillMessage)
    }
  }, [prefillMessage])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_CONFIG.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // ignore
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    const subject = encodeURIComponent(
      lang === 'bg' ? `Запитване от портфолио - ${name}` : `Portfolio Inquiry - ${name}`,
    )
    const body = encodeURIComponent(`${message}\n\nОт: ${name} (${senderEmail})`)
    window.location.href = `mailto:${PROFILE_CONFIG.email}?subject=${subject}&body=${body}`
    window.setTimeout(() => {
      setSent(false)
      setName('')
      setSenderEmail('')
      setMessage('')
    }, 2600)
  }

  return (
    <footer
      id="footer"
      className="relative border-t border-white/10 bg-[#07080a] pt-20 sm:pt-24 pb-10 px-4 sm:px-8 pb-safe"
    >
      <div className="mx-auto max-w-6xl">
        {/* INLINE EXPANDABLE CONTACT STAGE (No popup modal - smoothly unfolds & hides in-page!) */}
        <div className="rounded-2xl border border-white/12 bg-[#0b0d12] overflow-hidden">
          {/* Header Row */}
          <div className="p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <p className="font-mono-code text-xs uppercase tracking-[0.22em] text-[#98a0ad]">
                {lang === 'bg' ? 'Контакт' : 'Contact'}
              </p>
              <h2 className="mt-2 font-condensed text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.12]">
                {lang === 'bg' ? 'Имаш проект? Пиши ми' : 'Have a project? Let’s talk'}
                <span className="text-[#e11d2e]">.</span>
              </h2>
              <p className="mt-2 max-w-lg mx-auto lg:mx-0 text-sm text-[#98a0ad] leading-relaxed">
                {lang === 'bg'
                  ? 'Отвори формата директно тук или ми пиши направо на имейла.'
                  : 'Expand the form right here or email me directly.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setFormOpen(!formOpen)}
                className="cursor-pointer w-full sm:w-auto btn-solid-crimson inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider"
              >
                <span>
                  {formOpen
                    ? lang === 'bg'
                      ? 'Скрий формата'
                      : 'Hide Form'
                    : lang === 'bg'
                      ? 'Напиши съобщение'
                      : 'Write a Message'}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    formOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <button
                type="button"
                onClick={() => void handleCopyEmail()}
                className="cursor-pointer w-full sm:w-auto btn-outline-clean inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-xs sm:text-sm font-medium bg-[#07080a]"
              >
                <Mail className="h-4 w-4 text-[#e11d2e]" />
                <span>{PROFILE_CONFIG.email}</span>
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[#8b92a0]" />
                )}
              </button>
            </div>
          </div>

          {/* Cinematic Inline Animated Contact Form */}
          <AnimatePresence initial={false}>
            {formOpen && (
              <motion.div
                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-white/10 bg-[#080a0e]"
              >
                <motion.form
                  initial={reducedMotion ? false : { y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reducedMotion ? undefined : { y: 10, opacity: 0 }}
                  transition={{ duration: 0.32, delay: 0.06 }}
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-10 space-y-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs font-mono-code uppercase tracking-[0.18em] text-[#98a0ad]">
                      {lang === 'bg' ? 'Бързо запитване' : 'Quick Inquiry'}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-white/12 px-3 py-1.5 text-xs font-medium text-[#98a0ad] transition hover:border-white/30 hover:text-white"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>{lang === 'bg' ? 'Затвори формата' : 'Dismiss Form'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#98a0ad] mb-1.5">
                        {lang === 'bg' ? 'Твоето име' : 'Your name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === 'bg' ? 'Иван Петров' : 'John Doe'}
                        className="w-full rounded-lg border border-white/12 bg-[#0d1017] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#e11d2e] focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#98a0ad] mb-1.5">
                        {lang === 'bg' ? 'Имейл за връзка' : 'Email address'}
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full rounded-lg border border-white/12 bg-[#0d1017] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#e11d2e] focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#98a0ad] mb-1.5">
                      {lang === 'bg' ? 'Съобщение / Детайли за проекта' : 'Message / Project details'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        lang === 'bg'
                          ? 'Опиши накратко какво искаш да изградим...'
                          : 'Briefly describe what you want to build...'
                      }
                      className="w-full rounded-lg border border-white/12 bg-[#0d1017] px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#e11d2e] focus:outline-none transition resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <button
                      type="submit"
                      className="cursor-pointer btn-solid-white inline-flex items-center gap-2 rounded-lg px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {sent
                          ? lang === 'bg'
                            ? 'Отваряне на имейл клиент...'
                            : 'Opening email client...'
                          : lang === 'bg'
                            ? 'Изпрати съобщението'
                            : 'Send Message'}
                      </span>
                    </button>

                    <span className="text-xs text-[#7c8492]">
                      {lang === 'bg'
                        ? 'Отговарям директно на посочения от теб имейл.'
                        : 'I reply directly to your email address.'}
                    </span>
                  </div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CLEAN, STRUCTURED, SYMMETRICAL FOOTER BASE */}
        <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left 5 Cols: Large Signature + Short Tagline */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <button
              type="button"
              onClick={() => onNavigate('hero')}
              aria-label="Златин Райков"
              className="cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src={PROFILE_CONFIG.signatureSrc}
                alt="Подпис на Златин Райков"
                className="h-18 sm:h-22 md:h-24 w-auto object-contain"
              />
            </button>
            <p className="text-xs text-[#8b92a0] max-w-xs">
              {lang === 'bg'
                ? 'Уеб разработка с TypeScript, React, PHP и MySQL.'
                : 'Web development with TypeScript, React, PHP, and MySQL.'}
            </p>
          </div>

          {/* Center 4 Cols: Clean Navigation + Live Projects */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs text-center md:text-left">
            <div className="space-y-2">
              <div className="font-mono-code uppercase tracking-wider text-[#6d7482]">
                {lang === 'bg' ? 'Секции' : 'Sections'}
              </div>
              <div className="flex flex-col gap-1.5 text-slate-300">
                <button type="button" onClick={() => onNavigate('process')} className="cursor-pointer hover:text-white transition md:text-left">
                  {lang === 'bg' ? 'Процес' : 'Process'}
                </button>
                <button type="button" onClick={() => onNavigate('projects')} className="cursor-pointer hover:text-white transition md:text-left">
                  {lang === 'bg' ? 'Проекти' : 'Projects'}
                </button>
                <button type="button" onClick={() => onNavigate('configurator')} className="cursor-pointer hover:text-white transition md:text-left">
                  {lang === 'bg' ? 'Конфигуратор' : 'Estimator'}
                </button>
                <button type="button" onClick={() => onNavigate('stack')} className="cursor-pointer hover:text-white transition md:text-left">
                  {lang === 'bg' ? 'Технологии' : 'Stack'}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-mono-code uppercase tracking-wider text-[#6d7482]">
                {lang === 'bg' ? 'Проекти' : 'Live Sites'}
              </div>
              <div className="flex flex-col gap-1.5 text-slate-300">
                <a href="https://sistavto.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  sistavto.com
                </a>
                <a href="https://toplina93.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  toplina93.com
                </a>
                <a href="https://ivasalon.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  ivasalon.com
                </a>
                <a href={PROFILE_CONFIG.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition">
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right 3 Cols: Copyright + Back to Top */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center gap-3 text-xs font-mono-code text-[#7c8492]">
            <button
              type="button"
              onClick={() => onNavigate('hero')}
              className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-white/12 px-4 py-2 text-slate-200 transition hover:border-[#e11d2e] hover:text-white"
            >
              <span>{lang === 'bg' ? 'Нагоре' : 'Top'}</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <span>© {new Date().getFullYear()} {PROFILE_CONFIG.fullName[lang]}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
