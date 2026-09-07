/**
 * ESAIA - Fluid Mobile & Tablet Bottom Navigation Bar
 * Delivers an ultra-responsive native-app feel on mobile devices (<768px)
 * Featuring smooth spring-animated active indicators, haptic-style tap scaling,
 * and high-contrast accessibility across all themes.
 */

import React from 'react';
import { LayoutDashboard, QrCode, Layers, BarChart3, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import clsx from 'clsx';

export interface MobileBottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenMenu: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPath,
  onNavigate,
  onOpenMenu
}) => {
  const { t, isRTL } = useLanguage();

  const navItems = [
    {
      id: 'overview',
      label: t.nav.overview,
      icon: LayoutDashboard,
      path: '/admin/overview',
      isActive: currentPath === '/' || currentPath === '/admin' || currentPath.startsWith('/admin/overview')
    },
    {
      id: 'qr',
      label: t.nav.qr,
      icon: QrCode,
      path: '/admin/qr',
      isActive: currentPath.startsWith('/admin/qr')
    },
    {
      id: 'pages',
      label: t.nav.pages,
      icon: Layers,
      path: '/admin/pages',
      isActive: currentPath.startsWith('/admin/pages')
    },
    {
      id: 'analytics',
      label: t.nav.analytics,
      icon: BarChart3,
      path: '/admin/analytics',
      isActive: currentPath.startsWith('/admin/analytics')
    },
    {
      id: 'menu',
      label: isRTL ? 'القائمة' : 'Menu',
      icon: Menu,
      action: onOpenMenu,
      isActive: false
    }
  ];

  return (
    <nav
      id="esaia-mobile-bottom-nav"
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0e1017]/95 backdrop-blur-xl border-t border-[#24293d] px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl transition-colors duration-150"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <motion.button
              key={item.id}
              id={`bottom-nav-${item.id}`}
              whileTap={{ scale: 0.88 }}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else if (item.path) {
                  onNavigate(item.path);
                }
              }}
              className={clsx(
                'relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[56px] min-h-[48px] rounded-xl transition-colors cursor-pointer select-none',
                active ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {/* Animated active pill background */}
              {active && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute inset-0 bg-blue-500/15 rounded-xl border border-blue-500/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}

              <div className="relative z-10 flex flex-col items-center">
                <Icon className={clsx('w-5 h-5 transition-transform duration-150', active && 'scale-110')} />
                <span className={clsx('text-[10px] mt-1 font-medium tracking-tight whitespace-nowrap', active && 'font-bold text-blue-400')}>
                  {item.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
