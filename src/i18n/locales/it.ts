import { TranslationSchema } from '../types';
import { en } from './en';

export const it: TranslationSchema = {
  ...en,
  nav: {
    overview: 'Panoramica',
    clients: 'CRM Clienti',
    qr: 'Codici QR Dinamici',
    pages: 'Pagine di Destinazione',
    links: 'Link Intelligenti',
    cards: 'Biglietti da Visita',
    menus: 'Menu Digitali',
    templates: 'Modelli',
    media: 'Libreria Media',
    analytics: 'Analisi & Statistiche',
    domains: 'Domini Personalizzati',
    import: 'Migrazione CSV',
    audit: 'Registri di Controllo',
    settings: 'Impostazioni'
  },
  sections: {
    corePlatform: 'Piattaforma Principale',
    digitalSolutions: 'Soluzioni Digitali',
    growthIntelligence: 'Crescita & Dati',
    administration: 'Amministrazione'
  },
  header: {
    createQr: 'Crea QR',
    switchWorkspace: 'Cambia Spazio',
    workspaces: 'Spazi di Lavoro',
    createNewWorkspace: 'Nuovo Spazio',
    profile: 'Profilo Utente',
    signOut: 'Disconnetti',
    theme: 'Tema',
    language: 'Lingua',
    activeWorkspace: 'Spazio Attivo'
  },
  overview: {
    ...en.overview,
    welcomeTitle: 'Spazio Aziendale ESAIA',
    enterpriseTier: 'Livello Enterprise',
    welcomeSubtitle: 'Piattaforma SaaS indipendente per la gestione di codici QR dinamici, landing page e vCard digitali.',
    bulkCsvImport: 'Importazione CSV',
    newDynamicQr: 'Nuovo QR Dinamico',
    activeClients: 'Clienti Attivi',
    dynamicQrCodes: 'Codici QR Dinamici',
    totalScans: 'Scansioni Totali (30 Giorni)',
    activeLandingPages: 'Pagine Attive'
  },
  pagesModule: {
    ...en.pagesModule,
    title: 'Landing Page & Micro-Siti Dinamici',
    subtitle: 'Pagine responsive ottimizzate per dispositivi mobili, menu digitali e moduli di contatto.',
    createPage: 'Crea Pagina',
    searchPlaceholder: 'Cerca pagine per titolo o percorso...',
    viewsCount: 'visualizzazioni',
    previewLive: 'Anteprima dal Vivo',
    openBuilder: 'Apri Costruttore'
  },
  qrModule: {
    ...en.qrModule,
    title: 'Gestione Flotta Codici QR Dinamici',
    subtitle: 'Motore di reindirizzamento ultraveloce con aggiornamento destinazioni in tempo reale.',
    createQr: 'Crea QR Dinamico',
    searchPlaceholder: 'Cerca per nome, codice o destinazione...'
  },
  themes: {
    ...en.themes,
    dark: 'Ardesia Scura',
    light: 'Chiaro Pulito',
    beige: 'Beige Caldo',
    selectTheme: 'Seleziona Tema'
  },
  actions: {
    ...en.actions,
    create: 'Crea',
    save: 'Salva',
    cancel: 'Annulla',
    delete: 'Elimina',
    edit: 'Modifica',
    export: 'Esporta',
    import: 'Importa',
    search: 'Cerca...',
    preview: 'Anteprima'
  }
};
