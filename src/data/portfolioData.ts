export type Lang = 'bg' | 'en'

export interface ProjectItem {
  id: string
  code: string
  name: string
  displayLogoTop: string
  displayLogoMain: string
  category: Record<Lang, string>
  locationTag: Record<Lang, string>
  tagline: Record<Lang, string>
  description: Record<Lang, string>
  highlights: Record<Lang, string[]>
  architectureNote: Record<Lang, string>
  tech: string[]
  url?: string
  isPrivate?: boolean
  isUpcoming?: boolean
  image: string
  accentHex: string
  accentSoft: string
  borderGlow: string
  cardGradient: string
  badgeStyle: string
}

export interface TrackItem {
  num: string
  title: Record<Lang, string>
  subtitle: Record<Lang, string>
  detail: Record<Lang, string>
  tags: string[]
  ctaLabel: Record<Lang, string>
}

export const PROFILE_CONFIG = {
  fullName: {
    bg: 'Златин Райков',
    en: 'Zlatin Raykov',
  },
  monogram: 'ZR',
  email: 'zlatin.raykov@gmail.com',
  githubUrl: 'https://github.com/Zayocast',
  signatureSrc: './images/zlatin-signature.png',
}

export const MARQUEE_SKILLS = [
  'TypeScript',
  'React',
  'JavaScript ES6+',
  'PHP',
  'MySQL / MariaDB',
  'Tailwind CSS',
  'HTML5 & CSS3',
  'REST API',
  'GSAP & Motion',
  'Git & GitHub',
  'Docker',
  'cPanel & CLI',
]

