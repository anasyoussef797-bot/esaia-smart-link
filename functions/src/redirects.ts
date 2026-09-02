/**
 * ESAIA - Fast Server-Side QR & Smart Link Redirect Handlers
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as crypto from 'crypto';

const db = admin.firestore();

/**
 * High-speed HTTP QR Redirect Function (/q/:slug)
 * Target latency: < 45ms
 */
export const qrRedirectHandler = functions.https.onRequest(async (req, res) => {
  const publicCode = req.query.code as string || req.path.replace(/^\/q\//, '').trim();

  if (!publicCode) {
    res.status(400).send('<h1>Invalid QR Code</h1><p>No code specified.</p>');
    return;
  }

  try {
    // 1. Single indexed query
    const snapshot = await db.collection('qrCodes')
      .where('publicCode', '==', publicCode)
      .limit(1)
      .get();

    if (snapshot.empty) {
      res.status(404).send('<h1>QR Code Not Found</h1><p>This ESAIA QR code does not exist.</p>');
      return;
    }

    const qrDoc = snapshot.docs[0];
    const qrData = qrDoc.data();

    // 2. Validate status and expiry
    if (qrData.status === 'paused') {
      res.status(403).send('<h1>QR Code Paused</h1><p>This QR campaign is temporarily paused by the owner.</p>');
      return;
    }

    if (qrData.expiresAt && new Date(qrData.expiresAt).getTime() < Date.now()) {
      res.status(410).send('<h1>QR Code Expired</h1><p>This QR code campaign has expired.</p>');
      return;
    }

    // 3. Asynchronous Non-Blocking Analytics Recording (Pub/Sub or direct write)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '0.0.0.0';
    const salt = new Date().toISOString().slice(0, 10);
    const ipHash = crypto.createHash('sha256').update(`${ip}-${salt}`).digest('hex');
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referrer = req.headers['referer'] || '';
    const country = (req.headers['x-appengine-country'] as string) || 'Unknown';
    const city = (req.headers['x-appengine-city'] as string) || 'Unknown';

    // Fire and forget write without awaiting
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30-day TTL

    db.collection('rawScanBuffer').add({
      orgId: qrData.orgId,
      clientId: qrData.clientId,
      qrId: qrDoc.id,
      campaignId: qrData.campaignId || null,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      ipHash,
      userAgent,
      country,
      city,
      referrer,
      expiresAt: admin.firestore.Timestamp.fromDate(expiresAt)
    }).catch(err => console.error('Scan buffer log error:', err));

    // Increment master counter
    qrDoc.ref.update({
      totalScans: admin.firestore.FieldValue.increment(1),
      lastScannedAt: admin.firestore.FieldValue.serverTimestamp()
    }).catch(err => console.error('Master counter update error:', err));

    // 4. Return Immediate 302 Redirect
    let destination = qrData.destinationUrl;
    if (qrData.destinationType === 'page' && qrData.targetEntityId) {
      destination = `/p/${qrData.targetEntityId}`;
    }

    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.redirect(302, destination);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).send('<h1>Server Error</h1><p>Unable to resolve QR destination.</p>');
  }
});

/**
 * Smart Link Redirect Handler (/go/:slug)
 */
export const smartLinkHandler = functions.https.onRequest(async (req, res) => {
  const code = req.query.code as string || req.path.replace(/^\/go\//, '').trim();
  if (!code) {
    res.status(400).send('<h1>Invalid Link</h1>');
    return;
  }

  try {
    const snapshot = await db.collection('smartLinks')
      .where('publicCode', '==', code)
      .limit(1)
      .get();

    if (snapshot.empty) {
      res.status(404).send('<h1>Link Not Found</h1>');
      return;
    }

    const linkDoc = snapshot.docs[0];
    const linkData = linkDoc.data();

    if (linkData.status !== 'active') {
      res.status(403).send('<h1>Link Inactive</h1>');
      return;
    }

    linkDoc.ref.update({
      totalClicks: admin.firestore.FieldValue.increment(1)
    }).catch(() => {});

    res.redirect(302, linkData.destinationUrl);
  } catch (error) {
    res.status(500).send('<h1>Server Error</h1>');
  }
});
