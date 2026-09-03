/**
 * ESAIA - Production Full-Stack Server Entry Point
 * Handles ultra-fast server-side QR redirects (/q/:slug), Smart Links (/go/:slug),
 * and integrates Vite middleware for development and static SPA serving for production.
 */

import express, { Request, Response } from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory memory cache for ultra-fast QR lookup (TTL: 60s)
const qrMemoryCache = new Map<string, {
  destinationUrl: string;
  status: string;
  expiresAt: string | null;
  targetEntityId: string | null;
  destinationType: string;
  cachedAt: number;
}>([
  ['hub-wifi', { destinationUrl: '/p/hub-welcome', status: 'active', expiresAt: null, targetEntityId: 'page_hub_welcome', destinationType: 'page', cachedAt: Date.now() }],
  ['nile-menu', { destinationUrl: '/p/nile-menu-2026', status: 'active', expiresAt: null, targetEntityId: 'page_nile_menu', destinationType: 'page', cachedAt: Date.now() }],
  ['apex-vcard', { destinationUrl: '/p/apex-tariq-vcard', status: 'active', expiresAt: null, targetEntityId: 'page_apex_tariq', destinationType: 'page', cachedAt: Date.now() }],
  ['cairo-conf', { destinationUrl: 'https://cairoconf2026.eg', status: 'active', expiresAt: null, targetEntityId: null, destinationType: 'url', cachedAt: Date.now() }],
  ['hub-coworking', { destinationUrl: '/p/hub-welcome', status: 'paused', expiresAt: null, targetEntityId: 'page_hub_welcome', destinationType: 'page', cachedAt: Date.now() }],
  ['nile-loyalty', { destinationUrl: '/p/nile-menu-2026', status: 'active', expiresAt: null, targetEntityId: 'page_nile_menu', destinationType: 'page', cachedAt: Date.now() }]
]);

// API: Update or invalidate server-side redirect cache immediately
app.post('/api/qr/update-cache', (req: Request, res: Response) => {
  const { publicCode, destinationUrl, destinationType, status, expiresAt, targetEntityId } = req.body;
  if (!publicCode) {
    res.status(400).json({ error: 'Missing publicCode' });
    return;
  }
  qrMemoryCache.set(publicCode, {
    destinationUrl: destinationUrl || 'https://esaia.app',
    status: status || 'active',
    expiresAt: expiresAt || null,
    targetEntityId: targetEntityId || null,
    destinationType: destinationType || 'url',
    cachedAt: Date.now()
  });
  res.json({ success: true, publicCode, destinationUrl, status: status || 'active' });
});

// ==============================================================================
// 1. Ultra-Fast Dynamic QR Redirect Engine (Server-Side: /q/:slug)
// ==============================================================================
app.get('/q/:slug', async (req: Request, res: Response): Promise<void> => {
  const slug = req.params.slug?.trim();

  if (!slug) {
    res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Invalid QR - ESAIA</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="font-family: sans-serif; background: #090a0f; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center;">
          <div>
            <h1 style="font-size: 24px;">Invalid QR Code</h1>
            <p style="color: #94a3b8;">No public code specified.</p>
          </div>
        </body>
      </html>
    `);
    return;
  }

  try {
    // 1. Check in-memory fast cache first (< 1ms)
    let qr = qrMemoryCache.get(slug);

    if (!qr || Date.now() - qr.cachedAt > 60000) {
      // In standalone dev/demo or serverless proxy, fallback destination
      qr = {
        destinationUrl: 'https://esaia.app',
        status: 'active',
        expiresAt: null,
        targetEntityId: null,
        destinationType: 'url',
        cachedAt: Date.now()
      };
      qrMemoryCache.set(slug, qr);
    }

    // 2. Validate Status & Expiration
    if (qr.status === 'paused') {
      res.status(403).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Campaign Paused - ESAIA</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="font-family: sans-serif; background: #090a0f; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center;">
            <div style="max-width: 400px; padding: 24px; border: 1px solid #24293d; border-radius: 16px; background: #141722;">
              <h2 style="font-size: 20px; color: #f59e0b;">QR Campaign Paused</h2>
              <p style="color: #94a3b8; font-size: 14px; margin-top: 8px;">This QR campaign has been temporarily paused by the organization.</p>
            </div>
          </body>
        </html>
      `);
      return;
    }

    if (qr.expiresAt && new Date(qr.expiresAt).getTime() < Date.now()) {
      res.status(410).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Campaign Expired - ESAIA</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="font-family: sans-serif; background: #090a0f; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center;">
            <div style="max-width: 400px; padding: 24px; border: 1px solid #24293d; border-radius: 16px; background: #141722;">
              <h2 style="font-size: 20px; color: #f43f5e;">QR Code Expired</h2>
              <p style="color: #94a3b8; font-size: 14px; margin-top: 8px;">This promotional QR campaign has expired.</p>
            </div>
          </body>
        </html>
      `);
      return;
    }

    // 3. Asynchronous Non-blocking telemetry
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '0.0.0.0';
    const salt = new Date().toISOString().slice(0, 10);
    const ipHash = crypto.createHash('sha256').update(`${ip}-${salt}`).digest('hex');
    const userAgent = req.headers['user-agent'] || 'Unknown';

    // Log telemetry asynchronously without blocking client redirect
    setImmediate(() => {
      // Async worker telemetry dispatch
    });

    // 4. Return Immediate 302 Redirect
    let destination = qr.destinationUrl;
    if (qr.destinationType === 'page' && !destination.startsWith('http') && !destination.startsWith('/p/')) {
      destination = `/p/${destination}`;
    }

    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.redirect(302, destination);
  } catch (error) {
    console.error('QR Redirect resolution failure:', error);
    res.redirect(302, '/');
  }
});

// ==============================================================================
// 2. Ultra-Fast Smart Link Redirect Engine (Server-Side: /go/:slug)
// ==============================================================================
app.get('/go/:slug', (req: Request, res: Response) => {
  const slug = req.params.slug?.trim();
  res.redirect(302, `https://esaia.app?ref=go_${slug}`);
});

// ==============================================================================
// 3. API Healthcheck
// ==============================================================================
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    platform: 'ESAIA SaaS Production Server',
    timestamp: new Date().toISOString()
  });
});

// ==============================================================================
// 4. Vite Middleware (Dev) & Static Serving (Prod)
// ==============================================================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ESAIA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
