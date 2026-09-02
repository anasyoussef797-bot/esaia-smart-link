/**
 * ESAIA - Client CRM Type Definitions
 */

export type ClientStatus = 'active' | 'archived' | 'pending';

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background?: string;
  text?: string;
}

export interface ClientStats {
  totalQrCodes: number;
  totalPages: number;
  totalScansAllTime: number;
  scansLast30Days: number;
}

export interface Client {
  id: string;
  orgId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  whatsapp?: string;
  website?: string;
  address?: string;
  brandColors: BrandColors;
  logoUrl?: string;
  status: ClientStatus;
  notes?: string;
  stats: ClientStats;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
