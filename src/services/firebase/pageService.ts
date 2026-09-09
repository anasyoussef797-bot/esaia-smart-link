/**
 * ESAIA - Landing Page, Digital Business Card & Menu Builder Service
 * Robust Firestore integration with offline cache fallback, full block orchestration,
 * and 1-click dynamic QR synchronization.
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { Page, PageStatus, PageThemeConfig } from '../../types/page';
import { qrService } from './qrService';

export const DEFAULT_THEME_DARK: PageThemeConfig = {
  preset: 'dark',
  palette: {
    background: '#090a0f',
    cardBackground: '#141722',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    primaryAction: '#3b82f6',
    primaryActionText: '#ffffff',
    accent: '#6366f1',
    border: '#24293d'
  },
  typography: {
    fontFamily: 'Plus Jakarta Sans',
    headingFont: 'Plus Jakarta Sans',
    baseFontSize: 16
  },
  buttonStyle: 'filled',
  borderRadius: 'lg',
  shadowLevel: 'md',
  backgroundStyle: 'solid'
};

export const DEFAULT_THEME_LIGHT: PageThemeConfig = {
  preset: 'light',
  palette: {
    background: '#f8fafc',
    cardBackground: '#ffffff',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    primaryAction: '#2563eb',
    primaryActionText: '#ffffff',
    accent: '#3b82f6',
    border: '#e2e8f0'
  },
  typography: {
    fontFamily: 'Plus Jakarta Sans',
    headingFont: 'Plus Jakarta Sans',
    baseFontSize: 16
  },
  buttonStyle: 'filled',
  borderRadius: 'lg',
  shadowLevel: 'sm',
  backgroundStyle: 'solid'
};

export const DEFAULT_THEME_BEIGE: PageThemeConfig = {
  preset: 'beige',
  palette: {
    background: '#f6f3eb',
    cardBackground: '#ffffff',
    textPrimary: '#1c1917',
    textSecondary: '#78716c',
    primaryAction: '#78350f',
    primaryActionText: '#ffffff',
    accent: '#b45309',
    border: '#e7e5e4'
  },
  typography: {
    fontFamily: 'Plus Jakarta Sans',
    headingFont: 'Playfair Display',
    baseFontSize: 16
  },
  buttonStyle: 'filled',
  borderRadius: 'lg',
  shadowLevel: 'md',
  backgroundStyle: 'solid'
};

const INITIAL_DEMO_PAGES: Page[] = [
  {
    id: 'page_hub_welcome',
    orgId: 'org_esaia_main',
    clientId: 'client_impact_hub',
    qrCodeId: 'qr_hub_wifi',
    title: 'Impact Hub Cairo - Welcome Portal',
    slug: 'hub-welcome',
    pageType: 'landing',
    status: 'published',
    themeConfig: {
      ...DEFAULT_THEME_DARK,
      palette: {
        ...DEFAULT_THEME_DARK.palette,
        primaryAction: '#e11d48',
        accent: '#f43f5e'
      }
    },
    seo: {
      metaTitle: 'Impact Hub Cairo - Official Welcome & Coworking Portal',
      metaDescription: 'Access high-speed WiFi, event schedules, meeting rooms, and innovation network in Garden City, Cairo.',
      ogImageUrl: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_hero_1',
        type: 'hero',
        title: 'Welcome to Impact Hub Cairo',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Impact Hub Cairo',
          subtitle: 'Innovation ecosystem, premium coworking & venture incubator in Garden City.',
          badge: 'Official Member & Visitor Portal',
          coverUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&auto=format&fit=crop&q=80',
          avatarUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_btn_wifi',
        type: 'button',
        title: 'WiFi Connection',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Connect to Member High-Speed WiFi',
          subtext: 'Instant 500Mbps WPA3 encrypted connection',
          url: 'https://cairo.impacthub.net/wifi',
          variant: 'primary',
          icon: 'Wifi'
        }
      },
      {
        id: 'b_btn_whatsapp',
        type: 'whatsapp_button',
        title: 'Reception Chat',
        isVisible: true,
        orderIndex: 2,
        content: {
          phoneNumber: '+201001234567',
          buttonText: 'Chat with Community Reception',
          prefilledMessage: 'Hi Impact Hub Team! I am at the hub and have a quick inquiry.'
        }
      },
      {
        id: 'b_btn_booking',
        type: 'button',
        title: 'Meeting Room Booking',
        isVisible: true,
        orderIndex: 3,
        content: {
          label: 'Book a Meeting Room or Podcast Studio',
          subtext: 'Real-time room availability & instant booking',
          url: 'https://cairo.impacthub.net/book',
          variant: 'outline',
          icon: 'Calendar'
        }
      },
      {
        id: 'b_hours_1',
        type: 'business_hours',
        title: 'Hub Hours',
        isVisible: true,
        orderIndex: 4,
        content: {
          title: 'Opening Hours & Access',
          days: [
            { day: 'Sunday - Thursday', open: '08:00 AM', close: '10:00 PM', isClosed: false },
            { day: 'Friday', open: '10:00 AM', close: '08:00 PM', isClosed: false },
            { day: 'Saturday', open: '09:00 AM', close: '09:00 PM', isClosed: false }
          ],
          note: '24/7 keycard access active for Dedicated Desk & Private Office members.'
        }
      },
      {
        id: 'b_map_1',
        type: 'map_location',
        title: 'Hub Location',
        isVisible: true,
        orderIndex: 5,
        content: {
          locationTitle: 'Garden City Campus',
          address: '1 Latin America St, Garden City, Cairo, Egypt',
          directionsUrl: 'https://maps.google.com/?q=Impact+Hub+Cairo+Garden+City'
        }
      },
      {
        id: 'b_socials_1',
        type: 'social_links',
        title: 'Connect with Us',
        isVisible: true,
        orderIndex: 6,
        content: {
          links: [
            { platform: 'instagram', url: 'https://instagram.com/impacthubcairo' },
            { platform: 'linkedin', url: 'https://linkedin.com/company/impact-hub-cairo' },
            { platform: 'facebook', url: 'https://facebook.com/impacthubcairo' },
            { platform: 'website', url: 'https://cairo.impacthub.net' }
          ]
        }
      }
    ],
    viewCount: 14820,
    publishedAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page_apex_tariq',
    orgId: 'org_esaia_main',
    clientId: 'client_apex_capital',
    qrCodeId: null,
    title: 'Tariq Al-Masri - Managing Partner vCard',
    slug: 'apex-tariq-vcard',
    pageType: 'business_card',
    status: 'published',
    themeConfig: {
      ...DEFAULT_THEME_DARK,
      palette: {
        background: '#0a0d14',
        cardBackground: '#131926',
        textPrimary: '#ffffff',
        textSecondary: '#94a3b8',
        primaryAction: '#2563eb',
        primaryActionText: '#ffffff',
        accent: '#60a5fa',
        border: '#1e293b'
      },
      buttonStyle: 'filled',
      borderRadius: 'lg'
    },
    seo: {
      metaTitle: 'Tariq Al-Masri | Managing Partner at Apex Capital Partners',
      metaDescription: 'Digital Business Card & Contact profile for Tariq Al-Masri, Managing Partner at Apex Capital Partners Abu Dhabi.',
      ogImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_vcard_header',
        type: 'vcard_header',
        title: 'Executive Profile',
        isVisible: true,
        orderIndex: 0,
        content: {
          fullName: 'Tariq Al-Masri',
          jobTitle: 'Managing Partner',
          company: 'Apex Capital Partners',
          department: 'Private Equity & MENA Growth Fund',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
          coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80',
          bio: 'Advising institutional LP capital, tech growth buyout transactions, and sovereign co-investments across UAE, KSA, and Egypt.',
          phone: '+971 50 123 9988',
          workPhone: '+971 4 300 9900',
          email: 'tariq@apexcap.ae',
          workEmail: 'partners@apexcap.ae',
          website: 'https://apexcap.ae',
          address: 'Level 24, Al Khatem Tower, ADGM Square, Al Maryah Island, Abu Dhabi, UAE',
          whatsapp: '+971501239988',
          saveContactButtonText: 'Save Contact to Phone (.vcf)'
        }
      },
      {
        id: 'b_btn_whatsapp_tariq',
        type: 'whatsapp_button',
        title: 'WhatsApp Contact',
        isVisible: true,
        orderIndex: 1,
        content: {
          phoneNumber: '+971501239988',
          buttonText: 'Message via WhatsApp Directly',
          prefilledMessage: 'Hi Tariq, pleasure connecting with you.'
        }
      },
      {
        id: 'b_btn_meeting',
        type: 'button',
        title: 'Schedule 1-on-1',
        isVisible: true,
        orderIndex: 2,
        content: {
          label: 'Schedule 30-Min Introductory Call',
          subtext: 'Private Partner Calendar (ADGM Abu Dhabi Time)',
          url: 'https://calendly.com/tariq-apexcap',
          variant: 'outline',
          icon: 'Calendar'
        }
      },
      {
        id: 'b_socials_tariq',
        type: 'social_links',
        title: 'Professional Profiles',
        isVisible: true,
        orderIndex: 3,
        content: {
          links: [
            { platform: 'linkedin', url: 'https://linkedin.com/in/tariq-almasri' },
            { platform: 'x', url: 'https://x.com/tariq_apex' },
            { platform: 'website', url: 'https://apexcap.ae' }
          ]
        }
      }
    ],
    viewCount: 3190,
    publishedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page_nile_menu',
    orgId: 'org_esaia_main',
    clientId: 'client_nile_roastery',
    qrCodeId: 'qr_nile_loyalty',
    title: 'Nile Artisan Roastery - Summer 2026 Specialty Menu',
    slug: 'nile-menu-2026',
    pageType: 'menu',
    status: 'published',
    themeConfig: {
      preset: 'beige',
      palette: {
        background: '#fcfbf7',
        cardBackground: '#ffffff',
        textPrimary: '#1c1917',
        textSecondary: '#78716c',
        primaryAction: '#92400e',
        primaryActionText: '#ffffff',
        accent: '#d97706',
        border: '#e7e5e4'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Playfair Display',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'lg',
      shadowLevel: 'sm',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Nile Artisan Roastery | Summer 2026 Specialty Coffee & Bakery Menu',
      metaDescription: 'Freshly roasted single-origin coffees, handcrafted sourdough pastries, and breakfast plates in Zamalek, Cairo.',
      ogImageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_hero_nile',
        type: 'hero',
        title: 'Nile Roastery Summer Menu',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Nile Artisan Roastery',
          subtitle: 'Specialty micro-batch coffees roasted in Zamalek & fresh sourdough pastries.',
          badge: 'Table-Side Digital Menu',
          coverUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1000&auto=format&fit=crop&q=80',
          avatarUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_cat_espresso',
        type: 'menu_category',
        title: 'Category: Espresso Bar',
        isVisible: true,
        orderIndex: 1,
        content: {
          name: 'Espresso & Milk Craft',
          description: 'Brewed on Synesso MVP Hydra with whole organic or oat milk.'
        }
      },
      {
        id: 'b_item_flat_white',
        type: 'menu_item',
        title: 'Flat White / Cortado',
        isVisible: true,
        orderIndex: 2,
        content: {
          name: 'Signature Flat White / Cortado',
          description: 'Double ristretto shot with micro-foamed silky steamed milk.',
          price: 85,
          currency: 'EGP',
          category: 'Espresso & Milk Craft',
          imageUrl: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=300&auto=format&fit=crop&q=80',
          dietaryBadges: ['vegetarian'],
          enableWhatsAppOrder: true
        }
      },
      {
        id: 'b_item_spanish',
        type: 'menu_item',
        title: 'Spanish Iced Latte',
        isVisible: true,
        orderIndex: 3,
        content: {
          name: 'Spanish Iced Latte',
          description: 'Espresso shaken with sweetened condensed milk and served over crystal ice blocks.',
          price: 95,
          currency: 'EGP',
          category: 'Espresso & Milk Craft',
          imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&auto=format&fit=crop&q=80',
          dietaryBadges: ['chef_special'],
          enableWhatsAppOrder: true
        }
      },
      {
        id: 'b_cat_filter',
        type: 'menu_category',
        title: 'Category: Single Origin Filter',
        isVisible: true,
        orderIndex: 4,
        content: {
          name: 'Single Origin Filter & V60',
          description: 'Slow pour-over bar using Kalita Wave and Hario V60 drippers.'
        }
      },
      {
        id: 'b_item_yirga',
        type: 'menu_item',
        title: 'Ethiopia Yirgacheffe Chelchele',
        isVisible: true,
        orderIndex: 5,
        content: {
          name: 'Ethiopia Yirgacheffe Chelchele (Washed)',
          description: 'Complex floral aromas with notes of bergamot, peach blossom, and bright citrus.',
          price: 110,
          currency: 'EGP',
          category: 'Single Origin Filter & V60',
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&auto=format&fit=crop&q=80',
          dietaryBadges: ['vegan', 'chef_special'],
          enableWhatsAppOrder: true
        }
      },
      {
        id: 'b_cat_bakery',
        type: 'menu_category',
        title: 'Category: Artisanal Bakery',
        isVisible: true,
        orderIndex: 6,
        content: {
          name: 'Sourdough Bakery & Brunch',
          description: 'Baked fresh daily at 6:00 AM using French Normandy butter.'
        }
      },
      {
        id: 'b_item_croissant',
        type: 'menu_item',
        title: 'Pistachio Cruffin',
        isVisible: true,
        orderIndex: 7,
        content: {
          name: 'Bronte Pistachio Cruffin',
          description: 'Flaky caramelised croissant dough filled with Sicilian pistachio ganache.',
          price: 135,
          currency: 'EGP',
          category: 'Sourdough Bakery & Brunch',
          imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=80',
          dietaryBadges: ['vegetarian', 'chef_special'],
          enableWhatsAppOrder: true
        }
      },
      {
        id: 'b_hours_nile',
        type: 'business_hours',
        title: 'Roastery Hours',
        isVisible: true,
        orderIndex: 8,
        content: {
          title: 'Opening Hours',
          days: [
            { day: 'Every Day (Mon - Sun)', open: '07:30 AM', close: '11:30 PM', isClosed: false }
          ],
          note: 'Last pour-over order at 11:00 PM.'
        }
      },
      {
        id: 'b_order_nile_wa',
        type: 'whatsapp_button',
        title: 'Table Order WhatsApp',
        isVisible: true,
        orderIndex: 9,
        content: {
          phoneNumber: '+201029876543',
          buttonText: 'Order Table Delivery via WhatsApp',
          prefilledMessage: 'Hi Nile Roastery! I am seated at Table [ ] and would like to order:'
        }
      }
    ],
    viewCount: 6850,
    publishedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page_lumiere_resort',
    orgId: 'org_esaia_main',
    clientId: 'client_lumiere_resort',
    qrCodeId: null,
    title: 'Lumière Beach Resort - Guest Experience Compendium',
    slug: 'lumiere-concierge',
    pageType: 'landing',
    status: 'published',
    themeConfig: {
      ...DEFAULT_THEME_BEIGE,
      palette: {
        background: '#f4efe6',
        cardBackground: '#fdfcf9',
        textPrimary: '#132a2a',
        textSecondary: '#4a6363',
        primaryAction: '#0d9488',
        primaryActionText: '#ffffff',
        accent: '#14b8a6',
        border: '#ded7c8'
      }
    },
    seo: {
      metaTitle: 'Lumière Beach Resort & Spa | Contactless Guest Compendium',
      metaDescription: 'Instant access to in-room dining, spa treatment reservations, and catamaran sunset excursions in El Gouna.',
      ogImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_hero_lumiere',
        type: 'hero',
        title: 'Lumiere Resort Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Lumière Beach Resort & Spa',
          subtitle: 'Welcome to your coastal sanctuary on the pristine waters of El Gouna.',
          badge: 'In-Room Contactless Guest Service',
          coverUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&auto=format&fit=crop&q=80',
          avatarUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=150&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_btn_dining',
        type: 'button',
        title: 'In-Room Dining',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'In-Room Dining & 24/7 Room Service',
          subtext: 'Chef curated Mediterranean & seafood specialties',
          url: 'https://lumiere-resorts.com/dining',
          variant: 'primary',
          icon: 'Utensils'
        }
      },
      {
        id: 'b_btn_spa',
        type: 'button',
        title: 'Thalasso Spa Reservation',
        isVisible: true,
        orderIndex: 2,
        content: {
          label: 'Book Spa & Ayurvedic Therapies',
          subtext: 'Signature mineral baths & couples massage',
          url: 'https://lumiere-resorts.com/spa',
          variant: 'outline',
          icon: 'Sparkles'
        }
      },
      {
        id: 'b_wa_concierge',
        type: 'whatsapp_button',
        title: 'WhatsApp Concierge',
        isVisible: true,
        orderIndex: 3,
        content: {
          phoneNumber: '+201225554321',
          buttonText: 'Chat with 24/7 VIP Concierge Desk',
          prefilledMessage: 'Good day Concierge, I am staying in Villa/Room [ ] and require assistance with:'
        }
      },
      {
        id: 'b_hours_resort',
        type: 'business_hours',
        title: 'Resort Amenities Schedule',
        isVisible: true,
        orderIndex: 4,
        content: {
          title: 'Resort Facilities Hours',
          days: [
            { day: 'Infinity Beach Club Pool', open: '07:00 AM', close: 'Sunset', isClosed: false },
            { day: 'Azure Thalasso Spa', open: '09:00 AM', close: '09:00 PM', isClosed: false },
            { day: 'Sea Breeze Fine Dining', open: '06:30 PM', close: '11:00 PM', isClosed: false }
          ],
          note: 'Emergency front desk extension #0 is staffed 24 hours daily.'
        }
      }
    ],
    viewCount: 4300,
    publishedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const LOCAL_PAGES_STORE_KEY = 'esaia_pages_store';

function loadStoredPages(): Page[] {
  try {
    const raw = localStorage.getItem(LOCAL_PAGES_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }
  return [...INITIAL_DEMO_PAGES];
}

function persistPages(pages: Page[]) {
  try {
    localStorage.setItem(LOCAL_PAGES_STORE_KEY, JSON.stringify(pages));
  } catch (e) {
    // ignore
  }
}

let inMemoryPages: Page[] = loadStoredPages();

export const pageService = {
  async getPagesByOrg(orgId: string, clientId?: string): Promise<Page[]> {
    const colPath = 'pages';
    if (isFirebaseConfigured) {
      try {
        let q = query(collection(db, colPath), where('orgId', '==', orgId));
        if (clientId && clientId !== 'all') {
          q = query(q, where('clientId', '==', clientId));
        }
        const snap = await Promise.race([
          getDocs(q),
          new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2000))
        ]);
        if (snap && !snap.empty) {
          const firestorePages = snap.docs.map((d: any) => ({ id: d.id, ...(d.data() as any) } as Page));
          firestorePages.forEach((p: Page) => {
            const idx = inMemoryPages.findIndex(m => m.id === p.id);
            if (idx >= 0) inMemoryPages[idx] = p;
            else inMemoryPages.push(p);
          });
          persistPages(inMemoryPages);
          return firestorePages;
        }
      } catch (err) {
        // Offline fallback
      }
    }

    return inMemoryPages.filter(p => {
      if (clientId && clientId !== 'all' && p.clientId !== clientId) return false;
      return true;
    });
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    const cleanSlug = slug.toLowerCase().trim();
    // 1. Instant check in memory
    const found = inMemoryPages.find(p => p.slug.toLowerCase() === cleanSlug);
    if (found) return found;

    const colPath = 'pages';
    if (isFirebaseConfigured) {
      try {
        const q = query(collection(db, colPath), where('slug', '==', cleanSlug));
        const snap = await Promise.race([
          getDocs(q),
          new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2000))
        ]);
        if (snap && !snap.empty) {
          const d = snap.docs[0];
          const page = { id: d.id, ...(d.data() as any) } as Page;
          inMemoryPages.unshift(page);
          persistPages(inMemoryPages);
          return page;
        }
      } catch (err) {
        // Offline fallback
      }
    }

    return null;
  },

  async getPageById(pageId: string): Promise<Page | null> {
    // 1. Instant local lookup
    const found = inMemoryPages.find(p => p.id === pageId);
    if (found) return found;

    if (isFirebaseConfigured) {
      try {
        const snap = await Promise.race([
          getDoc(doc(db, 'pages', pageId)),
          new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2000))
        ]);
        if (snap && snap.exists()) {
          const page = { id: snap.id, ...(snap.data() as any) } as Page;
          inMemoryPages.unshift(page);
          persistPages(inMemoryPages);
          return page;
        }
      } catch (err) {
        // Offline fallback
      }
    }
    return null;
  },

  async createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>): Promise<string> {
    const newId = `page_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const fullPage: Page = {
      ...page,
      id: newId,
      viewCount: 0,
      createdAt: now,
      updatedAt: now
    };

    inMemoryPages.unshift(fullPage);
    persistPages(inMemoryPages);

    if (isFirebaseConfigured) {
      // Background non-blocking sync with timeout
      (async () => {
        try {
          const newRef = doc(db, 'pages', newId);
          await Promise.race([
            setDoc(newRef, {
              ...fullPage,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2500))
          ]);
        } catch (err) {
          console.warn('Background Firestore write skipped or timed out:', err);
        }
      })();
    }

    return newId;
  },

  async updatePage(pageId: string, updates: Partial<Page>): Promise<void> {
    const idx = inMemoryPages.findIndex(p => p.id === pageId);
    const now = new Date().toISOString();
    if (idx >= 0) {
      inMemoryPages[idx] = {
        ...inMemoryPages[idx],
        ...updates,
        updatedAt: now
      };
      persistPages(inMemoryPages);
    } else {
      inMemoryPages.unshift({
        id: pageId,
        orgId: 'org_esaia_main',
        clientId: 'client_impact_hub',
        title: 'Landing Page',
        slug: pageId,
        pageType: 'landing',
        status: 'published',
        seo: { metaTitle: 'Landing Page', metaDescription: '' },
        themeConfig: DEFAULT_THEME_DARK,
        blocks: [],
        viewCount: 0,
        createdAt: now,
        ...updates,
        updatedAt: now
      });
      persistPages(inMemoryPages);
    }

    if (isFirebaseConfigured) {
      (async () => {
        try {
          await Promise.race([
            setDoc(doc(db, 'pages', pageId), {
              ...updates,
              updatedAt: serverTimestamp()
            }, { merge: true }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2500))
          ]);
        } catch (err) {
          console.warn('Background Firestore update skipped or timed out:', err);
        }
      })();
    }
  },

  async savePage(page: Page): Promise<void> {
    const idx = inMemoryPages.findIndex(p => p.id === page.id);
    const now = new Date().toISOString();
    if (idx >= 0) {
      inMemoryPages[idx] = {
        ...inMemoryPages[idx],
        ...page,
        updatedAt: now
      };
    } else {
      inMemoryPages.unshift({
        ...page,
        viewCount: page.viewCount || 0,
        createdAt: page.createdAt || now,
        updatedAt: now
      });
    }
    persistPages(inMemoryPages);

    if (isFirebaseConfigured) {
      (async () => {
        try {
          await setDoc(doc(db, 'pages', page.id), {
            ...page,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.warn('Background Firestore savePage fallback:', err);
        }
      })();
    }
  },

  async updatePageStatus(pageId: string, status: PageStatus): Promise<void> {
    const updates: Partial<Page> = { status };
    if (status === 'published') {
      updates.publishedAt = new Date().toISOString();
    }
    return this.updatePage(pageId, updates);
  },

  async deletePage(pageId: string): Promise<void> {
    inMemoryPages = inMemoryPages.filter(p => p.id !== pageId);
    persistPages(inMemoryPages);

    if (isFirebaseConfigured) {
      (async () => {
        try {
          await Promise.race([
            deleteDoc(doc(db, 'pages', pageId)),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2500))
          ]);
        } catch (err) {
          console.warn('Background Firestore delete skipped or timed out:', err);
        }
      })();
    }
  },

  async duplicatePage(pageId: string): Promise<string> {
    const original = await this.getPageById(pageId);
    if (!original) throw new Error('Page not found');

    const copySlug = `${original.slug}-copy-${Math.random().toString(36).substring(2, 5)}`;
    return this.createPage({
      orgId: original.orgId,
      clientId: original.clientId,
      qrCodeId: null,
      title: `${original.title} (Copy)`,
      slug: copySlug,
      pageType: original.pageType,
      status: 'draft',
      seo: { ...original.seo, metaTitle: `${original.seo.metaTitle} (Copy)` },
      themeConfig: { ...original.themeConfig },
      blocks: original.blocks.map(b => ({ ...b, id: `b_${Date.now()}_${Math.random().toString(36).substring(2, 6)}` }))
    });
  },

  /**
   * 1-Click Dynamic QR Binding
   * Links a dynamic QR to this page and synchronizes the server redirect cache
   */
  async bindQrToPage(pageId: string, qrId: string, pageSlugFallback?: string): Promise<void> {
    const page = inMemoryPages.find(p => p.id === pageId);
    const slug = page?.slug || pageSlugFallback || pageId;

    // 1. Update Page locally & in db
    await this.updatePage(pageId, { qrCodeId: qrId });

    // 2. Update QR destination to /p/:slug
    await qrService.updateDestination(qrId, `/p/${slug}`, 'page', pageId);
  },

  async unbindQrFromPage(pageId: string): Promise<void> {
    await this.updatePage(pageId, { qrCodeId: null });
  },

  async incrementPageView(slug: string): Promise<void> {
    const page = inMemoryPages.find(p => p.slug === slug);
    if (page) {
      page.viewCount = (page.viewCount || 0) + 1;
      persistPages(inMemoryPages);
    }
  }
};
