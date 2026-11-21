import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Lang } from '../data/portfolioData'

interface FaqSectionProps {
  lang: Lang
}

const FAQ_ITEMS = [
  {
    q: { bg: 'Колко време отнема изработката на сайт или система?', en: 'How long does it take to build a website or system?' },
    a: {
      bg: 'Представителен фирмен сайт или редизайн обикновено е готов за 3 до 6 дни. По-сложни платформи с онлайн резервации, админ панел или клиентски портал отнемат между 7 и 14 дни според конкретните модули.',
      en: 'A company website or redesign typically takes 3 to 6 days. Platforms with online booking, admin dashboards, or client portals take 7 to 14 days depending on scope.',
    },
  },
  {
    q: { bg: 'Ще изглежда и работи ли сайтът добре на телефон?', en: 'Will the site look and work well on mobile?' },
    a: {
      bg: 'Да - всеки проект се тества и оптимизира първо за мобилни екрани, с бързо зареждане през мобилни данни, удобни бутони и чиста подредба без хоризонтално разтягане.',
      en: 'Yes - every build is tested and tuned mobile-first, with fast loading over cellular networks, thumb-friendly controls, and zero horizontal overflow.',
    },
  },
  {
    q: { bg: 'Мога ли сам да обновявам цени, услуги или заявки?', en: 'Can I update prices, services, or requests myself?' },
    a: {
      bg: 'Да. При нужда изграждам изчистен административен панел (с PHP и MySQL), от който управляваш услуги, резервации, запитвания и справки без да пишеш код.',
      en: 'Yes. When needed, I build a clean admin panel (PHP & MySQL) so you can manage services, bookings, client requests, and exports without touching code.',
    },
  },
  {
    q: { bg: 'Помагаш ли с домейн, хостинг и SSL сертификат?', en: 'Do you help with domain, hosting, and SSL setup?' },
    a: {
      bg: 'Да - поемам цялата техническа част по качването в cPanel или модерен хостинг, настройката на домейна, HTTPS сертификата и бизнес имейлите.',
      en: 'Yes - I handle full deployment to cPanel or modern hosting, domain DNS configuration, HTTPS certificates, and email routing.',
    },
  },
  {
    q: { bg: 'Как използваш AI в работата си?', en: 'How do you use AI in your workflow?' },
    a: {
      bg: 'Ползвам AI инструменти като помощник за по-бързо проучване, debugging и проверка на детайли. Архитектурата, дизайнът, логиката и контролът върху крайния код са изцяло мои.',
      en: 'I use AI strictly as an engineering assistant for faster research, debugging, and checks. Architecture, design decisions, and final code quality stay 100% under my control.',
    },
  },
]

export function FaqSection({ lang }: FaqSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative border-t border-white/8 bg-[#07080a] py-20 sm:py-28 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-4xl">
        {/* Strictly Centered Header */}
        <div className="reveal-heading mx-auto max-w-2xl text-center mb-12">
          <p className="font-mono-code text-xs uppercase tracking-[0.24em] text-[#98a0ad]">
            {lang === 'bg' ? 'Въпроси' : 'FAQ'}
          </p>
          <h2 className="mt-2.5 font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.12]">
            {lang === 'bg' ? 'Често задавани въпроси' : 'Frequently Asked Questions'}
            <span className="text-[#e11d2e]">.</span>
          </h2>
        </div>

        <div className="border-t border-white/10">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={item.q.en} className="editorial-row">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="cursor-pointer w-full flex items-center justify-between gap-4 py-5 px-2 text-left"
                >
                  <span className="text-sm sm:text-base font-semibold text-white">
                    {item.q[lang]}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#8d95a4] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#e11d2e]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-2 pb-5 text-sm text-[#98a0ad] leading-relaxed">
                        {item.a[lang]}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
