/**
 * ESAIA - Enterprise QR, Smart Link & Dynamic Page SaaS Platform
 * Core Application Entry, Protected Routing & Multi-Tenant Engine
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import { LoginPage } from './pages/auth/LoginPage';
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { ClientsPage } from './pages/clients/ClientsPage';
import { ClientDetailPage } from './pages/clients/ClientDetailPage';
import { QrManagerPage } from './pages/qr/QrManagerPage';
import { PagesManagerPage } from './pages/pages/PagesManagerPage';
import { PageBuilderPage } from './pages/pages/PageBuilderPage';
import { LinksManagerPage } from './pages/links/LinksManagerPage';
import { CardsManagerPage } from './pages/cards/CardsManagerPage';
import { MenusManagerPage } from './pages/menus/MenusManagerPage';
import { AnalyticsPage } from './pages/analytics/AnalyticsPage';
import { TemplatesPage } from './pages/templates/TemplatesPage';
import { MediaPage } from './pages/media/MediaPage';
import { DomainsPage } from './pages/domains/DomainsPage';
import { ImportPage } from './pages/import/ImportPage';
import { AuditPage } from './pages/audit/AuditPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { PublicPageRenderer } from './pages/public/PublicPageRenderer';

function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/admin/overview';
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/admin/overview');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  if (isLoading) {
    return <LoadingScreen message="Initializing ESAIA Workspace &amp; Security Layer..." />;
  }

  // 1. Check for Public Landing Page Route: /p/:slug
  if (currentPath.startsWith('/p/')) {
    const slug = currentPath.replace('/p/', '');
    return <PublicPageRenderer slug={slug} />;
  }

  // 2. Unauthenticated user route check
  if (!isAuthenticated && !currentPath.startsWith('/p/')) {
    return <LoginPage onLoginSuccess={() => navigate('/admin/overview')} />;
  }

  // 3. Admin Application Router with Role & Permission Guards
  const renderAdminContent = () => {
    if (currentPath === '/' || currentPath === '/admin' || currentPath === '/admin/overview') {
      return (
        <ProtectedRoute onNavigate={navigate}>
          <OverviewPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/clients')) {
      const clientMatch = currentPath.match(/^\/admin\/clients\/([^/?#]+)/);
      if (clientMatch && clientMatch[1]) {
        return (
          <ProtectedRoute requiredPermission="clients:view" onNavigate={navigate}>
            <ClientDetailPage
              clientId={clientMatch[1]}
              onBack={() => navigate('/admin/clients')}
              onNavigate={navigate}
            />
          </ProtectedRoute>
        );
      }
      return (
        <ProtectedRoute requiredPermission="clients:view" onNavigate={navigate}>
          <ClientsPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/qr')) {
      return (
        <ProtectedRoute requiredPermission="qr:create" onNavigate={navigate}>
          <QrManagerPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/pages')) {
      const builderMatch = currentPath.match(/^\/admin\/pages\/builder\/([^/?#]+)/);
      if (builderMatch && builderMatch[1]) {
        return (
          <ProtectedRoute requiredPermission="pages:builder" onNavigate={navigate}>
            <PageBuilderPage
              pageId={builderMatch[1]}
              onBack={() => navigate('/admin/pages')}
              onNavigate={navigate}
            />
          </ProtectedRoute>
        );
      }
      return (
        <ProtectedRoute requiredPermission="pages:builder" onNavigate={navigate}>
          <PagesManagerPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/links')) {
      return (
        <ProtectedRoute requiredPermission="links:manage" onNavigate={navigate}>
          <LinksManagerPage />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/cards')) {
      return (
        <ProtectedRoute requiredPermission="pages:builder" onNavigate={navigate}>
          <CardsManagerPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/menus')) {
      return (
        <ProtectedRoute requiredPermission="pages:builder" onNavigate={navigate}>
          <MenusManagerPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/analytics')) {
      return (
        <ProtectedRoute requiredPermission="analytics:view_all" onNavigate={navigate}>
          <AnalyticsPage />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/templates')) {
      return (
        <ProtectedRoute onNavigate={navigate}>
          <TemplatesPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/media')) {
      return (
        <ProtectedRoute onNavigate={navigate}>
          <MediaPage />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/domains')) {
      return (
        <ProtectedRoute requiredPermission="domains:manage" onNavigate={navigate}>
          <DomainsPage />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/import')) {
      return (
        <ProtectedRoute requiredPermission="migration:import" onNavigate={navigate}>
          <ImportPage />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/audit')) {
      return (
        <ProtectedRoute requiredPermission="audit:view" onNavigate={navigate}>
          <AuditPage />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/settings')) {
      return (
        <ProtectedRoute requiredPermission="org:read" onNavigate={navigate}>
          <SettingsPage />
        </ProtectedRoute>
      );
    }

    // Default fallback
    return (
      <ProtectedRoute onNavigate={navigate}>
        <OverviewPage onNavigate={navigate} />
      </ProtectedRoute>
    );
  };

  return (
    <AdminLayout currentPath={currentPath} onNavigate={navigate}>
      {renderAdminContent()}
    </AdminLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
