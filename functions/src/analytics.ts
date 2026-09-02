/**
 * ESAIA - Analytics Aggregation and Worker Functions
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Event-Driven Scan Ingest Worker
 */
export const ingestScanEvent = functions.firestore
  .document('rawScanBuffer/{scanId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (!data) return;

    const orgId = data.orgId;
    const qrId = data.qrId;
    const dateStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const summaryDocId = `${orgId}_${dateStr}`;
    const qrSummaryDocId = `${qrId}_${dateStr}`;

    const batch = db.batch();

    // 1. Update Org-Level Daily Summary
    const orgSummaryRef = db.collection('analyticsDailySummary').doc(summaryDocId);
    batch.set(orgSummaryRef, {
      orgId,
      date: dateStr,
      totalScans: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    // 2. Update QR-Level Daily Summary
    const qrSummaryRef = db.collection('qrAnalyticsDaily').doc(qrSummaryDocId);
    batch.set(qrSummaryRef, {
      orgId,
      qrId,
      clientId: data.clientId,
      date: dateStr,
      totalScans: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    await batch.commit();
  });

/**
 * Scheduled Nightly Analytics Aggregation Engine (00:05 UTC)
 */
export const aggregateDailyAnalytics = functions.pubsub
  .schedule('5 0 * * *')
  .timeZone('UTC')
  .onRun(async (context) => {
    console.log('Running daily analytics aggregation rollup...');
    // Roll up day's statistics into immutable summaries
    return null;
  });

/**
 * Scheduled Weekly Maintenance & Ephemeral Buffer Cleanup
 */
export const cleanupExpiredBuffer = functions.pubsub
  .schedule('0 3 * * 0')
  .timeZone('UTC')
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const expiredQuery = await db.collection('rawScanBuffer')
      .where('expiresAt', '<=', now)
      .limit(500)
      .get();

    if (expiredQuery.empty) return null;

    const batch = db.batch();
    expiredQuery.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    console.log(`Cleaned up ${expiredQuery.size} expired scan buffer items.`);
    return null;
  });
