/**
 * ESAIA - Enterprise Ready-Made Template Editor & Block Customizer
 * Allows deep customization of any template:
 * - Adding, removing, reordering, and editing blocks (Hero, Button, Heading, Paragraph, WhatsApp, Phone, vCard, Social, Menu, Video, Hours, Map, Contact)
 * - Live interactive Mobile / Tablet Phone Simulator with instant feedback
 * - Customizing colors, backgrounds, and themes
 * - Saving custom templates to "My Templates" (persisted in localStorage)
 * - Launching directly into the live Page Builder with all modifications preserved
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Sparkles,
  Smartphone,
  Tablet,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Palette,
  Layers,
  Settings,
  Eye,
  EyeOff,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  Phone,
  Video,
  Play,
  Download,
  Utensils,
  MapPin,
  Clock,
  Send,
  Globe,
  Heading as HeadingIcon,
  AlignLeft,
  Image,
  Share2
} from 'lucide-react';
import { TemplateItem, CATEGORY_DEFINITIONS, TemplateCategory } from '../../data/templatesData';
import { PageBlock, BlockType, PageThemeConfig } from '../../types/page';
import { useLanguage } from '../../context/LanguageContext';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

interface TemplateEditorModalProps {
  template: TemplateItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveTemplate: (updatedTemplate: TemplateItem) => void;
  onUseTemplate: (updatedTemplate: TemplateItem) => void;
}

const THEME_PRESETS: Array<{
  id: string;
  name: string;
  nameAr: string;
  bg: string;
  cardBg: string;
  primary: string;
  text: string;
  border: string;
}> = [
  { id: 'dark', name: 'Obsidian Night', nameAr: 'الوضع الليلي الحديث', bg: '#090a0f', cardBg: '#141722', primary: '#3b82f6', text: '#ffffff', border: '#24293d' },
  { id: 'light', name: 'Clean Snow', nameAr: 'الوضع الفاتح الأنيق', bg: '#f8fafc', cardBg: '#ffffff', primary: '#2563eb', text: '#0f172a', border: '#e2e8f0' },
  { id: 'beige', name: 'Warm Parchment', nameAr: 'بيج كلاسيكي دافئ', bg: '#f6f3eb', cardBg: '#ffffff', primary: '#78350f', text: '#1c1917', border: '#e7e5e4' },
  { id: 'sapphire', name: 'Sapphire Royal', nameAr: 'ياقوتي ملكي', bg: '#0b1120', cardBg: '#1e293b', primary: '#6366f1', text: '#ffffff', border: '#334155' },
  { id: 'emerald', name: 'Emerald Forest', nameAr: 'زمردي طبيعي', bg: '#062016', cardBg: '#0b3524', primary: '#10b981', text: '#ffffff', border: '#134e3a' },
  { id: 'sunset', name: 'Sunset Glow', nameAr: 'غروب الشمس المشرق', bg: '#1c0f14', cardBg: '#2e141f', primary: '#f43f5e', text: '#ffffff', border: '#4c1d30' }
];

export const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({
  template,
  isOpen,
  onClose,
  onSaveTemplate,
  onUseTemplate
}) => {
  const { isRTL } = useLanguage();

  // Local draft of template
  const [draft, setDraft] = useState<TemplateItem | null>(() => template ? JSON.parse(JSON.stringify(template)) : null);
  const [activeTab, setActiveTab] = useState<'blocks' | 'theme' | 'meta'>('blocks');
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet'>('mobile');
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null);
  const [isAddBlockDrawerOpen, setIsAddBlockDrawerOpen] = useState(false);

  // Sync when template prop changes
  React.useEffect(() => {
    if (template) {
      setDraft(JSON.parse(JSON.stringify(template)));
      setEditingBlockId(template.blocks[0]?.id || null);
    }
  }, [template]);

  if (!isOpen || !draft) return null;

  const currentTheme = draft.themeConfig;
  const palette = currentTheme.palette;

  // Handle Meta Changes
  const handleMetaChange = (field: keyof TemplateItem, value: any) => {
    setDraft(prev => prev ? { ...prev, [field]: value } : prev);
  };

  // Handle Theme Changes
  const handlePaletteChange = (field: keyof typeof palette, value: string) => {
    setDraft(prev => {
      if (!prev) return prev;
      const updatedPalette = { ...prev.themeConfig.palette, [field]: value };
      return {
        ...prev,
        themeConfig: {
          ...prev.themeConfig,
          palette: updatedPalette
        },
        preview: {
          ...prev.preview,
          headerBg: updatedPalette.background,
          cardBg: updatedPalette.cardBackground,
          accentColor: updatedPalette.primaryAction,
          textColor: updatedPalette.textPrimary
        }
      };
    });
  };

  const handleApplyPreset = (preset: typeof THEME_PRESETS[0]) => {
    setDraft(prev => {
      if (!prev) return prev;
      const updatedPalette = {
        background: preset.bg,
        cardBackground: preset.cardBg,
        textPrimary: preset.text,
        textSecondary: preset.id === 'light' || preset.id === 'beige' ? '#64748b' : '#94a3b8',
        primaryAction: preset.primary,
        primaryActionText: '#ffffff',
        accent: preset.primary,
        border: preset.border
      };
      return {
        ...prev,
        themeConfig: {
          ...prev.themeConfig,
          palette: updatedPalette
        },
        preview: {
          ...prev.preview,
          headerBg: preset.bg,
          cardBg: preset.cardBg,
          accentColor: preset.primary,
          textColor: preset.text
        }
      };
    });
  };

  // Block Manipulation: Add
  const handleAddNewBlock = (type: BlockType) => {
    let defaultContent: Record<string, any> = {};

    switch (type) {
      case 'hero':
        defaultContent = {
          title: draft.title || 'عنوان الصفحة الترحيبي',
          subtitle: 'أضف هنا نبذة تعريفية بالخدمات والنشاط التجاري.',
          badge: 'مميز',
          alignment: 'center'
        };
        break;
      case 'button':
        defaultContent = {
          label: 'تواصل معنا الآن',
          subtext: 'رابط مباشر للخدمات والعروض',
          url: 'https://esaia.app',
          variant: 'primary'
        };
        break;
      case 'heading':
        defaultContent = {
          text: 'عنوان قسم رئيسي',
          level: 'h2'
        };
        break;
      case 'paragraph':
        defaultContent = {
          text: 'أدخل هنا نصاً توضيحياً ومعلومات تفصيلية عن نشاطك أو خدماتك أو منتجاتك لزوار الصفحة.',
          title: 'معلومات عامة'
        };
        break;
      case 'whatsapp_button':
        defaultContent = {
          phoneNumber: '+201001234567',
          buttonText: 'محادثة عبر واتساب مباشرة',
          prefilledMessage: 'مرحباً! أود الاستفسار عن خدماتكم.'
        };
        break;
      case 'phone_button':
        defaultContent = {
          phoneNumber: '+201001234567',
          buttonText: 'اتصال هاتفي مباشر',
          subtext: 'متاح طوال ساعات العمل الرسمية'
        };
        break;
      case 'vcard_header':
        defaultContent = {
          fullName: 'الاسم واللقب الوظيفي',
          jobTitle: 'المدير التنفيذي / مستشار أعمال',
          company: draft.title,
          phone: '+971 50 123 4567',
          email: 'info@enterprise.com',
          website: 'https://esaia.app',
          bio: 'مستشار متخصص في قيادة وتطوير الأعمال.'
        };
        break;
      case 'social_links':
        defaultContent = {
          links: [
            { platform: 'linkedin', url: 'https://linkedin.com' },
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'website', url: 'https://esaia.app' }
          ]
        };
        break;
      case 'menu_item':
        defaultContent = {
          name: 'طبق أو منتج مميز',
          description: 'وصف تفصيلي للمكونات والمميزات الخاصة بهذا المنتج.',
          price: 95,
          currency: 'EGP',
          category: 'المميزات'
        };
        break;
      case 'menu_category':
        defaultContent = {
          name: 'المشروبات الساخنة والقهوة المختصة',
          description: 'محضرة بأجود أنواع البن والمكونات الطازجة.'
        };
        break;
      case 'video_embed':
        defaultContent = {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          title: 'فيديو تعريفي',
          caption: 'شاهد نبذة تعريفية عن أعمالنا وخدماتنا مباشرة هنا.',
          aspectRatio: '16:9'
        };
        break;
      case 'business_hours':
        defaultContent = {
          title: 'مواعيد وساعات العمل',
          days: [
            { day: 'الأحد - الخميس', open: '09:00 ص', close: '09:00 م', isClosed: false },
            { day: 'الجمعة - السبت', open: '12:00 م', close: '10:00 م', isClosed: false }
          ],
          note: 'ساعات العمل قد تختلف في العطلات الرسمية.'
        };
        break;
      case 'map_location':
        defaultContent = {
          locationTitle: 'موقع المقر الرئيسي',
          address: 'القاهرة، مصر',
          directionsUrl: 'https://maps.google.com'
        };
        break;
      case 'contact_form':
        defaultContent = {
          heading: 'أرسل لنا استفسارك',
          subtext: 'يرجى ملء النموذج وسنتواصل معك في أسرع وقت.',
          submitButtonText: 'إرسال الرسالة'
        };
        break;
      default:
        defaultContent = { label: 'كتلة جديدة' };
    }

    const newBlock: PageBlock = {
      id: `b_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      title: type.toUpperCase(),
      isVisible: true,
      orderIndex: draft.blocks.length,
      content: defaultContent
    };

    setDraft(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        blocks: [...prev.blocks, newBlock]
      };
    });

    setEditingBlockId(newBlock.id);
    setIsAddBlockDrawerOpen(false);
  };

  // Block Manipulation: Update
  const handleUpdateBlockContent = (blockId: string, updatedContent: Record<string, any>) => {
    setDraft(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        blocks: prev.blocks.map(b => b.id === blockId ? { ...b, content: updatedContent } : b)
      };
    });
  };

  // Block Manipulation: Reorder
  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    setDraft(prev => {
      if (!prev) return prev;
      const newBlocks = [...prev.blocks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newBlocks.length) return prev;

      const temp = newBlocks[index];
      newBlocks[index] = newBlocks[targetIndex];
      newBlocks[targetIndex] = temp;

      return {
        ...prev,
        blocks: newBlocks.map((b, idx) => ({ ...b, orderIndex: idx }))
      };
    });
  };

  // Block Manipulation: Delete
  const handleDeleteBlock = (blockId: string) => {
    setDraft(prev => {
      if (!prev) return prev;
      const filtered = prev.blocks.filter(b => b.id !== blockId);
      return {
        ...prev,
        blocks: filtered.map((b, idx) => ({ ...b, orderIndex: idx }))
      };
    });
    if (editingBlockId === blockId) {
      setEditingBlockId(null);
    }
  };

  // Block Manipulation: Duplicate
  const handleDuplicateBlock = (block: PageBlock) => {
    const duplicated: PageBlock = {
      ...JSON.parse(JSON.stringify(block)),
      id: `b_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      orderIndex: draft.blocks.length
    };
    setDraft(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        blocks: [...prev.blocks, duplicated]
      };
    });
    setEditingBlockId(duplicated.id);
  };

  // Block Manipulation: Toggle Visibility
  const handleToggleVisibility = (blockId: string) => {
    setDraft(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        blocks: prev.blocks.map(b => b.id === blockId ? { ...b, isVisible: !b.isVisible } : b)
      };
    });
  };

  const selectedBlock = useMemo(() => {
    return draft.blocks.find(b => b.id === editingBlockId) || null;
  }, [draft.blocks, editingBlockId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[94vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <div className="px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  {isRTL ? 'استوديو تعديل وتخصيص القالب' : 'Template Customizer Studio'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                  {draft.blocks.length} {isRTL ? 'كتلة' : 'blocks'}
                </span>
              </div>
              <h3 className="text-sm font-black text-white truncate">{draft.title}</h3>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('blocks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'blocks'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isRTL ? 'الكتل والمحتوى' : 'Blocks & Content'}</span>
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'theme'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>{isRTL ? 'الألوان والمظهر' : 'Theme & Palette'}</span>
            </button>
            <button
              onClick={() => setActiveTab('meta')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'meta'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isRTL ? 'بيانات القالب' : 'Template Meta'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onSaveTemplate(draft)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
              title={isRTL ? 'حفظ النموذج في قائمة نماذجي' : 'Save template to My Templates'}
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isRTL ? 'حفظ في نماذجي' : 'Save to My Templates'}</span>
            </button>

            <button
              onClick={() => onUseTemplate(draft)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>{isRTL ? 'إطلاق في المنشئ' : 'Launch in Builder'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MAIN BODY: 2-COLUMN LAYOUT (Editor Panels | Live Interactive Simulator) */}
        <div className="flex-1 flex overflow-hidden">
          {/* LEFT: EDITING CONTROLS */}
          <div className="flex-1 border-r border-slate-800 flex flex-col overflow-y-auto bg-slate-950/40 p-4 sm:p-6 space-y-6">
            {/* TAB 1: BLOCKS MANAGER */}
            {activeTab === 'blocks' && (
              <div className="space-y-5">
                {/* Header with "+ Add Block" button */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{isRTL ? 'إدارة كتل وبلوكات القالب' : 'Template Blocks Manager'}</span>
                      <span className="text-xs text-indigo-400 font-semibold">({draft.blocks.length})</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isRTL
                        ? 'أضف كتل جديدة، عدّل النصوص والروابط، أو أعد ترتيب العناصر بنقرة واحدة.'
                        : 'Add blocks, edit content and links, or reorder elements with 1 click.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAddBlockDrawerOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all transform active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'إضافة كتلة جديدة' : 'Add Block'}</span>
                  </button>
                </div>

                {/* ADD BLOCK DRAWER / ACCORDION */}
                {isAddBlockDrawerOpen && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-xl space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{isRTL ? 'اختر نوع الكتلة لإضافتها إلى القالب' : 'Choose block type to add'}</span>
                      </span>
                      <button
                        onClick={() => setIsAddBlockDrawerOpen(false)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        ✕ {isRTL ? 'إغلاق' : 'Close'}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {/* Identity & Basic */}
                      <button
                        onClick={() => handleAddNewBlock('hero')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-indigo-600/15 border border-slate-800 hover:border-indigo-500/50 text-left rtl:text-right transition-all group"
                      >
                        <Sparkles className="w-4 h-4 text-indigo-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'بانر ترحيبي (Hero)' : 'Hero Banner'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'شعار، عنوان رئيسي وصورة غلاف' : 'Header, title & cover'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('button')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-indigo-600/15 border border-slate-800 hover:border-indigo-500/50 text-left rtl:text-right transition-all group"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'زر ورابط تفاعلي' : 'Action Button'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'رابط خارجي مخصص' : 'Custom external link'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('heading')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-indigo-600/15 border border-slate-800 hover:border-indigo-500/50 text-left rtl:text-right transition-all group"
                      >
                        <HeadingIcon className="w-4 h-4 text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'عنوان قسم بارز' : 'Heading'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'عناوين H1, H2, H3' : 'Section headers'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('paragraph')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-indigo-600/15 border border-slate-800 hover:border-indigo-500/50 text-left rtl:text-right transition-all group"
                      >
                        <AlignLeft className="w-4 h-4 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'نص وفقرة توضيحية' : 'Paragraph Text'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'نصوص ومعلومات موسعة' : 'Detailed descriptive text'}</div>
                      </button>

                      {/* Communications */}
                      <button
                        onClick={() => handleAddNewBlock('whatsapp_button')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-emerald-600/15 border border-slate-800 hover:border-emerald-500/50 text-left rtl:text-right transition-all group"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'زر واتساب مباشر' : 'WhatsApp Chat'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'محادثة برقم ورسالة جاهزة' : 'Direct WhatsApp chat'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('phone_button')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-blue-600/15 border border-slate-800 hover:border-blue-500/50 text-left rtl:text-right transition-all group"
                      >
                        <Phone className="w-4 h-4 text-blue-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'اتصال هاتفي' : 'Phone Call'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'اتصال مباشر بنقرة واحدة' : 'Instant phone dialer'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('vcard_header')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-indigo-600/15 border border-slate-800 hover:border-indigo-500/50 text-left rtl:text-right transition-all group"
                      >
                        <Download className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'بطاقة اتصال (vCard)' : 'Digital Business Card'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'تحميل جهة الاتصال للهاتف' : 'Download contact .vcf'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('social_links')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-indigo-600/15 border border-slate-800 hover:border-indigo-500/50 text-left rtl:text-right transition-all group"
                      >
                        <Globe className="w-4 h-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'شبكات التواصل' : 'Social Links'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'أيقونات السوشيال ميديا' : 'Multi-channel social icons'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('video_embed')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-red-600/15 border border-slate-800 hover:border-red-500/50 text-left rtl:text-right transition-all group"
                      >
                        <Video className="w-4 h-4 text-red-500 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'فيديو يوتيوب' : 'YouTube Video'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'تشغيل فيديو داخل الصفحة' : 'Embedded video player'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('menu_item')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-amber-600/15 border border-slate-800 hover:border-amber-500/50 text-left rtl:text-right transition-all group"
                      >
                        <Utensils className="w-4 h-4 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'عنصر قائمة / منتج' : 'Menu / Product Item'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'اسم وسعر وصورة' : 'Price, item title & photo'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('business_hours')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-indigo-600/15 border border-slate-800 hover:border-indigo-500/50 text-left rtl:text-right transition-all group"
                      >
                        <Clock className="w-4 h-4 text-teal-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'مواعيد العمل' : 'Business Hours'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'جدول ساعات العمل' : 'Weekly schedule'}</div>
                      </button>

                      <button
                        onClick={() => handleAddNewBlock('map_location')}
                        className="p-3 rounded-xl bg-slate-950/80 hover:bg-indigo-600/15 border border-slate-800 hover:border-indigo-500/50 text-left rtl:text-right transition-all group"
                      >
                        <MapPin className="w-4 h-4 text-rose-400 mb-1 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-white">{isRTL ? 'موقع وخريطة' : 'Map & Address'}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{isRTL ? 'العنوان الجغرافي ورابط الخرائط' : 'Physical address & directions'}</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* BLOCKS LIST & INLINE EDITORS */}
                <div className="space-y-3">
                  {draft.blocks.map((block, idx) => {
                    const isSelected = editingBlockId === block.id;

                    return (
                      <div
                        key={block.id}
                        className={`rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Block Item Header */}
                        <div
                          onClick={() => setEditingBlockId(isSelected ? null : block.id)}
                          className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white truncate">
                                  {block.content?.title || block.content?.name || block.content?.label || block.content?.fullName || block.type}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-bold border border-slate-700/80 shrink-0">
                                  {block.type}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quick Controls */}
                          <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                            {/* Reorder Up */}
                            <button
                              disabled={idx === 0}
                              onClick={() => handleMoveBlock(idx, 'up')}
                              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
                              title={isRTL ? 'تحريك للأعلى' : 'Move Up'}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>

                            {/* Reorder Down */}
                            <button
                              disabled={idx === draft.blocks.length - 1}
                              onClick={() => handleMoveBlock(idx, 'down')}
                              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
                              title={isRTL ? 'تحريك للأسفل' : 'Move Down'}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Visibility Toggle */}
                            <button
                              onClick={() => handleToggleVisibility(block.id)}
                              className={`p-1 rounded-lg transition-colors ${
                                block.isVisible ? 'text-slate-400 hover:text-white' : 'text-amber-400 hover:text-amber-300'
                              }`}
                              title={block.isVisible ? 'إخفاء الكتلة' : 'إظهار الكتلة'}
                            >
                              {block.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>

                            {/* Duplicate */}
                            <button
                              onClick={() => handleDuplicateBlock(block)}
                              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                              title={isRTL ? 'تكرار الكتلة' : 'Duplicate Block'}
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteBlock(block.id)}
                              className="p-1 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              title={isRTL ? 'حذف الكتلة' : 'Delete Block'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* EXPANDED BLOCK FORM */}
                        {isSelected && (
                          <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-3.5">
                            {/* HERO BLOCK FORM */}
                            {block.type === 'hero' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'العنوان الرئيسي (Hero Title)' : 'Hero Title'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.title || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, title: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'الوصف الفرعي (Subtitle)' : 'Subtitle'}
                                  </label>
                                  <textarea
                                    rows={2}
                                    value={block.content.subtitle || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, subtitle: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'الشارة البارزة (Badge)' : 'Badge'}
                                    </label>
                                    <input
                                      type="text"
                                      value={block.content.badge || ''}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, badge: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'المحاذاة' : 'Alignment'}
                                    </label>
                                    <select
                                      value={block.content.alignment || 'center'}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, alignment: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    >
                                      <option value="center">{isRTL ? 'توسيط (Center)' : 'Center'}</option>
                                      <option value="left">{isRTL ? 'محاذاة لليسار' : 'Left'}</option>
                                    </select>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'رابط صورة الغلاف (Cover Banner URL)' : 'Cover Image URL'}
                                  </label>
                                  <input
                                    type="url"
                                    value={block.content.coverUrl || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, coverUrl: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'رابط الشعار أو الصورة الشخصية (Avatar/Logo URL)' : 'Avatar / Logo URL'}
                                  </label>
                                  <input
                                    type="url"
                                    value={block.content.avatarUrl || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, avatarUrl: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>
                              </div>
                            )}

                            {/* BUTTON BLOCK FORM */}
                            {block.type === 'button' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'نص الزر (Button Label)' : 'Button Label'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.label || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, label: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'الرابط المستهدف (Destination URL)' : 'Target URL'}
                                  </label>
                                  <input
                                    type="url"
                                    value={block.content.url || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, url: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'شكل الزر (Variant)' : 'Style Variant'}
                                    </label>
                                    <select
                                      value={block.content.variant || 'primary'}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, variant: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    >
                                      <option value="primary">{isRTL ? 'ممتلئ (Primary)' : 'Primary Filled'}</option>
                                      <option value="outline">{isRTL ? 'حد خارجي (Outline)' : 'Outline'}</option>
                                      <option value="secondary">{isRTL ? 'ثانوي هادئ' : 'Secondary'}</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'نص توضيحي صغير أسفل الزر' : 'Subtext'}
                                    </label>
                                    <input
                                      type="text"
                                      value={block.content.subtext || ''}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, subtext: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* HEADING BLOCK FORM */}
                            {block.type === 'heading' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'نص العنوان' : 'Heading Text'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.text || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, text: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'مستوى العنوان' : 'Heading Level'}
                                    </label>
                                    <select
                                      value={block.content.level || 'h2'}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, level: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    >
                                      <option value="h1">H1 - {isRTL ? 'عنوان رئيسي ضخم' : 'Large Header'}</option>
                                      <option value="h2">H2 - {isRTL ? 'عنوان متوسط' : 'Medium Header'}</option>
                                      <option value="h3">H3 - {isRTL ? 'عنوان فرعي' : 'Subheader'}</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* PARAGRAPH BLOCK FORM */}
                            {block.type === 'paragraph' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'النص التفصيلي (Paragraph Text)' : 'Paragraph Content'}
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={block.content.text || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, text: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>
                              </div>
                            )}

                            {/* WHATSAPP BLOCK FORM */}
                            {block.type === 'whatsapp_button' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'رقم هاتف واتساب (بالكود الدولي)' : 'WhatsApp Phone Number'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.phoneNumber || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, phoneNumber: e.target.value })}
                                    placeholder="+201001234567"
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'نص الزر' : 'Button Text'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.buttonText || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, buttonText: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'الرسالة التمهيدية المسبقة' : 'Prefilled Message'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.prefilledMessage || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, prefilledMessage: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>
                              </div>
                            )}

                            {/* PHONE BLOCK FORM */}
                            {block.type === 'phone_button' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'رقم الهاتف للاتصال' : 'Phone Number'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.phoneNumber || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, phoneNumber: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'نص الزر' : 'Button Text'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.buttonText || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, buttonText: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>
                              </div>
                            )}

                            {/* VCARD BLOCK FORM */}
                            {block.type === 'vcard_header' && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'الاسم الكامل' : 'Full Name'}
                                    </label>
                                    <input
                                      type="text"
                                      value={block.content.fullName || ''}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, fullName: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'المسمى الوظيفي' : 'Job Title'}
                                    </label>
                                    <input
                                      type="text"
                                      value={block.content.jobTitle || ''}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, jobTitle: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'الشركة / المؤسسة' : 'Company'}
                                    </label>
                                    <input
                                      type="text"
                                      value={block.content.company || ''}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, company: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'رقم الهاتف' : 'Phone'}
                                    </label>
                                    <input
                                      type="text"
                                      value={block.content.phone || ''}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, phone: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                                  </label>
                                  <input
                                    type="email"
                                    value={block.content.email || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, email: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>
                              </div>
                            )}

                            {/* YOUTUBE VIDEO EMBED FORM */}
                            {block.type === 'video_embed' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'رابط يوتيوب (YouTube URL)' : 'YouTube Video URL'}
                                  </label>
                                  <input
                                    type="url"
                                    value={block.content.url || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, url: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'عنوان الفيديو' : 'Video Title'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.title || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, title: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>
                              </div>
                            )}

                            {/* MENU ITEM FORM */}
                            {block.type === 'menu_item' && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'اسم الصنف' : 'Item Name'}
                                    </label>
                                    <input
                                      type="text"
                                      value={block.content.name || ''}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, name: e.target.value })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>

                                  <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                                      {isRTL ? 'السعر' : 'Price'}
                                    </label>
                                    <input
                                      type="number"
                                      value={block.content.price || 0}
                                      onChange={e => handleUpdateBlockContent(block.id, { ...block.content, price: parseFloat(e.target.value) || 0 })}
                                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                                    {isRTL ? 'وصف الصنف' : 'Description'}
                                  </label>
                                  <input
                                    type="text"
                                    value={block.content.description || ''}
                                    onChange={e => handleUpdateBlockContent(block.id, { ...block.content, description: e.target.value })}
                                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: THEME & PALETTE */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isRTL ? 'لوحات ألوان جاهزة (Theme Presets)' : 'Theme Presets'}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    {isRTL ? 'اختر نسقاً لونياً متناسقاً لتطبيقه فوراً عبر كافة أجزاء القالب' : 'Quickly apply a curated color scheme'}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {THEME_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => handleApplyPreset(preset)}
                        className="p-3 rounded-2xl border border-slate-800 hover:border-indigo-500/60 bg-slate-900/80 text-left rtl:text-right transition-all group flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.bg }} />
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.primary }} />
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.cardBg }} />
                        </div>
                        <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                          {isRTL ? preset.nameAr : preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white">
                    {isRTL ? 'تخصيص الألوان الدقيقة' : 'Fine-Tuned Colors'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Background */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {isRTL ? 'لون خلفية الصفحة' : 'Page Background'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{palette.background}</span>
                      </div>
                      <input
                        type="color"
                        value={palette.background}
                        onChange={e => handlePaletteChange('background', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>

                    {/* Card Background */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {isRTL ? 'لون خلفية البطاقات' : 'Card Background'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{palette.cardBackground}</span>
                      </div>
                      <input
                        type="color"
                        value={palette.cardBackground}
                        onChange={e => handlePaletteChange('cardBackground', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>

                    {/* Primary Action */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {isRTL ? 'اللون التفاعلي والأزرار' : 'Primary Action / Button'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{palette.primaryAction}</span>
                      </div>
                      <input
                        type="color"
                        value={palette.primaryAction}
                        onChange={e => handlePaletteChange('primaryAction', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>

                    {/* Text Primary */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {isRTL ? 'لون النصوص الرئيسية' : 'Primary Text'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{palette.textPrimary}</span>
                      </div>
                      <input
                        type="color"
                        value={palette.textPrimary}
                        onChange={e => handlePaletteChange('textPrimary', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TEMPLATE META */}
            {activeTab === 'meta' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    {isRTL ? 'اسم القالب' : 'Template Title'}
                  </label>
                  <input
                    type="text"
                    value={draft.title}
                    onChange={e => handleMetaChange('title', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    {isRTL ? 'وصف القالب' : 'Template Subtitle'}
                  </label>
                  <textarea
                    rows={2}
                    value={draft.subtitle}
                    onChange={e => handleMetaChange('subtitle', e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      {isRTL ? 'التصنيف' : 'Category'}
                    </label>
                    <select
                      value={draft.category}
                      onChange={e => {
                        const selected = CATEGORY_DEFINITIONS.find(c => c.id === e.target.value);
                        setDraft(prev => prev ? {
                          ...prev,
                          category: e.target.value as TemplateCategory,
                          categoryName: selected?.name || e.target.value,
                          categoryNameAr: selected?.nameAr || e.target.value
                        } : prev);
                      }}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    >
                      {CATEGORY_DEFINITIONS.map(c => (
                        <option key={c.id} value={c.id}>
                          {isRTL ? c.nameAr : c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      {isRTL ? 'نوع الصفحة' : 'Page Type'}
                    </label>
                    <select
                      value={draft.type}
                      onChange={e => handleMetaChange('type', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="landing">{isRTL ? 'صفحة هبوط (Landing Page)' : 'Landing Page'}</option>
                      <option value="link_in_bio">{isRTL ? 'روابط السيرة الذاتية (Link in bio)' : 'Link in Bio'}</option>
                      <option value="business_card">{isRTL ? 'بطاقة عمل رقمية (Digital Card)' : 'Digital Card'}</option>
                      <option value="menu">{isRTL ? 'قائمة طعام وخدمات (Menu)' : 'Menu'}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: LIVE INTERACTIVE PHONE STAGE */}
          <div className="w-[380px] sm:w-[420px] bg-slate-950 p-4 flex flex-col items-center justify-center border-l border-slate-800 shrink-0">
            {/* Device Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 mb-3 select-none">
              <button
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>{isRTL ? 'هاتف' : 'Mobile'}</span>
              </button>
              <button
                onClick={() => setDeviceMode('tablet')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>{isRTL ? 'تابلت' : 'Tablet'}</span>
              </button>
            </div>

            {/* PHONE CONTAINER */}
            <div
              className={`transition-all duration-300 rounded-[38px] border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col bg-slate-900 ${
                deviceMode === 'mobile' ? 'w-[320px] h-[580px]' : 'w-[360px] h-[580px]'
              }`}
              style={{
                backgroundColor: palette.background,
                color: palette.textPrimary
              }}
            >
              {/* Notch */}
              <div className="h-5 w-full bg-slate-950/80 shrink-0 flex items-center justify-between px-5 select-none">
                <span className="text-[9px] font-bold text-slate-400">9:41</span>
                <div className="w-12 h-2.5 bg-black rounded-full" />
                <div className="flex items-center gap-1">
                  <div className="w-2 h-1.5 bg-slate-400 rounded-2xs" />
                </div>
              </div>

              {/* Scrollable Viewport */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scrollbar-thin">
                {draft.blocks
                  .filter(b => b.isVisible)
                  .map(block => {
                    const c = block.content || {};

                    // Hero
                    if (block.type === 'hero') {
                      return (
                        <div
                          key={block.id}
                          className="rounded-2xl overflow-hidden border shadow-sm text-center"
                          style={{
                            backgroundColor: palette.cardBackground,
                            borderColor: palette.border
                          }}
                        >
                          {c.coverUrl && (
                            <div className="h-24 w-full overflow-hidden bg-slate-800 relative">
                              <img src={c.coverUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="p-3">
                            {c.avatarUrl && (
                              <div
                                className="w-12 h-12 rounded-xl mx-auto overflow-hidden border -mt-7 mb-2 shadow"
                                style={{ borderColor: palette.cardBackground }}
                              >
                                <img src={c.avatarUrl} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            {c.badge && (
                              <span
                                className="text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mb-1"
                                style={{ backgroundColor: `${palette.primaryAction}20`, color: palette.primaryAction }}
                              >
                                {c.badge}
                              </span>
                            )}
                            <h4 className="text-xs font-bold leading-tight" style={{ color: palette.textPrimary }}>
                              {c.title}
                            </h4>
                            {c.subtitle && (
                              <p className="text-[10px] mt-0.5 opacity-80" style={{ color: palette.textSecondary }}>
                                {c.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    }

                    // Button
                    if (block.type === 'button') {
                      const isOutline = c.variant === 'outline';
                      return (
                        <div
                          key={block.id}
                          className="py-2.5 px-3 rounded-xl text-center font-bold text-xs shadow-xs transition-transform transform active:scale-98 cursor-pointer select-none"
                          style={{
                            backgroundColor: isOutline ? 'transparent' : palette.primaryAction,
                            color: isOutline ? palette.primaryAction : '#ffffff',
                            border: isOutline ? `1.5px solid ${palette.primaryAction}` : undefined
                          }}
                        >
                          <span>{c.label}</span>
                          {c.subtext && (
                            <div className="text-[9px] font-normal opacity-80 mt-0.5">{c.subtext}</div>
                          )}
                        </div>
                      );
                    }

                    // Heading
                    if (block.type === 'heading') {
                      return (
                        <div key={block.id} className="pt-2 pb-1">
                          <h3
                            className={`font-black ${c.level === 'h1' ? 'text-base' : c.level === 'h3' ? 'text-xs' : 'text-sm'}`}
                            style={{ color: palette.textPrimary }}
                          >
                            {c.text}
                          </h3>
                        </div>
                      );
                    }

                    // Paragraph
                    if (block.type === 'paragraph') {
                      return (
                        <div
                          key={block.id}
                          className="p-3 rounded-xl border text-xs leading-relaxed"
                          style={{
                            backgroundColor: palette.cardBackground,
                            borderColor: palette.border,
                            color: palette.textSecondary
                          }}
                        >
                          {c.text}
                        </div>
                      );
                    }

                    // WhatsApp
                    if (block.type === 'whatsapp_button') {
                      return (
                        <div
                          key={block.id}
                          className="py-2.5 px-3 rounded-xl text-center font-bold text-xs bg-emerald-600 text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{c.buttonText || 'WhatsApp'}</span>
                        </div>
                      );
                    }

                    // Phone Call
                    if (block.type === 'phone_button') {
                      return (
                        <div
                          key={block.id}
                          className="py-2.5 px-3 rounded-xl text-center font-bold text-xs bg-blue-600 text-white shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{c.buttonText || c.phoneNumber || 'Call Now'}</span>
                        </div>
                      );
                    }

                    // vCard
                    if (block.type === 'vcard_header') {
                      return (
                        <div
                          key={block.id}
                          className="p-3 rounded-2xl border text-center shadow-xs"
                          style={{
                            backgroundColor: palette.cardBackground,
                            borderColor: palette.border
                          }}
                        >
                          <div
                            className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center font-bold text-white text-base shadow"
                            style={{ backgroundColor: palette.primaryAction }}
                          >
                            {c.fullName?.charAt(0) || 'V'}
                          </div>
                          <h4 className="text-xs font-bold" style={{ color: palette.textPrimary }}>
                            {c.fullName}
                          </h4>
                          <p className="text-[10px] font-medium" style={{ color: palette.primaryAction }}>
                            {c.jobTitle}
                          </p>
                          <p className="text-[10px] opacity-75" style={{ color: palette.textSecondary }}>
                            {c.company}
                          </p>
                          <div
                            className="mt-2 py-1 px-3 rounded-lg text-[10px] font-bold text-white inline-flex items-center gap-1 shadow-xs"
                            style={{ backgroundColor: palette.primaryAction }}
                          >
                            <Download className="w-3 h-3" />
                            <span>Save Contact</span>
                          </div>
                        </div>
                      );
                    }

                    // Video
                    if (block.type === 'video_embed') {
                      const embedUrl = getYouTubeEmbedUrl(c.url);
                      return (
                        <div
                          key={block.id}
                          className="p-2.5 rounded-xl border text-center space-y-1.5"
                          style={{ backgroundColor: palette.cardBackground, borderColor: palette.border }}
                        >
                          {c.title && (
                            <span className="text-[11px] font-bold block" style={{ color: palette.textPrimary }}>
                              {c.title}
                            </span>
                          )}
                          <div className="w-full aspect-video rounded-lg overflow-hidden bg-black relative">
                            {embedUrl ? (
                              <iframe
                                src={embedUrl}
                                title={c.title || 'Video'}
                                className="w-full h-full border-0 absolute inset-0"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500 text-[10px]">
                                <Play className="w-4 h-4 text-red-500 mr-1" />
                                <span>YouTube Player</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }

                    // Menu Item
                    if (block.type === 'menu_item') {
                      return (
                        <div
                          key={block.id}
                          className="p-2.5 rounded-xl border flex items-center justify-between gap-2"
                          style={{ backgroundColor: palette.cardBackground, borderColor: palette.border }}
                        >
                          <div className="min-w-0">
                            <h5 className="text-[11px] font-bold truncate" style={{ color: palette.textPrimary }}>
                              {c.name}
                            </h5>
                            <p className="text-[9px] line-clamp-1 opacity-75" style={{ color: palette.textSecondary }}>
                              {c.description}
                            </p>
                          </div>
                          <span className="text-[10px] font-bold shrink-0" style={{ color: palette.primaryAction }}>
                            {c.currency} {c.price}
                          </span>
                        </div>
                      );
                    }

                    // Fallback
                    return (
                      <div
                        key={block.id}
                        className="p-2 rounded-lg border text-[10px] text-center"
                        style={{
                          backgroundColor: palette.cardBackground,
                          borderColor: palette.border,
                          color: palette.textSecondary
                        }}
                      >
                        {block.title || block.type}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
