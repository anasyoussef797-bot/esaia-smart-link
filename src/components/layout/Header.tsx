/**
 * ESAIA - Admin Dashboard Top Header Component
 * Enhanced with responsive breakpoints for Mobile, Tablet, and Desktop,
 * smooth micro-interactions, and desktop/tablet sidebar toggle integration.
 */

import React, { useState } from 'react';
import { Menu, Plus, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
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
  isSidebarCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onNavigate,
  isSidebarCollapsed,
  onToggleCollapse
}) => {
  const { user, currentMembership, isSuperAdmin, logout } = useAuth();
  const { t, isRTL } = useLanguage();
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
        className="sticky top-0 z-20 h-16 bg-[#0e1017]/90 backdrop-blur-md border-b border-[#24293d] px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 transition-colors duration-150"
      >
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile hamburger menu button */}
          <button
            id="mobile-menu-trigger"
            onClick={onOpenMobileMenu}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-xl hover:bg-[#1a1e2d] transition-transform active:scale-95 cursor-pointer shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop/Tablet sidebar collapse toggle */}
          {onToggleCollapse && (
            <button
              id="header-sidebar-toggle"
              onClick={onToggleCollapse}
              className="hidden md:flex items-center justify-center text-slate-400 hover:text-white p-2 rounded-xl hover:bg-[#1a1e2d] transition-transform active:scale-95 cursor-pointer shrink-0"
              title={isSidebarCollapsed ? (isRTL ? 'توسيع القائمة' : 'Expand Sidebar') : (isRTL ? 'طي القائمة' : 'Collapse Sidebar')}
              aria-label="Toggle sidebar width"
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>
          )}

          {/* Organization Switcher */}
          <OrgSwitcher />
        </div>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* In-App PWA Install Prompt */}
          <PWAInstallButton compact />

          {/* Quick Create Action */}
          <Button
            id="quick-new-qr-btn"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => onNavigate('/admin/qr')}
            className="hidden sm:inline-flex"
          >
            {t.header.createQr}
          </Button>

          {/* Multi-Theme Selector */}
          <ThemeSwitcher />

          {/* Multi-Lingual Switcher */}
          <LanguageSwitcher />

          {/* User Badge & Profile Trigger */}
          <div className="flex items-center gap-1 pl-1.5 sm:pl-2 rtl:pl-0 rtl:pr-1.5 sm:rtl:pr-2 border-l rtl:border-l-0 rtl:border-r border-[#24293d]">
            <button
              id="user-profile-trigger"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#141722] border border-transparent hover:border-[#24293d] transition-all active:scale-95 text-left rtl:text-right cursor-pointer"
              title={t.header.profile}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="hidden lg:block text-left rtl:text-right">
                <p className="text-xs font-semibold text-slate-200 leading-tight truncate max-w-[120px]">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-[10px] text-slate-400 font-mono capitalize">
                  {getRoleLabel()}
                </p>
              </div>
            </button>

            <button
              id="user-signout-btn"
              onClick={logout}
              className="text-slate-400 hover:text-rose-400 p-2 rounded-xl hover:bg-[#1a1e2d] transition-all active:scale-95 cursor-pointer"
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
