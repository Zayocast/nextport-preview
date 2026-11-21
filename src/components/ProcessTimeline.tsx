import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Compass, Layers, Rocket } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Lang } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

interface ProcessTimelineProps {
  lang: Lang
  reducedMotion: boolean
}

const STEPS = [
  {
    icon: Compass,
    title: { bg: 'Анализ и структура', en: 'Discovery & Structure' },
    desc: {
      bg: 'Изясняваме целите на бизнеса, клиентите и точните функции, без излишни усложнения.',
      en: 'Clarifying business goals, target users, and exact features without unnecessary bloat.',
    },
  },
  {
    icon: Layers,
    title: { bg: 'Дизайн за телефон и десктоп', en: 'Mobile-First Design' },
    desc: {
      bg: 'Изграждам чиста визия, ясна типография и естествено усещане на всеки екран.',
      en: 'Crafting a clean layout, sharp typography, and effortless flow on every screen size.',
    },
  },
  {
    icon: Code2,
    title: { bg: 'Код с TypeScript, React и PHP', en: 'TypeScript, React & PHP Build' },
    desc: {
      bg: 'Пиша подреден код и надеждни бази данни. AI ползвам само за помощ и debugging.',
      en: 'Writing maintainable code and reliable databases. AI is used only for assistance and debugging.',
    },
  },
  {
    icon: Rocket,
    title: { bg: 'Скорост, SEO и пускане', en: 'Speed, SEO & Launch' },
    desc: {
      bg: 'Тествам на реални устройства, настройвам сигурността, хостинга и поддръжката.',
      en: 'Testing across real devices, tuning performance and security, and deploying cleanly.',
    },
  },
]

export function ProcessTimeline({ lang, reducedMotion }: ProcessTimelineProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.process-progress-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 72%',
            end: 'bottom 58%',
            scrub: 0.6,
          },
        },
      )

      gsap.fromTo(
        '.process-card',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, wrapRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      id="process"
      ref={wrapRef}
      className="relative border-t border-white/8 bg-[#090b0f] py-20 sm:py-28 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Strictly Centered Header */}
        <div className="reveal-heading mx-auto max-w-2xl text-center mb-14 sm:mb-16">
          <p className="font-mono-code text-xs uppercase tracking-[0.24em] text-[#98a0ad]">
            {lang === 'bg' ? 'Как работя' : 'Process'}
          </p>
          <h2 className="mt-2.5 font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.12]">
            {lang === 'bg' ? 'Как се ражда един проект' : 'How a Project Comes Together'}
            <span className="text-[#e11d2e]">.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#98a0ad] leading-relaxed">
            {lang === 'bg'
              ? 'Самоук разработчик с практически опит и завършени курсове - работя ясно, последователно и без излишни обещания.'
              : 'Self-taught developer backed by live client work and completed courses - transparent, structured delivery from day one.'}
          </p>
        </div>

        {/* Scroll-Animated Horizontal Progress Track (Desktop) */}
        <div className="hidden lg:block relative mb-8 mx-10 h-[2px] bg-white/10 overflow-hidden">
          <div className="process-progress-fill h-full w-full origin-left bg-[#e11d2e]" />
        </div>

        {/* 4 Clean Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.title.en}
                className="process-card group rounded-2xl border border-white/9 bg-[#0c0e13] p-6 transition-colors duration-300 hover:border-white/25"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#07080a] text-[#e11d2e] transition-colors group-hover:border-[#e11d2e]/50">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-display text-base sm:text-lg font-bold text-white leading-snug">
                  {step.title[lang]}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#98a0ad] leading-relaxed">
                  {step.desc[lang]}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
