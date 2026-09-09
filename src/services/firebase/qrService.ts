/**
 * ESAIA - Dynamic QR Code Management Service
 * Full-lifecycle QR fleet orchestration, dynamic destination binding, and bulk management.
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
import { QrCode, QrStatus, QrStyleConfig } from '../../types/qr';
import { handleFirestoreError, OperationType } from './firestoreErrors';
import { getQrRedirectUrl } from '../../utils/qrUrl';

const LOCAL_STORAGE_QR_KEY = 'esaia_qr_store';

const INITIAL_DEMO_QRS: QrCode[] = [
  {
    id: 'qr_hub_wifi',
    orgId: 'org_esaia_main',
    clientId: 'client_impact_hub',
    clientName: 'Impact Hub Cairo',
    name: 'Main Coworking High-Speed WiFi',
    publicCode: 'hub-wifi',
    destinationType: 'url',
    destinationUrl: 'https://cairo.impacthub.net/wifi',
    status: 'active',
    totalScans: 14820,
    uniqueScans: 9340,
    lastScannedAt: new Date(Date.now() - 15 * 60000).toISOString(),
    tags: ['WiFi', 'Reception', 'Lobby', 'Hospitality'],
    notes: 'Printed on acrylic stands across 3 floors of coworking desks.',
    styleConfig: {
      foregroundColor: '#e11d48',
      backgroundColor: '#ffffff',
      moduleStyle: 'rounded',
      eyeStyle: 'rounded',
      eyeBallStyle: 'rounded',
      eyeColor: '#be123c',
      eyeInnerColor: '#e11d48',
      errorCorrectionLevel: 'H',
      quietZoneModules: 4,
      logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
      logoSizeRatio: 0.16,
      logoBackgroundPunchout: true,
      frameStyle: 'banner_bottom',
      frameText: 'CONNECT TO WIFI',
      frameBgColor: '#e11d48',
      frameTextColor: '#ffffff',
      scannabilityGrade: 'A',
      healthScore: 98,
      verifiedAt: new Date().toISOString()
    },
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'qr_nile_menu',
    orgId: 'org_esaia_main',
    clientId: 'client_nile_roastery',
    clientName: 'Nile Artisan Roastery',
    name: 'Zamalek Branch Dine-In Digital Menu',
    publicCode: 'nile-menu',
    destinationType: 'url',
    destinationUrl: 'https://nilecoffee.com/menu',
    status: 'active',
    totalScans: 28940,
    uniqueScans: 18200,
    lastScannedAt: new Date(Date.now() - 5 * 60000).toISOString(),
    tags: ['Menu', 'Tabletop', 'Zamalek', 'Dining'],
    notes: 'Laser-etched on brass tabletop stands.',
    styleConfig: {
      foregroundColor: '#92400e',
      backgroundColor: '#fefce8',
      moduleStyle: 'classy',
      eyeStyle: 'leaf',
      eyeBallStyle: 'circle',
      eyeColor: '#78350f',
      eyeInnerColor: '#92400e',
      errorCorrectionLevel: 'H',
      quietZoneModules: 4,
      logoUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=150&auto=format&fit=crop&q=80',
      logoSizeRatio: 0.18,
      logoBackgroundPunchout: true,
      frameStyle: 'banner_bottom',
      frameText: 'VIEW SPECIALTY MENU',
      frameBgColor: '#78350f',
      frameTextColor: '#fefce8',
      scannabilityGrade: 'A',
      healthScore: 96,
      verifiedAt: new Date().toISOString()
    },
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'qr_apex_vcard',
    orgId: 'org_esaia_main',
    clientId: 'client_apex_capital',
    clientName: 'Apex Capital Partners',
    name: 'Executive Partner vCard - Tarek Al-Husseini',
    publicCode: 'apex-vcard',
    destinationType: 'url',
    destinationUrl: 'https://apexcapital.ae/team/tarek',
    status: 'active',
    totalScans: 3120,
    uniqueScans: 2890,
    lastScannedAt: new Date(Date.now() - 40 * 60000).toISOString(),
    tags: ['vCard', 'Executive', 'Metal Card', 'DIFC'],
    notes: 'Printed on matte black stainless steel executive card.',
    styleConfig: {
      foregroundColor: '#0284c7',
      backgroundColor: '#ffffff',
      moduleStyle: 'extra-rounded',
      eyeStyle: 'circle',
      eyeBallStyle: 'circle',
      eyeColor: '#0369a1',
      eyeInnerColor: '#0284c7',
      errorCorrectionLevel: 'H',
      quietZoneModules: 4,
      logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
      logoSizeRatio: 0.15,
      logoBackgroundPunchout: true,
      frameStyle: 'card_border',
      frameBgColor: '#0284c7',
      scannabilityGrade: 'A',
      healthScore: 94,
      verifiedAt: new Date().toISOString()
    },
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'qr_cairo_conf',
    orgId: 'org_esaia_main',
    clientId: 'client_impact_hub',
    clientName: 'Impact Hub Cairo',
    name: 'North Africa Tech Summit 2026 Keynote Badge',
    publicCode: 'cairo-conf',
    destinationType: 'url',
    destinationUrl: 'https://cairoconf2026.eg',
    status: 'active',
    totalScans: 7420,
    uniqueScans: 6110,
    lastScannedAt: new Date(Date.now() - 120 * 60000).toISOString(),
    tags: ['Conference', 'Badges', 'Events', 'Sponsorship'],
    notes: 'Printed on 2,500 VIP attendee badges.',
    styleConfig: {
      foregroundColor: '#1e293b',
      backgroundColor: '#f8fafc',
      moduleStyle: 'dots',
      eyeStyle: 'rounded',
      eyeBallStyle: 'square',
      eyeColor: '#0f172a',
      eyeInnerColor: '#e11d48',
      errorCorrectionLevel: 'H',
      quietZoneModules: 4,
      logoUrl: null,
      logoSizeRatio: 0.15,
      logoBackgroundPunchout: false,
      frameStyle: 'badge_top',
      frameText: 'SCAN FOR AGENDA',
      frameBgColor: '#e11d48',
      frameTextColor: '#ffffff',
      scannabilityGrade: 'B',
      healthScore: 88,
      verifiedAt: new Date().toISOString()
    },
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'qr_hub_coworking',
    orgId: 'org_esaia_main',
    clientId: 'client_impact_hub',
    clientName: 'Impact Hub Cairo',
    name: 'Summer Membership Promo (Paused Campaign)',
    publicCode: 'hub-coworking',
    destinationType: 'url',
    destinationUrl: 'https://cairo.impacthub.net/membership',
    status: 'paused',
    totalScans: 4890,
    uniqueScans: 3950,
    lastScannedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    tags: ['Promo', 'Summer', 'Sales', 'Flyers'],
    notes: 'Temporarily paused while autumn pricing is updated.',
    styleConfig: {
      foregroundColor: '#64748b',
      backgroundColor: '#ffffff',
      moduleStyle: 'square',
      eyeStyle: 'square',
      eyeBallStyle: 'square',
      eyeColor: '#475569',
      eyeInnerColor: '#64748b',
      errorCorrectionLevel: 'M',
      quietZoneModules: 4,
      logoUrl: null,
      logoSizeRatio: 0.15,
      logoBackgroundPunchout: false,
      frameStyle: 'none',
      scannabilityGrade: 'A',
      healthScore: 92,
      verifiedAt: new Date().toISOString()
    },
    createdAt: new Date(Date.now() - 40 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'qr_nile_loyalty',
    orgId: 'org_esaia_main',
    clientId: 'client_nile_roastery',
    clientName: 'Nile Artisan Roastery',
    name: 'VIP Roastery Coffee Club Pass',
    publicCode: 'nile-loyalty',
    destinationType: 'url',
    destinationUrl: 'https://nilecoffee.com/vip-club',
    status: 'active',
    totalScans: 8900,
    uniqueScans: 7420,
    lastScannedAt: new Date(Date.now() - 10 * 60000).toISOString(),
    tags: ['Loyalty', 'Packaging', 'Coffee Beans', 'Retail'],
    notes: 'Printed on 250g and 1kg specialty bean bags.',
    styleConfig: {
      foregroundColor: '#b45309',
      backgroundColor: '#fffbeb',
      moduleStyle: 'rounded',
      eyeStyle: 'leaf',
      eyeBallStyle: 'rounded',
      eyeColor: '#78350f',
      eyeInnerColor: '#b45309',
      errorCorrectionLevel: 'H',
      quietZoneModules: 5,
      logoUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=150&auto=format&fit=crop&q=80',
      logoSizeRatio: 0.15,
      logoBackgroundPunchout: true,
      frameStyle: 'banner_bottom',
      frameText: 'EARN COFFEE POINTS',
      frameBgColor: '#b45309',
      frameTextColor: '#ffffff',
      scannabilityGrade: 'A',
      healthScore: 97,
      verifiedAt: new Date().toISOString()
    },
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Load persisted QR fleet from localStorage if available, merging with demo fleet
function loadInitialQrs(): QrCode[] {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_QR_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge with initial demo QRs so defaults remain intact
          const merged = [...parsed];
          INITIAL_DEMO_QRS.forEach(demo => {
            if (!merged.some(m => m.id === demo.id || m.publicCode === demo.publicCode)) {
              merged.push(demo);
            }
          });
          return merged;
        }
      }
    }
  } catch (e) {
    // Ignore JSON error
  }
  return [...INITIAL_DEMO_QRS];
}

function persistQrs(qrs: QrCode[]) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_QR_KEY, JSON.stringify(qrs));
    }
  } catch (e) {
    // Ignore storage quota
  }
}

// In-memory fallback cache backed by localStorage
let inMemoryQrs: QrCode[] = loadInitialQrs();

export const qrService = {
  /**
   * Syncs update to the server-side redirect memory cache for instantaneous 302 redirection
   */
  async syncRedirectCache(qr: Partial<QrCode>): Promise<void> {
    if (!qr.publicCode) return;
    try {
      await fetch('/api/qr/update-cache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicCode: qr.publicCode,
          destinationUrl: qr.destinationUrl,
          destinationType: qr.destinationType,
          status: qr.status,
          expiresAt: qr.expiresAt,
          targetEntityId: qr.targetEntityId
        })
      });
    } catch (e) {
      // Server-side cache sync warning suppressed in client-only preview
    }
  },

  async getQrCodesByOrg(orgId: string, clientId?: string): Promise<QrCode[]> {
    const colPath = 'qrCodes';
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
          const firestoreList = snap.docs.map((d: any) => ({ id: d.id, ...(d.data() as any) } as QrCode));
          // Merge with in-memory store
          firestoreList.forEach((item: QrCode) => {
            const idx = inMemoryQrs.findIndex(m => m.id === item.id);
            if (idx >= 0) inMemoryQrs[idx] = item;
            else inMemoryQrs.push(item);
          });
          return firestoreList;
        }
      } catch (err) {
        console.warn('Using resilient in-memory QR fleet fallback.');
      }
    }

    // Filter in-memory fallback
    return inMemoryQrs.filter(q => {
      if (clientId && clientId !== 'all' && q.clientId !== clientId) return false;
      return true;
    });
  },

  async getQrCodeBySlug(publicCode: string): Promise<QrCode | null> {
    let found = inMemoryQrs.find(q => q.publicCode === publicCode || q.id === publicCode);
    if (!found) {
      const freshFleet = loadInitialQrs();
      found = freshFleet.find(q => q.publicCode === publicCode || q.id === publicCode);
      if (found) {
        inMemoryQrs = freshFleet;
        return found;
      }
    }
    if (found) return found;

    const colPath = 'qrCodes';
    if (isFirebaseConfigured) {
      try {
        const q = query(collection(db, colPath), where('publicCode', '==', publicCode));
        const snap = await Promise.race([
          getDocs(q),
          new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2000))
        ]);
        if (snap && !snap.empty) {
          const d = snap.docs[0];
          return { id: d.id, ...(d.data() as any) } as QrCode;
        }
      } catch (err) {
        // Fallback to in-memory
      }
    }
    return null;
  },

  async getQrCodeById(qrId: string): Promise<QrCode | null> {
    const found = inMemoryQrs.find(q => q.id === qrId);
    if (found) return found;

    if (isFirebaseConfigured) {
      try {
        const snap = await Promise.race([
          getDoc(doc(db, 'qrCodes', qrId)),
          new Promise<any>((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2000))
        ]);
        if (snap && snap.exists()) {
          return { id: snap.id, ...(snap.data() as any) } as QrCode;
        }
      } catch (err) {
        // Fallback
      }
    }
    return null;
  },

  async createQrCode(qr: Omit<QrCode, 'id' | 'createdAt' | 'updatedAt' | 'totalScans' | 'uniqueScans'>): Promise<string> {
    const colPath = 'qrCodes';
    const newId = `qr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const fullQr: QrCode = {
      ...qr,
      id: newId,
      totalScans: 0,
      uniqueScans: 0,
      createdAt: now,
      updatedAt: now
    };

    inMemoryQrs.unshift(fullQr);
    persistQrs(inMemoryQrs);
    this.syncRedirectCache(fullQr);

    if (isFirebaseConfigured) {
      (async () => {
        try {
          const newRef = doc(db, colPath, newId);
          await Promise.race([
            setDoc(newRef, {
              ...fullQr,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 2500))
          ]);
        } catch (err) {
          console.warn('Offline create stored in local state:', err);
        }
      })();
    }

    return newId;
  },

  async updateQrCode(qrId: string, updates: Partial<QrCode>): Promise<void> {
    const docPath = `qrCodes/${qrId}`;
    const idx = inMemoryQrs.findIndex(q => q.id === qrId);
    if (idx >= 0) {
      inMemoryQrs[idx] = {
        ...inMemoryQrs[idx],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      persistQrs(inMemoryQrs);
      this.syncRedirectCache(inMemoryQrs[idx]);
    }

    try {
      await updateDoc(doc(db, 'qrCodes', qrId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Offline update stored in local state:', err);
    }
  },

  async updateDestination(qrId: string, destinationUrl: string, destinationType = 'url', targetEntityId?: string | null): Promise<void> {
    return this.updateQrCode(qrId, {
      destinationUrl,
      destinationType: destinationType as any,
      targetEntityId: targetEntityId || null
    });
  },

  async updateQrStatus(qrId: string, status: QrStatus): Promise<void> {
    return this.updateQrCode(qrId, { status });
  },

  async bulkUpdateStatus(qrIds: string[], status: QrStatus): Promise<void> {
    await Promise.all(qrIds.map(id => this.updateQrStatus(id, status)));
  },

  async bulkAssignTags(qrIds: string[], newTags: string[]): Promise<void> {
    for (const id of qrIds) {
      const existing = inMemoryQrs.find(q => q.id === id);
      if (existing) {
        const merged = Array.from(new Set([...(existing.tags || []), ...newTags]));
        await this.updateQrCode(id, { tags: merged });
      }
    }
  },

  async bulkDelete(qrIds: string[]): Promise<void> {
    await Promise.all(qrIds.map(id => this.deleteQrCode(id)));
  },

  async deleteQrCode(qrId: string): Promise<void> {
    const docPath = `qrCodes/${qrId}`;
    inMemoryQrs = inMemoryQrs.filter(q => q.id !== qrId);
    persistQrs(inMemoryQrs);
    try {
      await deleteDoc(doc(db, 'qrCodes', qrId));
    } catch (err) {
      console.warn('Offline delete stored in local state:', err);
    }
  },

  /**
   * Records a live scan event from a phone camera or web redirect
   */
  async recordScan(qrIdOrCode: string): Promise<void> {
    const idx = inMemoryQrs.findIndex(q => q.id === qrIdOrCode || q.publicCode === qrIdOrCode);
    if (idx >= 0) {
      const now = new Date().toISOString();
      inMemoryQrs[idx].totalScans = (inMemoryQrs[idx].totalScans || 0) + 1;
      inMemoryQrs[idx].lastScannedAt = now;
      persistQrs(inMemoryQrs);

      if (isFirebaseConfigured) {
        try {
          await updateDoc(doc(db, 'qrCodes', inMemoryQrs[idx].id), {
            totalScans: inMemoryQrs[idx].totalScans,
            lastScannedAt: now,
            updatedAt: serverTimestamp()
          });
        } catch (e) {
          // Ignore offline
        }
      }

      // Also notify server telemetry if available
      try {
        fetch('/api/qr/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicCode: inMemoryQrs[idx].publicCode, qrId: inMemoryQrs[idx].id })
        }).catch(() => {});
      } catch (e) {}
    }
  },

  /**
   * Finds a QR code by its public code with multi-tier resolution
   */
  async getQrByPublicCode(publicCode: string): Promise<QrCode | null> {
    return this.getQrCodeBySlug(publicCode);
  },

  /**
   * Generates a cleanly formatted CSV export string
   */
  exportQrFleetCsv(qrs: QrCode[]): string {
    const headers = [
      'ID',
      'Name',
      'Public Code',
      'Short URL',
      'Destination Type',
      'Destination URL',
      'Client',
      'Status',
      'Total Scans',
      'Unique Scans',
      'Scannability Grade',
      'Health Score',
      'Tags',
      'Created At'
    ];

    const rows = qrs.map(q => [
      `"${q.id}"`,
      `"${(q.name || '').replace(/"/g, '""')}"`,
      `"${q.publicCode}"`,
      `"${getQrRedirectUrl(q.publicCode)}"`,
      `"${q.destinationType}"`,
      `"${(q.destinationUrl || '').replace(/"/g, '""')}"`,
      `"${(q.clientName || '').replace(/"/g, '""')}"`,
      `"${q.status}"`,
      q.totalScans || 0,
      q.uniqueScans || 0,
      `"${q.styleConfig?.scannabilityGrade || 'A'}"`,
      `"${q.styleConfig?.healthScore || 95}%"`,
      `"${(q.tags || []).join(', ')}"`,
      `"${q.createdAt}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
};

