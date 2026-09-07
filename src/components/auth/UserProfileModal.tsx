/**
 * ESAIA - User Profile & Session Security Modal
 */

import React from 'react';
import { User, ShieldCheck, Building2, KeyRound, LogOut, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Role } from '../../types/auth';

export interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const {
    user,
    currentOrg,
    currentMembership,
    isSuperAdmin,
    simulateRoleLogin,
    logout
  } = useAuth();
  const { t } = useLanguage();

  const handleRoleSwitch = (role: Role) => {
    simulateRoleLogin(role);
    onClose();
  };

  const handleSignOut = async () => {
    onClose();
    await logout();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t.header.profile}
      description="Manage active account, tenant context, and role authorization."
      size="md"
    >
      <div className="space-y-5">
        {/* User Summary Card */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fbf9f4] border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shrink-0">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] truncate">{user?.displayName || 'Administrator'}</h3>
              {isSuperAdmin() && (
                <Badge variant="brand">{t.rbac.superAdmin}</Badge>
              )}
            </div>
            <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72] font-mono truncate">{user?.email || 'admin@esaia.app'}</p>
          </div>
        </div>

        {/* Active Organization Context */}
        <div className="p-3.5 rounded-xl bg-[#141722] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fbf9f4] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700" />
              Active Workspace
            </span>
            <span className="text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] font-semibold">{currentOrg?.name || 'Primary Workspace'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72]">Workspace Identifier</span>
            <code className="text-blue-400 [data-theme=light]:text-blue-700 [data-theme=beige]:text-blue-800 font-mono">{currentOrg?.slug || 'esaia-main'}</code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72]">Subscription Tier</span>
            <Badge variant="success" size="sm">
              {(currentOrg?.plan || 'enterprise').toUpperCase()} TIER
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72]">Assigned Workspace Role</span>
            <span className="text-emerald-400 [data-theme=light]:text-emerald-700 [data-theme=beige]:text-emerald-800 font-semibold uppercase">
              {currentMembership?.role?.replace('_', ' ') || 'ORG ADMIN'}
            </span>
          </div>
        </div>

        {/* Quick Role Simulation (RBAC Tester) */}
        <div className="pt-2">
          <p className="text-[11px] font-semibold text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700" />
            Switch Session Persona (RBAC Simulation)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleRoleSwitch('super_admin')}
              className={`p-2.5 rounded-lg border text-left rtl:text-right transition-colors text-xs ${
                currentMembership?.role === 'super_admin'
                  ? 'bg-blue-600/10 [data-theme=light]:bg-blue-50 [data-theme=beige]:bg-blue-50 border-blue-500/50 [data-theme=light]:border-blue-300 [data-theme=beige]:border-blue-300 text-blue-300 [data-theme=light]:text-blue-800 [data-theme=beige]:text-blue-900'
                  : 'bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-white border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#4a423d] hover:bg-[#1a1e2d] [data-theme=light]:hover:bg-slate-100 [data-theme=beige]:hover:bg-[#eee9df]'
              }`}
            >
              <div className="font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">{t.rbac.superAdmin}</div>
              <div className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72]">Full platform privileges</div>
            </button>

            <button
              onClick={() => handleRoleSwitch('org_admin')}
              className={`p-2.5 rounded-lg border text-left rtl:text-right transition-colors text-xs ${
                currentMembership?.role === 'org_admin'
                  ? 'bg-emerald-600/10 border-emerald-500/50 text-emerald-300'
                  : 'bg-[#0e1017] border-[#24293d] text-slate-300 hover:bg-[#1a1e2d]'
              }`}
            >
              <div className="font-semibold text-white">{t.rbac.orgAdmin}</div>
              <div className="text-[10px] text-slate-400">Workspace management</div>
            </button>

            <button
              onClick={() => handleRoleSwitch('staff_editor')}
              className={`p-2.5 rounded-lg border text-left rtl:text-right transition-colors text-xs ${
                currentMembership?.role === 'staff_editor'
                  ? 'bg-amber-600/10 border-amber-500/50 text-amber-300'
                  : 'bg-[#0e1017] border-[#24293d] text-slate-300 hover:bg-[#1a1e2d]'
              }`}
            >
              <div className="font-semibold text-white">{t.rbac.staffEditor}</div>
              <div className="text-[10px] text-slate-400">QR &amp; page creation</div>
            </button>

            <button
              onClick={() => handleRoleSwitch('client_viewer')}
              className={`p-2.5 rounded-lg border text-left rtl:text-right transition-colors text-xs ${
                currentMembership?.role === 'client_viewer'
                  ? 'bg-purple-600/10 border-purple-500/50 text-purple-300'
                  : 'bg-[#0e1017] border-[#24293d] text-slate-300 hover:bg-[#1a1e2d]'
              }`}
            >
              <div className="font-semibold text-white">{t.rbac.clientViewer}</div>
              <div className="text-[10px] text-slate-400">Read-only analytics</div>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#1c2030] flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            {t.actions.cancel}
          </Button>

          <div className="flex items-center gap-2">
            {onNavigate && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  onNavigate('/admin/settings');
                }}
              >
                {t.nav.settings}
              </Button>
            )}
            <Button
              variant="danger"
              size="sm"
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
              onClick={handleSignOut}
            >
              {t.header.signOut}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
