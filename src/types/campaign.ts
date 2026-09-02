/**
 * ESAIA - Campaign & Smart Link Type Definitions
 */

export type CampaignStatus = 'active' | 'scheduled' | 'completed' | 'paused';

export interface Campaign {
  id: string;
  orgId: string;
  clientId: string;
  name: string;
  description?: string;
  qrCodeIds: string[];
  pageIds: string[];
  startDate: string;
  endDate?: string | null;
  status: CampaignStatus;
  totalScans: number;
  createdAt: string;
  updatedAt: string;
}

export type SmartLinkStatus = 'active' | 'disabled' | 'expired';

export interface SmartLink {
  id: string;
  orgId: string;
  clientId: string;
  campaignId?: string | null;
  title: string;
  publicCode: string; // e.g., 'summer26'
  destinationUrl: string;
  status: SmartLinkStatus;
  totalClicks: number;
  expiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
