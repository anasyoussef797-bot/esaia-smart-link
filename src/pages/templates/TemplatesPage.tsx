/**
 * ESAIA - Enterprise Ready-Made Customizable Templates Gallery (Inspired by Taplink)
 * Featuring 22 industry categories, Landing pages, Link-in-bio microsites,
 * AI Page Generation Banner, Interactive Phone Simulator Previews, and 1-Click Page Builder launch.
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Search,
  Plus,
  ChevronDown,
  ChevronUp,
  Wand2,
  FilePlus2,
  ArrowRight,
  ArrowLeft,
  Filter,
  Bookmark,
  Check,
  Layers,
  Link2,
  ExternalLink,
  Flame,
  LayoutGrid
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { pageService, DEFAULT_THEME_DARK } from '../../services/firebase/pageService';
import {
  READY_MADE_TEMPLATES,
  CATEGORY_DEFINITIONS,
  TemplateItem,
  TemplateCategory
} from '../../data/templatesData';
import { TemplatePhoneMockup } from '../../components/templates/TemplatePhoneMockup';
import { TemplatePreviewModal } from '../../components/templates/TemplatePreviewModal';
import { AiPageGeneratorModal } from '../../components/templates/AiPageGeneratorModal';
import { CategoryIcon } from '../../components/templates/CategoryIcon';

export const TemplatesPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t, isRTL } = useLanguage();
  const { currentOrg } = useAuth();

  // Active Tab: 'featured' | 'landing' | 'link_in_bio' | 'my_templates'
  const [activeTab, setActiveTab] = useState<'featured' | 'landing' | 'link_in_bio' | 'my_templates'>('featured');

  // Search Query & Category Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');
  const [isCategoriesCollapsed, setIsCategoriesCollapsed] = useState(false);

  // Modals state
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Saved / Bookmarked Templates (persisted in localStorage)
  const [savedTemplateIds, setSavedTemplateIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('esaia_saved_templates');
      return saved ? JSON.parse(saved) : ['tpl_law_firm', 'tpl_bio_botanical'];
    } catch {
      return ['tpl_law_firm', 'tpl_bio_botanical'];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const toggleSaveTemplate = (id: string) => {
    setSavedTemplateIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('esaia_saved_templates', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      showToast(
        exists
          ? (isRTL ? 'تمت إزالة النموذج من نماذجي' : 'Removed from My Templates')
          : (isRTL ? 'تم حفظ النموذج في نماذجي بنجاح' : 'Saved to My Templates')
      );
      return next;
    });
  };

  // 1-Click Launch: Instantiate template into actual editable Page and route to Page Builder
  const handleUseTemplate = async (template: TemplateItem) => {
    try {
      showToast(isRTL ? 'جاري تهيئة النموذج والتحويل إلى المحرر...' : 'Initializing template & launching editor...');
      const cleanSlug = `${template.id.replace('tpl_', '')}-${Math.random().toString(36).substring(2, 6)}`;

      const newPageId = await pageService.createPage({
        orgId: currentOrg?.id || 'org_esaia_main',
        clientId: null,
        qrCodeId: null,
        title: template.title,
        slug: cleanSlug,
        pageType: template.type,
        status: 'draft',
        themeConfig: { ...template.themeConfig },
        seo: { ...template.seo },
        blocks: template.blocks.map(b => ({
          ...b,
          id: `b_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
        }))
      });

      onNavigate(`/admin/pages/builder/${newPageId}`);
    } catch (err: any) {
      console.error('Failed to create page from template:', err);
      showToast(err.message || 'Error creating page from template');
    }
  };

  // Create Blank Template from scratch
  const handleCreateBlank = async () => {
    try {
      showToast(isRTL ? 'جاري إنشاء صفحة فارغة جديدة...' : 'Creating blank custom page...');
      const cleanSlug = `custom-${Math.random().toString(36).substring(2, 6)}`;
      const newPageId = await pageService.createPage({
        orgId: currentOrg?.id || 'org_esaia_main',
        clientId: null,
        qrCodeId: null,
        title: isRTL ? 'صفحة جديدة مخصصة' : 'Custom Blank Page',
        slug: cleanSlug,
        pageType: 'landing',
        status: 'draft',
        themeConfig: DEFAULT_THEME_DARK,
        seo: {
          metaTitle: 'Custom Blank Page',
          metaDescription: 'Handcrafted custom page created with ESAIA block editor.'
        },
        blocks: [
          {
            id: `b_hero_${Date.now()}`,
            type: 'hero',
            title: 'Welcome Hero',
            isVisible: true,
            orderIndex: 0,
            content: {
              title: isRTL ? 'عنوان صفحتك الجديدة' : 'Your New Page Title',
              subtitle: isRTL ? 'أضف وصفاً جذاباً لنشاطك التجاري أو خدماتك هنا.' : 'Add an engaging description of your business or services here.',
              badge: 'CUSTOM PAGE',
              alignment: 'center'
            }
          }
        ]
      });

      onNavigate(`/admin/pages/builder/${newPageId}`);
    } catch (err: any) {
      console.error('Failed to create blank page:', err);
      showToast(err.message || 'Error creating blank page');
    }
  };

  // Filter Templates according to Active Tab, Category, and Search Query
  const filteredTemplates = useMemo(() => {
    return READY_MADE_TEMPLATES.filter(tpl => {
      // Tab filter
      if (activeTab === 'featured' && !tpl.isFeatured) return false;
      if (activeTab === 'landing' && tpl.type !== 'landing') return false;
      if (activeTab === 'link_in_bio' && tpl.type !== 'link_in_bio') return false;
      if (activeTab === 'my_templates' && !savedTemplateIds.includes(tpl.id)) return false;

      // Category filter
      if (selectedCategory !== 'all' && tpl.category !== selectedCategory) return false;

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = tpl.title.toLowerCase().includes(q);
        const matchSubtitle = tpl.subtitle.toLowerCase().includes(q);
        const matchCategory = tpl.categoryName.toLowerCase().includes(q) || tpl.categoryNameAr.includes(q);
        const matchTags = tpl.preview.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchSubtitle && !matchCategory && !matchTags) return false;
      }

      return true;
    });
  }, [activeTab, selectedCategory, searchQuery, savedTemplateIds]);

  // Count templates per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    READY_MADE_TEMPLATES.forEach(tpl => {
      counts[tpl.category] = (counts[tpl.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Safe localized labels with high-fidelity RTL / LTR fallbacks
  const labels = useMemo(() => ({
    tabs: {
      featured: t.templatesModule.tabs?.featured || (isRTL ? 'المميزة' : 'Featured'),
      landing: t.templatesModule.tabs?.landing || (isRTL ? 'صفحات الهبوط' : 'Landing pages'),
      linkInBio: t.templatesModule.tabs?.linkInBio || (isRTL ? 'روابط السيرة الذاتية' : 'Link in bio'),
      myTemplates: t.templatesModule.tabs?.myTemplates || (isRTL ? 'نماذجي' : 'My templates')
    },
    aiBanner: {
      title: t.templatesModule.aiBanner?.title || (isRTL ? 'أنشئ صفحتك باستخدام الذكاء الاصطناعي' : 'Create your page using AI'),
      step1: t.templatesModule.aiBanner?.step1 || (isRTL ? '01 أخبر الذكاء الاصطناعي بنشاطك واحصل على صفحة' : '01 Tell AI what you do and get a page'),
      step2: t.templatesModule.aiBanner?.step2 || (isRTL ? '02 خصص هيكل وبلوكات المحتوى' : '02 Customize your page structure'),
      step3: t.templatesModule.aiBanner?.step3 || (isRTL ? '03 أضف هويتك وروابطك وانشر فوراً' : '03 Personalize your page & publish'),
      cta: t.templatesModule.aiBanner?.cta || (isRTL ? 'توليد صفحة ذكية ->' : 'Generate page ->')
    },
    sections: {
      landingPages: t.templatesModule.sections?.landingPages || (isRTL ? 'نماذج صفحات الهبوط' : 'Landing page templates'),
      linkInBio: t.templatesModule.sections?.linkInBio || (isRTL ? 'نماذج روابط السيرة الذاتية' : 'Link In bio templates'),
      categories: t.templatesModule.sections?.categories || (isRTL ? 'التصنيفات' : 'Categories'),
      collapseCategories: t.templatesModule.sections?.collapseCategories || (isRTL ? 'طي التصنيفات' : 'Collapse categories'),
      expandCategories: t.templatesModule.sections?.expandCategories || (isRTL ? 'عرض جميع التصنيفات' : 'Expand categories'),
      searchPlaceholder: t.templatesModule.sections?.searchPlaceholder || (isRTL ? 'ابحث في النماذج بالاسم أو المجال...' : 'Search templates by title, industry, or keywords...'),
      noTemplatesFound: t.templatesModule.sections?.noTemplatesFound || (isRTL ? 'لم يتم العثور على نماذج مطابقة.' : 'No templates match your search criteria.'),
      noSavedTemplates: t.templatesModule.sections?.noSavedTemplates || (isRTL ? 'لم تقم بحفظ أي نماذج بعد.' : 'You have not saved any templates yet.'),
      blankTitle: t.templatesModule.blankTemplate?.title || (isRTL ? 'نموذج فارغ' : 'Blank template'),
      blankSubtitle: t.templatesModule.blankTemplate?.subtitle || (isRTL ? 'خيار للراغبين بالبدء من الصفر وتصميم البلوكات يدوياً' : 'Option for those who like to create from scratch')
    }
  }), [t, isRTL]);

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold shadow-2xl shadow-indigo-600/40 border border-indigo-400/30 flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2.5">
            <span>{t.templatesModule.title}</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              {READY_MADE_TEMPLATES.length} {isRTL ? 'نموذجاً جاهزاً' : 'Templates'}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {t.templatesModule.subtitle}
          </p>
        </div>

        {/* Action Button: AI Generator */}
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 shrink-0"
        >
          <Wand2 className="w-4 h-4 text-amber-300" />
          <span>{isRTL ? 'توليد صفحة بالذكاء الاصطناعي' : 'Generate with AI'}</span>
        </button>
      </div>

      {/* Taplink-Style Top Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto select-none">
        {[
          { id: 'featured', label: labels.tabs.featured, icon: <Flame className="w-3.5 h-3.5" /> },
          { id: 'landing', label: labels.tabs.landing, icon: <Layers className="w-3.5 h-3.5" /> },
          { id: 'link_in_bio', label: labels.tabs.linkInBio, icon: <Link2 className="w-3.5 h-3.5" /> },
          { id: 'my_templates', label: labels.tabs.myTemplates, icon: <Bookmark className="w-3.5 h-3.5" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSelectedCategory('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === tab.id
                ? 'bg-slate-800 text-white shadow-xs border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.id === 'my_templates' && savedTemplateIds.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                {savedTemplateIds.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Taplink-Style AI Creation Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 md:p-8 overflow-hidden shadow-xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{labels.aiBanner.title}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                <span className="text-[11px] font-extrabold text-indigo-400">01</span>
                <p className="text-xs font-semibold text-slate-200 mt-1 leading-snug">
                  {labels.aiBanner.step1}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                <span className="text-[11px] font-extrabold text-purple-400">02</span>
                <p className="text-xs font-semibold text-slate-200 mt-1 leading-snug">
                  {labels.aiBanner.step2}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                <span className="text-[11px] font-extrabold text-emerald-400">03</span>
                <p className="text-xs font-semibold text-slate-200 mt-1 leading-snug">
                  {labels.aiBanner.step3}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all transform active:scale-95 shrink-0"
          >
            <span>{labels.aiBanner.cta}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search & Categories Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className={`w-4 h-4 absolute top-1/2 -translate-y-1/2 text-slate-500 ${isRTL ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.sections.searchPlaceholder}
              className={`w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors ${
                isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 ${isRTL ? 'left-3' : 'right-3'}`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Toggle Categories Button */}
          <button
            onClick={() => setIsCategoriesCollapsed(!isCategoriesCollapsed)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors self-end sm:self-auto"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              {isCategoriesCollapsed
                ? labels.sections.expandCategories
                : labels.sections.collapseCategories}
            </span>
            {isCategoriesCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* 22 Industry Categories Grid (Taplink Screenshot 2 & 3) */}
        {!isCategoriesCollapsed && (
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>{labels.sections.categories}</span>
                <span className="text-[10px] text-slate-500">({CATEGORY_DEFINITIONS.length})</span>
              </span>

              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  {isRTL ? 'عرض كافة النماذج' : 'Show all categories'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600/20 border-indigo-500/60 text-indigo-300 shadow-xs'
                    : 'bg-slate-950/40 border-slate-800/70 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <span className="truncate">{isRTL ? 'الكل' : 'All'}</span>
              </button>

              {CATEGORY_DEFINITIONS.map(cat => {
                const count = categoryCounts[cat.id] || 0;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-1.5 transition-all text-left ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500/60 text-indigo-300 shadow-xs'
                        : 'bg-slate-950/40 border-slate-800/70 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-300">
                        <CategoryIcon name={cat.iconName} className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate text-[11px]">{isRTL ? cat.nameAr : cat.name}</span>
                    </div>

                    {count > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 shrink-0">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Templates Display Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-200">
              {activeTab === 'landing'
                ? labels.sections.landingPages
                : activeTab === 'link_in_bio'
                ? labels.sections.linkInBio
                : activeTab === 'my_templates'
                ? labels.tabs.myTemplates
                : labels.tabs.featured}
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              ({filteredTemplates.length})
            </span>
          </div>

          {selectedCategory !== 'all' && (
            <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
              {isRTL
                ? CATEGORY_DEFINITIONS.find(c => c.id === selectedCategory)?.nameAr
                : CATEGORY_DEFINITIONS.find(c => c.id === selectedCategory)?.name}
            </span>
          )}
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Blank Template Option (Shown in Featured or Landing tab when no strict category is filtering it out) */}
          {(activeTab === 'featured' || activeTab === 'landing') && selectedCategory === 'all' && !searchQuery && (
            <div
              onClick={handleCreateBlank}
              className="group relative flex flex-col bg-slate-900/40 rounded-2xl border-2 border-dashed border-slate-800 hover:border-indigo-500/70 p-6 items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[460px] shadow-sm hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 group-hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <FilePlus2 className="w-8 h-8" />
              </div>

              <h3 className="text-sm font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                {labels.sections.blankTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-2 max-w-[200px] leading-relaxed">
                {labels.sections.blankSubtitle}
              </p>

              <div className="mt-8 px-4 py-2 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-slate-200 group-hover:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm">
                <Plus className="w-3.5 h-3.5" />
                <span>{isRTL ? 'ابدأ من الصفر' : 'Create from scratch'}</span>
              </div>
            </div>
          )}

          {/* Render All Filtered Template Mockup Cards */}
          {filteredTemplates.map(template => (
            <TemplatePhoneMockup
              key={template.id}
              template={template}
              onPreview={(tpl) => setPreviewTemplate(tpl)}
              onUseTemplate={handleUseTemplate}
              isSaved={savedTemplateIds.includes(template.id)}
              onToggleSave={toggleSaveTemplate}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 mx-auto flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-200">
              {activeTab === 'my_templates'
                ? (isRTL ? 'لم تحفظ أي نماذج بعد' : 'No saved templates')
                : labels.sections.noTemplatesFound}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {activeTab === 'my_templates'
                ? labels.sections.noSavedTemplates
                : (isRTL ? 'جرب البحث باسم آخر أو إزالة التصنيف لتصفح كافة القوالب المتاحة.' : 'Try adjusting your search terms or clearing the category filter to see all templates.')}
            </p>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                {isRTL ? 'عرض جميع النماذج' : 'View all templates'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Interactive Mobile Device Simulator Preview Modal */}
      <TemplatePreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onUseTemplate={handleUseTemplate}
      />

      {/* AI Page Generation Modal */}
      <AiPageGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onPageCreated={(pageId) => onNavigate(`/admin/pages/builder/${pageId}`)}
      />
    </div>
  );
};
