/**
 * ESAIA - Dynamic QR Code Management Service
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
import { db } from './config';
import { QrCode, QrStatus } from '../../types/qr';
import { handleFirestoreError, OperationType } from './firestoreErrors';

export const qrService = {
  async getQrCodesByOrg(orgId: string, clientId?: string): Promise<QrCode[]> {
    const colPath = 'qrCodes';
    try {
      let q = query(
        collection(db, colPath),
        where('orgId', '==', orgId)
      );
      if (clientId) {
        q = query(q, where('clientId', '==', clientId));
      }
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as QrCode));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, colPath);
    }
  },

  async getQrCodeBySlug(publicCode: string): Promise<QrCode | null> {
    const colPath = 'qrCodes';
    try {
      const q = query(
        collection(db, colPath),
        where('publicCode', '==', publicCode)
      );
      const snap = await getDocs(q);
      if (snap.empty) return null;
      const d = snap.docs[0];
      return { id: d.id, ...(d.data() as any) } as QrCode;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, colPath);
    }
  },

  async getQrCodeById(qrId: string): Promise<QrCode | null> {
    const docPath = `qrCodes/${qrId}`;
    try {
      const snap = await getDoc(doc(db, 'qrCodes', qrId));
      if (!snap.exists()) return null;
      return { id: snap.id, ...(snap.data() as any) } as QrCode;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, docPath);
    }
  },

  async createQrCode(qr: Omit<QrCode, 'id' | 'createdAt' | 'updatedAt' | 'totalScans' | 'uniqueScans'>): Promise<string> {
    const colPath = 'qrCodes';
    try {
      const newRef = doc(collection(db, colPath));
      await setDoc(newRef, {
        ...qr,
        totalScans: 0,
        uniqueScans: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return newRef.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, colPath);
    }
  },

  async updateQrCode(qrId: string, updates: Partial<QrCode>): Promise<void> {
    const docPath = `qrCodes/${qrId}`;
    try {
      await updateDoc(doc(db, 'qrCodes', qrId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, docPath);
    }
  },

  async updateQrStatus(qrId: string, status: QrStatus): Promise<void> {
    return this.updateQrCode(qrId, { status });
  },

  async deleteQrCode(qrId: string): Promise<void> {
    const docPath = `qrCodes/${qrId}`;
    try {
      await deleteDoc(doc(db, 'qrCodes', qrId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, docPath);
    }
  }
};
