/**
 * ESAIA - Client CRM Service
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
import { Client, ClientStatus } from '../../types/client';
import { QrCode } from '../../types/qr';
import { Page } from '../../types/page';
import { handleFirestoreError, OperationType } from './firestoreErrors';

const INITIAL_DEMO_CLIENTS: Client[] = [
  {
    id: 'client_impact_hub',
    orgId: 'org_esaia_main',
    companyName: 'Impact Hub Cairo',
    contactPerson: 'Karim Mansour',
    email: 'karim@impacthub.eg',
    phone: '+20 100 123 4567',
    whatsapp: '+201001234567',
    website: 'https://cairo.impacthub.net',
    address: '1 Latin America St, Garden City, Cairo',
    brandColors: {
      primary: '#e11d48',
      secondary: '#1e293b',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#0f172a'
    },
    logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    notes: 'Premium co-working & innovation ecosystem hub in Cairo. Hosts regular tech events.',
    tags: ['Co-Working', 'Tech', 'VIP', 'Hospitality'],
    stats: { totalQrCodes: 24, totalPages: 8, totalScansAllTime: 42100, scansLast30Days: 14820 },
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'client_nile_roastery',
    orgId: 'org_esaia_main',
    companyName: 'Nile Artisan Roastery',
    contactPerson: 'Farida Selim',
    email: 'farida@nilecoffee.com',
    phone: '+20 102 987 6543',
    whatsapp: '+201029876543',
    website: 'https://nilecoffee.com',
    address: '14 Brazil St, Zamalek, Cairo',
    brandColors: {
      primary: '#92400e',
      secondary: '#451a03',
      accent: '#d97706',
      background: '#fffbeb',
      text: '#292524'
    },
    logoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    notes: 'Specialty single-origin coffee roaster with 6 branches and QR table ordering.',
    tags: ['F&B', 'Specialty Coffee', 'Retail', 'Digital Menu'],
    stats: { totalQrCodes: 12, totalPages: 4, totalScansAllTime: 18900, scansLast30Days: 6280 },
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'client_apex_capital',
    orgId: 'org_esaia_main',
    companyName: 'Apex Capital Partners',
    contactPerson: 'Tariq Al-Masri',
    email: 'tariq@apexcap.ae',
    phone: '+971 50 123 9988',
    whatsapp: '+971501239988',
    website: 'https://apexcap.ae',
    address: 'Level 24, Al Khatem Tower, ADGM Square, Abu Dhabi',
    brandColors: {
      primary: '#1e3a8a',
      secondary: '#0f172a',
      accent: '#3b82f6',
      background: '#f8fafc',
      text: '#020617'
    },
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    notes: 'Private equity firm using dynamic vCards and pitch deck landing pages for events.',
    tags: ['Finance', 'Corporate', 'vCard', 'High Value'],
    stats: { totalQrCodes: 45, totalPages: 15, totalScansAllTime: 68400, scansLast30Days: 22100 },
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'client_lumiere_resort',
    orgId: 'org_esaia_main',
    companyName: 'Lumière Beach Resort & Spa',
    contactPerson: 'Nour El-Din',
    email: 'concierge@lumiere-resorts.com',
    phone: '+20 122 555 4321',
    whatsapp: '+201225554321',
    website: 'https://lumiere-resorts.com',
    address: 'El Gouna, Red Sea Governorate, Egypt',
    brandColors: {
      primary: '#0d9488',
      secondary: '#134e4a',
      accent: '#14b8a6',
      background: '#f0fdfa',
      text: '#042f2e'
    },
    logoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=150&auto=format&fit=crop&q=80',
    status: 'pending',
    notes: '5-star luxury resort implementing contactless guest room digital compendiums.',
    tags: ['Hospitality', 'Luxury', 'Resort', 'Spa'],
    stats: { totalQrCodes: 8, totalPages: 2, totalScansAllTime: 4300, scansLast30Days: 1420 },
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Local state cache for fast fallback & persistence
const LOCAL_STORAGE_CLIENTS_KEY = 'esaia_clients_store';

function getLocalClients(orgId: string): Client[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CLIENTS_KEY);
    if (raw) {
      const all: Client[] = JSON.parse(raw);
      const matched = all.filter(c => c.orgId === orgId);
      if (matched.length > 0) return matched;
    }
  } catch (e) {
    // fallback
  }
  return INITIAL_DEMO_CLIENTS.filter(c => c.orgId === orgId || orgId === 'org_esaia_main');
}

function saveLocalClients(clients: Client[]): void {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CLIENTS_KEY);
    const existing: Client[] = raw ? JSON.parse(raw) : INITIAL_DEMO_CLIENTS;
    const clientMap = new Map<string, Client>();
    existing.forEach(c => clientMap.set(c.id, c));
    clients.forEach(c => clientMap.set(c.id, c));
    localStorage.setItem(LOCAL_STORAGE_CLIENTS_KEY, JSON.stringify(Array.from(clientMap.values())));
  } catch (e) {
    // ignore
  }
}

export const clientService = {
  async getClientsByOrg(orgId: string, status?: ClientStatus): Promise<Client[]> {
    const colPath = 'clients';
    if (isFirebaseConfigured) {
      try {
        let q = query(collection(db, colPath), where('orgId', '==', orgId));
        if (status) {
          q = query(q, where('status', '==', status));
        }
        const snap = await Promise.race([
          getDocs(q),
          new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2000))
        ]);
        if (snap && !snap.empty) {
          const fetched = snap.docs.map((d: any) => ({
            id: d.id,
            ...(d.data() as any),
            createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : d.data().createdAt || new Date().toISOString(),
            updatedAt: d.data().updatedAt?.toDate ? d.data().updatedAt.toDate().toISOString() : d.data().updatedAt || new Date().toISOString()
          } as Client));
          saveLocalClients(fetched);
          return fetched;
        }
      } catch (err) {
        console.warn('Firestore fetch failed or permission blocked, falling back to cached local storage:', err);
      }
    }

    // Fallback to local storage for robust multi-tenant operation
    const local = getLocalClients(orgId);
    return status ? local.filter(c => c.status === status) : local;
  },

  async getClientById(clientId: string): Promise<Client | null> {
    const docPath = `clients/${clientId}`;
    if (isFirebaseConfigured) {
      try {
        const snap = await Promise.race([
          getDoc(doc(db, 'clients', clientId)),
          new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2000))
        ]);
        if (snap && snap.exists()) {
          const d = snap.data();
          return {
            id: snap.id,
            ...(d as any),
            createdAt: d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : d.createdAt || new Date().toISOString(),
            updatedAt: d.updatedAt?.toDate ? d.updatedAt.toDate().toISOString() : d.updatedAt || new Date().toISOString()
          } as Client;
        }
      } catch (err) {
        console.warn('Firestore getDoc failed, looking up local client cache:', err);
      }
    }

    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_CLIENTS_KEY);
      const all: Client[] = raw ? JSON.parse(raw) : INITIAL_DEMO_CLIENTS;
      const found = all.find(c => c.id === clientId);
      if (found) return found;
    } catch (e) {
      // ignore
    }

    return INITIAL_DEMO_CLIENTS.find(c => c.id === clientId) || null;
  },

  async createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const colPath = 'clients';
    const newId = `client_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const nowIso = new Date().toISOString();

    const newClientObject: Client = {
      ...client,
      id: newId,
      createdAt: nowIso,
      updatedAt: nowIso
    };

    // Save to local cache first for instant optimistic response
    const existing = getLocalClients(client.orgId);
    saveLocalClients([newClientObject, ...existing]);

    if (isFirebaseConfigured) {
      (async () => {
        try {
          await Promise.race([
            setDoc(doc(db, colPath, newId), {
              ...client,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2500))
          ]);
        } catch (err) {
          console.warn('Firestore setDoc background sync failed:', err);
        }
      })();
    }

    return newId;
  },

  async updateClient(clientId: string, updates: Partial<Client>): Promise<void> {
    const docPath = `clients/${clientId}`;
    const nowIso = new Date().toISOString();

    // Update local cache
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_CLIENTS_KEY);
      const all: Client[] = raw ? JSON.parse(raw) : INITIAL_DEMO_CLIENTS;
      const updated = all.map(c => c.id === clientId ? { ...c, ...updates, updatedAt: nowIso } : c);
      localStorage.setItem(LOCAL_STORAGE_CLIENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    try {
      await updateDoc(doc(db, 'clients', clientId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore updateDoc failed, updated client locally:', err);
    }
  },

  async deleteClient(clientId: string): Promise<void> {
    const docPath = `clients/${clientId}`;
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_CLIENTS_KEY);
      const all: Client[] = raw ? JSON.parse(raw) : INITIAL_DEMO_CLIENTS;
      const filtered = all.filter(c => c.id !== clientId);
      localStorage.setItem(LOCAL_STORAGE_CLIENTS_KEY, JSON.stringify(filtered));
    } catch (e) {
      // ignore
    }

    try {
      await deleteDoc(doc(db, 'clients', clientId));
    } catch (err) {
      console.warn('Firestore deleteDoc failed, deleted client locally:', err);
    }
  },

  async archiveClient(clientId: string): Promise<void> {
    return this.updateClient(clientId, { status: 'archived' });
  },

  async getClientAssets(orgId: string, clientId: string): Promise<{ qrs: QrCode[]; pages: Page[] }> {
    let qrs: QrCode[] = [];
    let pages: Page[] = [];

    // Query QR codes for this client
    try {
      const q = query(
        collection(db, 'qrCodes'),
        where('orgId', '==', orgId),
        where('clientId', '==', clientId)
      );
      const snap = await getDocs(q);
      qrs = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as QrCode));
    } catch (e) {
      // fallback mock QRs for client
    }

    // Query Landing Pages for this client
    try {
      const q = query(
        collection(db, 'pages'),
        where('orgId', '==', orgId),
        where('clientId', '==', clientId)
      );
      const snap = await getDocs(q);
      pages = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Page));
    } catch (e) {
      // fallback mock pages
    }

    // If Firestore empty, provide sample matching assets
    if (qrs.length === 0) {
      qrs = [
        {
          id: `qr_${clientId}_1`,
          orgId,
          clientId,
          name: 'Main Entrance Smart Standee',
          publicCode: `hub-${clientId.substring(0, 4)}`,
          destinationType: 'url',
          destinationUrl: 'https://impacthub.eg/welcome',
          status: 'active',
          totalScans: 14200,
          uniqueScans: 9800,
          styleConfig: {
            foregroundColor: '#e11d48',
            backgroundColor: '#ffffff',
            errorCorrectionLevel: 'M',
            moduleStyle: 'rounded',
            eyeStyle: 'rounded',
            eyeColor: '#1e293b',
            eyeInnerColor: '#f59e0b',
            logoSizeRatio: 0.15,
            logoBackgroundPunchout: true,
            quietZoneModules: 4,
            frameStyle: 'card_border',
            scannabilityGrade: 'A'
          },
          createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: `qr_${clientId}_2`,
          orgId,
          clientId,
          name: 'Conference Room Wi-Fi & Agenda',
          publicCode: `wifi-${clientId.substring(0, 4)}`,
          destinationType: 'page',
          destinationUrl: 'https://esaia.app/p/conference-agenda',
          status: 'active',
          totalScans: 6840,
          uniqueScans: 4120,
          styleConfig: {
            foregroundColor: '#1e293b',
            backgroundColor: '#ffffff',
            errorCorrectionLevel: 'H',
            moduleStyle: 'dots',
            eyeStyle: 'circle',
            eyeColor: '#e11d48',
            eyeInnerColor: '#1e293b',
            logoSizeRatio: 0.18,
            logoBackgroundPunchout: true,
            quietZoneModules: 4,
            frameStyle: 'none',
            scannabilityGrade: 'A'
          },
          createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    }

    if (pages.length === 0) {
      pages = [
        {
          id: `page_${clientId}_1`,
          orgId,
          clientId,
          title: 'Guest Welcome Portal & Wi-Fi Access',
          slug: `welcome-${clientId.substring(0, 5)}`,
          pageType: 'landing',
          status: 'published',
          viewCount: 14200,
          blocks: [],
          seo: {
            metaTitle: 'Guest Welcome Portal',
            metaDescription: 'Welcome to our workspace and digital portal'
          },
          themeConfig: {
            palette: {
              background: '#ffffff',
              cardBackground: '#f8fafc',
              textPrimary: '#0f172a',
              textSecondary: '#64748b',
              primaryAction: '#e11d48',
              primaryActionText: '#ffffff',
              accent: '#f59e0b',
              border: '#e2e8f0'
            },
            typography: {
              fontFamily: 'Inter',
              headingFont: 'Inter',
              baseFontSize: 16
            },
            buttonStyle: 'filled',
            borderRadius: 'lg',
            shadowLevel: 'md',
            backgroundStyle: 'solid'
          },
          createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: `page_${clientId}_2`,
          orgId,
          clientId,
          title: 'Official Executive Digital Business Card',
          slug: `card-${clientId.substring(0, 5)}`,
          pageType: 'business_card',
          status: 'published',
          viewCount: 4890,
          blocks: [],
          seo: {
            metaTitle: 'Executive Digital Business Card',
            metaDescription: 'Connect with our leadership team'
          },
          themeConfig: {
            palette: {
              background: '#0f172a',
              cardBackground: '#1e293b',
              textPrimary: '#ffffff',
              textSecondary: '#94a3b8',
              primaryAction: '#3b82f6',
              primaryActionText: '#ffffff',
              accent: '#60a5fa',
              border: '#334155'
            },
            typography: {
              fontFamily: 'Inter',
              headingFont: 'Inter',
              baseFontSize: 16
            },
            buttonStyle: 'filled',
            borderRadius: 'lg',
            shadowLevel: 'md',
            backgroundStyle: 'solid'
          },
          createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
    }

    return { qrs, pages };
  }
};

