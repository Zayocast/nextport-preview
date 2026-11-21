import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaqSection } from './components/FaqSection'
import { FloatingTechStage } from './components/FloatingTechStage'
import { KillerHero } from './components/KillerHero'
import { NavbarAndDrawer } from './components/NavbarAndDrawer'
import { PremiumFooter } from './components/PremiumFooter'
import { ProcessTimeline } from './components/ProcessTimeline'
import { ProjectConfigurator } from './components/ProjectConfigurator'
import { ProjectModal } from './components/ProjectModal'
import { ProjectStationCard } from './components/ProjectStationCard'
import { ServicesSection } from './components/ServicesSection'
import { PROJECTS, type Lang, type ProjectItem } from './data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

export function App() {
  const [lang, setLang] = useState<Lang>('bg')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [contactPrefill, setContactPrefill] = useState('')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [activeSection, setActiveSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)

  const lenisRef = useRef<Lenis | null>(null)
  const pageRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) setReducedMotion(true)
  }, [])

  // Smooth Lenis scroll synced with GSAP ticker
  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current?.destroy()
      lenisRef.current = null
      return
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCb)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  // GSAP ScrollTrigger choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.to('.hero-content-depth', {
          yPercent: -10,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.1 },
            {
              yPercent: 8,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        })

        gsap.utils.toArray<HTMLElement>('.reveal-heading').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 86%',
                once: true,
              },
            },
          )
        })
      }

      const sectionIds = [
        'hero',
        'services',
        'process',
        'projects',
        'configurator',
        'stack',
        'faq',
        'footer',
      ]
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [reducedMotion])

  // Top crimson scroll progress beam
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / docHeight)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock background scroll cleanly when drawer or project modal is open
  useEffect(() => {
    const isOverlayOpen = drawerOpen || selectedProject !== null
    if (isOverlayOpen) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      lenisRef.current?.stop()
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      lenisRef.current?.start()
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [drawerOpen, selectedProject])

  // Reliable smooth navigation from top bar, drawer, hero, and footer
  const scrollToElement = useCallback(
    (id: string) => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      lenisRef.current?.start()

      const performScroll = () => {
        const target = document.getElementById(id)
        if (!target) return
        if (lenisRef.current && !reducedMotion) {
          lenisRef.current.start()
          lenisRef.current.scrollTo(target, { offset: -70, duration: 1.05, force: true })
        } else {
          target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
        }
      }

      window.requestAnimationFrame(() => {
        window.setTimeout(performScroll, 45)
      })
    },
    [reducedMotion],
  )

  // Smoothly scroll to inline Contact section & unfold the form in-page
  const openInlineContact = useCallback(
    (prefill = '') => {
      if (prefill) setContactPrefill(prefill)
      setContactFormOpen(true)
      scrollToElement('footer')
    },
    [scrollToElement],
  )

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#07080a] text-[#f5f6f8] selection:bg-[#e11d2e] selection:text-white"
    >
      {/* Razor-thin solid crimson scroll progress line */}
      <div className="fixed top-0 left-0 right-0 z-[55] h-[2px] bg-white/5 pointer-events-none">
        <div
          className="h-full bg-[#e11d2e] transition-[width] duration-75"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

      <div className="film-grain" aria-hidden="true" />

      {/* Open Wrapper-Less Header */}
      <NavbarAndDrawer
        lang={lang}
        onToggleLang={() => setLang((l) => (l === 'bg' ? 'en' : 'bg'))}
        reducedMotion={reducedMotion}
        onToggleMotion={() => setReducedMotion((m) => !m)}
        activeSection={activeSection}
        onNavigate={scrollToElement}
        onOpenContact={() => openInlineContact('')}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />

      {/* BAND 1: SIGNATURE-INSPIRED ASYMMETRIC HERO */}
      <KillerHero
        lang={lang}
        reducedMotion={reducedMotion}
        onExplore={() => scrollToElement('projects')}
        onContact={() => openInlineContact('')}
      />

      {/* BAND 2: SERVICES - WHAT I BUILD */}
      <ServicesSection lang={lang} onSelectService={(brief) => openInlineContact(brief)} />

      {/* BAND 3: 4-STEP ENGINEERING PROCESS */}
      <ProcessTimeline lang={lang} reducedMotion={reducedMotion} />

      {/* BAND 4: SELECTED PRODUCTION PROJECTS */}
      <section
        id="projects"
        className="relative border-t border-white/8 bg-[#07080a] py-20 sm:py-28 px-4 sm:px-8"
      >
        <div className="mx-auto max-w-5xl">
          <div className="reveal-heading mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <p className="font-mono-code text-xs uppercase tracking-[0.24em] text-[#98a0ad]">
              {lang === 'bg' ? 'Избрани проекти' : 'Selected Work'}
            </p>
            <h2 className="mt-2.5 font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.12]">
              {lang === 'bg' ? 'Реални системи в продукция' : 'Live Systems in Production'}
              <span className="text-[#e11d2e]">.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#98a0ad] leading-relaxed">
              {lang === 'bg'
                ? 'Клиентски сайтове, портали и бизнес приложения, които работят ежедневно.'
                : 'Client websites, booking portals, and business apps serving real users daily.'}
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {PROJECTS.map((project, idx) => (
              <ProjectStationCard
                key={project.id}
                project={project}
                index={idx}
                lang={lang}
                reducedMotion={reducedMotion}
                onInspect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BAND 5: FAST-TIMELINE INTERACTIVE PROJECT CONFIGURATOR */}
      <ProjectConfigurator
        lang={lang}
        onSendBrief={(brief) => openInlineContact(brief)}
      />

      {/* BAND 6: 26-ITEM INTERACTIVE PHYSICS ARENA (22 TECH SVGS + 4 LIVE PROJECTS) */}
      <FloatingTechStage
        lang={lang}
        reducedMotion={reducedMotion}
        onInspectProject={(p) => setSelectedProject(p)}
      />

      {/* BAND 7: PRACTICAL CLIENT FAQ */}
      <FaqSection lang={lang} />

      {/* BAND 8: INLINE EXPANDABLE CONTACT FORM & ARCHITECTURAL FOOTER */}
      <PremiumFooter
        lang={lang}
        reducedMotion={reducedMotion}
        formOpen={contactFormOpen}
        setFormOpen={setContactFormOpen}
        prefillMessage={contactPrefill}
        onNavigate={scrollToElement}
      />

      {/* Project Details & Vodazamen Interactive Demo Modal */}
      <ProjectModal
        project={selectedProject}
        lang={lang}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => openInlineContact('')}
      />
    </div>
  )
}

export default App
