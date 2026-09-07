/**
 * ESAIA - Admin Dashboard Master Layout
 */

import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useLanguage } from '../../context/LanguageContext';

export interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentPath,
  onNavigate,
  children
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isRTL } = useLanguage();

  return (
    <div
      id="esaia-app-shell"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#090a0f] flex flex-col lg:flex-row text-slate-100 transition-colors duration-150"
    >
      {/* Sidebar Navigation */}
      <Sidebar
        currentPath={currentPath}
        onNavigate={onNavigate}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          onNavigate={onNavigate}
        />

        <main id="esaia-main-content" className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