export const CORE_CAPABILITIES: TrackItem[] = [
  {
    num: '01',
    title: {
      bg: 'TypeScript & React Разработка',
      en: 'TypeScript & React Development',
    },
    subtitle: {
      bg: 'TypeScript • React • Компонентна архитектура • Tailwind CSS',
      en: 'TypeScript • React • Component Architecture • Tailwind CSS',
    },
    detail: {
      bg: 'Изграждане на модерни, типизирани и светкавично бързи уеб интерфейси с TypeScript и React - чист код, преизползваеми компоненти, плавни анимации и безупречна мобилна адаптация.',
      en: 'Building modern, strictly typed, ultra-fast web interfaces with TypeScript and React - clean reusable components, silky motion, and pixel-accurate mobile responsiveness.',
    },
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'GSAP'],
    ctaLabel: { bg: 'Детайли', en: 'Inspect' },
  },
  {
    num: '02',
    title: {
      bg: 'Уеб Системи с PHP & MySQL',
      en: 'Web Systems with PHP & MySQL',
    },
    subtitle: {
      bg: 'PHP • MySQL / MariaDB • Админ панели • Резервации & Заявки',
      en: 'PHP • MySQL / MariaDB • Admin Panels • Bookings & Orders',
    },
    detail: {
      bg: 'Практически опит в създаването на реални бизнес уебсайтове, клиентски портали, онлайн резервации, форми за заявки, документи и релационни бази данни за клиенти в България.',
      en: 'Hands-on experience delivering live client websites, customer portals, online booking engines, order workflows, documents, and relational databases.',
    },
    tags: ['PHP', 'MySQL / MariaDB', 'Admin Panels', 'Security'],
    ctaLabel: { bg: 'Детайли', en: 'Inspect' },
  },
  {
    num: '03',
    title: {
      bg: 'Интерактивен UI, Анимации & Mobile-First',
      en: 'Interactive UI, Motion & Mobile-First',
    },
    subtitle: {
      bg: 'Responsive дизайн • Висока скорост • SEO структура',
      en: 'Responsive Design • High Performance • Technical SEO',
    },
    detail: {
      bg: 'Всеки проект се проектира с внимание към усещането на телефон и десктоп - бързо зареждане, ясна визуална йерархия, интерактивни детайли и оптимизация за търсачки.',
      en: 'Every project is tuned for crisp ergonomics on phones and large monitors alike - fast load times, sharp typography, refined interactions, and clean SEO structure.',
    },
    tags: ['Mobile-First', 'UI / UX', 'Framer Motion', 'SEO'],
    ctaLabel: { bg: 'Детайли', en: 'Inspect' },
  },
  {
    num: '04',
    title: {
      bg: 'AI като Инженерен Помощник',
      en: 'AI as an Engineering Assistant',
    },
    subtitle: {
      bg: 'Проучване • Debugging • Code Review • По-бърза работа (не авто-генериране)',
      en: 'Research • Debugging • Code Audits • Faster Iteration (Not Blind Generation)',
    },
    detail: {
      bg: 'Използвам AI инструменти като помощник за по-бързо проучване, анализ на сложни бъгове, рефакториране и проверка на edge-cases - контролът, архитектурата и крайният код винаги са мои.',
      en: 'I use AI tools strictly as a productivity assistant for research, debugging edge cases, code review, and documentation - architectural decisions and code ownership always stay human-driven.',
    },
    tags: ['Debugging', 'Code Review', 'Research', 'Workflow Speed'],
    ctaLabel: { bg: 'Детайли', en: 'Inspect' },
  },
]

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sistavto',
    code: 'PRJ-01 • LIVE PRODUCTION',
    name: 'SIST AVTO',
    displayLogoTop: 'AUTOMOTIVE PLATFORM',
    displayLogoMain: 'SISTAVTO',
    category: {
      bg: 'Уеб платформа и система за управление на автосервиз',
      en: 'Automotive Service Platform & Management System',
    },
    locationTag: {
      bg: 'гр. Пазарджик • sistavto.com',
      en: 'Pazardzhik, BG • sistavto.com',
    },
    tagline: {
      bg: 'Клиентски портал (portal.php), сервизни поръчки, фактури, 47+ статии и административен панел.',
      en: 'Client portal (portal.php), service orders, invoicing, 47+ technical articles & admin dashboard.',
    },
    description: {
      bg: 'Цялостна уеб платформа и вътрешна бизнес система за автосервиз СИСТ АВТО (Пазарджик). Съчетава тъмен корпоративен интерфейс с клиентски портал (portal.php), система за бързи запитвания, управление на клиенти, поръчки, услуги, документи, фактури и справки.',
      en: 'Complete production website and internal service management platform for SIST AVTO (Pazardzhik). Combines a crisp dark storefront with a live client portal (portal.php), quick inquiry flow, order/service management, invoicing, and reporting.',
    },
    highlights: {
      bg: [
        'Клиентски портал (portal.php) + пълен административен панел за сервизни поръчки',
        'Генериране на документи, фактури, история на ремонтите и вътрешни справки',
        '6 структурирани сервизни направления + форма за бързо запитване и запазване на час',
        'Технически блог с 47+ статии, SEO структура и интеграция с Google Reviews (5.0★)',
      ],
      en: [
        'Live client portal (portal.php) paired with a full internal admin dashboard',
        'Document & invoice generation, service history tracking, and operational reports',
        '6 structured service divisions + instant inquiry and appointment booking flow',
        '47+ mechanic-authored SEO articles and verified 5.0★ Google Reviews showcase',
      ],
    },
    architectureNote: {
      bg: 'Изградена с PHP, MySQL/MariaDB и JavaScript - с фокус върху чиста бизнес логика, сигурност на сесиите и бърза мобилна работа.',
      en: 'Built with PHP, MySQL/MariaDB, and JavaScript - focused on reliable business logic, session security, and smooth mobile performance.',
    },
    tech: ['PHP', 'MySQL / MariaDB', 'JavaScript', 'Client Portal', 'Admin Panel', 'SEO'],
    url: 'https://sistavto.com',
    image: './images/card-sistavto.jpg',
    accentHex: '#e11d2e',
    accentSoft: 'rgba(225, 29, 46, 0.22)',
    borderGlow: 'rgba(225, 29, 46, 0.45)',
    cardGradient: 'linear-gradient(102deg, rgba(7,8,11,0.97) 0%, rgba(12,13,18,0.85) 47%, rgba(7,8,11,0.22) 100%)',
    badgeStyle: 'bg-red-500/15 text-red-200 border-red-500/35',
  },
  {
    id: 'toplina93',
    code: 'PRJ-02 • LIVE PRODUCTION',
    name: 'TOPLINA 93',
    displayLogoTop: 'ENERGY & FUELS PLATFORM',
    displayLogoMain: 'TOPLINA93',
    category: {
      bg: 'Бизнес платформа за отоплителни горива, пелети и онлайн заявки',
      en: 'Heating Fuels, Class A1 Pellets & PHP Order Platform',
    },
    locationTag: {
      bg: 'гр. Пазарджик • toplina93.com',
      en: 'Pazardzhik, BG • toplina93.com',
    },
    tagline: {
      bg: 'PHP & JavaScript платформа с 3-табов каталог (въглища, дърва, пелети А1), работно време и система за заявки.',
      en: 'PHP & JavaScript platform with 3-tab catalog (coal, firewood, A1 pellets), live hours & order pipeline.',
    },
    description: {
      bg: 'Представителна и конверсионно ориентирана уеб платформа за складова база „Топлина 93 ЕООД“. Изградена с PHP, JavaScript и модерен тъмен индустриален дизайн - включва интерактивен 3-табов каталог, спецификации, статус на работно време в реално време и PHP обработка на заявките и админ модула.',
      en: 'Conversion-focused digital platform for Toplina 93 depot built with PHP, JavaScript, and a refined dark industrial UI. Features an interactive 3-tab fuel switcher, detailed specs, live depot open/closed status, FAQ accordion, and PHP-powered quote/order processing & export.',
    },
    highlights: {
      bg: [
        'PHP backend архитектура с обработка на клиентски заявки, експорт и административен модул',
        'Интерактивен 3-табов продуктов модул (Въглища, Дърва за огрев, Пелети Клас А1) + тухли',
        'Индикатор за наличност на склад, работно време в реално време и зони за доставка',
        'Умна форма за заявки с избираеми чипове, FAQ акордеон, Google Maps и локално SEO',
      ],
      en: [
        'PHP backend architecture handling client quote requests, data exports, and admin controls',
        'Interactive 3-tab showcase (Coal 25-60mm, Split Firewood, Class A1 Pine Pellets) + bricks',
        'Live depot availability badges, real-time open/closed status, and delivery zones',
        'Smart order form with selectable product chips, FAQ accordion, Google Maps & local SEO',
      ],
    },
    architectureNote: {
      bg: 'Комбинира PHP сървърна логика за заявки и шаблони с бърз vanilla JS интерфейс, оптимизиран за мобилни устройства и локално SEO.',
      en: 'Combines PHP server-side request processing & modular includes with a fast JavaScript UI tuned for mobile speed and local SEO.',
    },
    tech: ['PHP', 'JavaScript', 'HTML5 & CSS3', 'Admin / Export', 'Order System', 'Local SEO'],
    url: 'https://toplina93.com',
    image: './images/card-toplina93.jpg',
    accentHex: '#f59e0b',
    accentSoft: 'rgba(245, 158, 11, 0.2)',
    borderGlow: 'rgba(245, 158, 11, 0.42)',
    cardGradient: 'linear-gradient(96deg, rgba(8,8,10,0.99) 0%, rgba(11,10,9,0.97) 44%, rgba(13,11,9,0.72) 58%, rgba(8,8,10,0.22) 82%, rgba(8,8,10,0.12) 100%)',
    badgeStyle: 'bg-amber-500/15 text-amber-200 border-amber-400/35',
  },
  {
    id: 'ivasalon',
    code: 'PRJ-03 • LIVE PRODUCTION',
    name: 'IVA SALON',
    displayLogoTop: 'BEAUTY & BOOKING SUITE',
    displayLogoMain: 'IVA SALON',
    category: {
      bg: 'Уеб платформа за салон за красота с онлайн резервации и админ панел',
      en: 'Beauty Studio Platform with Online Booking & Admin Panel',
    },
    locationTag: {
      bg: 'гр. Стрелча • ivasalon.com',
      en: 'Strelcha, BG • ivasalon.com',
    },
    tagline: {
      bg: 'Онлайн записване на часове (booking.php), админ панел, имейл известия и Dark/Light режим.',
      en: 'Online appointment engine (booking.php), admin dashboard, email alerts & Dark/Light luxury UI.',
    },
    description: {
      bg: 'Елегантна уеб платформа за Салон за красота ИВА (гр. Стрелча) в минималистичен черен и шампанско-златен стил. Включва собствена система за онлайн резервации (booking.php), админ панел за услуги и цени, Dark/Light превключвател и автоматични имейл известия.',
      en: 'Minimalist editorial web platform for IVA Beauty Salon (Strelcha) crafted in matte black and champagne gold. Features a custom online booking system (booking.php), admin panel for appointments and pricing tiers, Dark/Light toggle, and automated email notifications.',
    },
    highlights: {
      bg: [
        'Собствена система за онлайн резервации (booking.php) с проверка на свободни слотове',
        'Административен панел за управление на услуги, записвания и клиентски заявки',
        'Автоматични имейл известия, Dark/Light режим и плавни анимирани marquee ленти',
        'Техническа сигурност, GDPR модул, мобилна оптимизация и Viber/WhatsApp бутони',
      ],
      en: [
        'Custom online booking engine (booking.php) with real-time slot management',
        'Dedicated admin dashboard for services, pricing tiers, and client bookings',
        'Automated email notifications, Dark/Light theme switcher, and marquee accents',
        'Security hardening, GDPR compliance, mobile UX, and direct Viber/WhatsApp actions',
      ],
    },
    architectureNote: {
      bg: 'Съчетава луксозна минималистична визия с надежден PHP/MySQL бекенд за реални ежедневни резервации без месечни комисиони.',
      en: 'Pairs minimalist luxury aesthetics with a zero-commission PHP/MySQL booking backend running live daily appointments.',
    },
    tech: ['PHP', 'MySQL', 'JavaScript', 'Booking Engine', 'Admin Panel', 'Dark/Light UI'],
    url: 'https://ivasalon.com',
    image: './images/card-ivasalon.svg',
    accentHex: '#d4af6a',
    accentSoft: 'rgba(212, 175, 106, 0.22)',
    borderGlow: 'rgba(212, 175, 106, 0.44)',
    cardGradient: 'linear-gradient(102deg, rgba(8,8,10,0.97) 0%, rgba(16,14,11,0.85) 47%, rgba(8,8,10,0.2) 100%)',
    badgeStyle: 'bg-amber-200/15 text-amber-100 border-amber-200/35',
  },
  {
    id: 'vodazamen',
    code: 'PRJ-04 • PRIVATE SYSTEM',
    name: 'VODAZAMEN MANAGER',
    displayLogoTop: 'BUSINESS OPERATIONS APP',
    displayLogoMain: 'VODAZAMEN',
    category: {
      bg: 'Вътрешно приложение за клиенти, продукти, поръчки и автоматични проверки',
      en: 'Private Business Operations, Client & Automation Suite',
    },
    locationTag: {
      bg: 'Закрита продукционна система • Поверителни данни',
      en: 'Private Production System • Confidential Client Data',
    },
    tagline: {
      bg: 'Управление на клиенти, продукти и поръчки, автоматизирани проверки, известия и генериране на справки.',
      en: 'Client CRM, products & orders, automated checks, alerts, and instant document/report generation.',
    },
    description: {
      bg: 'Специализирано бизнес приложение, използвано ежедневно с реални данни на клиенти. Поради поверителност не публикувам реални скрийншоти - отвори детайлите, за да разгледаш интерактивна анонимизирана UI симулация на ключовите модули.',
      en: 'Custom business operations application running daily with real customer records. Client privacy comes first, so live screenshots are intentionally withheld - open the preview to explore an interactive anonymized UI simulation of its core modules.',
    },
    highlights: {
      bg: [
        'Централизирано управление на клиенти, продукти, поръчки и история на доставките',
        'Автоматизирани проверки по графици и навременни известия към оператора',
        'Модул за генериране на документи, протоколи и обобщени бизнес справки',
        'Пълна защита на клиентските данни, валидация на заявките и контролиран достъп',
      ],
      en: [
        'Centralized management of clients, products, recurring orders, and delivery history',
        'Automated schedule checks and operational alerts for upcoming cycles',
        'Built-in document, protocol, and management report generator',
        'Strict protection of real client records, input validation, and controlled access',
      ],
    },
    architectureNote: {
      bg: 'Създадена изцяло по реалните работни процеси на клиента - заменя ръчните таблици и ускорява ежедневната работа.',
      en: 'Engineered around real operational bottlenecks - replacing manual spreadsheets with fast, reliable workflows.',
    },
    tech: ['PHP', 'MySQL / MariaDB', 'JavaScript', 'Automation', 'Docs & Reports', 'Security'],
    isPrivate: true,
    image: './images/card-vodazamen.jpg',
    accentHex: '#38bdf8',
    accentSoft: 'rgba(56, 189, 248, 0.2)',
    borderGlow: 'rgba(56, 189, 248, 0.42)',
    cardGradient: 'linear-gradient(102deg, rgba(6,9,14,0.97) 0%, rgba(10,16,24,0.85) 47%, rgba(6,9,14,0.2) 100%)',
    badgeStyle: 'bg-sky-400/15 text-sky-200 border-sky-400/35',
  },
  {
    id: 'nexus',
    code: 'PRJ-05 • IN ARCHITECTURE',
    name: 'NEXUS LIBRARY',
    displayLogoTop: 'NEXT BUILD • R&D',
    displayLogoMain: 'NEXUS',
    category: {
      bg: 'Модулна дигитална библиотека с външни източници и интелигентно търсене',
      en: 'Modular Digital Library & Automated Content Platform',
    },
    locationTag: {
      bg: 'Архитектурна фаза • 2026',
      en: 'Architecture Phase • 2026',
    },
    tagline: {
      bg: 'Модулна онлайн библиотека с външни източници на съдържание, автоматизирана обработка и модерен UI.',
      en: 'Modular online library ingesting external sources with automated pipelines & modern TypeScript UI.',
    },
    description: {
      bg: 'Личен R&D проект в етап на архитектурно планиране за модулна дигитална библиотека - структуриране на метаданни от външни API източници, автоматизирана обработка и чист TypeScript + React интерфейс.',
      en: 'Personal R&D build in architectural planning for a modular digital library - structured metadata ingestion from external APIs, automated indexing, and a fast TypeScript + React interface.',
    },
    highlights: {
      bg: [
        'Модулна архитектура с ясно разделени слоеве за данни, индексиране и клиентски UI',
        'Автоматизирана обработка и нормализиране на съдържание от външни API източници',
        'Проектирана с фокус върху TypeScript, React и чиста компонентна структура',
        'Вградена концепция за интелигентно търсене и помощни AI функции за каталогизиране',
      ],
      en: [
        'Modular architecture separating data ingestion, indexing logic, and client UI',
        'Automated normalization of content pulled from external API sources',
        'Designed around TypeScript, React, and maintainable component architecture',
        'Planned smart search and assistive AI helpers for cataloging and discovery',
      ],
    },
    architectureNote: {
      bg: 'Следващият ми личен технологичен проект, фокусиран върху модерна TypeScript/React архитектура и работа с външни API-та.',
      en: 'My next personal engineering project centered on modern TypeScript/React architecture and external API pipelines.',
    },
    tech: ['TypeScript', 'React', 'REST APIs', 'Architecture', 'Automation'],
    isUpcoming: true,
    image: './images/card-nexus.svg',
    accentHex: '#cbd5e1',
    accentSoft: 'rgba(203, 213, 225, 0.18)',
    borderGlow: 'rgba(203, 213, 225, 0.36)',
    cardGradient: 'linear-gradient(102deg, rgba(7,8,11,0.97) 0%, rgba(14,16,21,0.85) 47%, rgba(7,8,11,0.2) 100%)',
    badgeStyle: 'bg-slate-300/15 text-slate-200 border-slate-300/35',
  },
]

