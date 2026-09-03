/**
 * ESAIA - Enterprise Block-based Mobile Landing Page Builder (/admin/pages/builder/:id)
 * Features live mobile preview, Client CRM brand binding, 1-Click QR binding (/q/:slug),
 * theme presets (Dark, Light, Beige, Brand), and full block orchestration.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Eye,
  Save,
  Sparkles,
  QrCode,
  Palette,
  Layers,
  Globe,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  ExternalLink,
  Smartphone,
  Check,
  Building2,
  Copy,
  Edit2,
  Phone,
  Mail,
  MessageCircle,
  Utensils,
  Clock,
  MapPin,
  Send,
  Download,
  Share2,
  ShieldCheck,
  Sun,
  Moon,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  Page,
  PageBlock,
  BlockType,
  PageThemeConfig,
  PageThemePreset
} from '../../types/page';
import { Client } from '../../types/client';
import { QrCode as QrCodeType } from '../../types/qr';
import {
  pageService,
  DEFAULT_THEME_DARK,
  DEFAULT_THEME_LIGHT,
  DEFAULT_THEME_BEIGE
} from '../../services/firebase/pageService';
import { clientService } from '../../services/firebase/clientService';
import { qrService } from '../../services/firebase/qrService';
import { downloadVCard } from '../../utils/vcard';

interface PageBuilderPageProps {
  pageId: string;
  onBack: () => void;
  onNavigate: (path: string) => void;
}

export const PageBuilderPage: React.FC<PageBuilderPageProps> = ({ pageId, onBack, onNavigate }) => {
  const { showToast } = useNotification();
  const { t } = useLanguage();

  const [page, setPage] = useState<Page | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [qrCodes, setQrCodes] = useState<QrCodeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'blocks' | 'brand' | 'theme' | 'qr' | 'seo'>('blocks');

  // Block Modal states
  const [isAddBlockModalOpen, setIsAddBlockModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<PageBlock | null>(null);

  // Mobile Preview frame options
  const [previewDevice, setPreviewDevice] = useState<'iphone' | 'android'>('iphone');
  const [previewScale, setPreviewScale] = useState<'mobile' | 'wide'>('mobile');

  // Load Page, Clients and QR Codes
  useEffect(() => {
    let mounted = true;
    async function init() {
      setLoading(true);
      try {
        const [foundPage, loadedClients, loadedQrs] = await Promise.all([
          pageService.getPageById(pageId),
          clientService.getClientsByOrg('org_esaia_main'),
          qrService.getQrCodesByOrg('org_esaia_main')
        ]);

        if (mounted) {
          if (foundPage) {
            setPage(foundPage);
          } else {
            // Fallback for new page
            const newDefault: Page = {
              id: pageId,
              orgId: 'org_esaia_main',
              clientId: loadedClients[0]?.id || 'client_impact_hub',
              qrCodeId: null,
              title: 'New Landing Page',
              slug: `page-${Date.now().toString().slice(-4)}`,
              pageType: 'landing',
              status: 'draft',
              themeConfig: DEFAULT_THEME_DARK,
              seo: {
                metaTitle: 'New Landing Page',
                metaDescription: 'Created with ESAIA Enterprise Page Builder'
              },
              blocks: [
                {
                  id: 'b_hero_init',
                  type: 'hero',
                  title: 'Header Banner',
                  isVisible: true,
                  orderIndex: 0,
                  content: {
                    title: 'Welcome to Our Space',
                    subtitle: 'Connect with our team, discover services, and explore offerings.',
                    badge: 'Official Portal'
                  }
                }
              ],
              viewCount: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            setPage(newDefault);
          }
          setClients(loadedClients);
          setQrCodes(loadedQrs);
        }
      } catch (err) {
        console.error('Failed initializing Page Builder:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, [pageId]);

  // Selected Client
  const selectedClient = useMemo(() => {
    if (!page) return null;
    return clients.find(c => c.id === page.clientId) || null;
  }, [clients, page]);

  // Bound QR Code
  const boundQr = useMemo(() => {
    if (!page?.qrCodeId) return null;
    return qrCodes.find(q => q.id === page.qrCodeId) || null;
  }, [qrCodes, page]);

  // Save changes
  const handleSavePage = async (publish = false) => {
    if (!page) return;
    setSaving(true);
    try {
      const updates: Partial<Page> = {
        title: page.title,
        slug: page.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        clientId: page.clientId,
        status: publish ? 'published' : page.status,
        themeConfig: page.themeConfig,
        seo: page.seo,
        blocks: page.blocks,
        qrCodeId: page.qrCodeId
      };

      if (publish) {
        updates.publishedAt = new Date().toISOString();
      }

      await pageService.updatePage(page.id, updates);
      setPage(prev => (prev ? { ...prev, ...updates } : prev));
      showToast('success', publish ? 'Page Published Live' : 'Changes Saved Successfully', `/p/${page.slug}`);
    } catch (err) {
      showToast('error', 'Failed to save page changes');
    } finally {
      setSaving(false);
    }
  };

  // 1-Click Apply Client Brand Theme
  const handleApplyClientBrandTheme = () => {
    if (!selectedClient || !page) return;
    const brand = selectedClient.brandColors;

    const updatedTheme: PageThemeConfig = {
      preset: 'custom',
      palette: {
        background: brand.background || '#090a0f',
        cardBackground: brand.secondary || '#141722',
        textPrimary: brand.text || '#ffffff',
        textSecondary: '#94a3b8',
        primaryAction: brand.primary || '#3b82f6',
        primaryActionText: '#ffffff',
        accent: brand.accent || '#6366f1',
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

    setPage(prev => (prev ? { ...prev, themeConfig: updatedTheme } : prev));
    showToast('success', 'Client Brand Theme Applied', `Colors synced with ${selectedClient.companyName}`);
  };

  // 1-Click Dynamic QR Code Creation & Binding
  const handleCreateAndBindQr = async () => {
    if (!page) return;
    try {
      const code = page.slug;
      const newQrId = await qrService.createQrCode({
        orgId: page.orgId,
        clientId: page.clientId,
        clientName: selectedClient?.companyName || 'Enterprise Client',
        name: `${page.title} (Page QR)`,
        publicCode: code,
        destinationType: 'page',
        destinationUrl: `/p/${page.slug}`,
        targetEntityId: page.id,
        status: 'active',
        tags: ['Dynamic Page', page.pageType, 'Smart Link'],
        notes: `Automatically bound to page: ${page.title}`,
        styleConfig: {
          foregroundColor: page.themeConfig.palette.primaryAction || '#0f172a',
          backgroundColor: '#ffffff',
          moduleStyle: 'rounded',
          eyeStyle: 'rounded',
          eyeBallStyle: 'rounded',
          eyeColor: page.themeConfig.palette.primaryAction || '#0f172a',
          eyeInnerColor: page.themeConfig.palette.primaryAction || '#0f172a',
          errorCorrectionLevel: 'H',
          quietZoneModules: 4,
          logoUrl: selectedClient?.logoUrl || null,
          logoSizeRatio: 0.16,
          logoBackgroundPunchout: true,
          frameStyle: 'banner_bottom',
          frameText: 'SCAN FOR EXPERIENCE',
          frameBgColor: page.themeConfig.palette.primaryAction || '#0f172a',
          frameTextColor: '#ffffff',
          scannabilityGrade: 'A',
          healthScore: 98,
          verifiedAt: new Date().toISOString()
        }
      });

      await pageService.bindQrToPage(page.id, newQrId);
      setPage(prev => (prev ? { ...prev, qrCodeId: newQrId } : prev));

      // Refresh QR fleet in local state
      const updatedQrs = await qrService.getQrCodesByOrg('org_esaia_main');
      setQrCodes(updatedQrs);

      showToast('success', 'Dynamic QR Code Bound', `Public shortcode: /q/${code}`);
    } catch (err) {
      showToast('error', 'Failed to generate dynamic QR code');
    }
  };

  // Reorder Blocks
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (!page) return;
    const blocks = [...page.blocks];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;

    const temp = blocks[index];
    blocks[index] = blocks[targetIdx];
    blocks[targetIdx] = temp;

    const reindexed = blocks.map((b, idx) => ({ ...b, orderIndex: idx }));
    setPage({ ...page, blocks: reindexed });
  };

  // Toggle Block Visibility
  const toggleBlockVisibility = (blockId: string) => {
    if (!page) return;
    const blocks = page.blocks.map(b => (b.id === blockId ? { ...b, isVisible: !b.isVisible } : b));
    setPage({ ...page, blocks });
  };

  // Delete Block
  const deleteBlock = (blockId: string) => {
    if (!page) return;
    const blocks = page.blocks.filter(b => b.id !== blockId);
    setPage({ ...page, blocks });
  };

  // Add Block
  const handleAddBlock = (type: BlockType) => {
    if (!page) return;
    let defaultContent: Record<string, any> = {};

    if (type === 'hero') {
      defaultContent = {
        title: selectedClient?.companyName || 'Welcome',
        subtitle: 'Discover our offerings, services and updates.',
        badge: 'Featured',
        avatarUrl: selectedClient?.logoUrl || undefined
      };
    } else if (type === 'vcard_header') {
      defaultContent = {
        fullName: selectedClient?.contactPerson || 'Executive Contact',
        jobTitle: 'Managing Partner',
        company: selectedClient?.companyName || 'Enterprise Partner',
        phone: selectedClient?.phone || '+971 50 123 4567',
        email: selectedClient?.email || 'contact@client.com',
        website: selectedClient?.website || 'https://example.com',
        whatsapp: selectedClient?.whatsapp || '+971501234567',
        bio: 'Connecting institutional clients with high-impact opportunities.'
      };
    } else if (type === 'button') {
      defaultContent = {
        label: 'Explore Our Catalog',
        subtext: 'Browse latest collection and offerings',
        url: 'https://esaia.app',
        variant: 'primary'
      };
    } else if (type === 'whatsapp_button') {
      defaultContent = {
        phoneNumber: selectedClient?.whatsapp || '+201001234567',
        buttonText: 'Chat on WhatsApp Directly',
        prefilledMessage: 'Hi! I would like to inquire about your services.'
      };
    } else if (type === 'phone_button') {
      defaultContent = {
        phoneNumber: selectedClient?.phone || '+201001234567',
        buttonText: 'Direct Telephone Call',
        subtext: 'Available Sunday through Thursday'
      };
    } else if (type === 'menu_category') {
      defaultContent = {
        name: 'Specialty Selection',
        description: 'Handcrafted daily by our master chefs & roasters.'
      };
    } else if (type === 'menu_item') {
      defaultContent = {
        name: 'Signature Offering',
        description: 'Carefully prepared with seasonal ingredients.',
        price: 95,
        currency: 'EGP',
        category: 'Specialty Selection',
        dietaryBadges: ['chef_special'],
        enableWhatsAppOrder: true
      };
    } else if (type === 'business_hours') {
      defaultContent = {
        title: 'Operating Hours',
        days: [
          { day: 'Sunday - Thursday', open: '08:00 AM', close: '10:00 PM', isClosed: false },
          { day: 'Friday - Saturday', open: '10:00 AM', close: '08:00 PM', isClosed: false }
        ],
        note: 'Holiday hours may vary.'
      };
    } else if (type === 'map_location') {
      defaultContent = {
        locationTitle: 'Our Headquarters',
        address: selectedClient?.address || 'Cairo, Egypt',
        directionsUrl: 'https://maps.google.com'
      };
    } else if (type === 'contact_form') {
      defaultContent = {
        heading: 'Send Us a Message',
        subtext: 'Fill out this short form and we will get back to you.',
        submitButtonText: 'Submit Inquiry'
      };
    } else if (type === 'social_links') {
      defaultContent = {
        links: [
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'website', url: selectedClient?.website || 'https://esaia.app' }
        ]
      };
    }

    const newBlock: PageBlock = {
      id: `b_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      title: type.replace(/_/g, ' ').toUpperCase(),
      isVisible: true,
      orderIndex: page.blocks.length,
      content: defaultContent
    };

    setPage({ ...page, blocks: [...page.blocks, newBlock] });
    setIsAddBlockModalOpen(false);
    setEditingBlock(newBlock);
  };

  if (loading || !page) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-400 font-mono">Loading Page Builder Studio...</p>
      </div>
    );
  }

  const p = page.themeConfig.palette;

  return (
    <div className="space-y-4">
      {/* Top Header & Quick Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#141722] border border-[#24293d]">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </Button>

          <div className="h-6 w-px bg-[#24293d]" />

          <div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={page.title}
                onChange={e => setPage({ ...page, title: e.target.value })}
                className="text-base font-bold text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-blue-500 focus:outline-none px-1"
                placeholder="Page Title"
              />
              <Badge variant={page.status === 'published' ? 'success' : 'neutral'}>
                {page.status === 'published' ? 'Published' : 'Draft'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mt-0.5 px-1">
              <span className="text-xs text-slate-400">Public Slug:</span>
              <span className="text-xs font-mono text-blue-400">/p/{page.slug}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
            onClick={() => window.open(`/p/${page.slug}`, '_blank')}
          >
            Live Preview
          </Button>

          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Save className="w-3.5 h-3.5" />}
            disabled={saving}
            onClick={() => handleSavePage(false)}
          >
            Save Draft
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Sparkles className="w-3.5 h-3.5" />}
            disabled={saving}
            onClick={() => handleSavePage(true)}
          >
            {saving ? 'Saving...' : 'Publish Live'}
          </Button>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Builder Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#141722] border border-[#24293d] text-xs">
            <button
              onClick={() => setActiveTab('blocks')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'blocks' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Blocks ({page.blocks.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('brand')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'brand' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Client Brand Kit</span>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'theme' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Theme &amp; Styles</span>
            </button>

            <button
              onClick={() => setActiveTab('qr')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'qr' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>QR Binding</span>
              {boundQr && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'seo' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>SEO</span>
            </button>
          </div>

          {/* TAB 1: BLOCKS MANAGER */}
          {activeTab === 'blocks' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Drag or reorder blocks to build your page</span>
                <Button size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />} onClick={() => setIsAddBlockModalOpen(true)}>
                  Add Block
                </Button>
              </div>

              <div className="space-y-2">
                {page.blocks.length === 0 ? (
                  <Card padding="lg" className="text-center py-10">
                    <Layers className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white">No Blocks Added Yet</p>
                    <p className="text-xs text-slate-400 mt-1 mb-4">Add a hero banner, vCard, menu, or buttons.</p>
                    <Button size="sm" onClick={() => setIsAddBlockModalOpen(true)}>
                      Add First Block
                    </Button>
                  </Card>
                ) : (
                  page.blocks.map((block, idx) => (
                    <Card
                      key={block.id}
                      padding="sm"
                      className={`flex items-center justify-between gap-3 border transition-colors ${
                        !block.isVisible ? 'opacity-50' : 'hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px] font-mono">
                          {idx + 1}
                        </span>

                        <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                          {block.type === 'hero' && <Sparkles className="w-4 h-4" />}
                          {block.type === 'vcard_header' && <Download className="w-4 h-4" />}
                          {block.type === 'button' && <ExternalLink className="w-4 h-4" />}
                          {block.type === 'whatsapp_button' && <MessageCircle className="w-4 h-4" />}
                          {block.type === 'phone_button' && <Phone className="w-4 h-4" />}
                          {block.type === 'menu_category' && <Utensils className="w-4 h-4" />}
                          {block.type === 'menu_item' && <Coffee className="w-4 h-4" />}
                          {block.type === 'business_hours' && <Clock className="w-4 h-4" />}
                          {block.type === 'map_location' && <MapPin className="w-4 h-4" />}
                          {block.type === 'contact_form' && <Send className="w-4 h-4" />}
                          {block.type === 'social_links' && <Globe className="w-4 h-4" />}
                          {block.type !== 'hero' &&
                            block.type !== 'vcard_header' &&
                            block.type !== 'button' &&
                            block.type !== 'whatsapp_button' &&
                            block.type !== 'phone_button' &&
                            block.type !== 'menu_category' &&
                            block.type !== 'menu_item' &&
                            block.type !== 'business_hours' &&
                            block.type !== 'map_location' &&
                            block.type !== 'contact_form' &&
                            block.type !== 'social_links' && <Layers className="w-4 h-4" />}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-white truncate">
                            {block.content?.title || block.content?.name || block.content?.fullName || block.content?.label || block.type}
                          </h4>
                          <span className="text-[10px] text-slate-400 capitalize">{block.type.replace(/_/g, ' ')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => moveBlock(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                          title="Move Up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveBlock(idx, 'down')}
                          disabled={idx === page.blocks.length - 1}
                          className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                          title="Move Down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleBlockVisibility(block.id)}
                          className={`p-1 rounded text-slate-400 hover:text-white ${!block.isVisible ? 'text-rose-400' : ''}`}
                          title="Toggle Visibility"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingBlock(block)}
                          className="p-1 rounded text-slate-400 hover:text-blue-400"
                          title="Edit Block Content"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteBlock(block.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400"
                          title="Delete Block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CLIENT BRAND KIT */}
          {activeTab === 'brand' && (
            <Card padding="md" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Client CRM Brand Association</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Link this page to a client account to auto-populate brand logos, contacts, and palette styling.
                </p>
              </div>

              <div>
                <label className="text-xs text-slate-300 mb-1.5 block">Select Associated Client</label>
                <select
                  value={page.clientId}
                  onChange={e => setPage({ ...page, clientId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#0e1017] border border-[#24293d] text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.companyName} ({c.contactPerson})
                    </option>
                  ))}
                </select>
              </div>

              {selectedClient && (
                <div className="p-4 rounded-xl bg-[#0e1017] border border-[#24293d] space-y-3">
                  <div className="flex items-center gap-3">
                    {selectedClient.logoUrl ? (
                      <img
                        src={selectedClient.logoUrl}
                        alt={selectedClient.companyName}
                        className="w-12 h-12 rounded-xl object-cover border border-[#24293d]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {selectedClient.companyName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-white">{selectedClient.companyName}</h4>
                      <p className="text-xs text-slate-400">{selectedClient.contactPerson} · {selectedClient.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1c2030]">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Primary Color</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div
                          className="w-4 h-4 rounded border border-white/20"
                          style={{ backgroundColor: selectedClient.brandColors.primary }}
                        />
                        <span className="text-xs font-mono text-slate-300">{selectedClient.brandColors.primary}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">Secondary</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div
                          className="w-4 h-4 rounded border border-white/20"
                          style={{ backgroundColor: selectedClient.brandColors.secondary }}
                        />
                        <span className="text-xs font-mono text-slate-300">{selectedClient.brandColors.secondary}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block">Accent</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div
                          className="w-4 h-4 rounded border border-white/20"
                          style={{ backgroundColor: selectedClient.brandColors.accent }}
                        />
                        <span className="text-xs font-mono text-slate-300">{selectedClient.brandColors.accent}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      leftIcon={<Palette className="w-4 h-4 text-blue-400" />}
                      onClick={handleApplyClientBrandTheme}
                    >
                      Apply Client Brand Theme to This Page
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* TAB 3: THEME & STYLES */}
          {activeTab === 'theme' && (
            <Card padding="md" className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Theme &amp; Typography Presets</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a refined corporate aesthetic or customize granular colors and border radii.
                </p>
              </div>

              {/* Theme Presets */}
              <div className="grid grid-cols-3 gap-3">
                {/* Dark Luxury */}
                <button
                  onClick={() => setPage({ ...page, themeConfig: DEFAULT_THEME_DARK })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    page.themeConfig.preset === 'dark'
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-[#161a28]'
                      : 'border-[#24293d] bg-[#0e1017] hover:border-slate-700'
                  }`}
                >
                  <div className="w-full h-8 rounded-lg bg-[#090a0f] border border-[#24293d] flex items-center justify-center mb-2">
                    <Moon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xs font-bold text-white">Dark Luxury</div>
                  <div className="text-[10px] text-slate-400">Obsidian slate</div>
                </button>

                {/* Crisp Light */}
                <button
                  onClick={() => setPage({ ...page, themeConfig: DEFAULT_THEME_LIGHT })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    page.themeConfig.preset === 'light'
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-[#161a28]'
                      : 'border-[#24293d] bg-[#0e1017] hover:border-slate-700'
                  }`}
                >
                  <div className="w-full h-8 rounded-lg bg-[#f8fafc] border border-slate-300 flex items-center justify-center mb-2">
                    <Sun className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xs font-bold text-white">Crisp Light</div>
                  <div className="text-[10px] text-slate-400">High contrast white</div>
                </button>

                {/* Warm Beige */}
                <button
                  onClick={() => setPage({ ...page, themeConfig: DEFAULT_THEME_BEIGE })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    page.themeConfig.preset === 'beige'
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-[#161a28]'
                      : 'border-[#24293d] bg-[#0e1017] hover:border-slate-700'
                  }`}
                >
                  <div className="w-full h-8 rounded-lg bg-[#f6f3eb] border border-[#dfd7cb] flex items-center justify-center mb-2">
                    <Coffee className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="text-xs font-bold text-white">Warm Beige</div>
                  <div className="text-[10px] text-slate-400">Stone &amp; linen tones</div>
                </button>
              </div>

              {/* Granular Color Overrides */}
              <div className="space-y-3 pt-3 border-t border-[#1c2030]">
                <h4 className="text-xs font-semibold text-slate-300">Custom Palette Overrides</h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Primary Action</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={page.themeConfig.palette.primaryAction}
                        onChange={e =>
                          setPage({
                            ...page,
                            themeConfig: {
                              ...page.themeConfig,
                              palette: { ...page.themeConfig.palette, primaryAction: e.target.value }
                            }
                          })
                        }
                        className="w-8 h-8 rounded border border-[#24293d] bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-300">
                        {page.themeConfig.palette.primaryAction}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Background</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={page.themeConfig.palette.background}
                        onChange={e =>
                          setPage({
                            ...page,
                            themeConfig: {
                              ...page.themeConfig,
                              palette: { ...page.themeConfig.palette, background: e.target.value }
                            }
                          })
                        }
                        className="w-8 h-8 rounded border border-[#24293d] bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-300">{page.themeConfig.palette.background}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Card Surface</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={page.themeConfig.palette.cardBackground}
                        onChange={e =>
                          setPage({
                            ...page,
                            themeConfig: {
                              ...page.themeConfig,
                              palette: { ...page.themeConfig.palette, cardBackground: e.target.value }
                            }
                          })
                        }
                        className="w-8 h-8 rounded border border-[#24293d] bg-transparent cursor-pointer"
                      />
                      <span className="text-xs font-mono text-slate-300">
                        {page.themeConfig.palette.cardBackground}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border Radius */}
              <div className="space-y-1.5 pt-3 border-t border-[#1c2030]">
                <label className="text-xs text-slate-300">Corner Radius</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['none', 'sm', 'md', 'lg', 'full'] as const).map(radius => (
                    <button
                      key={radius}
                      onClick={() =>
                        setPage({
                          ...page,
                          themeConfig: { ...page.themeConfig, borderRadius: radius }
                        })
                      }
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border capitalize ${
                        page.themeConfig.borderRadius === radius
                          ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                          : 'border-[#24293d] text-slate-400 hover:text-white'
                      }`}
                    >
                      {radius}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* TAB 4: 1-CLICK QR BINDING */}
          {activeTab === 'qr' && (
            <Card padding="md" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Dynamic QR Code Synchronization</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Bind this page to a dynamic shortcode (/q/:slug). Any physical scans will immediately redirect to this published page.
                </p>
              </div>

              {boundQr ? (
                <div className="p-4 rounded-xl bg-[#0e1017] border border-emerald-500/30 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                        <QrCode className="w-10 h-10 text-slate-900" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{boundQr.name}</h4>
                          <Badge variant="success">Bound</Badge>
                        </div>
                        <p className="text-xs font-mono text-blue-400 mt-0.5">/q/{boundQr.publicCode}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-emerald-400 font-bold">Grade {boundQr.styleConfig?.scannabilityGrade || 'A'}</span>
                      <p className="text-[10px] text-slate-400">{boundQr.totalScans} total scans</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#1c2030]">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                      onClick={() => window.open(`/q/${boundQr.publicCode}`, '_blank')}
                    >
                      Test Redirect
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-400 hover:text-rose-300"
                      onClick={() => pageService.unbindQrFromPage(page.id).then(() => setPage({ ...page, qrCodeId: null }))}
                    >
                      Unbind QR
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#0e1017] border border-dashed border-[#24293d] text-center space-y-3">
                    <QrCode className="w-8 h-8 text-blue-400 mx-auto" />
                    <div>
                      <h4 className="text-xs font-bold text-white">No Dynamic QR Code Bound</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Generate a new high-speed QR code or connect an existing code from your fleet.
                      </p>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                      onClick={handleCreateAndBindQr}
                    >
                      1-Click Generate &amp; Bind Dynamic QR
                    </Button>
                  </div>

                  {/* Or select existing */}
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Or Bind Existing QR from Fleet</label>
                    <select
                      onChange={e => {
                        if (e.target.value) {
                          pageService.bindQrToPage(page.id, e.target.value).then(() => {
                            setPage({ ...page, qrCodeId: e.target.value });
                            showToast('success', 'QR Code Rebound Successfully');
                          });
                        }
                      }}
                      defaultValue=""
                      className="w-full px-3 py-2 rounded-xl bg-[#0e1017] border border-[#24293d] text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Choose an existing QR code...
                      </option>
                      {qrCodes.map(q => (
                        <option key={q.id} value={q.id}>
                          {q.name} (/q/{q.publicCode})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* TAB 5: SEO */}
          {activeTab === 'seo' && (
            <Card padding="md" className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Search Engine Optimization (SEO)</h3>
                <p className="text-xs text-slate-400 mt-0.5">Configure meta tags for WhatsApp, iMessage, and Google Search snippets.</p>
              </div>

              <Input
                id="seo-title"
                label="Meta Title"
                value={page.seo.metaTitle}
                onChange={e => setPage({ ...page, seo: { ...page.seo, metaTitle: e.target.value } })}
              />

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Meta Description</label>
                <textarea
                  rows={3}
                  value={page.seo.metaDescription}
                  onChange={e => setPage({ ...page, seo: { ...page.seo, metaDescription: e.target.value } })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#24293d] text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <Input
                id="seo-og-image"
                label="OpenGraph Social Share Image URL"
                placeholder="https://images.unsplash.com/..."
                value={page.seo.ogImageUrl || ''}
                onChange={e => setPage({ ...page, seo: { ...page.seo, ogImageUrl: e.target.value } })}
              />
            </Card>
          )}
        </div>

        {/* Right Side: Live Mobile Preview Device (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Preview Controls Bar */}
          <div className="flex items-center justify-between w-full max-w-sm mb-3 px-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              Live Mobile Simulator
            </span>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setPreviewDevice('iphone')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                  previewDevice === 'iphone' ? 'bg-blue-600 text-white border-blue-500' : 'text-slate-400 border-transparent'
                }`}
              >
                iPhone
              </button>
              <button
                onClick={() => setPreviewDevice('android')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                  previewDevice === 'android' ? 'bg-blue-600 text-white border-blue-500' : 'text-slate-400 border-transparent'
                }`}
              >
                Android
              </button>
            </div>
          </div>

          {/* Smartphone Frame */}
          <div
            className="w-full max-w-[340px] h-[640px] rounded-[42px] p-3 shadow-2xl border-4 border-[#24293d] bg-[#0c0e14] relative flex flex-col transition-all overflow-hidden"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
            }}
          >
            {/* Dynamic Island / Bezel notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#090a0f] rounded-full z-20 flex items-center justify-end px-2">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>

            {/* Screen Viewport */}
            <div
              className="w-full h-full rounded-[32px] overflow-y-auto overflow-x-hidden flex flex-col justify-between relative scrollbar-none transition-colors duration-200"
              style={{
                backgroundColor: p.background,
                color: p.textPrimary,
                fontFamily: page.themeConfig.typography?.fontFamily || 'sans-serif'
              }}
            >
              {/* Internal simulated status bar */}
              <div className="h-6 w-full pt-1.5 px-4 flex items-center justify-between text-[10px] opacity-70 z-10 shrink-0">
                <span>09:41</span>
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <div className="w-3 h-2 rounded-sm border border-current" />
                </div>
              </div>

              {/* Rendered Live Blocks */}
              <div className="p-3 space-y-3 flex-1">
                {page.blocks
                  .filter(b => b.isVisible)
                  .map(block => {
                    const c = block.content || {};

                    // Hero
                    if (block.type === 'hero') {
                      return (
                        <div
                          key={block.id}
                          className="rounded-xl overflow-hidden border text-center shadow-sm"
                          style={{ backgroundColor: p.cardBackground, borderColor: p.border }}
                        >
                          {c.coverUrl && (
                            <div className="h-20 w-full overflow-hidden bg-slate-800">
                              <img src={c.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="p-3">
                            {c.avatarUrl && (
                              <div
                                className="w-12 h-12 rounded-xl mx-auto overflow-hidden border -mt-7 mb-2 shadow"
                                style={{ borderColor: p.cardBackground }}
                              >
                                <img src={c.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                              </div>
                            )}
                            {c.badge && (
                              <span
                                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1"
                                style={{ backgroundColor: `${p.primaryAction}15`, color: p.primaryAction }}
                              >
                                {c.badge}
                              </span>
                            )}
                            <h4 className="text-xs font-bold leading-tight" style={{ color: p.textPrimary }}>
                              {c.title}
                            </h4>
                            {c.subtitle && (
                              <p className="text-[10px] mt-0.5 leading-snug" style={{ color: p.textSecondary }}>
                                {c.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    }

                    // vCard
                    if (block.type === 'vcard_header') {
                      return (
                        <div
                          key={block.id}
                          className="rounded-xl p-3 border text-center shadow-sm"
                          style={{ backgroundColor: p.cardBackground, borderColor: p.border }}
                        >
                          <div
                            className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-white text-lg shadow"
                            style={{ backgroundColor: p.primaryAction }}
                          >
                            {c.fullName?.charAt(0) || 'V'}
                          </div>
                          <h4 className="text-xs font-bold" style={{ color: p.textPrimary }}>
                            {c.fullName}
                          </h4>
                          <p className="text-[10px] font-medium" style={{ color: p.primaryAction }}>
                            {c.jobTitle}
                          </p>
                          <p className="text-[10px]" style={{ color: p.textSecondary }}>
                            {c.company}
                          </p>

                          <button
                            onClick={() =>
                              downloadVCard({
                                fullName: c.fullName,
                                jobTitle: c.jobTitle,
                                company: c.company,
                                phone: c.phone,
                                email: c.email,
                                website: c.website
                              })
                            }
                            className="w-full py-1.5 mt-2.5 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1.5 shadow"
                            style={{ backgroundColor: p.primaryAction, color: p.primaryActionText || '#ffffff' }}
                          >
                            <Download className="w-3 h-3" />
                            <span>Save Contact (.vcf)</span>
                          </button>
                        </div>
                      );
                    }

                    // Menu Item
                    if (block.type === 'menu_item') {
                      return (
                        <div
                          key={block.id}
                          className="p-2.5 rounded-lg border flex items-center justify-between gap-2 shadow-sm"
                          style={{ backgroundColor: p.cardBackground, borderColor: p.border }}
                        >
                          <div className="min-w-0">
                            <h5 className="text-[11px] font-bold truncate" style={{ color: p.textPrimary }}>
                              {c.name}
                            </h5>
                            <p className="text-[9px] line-clamp-1" style={{ color: p.textSecondary }}>
                              {c.description}
                            </p>
                          </div>
                          <span className="text-[10px] font-bold shrink-0" style={{ color: p.primaryAction }}>
                            {c.currency} {c.price}
                          </span>
                        </div>
                      );
                    }

                    // Buttons
                    if (block.type === 'button') {
                      return (
                        <div
                          key={block.id}
                          className="p-2.5 rounded-lg text-[10px] font-semibold text-center shadow-sm cursor-pointer"
                          style={{ backgroundColor: p.primaryAction, color: p.primaryActionText || '#ffffff' }}
                        >
                          {c.label}
                        </div>
                      );
                    }

                    if (block.type === 'whatsapp_button') {
                      return (
                        <div
                          key={block.id}
                          className="p-2.5 rounded-lg text-[10px] font-semibold text-center bg-emerald-600 text-white shadow-sm flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>{c.buttonText || 'WhatsApp'}</span>
                        </div>
                      );
                    }

                    // Default block fallback representation
                    return (
                      <div
                        key={block.id}
                        className="p-2 rounded-lg border text-[10px] text-center"
                        style={{ backgroundColor: p.cardBackground, borderColor: p.border, color: p.textSecondary }}
                      >
                        {block.title || block.type}
                      </div>
                    );
                  })}
              </div>

              {/* Simulated Mobile Footer */}
              <div className="p-3 text-center text-[9px] opacity-60" style={{ color: p.textSecondary }}>
                Powered by ESAIA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: ADD NEW BLOCK */}
      <Modal
        isOpen={isAddBlockModalOpen}
        onClose={() => setIsAddBlockModalOpen(false)}
        title="Add Block to Page"
        description="Select a structural or interactive component to insert into your landing experience."
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* Section: Essentials */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Essential Brand Blocks</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddBlock('hero')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <Sparkles className="w-4 h-4 text-blue-400 mb-1" />
                <div className="text-xs font-bold text-white">Hero Banner</div>
                <div className="text-[10px] text-slate-400">Header with logo, title &amp; cover</div>
              </button>

              <button
                onClick={() => handleAddBlock('button')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <ExternalLink className="w-4 h-4 text-indigo-400 mb-1" />
                <div className="text-xs font-bold text-white">Action Button</div>
                <div className="text-[10px] text-slate-400">External link or deep action</div>
              </button>
            </div>
          </div>

          {/* Section: Contacts & vCards */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Digital Business Card &amp; Contact</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddBlock('vcard_header')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <Download className="w-4 h-4 text-emerald-400 mb-1" />
                <div className="text-xs font-bold text-white">vCard (.vcf) Header</div>
                <div className="text-[10px] text-slate-400">Executive contact card with 1-tap save</div>
              </button>

              <button
                onClick={() => handleAddBlock('whatsapp_button')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500 mb-1" />
                <div className="text-xs font-bold text-white">WhatsApp Chat</div>
                <div className="text-[10px] text-slate-400">Pre-filled WhatsApp messenger</div>
              </button>

              <button
                onClick={() => handleAddBlock('phone_button')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <Phone className="w-4 h-4 text-blue-400 mb-1" />
                <div className="text-xs font-bold text-white">Click-to-Call</div>
                <div className="text-[10px] text-slate-400">Direct telephone dialing</div>
              </button>

              <button
                onClick={() => handleAddBlock('social_links')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <Globe className="w-4 h-4 text-cyan-400 mb-1" />
                <div className="text-xs font-bold text-white">Social Icons</div>
                <div className="text-[10px] text-slate-400">LinkedIn, Instagram, X, etc.</div>
              </button>
            </div>
          </div>

          {/* Section: F&B & Menus */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Food, Beverage &amp; Catalog</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddBlock('menu_category')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <Utensils className="w-4 h-4 text-amber-500 mb-1" />
                <div className="text-xs font-bold text-white">Menu Category</div>
                <div className="text-[10px] text-slate-400">Category divider (e.g. Espresso Bar)</div>
              </button>

              <button
                onClick={() => handleAddBlock('menu_item')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <Coffee className="w-4 h-4 text-amber-600 mb-1" />
                <div className="text-xs font-bold text-white">Menu Dish / Drink</div>
                <div className="text-[10px] text-slate-400">Price, dietary badges &amp; ordering</div>
              </button>
            </div>
          </div>

          {/* Section: Local & Forms */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location &amp; Engagement</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleAddBlock('business_hours')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <Clock className="w-4 h-4 text-purple-400 mb-1" />
                <div className="text-xs font-bold text-white">Business Hours</div>
                <div className="text-[10px] text-slate-400">Schedule with live Open Now status</div>
              </button>

              <button
                onClick={() => handleAddBlock('map_location')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <MapPin className="w-4 h-4 text-rose-400 mb-1" />
                <div className="text-xs font-bold text-white">Location &amp; Maps</div>
                <div className="text-[10px] text-slate-400">Address &amp; Google Maps directions</div>
              </button>

              <button
                onClick={() => handleAddBlock('contact_form')}
                className="p-3 rounded-xl bg-[#0e1017] border border-[#24293d] hover:border-blue-500 text-left transition-all"
              >
                <Send className="w-4 h-4 text-emerald-400 mb-1" />
                <div className="text-xs font-bold text-white">Lead Inquiry Form</div>
                <div className="text-[10px] text-slate-400">Capture name, email &amp; inquiries</div>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL 2: EDIT BLOCK CONTENT */}
      {editingBlock && (
        <Modal
          isOpen={Boolean(editingBlock)}
          onClose={() => setEditingBlock(null)}
          title={`Edit ${editingBlock.type.replace(/_/g, ' ').toUpperCase()}`}
          description="Update block text, media URLs, and operational fields."
        >
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
            {/* HERO BLOCK FIELDS */}
            {editingBlock.type === 'hero' && (
              <>
                <Input
                  id="eb-hero-title"
                  label="Hero Headline Title"
                  value={editingBlock.content.title || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, title: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-hero-sub"
                  label="Subtitle / Bio"
                  value={editingBlock.content.subtitle || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, subtitle: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-hero-badge"
                  label="Top Badge / Tag"
                  value={editingBlock.content.badge || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, badge: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-hero-avatar"
                  label="Logo / Avatar Image URL"
                  value={editingBlock.content.avatarUrl || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, avatarUrl: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-hero-cover"
                  label="Cover Banner Image URL"
                  value={editingBlock.content.coverUrl || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, coverUrl: e.target.value }
                    })
                  }
                />
              </>
            )}

            {/* VCARD BLOCK FIELDS */}
            {editingBlock.type === 'vcard_header' && (
              <>
                <Input
                  id="eb-vc-name"
                  label="Full Name"
                  value={editingBlock.content.fullName || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, fullName: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-vc-title"
                  label="Job Title / Role"
                  value={editingBlock.content.jobTitle || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, jobTitle: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-vc-company"
                  label="Company / Firm"
                  value={editingBlock.content.company || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, company: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-vc-phone"
                  label="Mobile Phone (for .vcf & dialing)"
                  value={editingBlock.content.phone || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, phone: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-vc-email"
                  label="Email Address"
                  value={editingBlock.content.email || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, email: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-vc-wa"
                  label="WhatsApp Number"
                  value={editingBlock.content.whatsapp || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, whatsapp: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-vc-web"
                  label="Website URL"
                  value={editingBlock.content.website || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, website: e.target.value }
                    })
                  }
                />
              </>
            )}

            {/* BUTTON BLOCK FIELDS */}
            {editingBlock.type === 'button' && (
              <>
                <Input
                  id="eb-btn-label"
                  label="Button Label"
                  value={editingBlock.content.label || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, label: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-btn-sub"
                  label="Subtext"
                  value={editingBlock.content.subtext || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, subtext: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-btn-url"
                  label="Target URL"
                  value={editingBlock.content.url || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, url: e.target.value }
                    })
                  }
                />
              </>
            )}

            {/* WHATSAPP BLOCK FIELDS */}
            {editingBlock.type === 'whatsapp_button' && (
              <>
                <Input
                  id="eb-wa-num"
                  label="WhatsApp Phone Number (with country code)"
                  value={editingBlock.content.phoneNumber || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, phoneNumber: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-wa-text"
                  label="Button Text"
                  value={editingBlock.content.buttonText || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, buttonText: e.target.value }
                    })
                  }
                />
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Pre-filled Message</label>
                  <textarea
                    rows={2}
                    value={editingBlock.content.prefilledMessage || ''}
                    onChange={e =>
                      setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, prefilledMessage: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0e1017] border border-[#24293d] text-white"
                  />
                </div>
              </>
            )}

            {/* MENU ITEM FIELDS */}
            {editingBlock.type === 'menu_item' && (
              <>
                <Input
                  id="eb-mi-name"
                  label="Item Name"
                  value={editingBlock.content.name || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, name: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-mi-desc"
                  label="Description / Ingredients"
                  value={editingBlock.content.description || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, description: e.target.value }
                    })
                  }
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    id="eb-mi-price"
                    label="Price"
                    type="number"
                    value={editingBlock.content.price || 0}
                    onChange={e =>
                      setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, price: parseFloat(e.target.value) }
                      })
                    }
                  />
                  <Input
                    id="eb-mi-curr"
                    label="Currency"
                    value={editingBlock.content.currency || 'EGP'}
                    onChange={e =>
                      setEditingBlock({
                        ...editingBlock,
                        content: { ...editingBlock.content, currency: e.target.value }
                      })
                    }
                  />
                </div>
                <Input
                  id="eb-mi-cat"
                  label="Category Name"
                  value={editingBlock.content.category || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, category: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-mi-img"
                  label="Dish Image URL"
                  value={editingBlock.content.imageUrl || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, imageUrl: e.target.value }
                    })
                  }
                />
              </>
            )}

            {/* LOCATION BLOCK FIELDS */}
            {editingBlock.type === 'map_location' && (
              <>
                <Input
                  id="eb-loc-title"
                  label="Location Title"
                  value={editingBlock.content.locationTitle || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, locationTitle: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-loc-address"
                  label="Physical Address"
                  value={editingBlock.content.address || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, address: e.target.value }
                    })
                  }
                />
                <Input
                  id="eb-loc-dir"
                  label="Google Maps Directions URL"
                  value={editingBlock.content.directionsUrl || ''}
                  onChange={e =>
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, directionsUrl: e.target.value }
                    })
                  }
                />
              </>
            )}

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" onClick={() => setEditingBlock(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setPage({
                    ...page,
                    blocks: page.blocks.map(b => (b.id === editingBlock.id ? editingBlock : b))
                  });
                  setEditingBlock(null);
                }}
              >
                Save Block
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
