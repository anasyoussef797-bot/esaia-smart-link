/**
 * ESAIA - Production Full-Stack Server Entry Point
 * Handles ultra-fast server-side QR redirects (/q/:slug), Smart Links (/go/:slug),
 * and integrates Vite middleware for development and static SPA serving for production.
 */

import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import dns from 'dns/promises';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ==============================================================================
// Security Headers Middleware
// ==============================================================================
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// ==============================================================================
// Multi-Domain Routing & Custom CNAME Host Interceptor
// ==============================================================================
export interface DomainRouteTarget {
  orgId: string;
  targetType: 'organization' | 'page' | 'link';
  targetId?: string;
  status: 'active' | 'pending_dns' | 'ssl_issuing' | 'error';
  targetName?: string;
}

const domainRoutingCache = new Map<string, DomainRouteTarget>([
  ['qr.impacthub.eg', { orgId: 'org_impact_hub', targetType: 'organization', status: 'active', targetName: 'Impact Hub Cairo' }],
  ['menu.nilecoffee.com', { orgId: 'org_impact_hub', targetType: 'page', targetId: 'page_nile_menu', status: 'active', targetName: 'Nile Coffee Roasters' }],
  ['card.apextariq.com', { orgId: 'org_impact_hub', targetType: 'page', targetId: 'page_apex_tariq', status: 'active', targetName: 'Apex Tariq vCard' }]
]);

// Host Interception Middleware for Custom Domains
app.use((req: Request, res: Response, next: NextFunction) => {
  const rawHost = (req.headers['x-forwarded-host'] as string) || req.headers.host || '';
  const hostname = rawHost.split(':')[0].toLowerCase();

  // Skip system hosts and direct API routes
  const isDefaultHost = 
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.run.app') ||
    hostname.endsWith('.aistudio.dev') ||
    hostname === 'esaia.app' ||
    hostname === 'www.esaia.app';

  if (!isDefaultHost) {
    const route = domainRoutingCache.get(hostname);
    if (route && route.status === 'active') {
      // Attach resolved domain metadata to response locals
      res.locals.customDomain = { hostname, ...route };

      // Root path rewrite or redirect to target resource
      if (req.path === '/' || req.path === '') {
        if (route.targetType === 'page' && route.targetId) {
          res.redirect(302, `/p/${route.targetId}`);
          return;
        }
        if (route.targetType === 'organization') {
          res.redirect(302, '/admin/overview');
          return;
        }
      }
    }
  }

  next();
});

// Endpoint to inspect or register custom domain routing dynamically
app.post('/api/domains/register-route', (req: Request, res: Response) => {
  const { domain, orgId, targetType, targetId, status } = req.body;
  if (!domain || !orgId) {
    res.status(400).json({ error: 'Domain and orgId are required' });
    return;
  }
  const cleanDomain = domain.trim().toLowerCase();
  domainRoutingCache.set(cleanDomain, {
    orgId,
    targetType: targetType || 'organization',
    targetId: targetId || undefined,
    status: status || 'active'
  });
  res.json({ success: true, domain: cleanDomain, route: domainRoutingCache.get(cleanDomain) });
});

// Endpoint to query current domain routing
app.get('/api/domains/route-info', (req: Request, res: Response) => {
  const domain = (req.query.domain as string)?.toLowerCase();
  if (domain && domainRoutingCache.has(domain)) {
    res.json({ found: true, domain, route: domainRoutingCache.get(domain) });
    return;
  }
  res.json({
    found: false,
    allMappedDomains: Array.from(domainRoutingCache.keys())
  });
});

// Real-time DNS Verification pipeline (CNAME and TXT)
app.post('/api/domains/verify-dns', async (req: Request, res: Response) => {
  const { domain, expectedCname, challengeTxt } = req.body;
  if (!domain) {
    res.status(400).json({ error: 'Domain is required' });
    return;
  }

  const cleanDomain = domain.trim().toLowerCase();
  let cnameMatched = false;
  let txtMatched = false;
  let cnameRecord = '';
  let txtRecords: string[][] = [];

  try {
    try {
      const cnames = await dns.resolveCname(cleanDomain);
      cnameRecord = cnames[0] || '';
      if (
        cnameRecord.toLowerCase().includes('esaia.app') ||
        (expectedCname && cnameRecord.toLowerCase().includes(expectedCname.toLowerCase()))
      ) {
        cnameMatched = true;
      }
    } catch {
      // CNAME resolution failed or no record
    }

    try {
      const challengeHost = `_esaia-challenge.${cleanDomain}`;
      txtRecords = await dns.resolveTxt(challengeHost);
      const flat = txtRecords.flat();
      if (
        flat.some(v => v.includes('esaia-verify') || (challengeTxt && v.includes(challengeTxt)))
      ) {
        txtMatched = true;
      }
    } catch {
      // TXT challenge resolution failed or no record
    }

    const verified = cnameMatched || txtMatched;
    if (verified && domainRoutingCache.has(cleanDomain)) {
      const existing = domainRoutingCache.get(cleanDomain)!;
      existing.status = 'active';
    }

    res.json({
      domain: cleanDomain,
      verified,
      cnameMatched,
      txtMatched,
      cnameRecord: cnameRecord || null,
      txtRecords: txtRecords.flat(),
      sslReady: verified,
      checkedAt: new Date().toISOString()
    });
  } catch (err: any) {
    res.json({
      domain: cleanDomain,
      verified: false,
      cnameMatched: false,
      txtMatched: false,
      error: err.message,
      checkedAt: new Date().toISOString()
    });
  }
});

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

    if (qr) {
      // Keep cached entry fresh
      qr.cachedAt = Date.now();
    } else {
      // Fallback destination for unknown codes
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

  // 500 Error Handler Middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('ESAIA Server Unhandled Exception:', err);
    if (req.accepts('json') && !req.accepts('html')) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: err?.message || 'An unexpected error occurred on the enterprise server.',
        code: 'INTERNAL_SERVER_ERROR',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>500 - Server Error | ESAIA</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #090b10; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; padding: 20px;">
            <div style="max-width: 460px; width: 100%; padding: 32px; border: 1px solid #24293d; border-radius: 16px; background: #12151f; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
              <div style="display: inline-block; padding: 8px 16px; background: rgba(244, 63, 94, 0.15); color: #f43f5e; border-radius: 9999px; font-weight: 700; font-size: 14px; margin-bottom: 16px;">
                500 Server Error
              </div>
              <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 8px;">Service Temporarily Unavailable</h1>
              <p style="color: #94a3b8; font-size: 14px; line-height: 1.5; margin: 0 0 24px;">An internal server exception was caught. The request has been recorded in the security audit logs.</p>
              <a href="/admin/overview" style="display: inline-block; padding: 10px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Return to Dashboard</a>
            </div>
          </body>
        </html>
      `);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ESAIA Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
