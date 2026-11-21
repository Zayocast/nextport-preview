import { ArrowUpRight, CalendarCheck, Database, Globe, Gauge } from 'lucide-react'
import type { Lang } from '../data/portfolioData'

interface ServicesSectionProps {
  lang: Lang
  onSelectService: (prefill: string) => void
}

const SERVICES = [
  {
    icon: Globe,
    title: { bg: 'Модерни уебсайтове', en: 'Modern Websites' },
    desc: {
      bg: 'Представителни фирмени сайтове и лендинг страници с TypeScript, React и Tailwind CSS - бързи, чисти и запомнящи се.',
      en: 'Company websites and high-conversion landing pages built with TypeScript, React, and Tailwind CSS.',
    },
    meta: { bg: 'Бързо зареждане · Mobile-First', en: 'Fast Load · Mobile-First' },
    brief: {
      bg: 'Здравей, Златин! Интересувам се от изработка на модерен фирмен уебсайт.',
      en: 'Hi Zlatin! I am interested in a modern company website.',
    },
  },
  {
    icon: CalendarCheck,
    title: { bg: 'Онлайн резервации и заявки', en: 'Bookings & Lead Systems' },
    desc: {
      bg: 'Собствени модули за записване на часове, продуктови каталози и директни заявки като в ivasalon.com и toplina93.com - без месечни комисиони.',
      en: 'Custom appointment booking and quote flows like ivasalon.com and toplina93.com with zero monthly commissions.',
    },
    meta: { bg: 'PHP · MySQL · Имейл известия', en: 'PHP · MySQL · Email Alerts' },
    brief: {
      bg: 'Здравей, Златин! Интересувам се от сайт със система за онлайн резервации / заявки.',
      en: 'Hi Zlatin! I am interested in an online booking or quote platform.',
    },
  },
  {
    icon: Database,
    title: { bg: 'Портали и админ системи', en: 'Portals & Admin Suites' },
    desc: {
      bg: 'Вътрешни бизнес приложения за клиенти, поръчки, фактури, автоматични проверки и справки като SistAvto и Vodazamen Manager.',
      en: 'Internal business platforms for clients, orders, invoices, automated checks, and reports like SistAvto and Vodazamen.',
    },
    meta: { bg: 'Бази данни · Сигурност · Отчети', en: 'Databases · Security · Reports' },
    brief: {
      bg: 'Здравей, Златин! Интересувам се от вътрешна бизнес система / клиентски портал.',
      en: 'Hi Zlatin! I am interested in a custom business system or client portal.',
    },
  },
  {
    icon: Gauge,
    title: { bg: 'Редизайн, скорост и SEO', en: 'Redesign, Speed & SEO' },
    desc: {
      bg: 'Обновяване на стар и бавен сайт в модерна, лека и мобилно оптимизирана платформа, която се класира по-добре в Google.',
      en: 'Transforming dated, slow websites into crisp, mobile-ready platforms engineered for Google visibility.',
    },
    meta: { bg: 'Техническо SEO · Оптимизация', en: 'Technical SEO · Performance' },
    brief: {
      bg: 'Здравей, Златин! Искам редизайн и оптимизация на съществуващ сайт.',
      en: 'Hi Zlatin! I would like to redesign and optimize an existing website.',
    },
  },
]

export function ServicesSection({ lang, onSelectService }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative border-t border-white/8 bg-[#07080a] py-20 sm:py-28 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Strictly Centered Header */}
        <div className="reveal-heading mx-auto max-w-2xl text-center mb-14">
          <p className="font-mono-code text-xs uppercase tracking-[0.24em] text-[#98a0ad]">
            {lang === 'bg' ? 'Услуги' : 'Services'}
          </p>
          <h2 className="mt-2.5 font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.12]">
            {lang === 'bg' ? 'Какво изграждам' : 'What I Build'}
            <span className="text-[#e11d2e]">.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#98a0ad] leading-relaxed">
            {lang === 'bg'
              ? 'Практически решения, съобразени с реалните нужди на бизнеса - от първия екран до базата данни.'
              : 'Practical solutions tailored to real business needs - from the first screen down to the database.'}
          </p>
        </div>

        {/* 2x2 Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((srv) => {
            const Icon = srv.icon
            return (
              <div
                key={srv.title.en}
                className="group rounded-2xl border border-white/10 bg-[#0b0d12] p-6 sm:p-8 flex flex-col justify-between gap-6 transition-colors duration-300 hover:border-white/25"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#07080a] text-[#e11d2e] transition-colors group-hover:border-[#e11d2e]/50">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono-code text-[11px] text-[#7c8492]">
                      {srv.meta[lang]}
                    </span>
                  </div>

                  <h3 className="mt-5 font-condensed text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white leading-[1.12]">
                    {srv.title[lang]}
                  </h3>

                  <p className="mt-2.5 text-sm text-[#98a0ad] leading-relaxed">
                    {srv.desc[lang]}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/8">
                  <button
                    type="button"
                    onClick={() => onSelectService(srv.brief[lang])}
                    className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-200 transition group-hover:text-[#e11d2e]"
                  >
                    <span>{lang === 'bg' ? 'Запитване за тази услуга' : 'Inquire about this'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
