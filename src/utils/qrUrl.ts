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
