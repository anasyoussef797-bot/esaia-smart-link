/**
 * ESAIA - High Precision Vector SVG QR Engine
 * Generates standards-compliant vector SVG QR codes with eye styling, gradients,
 * central logo punchout, and CTA frame integration.
 */

import QRCode from 'qrcode';
import { QrStyleConfig } from '../../types/qr';
import { getQrRedirectUrl } from '../../utils/qrUrl';

export interface QrSvgRenderOptions {
  value: string;
  size?: number;
  style?: QrStyleConfig;
  styleConfig?: QrStyleConfig;
}

const DEFAULT_QR_STYLE: QrStyleConfig = {
  foregroundColor: '#0f172a',
  backgroundColor: '#ffffff',
  moduleStyle: 'square',
  eyeStyle: 'square',
  eyeBallStyle: 'square',
  eyeColor: '#0f172a',
  eyeInnerColor: '#0f172a',
  errorCorrectionLevel: 'H',
  quietZoneModules: 4,
  frameStyle: 'none',
  logoSizeRatio: 0.16,
  logoBackgroundPunchout: true,
  scannabilityGrade: 'A',
  healthScore: 98
};

export const qrVectorEngine = {
  /**
   * Generates a raw QR matrix
   */
  createMatrix(value: string, ecc: 'L' | 'M' | 'Q' | 'H' = 'M') {
    const cleanVal = value || getQrRedirectUrl('demo');
    return QRCode.create(cleanVal, { errorCorrectionLevel: ecc });
  },

  /**
   * Generates full standalone vector SVG string
   */
  generateSvgString(options: QrSvgRenderOptions): string {
    const { value, size = 400 } = options;
    const style = options.style || options.styleConfig || DEFAULT_QR_STYLE;

    // Auto-elevate error correction level if logo is present
    let effectiveEcc = style.errorCorrectionLevel || 'M';
    if (style.logoUrl && (effectiveEcc === 'L' || effectiveEcc === 'M')) {
      effectiveEcc = 'H';
    }

    const fallbackUrl = getQrRedirectUrl('demo');
    const qrData = this.createMatrix(value || fallbackUrl, effectiveEcc);
    const modules = qrData.modules;
    const moduleCount = modules.size;
    const margin = Math.max(4, style.quietZoneModules ?? 4);

    // Frame layout dimensions
    const isBannerBottom = style.frameStyle === 'banner_bottom';
    const isBadgeTop = style.frameStyle === 'badge_top';
    const isCardBorder = style.frameStyle === 'card_border';

    const bannerHeight = isBannerBottom || isBadgeTop ? Math.round(size * 0.18) : 0;
    const framePadding = isCardBorder ? Math.round(size * 0.05) : 0;

    const qrRenderSize = size - framePadding * 2;
    const totalSvgWidth = size;
    const totalSvgHeight = size + bannerHeight;

    const totalGridModules = moduleCount + margin * 2;
    const moduleSize = qrRenderSize / totalGridModules;

    const qrOffsetX = framePadding;
    const qrOffsetY = framePadding + (isBadgeTop ? bannerHeight : 0);

    // Unique gradient ID for this render
    const gradientId = `qr-grad-${Math.random().toString(36).substring(2, 9)}`;
    const hasGradient = Boolean(style.gradient?.enabled && style.gradient.startColor && style.gradient.endColor);
    const fillSource = hasGradient ? `url(#${gradientId})` : style.foregroundColor;

    let defsSvg = '';
    if (hasGradient && style.gradient) {
      if (style.gradient.type === 'radial') {
        defsSvg = `
          <defs>
            <radialGradient id="${gradientId}" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stop-color="${style.gradient.startColor}" />
              <stop offset="100%" stop-color="${style.gradient.endColor}" />
            </radialGradient>
          </defs>
        `;
      } else {
        const rotation = style.gradient.rotation ?? 45;
        const rad = (rotation * Math.PI) / 180;
        const x1 = Math.round(50 - Math.cos(rad) * 50);
        const y1 = Math.round(50 - Math.sin(rad) * 50);
        const x2 = Math.round(50 + Math.cos(rad) * 50);
        const y2 = Math.round(50 + Math.sin(rad) * 50);
        defsSvg = `
          <defs>
            <linearGradient id="${gradientId}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
              <stop offset="0%" stop-color="${style.gradient.startColor}" />
              <stop offset="100%" stop-color="${style.gradient.endColor}" />
            </linearGradient>
          </defs>
        `;
      }
    }

    let svgPaths = '';

    // Check if coordinate is in the 3 finder pattern eyes (7x7 corners)
    const isFinderPattern = (r: number, c: number) => {
      if (r < 7 && c < 7) return true; // Top-Left
      if (r < 7 && c >= moduleCount - 7) return true; // Top-Right
      if (r >= moduleCount - 7 && c < 7) return true; // Bottom-Left
      return false;
    };

    // Check if coordinate is inside the center logo cutout area
    const isLogoArea = (r: number, c: number) => {
      if (!style.logoUrl) return false;
      const center = moduleCount / 2;
      const logoRadius = (moduleCount * Math.min(0.24, Math.max(0.1, style.logoSizeRatio || 0.15))) / 1.35;
      return (
        r >= center - logoRadius &&
        r <= center + logoRadius &&
        c >= center - logoRadius &&
        c <= center + logoRadius
      );
    };

    // 1. Render data modules
    for (let r = 0; r < moduleCount; r++) {
      for (let c = 0; c < moduleCount; c++) {
        if (modules.get(r, c)) {
          if (isFinderPattern(r, c) || (style.logoUrl && isLogoArea(r, c))) {
            continue; // Handled separately or cleared for logo
          }

          const x = qrOffsetX + (c + margin) * moduleSize;
          const y = qrOffsetY + (r + margin) * moduleSize;

          if (style.moduleStyle === 'dots') {
            const radius = moduleSize * 0.44;
            svgPaths += `<circle cx="${x + moduleSize / 2}" cy="${y + moduleSize / 2}" r="${radius}" fill="${fillSource}" />`;
          } else if (style.moduleStyle === 'rounded') {
            const rx = moduleSize * 0.28;
            svgPaths += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${rx}" fill="${fillSource}" />`;
          } else if (style.moduleStyle === 'extra-rounded') {
            const rx = moduleSize * 0.48;
            svgPaths += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${rx}" fill="${fillSource}" />`;
          } else if (style.moduleStyle === 'classy') {
            // Teardrop leaf style with alternating rounded corners
            const rx = moduleSize * 0.45;
            svgPaths += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${(r + c) % 2 === 0 ? rx : 0}" fill="${fillSource}" />`;
          } else if (style.moduleStyle === 'diamond') {
            const half = moduleSize / 2;
            const cx = x + half;
            const cy = y + half;
            svgPaths += `<polygon points="${cx},${y} ${x + moduleSize},${cy} ${cx},${y + moduleSize} ${x},${cy}" fill="${fillSource}" />`;
          } else {
            // Square (standard) with slight overlap to prevent subpixel hairline seams
            svgPaths += `<rect x="${x}" y="${y}" width="${moduleSize + 0.2}" height="${moduleSize + 0.2}" fill="${fillSource}" />`;
          }
        }
      }
    }

    // 2. Render Standards-Compliant ISO/IEC Finder Patterns (3 corners: TL, TR, BL)
    const renderEye = (cornerX: number, cornerY: number) => {
      const x = qrOffsetX + (cornerX + margin) * moduleSize;
      const y = qrOffsetY + (cornerY + margin) * moduleSize;
      const eyeWidth = 7 * moduleSize;
      const innerWidth = 3 * moduleSize;
      const midWidth = 5 * moduleSize;
      const midX = x + moduleSize;
      const midY = y + moduleSize;
      const innerX = x + 2 * moduleSize;
      const innerY = y + 2 * moduleSize;

      const eyeColor = style.eyeColor || (hasGradient ? style.gradient!.startColor : style.foregroundColor);
      const innerColor = style.eyeInnerColor || style.eyeColor || (hasGradient ? style.gradient!.endColor : style.foregroundColor);
      const bgColor = style.backgroundColor || '#ffffff';

      const eyeFrameStyle = style.eyeStyle || 'square';
      const eyeBallStyle = style.eyeBallStyle || (eyeFrameStyle === 'circle' ? 'circle' : eyeFrameStyle === 'rounded' ? 'rounded' : 'square');

      // Subtle safe corner rounding (within optical decoding tolerances)
      const outerRx = eyeFrameStyle === 'circle' ? eyeWidth / 2 : eyeFrameStyle === 'rounded' ? moduleSize * 0.6 : 0;
      const midRx = eyeFrameStyle === 'circle' ? midWidth / 2 : eyeFrameStyle === 'rounded' ? moduleSize * 0.4 : 0;
      const innerRx = eyeBallStyle === 'circle' ? innerWidth / 2 : eyeBallStyle === 'rounded' ? moduleSize * 0.3 : 0;

      // Layer 1: Outer 7x7 dark box
      const outerSvg = `<rect x="${x}" y="${y}" width="${eyeWidth}" height="${eyeWidth}" rx="${outerRx}" fill="${eyeColor}" />`;
      // Layer 2: Middle 5x5 light ring (quiet separator)
      const midSvg = `<rect x="${midX}" y="${midY}" width="${midWidth}" height="${midWidth}" rx="${midRx}" fill="${bgColor}" />`;
      // Layer 3: Inner 3x3 dark core
      const innerSvg = `<rect x="${innerX}" y="${innerY}" width="${innerWidth}" height="${innerWidth}" rx="${innerRx}" fill="${innerColor}" />`;

      return `${outerSvg}\n${midSvg}\n${innerSvg}`;
    };

    const eyesSvg = `
      ${renderEye(0, 0)}
      ${renderEye(moduleCount - 7, 0)}
      ${renderEye(0, moduleCount - 7)}
    `;

    // 3. Optional Logo Placement with Punchout
    let logoSvg = '';
    if (style.logoUrl) {
      const logoPixSize = qrRenderSize * Math.min(0.24, Math.max(0.1, style.logoSizeRatio || 0.15));
      const logoX = qrOffsetX + (qrRenderSize - logoPixSize) / 2;
      const logoY = qrOffsetY + (qrRenderSize - logoPixSize) / 2;
      const punchoutPadding = style.logoBackgroundPunchout ? moduleSize * 0.8 : 0;
      const punchoutRadius = style.logoBackgroundPunchout ? moduleSize * 1.2 : 0;

      logoSvg = `
        <g id="qr-logo-layer">
          <rect 
            x="${logoX - punchoutPadding}" 
            y="${logoY - punchoutPadding}" 
            width="${logoPixSize + punchoutPadding * 2}" 
            height="${logoPixSize + punchoutPadding * 2}" 
            fill="${style.backgroundColor}" 
            rx="${punchoutRadius}"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
          />
          <image 
            href="${style.logoUrl}" 
            x="${logoX}" 
            y="${logoY}" 
            width="${logoPixSize}" 
            height="${logoPixSize}" 
            preserveAspectRatio="xMidYMid meet" 
          />
        </g>
      `;
    }

    // 4. Frames & Call to Action
    let frameSvg = '';
    if (isBannerBottom) {
      const bannerY = size;
      const bannerBg = style.frameBgColor || style.foregroundColor;
      const bannerTextColor = style.frameTextColor || style.backgroundColor;
      const bannerText = style.frameText || 'SCAN ME';

      frameSvg = `
        <g id="qr-banner-bottom">
          <path d="M 0 ${bannerY} Q 0 ${bannerY + 8} 8 ${bannerY + 8} L ${totalSvgWidth - 8} ${bannerY + 8} Q ${totalSvgWidth} ${bannerY + 8} ${totalSvgWidth} ${bannerY} L ${totalSvgWidth} ${totalSvgHeight - 12} Q ${totalSvgWidth} ${totalSvgHeight} ${totalSvgWidth - 12} ${totalSvgHeight} L 12 ${totalSvgHeight} Q 0 ${totalSvgHeight} 0 ${totalSvgHeight - 12} Z" fill="${bannerBg}" />
          <text 
            x="${totalSvgWidth / 2}" 
            y="${bannerY + bannerHeight / 2 + 5}" 
            text-anchor="middle" 
            fill="${bannerTextColor}" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-size="${Math.round(bannerHeight * 0.32)}px" 
            font-weight="800" 
            letter-spacing="2px"
          >
            ${bannerText}
          </text>
        </g>
      `;
    } else if (isBadgeTop) {
      const bannerBg = style.frameBgColor || style.foregroundColor;
      const bannerTextColor = style.frameTextColor || style.backgroundColor;
      const bannerText = style.frameText || 'SCAN TO CONNECT';

      frameSvg = `
        <g id="qr-badge-top">
          <path d="M 0 12 Q 0 0 12 0 L ${totalSvgWidth - 12} 0 Q ${totalSvgWidth} 0 ${totalSvgWidth} 12 L ${totalSvgWidth} ${bannerHeight} L 0 ${bannerHeight} Z" fill="${bannerBg}" />
          <text 
            x="${totalSvgWidth / 2}" 
            y="${bannerHeight / 2 + 5}" 
            text-anchor="middle" 
            fill="${bannerTextColor}" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-size="${Math.round(bannerHeight * 0.3)}px" 
            font-weight="800" 
            letter-spacing="1.5px"
          >
            ${bannerText}
          </text>
        </g>
      `;
    } else if (isCardBorder) {
      const borderColor = style.frameBgColor || style.foregroundColor;
      frameSvg = `
        <rect 
          x="2" 
          y="2" 
          width="${totalSvgWidth - 4}" 
          height="${totalSvgHeight - 4}" 
          rx="16" 
          fill="none" 
          stroke="${borderColor}" 
          stroke-width="3" 
          stroke-dasharray="8 4"
        />
      `;
    }

    // 5. Wrap in master SVG
    return `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 ${totalSvgWidth} ${totalSvgHeight}" 
        width="${totalSvgWidth}" 
        height="${totalSvgHeight}" 
        shape-rendering="crispEdges"
      >
        ${defsSvg}
        <rect width="100%" height="100%" fill="${style.backgroundColor}" rx="${isCardBorder ? '16' : '0'}" />
        <g id="qr-modules">
          ${svgPaths}
        </g>
        <g id="qr-eyes">
          ${eyesSvg}
        </g>
        ${logoSvg}
        ${frameSvg}
      </svg>
    `.trim();
  },

  /**
   * Triggers download of standalone SVG file
   */
  downloadSvg(svgString: string, filename = 'qr-code.svg') {
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  /**
   * Converts SVG to High-Resolution PNG for crisp physical print
   */
  async downloadPng(svgString: string, filename = 'qr-code.png', scaleMultiplier = 3) {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        try {
          const width = (img.naturalWidth || img.width || 400) * scaleMultiplier;
          const height = (img.naturalHeight || img.height || 400) * scaleMultiplier;
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Failed to obtain 2D canvas context');

          // Smoothing for print-ready rasterization
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.scale(scaleMultiplier, scaleMultiplier);
          ctx.drawImage(img, 0, 0);

          URL.revokeObjectURL(url);

          canvas.toBlob(blob => {
            if (!blob) {
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }
            const pngUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(pngUrl);
            resolve();
          }, 'image/png');
        } catch (err) {
          URL.revokeObjectURL(url);
          reject(err);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load SVG into image element'));
      };

      img.src = url;
    });
  },

  /**
   * Converts SVG to High-Resolution JPEG image for easy mobile sharing and physical advertising print
   */
  async downloadJpeg(svgString: string, filename = 'qr-code.jpg', scaleMultiplier = 3, backgroundColor = '#ffffff') {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        try {
          const width = (img.naturalWidth || img.width || 400) * scaleMultiplier;
          const height = (img.naturalHeight || img.height || 400) * scaleMultiplier;
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Failed to obtain 2D canvas context');

          // Fill solid background for JPEG (prevents black background artifact on transparent areas)
          ctx.fillStyle = backgroundColor || '#ffffff';
          ctx.fillRect(0, 0, width, height);

          // Smoothing for print-ready rasterization
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.scale(scaleMultiplier, scaleMultiplier);
          ctx.drawImage(img, 0, 0);

          URL.revokeObjectURL(url);

          canvas.toBlob(blob => {
            if (!blob) {
              reject(new Error('Canvas to JPEG Blob conversion failed'));
              return;
            }
            const jpegUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = jpegUrl;
            link.download = filename.endsWith('.jpg') || filename.endsWith('.jpeg') ? filename : `${filename}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(jpegUrl);
            resolve();
          }, 'image/jpeg', 0.95);
        } catch (err) {
          URL.revokeObjectURL(url);
          reject(err);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load SVG into image element'));
      };

      img.src = url;
    });
  },

  /**
   * Generates official live API link via qrserver.com
   * Reference: https://api.qrserver.com/v1/create-qr-code/
   */
  getApiQrServerUrl(
    value: string,
    size = 400,
    format: 'png' | 'svg' = 'png',
    foregroundColor = '#0f172a',
    backgroundColor = '#ffffff'
  ): string {
    const cleanData = encodeURIComponent(value || 'https://esaia.app');
    const color = foregroundColor.replace('#', '').trim() || '0f172a';
    const bgcolor = backgroundColor.replace('#', '').trim() || 'ffffff';
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${cleanData}&color=${color}&bgcolor=${bgcolor}&format=${format}&qzone=4`;
  },

  /**
   * Downloads a camera-ready QR code directly from qrserver.com API
   */
  async downloadFromQrServerApi(
    value: string,
    filename = 'qr-code-api.png',
    size = 600,
    foregroundColor = '#0f172a',
    backgroundColor = '#ffffff'
  ): Promise<void> {
    const url = this.getApiQrServerUrl(value, size, 'png', foregroundColor, backgroundColor);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch QR code from API');
    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  }
};

