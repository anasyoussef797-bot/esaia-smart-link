/**
 * ESAIA - Landing Page Builder Service
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
import { Page, PageStatus } from '../../types/page';
import { handleFirestoreError, OperationType } from './firestoreErrors';

export const pageService = {
  async getPagesByOrg(orgId: string, clientId?: string): Promise<Page[]> {
    const colPath = 'pages';
    try {
      let q = query(collection(db, colPath), where('orgId', '==', orgId));
      if (clientId) {
        q = query(q, where('clientId', '==', clientId));
      }
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as Page));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, colPath);
    }
  },

  async getPageBySlug(slug: string): Promise<Page | null> {
    const colPath = 'pages';
    try {
      const q = query(collection(db, colPath), where('slug', '==', slug));
      const snap = await getDocs(q);
      if (snap.empty) return null;
      const d = snap.docs[0];
      return { id: d.id, ...(d.data() as any) } as Page;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, colPath);
    }
  },

  async getPageById(pageId: string): Promise<Page | null> {
    const docPath = `pages/${pageId}`;
    try {
      const snap = await getDoc(doc(db, 'pages', pageId));
      if (!snap.exists()) return null;
      return { id: snap.id, ...(snap.data() as any) } as Page;
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, docPath);
    }
  },

  async createPage(page: Omit<Page, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>): Promise<string> {
    const colPath = 'pages';
    try {
      const newRef = doc(collection(db, colPath));
      await setDoc(newRef, {
        ...page,
        viewCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return newRef.id;
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, colPath);
    }
  },

  async updatePage(pageId: string, updates: Partial<Page>): Promise<void> {
    const docPath = `pages/${pageId}`;
    try {
      await updateDoc(doc(db, 'pages', pageId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, docPath);
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
    const docPath = `pages/${pageId}`;
    try {
      await deleteDoc(doc(db, 'pages', pageId));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, docPath);
    }
  }
};
