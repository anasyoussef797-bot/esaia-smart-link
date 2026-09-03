/**
 * ESAIA - Authentication & Multi-Tenant RBAC Type Definitions
 */

export type Role = 'super_admin' | 'org_admin' | 'staff' | 'staff_editor' | 'client_viewer';
export type UserRole = Role;

export type OrgPlan = 'starter' | 'pro' | 'growth' | 'enterprise';

export type Permission =
  | 'org:read'
  | 'org:update'
  | 'org:manage_team'
  | 'org:manage_billing'
  | 'clients:view'
  | 'clients:manage'
  | 'qr:create'
  | 'qr:edit'
  | 'qr:delete'
  | 'qr:export'
  | 'pages:builder'
  | 'pages:publish'
  | 'pages:delete'
  | 'links:manage'
  | 'analytics:view_all'
  | 'analytics:view_assigned'
  | 'analytics:export'
  | 'domains:manage'
  | 'migration:import'
  | 'audit:view';

export const ALL_PERMISSIONS: Permission[] = [
  'org:read',
  'org:update',
  'org:manage_team',
  'org:manage_billing',
  'clients:view',
  'clients:manage',
  'qr:create',
  'qr:edit',
  'qr:delete',
  'qr:export',
  'pages:builder',
  'pages:publish',
  'pages:delete',
  'links:manage',
  'analytics:view_all',
  'analytics:view_assigned',
  'analytics:export',
  'domains:manage',
  'migration:import',
  'audit:view'
];

export const ROLE_DEFAULT_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [...ALL_PERMISSIONS],
  org_admin: [
    'org:read',
    'org:update',
    'org:manage_team',
    'org:manage_billing',
    'clients:view',
    'clients:manage',
    'qr:create',
    'qr:edit',
    'qr:delete',
    'qr:export',
    'pages:builder',
    'pages:publish',
    'pages:delete',
    'links:manage',
    'analytics:view_all',
    'analytics:export',
    'domains:manage',
    'migration:import',
    'audit:view'
  ],
  staff: [
    'org:read',
    'clients:view',
    'clients:manage',
    'qr:create',
    'qr:edit',
    'qr:export',
    'pages:builder',
    'pages:publish',
    'links:manage',
    'analytics:view_all'
  ],
  staff_editor: [
    'org:read',
    'clients:view',
    'clients:manage',
    'qr:create',
    'qr:edit',
    'qr:export',
    'pages:builder',
    'pages:publish',
    'links:manage',
    'analytics:view_all'
  ],
  client_viewer: [
    'org:read',
    'clients:view',
    'analytics:view_assigned'
  ]
};

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoUrl?: string | null;
  defaultOrgId?: string;
  isGlobalSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WhiteLabelBranding {
  platformName?: string;
  tagline?: string;
  logoLightUrl?: string | null;
  logoDarkUrl?: string | null;
  faviconUrl?: string | null;
  accentColor?: string; // hex e.g. '#2563eb'
  hidePoweredBy?: boolean;
  footerCopyright?: string;
  supportEmail?: string;
  privacyPolicyUrl?: string;
  termsOfServiceUrl?: string;
  senderName?: string;
  senderEmail?: string;
  emailSignature?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: OrgPlan;
  maxClients: number;
  maxQrCodes: number;
  customDomains: string[];
  logoUrl?: string | null;
  branding?: WhiteLabelBranding;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMember {
  id: string; // orgId_userId
  orgId: string;
  userId: string;
  userEmail: string;
  displayName?: string;
  role: Role;
  permissions: Permission[];
  assignedClientIds: string[]; // Empty means access to all clients in the org
  status: 'active' | 'invited' | 'pending' | 'suspended';
  invitedAt: string;
  joinedAt?: string;
}

export interface AuthSession {
  user: UserProfile | null;
  currentOrg: Organization | null;
  currentMembership: OrganizationMember | null;
  availableOrgs: Organization[];
  isAuthenticated: boolean;
  isLoading: boolean;
}
