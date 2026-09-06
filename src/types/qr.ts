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

export type QrModuleStyle = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'diamond';

export type QrEyeStyle = 'square' | 'circle' | 'rounded' | 'leaf' | 'diamond';

export type QrEyeBallStyle = 'square' | 'circle' | 'rounded' | 'diamond';

export type QrFrameStyle = 'none' | 'banner_bottom' | 'badge_top' | 'card_border' | 'phone_case';

export type ScannabilityGrade = 'A' | 'B' | 'C' | 'FAIL';

export interface QrGradientConfig {
  enabled: boolean;
  type: 'linear' | 'radial';
  startColor: string;
  endColor: string;
  rotation?: number; // In degrees, default 45
}

export interface QrStyleConfig {
  foregroundColor: string;
  backgroundColor: string;
  gradient?: QrGradientConfig;
  errorCorrectionLevel: ErrorCorrectionLevel;
  moduleStyle: QrModuleStyle;
  eyeStyle: QrEyeStyle;
  eyeBallStyle?: QrEyeBallStyle;
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
  healthScore?: number; // 0 - 100%
  verifiedAt?: string;
}

export interface QrCode {
  id: string;
  orgId: string;
  clientId: string;
  clientName?: string;
  campaignId?: string | null;
  name: string;
  publicCode: string; // Unique shortcode e.g. 'es_8a7k2'
  destinationType: QrDestinationType;
  destinationUrl: string;
  targetEntityId?: string | null; // e.g. pageId, menuId, assetId
  status: QrStatus;
  expiresAt?: string | null;
  styleConfig: QrStyleConfig;
  design?: any;
  totalScans: number;
  uniqueScans: number;
  lastScannedAt?: string | null;
  notes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ValidationStageResult {
  id: number;
  name: string;
  passed: boolean;
  status: 'passed' | 'warning' | 'failed';
  scoreImpact: number;
  description: string;
}

export interface QrValidationReport {
  isValid: boolean;
  grade: ScannabilityGrade;
  healthScore: number; // 0 to 100
  contrastRatio: number;
  quietZonePassed: boolean;
  logoRatioPassed: boolean;
  eccLevelPassed: boolean;
  softwareDecodePassed: boolean;
  stages: ValidationStageResult[];
  issues: string[];
  recommendations: string[];
}
