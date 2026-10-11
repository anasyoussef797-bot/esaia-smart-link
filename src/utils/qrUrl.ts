/**
 * ESAIA - Dynamic QR Code & URL Resolution Engine
 * Generates valid, accessible, and live URLs for QR scanning on physical devices.
 * Automatically adapts to the current deployed origin (e.g. esaia-smart-link.vercel.app),
 * local development host, or verified custom domain.
 */

/**
 * Returns the current reachable origin of the application
 */
export function getAppBaseUrl(): string {
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin;
    if (origin && !origin.startsWith('file:') && !origin.startsWith('about:')) {
      return origin;
    }
  }
  return 'https://esaia-smart-link.vercel.app';
}

/**
 * Generates the full, scannable public redirect link for a QR code (/q/:slug)
 */
export function getQrRedirectUrl(publicCode: string): string {
  const base = getAppBaseUrl();
  const cleanCode = (publicCode || 'demo')
    .trim()
    .replace(/^\/+/, '')
    .replace(/^q\//, '')
    .replace(/\/+$/, '');
  return `${base}/q/${cleanCode}`;
}

/**
 * Generates the full public landing page URL (/p/:slug)
 */
export function getPagePublicUrl(slug: string): string {
  const base = getAppBaseUrl();
  const cleanSlug = (slug || '')
    .trim()
    .replace(/^\/+/, '')
    .replace(/^p\//, '')
    .replace(/\/+$/, '');
  return `${base}/p/${cleanSlug}`;
}

export interface QrPayloadOptions {
  preferDirectDestination?: boolean;
}

/**
 * Resolves the genuine, scannable payload string for any QR code campaign.
 * Can resolve directly to the live destination URL (guaranteed camera-scannable)
 * or the dynamic short redirect link (/q/:slug).
 */
export function getEffectiveQrPayload(
  qr: {
    destinationUrl?: string;
    publicCode?: string;
    destinationType?: string;
  },
  options: QrPayloadOptions = {}
): string {
  const { preferDirectDestination = false } = options;
  const destUrl = (qr.destinationUrl || '').trim();

  // 1. If explicit direct destination requested and URL is available
  if (preferDirectDestination && destUrl) {
    if (destUrl.startsWith('/p/')) {
      return getPagePublicUrl(destUrl.replace(/^\/p\//, ''));
    }
    return destUrl;
  }

  // 2. Special schemas (WiFi, WhatsApp, Tel, Mailto, VCard)
  if (qr.destinationType === 'wifi' && destUrl) {
    return destUrl.startsWith('WIFI:') ? destUrl : `WIFI:S:${destUrl};T:WPA;P:;;`;
  }
  if (qr.destinationType === 'whatsapp' && destUrl) {
    return destUrl.startsWith('http') ? destUrl : `https://wa.me/${destUrl.replace(/[^0-9]/g, '')}`;
  }
  if (qr.destinationType === 'phone' && destUrl) {
    return destUrl.startsWith('tel:') ? destUrl : `tel:${destUrl}`;
  }
  if (qr.destinationType === 'email' && destUrl) {
    return destUrl.startsWith('mailto:') ? destUrl : `mailto:${destUrl}`;
  }

  // 3. In dev / preview sandbox where external phones cannot access internal sandbox URLs
  const isDevSandbox = typeof window !== 'undefined' && 
    (window.location.hostname.includes('run.app') || window.location.hostname === 'localhost');
  if (isDevSandbox && destUrl.startsWith('http') && preferDirectDestination !== false) {
    return destUrl;
  }

  // 4. Default: Dynamic shortcode redirect URL (/q/:slug)
  if (qr.publicCode) {
    return getQrRedirectUrl(qr.publicCode);
  }

  // 5. Fallback to destination URL or demo
  return destUrl || getQrRedirectUrl('demo');
}

/**
 * Generates an official API URL from the free and reliable qrserver.com API
 * Reference: https://api.qrserver.com/v1/create-qr-code/
 */
export function getQrServerApiUrl(
  data: string,
  options: {
    size?: number;
    color?: string;
    bgcolor?: string;
    format?: 'png' | 'svg';
  } = {}
): string {
  const {
    size = 400,
    color = '#0f172a',
    bgcolor = '#ffffff',
    format = 'png'
  } = options;

  const cleanData = encodeURIComponent(data || 'https://esaia.app');
  const cleanColor = color.replace('#', '').trim() || '0f172a';
  const cleanBg = bgcolor.replace('#', '').trim() || 'ffffff';

  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${cleanData}&color=${cleanColor}&bgcolor=${cleanBg}&format=${format}&qzone=4`;
}
