/**
 * ESAIA - Fluid Responsive & Collapsible Sidebar Navigation Component
 * Optimized for Mobile, Tablet, and Desktop with buttery-smooth motion transitions,
 * collapsed icon-rail mode for extra tablet/desktop workspace, and full RTL parity.
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  QrCode,
  Layers,
  Link2,
  CreditCard,
  UtensilsCrossed,
  BarChart3,
  Sparkles,
  FolderOpen,
  Globe,
  UploadCloud,
  ShieldCheck,
  Settings,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { t, isRTL } = useLanguage();
  const { currentOrg } = useAuth();
  const brandName = currentOrg?.branding?.platformName || 'ESAIA';
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const navSections = [
    {
      titleKey: 'corePlatform' as const,
      title: t.sections.corePlatform,
      items: [
        { id: 'overview', label: t.nav.overview, icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin/overview' },
        { id: 'clients', label: t.nav.clients, icon: <Users className="w-5 h-5" />, path: '/admin/clients' },
        { id: 'qr', label: t.nav.qr, icon: <QrCode className="w-5 h-5" />, path: '/admin/qr' },
        { id: 'pages', label: t.nav.pages, icon: <Layers className="w-5 h-5" />, path: '/admin/pages' },
        { id: 'links', label: t.nav.links, icon: <Link2 className="w-5 h-5" />, path: '/admin/links' }
      ]
    },
    {
      titleKey: 'digitalSolutions' as const,
      title: t.sections.digitalSolutions,
      items: [
        { id: 'cards', label: t.nav.cards, icon: <CreditCard className="w-5 h-5" />, path: '/admin/cards' },
        { id: 'menus', label: t.nav.menus, icon: <UtensilsCrossed className="w-5 h-5" />, path: '/admin/menus' },
        { id: 'templates', label: t.nav.templates, icon: <Sparkles className="w-5 h-5" />, path: '/admin/templates' },
        { id: 'media', label: t.nav.media, icon: <FolderOpen className="w-5 h-5" />, path: '/admin/media' }
      ]
    },
    {
      titleKey: 'growthIntelligence' as const,
      title: t.sections.growthIntelligence,
      items: [
        { id: 'analytics', label: t.nav.analytics, icon: <BarChart3 className="w-5 h-5" />, path: '/admin/analytics' },
        { id: 'domains', label: t.nav.domains, icon: <Globe className="w-5 h-5" />, path: '/admin/domains' },
        { id: 'import', label: t.nav.import, icon: <UploadCloud className="w-5 h-5" />, path: '/admin/import', badge: '1K+' }
      ]
    },
    {
      titleKey: 'administration' as const,
      title: t.sections.administration,
      items: [
        { id: 'audit', label: t.nav.audit, icon: <ShieldCheck className="w-5 h-5" />, path: '/admin/audit' },
        { id: 'whitelabel', label: isRTL ? 'الهوية البيضاء' : 'White-Labeling', icon: <Sparkles className="w-5 h-5" />, path: '/admin/settings/white-label' },
        { id: 'export', label: isRTL ? 'تصدير البيانات' : 'Data Export', icon: <Download className="w-5 h-5" />, path: '/admin/settings/export' },
        { id: 'settings', label: t.nav.settings, icon: <Settings className="w-5 h-5" />, path: '/admin/settings' }
      ]
    }
  ];

  const renderNavContent = (collapsed: boolean) => (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className={clsx(
        'flex items-center h-16 border-b border-[#1c2030] shrink-0 transition-all px-4',
        collapsed ? 'justify-center' : 'justify-between'
      )}>
        <button
          type="button"
          className="flex items-center gap-2.5 cursor-pointer max-w-[210px] text-left rtl:text-right"
          onClick={() => {
            onNavigate('/admin/overview');
            if (onCloseMobile) onCloseMobile();
          }}
          title={brandName}
        >
          {currentOrg?.branding?.logoDarkUrl || currentOrg?.branding?.logoUrl ? (
            <div className="w-9 h-9 rounded-xl bg-[#141722] border border-[#24293d] flex items-center justify-center p-1 shrink-0 overflow-hidden shadow-xs">
              <img
                src={currentOrg.branding.logoDarkUrl || currentOrg.branding.logoUrl || ''}
                alt={brandName}
                className="max-w-full max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/25 shrink-0">
              <QrCode className="w-5 h-5 text-white" />
            </div>
          )}

          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 6 : -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="min-w-0"
            >
              <span className="font-bold tracking-tight text-white text-base truncate block leading-tight">
                {brandName}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1a1e2d] text-blue-400 border border-blue-900/40 inline-block mt-0.5">
                ENTERPRISE
              </span>
            </motion.div>
          )}
        </button>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-[#1a1e2d] transition-colors cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Links List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 space-y-5 scrollbar-thin">
        {navSections.map(section => (
          <div key={section.titleKey} className="space-y-1">
            {!collapsed ? (
              <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider select-none">
                {section.title}
              </p>
            ) : (
              <div className="w-6 h-px bg-[#1c2030] mx-auto my-2" />
            )}

            <div className="space-y-1">
              {section.items.map(item => {
                const isActive = currentPath === item.path || (item.path !== '/admin/overview' && currentPath.startsWith(`${item.path}/`));
                const isHovered = hoveredItemId === item.id;

                return (
                  <div key={item.id} className="relative">
                    <motion.button
                      id={`nav-${item.id}`}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        onNavigate(item.path);
                        if (onCloseMobile) onCloseMobile();
                      }}
                      onMouseEnter={() => setHoveredItemId(item.id)}
                      onMouseLeave={() => setHoveredItemId(null)}
                      className={clsx(
                        'flex items-center w-full rounded-xl transition-all cursor-pointer select-none text-left rtl:text-right relative group',
                        collapsed
                          ? 'justify-center p-3 h-11'
                          : 'justify-between px-3 py-2.5 text-xs font-medium',
                        isActive
                          ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-xs'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-[#141722] border border-transparent'
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <div className={clsx('flex items-center', collapsed ? 'justify-center' : 'gap-3 min-w-0')}>
                        <span className={clsx('shrink-0 transition-colors', isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200')}>
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span className="truncate text-[13px]">{item.label}</span>
                        )}
                      </div>

                      {!collapsed && item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-950/80 text-blue-400 font-mono border border-blue-800/40 shrink-0">
                          {item.badge}
                        </span>
                      )}

                      {/* Active indicator bar */}
                      {isActive && (
                        <div
                          className={clsx(
                            'absolute top-1.5 bottom-1.5 w-1 bg-blue-500 rounded-full',
                            isRTL ? 'right-0 -mr-1' : 'left-0 -ml-1'
                          )}
                        />
                      )}
                    </motion.button>

                    {/* Floating Tooltip for Collapsed Mode on Desktop/Tablet */}
                    {collapsed && isHovered && (
                      <div
                        className={clsx(
                          'fixed z-50 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#141722] text-white border border-[#24293d] shadow-xl pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-100',
                          isRTL ? 'right-20' : 'left-20'
                        )}
                        style={{ transform: 'translateY(-50%)' }}
                      >
                        {item.label}
                        {item.badge && (
                          <span className="ml-1.5 rtl:mr-1.5 px-1 py-0.2 rounded bg-blue-900/60 text-blue-300 text-[10px]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Controls & Collapse Toggle */}
      <div className="p-3 border-t border-[#1c2030] bg-[#090a0f]/60 shrink-0">
        <div className={clsx('flex items-center', collapsed ? 'justify-center' : 'justify-between gap-2')}>
          {!collapsed && (
            <div className="flex items-center gap-2 text-[11px] text-slate-400 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="truncate">ESAIA v1.0 Live</span>
            </div>
          )}

          {/* Desktop/Tablet Collapse & Expand Toggle Button */}
          {onToggleCollapse && (
            <button
              id="sidebar-collapse-toggle-btn"
              onClick={onToggleCollapse}
              className="hidden md:flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#141722] border border-transparent hover:border-[#24293d] transition-colors cursor-pointer"
              title={collapsed ? (isRTL ? 'توسيع القائمة' : 'Expand Sidebar') : (isRTL ? 'طي القائمة' : 'Collapse Sidebar')}
              aria-label="Toggle sidebar collapse"
            >
              {collapsed ? (
                isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
              ) : (
                isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop with Smooth Fade */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-xs md:hidden"
            onClick={onCloseMobile}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer with Fluid Spring Physics */}
      <AnimatePresence>
        {isOpenMobile && (
          <motion.aside
            id="esaia-mobile-sidebar-drawer"
            initial={{ x: isRTL ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 bottom-0 z-50 w-72 bg-[#0e1017] border-r rtl:border-r-0 rtl:border-l border-[#24293d] shadow-2xl flex flex-col md:hidden"
            style={{ [isRTL ? 'right' : 'left']: 0 }}
          >
            {renderNavContent(false)}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop & Tablet Persistent Sidebar */}
      <aside
        id="esaia-desktop-sidebar"
        className={clsx(
          'hidden md:flex flex-col sticky top-0 h-screen bg-[#0e1017] border-r rtl:border-r-0 rtl:border-l border-[#24293d] shrink-0 transition-all duration-200 ease-in-out z-30',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {renderNavContent(isCollapsed)}
      </aside>
    </>
  );
};
