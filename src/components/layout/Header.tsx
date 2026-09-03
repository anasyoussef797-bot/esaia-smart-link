/**
 * ESAIA - Admin Dashboard Top Header Component
 */

import React, { useState } from 'react';
import { Menu, Plus, LogOut } from 'lucide-react';
import { OrgSwitcher } from './OrgSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserProfileModal } from '../auth/UserProfileModal';

export interface HeaderProps {
  onOpenMobileMenu: () => void;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onNavigate }) => {
  const { user, currentMembership, isSuperAdmin, logout } = useAuth();
  const { t } = useLanguage();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const getRoleLabel = () => {
    if (isSuperAdmin()) return t.rbac.superAdmin;
    const role = currentMembership?.role;
    if (role === 'org_admin') return t.rbac.orgAdmin;
    if (role === 'staff_editor') return t.rbac.staffEditor;
    if (role === 'client_viewer') return t.rbac.clientViewer;
    return role?.replace('_', ' ') || 'Member';
  };

  return (
    <>
      <header
        id="esaia-admin-header"
        className="sticky top-0 z-30 h-16 bg-[#0e1017]/90 [data-theme=light]:bg-white/95 [data-theme=beige]:bg-[#fbf9f4]/95 backdrop-blur-md border-b border-[#24293d] [data-theme=light]:border-[#e2e8f0] [data-theme=beige]:border-[#dfd7cb] px-4 sm:px-6 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="mobile-menu-trigger"
            onClick={onOpenMobileMenu}
            className="lg:hidden text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-slate-900 p-2 rounded-lg hover:bg-[#1a1e2d] [data-theme=light]:hover:bg-slate-100 [data-theme=beige]:hover:bg-[#eee9df]"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Organization Switcher */}
          <OrgSwitcher />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* In-App PWA Install Prompt */}
          <PWAInstallButton compact />

          {/* Quick Create Action */}
          <Button
            id="quick-new-qr-btn"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => onNavigate('/admin/qr')}
            className="hidden md:inline-flex"
          >
            {t.header.createQr}
          </Button>

          {/* Multi-Theme Selector */}
          <ThemeSwitcher />

          {/* 10-Language Multi-Lingual Switcher */}
          <LanguageSwitcher />

          {/* User Badge & Profile Trigger */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-[#24293d] [data-theme=light]:border-[#e2e8f0] [data-theme=beige]:border-[#dfd7cb]">
            <button
              id="user-profile-trigger"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#141722] [data-theme=light]:hover:bg-slate-100 [data-theme=beige]:hover:bg-[#eee9df] border border-transparent hover:border-[#24293d] [data-theme=light]:hover:border-slate-200 [data-theme=beige]:hover:border-[#dfd7cb] transition-colors text-left rtl:text-right"
              title={t.header.profile}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden lg:block text-left rtl:text-right">
                <p className="text-xs font-semibold text-slate-200 [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] leading-tight truncate max-w-[120px]">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72] font-mono capitalize">
                  {getRoleLabel()}
                </p>
              </div>
            </button>

            <button
              id="user-signout-btn"
              onClick={logout}
              className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-[#1a1e2d] [data-theme=light]:hover:bg-rose-50 [data-theme=beige]:hover:bg-rose-50 transition-colors"
              title={t.header.signOut}
              aria-label={t.header.signOut}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* User Profile & Security Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};

