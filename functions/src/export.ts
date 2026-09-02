/**
 * ESAIA - Organization Data Export Engine (Data Sovereignty)
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const exportOrganizationData = functions.https.onCall(async (data: { orgId: string }, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated.');
  }

  const { orgId } = data;
  if (!orgId) {
    throw new functions.https.HttpsError('invalid-argument', 'Organization ID required.');
  }

  // Fetch all tenant entities in parallel
  const [clientsSnap, qrCodesSnap, pagesSnap, linksSnap] = await Promise.all([
    db.collection('clients').where('orgId', '==', orgId).get(),
    db.collection('qrCodes').where('orgId', '==', orgId).get(),
    db.collection('pages').where('orgId', '==', orgId).get(),
    db.collection('smartLinks').where('orgId', '==', orgId).get()
  ]);

  const clients = clientsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const qrCodes = qrCodesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const pages = pagesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const smartLinks = linksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return {
    exportedAt: new Date().toISOString(),
    orgId,
    data: {
      clients,
      qrCodes,
      pages,
      smartLinks
    }
  };
});
