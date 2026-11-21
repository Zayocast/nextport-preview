import { AnimatePresence, motion } from 'framer-motion'
import {
  BellRing,
  CheckCircle2,
  FileCheck2,
  FileSpreadsheet,
  Lock,
  Package,
  RefreshCw,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useState } from 'react'

type TabKey = 'orders' | 'automation' | 'docs'

interface VodazamenPreviewProps {
  lang: 'bg' | 'en'
}

const DEMO_ROWS = [
  { id: 'VZ-2041', client: 'Клиент #A-104 (Офис)', items: '12x 19L Галон', status: 'delivered', nextCheck: '24.11' },
  { id: 'VZ-2042', client: 'Клиент #B-219 (Хотел)', items: '24x 19L + Диспенсър', status: 'scheduled', nextCheck: '21.11' },
  { id: 'VZ-2043', client: 'Клиент #C-087 (Фитнес)', items: '8x 19L Галон', status: 'alert', nextCheck: 'Днес' },
  { id: 'VZ-2044', client: 'Клиент #D-312 (Частен)', items: '4x 19L Галон', status: 'delivered', nextCheck: '29.11' },
]

export function VodazamenPreview({ lang }: VodazamenPreviewProps) {
  const [tab, setTab] = useState<TabKey>('orders')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setGenerated(false)
    window.setTimeout(() => {
      setGenerating(false)
      setGenerated(true)
    }, 650)
  }

  return (
    <div className="rounded-2xl border border-cyan-400/25 bg-[#09131f]/90 overflow-hidden shadow-[0_20px_60px_-20px_rgba(56,242,255,0.28)]">
      {/* Top browser/app bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-cyan-300/15 bg-[#0d1c2e]/90">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono-code text-[11px] text-cyan-200/80 tracking-wider uppercase">
            Vodazamen Manager // v2.4
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-200">
          <Lock className="h-3 w-3" />
          {lang === 'bg' ? 'Симулация • Защитени данни' : 'Demo UI • Client Data Redacted'}
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 border-b border-white/5 bg-white/[0.015]">
        {[
          { icon: Users, label: lang === 'bg' ? 'Активни клиенти' : 'Active Clients', val: '184', accent: 'text-cyan-300' },
          { icon: Package, label: lang === 'bg' ? 'Поръчки / мес.' : 'Monthly Orders', val: '612', accent: 'text-emerald-300' },
          { icon: BellRing, label: lang === 'bg' ? 'Авто-известия' : 'Auto Checks', val: '99.4%', accent: 'text-amber-300' },
          { icon: FileSpreadsheet, label: lang === 'bg' ? 'Справки / PDF' : 'Docs & Reports', val: '1,420', accent: 'text-slate-200' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
            <div className="flex items-center justify-between text-white/55 text-[11px]">
              <span>{stat.label}</span>
              <stat.icon className={`h-3.5 w-3.5 ${stat.accent}`} />
            </div>
            <div className={`mt-1 font-display text-lg font-bold ${stat.accent}`}>{stat.val}</div>
          </div>
        ))}
      </div>

      {/* Interactive Tabs */}
      <div className="flex gap-1.5 px-3.5 pt-3 overflow-x-auto">
        {(
          [
            { key: 'orders', label: lang === 'bg' ? 'Клиенти & Поръчки' : 'Clients & Orders' },
            { key: 'automation', label: lang === 'bg' ? 'Авто-проверки' : 'Auto Checks' },
            { key: 'docs', label: lang === 'bg' ? 'Документи & Справки' : 'Docs & Reports' },
          ] as { key: TabKey; label: string }[]
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`cursor-pointer shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              tab === t.key
                ? 'bg-cyan-400/20 text-cyan-200 border border-cyan-400/40'
                : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-3.5 min-h-[210px]">
        <AnimatePresence mode="wait">
          {tab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {DEMO_ROWS.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/7 bg-white/[0.025] px-3 py-2 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono-code text-cyan-300/90 font-medium">{row.id}</span>
                    <span className="text-white/90 font-medium">{row.client}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[11px]">
                    <span className="text-white/60 hidden sm:inline">{row.items}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-medium ${
                        row.status === 'delivered'
                          ? 'bg-emerald-400/15 text-emerald-300'
                          : row.status === 'scheduled'
                            ? 'bg-cyan-400/15 text-cyan-200'
                            : 'bg-amber-400/20 text-amber-200'
                      }`}
                    >
                      {row.status === 'delivered'
                        ? lang === 'bg'
                          ? 'Доставена'
                          : 'Delivered'
                        : row.status === 'scheduled'
                          ? lang === 'bg'
                            ? 'Планирана'
                            : 'Scheduled'
                          : lang === 'bg'
                            ? 'Проверка'
                            : 'Check Due'}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'automation' && (
            <motion.div
              key="automation"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-2.5 text-xs"
            >
              {[
                {
                  title: lang === 'bg' ? 'Автоматичен мониторинг на график за доставки' : 'Automated Delivery Schedule Monitor',
                  desc: lang === 'bg'
                    ? 'Системата маркира клиенти с наближаващ цикъл на зареждане и генерира дневен маршрут.'
                    : 'Flags accounts nearing their refill interval and prepares the daily route.',
                },
                {
                  title: lang === 'bg' ? 'Контрол на наличности и диспенсъри' : 'Inventory & Dispenser Audit Rules',
                  desc: lang === 'bg'
                    ? 'Проследява върнати галони, профилактики и автоматично известява администратора.'
                    : 'Tracks returned containers, sanitization cycles, and alerts admins automatically.',
                },
                {
                  title: lang === 'bg' ? 'Роли, одит лог и защита на клиентски данни' : 'Role-Based Access & Client Data Security',
                  desc: lang === 'bg'
                    ? 'Изолиран достъп с валидирани заявки и пълна проследимост на всяка промяна.'
                    : 'Hardened access control, validated queries, and full change audit trail.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-2.5 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.04] p-3">
                  <ShieldCheck className="h-4 w-4 text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <p className="mt-0.5 text-white/65 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'docs' && (
            <motion.div
              key="docs"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {lang === 'bg' ? 'Модул за автоматични документи' : 'Automated Document Engine'}
                </div>
                <p className="mt-1 text-xs text-white/70 leading-relaxed">
                  {lang === 'bg'
                    ? 'Едно кликване генерира протоколи, месечни отчети по клиент и обобщени справки за експорт.'
                    : 'One-click generation of handover protocols, monthly client summaries, and exportable reports.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-cyan-300 px-4 py-1.5 text-xs font-bold text-[#071421] transition hover:bg-cyan-200"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${generating ? 'animate-spin' : ''}`} />
                  {generating
                    ? lang === 'bg'
                      ? 'Генериране...'
                      : 'Generating...'
                    : lang === 'bg'
                      ? 'Тествай генериране на справка'
                      : 'Simulate Report Export'}
                </button>
                {generated && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <FileCheck2 className="h-3.5 w-3.5" />
                    {lang === 'bg' ? 'Demo_Report_2026.pdf готов (0 реални данни)' : 'Demo_Report_2026.pdf ready (anonymized)'}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
