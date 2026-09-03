/**
 * ESAIA - Security Audit Log Type Definitions
 */

export type AuditAction =
  | 'user:login'
  | 'user:invite'
  | 'user:role_change'
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
  | 'domain:add'
  | 'domain:verify'
  | 'domain:delete';

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
  status?: 'success' | 'warning' | 'failure';
}
