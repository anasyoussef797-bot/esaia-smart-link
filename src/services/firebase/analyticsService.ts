/**
 * ESAIA - Scalable Analytics Service (Pre-Aggregated Queries)
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './config';
import { AnalyticsDailySummary, QrAnalyticsDaily, TimeSeriesPoint } from '../../types/analytics';
import { handleFirestoreError, OperationType } from './firestoreErrors';

export const analyticsService = {
  /**
   * Retrieves 30-day pre-aggregated daily summaries (exactly 30 doc reads maximum)
   */
  async getDailySummaries(orgId: string, daysCount = 30): Promise<AnalyticsDailySummary[]> {
    const colPath = 'analyticsDailySummary';
    try {
      const q = query(
        collection(db, colPath),
        where('orgId', '==', orgId),
        limit(daysCount)
      );
      const snap = await getDocs(q);
      const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as AnalyticsDailySummary));
      return items.sort((a, b) => a.date.localeCompare(b.date));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, colPath);
    }
  },

  /**
   * Retrieves daily aggregates for a single QR code
   */
  async getQrDailyStats(qrId: string, daysCount = 30): Promise<QrAnalyticsDaily[]> {
    const colPath = 'qrAnalyticsDaily';
    try {
      const q = query(
        collection(db, colPath),
        where('qrId', '==', qrId),
        limit(daysCount)
      );
      const snap = await getDocs(q);
      const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) } as QrAnalyticsDaily));
      return items.sort((a, b) => a.date.localeCompare(b.date));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, colPath);
    }
  },

  /**
   * Transform daily summaries to graph time series format
   */
  transformToTimeSeries(summaries: AnalyticsDailySummary[]): TimeSeriesPoint[] {
    return summaries.map(s => ({
      date: s.date,
      scans: s.totalScans || 0,
      uniqueScans: s.uniqueScans || 0
    }));
  }
};
