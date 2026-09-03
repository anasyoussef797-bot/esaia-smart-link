/**
 * ESAIA - Custom Domain Type Definitions
 */

export type DomainStatus = 'pending_dns' | 'verified' | 'active' | 'failed';

export interface DnsRecord {
  type: 'CNAME' | 'TXT' | 'A';
  name: string;
  value: string;
  ttl?: number;
  status?: 'matched' | 'unmatched' | 'pending';
}

export interface CustomDomain {
  id: string;
  orgId: string;
  domain: string; // e.g., 'qr.brand.com'
  targetType: 'organization' | 'client' | 'page';
  targetId?: string;
  targetName?: string;
  status: DomainStatus;
  dnsRecords: DnsRecord[];
  sslActive: boolean;
  sslProvider?: string;
  sslExpiresAt?: string;
  isPrimary?: boolean;
  verifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
