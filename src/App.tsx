/**
 * ESAIA - Enterprise QR, Smart Link & Dynamic Page SaaS Platform
 * Core Application Entry, Protected Routing & Multi-Tenant Engine
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AdminLayout } from './components/layout/AdminLayout';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Dynamic Code-Splitting / Lazy-Loaded Route Chunks for Ultra-Fast Initial Load
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const OverviewPage = lazy(() => import('./pages/dashboard/OverviewPage').then(m => ({ default: m.OverviewPage })));
const ClientsPage = lazy(() => import('./pages/clients/ClientsPage').then(m => ({ default: m.ClientsPage })));
const ClientDetailPage = lazy(() => import('./pages/clients/ClientDetailPage').then(m => ({ default: m.ClientDetailPage })));
const QrManagerPage = lazy(() => import('./pages/qr/QrManagerPage').then(m => ({ default: m.QrManagerPage })));
const PagesManagerPage = lazy(() => import('./pages/pages/PagesManagerPage').then(m => ({ default: m.PagesManagerPage })));
const PageBuilderPage = lazy(() => import('./pages/pages/PageBuilderPage').then(m => ({ default: m.PageBuilderPage })));
const LinksManagerPage = lazy(() => import('./pages/links/LinksManagerPage').then(m => ({ default: m.LinksManagerPage })));
const CardsManagerPage = lazy(() => import('./pages/cards/CardsManagerPage').then(m => ({ default: m.CardsManagerPage })));
const MenusManagerPage = lazy(() => import('./pages/menus/MenusManagerPage').then(m => ({ default: m.MenusManagerPage })));
const AnalyticsPage = lazy(() => import('./pages/analytics/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));
const TemplatesPage = lazy(() => import('./pages/templates/TemplatesPage').then(m => ({ default: m.TemplatesPage })));
const MediaPage = lazy(() => import('./pages/media/MediaPage').then(m => ({ default: m.MediaPage })));
const DomainsPage = lazy(() => import('./pages/domains/DomainsPage').then(m => ({ default: m.DomainsPage })));
const ImportPage = lazy(() => import('./pages/import/ImportPage').then(m => ({ default: m.ImportPage })));
const AuditPage = lazy(() => import('./pages/audit/AuditPage').then(m => ({ default: m.AuditPage })));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));
const DataExportPage = lazy(() => import('./pages/settings/DataExportPage').then(m => ({ default: m.DataExportPage })));
const WhiteLabelPage = lazy(() => import('./pages/settings/WhiteLabelPage').then(m => ({ default: m.WhiteLabelPage })));
const NotFoundPage = lazy(() => import('./pages/errors/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const ServerErrorPage = lazy(() => import('./pages/errors/ServerErrorPage').then(m => ({ default: m.ServerErrorPage })));
const PublicPageRenderer = lazy(() => import('./pages/public/PublicPageRenderer').then(m => ({ default: m.PublicPageRenderer })));
const PublicQrRedirect = lazy(() => import('./pages/public/PublicQrRedirect').then(m => ({ default: m.PublicQrRedirect })));
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { OfflineIndicator } from './components/common/OfflineIndicator';

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

  // 1. Check for Public Dynamic QR Code Redirect Route: /q/:code, /go/:code, /r/:code
  if (currentPath.startsWith('/q/') || currentPath.startsWith('/go/') || currentPath.startsWith('/r/')) {
    const code = currentPath.replace(/^\/(q|go|r)\//, '').replace(/\/+$/, '');
    return (
      <Suspense fallback={<LoadingScreen message="Redirecting to destination..." />}>
        <PublicQrRedirect code={code} />
      </Suspense>
    );
  }

  // 2. Check for Public Landing Page Route: /p/:slug
  if (currentPath.startsWith('/p/')) {
    const slug = currentPath.replace('/p/', '').replace(/\/+$/, '');
    return (
      <Suspense fallback={<LoadingScreen message="Loading Page..." />}>
        <PublicPageRenderer slug={slug} />
      </Suspense>
    );
  }

  // 3. Unauthenticated user route check
  const isPublicRoute = currentPath.startsWith('/p/') || currentPath.startsWith('/q/') || currentPath.startsWith('/go/') || currentPath.startsWith('/r/');
  if (!isAuthenticated && !isPublicRoute) {
    return (
      <Suspense fallback={<LoadingScreen message="Loading Authentication..." />}>
        <LoginPage onLoginSuccess={() => navigate('/admin/overview')} />
      </Suspense>
    );
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
          <DomainsPage onNavigate={navigate} />
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
    if (currentPath === '/admin/settings/white-label' || currentPath.startsWith('/admin/settings/white-label')) {
      return (
        <ProtectedRoute requiredPermission="org:manage" onNavigate={navigate}>
          <WhiteLabelPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath === '/admin/settings/export' || currentPath.startsWith('/admin/settings/export')) {
      return (
        <ProtectedRoute requiredPermission="org:read" onNavigate={navigate}>
          <DataExportPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }
    if (currentPath.startsWith('/admin/settings')) {
      return (
        <ProtectedRoute requiredPermission="org:read" onNavigate={navigate}>
          <SettingsPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }

    if (currentPath === '/admin/500' || currentPath === '/500') {
      return (
        <ProtectedRoute onNavigate={navigate}>
          <ServerErrorPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }

    if (currentPath === '/admin' || currentPath === '/admin/' || currentPath === '/admin/overview') {
      return (
        <ProtectedRoute onNavigate={navigate}>
          <OverviewPage onNavigate={navigate} />
        </ProtectedRoute>
      );
    }

    // Unmatched /admin route -> Custom 404 Page
    return (
      <ProtectedRoute onNavigate={navigate}>
        <NotFoundPage requestedPath={currentPath} onNavigate={navigate} />
      </ProtectedRoute>
    );
  };

  return (
    <AdminLayout currentPath={currentPath} onNavigate={navigate}>
      <Suspense fallback={<LoadingScreen message="Loading View..." />}>
        {renderAdminContent()}
      </Suspense>
    </AdminLayout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            <AuthProvider>
              <AppRouter />
              <OfflineIndicator />
            </AuthProvider>
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
