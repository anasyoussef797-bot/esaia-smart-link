/**
 * ESAIA - High Precision Vector SVG QR Engine
 * Generates standards-compliant vector SVG QR codes with eye styling and logo embedding.
 */

import QRCode from 'qrcode';
import { QrStyleConfig } from '../../types/qr';

export interface QrSvgRenderOptions {
  value: string;
  size?: number;
  style: QrStyleConfig;
}

export const qrVectorEngine = {
  /**
   * Generates a raw QR matrix
   */
  createMatrix(value: string, ecc: 'L' | 'M' | 'Q' | 'H' = 'M') {
    return QRCode.create(value, { errorCorrectionLevel: ecc });
  },

  /**
   * Generates full standalone vector SVG string
   */
  generateSvgString(options: QrSvgRenderOptions): string {
    const { value, size = 400, style } = options;
    const qrData = this.createMatrix(value, style.errorCorrectionLevel);
    const modules = qrData.modules;
    const moduleCount = modules.size;
    const margin = style.quietZoneModules || 4;
    const totalSize = moduleCount + margin * 2;
    const moduleSize = size / totalSize;

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
      const logoRadius = (moduleCount * style.logoSizeRatio) / 1.5;
      return (
        r >= center - logoRadius &&
        r <= center + logoRadius &&
        c >= center - logoRadius &&
        c <= center + logoRadius
      );
    };

    // 1. Render modules
    for (let r = 0; r < moduleCount; r++) {
      for (let c = 0; c < moduleCount; c++) {
        if (modules.get(r, c)) {
          if (isFinderPattern(r, c) || (style.logoUrl && isLogoArea(r, c))) {
            continue; // Handled separately or skipped for logo
          }

          const x = (c + margin) * moduleSize;
          const y = (r + margin) * moduleSize;

          if (style.moduleStyle === 'dots') {
            const radius = moduleSize * 0.42;
            svgPaths += `<circle cx="${x + moduleSize / 2}" cy="${y + moduleSize / 2}" r="${radius}" fill="${style.foregroundColor}" />`;
          } else if (style.moduleStyle === 'rounded') {
            const rOffset = moduleSize * 0.25;
            svgPaths += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${rOffset}" fill="${style.foregroundColor}" />`;
          } else {
            svgPaths += `<rect x="${x}" y="${y}" width="${moduleSize + 0.2}" height="${moduleSize + 0.2}" fill="${style.foregroundColor}" />`;
          }
        }
      }
    }

    // 2. Render Custom Eye Finder Patterns (3 corners: TL, TR, BL)
    const renderEye = (cornerX: number, cornerY: number) => {
      const x = (cornerX + margin) * moduleSize;
      const y = (cornerY + margin) * moduleSize;
      const eyeWidth = 7 * moduleSize;
      const innerWidth = 3 * moduleSize;
      const innerX = x + 2 * moduleSize;
      const innerY = y + 2 * moduleSize;

      const eyeColor = style.eyeColor || style.foregroundColor;
      const innerColor = style.eyeInnerColor || style.foregroundColor;

      if (style.eyeStyle === 'circle') {
        const outerR = eyeWidth / 2;
        const cx = x + outerR;
        const cy = y + outerR;
        return `
          <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="${eyeColor}" stroke-width="${moduleSize}" />
          <circle cx="${cx}" cy="${cy}" r="${innerWidth / 2}" fill="${innerColor}" />
        `;
      } else if (style.eyeStyle === 'rounded') {
        return `
          <rect x="${x}" y="${y}" width="${eyeWidth}" height="${eyeWidth}" rx="${moduleSize * 1.5}" fill="none" stroke="${eyeColor}" stroke-width="${moduleSize}" />
          <rect x="${innerX}" y="${innerY}" width="${innerWidth}" height="${innerWidth}" rx="${moduleSize * 0.8}" fill="${innerColor}" />
        `;
      } else {
        return `
          <rect x="${x}" y="${y}" width="${eyeWidth}" height="${eyeWidth}" fill="none" stroke="${eyeColor}" stroke-width="${moduleSize}" />
          <rect x="${innerX}" y="${innerY}" width="${innerWidth}" height="${innerWidth}" fill="${innerColor}" />
        `;
      }
    };

    const eyesSvg = `
      ${renderEye(0, 0)}
      ${renderEye(moduleCount - 7, 0)}
      ${renderEye(0, moduleCount - 7)}
    `;

    // 3. Optional Logo Placement
    let logoSvg = '';
    if (style.logoUrl) {
      const logoPixSize = size * style.logoSizeRatio;
      const logoX = (size - logoPixSize) / 2;
      const logoY = (size - logoPixSize) / 2;
      const punchoutRadius = style.logoBackgroundPunchout ? moduleSize * 0.8 : 0;

      logoSvg = `
        <rect x="${logoX - 4}" y="${logoY - 4}" width="${logoPixSize + 8}" height="${logoPixSize + 8}" fill="${style.backgroundColor}" rx="${punchoutRadius}" />
        <image href="${style.logoUrl}" x="${logoX}" y="${logoY}" width="${logoPixSize}" height="${logoPixSize}" preserveAspectRatio="xMidYMid meet" />
      `;
    }

    // 4. Wrap in root SVG
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="crispEdges">
        <rect width="100%" height="100%" fill="${style.backgroundColor}" />
        ${svgPaths}
        ${eyesSvg}
        ${logoSvg}
      </svg>
    `.trim();
  }
};
