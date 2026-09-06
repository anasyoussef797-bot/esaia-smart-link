/**
 * ESAIA - Admin Sidebar Navigation Component
 */

import React from 'react';
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
  X
} from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const { t } = useLanguage();
  const { currentOrg } = useAuth();
  const brandName = currentOrg?.branding?.platformName || 'ESAIA';

  const navSections = [
    {
      titleKey: 'corePlatform' as const,
      title: t.sections.corePlatform,
      items: [
        { id: 'overview', label: t.nav.overview, icon: <LayoutDashboard className="w-4 h-4" />, path: '/admin/overview' },
        { id: 'clients', label: t.nav.clients, icon: <Users className="w-4 h-4" />, path: '/admin/clients' },
        { id: 'qr', label: t.nav.qr, icon: <QrCode className="w-4 h-4" />, path: '/admin/qr' },
        { id: 'pages', label: t.nav.pages, icon: <Layers className="w-4 h-4" />, path: '/admin/pages' },
        { id: 'links', label: t.nav.links, icon: <Link2 className="w-4 h-4" />, path: '/admin/links' }
      ]
    },
    {
      titleKey: 'digitalSolutions' as const,
      title: t.sections.digitalSolutions,
      items: [
        { id: 'cards', label: t.nav.cards, icon: <CreditCard className="w-4 h-4" />, path: '/admin/cards' },
        { id: 'menus', label: t.nav.menus, icon: <UtensilsCrossed className="w-4 h-4" />, path: '/admin/menus' },
        { id: 'templates', label: t.nav.templates, icon: <Sparkles className="w-4 h-4" />, path: '/admin/templates' },
        { id: 'media', label: t.nav.media, icon: <FolderOpen className="w-4 h-4" />, path: '/admin/media' }
      ]
    },
    {
      titleKey: 'growthIntelligence' as const,
      title: t.sections.growthIntelligence,
      items: [
        { id: 'analytics', label: t.nav.analytics, icon: <BarChart3 className="w-4 h-4" />, path: '/admin/analytics' },
        { id: 'domains', label: t.nav.domains, icon: <Globe className="w-4 h-4" />, path: '/admin/domains' },
        { id: 'import', label: t.nav.import, icon: <UploadCloud className="w-4 h-4" />, path: '/admin/import', badge: '1K+' }
      ]
    },
    {
      titleKey: 'administration' as const,
      title: t.sections.administration,
      items: [
        { id: 'audit', label: t.nav.audit, icon: <ShieldCheck className="w-4 h-4" />, path: '/admin/audit' },
        { id: 'whitelabel', label: 'White-Labeling', icon: <Sparkles className="w-4 h-4" />, path: '/admin/settings/white-label' },
        { id: 'export', label: 'Data Export', icon: <Download className="w-4 h-4" />, path: '/admin/settings/export' },
        { id: 'settings', label: t.nav.settings, icon: <Settings className="w-4 h-4" />, path: '/admin/settings' }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        id="esaia-admin-sidebar"
        className={clsx(
          'fixed lg:sticky top-0 left-0 rtl:left-auto rtl:right-0 z-40 h-screen w-64 bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#fbf9f4] border-r rtl:border-r-0 rtl:border-l border-[#24293d] [data-theme=light]:border-[#e2e8f0] [data-theme=beige]:border-[#dfd7cb] flex flex-col shrink-0 transition-transform duration-200 lg:translate-x-0',
          isOpenMobile ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full lg:rtl:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#1c2030] [data-theme=light]:border-[#edf2f7] [data-theme=beige]:border-[#eae4d9] shrink-0">
          <div className="flex items-center gap-2.5 cursor-pointer max-w-[200px]" onClick={() => onNavigate('/admin/overview')}>
            {currentOrg?.branding?.logoDarkUrl || currentOrg?.branding?.logoUrl ? (
              <div className="w-8 h-8 rounded-xl bg-[#141722] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                <img
                  src={currentOrg.branding.logoDarkUrl || currentOrg.branding.logoUrl || ''}
                  alt={brandName}
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0">
                <QrCode className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="min-w-0">
              <span className="font-bold tracking-tight text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] text-base truncate block">
                {brandName}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1a1e2d] [data-theme=light]:bg-blue-50 [data-theme=beige]:bg-[#eee9df] text-blue-400 [data-theme=light]:text-blue-700 [data-theme=beige]:text-blue-800 border border-blue-900/40 [data-theme=light]:border-blue-200 [data-theme=beige]:border-[#dfd7cb]">
                ENTERPRISE
              </span>
            </div>
          </div>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-slate-900 p-1"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {navSections.map(section => (
            <div key={section.titleKey} className="space-y-1">
              <p className="px-3 text-[10px] font-semibold text-slate-500 [data-theme=light]:text-slate-400 [data-theme=beige]:text-[#8c7e73] uppercase tracking-wider">
                {section.title}
              </p>
              <div className="space-y-0.5 pt-1">
                {section.items.map(item => {
                  const isActive = currentPath === item.path || currentPath.startsWith(`${item.path}/`);
                  return (
                    <button
                      key={item.id}
                      id={`nav-${item.id}`}
                      onClick={() => {
                        onNavigate(item.path);
                        if (onCloseMobile) onCloseMobile();
                      }}
                      className={clsx(
                        'flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-medium transition-all text-left rtl:text-right cursor-pointer',
                        isActive
                          ? 'bg-blue-600/15 [data-theme=light]:bg-blue-50 [data-theme=beige]:bg-blue-50/70 text-blue-400 [data-theme=light]:text-blue-700 [data-theme=beige]:text-blue-900 border border-blue-500/30 [data-theme=light]:border-blue-300 [data-theme=beige]:border-blue-300/60 font-semibold shadow-xs'
                          : 'text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#5e544c] hover:text-slate-200 [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d] hover:bg-[#141722] [data-theme=light]:hover:bg-slate-100 [data-theme=beige]:hover:bg-[#eee9df] border border-transparent'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={clsx(isActive ? 'text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700' : 'text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]')}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-950 [data-theme=light]:bg-blue-100 [data-theme=beige]:bg-blue-100 text-blue-400 [data-theme=light]:text-blue-800 [data-theme=beige]:text-blue-900 font-mono border border-blue-800/40 [data-theme=light]:border-blue-300 [data-theme=beige]:border-blue-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="p-3.5 border-t border-[#1c2030] [data-theme=light]:border-[#edf2f7] [data-theme=beige]:border-[#eae4d9] bg-[#090a0f]/60 [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#f6f3eb] shrink-0">
          <div className="flex items-center justify-between text-[11px] text-slate-500 [data-theme=light]:text-slate-400 [data-theme=beige]:text-[#8c7e73]">
            <span>ESAIA v1.0 Production</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Operational" />
          </div>
        </div>
      </aside>
    </>
  );
};
