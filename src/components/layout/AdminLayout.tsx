/**
 * ESAIA - Admin Dashboard Master Layout
 * Responsive layout supporting Desktop, Tablet, and Mobile viewport configurations
 * with collapsible sidebar rail, bottom mobile navigation, and spring motion transitions.
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';
import { useLanguage } from '../../context/LanguageContext';

export interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

const STORAGE_SIDEBAR_KEY = 'esaia_sidebar_collapsed';

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  children
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_SIDEBAR_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const { isRTL } = useLanguage();

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_SIDEBAR_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [currentPath]);

  return (
    <div
      id="esaia-app-shell"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#090a0f] flex flex-col md:flex-row text-slate-100 transition-colors duration-150 overflow-x-hidden"
    >
      {/* Sidebar Navigation for Desktop/Tablet + Mobile Drawer */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <Header
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onNavigate={onNavigate}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />

        <main
          id="esaia-main-content"
          className="flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 pb-24 md:pb-8 max-w-7xl w-full mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 10, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.995 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Fluid Mobile Bottom Navigation Bar (Phones < 768px) */}
      <MobileBottomNav
        currentPath={currentPath}
        onNavigate={onNavigate}
        onOpenMenu={() => setIsMobileSidebarOpen(true)}
      />
    </div>
  );
};
