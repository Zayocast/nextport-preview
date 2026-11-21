import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  CalendarCheck,
  Check,
  Clock,
  Database,
  Gauge,
  Globe,
  Layers,
  RotateCcw,
} from 'lucide-react'
import { useState } from 'react'
import type { Lang } from '../data/portfolioData'

interface ProjectConfiguratorProps {
  lang: Lang
  onSendBrief: (prefilledMessage: string) => void
}

type ProjectTypeId = 'website' | 'booking' | 'system' | 'redesign'

interface ProjectTypeOption {
  id: ProjectTypeId
  icon: typeof Globe
  label: Record<Lang, string>
  desc: Record<Lang, string>
  baseDaysMin: number
  baseDaysMax: number
  baseStack: string[]
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'website',
    icon: Globe,
    label: { bg: 'Фирмен уебсайт', en: 'Company Website' },
    desc: { bg: 'Представителен сайт, услуги и запитвания', en: 'Showcase site, services & leads' },
    baseDaysMin: 4,
    baseDaysMax: 6,
    baseStack: ['TypeScript', 'React', 'Tailwind CSS'],
  },
  {
    id: 'redesign',
    icon: Gauge,
    label: { bg: 'Редизайн и скорост', en: 'Redesign & Speed' },
    desc: { bg: 'Модерна визия, мобилна версия и SEO', en: 'Modern UI, mobile UX & SEO' },
    baseDaysMin: 3,
    baseDaysMax: 5,
    baseStack: ['TypeScript', 'React', 'Tailwind CSS'],
  },
  {
    id: 'booking',
    icon: CalendarCheck,
    label: { bg: 'Сайт с резервации', en: 'Booking Platform' },
    desc: { bg: 'Онлайн записване на часове и график', en: 'Online slot booking & schedule' },
    baseDaysMin: 6,
    baseDaysMax: 9,
    baseStack: ['PHP', 'MySQL', 'JavaScript'],
  },
  {
    id: 'system',
    icon: Database,
    label: { bg: 'Бизнес система / Портал', en: 'Business Portal' },
    desc: { bg: 'Клиенти, поръчки, справки и документи', en: 'Clients, orders, reports & docs' },
    baseDaysMin: 8,
    baseDaysMax: 14,
    baseStack: ['TypeScript', 'React', 'PHP', 'MySQL'],
  },
]

interface FeatureAddon {
  id: string
  label: Record<Lang, string>
  extraDays: number
  addsTech?: string
}

const ADDONS: FeatureAddon[] = [
  { id: 'admin', label: { bg: 'Админ панел', en: 'Admin Panel' }, extraDays: 2, addsTech: 'PHP' },
  { id: 'db', label: { bg: 'База данни (MySQL)', en: 'MySQL Database' }, extraDays: 1, addsTech: 'MySQL' },
  { id: 'email', label: { bg: 'Имейл известия', en: 'Email Alerts' }, extraDays: 1, addsTech: 'REST API' },
  { id: 'seo', label: { bg: 'Техническо SEO', en: 'Technical SEO' }, extraDays: 1 },
  { id: 'theme', label: { bg: 'Dark / Light режим', en: 'Dark / Light Mode' }, extraDays: 1 },
  { id: 'i18n', label: { bg: 'BG / EN езици', en: 'Multi-Language' }, extraDays: 1 },
]