export const STACK_TRACKS: TrackItem[] = [
  {
    num: '01',
    title: { bg: 'TypeScript & React (Основен фокус)', en: 'TypeScript & React (Primary Focus)' },
    subtitle: { bg: 'TypeScript • React • Hooks • Component Design • Vite • Tailwind CSS', en: 'TypeScript • React • Hooks • Component Design • Vite • Tailwind CSS' },
    detail: {
      bg: 'Активна работа и силен фокус върху TypeScript и React за изграждане на модерни, предвидими и скалируеми интерфейси с типизирани данни, чиста структура и висока производителност.',
      en: 'Strong focus on TypeScript and React for building modern, type-safe, maintainable frontends with crisp UX, clean state architecture, and smooth animations.',
    },
    tags: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Framer Motion'],
    ctaLabel: { bg: 'Фокус', en: 'Core' },
  },
  {
    num: '02',
    title: { bg: 'JavaScript, HTML5 & CSS3', en: 'JavaScript, HTML5 & CSS3' },
    subtitle: { bg: 'ES6+ • DOM • Анимации • GSAP • Responsive / Mobile-First', en: 'ES6+ • DOM • Motion • GSAP • Responsive / Mobile-First' },
    detail: {
      bg: 'Дълбоко практическо владеене на модерен JavaScript, семантичен HTML5, модерен CSS3 (Grid/Flexbox) и интерактивни анимации, работещи гладко на всякакви мобилни екрани.',
      en: 'Deep hands-on command of modern JavaScript, semantic HTML5, modern CSS layout systems, and fluid GSAP motion tuned for mobile and desktop devices.',
    },
    tags: ['JavaScript ES6+', 'HTML5', 'CSS3', 'GSAP', 'Responsive UI'],
    ctaLabel: { bg: 'Frontend', en: 'Frontend' },
  },
  {
    num: '03',
    title: { bg: 'PHP & Релационни Бази Данни', en: 'PHP & Relational Databases' },
    subtitle: { bg: 'PHP • MySQL / MariaDB • SQL • phpMyAdmin • Клиентски портали', en: 'PHP • MySQL / MariaDB • SQL • phpMyAdmin • Client Portals' },
    detail: {
      bg: 'Реални продукционни проекти с PHP и MySQL/MariaDB - админ панели, системи за резервации, клиентски заявки, генериране на документи, валидация и сигурност.',
      en: 'Production client builds powered by PHP and MySQL/MariaDB - admin panels, booking engines, order pipelines, document generation, and security validation.',
    },
    tags: ['PHP', 'MySQL', 'MariaDB', 'SQL', 'phpMyAdmin'],
    ctaLabel: { bg: 'Backend', en: 'Backend' },
  },
  {
    num: '04',
    title: { bg: 'API Интеграции & Автоматизация', en: 'API Integrations & Automation' },
    subtitle: { bg: 'REST API • JSON • Имейл известия • Webhooks • Справки', en: 'REST API • JSON • Email Alerts • Webhooks • Exports' },
    detail: {
      bg: 'Интеграция на външни услуги, работа с REST API и JSON, автоматизирани известия, експорт на таблици/документи и оптимизиране на бизнес процеси.',
      en: 'Integrating external APIs, JSON workflows, automated email alerts, CSV/PDF exports, and streamlining manual operational tasks.',
    },
    tags: ['REST API', 'JSON', 'Automation', 'Email / Alerts'],
    ctaLabel: { bg: 'API', en: 'API' },
  },
  {
    num: '05',
    title: { bg: 'AI Инструменти като Помощник', en: 'AI Tools as a Dev Assistant' },
    subtitle: { bg: 'Проучване • Debugging • Рефакторинг • Ускорен работен процес', en: 'Research • Debugging • Refactoring • Workflow Acceleration' },
    detail: {
      bg: 'Ползвам съвременни AI инструменти като интелигентен помощник за бърз анализ, търсене на решения, одит на код и debugging - не като заместител на мисленето или сляпо генериране.',
      en: 'I leverage modern AI tools as an engineering copilot for rapid research, debugging, and code review - keeping architectural ownership and craftsmanship firmly in my hands.',
    },
    tags: ['Assisted Debugging', 'Code Review', 'Technical Research'],
    ctaLabel: { bg: 'Workflow', en: 'Workflow' },
  },
  {
    num: '06',
    title: { bg: 'Инструменти, Git, Docker & Хостинг', en: 'Tooling, Git, Docker & Hosting' },
    subtitle: { bg: 'Git • GitHub • Docker • cPanel • Терминал / CLI • Photoshop', en: 'Git • GitHub • Docker • cPanel • Terminal / CLI • Photoshop' },
    detail: {
      bg: 'Ежедневна работа с Git/GitHub, терминални среди, практически опит с Docker контейнери, реални cPanel деплойменти и визуална подготовка с Photoshop.',
      en: 'Daily workflow with Git/GitHub, CLI environments, practical Docker usage, live cPanel deployments, and visual asset editing in Photoshop.',
    },
    tags: ['Git / GitHub', 'Docker', 'cPanel', 'CLI', 'Photoshop'],
    ctaLabel: { bg: 'Tools', en: 'Tools' },
  },
  {
    num: '07',
    title: { bg: 'Път на развитие: Self-Taught + Курсове', en: 'Background: Self-Taught + Programs' },
    subtitle: { bg: 'Самообучение чрез реални проекти • Завършени курсове и софтуерни програми', en: 'Self-taught through real client work • Completed coding courses & programs' },
    detail: {
      bg: 'Изградил съм уменията си предимно като self-taught разработчик чрез практика върху реални клиентски задачи, подкрепено от завършени специализирани курсове и обучителни програми по програмиране.',
      en: 'Primarily self-taught through hands-on problem solving on live client projects, reinforced by completed programming courses and specialized training programs.',
    },
    tags: ['Self-Taught', 'Completed Courses', 'Real Client Delivery', 'BG / EN'],
    ctaLabel: { bg: 'Път', en: 'Path' },
  },
]
