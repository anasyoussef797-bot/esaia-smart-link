/**
 * ESAIA - Multi-Tenant Authentication & Session Context
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { UserProfile, Organization, OrganizationMember, Permission, Role, ROLE_DEFAULT_PERMISSIONS } from '../types/auth';
import { authService } from '../services/firebase/authService';

interface AuthContextValue {
  user: UserProfile | null;
  currentOrg: Organization | null;
  currentMembership: OrganizationMember | null;
  availableOrgs: Organization[];
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPermission: (permission: Permission) => boolean;
  isOrgAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  switchOrganization: (orgId: string) => void;
  createNewOrganization: (name: string, slug?: string, plan?: 'starter' | 'growth' | 'enterprise') => Promise<Organization>;
  simulateRoleLogin: (role: Role, customEmail?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_ACTIVE_ORG_KEY = 'esaia_active_org_id';
const STORAGE_ACTIVE_USER_KEY = 'esaia_active_user_session';

const DEFAULT_ORGS: Organization[] = [
  {
    id: 'org_esaia_main',
    name: 'ESAIA Enterprise Workspace',
    slug: 'esaia-main',
    plan: 'enterprise',
    maxClients: 5000,
    maxQrCodes: 50000,
    customDomains: ['esaia.app', 'qr.esaia.app'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'org_impact_hub',
    name: 'Impact Hub Cairo',
    slug: 'impacthub-eg',
    plan: 'growth',
    maxClients: 500,
    maxQrCodes: 2500,
    customDomains: ['qr.impacthub.eg'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'org_apex_capital',
    name: 'Apex Capital Partners',
    slug: 'apex-capital',
    plan: 'growth',
    maxClients: 250,
    maxQrCodes: 1000,
    customDomains: ['apexcap.ae'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_SUPER_ADMIN_USER: UserProfile = {
  id: 'u_superadmin_anas',
  email: 'anasyoussef797@gmail.com',
  displayName: 'Anas Youssef (Super Admin)',
  photoUrl: null,
  isGlobalSuperAdmin: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const DEFAULT_SUPER_ADMIN_MEMBERSHIP: OrganizationMember = {
  id: 'org_esaia_main_superadmin',
  orgId: 'org_esaia_main',
  userId: 'u_superadmin_anas',
  userEmail: 'anasyoussef797@gmail.com',
  displayName: 'Anas Youssef',
  role: 'super_admin',
  permissions: ROLE_DEFAULT_PERMISSIONS['super_admin'],
  assignedClientIds: [],
  status: 'active',
  invitedAt: new Date().toISOString(),
  joinedAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with ready-to-go auto-login mock session in preview mode
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIVE_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return DEFAULT_SUPER_ADMIN_USER;
  });

  const [availableOrgs, setAvailableOrgs] = useState<Organization[]>(DEFAULT_ORGS);

  const [currentOrg, setCurrentOrg] = useState<Organization | null>(() => {
    try {
      const savedOrgId = localStorage.getItem(STORAGE_ACTIVE_ORG_KEY);
      const matched = DEFAULT_ORGS.find(o => o.id === savedOrgId);
      if (matched) return matched;
    } catch (e) {
      // fallback
    }
    return DEFAULT_ORGS[0];
  });

  const [currentMembership, setCurrentMembership] = useState<OrganizationMember | null>(DEFAULT_SUPER_ADMIN_MEMBERSHIP);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Non-blocking background sync with Firebase Auth if available
    const unsubscribe = authService.subscribeToAuthState(session => {
      if (session.user) {
        setUser(session.user);
        if (session.availableOrgs.length > 0) {
          setAvailableOrgs(session.availableOrgs);
        }
        if (session.currentOrg) {
          setCurrentOrg(session.currentOrg);
        }
        if (session.currentMembership) {
          setCurrentMembership(session.currentMembership);
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isSuperAdmin = (): boolean => {
    return Boolean(
      user?.isGlobalSuperAdmin ||
      user?.email === 'anasyoussef797@gmail.com' ||
      currentMembership?.role === 'super_admin'
    );
  };

  const isOrgAdmin = (): boolean => {
    if (isSuperAdmin()) return true;
    return currentMembership?.role === 'org_admin';
  };

  const hasPermission = (permission: Permission): boolean => {
    if (isSuperAdmin()) return true;
    if (isOrgAdmin()) return true;
    if (!currentMembership) return false;
    return currentMembership.permissions.includes(permission);
  };

  const switchOrganization = (orgId: string) => {
    const target = availableOrgs.find(o => o.id === orgId);
    if (target) {
      setCurrentOrg(target);
      localStorage.setItem(STORAGE_ACTIVE_ORG_KEY, orgId);

      // Update current membership for selected organization
      if (currentMembership) {
        setCurrentMembership({
          ...currentMembership,
          orgId: target.id
        });
      }
    }
  };

  const createNewOrganization = async (
    name: string,
    slug?: string,
    plan: 'starter' | 'growth' | 'enterprise' = 'growth'
  ): Promise<Organization> => {
    const userId = user?.id || 'u_admin';
    const userEmail = user?.email || 'admin@esaia.app';

    const newOrg = await authService.createOrganization(userId, userEmail, name, slug, plan);
    setAvailableOrgs(prev => [newOrg, ...prev]);
    setCurrentOrg(newOrg);
    localStorage.setItem(STORAGE_ACTIVE_ORG_KEY, newOrg.id);

    const newMembership: OrganizationMember = {
      id: `${newOrg.id}_${userId}`,
      orgId: newOrg.id,
      userId,
      userEmail,
      role: 'org_admin',
      permissions: ROLE_DEFAULT_PERMISSIONS['org_admin'],
      assignedClientIds: [],
      status: 'active',
      invitedAt: new Date().toISOString(),
      joinedAt: new Date().toISOString()
    };
    setCurrentMembership(newMembership);

    return newOrg;
  };

  /**
   * Helper for instant RBAC switching in development/demo environments
   */
  const simulateRoleLogin = (role: Role, customEmail?: string) => {
    const roleEmail = customEmail || (
      role === 'super_admin' ? 'anasyoussef797@gmail.com' :
      role === 'org_admin' ? 'orgadmin@impacthub.eg' :
      role === 'staff_editor' ? 'editor@esaia.app' :
      'client@partner.ae'
    );

    const roleName = (
      role === 'super_admin' ? 'Anas Youssef (Super Admin)' :
      role === 'org_admin' ? 'Karim Mansour (Org Admin)' :
      role === 'staff_editor' ? 'Layla Zaki (Editor)' :
      'Tariq Al-Masri (Client Viewer)'
    );

    const simulatedUser: UserProfile = {
      id: `sim_${role}_${Date.now()}`,
      email: roleEmail,
      displayName: roleName,
      isGlobalSuperAdmin: role === 'super_admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const simulatedMember: OrganizationMember = {
      id: `mem_${role}`,
      orgId: currentOrg?.id || 'org_esaia_main',
      userId: simulatedUser.id,
      userEmail: roleEmail,
      role,
      permissions: ROLE_DEFAULT_PERMISSIONS[role],
      assignedClientIds: [],
      status: 'active',
      invitedAt: new Date().toISOString(),
      joinedAt: new Date().toISOString()
    };

    setUser(simulatedUser);
    setCurrentMembership(simulatedMember);
    try {
      localStorage.setItem(STORAGE_ACTIVE_USER_KEY, JSON.stringify(simulatedUser));
    } catch (e) {
      // ignore
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // ignore
    }
    setUser(null);
    setCurrentOrg(null);
    setCurrentMembership(null);
    localStorage.removeItem(STORAGE_ACTIVE_ORG_KEY);
    localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentOrg,
        currentMembership,
        availableOrgs,
        isAuthenticated: Boolean(user),
        isLoading,
        hasPermission,
        isOrgAdmin,
        isSuperAdmin,
        switchOrganization,
        createNewOrganization,
        simulateRoleLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