export function ProjectConfigurator({ lang, onSendBrief }: ProjectConfiguratorProps) {
  const [selectedType, setSelectedType] = useState<ProjectTypeId>('website')
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo'])

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) ?? PROJECT_TYPES[0]

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const extraDays = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id)
    return sum + (addon?.extraDays ?? 0)
  }, 0)

  const minDays = currentType.baseDaysMin + Math.floor(extraDays * 0.7)
  const maxDays = currentType.baseDaysMax + extraDays

  const avgDays = Math.round((minDays + maxDays) / 2)
  const designDays = Math.max(1, Math.round(avgDays * 0.25))
  const launchDays = avgDays >= 10 ? 2 : 1
  const buildDays = Math.max(2, avgDays - designDays - launchDays)

  const scopePct = Math.min(100, Math.round((maxDays / 20) * 100))
  const scopeLabel =
    maxDays <= 7
      ? lang === 'bg'
        ? 'Бърз старт'
        : 'Fast Track'
      : maxDays <= 13
        ? lang === 'bg'
          ? 'Бизнес стандарт'
          : 'Business Standard'
        : lang === 'bg'
          ? 'Пълна система'
          : 'Full Custom System'

  const recommendedStack = Array.from(
    new Set([
      ...currentType.baseStack,
      ...selectedAddons
        .map((id) => ADDONS.find((a) => a.id === id)?.addsTech)
        .filter((v): v is string => Boolean(v)),
    ]),
  )

  const handleUseConfiguration = () => {
    const chosenAddonNames = selectedAddons
      .map((id) => ADDONS.find((a) => a.id === id)?.label[lang])
      .filter(Boolean)

    const brief =
      lang === 'bg'
        ? `Здравей, Златин! Интересувам се от: ${currentType.label.bg}.\nИзбрани модули: ${
            chosenAddonNames.length > 0 ? chosenAddonNames.join(', ') : 'Стандартни'
          }.\nПодходящ стек: ${recommendedStack.join(', ')}.\nОриентировъчен срок: ${minDays}-${maxDays} дни.`
        : `Hi Zlatin! I am interested in: ${currentType.label.en}.\nSelected modules: ${
            chosenAddonNames.length > 0 ? chosenAddonNames.join(', ') : 'Standard'
          }.\nRecommended stack: ${recommendedStack.join(', ')}.\nEstimated timeline: ${minDays}-${maxDays} days.`

    onSendBrief(brief)
  }

  return (
    <section
      id="configurator"
      className="relative border-t border-white/8 bg-[#07080a] py-20 sm:py-28 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Strictly Centered Header */}
        <div className="reveal-heading mx-auto max-w-2xl text-center mb-12 sm:mb-14">
          <p className="font-mono-code text-xs uppercase tracking-[0.24em] text-[#98a0ad]">
            {lang === 'bg' ? 'Планиране' : 'Project Planner'}
          </p>
          <h2 className="mt-2.5 font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.12]">
            {lang === 'bg' ? 'Сглоби своя проект' : 'Configure Your Project'}
            <span className="text-[#e11d2e]">.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#98a0ad] leading-relaxed">
            {lang === 'bg'
              ? 'Избери вида проект и нужните функции, за да видиш реалния срок в дни и да изпратиш готово запитване.'
              : 'Pick your project type and modules to see a realistic day-by-day estimate and prefill your inquiry.'}
          </p>
        </div>

        {/* Clean 2-Column Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left 7 Cols: Interactive Selections */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0b0d12] p-6 sm:p-8 space-y-7">
            <div>
              <div className="text-xs font-mono-code uppercase tracking-[0.18em] text-[#98a0ad] mb-3.5">
                {lang === 'bg' ? '1. Вид проект' : '1. Project Type'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const active = selectedType === type.id
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`cursor-pointer rounded-xl border p-4 text-left transition ${
                        active
                          ? 'border-[#e11d2e] bg-[#e11d2e]/10 text-white'
                          : 'border-white/10 bg-[#07080a] text-slate-300 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
                          <Icon className={`h-4 w-4 ${active ? 'text-[#e11d2e]' : 'text-[#8d95a4]'}`} />
                          <span>{type.label[lang]}</span>
                        </span>
                        <span className="font-mono-code text-[11px] text-[#8d95a4]">
                          {type.baseDaysMin}-{type.baseDaysMax}д
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-[#8d95a4]">{type.desc[lang]}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="text-xs font-mono-code uppercase tracking-[0.18em] text-[#98a0ad]">
                  {lang === 'bg' ? '2. Допълнителни модули' : '2. Optional Modules'}
                </span>
                {selectedAddons.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedAddons([])}
                    className="cursor-pointer inline-flex items-center gap-1 text-[11px] font-mono-code text-[#8d95a4] hover:text-white transition"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>{lang === 'bg' ? 'Изчисти' : 'Reset'}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ADDONS.map((addon) => {
                  const active = selectedAddons.includes(addon.id)
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer flex items-center justify-between gap-2 rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm font-medium transition ${
                        active
                          ? 'border-white/40 bg-white/[0.08] text-white'
                          : 'border-white/9 bg-[#07080a] text-[#98a0ad] hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span>{addon.label[lang]}</span>
                      <span className="inline-flex items-center gap-2 shrink-0">
                        <span className="font-mono-code text-[10px] text-[#7c8492]">
                          +{addon.extraDays}{lang === 'bg' ? 'д' : 'd'}
                        </span>
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded border ${
                            active ? 'border-[#e11d2e] bg-[#e11d2e] text-white' : 'border-white/20'
                          }`}
                        >
                          {active && <Check className="h-3 w-3" />}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Live Interactive Blueprint Card */}
          <div className="lg:col-span-5 rounded-2xl border border-white/12 bg-[#0b0d12] p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-code text-[11px] uppercase tracking-[0.18em] text-[#98a0ad]">
                    {lang === 'bg' ? 'Обхват' : 'Scope'}
                  </span>
                  <span className="font-mono-code text-xs font-semibold text-[#e11d2e]">
                    {scopeLabel}
                  </span>
                </div>
                <div className="mt-1.5 font-condensed text-3xl font-bold uppercase text-white leading-[1.12]">
                  {currentType.label[lang]}
                </div>
                {/* Animated Scope Bar */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                  <motion.div
                    animate={{ width: `${scopePct}%` }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    className="h-full rounded-full bg-[#e11d2e]"
                  />
                </div>
              </div>

              {/* Fast Realistic Timeline in Days */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#07080a] text-[#e11d2e]">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono-code uppercase tracking-wider text-[#8d95a4]">
                    {lang === 'bg' ? 'Ориентировъчен срок' : 'Estimated Delivery'}
                  </div>
                  <div className="mt-0.5 font-condensed text-3xl font-bold text-white leading-tight">
                    {minDays} - {maxDays} {lang === 'bg' ? 'дни' : 'days'}
                  </div>
                  {/* 3-phase breakdown */}
                  <div className="mt-2.5 grid grid-cols-3 gap-2 text-center font-mono-code text-[10px]">
                    <div className="rounded-md border border-white/8 bg-[#07080a] py-1.5 px-1">
                      <div className="text-white font-semibold">{designDays}{lang === 'bg' ? 'д' : 'd'}</div>
                      <div className="text-[#7c8492]">{lang === 'bg' ? 'Дизайн' : 'Design'}</div>
                    </div>
                    <div className="rounded-md border border-white/8 bg-[#07080a] py-1.5 px-1">
                      <div className="text-white font-semibold">{buildDays}{lang === 'bg' ? 'д' : 'd'}</div>
                      <div className="text-[#7c8492]">{lang === 'bg' ? 'Код' : 'Build'}</div>
                    </div>
                    <div className="rounded-md border border-white/8 bg-[#07080a] py-1.5 px-1">
                      <div className="text-white font-semibold">{launchDays}{lang === 'bg' ? 'д' : 'd'}</div>
                      <div className="text-[#7c8492]">{lang === 'bg' ? 'Тест' : 'Launch'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Stack */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#07080a] text-white">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-mono-code uppercase tracking-wider text-[#8d95a4]">
                    {lang === 'bg' ? 'Подходящи технологии' : 'Recommended Stack'}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-2.5 gap-y-1 text-xs font-mono-code text-slate-200">
                    {recommendedStack.map((tech, idx) => (
                      <span key={tech} className="inline-flex items-center gap-2.5">
                        <span>{tech}</span>
                        {idx < recommendedStack.length - 1 && (
                          <span className="text-white/25">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleUseConfiguration}
              className="cursor-pointer w-full btn-solid-crimson inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider"
            >
              <span>
                {lang === 'bg' ? 'Изпрати тази конфигурация' : 'Send This Configuration'}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
