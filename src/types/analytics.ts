/**
 * ESAIA - Scalable Analytics Engine Type Definitions
 */

export interface DeviceBreakdown {
  mobile: number;
  desktop: number;
  tablet: number;
  other: number;
}

export interface OsBreakdown {
  ios: number;
  android: number;
  windows: number;
  macos: number;
  linux: number;
  other: number;
}

export interface BrowserBreakdown {
  safari: number;
  chrome: number;
  firefox: number;
  edge: number;
  samsung: number;
  other: number;
}

export interface GeoBreakdown {
  [countryCode: string]: number;
}

export interface TopEntityStat {
  id: string;
  name: string;
  count: number;
  percentage?: number;
}

export interface AnalyticsDailySummary {
  id: string; // orgId_YYYY-MM-DD
  orgId: string;
  date: string; // YYYY-MM-DD
  totalScans: number;
  uniqueScans: number;
  deviceBreakdown: DeviceBreakdown;
  osBreakdown: OsBreakdown;
  browserBreakdown: BrowserBreakdown;
  countryBreakdown: GeoBreakdown;
  topQrCodes: TopEntityStat[];
  topPages: TopEntityStat[];
  updatedAt: string;
}

export interface QrAnalyticsDaily {
  id: string; // qrId_YYYY-MM-DD
  orgId: string;
  qrId: string;
  clientId: string;
  date: string; // YYYY-MM-DD
  hourlyScans: number[]; // Array of 24 numbers
  totalScans: number;
  uniqueScans: number;
  deviceBreakdown: DeviceBreakdown;
  countryBreakdown: GeoBreakdown;
  updatedAt: string;
}

export interface RawScanEvent {
  id: string;
  orgId: string;
  clientId: string;
  qrId: string;
  campaignId?: string | null;
  timestamp: string;
  ipHash: string; // Anonymized SHA256(IP + salt)
  userAgent: string;
  device: 'mobile' | 'desktop' | 'tablet' | 'other';
  os: string;
  browser: string;
  country: string;
  city: string;
  referrer: string;
  expiresAt: string; // 30-day TTL
}

export interface TimeSeriesPoint {
  date: string;
  scans: number;
  uniqueScans: number;
}
