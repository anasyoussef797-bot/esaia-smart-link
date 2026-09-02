/**
 * ESAIA - Security Audit Log Type Definitions
 */

export type AuditAction =
  | 'user:login'
  | 'user:invite'
  | 'client:create'
  | 'client:update'
  | 'client:archive'
  | 'qr:create'
  | 'qr:update'
  | 'qr:status_change'
  | 'qr:delete'
  | 'page:create'
  | 'page:publish'
  | 'page:unpublish'
  | 'page:delete'
  | 'data:export'
  | 'migration:import'
  | 'domain:verify';

export type ResourceType = 'client' | 'qr' | 'page' | 'link' | 'domain' | 'user' | 'org' | 'system';

export interface AuditLog {
  id: string;
  orgId: string;
  actorUserId: string;
  actorEmail: string;
  action: AuditAction;
  resourceType: ResourceType;
  resourceId: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  timestamp: string;
}
