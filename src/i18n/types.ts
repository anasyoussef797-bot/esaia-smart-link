export type SupportedLanguage = 'en' | 'ar' | 'zh' | 'fr' | 'de' | 'es' | 'it' | 'tr' | 'ja' | 'ru';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬', dir: 'rtl' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr' }
];

export interface TranslationSchema {
  nav: {
    overview: string;
    clients: string;
    qr: string;
    pages: string;
    links: string;
    cards: string;
    menus: string;
    templates: string;
    media: string;
    analytics: string;
    domains: string;
    import: string;
    audit: string;
    settings: string;
  };
  sections: {
    corePlatform: string;
    digitalSolutions: string;
    growthIntelligence: string;
    administration: string;
  };
  header: {
    createQr: string;
    switchWorkspace: string;
    workspaces: string;
    createNewWorkspace: string;
    profile: string;
    signOut: string;
    theme: string;
    language: string;
    activeWorkspace: string;
  };
  overview: {
    welcomeTitle: string;
    enterpriseTier: string;
    welcomeSubtitle: string;
    bulkCsvImport: string;
    newDynamicQr: string;
    activeClients: string;
    dynamicQrCodes: string;
    totalScans: string;
    activeLandingPages: string;
    topPerformingQrs: string;
    topPerformingQrsSub: string;
    viewAllQrs: string;
    systemTelemetry: string;
    systemTelemetrySub: string;
    edgeLatency: string;
    uptime: string;
    activeTenants: string;
    activeFleetQrs: string;
    thisMonth: string;
    uptimeMetric: string;
    activeStatus: string;
  };
  pagesModule: {
    title: string;
    subtitle: string;
    createPage: string;
    searchPlaceholder: string;
    viewsCount: string;
    previewLive: string;
    openBuilder: string;
    modalTitle: string;
    modalSubtitle: string;
    pageTitleLabel: string;
    pageTitlePlaceholder: string;
    publicSlugLabel: string;
    publicSlugPlaceholder: string;
    createBtn: string;
    statusPublished: string;
    statusDraft: string;
    statusArchived: string;
  };
  qrModule: {
    title: string;
    subtitle: string;
    createQr: string;
    searchPlaceholder: string;
    totalScans: string;
    uniqueScans: string;
    pauseCampaign: string;
    resumeCampaign: string;
    customDesign: string;
    statusActive: string;
    statusPaused: string;
    modalTitle: string;
    modalSubtitle: string;
    qrNameLabel: string;
    qrNamePlaceholder: string;
    destinationUrlLabel: string;
    destinationUrlPlaceholder: string;
    createBtn: string;
    testRedirect: string;
  };
  clientsModule: {
    title: string;
    subtitle: string;
    addClient: string;
    editClient: string;
    deleteClient: string;
    archiveClient: string;
    searchPlaceholder: string;
    activeProjects: string;
    totalScans: string;
    modalTitle: string;
    modalSubtitle: string;
    editModalTitle: string;
    editModalSubtitle: string;
    companyNameLabel: string;
    contactPersonLabel: string;
    emailLabel: string;
    phoneLabel: string;
    websiteLabel: string;
    whatsappLabel: string;
    addressLabel: string;
    notesLabel: string;
    tagsLabel: string;
    brandColorsTitle: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    logoUploadTitle: string;
    logoUploadDesc: string;
    removeLogo: string;
    brandPreview: string;
    createBtn: string;
    saveBtn: string;
    viewFleet: string;
    viewDetails: string;
    backToList: string;
    clientNotFound: string;
    clientAssets: string;
    qrFleetTab: string;
    pagesTab: string;
    brandKitTab: string;
    overviewTab: string;
    activityTab: string;
    noClients: string;
    noClientsDesc: string;
    allStatus: string;
    activeStatus: string;
    pendingStatus: string;
    archivedStatus: string;
    exportClient: string;
    newQrForClient: string;
    newPageForClient: string;
    readOnlyNotice: string;
  };
  linksModule: {
    title: string;
    subtitle: string;
    createLink: string;
    searchPlaceholder: string;
    clicks: string;
    copied: string;
    copy: string;
    modalTitle: string;
    modalSubtitle: string;
    titleLabel: string;
    destinationLabel: string;
    createBtn: string;
  };
  cardsModule: {
    title: string;
    subtitle: string;
    createCard: string;
    vcardDownloads: string;
    previewCard: string;
    modalTitle: string;
    modalSubtitle: string;
    fullNameLabel: string;
    jobTitleLabel: string;
    companyLabel: string;
    phoneLabel: string;
    emailLabel: string;
    createBtn: string;
  };
  menusModule: {
    title: string;
    subtitle: string;
    createMenu: string;
    menuItems: string;
    guestScans: string;
    viewLiveMenu: string;
    modalTitle: string;
    modalSubtitle: string;
    menuNameLabel: string;
    restaurantLabel: string;
    createBtn: string;
  };
  templatesModule: {
    title: string;
    subtitle: string;
    useTemplate: string;
    categoryHospitality: string;
    categoryNetworking: string;
    categoryEvents: string;
    categorySocial: string;
    tabs?: {
      featured: string;
      landing: string;
      linkInBio: string;
      myTemplates: string;
    };
    aiBanner?: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      cta: string;
    };
    blankTemplate?: {
      title: string;
      subtitle: string;
    };
    sections?: {
      landingPages: string;
      linkInBio: string;
      categories: string;
      collapseCategories: string;
      expandCategories: string;
      viewAll: string;
      searchPlaceholder: string;
      noTemplatesFound: string;
      noSavedTemplates: string;
    };
  };
  mediaModule: {
    title: string;
    subtitle: string;
    uploadAssets: string;
    dragDropText: string;
    deleteAsset: string;
  };
  analyticsModule: {
    title: string;
    subtitle: string;
    exportCsv: string;
    totalScans: string;
    uniqueDevices: string;
    topOs: string;
    peakHour: string;
    osDeviceTypes: string;
    osDeviceDesc: string;
    geoLocations: string;
    geoLocationsDesc: string;
  };
  domainsModule: {
    title: string;
    subtitle: string;
    connectDomain: string;
    dnsSettings: string;
    target: string;
    sslValid: string;
  };
  importModule: {
    title: string;
    subtitle: string;
    downloadTemplate: string;
    uploadFileTitle: string;
    uploadFileDesc: string;
    dropText: string;
    subDropText: string;
    runBatch: string;
    processing: string;
    successMessage: string;
  };
  auditModule: {
    title: string;
    subtitle: string;
    immutableAudit: string;
    target: string;
  };
  settingsModule: {
    title: string;
    subtitle: string;
    organizationInfo: string;
    exportDatabase: string;
    exportDesc: string;
    exportBtn: string;
    teamMembers: string;
    inviteMember: string;
    role: string;
    actions: string;
  };
  themes: {
    dark: string;
    light: string;
    beige: string;
    selectTheme: string;
  };
  actions: {
    create: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    export: string;
    import: string;
    search: string;
    filter: string;
    status: string;
    active: string;
    inactive: string;
    pending: string;
    close: string;
    download: string;
    copyLink: string;
    preview: string;
    details: string;
  };
  rbac: {
    superAdmin: string;
    orgAdmin: string;
    staffEditor: string;
    clientViewer: string;
    sessionPersona: string;
  };
}
