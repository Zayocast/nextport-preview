import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Lock } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import type { Lang, ProjectItem } from '../data/portfolioData'

interface ProjectStationCardProps {
  project: ProjectItem
  index: number
  lang: Lang
  reducedMotion: boolean
  onInspect: (project: ProjectItem) => void
}

export function ProjectStationCard({
  project,
  lang,
  reducedMotion,
  onInspect,
}: ProjectStationCardProps) {
  const [spot, setSpot] = useState({ x: 50, y: 50, active: false })

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpot({ x, y, active: true })
  }

  return (
    <motion.article
      id={`project-${project.id}`}
      initial={reducedMotion ? false : { opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpot((prev) => ({ ...prev, active: false }))}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d11] transition-colors duration-300 card-sheen"
      style={{
        borderColor: spot.active ? 'rgba(255,255,255,0.24)' : 'rgba(255,255,255,0.09)',
      }}
    >
      {/* Editorial Background Image with subtle zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
        />
        <div className="absolute inset-0" style={{ background: project.cardGradient }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/92 via-[#07080a]/35 to-transparent sm:hidden" />
      </div>

      {/* Subtle hairline left accent on hover */}
      <div
        className="pointer-events-none absolute left-0 top-8 bottom-8 w-[2px] opacity-55 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: project.accentHex }}
      />

      {/* Inner Editorial Content */}
      <div className="relative z-10 flex flex-col justify-between min-h-[330px] sm:min-h-[365px] p-6 sm:p-10 md:p-12">
        {/* Clean Plain Metadata (No pulsing pill badges, no 01/05 counters!) */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-[#98a0ad]">
          <span className="uppercase tracking-[0.16em]" style={{ color: project.accentHex }}>
            {project.displayLogoTop}
          </span>
          <span>{project.locationTag[lang]}</span>
        </div>

        {/* Title & Description with clean Cyrillic line-height */}
        <div className="my-6 sm:my-8 max-w-xl">
          <h3 className="font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08]">
            {project.displayLogoMain}
          </h3>

          <p className="mt-3 text-sm sm:text-[15px] text-slate-200/90 leading-relaxed max-w-md">
            {project.tagline[lang]}
          </p>

          {/* Clean understated inline tech list (not glowing pills) */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono-code text-[#98a0ad]">
            {project.tech.slice(0, 5).map((t, i) => (
              <span key={t} className="inline-flex items-center gap-3">
                <span className="text-slate-300">{t}</span>
                {i < Math.min(project.tech.length, 5) - 1 && (
                  <span className="text-white/25">/</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Clean Action Row */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onInspect(project)}
            className="cursor-pointer btn-solid-white inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs sm:text-sm font-bold"
          >
            <span>
              {project.isPrivate
                ? lang === 'bg'
                  ? 'Интерактивно демо'
                  : 'Interactive Demo'
                : lang === 'bg'
                  ? 'Разгледай детайли'
                  : 'View Details'}
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </button>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-clean inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium bg-black/40 backdrop-blur-sm"
            >
              <span>{project.url.replace('https://', '')}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {project.isPrivate && (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#98a0ad]">
              <Lock className="h-3.5 w-3.5 text-sky-400" />
              {lang === 'bg' ? 'Защитени клиентски данни' : 'Confidential client data'}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
