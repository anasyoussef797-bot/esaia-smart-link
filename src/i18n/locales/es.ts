import { TranslationSchema } from '../types';
import { en } from './en';

export const es: TranslationSchema = {
  ...en,
  nav: {
    overview: 'Panel Principal',
    clients: 'CRM de Clientes',
    qr: 'Códigos QR Dinámicos',
    pages: 'Páginas de Destino',
    links: 'Enlaces Inteligentes',
    cards: 'Tarjetas de Presentación',
    menus: 'Menús Digitales',
    templates: 'Plantillas',
    media: 'Biblioteca Multimedia',
    analytics: 'Analítica y Telemetría',
    domains: 'Dominios Personalizados',
    import: 'Migración CSV',
    audit: 'Registros de Auditoría',
    settings: 'Configuración'
  },
  sections: {
    corePlatform: 'Plataforma Principal',
    digitalSolutions: 'Soluciones Digitales',
    growthIntelligence: 'Crecimiento y Datos',
    administration: 'Administración'
  },
  header: {
    createQr: 'Crear QR',
    switchWorkspace: 'Cambiar Espacio',
    workspaces: 'Espacios de Trabajo',
    createNewWorkspace: 'Crear Espacio',
    profile: 'Perfil de Usuario',
    signOut: 'Cerrar Sesión',
    theme: 'Tema',
    language: 'Idioma',
    activeWorkspace: 'Espacio Activo'
  },
  overview: {
    ...en.overview,
    welcomeTitle: 'Espacio Empresarial ESAIA',
    enterpriseTier: 'Nivel Empresarial',
    welcomeSubtitle: 'Plataforma SaaS independiente para gestionar códigos QR dinámicos, páginas de destino y tarjetas vCard.',
    bulkCsvImport: 'Importación Masiva CSV',
    newDynamicQr: 'Nuevo QR Dinámico',
    activeClients: 'Clientes Activos',
    dynamicQrCodes: 'Códigos QR Dinámicos',
    totalScans: 'Escaneos Totales (30 Días)',
    activeLandingPages: 'Páginas de Destino Activas'
  },
  pagesModule: {
    ...en.pagesModule,
    title: 'Páginas de Destino y Micro-Sitios',
    subtitle: 'Páginas web optimizadas para móviles, menús digitales y portales interactivos.',
    createPage: 'Crear Página',
    searchPlaceholder: 'Buscar páginas por título o enlace (/p/*)...',
    viewsCount: 'vistas',
    previewLive: 'Vista Previa',
    openBuilder: 'Abrir Constructor'
  },
  qrModule: {
    ...en.qrModule,
    title: 'Gestión de Códigos QR Dinámicos',
    subtitle: 'Motor de redireccionamiento rápido con actualización de destino en tiempo real.',
    createQr: 'Crear QR Dinámico',
    searchPlaceholder: 'Buscar códigos QR por nombre, código o URL...'
  },
  themes: {
    dark: 'Pizarra Oscura',
    light: 'Claro Limpio',
    beige: 'Beige Cálido',
    selectTheme: 'Seleccionar Tema'
  },
  actions: {
    ...en.actions,
    create: 'Crear',
    save: 'Guardar Cambios',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    export: 'Exportar Datos',
    import: 'Importar CSV',
    search: 'Buscar...',
    preview: 'Vista Previa'
  }
};
