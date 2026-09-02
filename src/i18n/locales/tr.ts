import { TranslationSchema } from '../types';
import { en } from './en';

export const tr: TranslationSchema = {
  ...en,
  nav: {
    overview: 'Genel Bakış',
    clients: 'Müşteri CRM',
    qr: 'Dinamik QR Kodlar',
    pages: 'Açılış Sayfaları',
    links: 'Akıllı Bağlantılar',
    cards: 'Dijital Kartvizitler',
    menus: 'Dijital Menüler',
    templates: 'Şablonlar',
    media: 'Medya Kitaplığı',
    analytics: 'Analitik & Raporlar',
    domains: 'Özel Alan Adları',
    import: 'Toplu İçe Aktarma',
    audit: 'Denetim Günlükleri',
    settings: 'Ayarlar'
  },
  sections: {
    corePlatform: 'Ana Platform',
    digitalSolutions: 'Dijital Çözümler',
    growthIntelligence: 'Büyüme & Veri',
    administration: 'Yönetim'
  },
  header: {
    createQr: 'QR Oluştur',
    switchWorkspace: 'Çalışma Alanı Değiştir',
    workspaces: 'Çalışma Alanları',
    createNewWorkspace: 'Yeni Alan Oluştur',
    profile: 'Kullanıcı Profili',
    signOut: 'Çıkış Yap',
    theme: 'Tema',
    language: 'Dil',
    activeWorkspace: 'Aktif Alan'
  },
  overview: {
    ...en.overview,
    welcomeTitle: 'ESAIA Kurumsal Çalışma Alanı',
    enterpriseTier: 'Kurumsal Katman',
    welcomeSubtitle: 'Dinamik QR kodları, açılış sayfaları ve dijital kartvizitleri yönetmek için bağımsız SaaS platformu.',
    bulkCsvImport: 'Toplu CSV İçe Aktarma',
    newDynamicQr: 'Yeni Dinamik QR',
    activeClients: 'Aktif Müşteriler',
    dynamicQrCodes: 'Dinamik QR Kodlar',
    totalScans: 'Toplam Tarama (30 Gün)',
    activeLandingPages: 'Aktif Sayfalar'
  },
  pagesModule: {
    ...en.pagesModule,
    title: 'Dinamik Açılış Sayfaları & Mikro Siteler',
    subtitle: 'Mobil öncelikli sayfalar, dijital menüler ve formlar.',
    createPage: 'Sayfa Oluştur',
    searchPlaceholder: 'Başlık veya bağlantıya göre ara...',
    viewsCount: 'görüntülenme',
    previewLive: 'Canlı Önizleme',
    openBuilder: 'Oluşturucuyu Aç'
  },
  qrModule: {
    ...en.qrModule,
    title: 'Dinamik QR Kod Filo Yönetimi',
    subtitle: 'Gerçek zamanlı hedef güncelleme ve yüksek hızlı yönlendirme motoru.',
    createQr: 'Dinamik QR Oluştur',
    searchPlaceholder: 'İsim, kod veya hedefe göre ara...'
  },
  themes: {
    dark: 'Koyu Arduvaz',
    light: 'Açık Temiz',
    beige: 'Sıcak Bej',
    selectTheme: 'Tema Seç'
  },
  actions: {
    ...en.actions,
    create: 'Oluştur',
    save: 'Kaydet',
    cancel: 'İptal',
    delete: 'Sil',
    edit: 'Düzenle',
    export: 'Dışa Aktar',
    import: 'İçe Aktar',
    search: 'Ara...',
    preview: 'Önizleme'
  }
};
