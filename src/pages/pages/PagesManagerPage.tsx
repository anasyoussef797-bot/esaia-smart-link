/**
 * ESAIA - Enterprise Landing Pages, Digital Business Cards & Menus Manager
 * High-performance orchestration dashboard connecting pages with Client CRM brands,
 * real-time view counts, 1-Click QR shortcode bindings, and block builder studio.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Layers,
  Plus,
  Search,
  Eye,
  ExternalLink,
  Smartphone,
  Sparkles,
  QrCode,
  Building2,
  Trash2,
  Copy,
  CreditCard,
  Utensils,
  Filter,
  CheckCircle2,
  Share2,
  ArrowRight
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { Page, PageType, PageStatus } from '../../types/page';
import { Client } from '../../types/client';
import { pageService, DEFAULT_THEME_DARK, DEFAULT_THEME_LIGHT, DEFAULT_THEME_BEIGE } from '../../services/firebase/pageService';
import { clientService } from '../../services/firebase/clientService';
import { qrService } from '../../services/firebase/qrService';

export const PagesManagerPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { showToast } = useNotification();
  const { t, isRTL } = useLanguage();

  const [pages, setPages] = useState<Page[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>('all');

  // New Page Modal
  const [isNewPageModalOpen, setIsNewPageModalOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageType, setNewPageType] = useState<PageType>('landing');
  const [newPageClientId, setNewPageClientId] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<'blank' | 'vcard' | 'menu' | 'coworking'>('vcard');

  // Load pages & clients
  const loadData = async () => {
    setLoading(true);
    try {
      const [fetchedPages, fetchedClients] = await Promise.all([
        pageService.getPagesByOrg('org_esaia_main'),
        clientService.getClientsByOrg('org_esaia_main')
      ]);
      setPages(fetchedPages);
      setClients(fetchedClients);
      if (fetchedClients.length > 0 && !newPageClientId) {
        setNewPageClientId(fetchedClients[0].id);
      }
    } catch (err) {
      console.error('Error loading pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered pages
  const filteredPages = useMemo(() => {
    return pages.filter(p => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedTypeFilter === 'all' || p.pageType === selectedTypeFilter;
      const matchesClient = selectedClientFilter === 'all' || p.clientId === selectedClientFilter;
      return matchesSearch && matchesType && matchesClient;
    });
  }, [pages, searchQuery, selectedTypeFilter, selectedClientFilter]);

  // Handle Create Page
  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle || !newPageSlug) return;

    try {
      const client = clients.find(c => c.id === newPageClientId) || clients[0];
      let initialBlocks = [];
      let themeConfig = DEFAULT_THEME_DARK;

      if (selectedTemplate === 'vcard') {
        themeConfig = {
          ...DEFAULT_THEME_DARK,
          palette: {
            ...DEFAULT_THEME_DARK.palette,
            primaryAction: client?.brandColors?.primary || '#2563eb'
          }
        };
        initialBlocks = [
          {
            id: `b_vc_${Date.now()}`,
            type: 'vcard_header' as const,
            title: 'Executive Profile',
            isVisible: true,
            orderIndex: 0,
            content: {
              fullName: client?.contactPerson || 'Executive Contact',
              jobTitle: 'Managing Partner',
              company: client?.companyName || 'Enterprise Partner',
              avatarUrl: client?.logoUrl || undefined,
              phone: client?.phone || '+971 50 123 4567',
              email: client?.email || 'partner@enterprise.com',
              website: client?.website || 'https://esaia.app',
              whatsapp: client?.whatsapp || '+971501234567',
              bio: 'Institutional executive contact profile with instant contact synchronization.'
            }
          },
          {
            id: `b_wa_${Date.now()}`,
            type: 'whatsapp_button' as const,
            title: 'WhatsApp Contact',
            isVisible: true,
            orderIndex: 1,
            content: {
              phoneNumber: client?.whatsapp || '+971501234567',
              buttonText: 'Direct WhatsApp Connection',
              prefilledMessage: 'Hi! Pleased to connect.'
            }
          }
        ];
      } else if (selectedTemplate === 'menu') {
        themeConfig = DEFAULT_THEME_BEIGE;
        initialBlocks = [
          {
            id: `b_menu_hero_${Date.now()}`,
            type: 'hero' as const,
            title: 'Menu Banner',
            isVisible: true,
            orderIndex: 0,
            content: {
              title: `${client?.companyName || 'Artisan'} Menu`,
              subtitle: 'Specialty seasonal offerings & culinary craft',
              badge: 'Table-Side Digital Menu'
            }
          },
          {
            id: `b_menu_cat_${Date.now()}`,
            type: 'menu_category' as const,
            title: 'Specialty Craft',
            isVisible: true,
            orderIndex: 1,
            content: {
              name: 'Signature Selections',
              description: 'Prepared fresh daily with premium ingredients.'
            }
          },
          {
            id: `b_menu_item_${Date.now()}`,
            type: 'menu_item' as const,
            title: 'Featured Specialty',
            isVisible: true,
            orderIndex: 2,
            content: {
              name: 'Signature Artisan Craft',
              description: 'Award-winning recipe crafted with single-origin beans.',
              price: 90,
              currency: 'EGP',
              category: 'Signature Selections',
              dietaryBadges: ['chef_special'],
              enableWhatsAppOrder: true
            }
          }
        ];
      } else {
        initialBlocks = [
          {
            id: `b_hero_${Date.now()}`,
            type: 'hero' as const,
            title: 'Welcome Banner',
            isVisible: true,
            orderIndex: 0,
            content: {
              title: newPageTitle,
              subtitle: `Official digital experience for ${client?.companyName || 'Our Organization'}`,
              badge: 'Welcome'
            }
          }
        ];
      }

      const newId = await pageService.createPage({
        orgId: 'org_esaia_main',
        clientId: newPageClientId || clients[0]?.id || 'client_impact_hub',
        qrCodeId: null,
        title: newPageTitle,
        slug: newPageSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        pageType: newPageType,
        status: 'draft',
        themeConfig,
        seo: {
          metaTitle: newPageTitle,
          metaDescription: `Welcome to ${newPageTitle}. Powered by ESAIA Platform.`
        },
        blocks: initialBlocks
      });

      setIsNewPageModalOpen(false);
      setNewPageTitle('');
      setNewPageSlug('');
      showToast('success', 'Page Created Successfully', `/p/${newPageSlug}`);
      onNavigate(`/admin/pages/builder/${newId}`);
    } catch (err) {
      showToast('error', 'Failed to create page');
    }
  };

  // Duplicate Page
  const handleDuplicate = async (pageId: string) => {
    try {
      const copyId = await pageService.duplicatePage(pageId);
      showToast('success', 'Page Duplicated Successfully');
      await loadData();
      onNavigate(`/admin/pages/builder/${copyId}`);
    } catch (err) {
      showToast('error', 'Failed to duplicate page');
    }
  };

  // Delete Page
  const handleDelete = async (pageId: string) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    try {
      await pageService.deletePage(pageId);
      showToast('success', 'Page Deleted');
      await loadData();
    } catch (err) {
      showToast('error', 'Failed to delete page');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.pagesModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">{t.pagesModule.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            id="browse-templates-btn"
            variant="outline"
            leftIcon={<Sparkles className="w-4 h-4 text-amber-400" />}
            onClick={() => onNavigate('/admin/templates')}
          >
            {isRTL ? 'النماذج الجاهزة' : 'Ready-Made Templates'}
          </Button>
          <Button
            id="new-page-btn"
            variant="primary"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsNewPageModalOpen(true)}
          >
            {t.pagesModule.createPage}
          </Button>
        </div>
      </div>

      {/* Quick Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            id="pages-search-input"
            placeholder={t.pagesModule.searchPlaceholder}
            leftIcon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Page Type Filter */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#141722] border border-[#24293d] text-xs">
          <button
            onClick={() => setSelectedTypeFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedTypeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setSelectedTypeFilter('business_card')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              selectedTypeFilter === 'business_card' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>vCards</span>
          </button>
          <button
            onClick={() => setSelectedTypeFilter('menu')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              selectedTypeFilter === 'menu' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Menus</span>
          </button>
          <button
            onClick={() => setSelectedTypeFilter('landing')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              selectedTypeFilter === 'landing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Portals</span>
          </button>
        </div>

        {/* Client Selector Filter */}
        <select
          value={selectedClientFilter}
          onChange={e => setSelectedClientFilter(e.target.value)}
          className="px-3 py-2 rounded-xl bg-[#141722] border border-[#24293d] text-xs text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Clients</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>
              {c.companyName}
            </option>
          ))}
        </select>
      </div>

      {/* Pages Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-mono">Loading Page Fleet...</p>
        </div>
      ) : filteredPages.length === 0 ? (
        <Card padding="lg" className="text-center py-16">
          <Layers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No Pages Found</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">Try adjusting your filters or create a new landing page.</p>
          <Button size="sm" onClick={() => setIsNewPageModalOpen(true)}>
            Create New Page
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPages.map(page => {
            const client = clients.find(c => c.id === page.clientId);
            return (
              <Card
                key={page.id}
                padding="md"
                className="flex flex-col justify-between hover:border-slate-700 transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-white tracking-tight truncate">{page.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono text-blue-400">/p/{page.slug}</span>
                        {page.qrCodeId && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                            <QrCode className="w-3 h-3" />
                            <span>Linked QR</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant={page.status === 'published' ? 'success' : 'neutral'}>
                      {page.status === 'published' ? t.pagesModule.statusPublished : t.pagesModule.statusDraft}
                    </Badge>
                  </div>

                  {/* Associated Client Info */}
                  {client && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1c2030]">
                      {client.logoUrl ? (
                        <img
                          src={client.logoUrl}
                          alt={client.companyName}
                          className="w-5 h-5 rounded-md object-cover border border-[#24293d]"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Building2 className="w-4 h-4 text-slate-400" />
                      )}
                      <span className="text-xs text-slate-300 font-medium truncate">{client.companyName}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {page.seo.metaDescription}
                  </p>

                  <div className="flex items-center justify-between mt-4 p-2.5 rounded-lg bg-[#0e1017] border border-[#1c2030] text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      <span>
                        {(page.viewCount || 0).toLocaleString()} {t.pagesModule.viewsCount}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="text-[11px] font-mono">{page.blocks.length} blocks</span>
                      <span className="capitalize text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {page.pageType.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1c2030] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Copy Public Link"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/p/${page.slug}`);
                        showToast('success', 'Public Link Copied to Clipboard');
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Duplicate Page"
                      onClick={() => handleDuplicate(page.id)}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Delete Page"
                      className="text-rose-400 hover:text-rose-300"
                      onClick={() => handleDelete(page.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                      onClick={() => window.open(`/p/${page.slug}`, '_blank')}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                      onClick={() => onNavigate(`/admin/pages/builder/${page.id}`)}
                    >
                      Builder
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* CREATE NEW PAGE MODAL WITH TEMPLATES */}
      <Modal
        isOpen={isNewPageModalOpen}
        onClose={() => setIsNewPageModalOpen(false)}
        title={t.pagesModule.modalTitle}
        description={t.pagesModule.modalSubtitle}
      >
        <form onSubmit={handleCreatePage} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">Choose Quick-Start Template</label>
              <button
                type="button"
                onClick={() => {
                  setIsNewPageModalOpen(false);
                  onNavigate('/admin/templates');
                }}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{isRTL ? 'تصفح كافة النماذج (22 مجالاً) ->' : 'Full Gallery (22 Categories) ->'}</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate('vcard');
                  setNewPageType('business_card');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate === 'vcard'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-[#24293d] bg-[#0e1017] text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-emerald-400 mb-1" />
                <div className="text-xs font-bold text-white">Executive vCard</div>
                <div className="text-[10px]">.vcf save &amp; contact links</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate('menu');
                  setNewPageType('menu');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate === 'menu'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-[#24293d] bg-[#0e1017] text-slate-400 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4 text-amber-500 mb-1" />
                <div className="text-xs font-bold text-white">Specialty Menu</div>
                <div className="text-[10px]">Categories &amp; WhatsApp ordering</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate('coworking');
                  setNewPageType('landing');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate === 'coworking'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-[#24293d] bg-[#0e1017] text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 text-blue-400 mb-1" />
                <div className="text-xs font-bold text-white">Welcome Portal</div>
                <div className="text-[10px]">WiFi, hours, booking &amp; maps</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate('blank');
                  setNewPageType('landing');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate === 'blank'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-[#24293d] bg-[#0e1017] text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-purple-400 mb-1" />
                <div className="text-xs font-bold text-white">Custom Blank</div>
                <div className="text-[10px]">Build from scratch</div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">Associated Client Brand</label>
            <select
              value={newPageClientId}
              onChange={e => setNewPageClientId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0e1017] border border-[#24293d] text-xs text-white focus:outline-none focus:border-blue-500"
            >
              {clients.map(c => (
                <option key={c.id} value={c.id}>
                  {c.companyName} ({c.contactPerson})
                </option>
              ))}
            </select>
          </div>

          <Input
            id="create-page-title"
            label={t.pagesModule.pageTitleLabel}
            placeholder="e.g. Apex Partners - Tariq Al-Masri Profile"
            value={newPageTitle}
            onChange={e => {
              setNewPageTitle(e.target.value);
              if (!newPageSlug) {
                setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
              }
            }}
            required
          />

          <Input
            id="create-page-slug"
            label={t.pagesModule.publicSlugLabel}
            placeholder="e.g. tariq-vcard"
            value={newPageSlug}
            onChange={e => setNewPageSlug(e.target.value)}
            required
          />

          <div className="flex justify-end gap-2.5 pt-4">
            <Button variant="ghost" type="button" onClick={() => setIsNewPageModalOpen(false)}>
              {t.actions.cancel}
            </Button>
            <Button type="submit" variant="primary">
              Create &amp; Launch Studio
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
