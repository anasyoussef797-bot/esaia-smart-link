import React, { useState } from 'react';
import { X, Sparkles, Wand2, Loader2, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { PageType, PageBlock, PageThemeConfig } from '../../types/page';
import { pageService, DEFAULT_THEME_DARK, DEFAULT_THEME_LIGHT, DEFAULT_THEME_BEIGE } from '../../services/firebase/pageService';
import { CATEGORY_DEFINITIONS } from '../../data/templatesData';

interface AiPageGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPageCreated: (pageId: string) => void;
}

export const AiPageGeneratorModal: React.FC<AiPageGeneratorModalProps> = ({
  isOpen,
  onClose,
  onPageCreated
}) => {
  const { isRTL } = useLanguage();
  const { currentOrg } = useAuth();

  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('legal');
  const [pageType, setPageType] = useState<PageType>('landing');
  const [description, setDescription] = useState('');
  const [themeVibe, setThemeVibe] = useState<'dark' | 'light' | 'beige'>('dark');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setError(isRTL ? 'يرجى إدخال اسم النشاط التجاري أو المشروع' : 'Please enter a business or project name');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // 1. Try requesting server-side AI synthesis endpoint with strict 3.5s timeout
      let generatedData: {
        title: string;
        subtitle: string;
        themeConfig: PageThemeConfig;
        blocks: PageBlock[];
      } | null = null;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch('/api/ai/generate-page', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            businessName,
            industry,
            pageType,
            description,
            themeVibe
          })
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && json.data.blocks?.length) {
            generatedData = json.data;
          }
        }
      } catch (networkErr) {
        console.warn('Server AI endpoint unavailable or timed out, using intelligent instant client synthesis engine:', networkErr);
      }

      // 2. Intelligent Client Synthesizer Engine (Domain-Aware & Multi-Lingual)
      if (!generatedData) {
        const baseTheme: PageThemeConfig =
          themeVibe === 'light'
            ? DEFAULT_THEME_LIGHT
            : themeVibe === 'beige'
            ? DEFAULT_THEME_BEIGE
            : DEFAULT_THEME_DARK;

        const cleanName = businessName.trim();
        const cleanDesc = description.trim() || (isRTL ? 'الخدمة المميزة والاحترافية بأعلى معايير الجودة والسرعة.' : 'Premium services tailored with excellence and precision.');

        // Curate high-res domain imagery and copy based on industry
        let heroCover = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&auto=format&fit=crop&q=80'; // logistics/shipping default
        let domainBadge = isRTL ? 'بوابة الأعمال الرسمية' : 'OFFICIAL PORTAL';
        let primaryBtnText = isRTL ? 'احجز أو استفسر عبر واتساب' : 'Chat Directly on WhatsApp';
        let aboutText = isRTL
          ? `مرحباً بكم في ${cleanName}. نقدم أرقى حلول ${cleanDesc} مع الالتزام بأعلى معايير الجودة والسرعة والأمان.`
          : `Welcome to ${cleanName}. We provide industry-leading solutions for ${cleanDesc} with proven reliability and 24/7 client care.`;

        if (industry === 'auto') {
          heroCover = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80';
          domainBadge = isRTL ? 'خدمات النقل والسيارات' : 'AUTOMOTIVE & LOGISTICS';
          primaryBtnText = isRTL ? 'طلب تسعير الشحن الفوري' : 'Request Instant Freight Quote';
        } else if (industry === 'food') {
          heroCover = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80';
          domainBadge = isRTL ? 'قائمة الطعام والطلبات' : 'MENU & DINING';
          primaryBtnText = isRTL ? 'استعرض المنيو واطلب الآن' : 'View Menu & Order';
        } else if (industry === 'legal') {
          heroCover = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80';
          domainBadge = isRTL ? 'استشارات قانونية معتمدة' : 'CERTIFIED LEGAL PRACTICE';
          primaryBtnText = isRTL ? 'حجز جلسة استشارة سرية' : 'Book Confidential Consultation';
        } else if (industry === 'health' || industry === 'beauty') {
          heroCover = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80';
          domainBadge = isRTL ? 'حجز موعد طبي متقدم' : 'APPOINTMENTS & CLINIC';
          primaryBtnText = isRTL ? 'حجز موعد كشف فوري' : 'Schedule Appointment';
        } else if (industry === 'real_estate') {
          heroCover = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80';
          domainBadge = isRTL ? 'عقارات وفرص استثمارية' : 'PREMIUM PROPERTIES';
          primaryBtnText = isRTL ? 'تواصل مع مستشار العقارات' : 'Contact Property Advisor';
        }

        const synthBlocks: PageBlock[] = [
          {
            id: `b_hero_${Date.now()}`,
            type: 'hero',
            title: 'AI Generated Hero',
            isVisible: true,
            orderIndex: 0,
            content: {
              title: cleanName,
              subtitle: cleanDesc,
              badge: domainBadge,
              coverUrl: heroCover,
              alignment: 'center'
            }
          },
          {
            id: `b_btn1_${Date.now()}`,
            type: 'button',
            title: 'Primary Action',
            isVisible: true,
            orderIndex: 1,
            content: {
              label: primaryBtnText,
              url: 'https://wa.me/?text=Hello!%20I%20would%20like%20more%20information.',
              variant: 'primary',
              icon: 'MessageCircle'
            }
          },
          {
            id: `b_info_${Date.now()}`,
            type: 'paragraph',
            title: 'About Highlight',
            isVisible: true,
            orderIndex: 2,
            content: {
              text: aboutText
            }
          },
          {
            id: `b_hours_${Date.now()}`,
            type: 'business_hours',
            title: 'Working Hours',
            isVisible: true,
            orderIndex: 3,
            content: {
              title: isRTL ? 'أوقات العمل واستقبال الطلبات' : 'Operating & Dispatch Hours',
              days: [
                { day: isRTL ? 'السبت - الخميس' : 'Saturday - Thursday', open: '08:00 AM', close: '09:00 PM', isClosed: false },
                { day: isRTL ? 'الجمعة' : 'Friday', open: '01:00 PM', close: '09:00 PM', isClosed: false }
              ],
              note: isRTL ? 'خدمة الدعم الفني وتتبع الشحنات متاحة 24/7' : 'Support desk and emergency dispatch active 24/7.'
            }
          },
          {
            id: `b_social_${Date.now()}`,
            type: 'social_links',
            title: 'Social Channels',
            isVisible: true,
            orderIndex: 4,
            content: {
              links: [
                { platform: 'whatsapp', url: 'https://wa.me' },
                { platform: 'instagram', url: 'https://instagram.com' },
                { platform: 'linkedin', url: 'https://linkedin.com' }
              ],
              style: 'icons'
            }
          }
        ];

        generatedData = {
          title: cleanName,
          subtitle: cleanDesc,
          themeConfig: baseTheme,
          blocks: synthBlocks
        };
      }

      // 3. Persist into pageService
      const asciiSlug = businessName.toLowerCase().replace(/[^a-z0-9]/g, '').trim();
      const newSlug = `${asciiSlug || 'site'}-${Math.random().toString(36).substring(2, 6)}`;
      const pageId = await pageService.createPage({
        orgId: currentOrg?.id || 'org_esaia_main',
        clientId: null,
        qrCodeId: null,
        title: generatedData.title,
        slug: newSlug,
        pageType,
        status: 'draft',
        themeConfig: generatedData.themeConfig,
        seo: {
          metaTitle: `${generatedData.title} | Official Portal`,
          metaDescription: generatedData.subtitle
        },
        blocks: generatedData.blocks
      });

      // 4. Close modal and navigate user straight to builder!
      onClose();
      onPageCreated(pageId);
    } catch (err: any) {
      console.error('Failed to generate page:', err);
      setError(err.message || 'Failed to generate page with AI.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isRTL ? 'أنشئ صفحتك باستخدام الذكاء الاصطناعي' : 'Create your page using AI'}
              </h3>
              <p className="text-xs text-slate-400">
                {isRTL ? 'صفحة متكاملة مخصصة لنشاطك التجاري في ثوانٍ' : 'Instant customized layout & blocks tailored to your business'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleGenerate} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
              {error}
            </div>
          )}

          {/* Business Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isRTL ? 'اسم النشاط التجاري أو المشروع *' : 'Business or Project Name *'}
            </label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder={isRTL ? 'مثال: عيادة النخبة للأسنان، ستوديو تصميم فني' : 'e.g. Acme Tech Studio, The Begendorf Law'}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Grid: Industry & Page Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isRTL ? 'مجال النشاط' : 'Industry / Category'}
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              >
                {CATEGORY_DEFINITIONS.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {isRTL ? cat.nameAr : cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {isRTL ? 'نوع الصفحة' : 'Page Type'}
              </label>
              <select
                value={pageType}
                onChange={(e) => setPageType(e.target.value as PageType)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="landing">{isRTL ? 'صفحة هبوط (Landing Page)' : 'Landing Page'}</option>
                <option value="link_in_bio">{isRTL ? 'روابط سيرة ذاتية (Link in Bio)' : 'Link in Bio'}</option>
                <option value="menu">{isRTL ? 'قائمة طعام (Digital Menu)' : 'Digital Menu'}</option>
                <option value="business_card">{isRTL ? 'بطاقة عمل رقمية (vCard)' : 'Digital Card'}</option>
              </select>
            </div>
          </div>

          {/* Description & Target Services */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isRTL ? 'ما الذي تقدمه؟ (أخبر الذكاء الاصطناعي بالتفاصيل)' : 'What do you offer? (Key services or offer)'}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                isRTL
                  ? 'مثال: نقدم استشارات قانونية للشركات وحماية الملكية الفكرية، استشارة أولى مجانية وحجز فوري عبر واتساب...'
                  : 'e.g. We provide corporate legal advisory, free 30-min case audit, instant WhatsApp hotline...'
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {/* Theme Vibe */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              {isRTL ? 'المظهر اللوني (Theme Vibe)' : 'Theme Vibe'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'dark', label: isRTL ? 'داكن فخم' : 'Dark Luxury', bg: '#090a0f', border: '#252936' },
                { id: 'light', label: isRTL ? 'أبيض ناصع' : 'Clean Light', bg: '#ffffff', border: '#e2e8f0' },
                { id: 'beige', label: isRTL ? 'بيج دافئ' : 'Warm Beige', bg: '#fbf8f2', border: '#e7decb' }
              ].map((v) => (
                <button
                  type="button"
                  key={v.id}
                  onClick={() => setThemeVibe(v.id as any)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    themeVibe === v.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300 shadow-xs'
                      : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border border-black/30" style={{ backgroundColor: v.bg }} />
                  <span>{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isRTL ? 'جاري بناء الصفحة بالذكاء الاصطناعي...' : 'Generating page with AI...'}</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>{isRTL ? 'توليد الصفحة والبدء بالتخصيص ->' : 'Generate Page & Open Builder ->'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
