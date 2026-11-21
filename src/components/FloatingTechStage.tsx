import { ArrowDownToLine, ArrowUpRight, RotateCcw, Shuffle } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { PROJECTS, type Lang, type ProjectItem } from '../data/portfolioData'

interface PhysicsItem {
  id: string
  name: string
  accent: string
  radius: number
  projectId?: string
  note: Record<Lang, string>
  svg: () => ReactNode
}

const ARENA_ITEMS: PhysicsItem[] = [
  // 4 Real Client Projects right inside the interactive arena!
  {
    id: 'proj-sistavto',
    name: 'SistAvto',
    accent: '#E11D2E',
    radius: 44,
    projectId: 'sistavto',
    note: {
      bg: 'Жив проект (sistavto.com) - система за автосервиз, клиентски портал, фактури и блог.',
      en: 'Live build (sistavto.com) - automotive management system, client portal & invoicing.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M10 38l5-13h34l5 13v10h-6v-4H16v4h-6V38Z" stroke="#E11D2E" strokeWidth="2.8" fill="#E11D2E" fillOpacity="0.18" />
        <circle cx="19" cy="39" r="3" fill="#FFF" />
        <circle cx="45" cy="39" r="3" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'proj-toplina93',
    name: 'Toplina 93',
    accent: '#F59E0B',
    radius: 44,
    projectId: 'toplina93',
    note: {
      bg: 'Жив проект (toplina93.com) - PHP и JS платформа за горива, пелети А1 и директни заявки.',
      en: 'Live build (toplina93.com) - PHP & JS fuels catalog with Class A1 pellets & order pipeline.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M33 10c2 9-7 13-7 22 0 4 3 7 6 7 4 0 7-4 6-10 6 4 10 10 10 17 0 9-7 14-16 14s-16-6-16-15c0-11 9-19 17-35Z" fill="#F59E0B" fillOpacity="0.22" stroke="#F59E0B" strokeWidth="2.6" />
      </svg>
    ),
  },
  {
    id: 'proj-ivasalon',
    name: 'Iva Salon',
    accent: '#D4AF6A',
    radius: 44,
    projectId: 'ivasalon',
    note: {
      bg: 'Жив проект (ivasalon.com) - платформа с онлайн резервации (booking.php), админ панел и Dark/Light режим.',
      en: 'Live build (ivasalon.com) - salon booking engine (booking.php), admin suite & Dark/Light UI.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M18 52V28a14 14 0 0 1 28 0v24" stroke="#D4AF6A" strokeWidth="2.6" fill="#D4AF6A" fillOpacity="0.14" />
        <circle cx="32" cy="28" r="5" stroke="#FFF" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    id: 'proj-vodazamen',
    name: 'Vodazamen',
    accent: '#38BDF8',
    radius: 44,
    projectId: 'vodazamen',
    note: {
      bg: 'Закрита бизнес система - клиенти, поръчки, автоматични проверки и справки (кликни за интерактивно демо).',
      en: 'Private business suite - clients, orders, automated checks & reports (click for live demo).',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M32 10C22 25 16 33 16 41a16 16 0 0 0 32 0c0-8-6-16-16-31Z" fill="#38BDF8" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="2.6" />
      </svg>
    ),
  },

  // 22 Crisp Vector Technology SVGs
  {
    id: 'typescript',
    name: 'TypeScript',
    accent: '#3178C6',
    radius: 42,
    note: {
      bg: 'Основен фокус - строга типизация, предвидим код и чиста архитектура.',
      en: 'Primary focus - strict typing, predictable state, and clean architecture.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none">
        <rect width="64" height="64" rx="12" fill="#3178C6" />
        <path d="M14 29.5h18.5v4.6H25.7V50h-5.4V34.1H14v-4.6Zm22.3 15.8c1.3 1 3.6 1.8 6 1.8 2.6 0 4.2-1 4.2-2.7 0-1.6-1.2-2.4-4.2-3.4-4.3-1.4-6.9-3.6-6.9-7.1 0-4.1 3.5-7 8.9-7 2.8 0 4.9.6 6.3 1.4l-1.3 4.3c-1-.6-2.8-1.3-5-1.3-2.5 0-3.7 1-3.7 2.4 0 1.6 1.4 2.3 4.6 3.5 4.4 1.6 6.6 3.7 6.6 7.3 0 4.2-3.2 7.4-9.6 7.4-3.1 0-5.9-.8-7.4-1.7l1.5-4.4Z" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'react',
    name: 'React',
    accent: '#61DAFB',
    radius: 42,
    note: {
      bg: 'Основен фокус - компонентни интерфейси, интерактивност и бърз UX.',
      en: 'Primary focus - modular components, smooth interactions, and crisp UX.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none">
        <circle cx="32" cy="32" r="5" fill="#61DAFB" />
        <ellipse cx="32" cy="32" rx="25" ry="9.8" stroke="#61DAFB" strokeWidth="2.8" />
        <ellipse cx="32" cy="32" rx="25" ry="9.8" transform="rotate(60 32 32)" stroke="#61DAFB" strokeWidth="2.8" />
        <ellipse cx="32" cy="32" rx="25" ry="9.8" transform="rotate(120 32 32)" stroke="#61DAFB" strokeWidth="2.8" />
      </svg>
    ),
  },
  {
    id: 'php',
    name: 'PHP',
    accent: '#8892BF',
    radius: 40,
    note: {
      bg: 'Сървърна логика, портали, резервации и заявки в SistAvto, Toplina93, Iva Salon и Vodazamen.',
      en: 'Server logic, client portals, bookings, and quote pipelines across live builds.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-9 w-9" fill="none">
        <ellipse cx="32" cy="32" rx="28" ry="17" fill="#4F5B93" stroke="#9AA5D4" strokeWidth="2" />
        <text x="32" y="38" textAnchor="middle" fill="#FFF" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="18" fontStyle="italic">php</text>
      </svg>
    ),
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    accent: '#F7DF1E',
    radius: 38,
    note: {
      bg: 'ES6+, асинхронни заявки, DOM интеракции и клиентска логика.',
      en: 'ES6+, async requests, DOM interactions, and dynamic frontend logic.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <rect width="64" height="64" rx="12" fill="#F7DF1E" />
        <path d="M27.6 46.5c0 4.9-2.9 7.3-7.4 7.3-3.1 0-5.4-1.5-6.6-3.7l4.1-2.5c.8 1.4 1.5 2.4 3.1 2.4 1.5 0 2.4-.7 2.4-3.3V29h4.4v17.5Zm16.9-1.5c0-1.6-1.1-2.5-3.9-3.6l-1.5-.6c-4.3-1.8-7.1-4.1-7.1-8.9 0-4.4 3.4-7.8 8.7-7.8 3.8 0 6.5 1.3 8.4 4.7l-4.6 2.9c-1-1.8-2.1-2.5-3.8-2.5-1.7 0-2.8 1.1-2.8 2.5 0 1.8 1.1 2.5 3.6 3.5l1.5.6c5 2.1 7.9 4.3 7.9 9.2 0 5.3-4.1 8.2-9.7 8.2-5.4 0-8.9-2.6-10.6-6l4.8-2.8c.9 1.6 1.8 3 4.8 3 2.1 0 3.3-.9 3.3-2.4Z" fill="#0B0D11" />
      </svg>
    ),
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    accent: '#38BDF8',
    radius: 38,
    note: {
      bg: 'Прецизен responsive дизайн и чиста стилизация за телефон и десктоп.',
      en: 'Precision responsive styling and crisp layouts for mobile and desktop.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M32 18c-6.4 0-10.4 3.2-12 9.6 2.4-3.2 5.2-4.4 8.4-3.6 1.8.45 3.1 1.8 4.6 3.3 2.4 2.4 5.2 5.2 11 5.2 6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.45-3.1-1.8-4.6-3.3C40.6 20.8 37.8 18 32 18ZM20 32.5c-6.4 0-10.4 3.2-12 9.6 2.4-3.2 5.2-4.4 8.4-3.6 1.8.45 3.1 1.8 4.6 3.3 2.4 2.4 5.2 5.2 11 5.2 6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.45-3.1-1.8-4.6-3.3-2.4-2.4-5.2-5.2-11-5.2Z" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    id: 'mysql',
    name: 'MySQL',
    accent: '#60A5FA',
    radius: 37,
    note: {
      bg: 'Релационни бази данни, SQL заявки, клиенти, поръчки и справки.',
      en: 'Relational schemas, safe SQL queries, client records, orders, and reports.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <ellipse cx="32" cy="17" rx="20" ry="7.5" fill="#4479A1" fillOpacity="0.28" stroke="#60A5FA" strokeWidth="2.4" />
        <path d="M12 17v15c0 4.1 9 7.5 20 7.5s20-3.4 20-7.5V17" stroke="#60A5FA" strokeWidth="2.4" />
        <path d="M12 32v15c0 4.1 9 7.5 20 7.5s20-3.4 20-7.5V32" stroke="#60A5FA" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    id: 'html5',
    name: 'HTML5',
    accent: '#E34F26',
    radius: 35,
    note: {
      bg: 'Семантична структура, достъпност и стабилна основа за SEO.',
      en: 'Semantic markup, accessibility, and solid SEO structure.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M10 6l4 45 18 5 18-5 4-45H10Z" fill="#E34F26" />
        <path d="M32 10v42l14.5-4 3.2-38H32Z" fill="#EF652A" />
        <path d="M20 18h24l-.8 6H26l.6 6h16l-1.5 16-9.1 2.6-9.1-2.6-.6-7h5.8l.3 3.2 3.6 1 3.6-1 .5-6.2H21.2L20 18Z" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'css3',
    name: 'CSS3',
    accent: '#2965F1',
    radius: 35,
    note: {
      bg: 'Grid, Flexbox, плавни преходи и прецизни визуални детайли.',
      en: 'Grid, Flexbox, fluid transitions, and crisp custom styling.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M10 6l4 45 18 5 18-5 4-45H10Z" fill="#264DE4" />
        <path d="M32 10v42l14.5-4 3.2-38H32Z" fill="#2965F1" />
        <path d="M20 18h24l-1.8 19-10.2 3-10.2-3-.7-7h5.8l.4 3 4.7 1.3 4.7-1.3.6-6.2H21.5l-.6-5.8h17l.4-3H20Z" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'vite',
    name: 'Vite',
    accent: '#FFC72C',
    radius: 35,
    note: {
      bg: 'Светкавично стартиране и оптимизирани production билдове.',
      en: 'Instant dev server startup and lean production bundles.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M56 13L33.5 53.5a2 2 0 0 1-3.5 0L8 13a2 2 0 0 1 2.2-2.9l21.8 4 21.8-4A2 2 0 0 1 56 13Z" fill="#41D1FF" fillOpacity="0.25" stroke="#60A5FA" strokeWidth="2.2" />
        <path d="M40 9L24 31h10l-4 20 18-26H37l3-16Z" fill="#FFC72C" />
      </svg>
    ),
  },
  {
    id: 'gsap',
    name: 'GSAP',
    accent: '#88CE02',
    radius: 35,
    note: {
      bg: 'Плавни scroll анимации и хореография на секции при 60fps.',
      en: 'Smooth scroll animations and timeline choreography at 60fps.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M10 43C19 17 30 16 36 32C41 45 48 44 54 21" stroke="#88CE02" strokeWidth="4" strokeLinecap="round" />
        <circle cx="10" cy="43" r="3.5" fill="#FFF" />
        <circle cx="54" cy="21" r="3.5" fill="#88CE02" />
      </svg>
    ),
  },
  {
    id: 'motion',
    name: 'Motion',
    accent: '#F43F5E',
    radius: 35,
    note: {
      bg: 'Пружинни преходи, layout анимации и тактилни React взаимодействия.',
      en: 'Spring physics transitions and tactile React micro-interactions.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M16 10h32v14H32L16 10Z" fill="#FFF" />
        <path d="M16 24h16l16 14H16V24Z" fill="#CBD5E1" />
        <path d="M16 38h16v16L16 38Z" fill="#E11D2E" />
      </svg>
    ),
  },
  {
    id: 'api',
    name: 'REST API',
    accent: '#E11D2E',
    radius: 36,
    note: {
      bg: 'Интеграции с външни услуги, имейл известия, endpoints и експорт.',
      en: 'External service integrations, email alerts, endpoints, and exports.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <circle cx="16" cy="32" r="6" stroke="#E11D2E" strokeWidth="2.8" />
        <circle cx="48" cy="18" r="6" stroke="#F5F6F8" strokeWidth="2.8" />
        <circle cx="48" cy="46" r="6" stroke="#F5F6F8" strokeWidth="2.8" />
        <path d="M21.5 29.5L42.5 20.5M21.5 34.5L42.5 43.5" stroke="#98A0AD" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    id: 'json',
    name: 'JSON',
    accent: '#F59E0B',
    radius: 34,
    note: {
      bg: 'Структуриран обмен на данни между фронтенд и сървър.',
      en: 'Structured data exchange between frontend interfaces and backends.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <text x="32" y="42" textAnchor="middle" fill="#F59E0B" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="28">{'{ }'}</text>
      </svg>
    ),
  },
  {
    id: 'sql',
    name: 'SQL',
    accent: '#38BDF8',
    radius: 34,
    note: {
      bg: 'Оптимизирани заявки, връзки между таблици и сигурен достъп до данни.',
      en: 'Optimized queries, table relations, and safe parameterized data access.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <rect x="10" y="14" width="44" height="36" rx="7" stroke="#38BDF8" strokeWidth="2.4" fill="#38BDF8" fillOpacity="0.12" />
        <text x="32" y="38" textAnchor="middle" fill="#E0F2FE" fontFamily="JetBrains Mono, monospace" fontWeight="700" fontSize="16">SQL</text>
      </svg>
    ),
  },
  {
    id: 'git',
    name: 'Git',
    accent: '#F05032',
    radius: 35,
    note: {
      bg: 'Версиониране, чисти комити и сигурен работен процес.',
      en: 'Version control, clean branches, and disciplined commits.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <rect x="32" y="8" width="34" height="34" rx="6" transform="rotate(45 32 8)" fill="#F05032" />
        <circle cx="29" cy="24" r="3.2" fill="#FFF" />
        <circle cx="29" cy="40" r="3.2" fill="#FFF" />
        <circle cx="40" cy="34" r="3.2" fill="#FFF" />
        <path d="M29 27.2v9.6M31.5 26l6.5 5.8" stroke="#FFF" strokeWidth="2.6" />
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    accent: '#E2E8F0',
    radius: 35,
    note: {
      bg: 'Хостване на хранилища, документация и история на проектите.',
      en: 'Repository hosting, collaboration, and release management.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 8C18.7 8 8 18.8 8 32.2c0 10.7 6.9 19.7 16.4 22.9 1.2.2 1.6-.5 1.6-1.2v-4.4c-6.7 1.5-8.1-2.9-8.1-2.9-1.1-2.8-2.7-3.5-2.7-3.5-2.2-1.5.2-1.5.2-1.5 2.4.2 3.7 2.5 3.7 2.5 2.1 3.7 5.6 2.6 7 2 .2-1.6.8-2.6 1.5-3.2-5.3-.6-10.9-2.7-10.9-12 0-2.6.9-4.8 2.5-6.5-.3-.6-1.1-3.1.2-6.4 0 0 2-.7 6.6 2.5 1.9-.5 4-.8 6-.8s4.1.3 6 .8c4.6-3.2 6.6-2.5 6.6-2.5 1.3 3.3.5 5.8.2 6.4 1.5 1.7 2.5 3.9 2.5 6.5 0 9.3-5.6 11.4-11 12 .9.8 1.6 2.2 1.6 4.5v6.7c0 .7.4 1.4 1.7 1.2C49.1 51.9 56 42.9 56 32.2 56 18.8 45.3 8 32 8Z"
          fill="#E2E8F0"
        />
      </svg>
    ),
  },
  {
    id: 'docker',
    name: 'Docker',
    accent: '#2496ED',
    radius: 36,
    note: {
      bg: 'Практически опит с контейнери и локални среди за разработка.',
      en: 'Practical experience with containers and clean dev environments.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <g fill="#2496ED">
          <rect x="16" y="25" width="7" height="6" rx="1" />
          <rect x="25" y="25" width="7" height="6" rx="1" />
          <rect x="34" y="25" width="7" height="6" rx="1" />
          <rect x="25" y="17" width="7" height="6" rx="1" />
          <rect x="34" y="17" width="7" height="6" rx="1" />
          <path d="M11 33h37c1.8 0 3.5-1.1 5-2.6 1.2 1.6 1.2 4.3-.3 6.2-2.6 5.8-8.8 11.4-21.2 11.4-12.5 0-19.7-6.2-20.5-15Z" />
        </g>
      </svg>
    ),
  },
  {
    id: 'node',
    name: 'Node & npm',
    accent: '#68A063',
    radius: 35,
    note: {
      bg: 'Модерен билд тулинг, пакети и скриптове за React/TypeScript проекти.',
      en: 'Modern build tooling, package management, and TypeScript scripts.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M32 7L54 19.5V44.5L32 57L10 44.5V19.5L32 7Z" fill="#68A063" fillOpacity="0.2" stroke="#68A063" strokeWidth="2.6" />
        <text x="32" y="38" textAnchor="middle" fill="#86EFAC" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="16">JS</text>
      </svg>
    ),
  },
  {
    id: 'seo',
    name: 'SEO',
    accent: '#10B981',
    radius: 34,
    note: {
      bg: 'Техническо SEO, семантични заглавия, мета данни и скорост за Google.',
      en: 'Technical SEO, clean markup, metadata, and Core Web Vitals speed.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <circle cx="28" cy="28" r="14" stroke="#10B981" strokeWidth="3" fill="#10B981" fillOpacity="0.14" />
        <path d="M39 39l13 13" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M21 30l4-5 4 3 5-6" stroke="#FFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    accent: '#31A8FF',
    radius: 34,
    note: {
      bg: 'Обработка на графики, лога и визуални активи за уеб.',
      en: 'Image editing, branding assets, and web-ready visuals.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <rect width="64" height="64" rx="12" fill="#001E36" stroke="#31A8FF" strokeWidth="2.4" />
        <text x="32" y="42" textAnchor="middle" fill="#31A8FF" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="26">Ps</text>
      </svg>
    ),
  },
  {
    id: 'cpanel',
    name: 'cPanel & CLI',
    accent: '#CBD5E1',
    radius: 35,
    note: {
      bg: 'Терминална работа, SSL, хостинг настройки и пускане в продукция.',
      en: 'Terminal workflows, SSL setup, hosting management, and live deploys.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <rect x="8" y="12" width="48" height="40" rx="8" stroke="#CBD5E1" strokeWidth="2.5" fill="#0F1218" />
        <path d="M19 25l8 7-8 7" stroke="#E11D2E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 39h13" stroke="#F5F6F8" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'python',
    name: 'Python',
    accent: '#3776AB',
    radius: 34,
    note: {
      bg: 'Основни познания за скриптове, обработка на данни и автоматизация.',
      en: 'Foundational knowledge for scripting, data processing, and automation.',
    },
    svg: () => (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M31.5 10C22 10 22.5 14 22.5 14v5h9.5v2H18s-7-.8-7 9.5 6 10 6 10h3.5v-5s-.2-6 6-6h10s5.5.1 5.5-5.3V15.5S42.8 10 31.5 10Z" fill="#3776AB" />
        <path d="M32.5 54c9.5 0 9-4 9-4v-5H32v-2h14s7 .8 7-9.5-6-10-6-10h-3.5v5s.2 6-6 6h-10s-5.5-.1-5.5 5.3v8.7S21.2 54 32.5 54Z" fill="#FFD43B" />
        <circle cx="27" cy="15.5" r="1.8" fill="#FFF" />
        <circle cx="37" cy="48.5" r="1.8" fill="#0B0D11" />
      </svg>
    ),
  },
]

interface BodyState {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  rot: number
  vrot: number
}

interface FloatingTechStageProps {
  lang: Lang
  reducedMotion: boolean
  onInspectProject: (project: ProjectItem) => void
}

export function FloatingTechStage({
  lang,
  reducedMotion,
  onInspectProject,
}: FloatingTechStageProps) {
  const arenaRef = useRef<HTMLDivElement | null>(null)
  const itemElsRef = useRef<(HTMLButtonElement | null)[]>([])
  const bodiesRef = useRef<BodyState[]>([])
  const dragRef = useRef<{
    index: number
    offsetX: number
    offsetY: number
    lastX: number
    lastY: number
  } | null>(null)
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  })
  const gravityRef = useRef(false)

  const [gravityOn, setGravityOn] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('typescript')

  const activeNode = ARENA_ITEMS.find((t) => t.id === selectedId) ?? ARENA_ITEMS[0]
  const linkedProject = activeNode.projectId
    ? PROJECTS.find((p) => p.id === activeNode.projectId)
    : undefined

  const layoutInitialBodies = () => {
    const arena = arenaRef.current
    if (!arena) return
    const w = arena.clientWidth
    const h = arena.clientHeight
    const isSmall = w < 640
    const scale = isSmall ? 0.72 : 0.96

    const cols = isSmall ? 4 : 6
    const rows = Math.ceil(ARENA_ITEMS.length / cols)
    const cellW = w / cols
    const cellH = h / rows

    bodiesRef.current = ARENA_ITEMS.map((item, idx) => {
      const col = idx % cols
      const row = Math.floor(idx / cols)
      const r = Math.round(item.radius * scale)
      const jitterX = (Math.random() - 0.5) * Math.max(10, cellW * 0.24)
      const jitterY = (Math.random() - 0.5) * Math.max(8, cellH * 0.24)
      const x = Math.max(r + 8, Math.min(w - r - 8, (col + 0.5) * cellW + jitterX))
      const y = Math.max(r + 8, Math.min(h - r - 8, (row + 0.5) * cellH + jitterY))
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        r,
        rot: (Math.random() - 0.5) * 8,
        vrot: (Math.random() - 0.5) * 0.14,
      }
    })
  }

  useEffect(() => {
    gravityRef.current = gravityOn
    if (gravityOn) {
      bodiesRef.current.forEach((b) => {
        b.vy += Math.random() * 1.5
      })
    } else {
      bodiesRef.current.forEach((b) => {
        b.vy -= 2 + Math.random() * 2.5
        b.vx += (Math.random() - 0.5) * 2
      })
    }
  }, [gravityOn])

  useEffect(() => {
    layoutInitialBodies()

    const handleResize = () => {
      const arena = arenaRef.current
      if (!arena) return
      const w = arena.clientWidth
      const h = arena.clientHeight
      const scale = w < 640 ? 0.72 : 0.96
      bodiesRef.current.forEach((b, i) => {
        b.r = Math.round(ARENA_ITEMS[i].radius * scale)
        b.x = Math.max(b.r + 6, Math.min(w - b.r - 6, b.x))
        b.y = Math.max(b.r + 6, Math.min(h - b.r - 6, b.y))
      })
    }
    window.addEventListener('resize', handleResize)

    let rafId = 0
    const step = () => {
      const arena = arenaRef.current
      if (arena) {
        const w = arena.clientWidth
        const h = arena.clientHeight
        const bodies = bodiesRef.current
        const gravity = gravityRef.current ? 0.34 : 0
        const damping = gravityRef.current ? 0.992 : 0.985
        const drag = dragRef.current
        const ptr = pointerRef.current

        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i]
          if (drag && drag.index === i) continue

          if (!reducedMotion) {
            b.vy += gravity
            if (!gravityRef.current) {
              const speed = Math.hypot(b.vx, b.vy)
              if (speed < 0.32) {
                b.vx += (Math.random() - 0.5) * 0.08
                b.vy += (Math.random() - 0.5) * 0.08
              }
            }

            if (ptr.active && !drag) {
              const dx = b.x - ptr.x
              const dy = b.y - ptr.y
              const dist = Math.hypot(dx, dy)
              const pushRadius = b.r + 64
              if (dist < pushRadius && dist > 0.5) {
                const force = ((pushRadius - dist) / pushRadius) * 1.55
                b.vx += (dx / dist) * force
                b.vy += (dy / dist) * force
                b.vrot += (dx / dist) * 0.14
              }
            }

            b.vx *= damping
            b.vy *= damping
            b.vrot *= 0.96

            const maxSpeed = 16
            const sp = Math.hypot(b.vx, b.vy)
            if (sp > maxSpeed) {
              b.vx = (b.vx / sp) * maxSpeed
              b.vy = (b.vy / sp) * maxSpeed
            }

            b.x += b.vx
            b.y += b.vy
            b.rot += b.vrot
          }

          const pad = 6
          if (b.x - b.r < pad) {
            b.x = pad + b.r
            b.vx = Math.abs(b.vx) * 0.78
          } else if (b.x + b.r > w - pad) {
            b.x = w - pad - b.r
            b.vx = -Math.abs(b.vx) * 0.78
          }

          if (b.y - b.r < pad) {
            b.y = pad + b.r
            b.vy = Math.abs(b.vy) * 0.78
          } else if (b.y + b.r > h - pad) {
            b.y = h - pad - b.r
            b.vy = -Math.abs(b.vy) * (gravityRef.current ? 0.54 : 0.78)
            if (gravityRef.current) b.vx *= 0.94
          }
        }

        for (let pass = 0; pass < 2; pass++) {
          for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
              const a = bodies[i]
              const b = bodies[j]
              const dx = b.x - a.x
              const dy = b.y - a.y
              const dist = Math.hypot(dx, dy)
              const minDist = a.r + b.r + 5

              if (dist < minDist && dist > 0.01) {
                const nx = dx / dist
                const ny = dy / dist
                const overlap = minDist - dist

                const aDragged = drag?.index === i
                const bDragged = drag?.index === j

                if (aDragged) {
                  b.x += nx * overlap
                  b.y += ny * overlap
                } else if (bDragged) {
                  a.x -= nx * overlap
                  a.y -= ny * overlap
                } else {
                  a.x -= nx * overlap * 0.5
                  a.y -= ny * overlap * 0.5
                  b.x += nx * overlap * 0.5
                  b.y += ny * overlap * 0.5
                }

                const rvx = b.vx - a.vx
                const rvy = b.vy - a.vy
                const velAlongNormal = rvx * nx + rvy * ny
                if (velAlongNormal < 0) {
                  const restitution = gravityRef.current ? 0.5 : 0.84
                  const impulse = -(1 + restitution) * velAlongNormal * 0.5
                  if (!aDragged) {
                    a.vx -= impulse * nx
                    a.vy -= impulse * ny
                  }
                  if (!bDragged) {
                    b.vx += impulse * nx
                    b.vy += impulse * ny
                  }
                }
              }
            }
          }
        }

        for (let i = 0; i < bodies.length; i++) {
          const el = itemElsRef.current[i]
          const b = bodies[i]
          if (!el) continue
          const size = b.r * 2
          el.style.width = `${size}px`
          el.style.height = `${size}px`
          el.style.transform = `translate3d(${(b.x - b.r).toFixed(1)}px, ${(b.y - b.r).toFixed(1)}px, 0) rotate(${b.rot.toFixed(1)}deg)`
        }
      }

      rafId = window.requestAnimationFrame(step)
    }

    rafId = window.requestAnimationFrame(step)
    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
    }
  }, [reducedMotion])

  const handleScatter = () => {
    bodiesRef.current.forEach((b) => {
      const angle = Math.random() * Math.PI * 2
      const force = 7 + Math.random() * 8
      b.vx = Math.cos(angle) * force
      b.vy = Math.sin(angle) * force - (gravityRef.current ? 7 : 0)
      b.vrot = (Math.random() - 0.5) * 4
    })
  }

  const handleReset = () => {
    setGravityOn(false)
    gravityRef.current = false
    layoutInitialBodies()
  }

  return (
    <section
      id="stack"
      className="relative border-t border-white/8 bg-[#090b0f] py-20 sm:py-28 px-4 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Strictly Centered Header */}
        <div className="reveal-heading mx-auto max-w-2xl text-center">
          <p className="font-mono-code text-xs uppercase tracking-[0.24em] text-[#98a0ad]">
            {lang === 'bg' ? 'Екосистема' : 'Ecosystem'}
          </p>
          <h2 className="mt-2.5 font-condensed text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.12]">
            {lang === 'bg' ? 'Технологии & Проекти' : 'Tech & Live Builds'}
            <span className="text-[#e11d2e]">.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#98a0ad] leading-relaxed">
            {lang === 'bg'
              ? 'Технологиите и реалните ми проекти на едно място - взаимодействай свободно с всяка икона.'
              : 'My core technologies and live client builds in one interactive playground.'}
          </p>
        </div>

        {/* Interactive Physics Arena Container */}
        <div className="mt-10 rounded-2xl border border-white/12 bg-[#07080a] overflow-hidden shadow-[0_32px_90px_-30px_rgba(0,0,0,0.9)]">
          {/* Clean, Non-Cringe Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/8 bg-[#0b0d12]">
            <div className="font-mono-code text-[11px] uppercase tracking-[0.2em] text-[#8d95a4]">
              {lang === 'bg' ? 'Интерактивна среда' : 'Interactive Canvas'}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setGravityOn((g) => !g)}
                className={`cursor-pointer inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  gravityOn
                    ? 'border-[#e11d2e] bg-[#e11d2e] text-white'
                    : 'border-white/12 bg-[#07080a] text-slate-200 hover:border-white/30'
                }`}
              >
                <ArrowDownToLine className="h-3.5 w-3.5" />
                <span>
                  {lang === 'bg' ? 'Гравитация' : 'Gravity'}: {gravityOn ? 'ON' : 'OFF'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleScatter}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-[#07080a] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
              >
                <Shuffle className="h-3.5 w-3.5 text-[#e11d2e]" />
                <span>{lang === 'bg' ? 'Разбъркай' : 'Scatter'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset positions"
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-[#07080a] px-3 py-1.5 text-xs font-semibold text-[#98a0ad] transition hover:border-white/30 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* 60fps Physical Sandbox Canvas (22 Technologies + 4 Real Projects = 26 Items) */}
          <div
            ref={arenaRef}
            onPointerMove={(e) => {
              const arena = arenaRef.current
              if (!arena) return
              const rect = arena.getBoundingClientRect()
              const px = e.clientX - rect.left
              const py = e.clientY - rect.top
              pointerRef.current = { x: px, y: py, active: true }

              const drag = dragRef.current
              if (drag) {
                const body = bodiesRef.current[drag.index]
                if (body) {
                  const nx = Math.max(body.r + 6, Math.min(rect.width - body.r - 6, px - drag.offsetX))
                  const ny = Math.max(body.r + 6, Math.min(rect.height - body.r - 6, py - drag.offsetY))
                  body.vx = (nx - drag.lastX) * 0.85
                  body.vy = (ny - drag.lastY) * 0.85
                  body.x = nx
                  body.y = ny
                  drag.lastX = nx
                  drag.lastY = ny
                }
              }
            }}
            onPointerLeave={() => {
              pointerRef.current.active = false
              dragRef.current = null
            }}
            onPointerUp={() => {
              dragRef.current = null
            }}
            className="relative h-[460px] sm:h-[520px] w-full overflow-hidden select-none touch-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          >
            {ARENA_ITEMS.map((item, idx) => {
              const isSelected = activeNode.id === item.id
              const isProject = Boolean(item.projectId)
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    itemElsRef.current[idx] = el
                  }}
                  type="button"
                  title={item.name}
                  onPointerDown={(e) => {
                    e.stopPropagation()
                    setSelectedId(item.id)
                    const arena = arenaRef.current
                    const body = bodiesRef.current[idx]
                    if (!arena || !body) return
                    const rect = arena.getBoundingClientRect()
                    const px = e.clientX - rect.left
                    const py = e.clientY - rect.top
                    e.currentTarget.setPointerCapture(e.pointerId)
                    dragRef.current = {
                      index: idx,
                      offsetX: px - body.x,
                      offsetY: py - body.y,
                      lastX: body.x,
                      lastY: body.y,
                    }
                    body.vx = 0
                    body.vy = 0
                  }}
                  onPointerUp={(e) => {
                    try {
                      e.currentTarget.releasePointerCapture(e.pointerId)
                    } catch {
                      // ignore
                    }
                    dragRef.current = null
                  }}
                  onMouseEnter={() => setSelectedId(item.id)}
                  className={`cursor-grab active:cursor-grabbing absolute top-0 left-0 flex flex-col items-center justify-center rounded-2xl border backdrop-blur-md transition-colors duration-150 will-change-transform ${
                    isSelected
                      ? 'z-20 border-white/45 bg-[#151924]'
                      : isProject
                        ? 'z-15 border-[#e11d2e]/45 bg-[#120d11]/95 hover:border-[#e11d2e]'
                        : 'z-10 border-white/12 bg-[#0d1017]/95 hover:border-white/30'
                  }`}
                  style={{
                    boxShadow: isSelected
                      ? `0 12px 32px -12px ${item.accent}`
                      : '0 8px 22px -12px rgba(0,0,0,0.85)',
                  }}
                >
                  <span className="pointer-events-none scale-85 sm:scale-95">{item.svg()}</span>
                  <span className="pointer-events-none mt-1 text-[9px] sm:text-[10px] font-semibold text-slate-200 leading-none truncate max-w-[90%]">
                    {item.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Clean Active Item Info Footer inside the Arena (+ Quick Open button for Projects!) */}
          <div className="border-t border-white/8 bg-[#0b0d12] px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2.5 text-sm font-bold text-white shrink-0">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: activeNode.accent }}
                />
                <span>{activeNode.name}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#a2aab8] leading-relaxed">
                {activeNode.note[lang]}
              </p>
            </div>

            {linkedProject && (
              <button
                type="button"
                onClick={() => onInspectProject(linkedProject)}
                className="cursor-pointer shrink-0 btn-solid-white inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold"
              >
                <span>{lang === 'bg' ? 'Отвори проекта' : 'Open Project'}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
