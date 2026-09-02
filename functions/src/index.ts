/**
 * ESAIA - Firebase Cloud Functions Entry Point
 * Defines serverless HTTP endpoints, background event triggers, and scheduled workers.
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Admin SDK once
if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();

// Export function modules
export { qrRedirectHandler, smartLinkHandler } from './redirects';
export { ingestScanEvent, aggregateDailyAnalytics, cleanupExpiredBuffer } from './analytics';
export { processCsvMigration } from './migration';
export { exportOrganizationData } from './export';
