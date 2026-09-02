/**
 * ESAIA - CSV Migration & Bulk Customer Import Cloud Function
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export interface MigrationPayload {
  orgId: string;
  records: Array<{
    companyName: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    qrName: string;
    publicCode?: string;
    destinationUrl: string;
    destinationType?: string;
  }>;
}

export const processCsvMigration = functions.https.onCall(async (data: MigrationPayload, context) => {
  // Enforce authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated to run migrations.');
  }

  const { orgId, records } = data;
  if (!orgId || !records || !Array.isArray(records)) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing or invalid migration payload.');
  }

  let clientsCreated = 0;
  let qrsCreated = 0;
  const errors: string[] = [];

  // Chunk into 250 records per batch (each record creates 1 client + 1 QR = 500 ops)
  const chunkSize = 250;
  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    const batch = db.batch();

    for (const record of chunk) {
      if (!record.destinationUrl || !record.qrName) {
        errors.push(`Skipped record row: Missing URL or QR name`);
        continue;
      }

      // Safe URL verification
      if (/^(javascript:|data:|vbscript:)/i.test(record.destinationUrl.trim())) {
        errors.push(`Skipped record ${record.qrName}: Disallowed dangerous URL scheme`);
        continue;
      }

      // 1. Client ref
      const clientRef = db.collection('clients').doc();
      batch.set(clientRef, {
        orgId,
        companyName: record.companyName || record.qrName,
        contactPerson: record.contactPerson || '',
        email: record.email || '',
        phone: record.phone || '',
        brandColors: { primary: '#18181b', secondary: '#71717a', accent: '#3b82f6' },
        status: 'active',
        stats: { totalQrCodes: 1, totalPages: 0, totalScansAllTime: 0, scansLast30Days: 0 },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      clientsCreated++;

      // 2. Dynamic QR ref
      const publicCode = record.publicCode || `es_${Math.random().toString(36).substring(2, 9)}`;
      const qrRef = db.collection('qrCodes').doc();
      batch.set(qrRef, {
        orgId,
        clientId: clientRef.id,
        name: record.qrName,
        publicCode,
        destinationType: record.destinationType || 'url',
        destinationUrl: record.destinationUrl,
        status: 'active',
        totalScans: 0,
        uniqueScans: 0,
        styleConfig: {
          foregroundColor: '#18181b',
          backgroundColor: '#ffffff',
          errorCorrectionLevel: 'M',
          moduleStyle: 'square',
          eyeStyle: 'square',
          logoSizeRatio: 0.15,
          quietZoneModules: 4,
          frameStyle: 'none',
          scannabilityGrade: 'A'
        },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      qrsCreated++;
    }

    await batch.commit();
  }

  return {
    success: true,
    clientsCreated,
    qrsCreated,
    errors
  };
});
