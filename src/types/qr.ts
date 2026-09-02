/**
 * ESAIA - Dynamic QR Engine Type Definitions
 */

export type QrDestinationType =
  | 'url'
  | 'dynamic_url'
  | 'vcard'
  | 'page'
  | 'menu'
  | 'whatsapp'
  | 'phone'
  | 'email'
  | 'sms'
  | 'wifi'
  | 'file'
  | 'text'
  | 'social';

export type QrStatus = 'active' | 'paused' | 'expired' | 'archived';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type QrModuleStyle = 'square' | 'dots' | 'rounded' | 'classy' | 'diamond';

export type QrEyeStyle = 'square' | 'circle' | 'rounded' | 'diamond';

export type QrFrameStyle = 'none' | 'banner_bottom' | 'badge_top' | 'card_border' | 'phone_case';

export type ScannabilityGrade = 'A' | 'B' | 'C' | 'FAIL';

export interface QrStyleConfig {
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  moduleStyle: QrModuleStyle;
  eyeStyle: QrEyeStyle;
  eyeColor?: string;
  eyeInnerColor?: string;
  logoUrl?: string | null;
  logoSizeRatio: number; // 0.05 to 0.22 max
  logoBackgroundPunchout: boolean;
  quietZoneModules: number; // Minimum 4 modules
  frameStyle: QrFrameStyle;
  frameText?: string;
  frameTextColor?: string;
  frameBgColor?: string;
  scannabilityGrade: ScannabilityGrade;
  verifiedAt?: string;
}

export interface QrCode {
  id: string;
  orgId: string;
  clientId: string;
  campaignId?: string | null;
  name: string;
  publicCode: string; // Unique shortcode e.g. 'es_8a7k2'
  destinationType: QrDestinationType;
  destinationUrl: string;
  targetEntityId?: string | null; // e.g. pageId, menuId, assetId
  status: QrStatus;
  expiresAt?: string | null;
  styleConfig: QrStyleConfig;
  totalScans: number;
  uniqueScans: number;
  lastScannedAt?: string | null;
  notes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface QrValidationReport {
  isValid: boolean;
  grade: ScannabilityGrade;
  contrastRatio: number;
  quietZonePassed: boolean;
  logoRatioPassed: boolean;
  eccLevelPassed: boolean;
  softwareDecodePassed: boolean;
  issues: string[];
  recommendations: string[];
}
