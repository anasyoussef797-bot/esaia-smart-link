import { TranslationSchema } from '../types';
import { en } from './en';

export const fr: TranslationSchema = {
  ...en,
  nav: {
    overview: 'Tableau de bord',
    clients: 'Gestion Clients CRM',
    qr: 'QR Codes Dynamiques',
    pages: 'Pages d\'atterrissage',
    links: 'Liens Intelligents',
    cards: 'Cartes de Visite',
    menus: 'Menus Numériques',
    templates: 'Modèles',
    media: 'Médiathèque',
    analytics: 'Statistiques & Télémétrie',
    domains: 'Domaines Personnalisés',
    import: 'Migration CSV',
    audit: 'Journaux d\'Audit',
    settings: 'Paramètres'
  },
  sections: {
    corePlatform: 'Plateforme Principale',
    digitalSolutions: 'Solutions Numériques',
    growthIntelligence: 'Croissance & Données',
    administration: 'Administration'
  },
  header: {
    createQr: 'Créer un QR',
    switchWorkspace: 'Changer d\'espace',
    workspaces: 'Espaces de travail',
    createNewWorkspace: 'Nouvel espace',
    profile: 'Profil utilisateur',
    signOut: 'Déconnexion',
    theme: 'Thème',
    language: 'Langue',
    activeWorkspace: 'Espace actif'
  },
  overview: {
    ...en.overview,
    welcomeTitle: 'Espace Entreprise ESAIA',
    enterpriseTier: 'Niveau Entreprise',
    welcomeSubtitle: 'Plateforme SaaS indépendante de gestion de QR codes dynamiques, pages d\'atterrissage et cartes de visite interactives.',
    bulkCsvImport: 'Importation CSV Groupée',
    newDynamicQr: 'Nouveau QR Dynamique',
    activeClients: 'Clients Actifs',
    dynamicQrCodes: 'QR Codes Dynamiques',
    totalScans: 'Scans Totaux (30 Jours)',
    activeLandingPages: 'Pages Actives'
  },
  pagesModule: {
    ...en.pagesModule,
    title: 'Pages d\'atterrissage & Micro-Sites',
    subtitle: 'Pages réactives optimisées mobile, menus numériques, portails de liens et formulaires.',
    createPage: 'Créer une page',
    searchPlaceholder: 'Rechercher par titre ou slug (/p/*)...',
    viewsCount: 'vues',
    previewLive: 'Aperçu en direct',
    openBuilder: 'Ouvrir le constructeur'
  },
  qrModule: {
    ...en.qrModule,
    title: 'Gestion de flotte de QR Codes Dynamiques',
    subtitle: 'Moteur de redirection haute vitesse avec mise à jour en temps réel des destinations.',
    createQr: 'Créer un QR Dynamique',
    searchPlaceholder: 'Rechercher un QR code par nom, code ou URL...'
  },
  themes: {
    ...en.themes,
    dark: 'Sombre Ardoise',
    light: 'Clair Moderne',
    beige: 'Beige Chaleureux',
    selectTheme: 'Choisir le thème'
  },
  actions: {
    ...en.actions,
    create: 'Créer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    export: 'Exporter',
    import: 'Importer',
    search: 'Rechercher...',
    preview: 'Aperçu'
  }
};
