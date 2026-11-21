import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ExternalLink, Lock, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Lang, ProjectItem } from '../data/portfolioData'
import { VodazamenPreview } from './VodazamenPreview'

interface ProjectModalProps {
  project: ProjectItem | null
  lang: Lang
  onClose: () => void
  onOpenContact: () => void
}

export function ProjectModal({ project, lang, onClose, onOpenContact }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/82 backdrop-blur-lg p-0 sm:p-5 overflow-hidden"
        >
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-t-2xl sm:rounded-2xl border border-white/14 bg-[#0b0d11]"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="cursor-pointer sticky top-4 float-right mr-4 z-30 flex h-9 w-9 items-center justify-center rounded-lg bg-black/75 border border-white/20 text-white transition hover:border-[#e11d2e]"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Top Artwork Banner */}
            <div className="relative -mt-9 h-48 sm:h-60 overflow-hidden">
              <img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-cover object-center"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(11,13,17,0.2) 0%, rgba(11,13,17,0.78) 65%, #0b0d11 100%)',
                }}
              />
              <div className="absolute bottom-4 left-6 right-14">
                <div className="font-mono-code text-xs uppercase tracking-[0.16em]" style={{ color: project.accentHex }}>
                  {project.locationTag[lang]}
                </div>
                <h2 className="mt-1 font-condensed text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white leading-[1.08]">
                  {project.name}
                </h2>
                <p className="mt-0.5 text-xs sm:text-sm text-slate-300">{project.category[lang]}</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {project.description[lang]}
              </p>

              {/* Interactive Sanitized Dashboard Preview for Vodazamen Manager */}
              {project.id === 'vodazamen' && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-sky-300">
                    <Lock className="h-3.5 w-3.5" />
                    <span>
                      {lang === 'bg'
                        ? 'Интерактивна UI симулация (без реални клиентски данни)'
                        : 'Interactive UI Simulation (zero real client data)'}
                    </span>
                  </div>
                  <VodazamenPreview lang={lang} />
                </div>
              )}

              {/* Key Features */}
              <div className="rounded-xl border border-white/8 bg-[#07080a] p-5">
                <div className="text-xs font-mono-code uppercase tracking-[0.16em] text-[#98a0ad] mb-3.5">
                  {lang === 'bg' ? 'Ключови функционалности' : 'Key Implemented Features'}
                </div>
                <ul className="space-y-2.5">
                  {project.highlights[lang].map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-200 leading-relaxed">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 mt-0.5"
                        style={{ color: project.accentHex }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Approach & Stack */}
              <div className="rounded-xl border border-white/8 bg-[#07080a] p-5 space-y-3">
                <div className="text-xs font-mono-code uppercase tracking-[0.16em] text-[#98a0ad]">
                  {lang === 'bg' ? 'Технически подход' : 'Technical Approach'}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{project.architectureNote[lang]}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono-code text-[#98a0ad] pt-1">
                  {project.tech.map((tech, i) => (
                    <span key={tech} className="inline-flex items-center gap-3">
                      <span className="text-white">{tech}</span>
                      {i < project.tech.length - 1 && <span className="text-white/25">/</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-solid-white inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold"
                    >
                      <span>{lang === 'bg' ? 'Отвори живия сайт' : 'Visit Live Website'}</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onOpenContact()
                    }}
                    className="cursor-pointer btn-outline-clean inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium"
                  >
                    <span>
                      {lang === 'bg' ? 'Искам подобна система' : 'Build Something Similar'}
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer text-xs font-medium text-[#98a0ad] hover:text-white transition"
                >
                  {lang === 'bg' ? 'Затвори' : 'Close'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
