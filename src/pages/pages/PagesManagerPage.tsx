/**
 * ESAIA - Landing Pages & Block Builder Manager View
 */

import React, { useState } from 'react';
import { Layers, Plus, Search, Eye, ExternalLink, Smartphone, Sparkles } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Page, PageThemeConfig, SeoConfig } from '../../types/page';

const defaultTheme: PageThemeConfig = {
  palette: {
    background: '#090a0f',
    cardBackground: '#141722',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    primaryAction: '#3b82f6',
    primaryActionText: '#ffffff',
    accent: '#6366f1',
    border: '#24293d'
  },
  typography: {
    fontFamily: 'Plus Jakarta Sans',
    headingFont: 'Plus Jakarta Sans',
    baseFontSize: 16
  },
  buttonStyle: 'filled',
  borderRadius: 'lg',
  shadowLevel: 'md',
  backgroundStyle: 'solid'
};

export const PagesManagerPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { showToast } = useNotification();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPageModalOpen, setIsNewPageModalOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pageSlug, setPageSlug] = useState('');

  const [pages, setPages] = useState<Page[]>([
    {
      id: 'page_1',
      orgId: 'org_esaia_main',
      clientId: 'client_1',
      title: 'Impact Hub Cairo - Welcome Portal',
      slug: 'hub-welcome',
      pageType: 'landing',
      status: 'published',
      themeConfig: {
        ...defaultTheme,
        palette: {
          ...defaultTheme.palette,
          primaryAction: '#e11d48'
        }
      },
      blocks: [],
      seo: {
        metaTitle: 'Impact Hub Cairo Portal',
        metaDescription: 'Coworking and event space in Cairo'
      },
      viewCount: 12400,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'page_2',
      orgId: 'org_esaia_main',
      clientId: 'client_2',
      title: 'Nile Artisan - Summer 2026 Single Origin Menu',
      slug: 'nile-menu-2026',
      pageType: 'menu',
      status: 'published',
      themeConfig: {
        ...defaultTheme,
        palette: {
          background: '#fdfbf7',
          cardBackground: '#ffffff',
          textPrimary: '#1c1917',
          textSecondary: '#78716c',
          primaryAction: '#92400e',
          primaryActionText: '#ffffff',
          accent: '#d97706',
          border: '#e7e5e4'
        }
      },
      blocks: [],
      seo: {
        metaTitle: 'Nile Artisan Menu',
        metaDescription: 'Artisan Coffee Roasters'
      },
      viewCount: 6850,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageTitle || !pageSlug) return;

    const newPage: Page = {
      id: `page_${Date.now()}`,
      orgId: 'org_esaia_main',
      clientId: 'client_1',
      title: pageTitle,
      slug: pageSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      pageType: 'landing',
      status: 'draft',
      themeConfig: defaultTheme,
      blocks: [],
      seo: {
        metaTitle: pageTitle,
        metaDescription: 'Created with ESAIA Page Builder'
      },
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPages(prev => [newPage, ...prev]);
    setIsNewPageModalOpen(false);
    setPageTitle('');
    setPageSlug('');
    showToast('success', t.pagesModule.modalTitle, `/p/${newPage.slug}`);
  };

  const filtered = pages.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.pagesModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.pagesModule.subtitle}
          </p>
        </div>
        <Button
          id="new-page-btn"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsNewPageModalOpen(true)}
        >
          {t.pagesModule.createPage}
        </Button>
      </div>

      {/* Search */}
      <Input
        id="pages-search-input"
        placeholder={t.pagesModule.searchPlaceholder}
        leftIcon={<Search className="w-4 h-4" />}
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(page => (
          <Card key={page.id} padding="md" className="flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">{page.title}</h3>
                  <p className="text-xs font-mono text-blue-400 mt-1">/p/{page.slug}</p>
                </div>
                <Badge variant={page.status === 'published' ? 'success' : 'neutral'}>
                  {page.status === 'published' ? t.pagesModule.statusPublished : t.pagesModule.statusDraft}
                </Badge>
              </div>

              <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                {page.seo.metaDescription}
              </p>

              <div className="flex items-center gap-4 mt-5 p-2.5 rounded-lg bg-[#0e1017] border border-[#1c2030] text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>{page.viewCount.toLocaleString()} {t.pagesModule.viewsCount}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span className="capitalize">{page.pageType}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c2030] flex items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => window.open(`/p/${page.slug}`, '_blank')}
              >
                {t.pagesModule.previewLive}
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                onClick={() => onNavigate(`/admin/pages/builder/${page.id}`)}
              >
                {t.pagesModule.openBuilder}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isNewPageModalOpen}
        onClose={() => setIsNewPageModalOpen(false)}
        title={t.pagesModule.modalTitle}
        description={t.pagesModule.modalSubtitle}
      >
        <form onSubmit={handleCreatePage} className="space-y-4">
          <Input
            id="create-page-title"
            label={t.pagesModule.pageTitleLabel}
            placeholder={t.pagesModule.pageTitlePlaceholder}
            value={pageTitle}
            onChange={e => {
              setPageTitle(e.target.value);
              if (!pageSlug) {
                setPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
              }
            }}
            required
          />
          <Input
            id="create-page-slug"
            label={t.pagesModule.publicSlugLabel}
            placeholder={t.pagesModule.publicSlugPlaceholder}
            value={pageSlug}
            onChange={e => setPageSlug(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2.5 pt-4">
            <Button variant="ghost" type="button" onClick={() => setIsNewPageModalOpen(false)}>
              {t.actions.cancel}
            </Button>
            <Button type="submit">{t.pagesModule.createBtn}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
