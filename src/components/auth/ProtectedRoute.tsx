/**
 * ESAIA - Protected Route Guard Component
 * Enforces Authentication, Multi-Tenant Session, and RBAC Permissions.
 */

import React, { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Permission, Role } from '../../types/auth';
import { PermissionDenied } from '../ui/PermissionDenied';
import { LoadingScreen } from '../ui/LoadingScreen';

export interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission?: Permission;
  requireSuperAdmin?: boolean;
  requireOrgAdmin?: boolean;
  onNavigate?: (path: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission,
  requireSuperAdmin = false,
  requireOrgAdmin = false,
  onNavigate
}) => {
  const { isAuthenticated, isLoading, isSuperAdmin, isOrgAdmin, hasPermission } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Verifying security credentials &amp; workspace role..." />;
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <PermissionDenied
        requiredPermission="User Authentication Required"
        onGoBack={() => onNavigate && onNavigate('/login')}
      />
    );
  }

  // Super Admin check
  if (requireSuperAdmin && !isSuperAdmin()) {
    return (
      <PermissionDenied
        requiredPermission="Platform Super Administrator Privilege"
        onGoBack={() => onNavigate && onNavigate('/admin/overview')}
      />
    );
  }

  // Org Admin check
  if (requireOrgAdmin && !isOrgAdmin()) {
    return (
      <PermissionDenied
        requiredPermission="Organization Administrator Access"
        onGoBack={() => onNavigate && onNavigate('/admin/overview')}
      />
    );
  }

  // Granular RBAC permission check
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <PermissionDenied
        requiredPermission={requiredPermission}
        onGoBack={() => onNavigate && onNavigate('/admin/overview')}
      />
    );
  }

  return <>{children}</>;
};
