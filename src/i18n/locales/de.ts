import { TranslationSchema } from '../types';
import { en } from './en';

export const de: TranslationSchema = {
  ...en,
  nav: {
    overview: 'Übersicht',
    clients: 'Kunden CRM',
    qr: 'Dynamische QR-Codes',
    pages: 'Landingpages',
    links: 'Smart Links',
    cards: 'Digitale Visitenkarten',
    menus: 'Digitale Speisekarten',
    templates: 'Vorlagen',
    media: 'Medienbibliothek',
    analytics: 'Analysen & Telemetrie',
    domains: 'Eigene Domains',
    import: 'CSV-Import',
    audit: 'Audit-Protokolle',
    settings: 'Einstellungen'
  },
  sections: {
    corePlatform: 'Kernplattform',
    digitalSolutions: 'Digitale Lösungen',
    growthIntelligence: 'Wachstum & Daten',
    administration: 'Verwaltung'
  },
  header: {
    createQr: 'QR erstellen',
    switchWorkspace: 'Arbeitsbereich wechseln',
    workspaces: 'Arbeitsbereiche',
    createNewWorkspace: 'Neuer Arbeitsbereich',
    profile: 'Benutzerprofil',
    signOut: 'Abmelden',
    theme: 'Erscheinungsbild',
    language: 'Sprache',
    activeWorkspace: 'Aktiver Arbeitsbereich'
  },
  overview: {
    ...en.overview,
    welcomeTitle: 'ESAIA Enterprise Workspace',
    enterpriseTier: 'Enterprise-Stufe',
    welcomeSubtitle: 'Unabhängige SaaS-Plattform zur Verwaltung dynamischer QR-Codes, Landingpages und digitaler Visitenkarten.',
    bulkCsvImport: 'Massen-CSV-Import',
    newDynamicQr: 'Neuer dynamischer QR',
    activeClients: 'Aktive Kunden',
    dynamicQrCodes: 'Dynamische QR-Codes',
    totalScans: 'Gesamte Scans (30 Tage)',
    activeLandingPages: 'Aktive Landingpages'
  },
  pagesModule: {
    ...en.pagesModule,
    title: 'Dynamische Landingpages & Micro-Sites',
    subtitle: 'Mobile-First Landingpages, digitale Speisekarten und Kontaktformulare.',
    createPage: 'Landingpage erstellen',
    searchPlaceholder: 'Landingpages nach Titel oder Pfad suchen...',
    viewsCount: 'Aufrufe',
    previewLive: 'Live-Vorschau',
    openBuilder: 'Builder öffnen'
  },
  qrModule: {
    ...en.qrModule,
    title: 'Dynamisches QR-Code-Flottenmanagement',
    subtitle: 'Hochgeschwindigkeits-Weiterleitungs-Engine mit Ziel-Aktualisierung in Echtzeit.',
    createQr: 'Dynamischen QR erstellen',
    searchPlaceholder: 'QR-Codes nach Name, Code oder Ziel durchsuchen...'
  },
  themes: {
    ...en.themes,
    dark: 'Dunkel Schiefer',
    light: 'Hell Sauber',
    beige: 'Warmes Beige',
    selectTheme: 'Design wählen'
  },
  actions: {
    ...en.actions,
    create: 'Erstellen',
    save: 'Speichern',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    export: 'Exportieren',
    import: 'Importieren',
    search: 'Suchen...',
    preview: 'Vorschau'
  }
};
