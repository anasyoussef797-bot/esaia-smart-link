import { TranslationSchema } from '../types';
import { en } from './en';

export const ru: TranslationSchema = {
  ...en,
  nav: {
    overview: 'Обзор',
    clients: 'Клиенты CRM',
    qr: 'Динамические QR-коды',
    pages: 'Лендинги',
    links: 'Смарт-ссылки',
    cards: 'Визитки',
    menus: 'Электронные меню',
    templates: 'Шаблоны',
    media: 'Медиатека',
    analytics: 'Аналитика',
    domains: 'Пользовательские домены',
    import: 'Импорт CSV',
    audit: 'Журналы аудита',
    settings: 'Настройки'
  },
  sections: {
    corePlatform: 'Основная платформа',
    digitalSolutions: 'Цифровые решения',
    growthIntelligence: 'Аналитика и рост',
    administration: 'Администрирование'
  },
  header: {
    createQr: 'Создать QR',
    switchWorkspace: 'Сменить пространство',
    workspaces: 'Рабочие пространства',
    createNewWorkspace: 'Новое пространство',
    profile: 'Профиль',
    signOut: 'Выйти',
    theme: 'Тема оформления',
    language: 'Язык',
    activeWorkspace: 'Активное пространство'
  },
  overview: {
    ...en.overview,
    welcomeTitle: 'Корпоративное пространство ESAIA',
    enterpriseTier: 'Корпоративный тариф',
    welcomeSubtitle: 'SaaS-платформа для управления динамическими QR-кодами, лендингами и цифровыми визитками.',
    bulkCsvImport: 'Массовый импорт CSV',
    newDynamicQr: 'Новый динамический QR',
    activeClients: 'Активные клиенты',
    dynamicQrCodes: 'Динамические QR',
    totalScans: 'Всего сканирований (30 дней)',
    activeLandingPages: 'Активные лендинги'
  },
  pagesModule: {
    ...en.pagesModule,
    title: 'Динамические лендинги и микросайты',
    subtitle: 'Адаптивные мобильные страницы, цифровые меню и формы сбора контактов.',
    createPage: 'Создать страницу',
    searchPlaceholder: 'Поиск страниц по названию или ссылке...',
    viewsCount: 'просмотров',
    previewLive: 'Предпросмотр',
    openBuilder: 'Открыть редактор'
  },
  qrModule: {
    ...en.qrModule,
    title: 'Управление парком динамических QR',
    subtitle: 'Мгновенная переадресация с возможностью изменения ссылки в реальном времени.',
    createQr: 'Создать QR',
    searchPlaceholder: 'Поиск по названию, коду или адресу...'
  },
  themes: {
    ...en.themes,
    dark: 'Темный сланец',
    light: 'Светлый чистый',
    beige: 'Теплый бежевый',
    selectTheme: 'Выбрать тему'
  },
  actions: {
    ...en.actions,
    create: 'Создать',
    save: 'Сохранить',
    cancel: 'Отмена',
    delete: 'Удалить',
    edit: 'Изменить',
    export: 'Экспорт',
    import: 'Импорт',
    search: 'Поиск...',
    preview: 'Просмотр'
  }
};
