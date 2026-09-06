/**
 * ESAIA - Enterprise Ready-Made Template Library (Inspired by Taplink)
 * Fully customizable Landing Pages & Link-in-Bio templates across 22 industry categories.
 * Each template includes realistic block orchestration, responsive themes, and instant customization.
 */

import { Page, PageBlock, PageThemeConfig, PageType, SeoConfig } from '../types/page';

export type TemplateCategory =
  | 'auto'
  | 'kids'
  | 'design'
  | 'home_repair'
  | 'food'
  | 'animals'
  | 'health'
  | 'beauty'
  | 'personal'
  | 'marketing'
  | 'fashion'
  | 'music'
  | 'real_estate'
  | 'education'
  | 'travel'
  | 'entertainment'
  | 'network_marketing'
  | 'events'
  | 'sports'
  | 'tech'
  | 'finance'
  | 'legal';

export interface TemplateItem {
  id: string;
  title: string;
  subtitle: string;
  category: TemplateCategory;
  categoryName: string;
  categoryNameAr: string;
  type: PageType; // 'landing' | 'link_in_bio' | 'menu' | 'business_card'
  isFeatured?: boolean;
  badge?: string;
  badgeAr?: string;
  author?: string;
  preview: {
    themePreset: 'dark' | 'light' | 'beige' | 'custom';
    headerBg: string;
    cardBg: string;
    accentColor: string;
    textColor: string;
    avatarUrl?: string;
    heroCoverUrl?: string;
    heroTitle: string;
    heroSubtitle?: string;
    buttons: Array<{
      label: string;
      labelAr: string;
      style?: 'filled' | 'outline' | 'glass';
      color?: string;
    }>;
    tags?: string[];
  };
  themeConfig: PageThemeConfig;
  seo: SeoConfig;
  blocks: PageBlock[];
}

export const CATEGORY_DEFINITIONS: Array<{
  id: TemplateCategory;
  name: string;
  nameAr: string;
  iconName: string;
}> = [
  { id: 'auto', name: 'Auto', nameAr: 'السيارات والمحركات', iconName: 'Car' },
  { id: 'kids', name: 'Kids', nameAr: 'الأطفال والتعليم', iconName: 'Baby' },
  { id: 'design', name: 'Design', nameAr: 'التصميم والديكور', iconName: 'Palette' },
  { id: 'home_repair', name: 'Home & repair', nameAr: 'المنازل والصيانة', iconName: 'Home' },
  { id: 'food', name: 'Food', nameAr: 'المطاعم والمأكولات', iconName: 'Utensils' },
  { id: 'animals', name: 'Animals', nameAr: 'الحيوانات والبيطرة', iconName: 'PawPrint' },
  { id: 'health', name: 'Health', nameAr: 'الصحة والعيادات', iconName: 'HeartPulse' },
  { id: 'beauty', name: 'Beauty', nameAr: 'الجمال والعناية', iconName: 'Sparkles' },
  { id: 'personal', name: 'Personal page', nameAr: 'الصفحة الشخصية', iconName: 'User' },
  { id: 'marketing', name: 'Marketing', nameAr: 'التسويق والإعلانات', iconName: 'BarChart3' },
  { id: 'fashion', name: 'Fashion & style', nameAr: 'الأزياء والموضة', iconName: 'Shirt' },
  { id: 'music', name: 'Music', nameAr: 'الموسيقى والصوتيات', iconName: 'Music' },
  { id: 'real_estate', name: 'Real estate', nameAr: 'العقارات والتطوير', iconName: 'Building2' },
  { id: 'education', name: 'Education', nameAr: 'التعليم والكورسات', iconName: 'GraduationCap' },
  { id: 'travel', name: 'Travel & leisure', nameAr: 'السياحة والسفر', iconName: 'Plane' },
  { id: 'entertainment', name: 'Entertainment', nameAr: 'الترفيه والفعاليات', iconName: 'Gamepad2' },
  { id: 'network_marketing', name: 'Network marketing', nameAr: 'التسويق الشبكي', iconName: 'Network' },
  { id: 'events', name: 'Events', nameAr: 'المؤتمرات والمناسبات', iconName: 'Calendar' },
  { id: 'sports', name: 'Sports', nameAr: 'الرياضة واللياقة', iconName: 'Dumbbell' },
  { id: 'tech', name: 'Tech & devices', nameAr: 'التكنولوجيا والأجهزة', iconName: 'Laptop' },
  { id: 'finance', name: 'Finance', nameAr: 'المالية والاستثمار', iconName: 'Banknote' },
  { id: 'legal', name: 'Legal services', nameAr: 'الخدمات القانونية', iconName: 'Scale' }
];

export const READY_MADE_TEMPLATES: TemplateItem[] = [
  // ==========================================
  // 1. LANDING PAGE: LAW FIRM (The Begendorf)
  // ==========================================
  {
    id: 'tpl_law_firm',
    title: 'The Begendorf - Law Firm',
    subtitle: 'Professional legal services in New York with 25+ years experience',
    category: 'legal',
    categoryName: 'Legal services',
    categoryNameAr: 'الخدمات القانونية',
    type: 'landing',
    isFeatured: true,
    badge: 'Top Choice',
    badgeAr: 'الأكثر طلباً',
    preview: {
      themePreset: 'dark',
      headerBg: '#181613',
      cardBg: '#211e19',
      accentColor: '#c5a059',
      textColor: '#f5f0eb',
      heroCoverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'THE BEGENDORF',
      heroSubtitle: 'Professional legal services in New York',
      buttons: [
        { label: 'Free consultation', labelAr: 'استشارة مجانية', style: 'filled', color: '#c5a059' },
        { label: 'Practice areas', labelAr: 'مجالات الاختصاص', style: 'outline' }
      ],
      tags: ['25 years experience', 'Over 1,000 cases', 'Corporate Law']
    },
    themeConfig: {
      preset: 'dark',
      palette: {
        background: '#151310',
        cardBackground: '#1e1b16',
        textPrimary: '#fbf8f5',
        textSecondary: '#a89f91',
        primaryAction: '#c5a059',
        primaryActionText: '#151310',
        accent: '#dfb76c',
        border: '#2e2a22'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Playfair Display',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'lg',
      shadowLevel: 'md',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'The Begendorf | Premium Legal Services & Corporate Law',
      metaDescription: 'Trusted legal advisory for corporate transactions, asset protection, and arbitration in New York.',
      ogImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_law_hero',
        type: 'hero',
        title: 'Law Firm Banner',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'THE BEGENDORF',
          subtitle: 'Institutional legal counsel & trial advocacy in New York.',
          badge: 'LAW FIRM & COUNSEL',
          coverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_law_btn_consult',
        type: 'button',
        title: 'Consultation CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Book a Free Confidential Consultation',
          url: 'https://wa.me/?text=Hello!%20I%20would%20like%20to%20schedule%20a%20legal%20consultation.',
          variant: 'primary'
        }
      },
      {
        id: 'b_law_stats',
        type: 'paragraph',
        title: 'Trust Metrics',
        isVisible: true,
        orderIndex: 2,
        content: {
          text: '⚖️ 25 Years of Trial Experience  |  🏆 1,000+ Cases Won  |  🏛️ 99.4% Arbitration Settlement Rate'
        }
      },
      {
        id: 'b_law_heading_areas',
        type: 'heading',
        title: 'Practice Areas Heading',
        isVisible: true,
        orderIndex: 3,
        content: {
          text: 'Core Legal Practice Areas',
          level: 'h2'
        }
      },
      {
        id: 'b_law_vcard',
        type: 'vcard_header',
        title: 'Senior Partner Contact',
        isVisible: true,
        orderIndex: 4,
        content: {
          fullName: 'Alexander Begendorf, Esq.',
          jobTitle: 'Senior Managing Partner',
          company: 'The Begendorf Law Group',
          avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
          phone: '+1 (212) 555-0192',
          email: 'alexander@begendorflaw.com',
          website: 'https://esaia.app',
          whatsapp: '+12125550192',
          address: '45 Rockefeller Plaza, Suite 2100, New York, NY 10111',
          bio: 'Admitted to the New York State Bar & US Federal District Court. Specializing in corporate dispute resolution.'
        }
      },
      {
        id: 'b_law_whatsapp',
        type: 'whatsapp_button',
        title: 'WhatsApp Hot-line',
        isVisible: true,
        orderIndex: 5,
        content: {
          phoneNumber: '+12125550192',
          buttonText: 'Direct WhatsApp Legal Hot-line',
          prefilledMessage: 'Hi Alexander, I need urgent legal guidance regarding a corporate contract.'
        }
      }
    ]
  },

  // ==========================================
  // 2. LANDING PAGE: TATTOO STUDIO (Tattoom)
  // ==========================================
  {
    id: 'tpl_tattoo_studio',
    title: 'Tattoom - Modern Studio',
    subtitle: 'Idea. Style. Experience. Quality. Custom 3D preview & sterile artistry',
    category: 'design',
    categoryName: 'Design',
    categoryNameAr: 'التصميم والديكور',
    type: 'landing',
    isFeatured: true,
    badge: 'Creative Art',
    badgeAr: 'فنون إبداعية',
    preview: {
      themePreset: 'dark',
      headerBg: '#0e0e11',
      cardBg: '#18181f',
      accentColor: '#eab308',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'Tattoom',
      heroSubtitle: 'A modern tattoo studio in NYC',
      buttons: [
        { label: 'Book a consultation', labelAr: 'احجز استشارة فنية', style: 'filled', color: '#eab308' },
        { label: 'Explore flash designs', labelAr: 'استعرض التصاميم', style: 'outline' }
      ],
      tags: ['Idea. Style. Experience.', 'Free custom design', 'Sterile Studio']
    },
    themeConfig: {
      preset: 'dark',
      palette: {
        background: '#09090b',
        cardBackground: '#141417',
        textPrimary: '#ffffff',
        textSecondary: '#a1a1aa',
        primaryAction: '#eab308',
        primaryActionText: '#09090b',
        accent: '#facc15',
        border: '#27272a'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Plus Jakarta Sans',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'md',
      shadowLevel: 'md',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Tattoom | Modern Tattoo Studio NYC & Custom Flash Ink',
      metaDescription: 'Custom fine-line, realistic black & grey, and Japanese master tattoo artists in Brooklyn, NYC.',
      ogImageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_tattoo_hero',
        type: 'hero',
        title: 'Studio Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Tattoom NYC',
          subtitle: 'Idea. Style. Experience. Quality.',
          badge: 'FINE ART & BODY INK',
          coverUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1000&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_tattoo_book_btn',
        type: 'button',
        title: 'Book CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Book a Design Consultation',
          url: 'https://wa.me/?text=Hi%20Tattoom!%20I%20want%20to%20consult%20on%20a%20new%20tattoo.',
          variant: 'primary'
        }
      },
      {
        id: 'b_tattoo_promo',
        type: 'paragraph',
        title: 'Free Custom Design Promo',
        isVisible: true,
        orderIndex: 2,
        content: {
          text: '✨ Free custom design based on your ideas. A 3D preview using your own body photos is included before any needle touches your skin.'
        }
      },
      {
        id: 'b_tattoo_hours',
        type: 'business_hours',
        title: 'Studio Hours',
        isVisible: true,
        orderIndex: 3,
        content: {
          title: 'Studio Working Hours',
          days: [
            { day: 'Monday - Friday', open: '12:00 PM', close: '10:00 PM' },
            { day: 'Saturday - Sunday', open: '01:00 PM', close: '11:00 PM' }
          ],
          note: 'Walk-ins welcomed upon availability; appointments recommended.'
        }
      }
    ]
  },

  // ==========================================
  // 3. LANDING PAGE: INTERIOR DESIGNER (Jane Morgan)
  // ==========================================
  {
    id: 'tpl_interior_designer',
    title: 'Jane Morgan - Interior Designer',
    subtitle: 'Stylish, harmonious interiors that reflect the people who live in them',
    category: 'home_repair',
    categoryName: 'Home & repair',
    categoryNameAr: 'المنازل والصيانة',
    type: 'landing',
    isFeatured: true,
    badge: 'Elegance',
    badgeAr: 'أناقة وتصميم',
    preview: {
      themePreset: 'custom',
      headerBg: '#1b2c23',
      cardBg: '#253d30',
      accentColor: '#9ec4aa',
      textColor: '#eaf4ee',
      heroCoverUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      heroTitle: 'Jane Morgan',
      heroSubtitle: 'Interior Designer • Scandinavian & Japandi Spaces',
      buttons: [
        { label: 'See all projects', labelAr: 'شاهد كافة المشاريع', style: 'filled', color: '#3d6951' },
        { label: 'Book spatial audit', labelAr: 'احجز معاينة المكان', style: 'outline' }
      ],
      tags: ['Living room design', 'Japandi minimalism', 'Turnkey fit-out']
    },
    themeConfig: {
      preset: 'custom',
      palette: {
        background: '#14211a',
        cardBackground: '#1e3026',
        textPrimary: '#f0f7f2',
        textSecondary: '#a5c0b0',
        primaryAction: '#3b6a52',
        primaryActionText: '#ffffff',
        accent: '#93c2a8',
        border: '#2a4436'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Playfair Display',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'lg',
      shadowLevel: 'md',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Jane Morgan | High-End Interior Architecture & Turnkey Design',
      metaDescription: 'Creating harmonious living rooms, luxury penthouses, and bespoke boutique spaces.',
      ogImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_jane_hero',
        type: 'hero',
        title: 'Designer Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Jane Morgan',
          subtitle: 'I create stylish, harmonious interiors that reflect the soul of those who live in them.',
          badge: 'INTERIOR ARCHITECT',
          coverUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80',
          avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_jane_projects_btn',
        type: 'button',
        title: 'Portfolio CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Explore Complete Design Portfolio',
          url: 'https://instagram.com',
          variant: 'primary'
        }
      },
      {
        id: 'b_jane_whatsapp',
        type: 'whatsapp_button',
        title: 'WhatsApp Consultation',
        isVisible: true,
        orderIndex: 2,
        content: {
          phoneNumber: '+971501234567',
          buttonText: 'Discuss Your Space on WhatsApp',
          prefilledMessage: 'Hi Jane, I have an apartment renovation project and would love to collaborate!'
        }
      }
    ]
  },

  // ==========================================
  // 4. LANDING PAGE: GOURMET RESTAURANT (Belcanto)
  // ==========================================
  {
    id: 'tpl_belcanto_restaurant',
    title: 'Belcanto - Gourmet Restaurant',
    subtitle: 'Signature cuisine, fine vintage cellar, and live music atmosphere',
    category: 'food',
    categoryName: 'Food',
    categoryNameAr: 'المطاعم والمأكولات',
    type: 'landing',
    isFeatured: true,
    badge: 'Michelin Star Vibe',
    badgeAr: 'أجواء راقية',
    preview: {
      themePreset: 'dark',
      headerBg: '#121214',
      cardBg: '#1c1c21',
      accentColor: '#d4af37',
      textColor: '#f8f8fa',
      heroCoverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'BELCANTO',
      heroSubtitle: 'Gourmet restaurant • Signature culinary art',
      buttons: [
        { label: 'Reserve a table', labelAr: 'احجز طاولة عشاء', style: 'filled', color: '#d4af37' },
        { label: 'View seasonal menu', labelAr: 'تصفح قائمة الطعام', style: 'outline' }
      ],
      tags: ['High-level service', 'Signature Cuisine', 'Live music nightly']
    },
    themeConfig: {
      preset: 'dark',
      palette: {
        background: '#0d0d10',
        cardBackground: '#17171c',
        textPrimary: '#fbfbfe',
        textSecondary: '#a1a1aa',
        primaryAction: '#d4af37',
        primaryActionText: '#0d0d10',
        accent: '#e6c86e',
        border: '#26262e'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Playfair Display',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'lg',
      shadowLevel: 'md',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Belcanto Gourmet Restaurant | High-Level Culinary Craft & Fine Dining',
      metaDescription: 'Savor Michelin-inspired dishes, aged wines, and live jazz performances in an intimate ambiance.',
      ogImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_belcanto_hero',
        type: 'hero',
        title: 'Restaurant Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'BELCANTO RESTAURANT',
          subtitle: 'High-level hospitality • Signature Cuisine • Live Music',
          badge: 'FINE DINING EXPERIENCE',
          coverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_belcanto_reserve_btn',
        type: 'button',
        title: 'Reservation CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Reserve an Evening Table',
          url: 'https://wa.me/?text=Hi%20Belcanto,%20I%20would%20like%20to%20reserve%20a%20table%20for%202.',
          variant: 'primary'
        }
      },
      {
        id: 'b_belcanto_cat_tasting',
        type: 'menu_category',
        title: 'Tasting Category',
        isVisible: true,
        orderIndex: 2,
        content: {
          name: "Chef's Signature Tasting Selection",
          description: 'Five-course journey curated by Chef Marco'
        }
      },
      {
        id: 'b_belcanto_item_wagyu',
        type: 'menu_item',
        title: 'Wagyu Beef Item',
        isVisible: true,
        orderIndex: 3,
        content: {
          name: 'Truffle Glazed A5 Wagyu Tenderloin',
          description: 'Pomme purée, wild winter morels, aged balsamic reduction.',
          price: 95,
          currency: '$',
          category: "Chef's Signature Tasting Selection",
          imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
          dietaryBadges: ['chef_special']
        }
      }
    ]
  },

  // ==========================================
  // 5. LANDING PAGE: EDUCATION & COURSE (Social Media Marketer)
  // ==========================================
  {
    id: 'tpl_smm_course',
    title: 'Social Media Marketer Course',
    subtitle: 'Original course by Megan Johns. Master high-demand skills in 30 days',
    category: 'education',
    categoryName: 'Education',
    categoryNameAr: 'التعليم والكورسات',
    type: 'landing',
    isFeatured: true,
    badge: 'Hot Course',
    badgeAr: 'كورس متميز',
    preview: {
      themePreset: 'dark',
      headerBg: '#111114',
      cardBg: '#1f1f26',
      accentColor: '#facc15',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'Social Media Marketer',
      heroSubtitle: 'Master an in-demand profession online in 1 month',
      buttons: [
        { label: 'Enroll in course', labelAr: 'سجل في الدورة الآن', style: 'filled', color: '#facc15' },
        { label: 'View syllabus', labelAr: 'تحميل المنهج', style: 'outline' }
      ],
      tags: ['Who is this course for?', 'Newbies & Agency Pros', 'Job Guarantee']
    },
    themeConfig: {
      preset: 'dark',
      palette: {
        background: '#09090b',
        cardBackground: '#131317',
        textPrimary: '#ffffff',
        textSecondary: '#9ca3af',
        primaryAction: '#facc15',
        primaryActionText: '#09090b',
        accent: '#eab308',
        border: '#27272a'
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
    },
    seo: {
      metaTitle: 'Social Media Marketer Online Academy | Career Launch In 30 Days',
      metaDescription: 'Hands-on practical training covering TikTok algorithms, Meta ads, analytics, and pitching high-ticket clients.',
      ogImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_smm_hero',
        type: 'hero',
        title: 'Course Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Social Media Marketer Masterclass',
          subtitle: 'Original certified course by Megan Johns. Master a lucrative career in 30 days.',
          badge: '2026 ENROLLMENT OPEN',
          coverUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_smm_enroll_btn',
        type: 'button',
        title: 'Enroll CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Claim Your 50% Early Bird Seat ($249)',
          url: 'https://wa.me/?text=Hi%20Megan!%20I%20want%20to%20enroll%20in%20the%20SMM%20Course.',
          variant: 'primary'
        }
      },
      {
        id: 'b_smm_audience',
        type: 'paragraph',
        title: 'Who is this course for?',
        isVisible: true,
        orderIndex: 2,
        content: {
          text: '🚀 Designed for beginners switching careers, freelancers seeking $3k/mo retainers, and business owners scaling their organic acquisition.'
        }
      }
    ]
  },

  // ==========================================
  // 6. LANDING PAGE: REAL ESTATE (Prime Vista)
  // ==========================================
  {
    id: 'tpl_real_estate_luxury',
    title: 'Prime Vista - Waterfront Estates',
    subtitle: 'Exclusive penthouses, private islands, and luxury developments',
    category: 'real_estate',
    categoryName: 'Real estate',
    categoryNameAr: 'العقارات والتطوير',
    type: 'landing',
    isFeatured: true,
    badge: 'Luxury Property',
    badgeAr: 'عقارات فاخرة',
    preview: {
      themePreset: 'dark',
      headerBg: '#0f172a',
      cardBg: '#1e293b',
      accentColor: '#38bdf8',
      textColor: '#f8fafc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'Prime Vista Estates',
      heroSubtitle: 'Waterfront villas & skyline penthouses',
      buttons: [
        { label: 'Schedule VIP tour', labelAr: 'احجز جولة خاصة', style: 'filled', color: '#0284c7' },
        { label: 'Download brochure', labelAr: 'تحميل الكتيب الرقمي', style: 'outline' }
      ],
      tags: ['Off-plan ROI 12%', 'Private Marina', 'Golden Visa Assistance']
    },
    themeConfig: {
      preset: 'dark',
      palette: {
        background: '#090d16',
        cardBackground: '#131b2c',
        textPrimary: '#f8fafc',
        textSecondary: '#94a3b8',
        primaryAction: '#0284c7',
        primaryActionText: '#ffffff',
        accent: '#38bdf8',
        border: '#1e293b'
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
    },
    seo: {
      metaTitle: 'Prime Vista | Ultra-Luxury Real Estate & Waterfront Developments',
      metaDescription: 'Browse Dubai & Miami off-market penthouses, beachfront estates, and private residences.',
      ogImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_re_hero',
        type: 'hero',
        title: 'Real Estate Banner',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Prime Vista Residences',
          subtitle: 'Architectural masterpieces overlooking the turquoise horizon.',
          badge: 'OFF-MARKET EXCLUSIVE',
          coverUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_re_tour_btn',
        type: 'button',
        title: 'VIP Tour CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Request Confidential Broker Consultation',
          url: 'https://wa.me/?text=Hi%20Prime%20Vista,%20I%20am%20interested%20in%20waterfront%20penthouses.',
          variant: 'primary'
        }
      }
    ]
  },

  // ==========================================
  // 7. LINK IN BIO: BOTANICAL HARMONY (Green / Nature)
  // ==========================================
  {
    id: 'tpl_bio_botanical',
    title: 'Botanical Harmony (Link in Bio)',
    subtitle: 'Organic aesthetic, herbal skincare, and minimalist nature links',
    category: 'beauty',
    categoryName: 'Beauty',
    categoryNameAr: 'الجمال والعناية',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Popular Bio',
    badgeAr: 'سيرة ذاتية شائعة',
    preview: {
      themePreset: 'light',
      headerBg: '#e8f0ec',
      cardBg: '#ffffff',
      accentColor: '#4d7c5f',
      textColor: '#1f2923',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      heroTitle: 'Your Brand Name',
      heroSubtitle: 'Add multiple links for your page',
      buttons: [
        { label: 'ABOUT ME', labelAr: 'نبذة عني', style: 'filled', color: '#689f7d' },
        { label: 'MY BLOG', labelAr: 'مدونتي', style: 'filled', color: '#689f7d' },
        { label: 'ONLINE STORE', labelAr: 'المتجر الإلكتروني', style: 'filled', color: '#689f7d' },
        { label: 'CONTACT ME', labelAr: 'تواصل معي', style: 'filled', color: '#558367' }
      ],
      tags: ['Clean Beauty', 'Herbal Care', 'Eco Friendly']
    },
    themeConfig: {
      preset: 'light',
      palette: {
        background: '#eff4f1',
        cardBackground: '#ffffff',
        textPrimary: '#1a2e22',
        textSecondary: '#5a7364',
        primaryAction: '#558569',
        primaryActionText: '#ffffff',
        accent: '#7da88f',
        border: '#dbe7e0'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Playfair Display',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'full',
      shadowLevel: 'sm',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Botanical Harmony | Natural Wellness & Eco Lifestyle Links',
      metaDescription: 'Shop organic plant-based serums, read wellness guides, and connect on social media.',
      ogImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_bio_botanical_hero',
        type: 'hero',
        title: 'Bio Profile Header',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Botanical Harmony',
          subtitle: 'Handcrafted slow beauty, eco wellness & mindful living.',
          avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_bio_botanical_btn1',
        type: 'button',
        title: 'About Me Link',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: '🌿 ABOUT ME - Our Philosophy & Story',
          url: 'https://esaia.app',
          variant: 'primary'
        }
      },
      {
        id: 'b_bio_botanical_btn2',
        type: 'button',
        title: 'Blog Link',
        isVisible: true,
        orderIndex: 2,
        content: {
          label: '📖 MY BLOG - Clean Beauty & Herbal Remedies',
          url: 'https://esaia.app',
          variant: 'primary'
        }
      },
      {
        id: 'b_bio_botanical_btn3',
        type: 'button',
        title: 'Store Link',
        isVisible: true,
        orderIndex: 3,
        content: {
          label: '🛍️ ONLINE STORE - Buy Fresh Botanical Oils',
          url: 'https://esaia.app',
          variant: 'primary'
        }
      },
      {
        id: 'b_bio_botanical_btn4',
        type: 'button',
        title: 'Contact Link',
        isVisible: true,
        orderIndex: 4,
        content: {
          label: '💬 CONTACT ME - Direct WhatsApp Care',
          url: 'https://wa.me/?text=Hello%20Botanical%20Harmony!',
          variant: 'primary'
        }
      },
      {
        id: 'b_bio_botanical_social',
        type: 'social_links',
        title: 'Social Hub',
        isVisible: true,
        orderIndex: 5,
        content: {
          links: [
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'tiktok', url: 'https://tiktok.com' },
            { platform: 'youtube', url: 'https://youtube.com' }
          ],
          style: 'icons'
        }
      }
    ]
  },

  // ==========================================
  // 8. LINK IN BIO: CYBER NEON NIGHT (Tech & Fitness)
  // ==========================================
  {
    id: 'tpl_bio_cyber_neon',
    title: 'Cyber Neon Night (Link in Bio)',
    subtitle: 'High contrast electric neon outline for creators, athletes, and gamers',
    category: 'sports',
    categoryName: 'Sports',
    categoryNameAr: 'الرياضة واللياقة',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Neon Cyber',
    badgeAr: 'إضاءة نيون',
    preview: {
      themePreset: 'dark',
      headerBg: '#050507',
      cardBg: '#0e0e14',
      accentColor: '#22c55e',
      textColor: '#ffffff',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      heroTitle: 'Your brand name',
      heroSubtitle: 'Add multiple links for your page',
      buttons: [
        { label: 'About me', labelAr: 'عن المدرب', style: 'outline', color: '#22c55e' },
        { label: 'My Blog', labelAr: 'خطط التمارين', style: 'outline', color: '#22c55e' },
        { label: 'Online Store', labelAr: 'المكملات الغذائية', style: 'outline', color: '#22c55e' },
        { label: 'Contact me', labelAr: 'تواصل مباشر', style: 'outline', color: '#22c55e' }
      ],
      tags: ['Neon Green', 'High Contrast', 'Fitness & Tech']
    },
    themeConfig: {
      preset: 'dark',
      palette: {
        background: '#040406',
        cardBackground: '#0c0c12',
        textPrimary: '#ffffff',
        textSecondary: '#9ca3af',
        primaryAction: '#22c55e',
        primaryActionText: '#040406',
        accent: '#4ade80',
        border: '#1f2937'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Plus Jakarta Sans',
        baseFontSize: 16
      },
      buttonStyle: 'outline',
      borderRadius: 'md',
      shadowLevel: 'none',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Nexus Cyber | Tech, Gaming & Biohacking Hub',
      metaDescription: 'Explore performance workout guides, streaming gear recommendations, and community links.',
      ogImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_bio_neon_hero',
        type: 'hero',
        title: 'Neon Header',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'NEXUS CYBER',
          subtitle: 'High performance strength coaching & digital creator.',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_bio_neon_btn1',
        type: 'button',
        title: 'Button 1',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: '⚡ 90-Day Shred Program (Custom Plan)',
          url: 'https://esaia.app',
          variant: 'outline'
        }
      },
      {
        id: 'b_bio_neon_btn2',
        type: 'button',
        title: 'Button 2',
        isVisible: true,
        orderIndex: 2,
        content: {
          label: '🎙️ The Biohacking Podcast on Spotify',
          url: 'https://spotify.com',
          variant: 'outline'
        }
      },
      {
        id: 'b_bio_neon_btn3',
        type: 'button',
        title: 'Button 3',
        isVisible: true,
        orderIndex: 3,
        content: {
          label: '💬 Direct VIP Training Chat on WhatsApp',
          url: 'https://wa.me/?text=Hi%20Coach!%20I%20am%20ready%20to%20start%20training.',
          variant: 'primary'
        }
      }
    ]
  },

  // ==========================================
  // 9. LINK IN BIO: PASTEL AURORA (Creator / Influencer)
  // ==========================================
  {
    id: 'tpl_bio_pastel_aura',
    title: 'Pastel Aurora (Link in Bio)',
    subtitle: 'Dreamy iridescent sunset gradient with frosted glass pill buttons',
    category: 'personal',
    categoryName: 'Personal page',
    categoryNameAr: 'الصفحة الشخصية',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Trending',
    badgeAr: 'تريند',
    preview: {
      themePreset: 'light',
      headerBg: 'linear-gradient(135deg, #fed7aa 0%, #fbcfe8 50%, #ddd6fe 100%)',
      cardBg: 'rgba(255, 255, 255, 0.7)',
      accentColor: '#ec4899',
      textColor: '#374151',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      heroTitle: 'YOUR BRAND NAME',
      heroSubtitle: 'Add multiple links for your page',
      buttons: [
        { label: 'ABOUT ME', labelAr: 'تعرف عليّ', style: 'glass' },
        { label: 'MY BLOG', labelAr: 'مفضلاتي', style: 'glass' },
        { label: 'ONLINE STORE', labelAr: 'تسوق إطلالتي', style: 'glass' },
        { label: 'CONTACT ME', labelAr: 'تواصل معي', style: 'glass' }
      ],
      tags: ['Pastel Gradient', 'Glassmorphism', 'Lifestyle Creator']
    },
    themeConfig: {
      preset: 'light',
      palette: {
        background: '#fcf8f7',
        cardBackground: '#ffffff',
        textPrimary: '#1f2937',
        textSecondary: '#6b7280',
        primaryAction: '#db2777',
        primaryActionText: '#ffffff',
        accent: '#f472b6',
        border: '#f3e8e8'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Plus Jakarta Sans',
        baseFontSize: 16
      },
      buttonStyle: 'soft',
      borderRadius: 'full',
      shadowLevel: 'md',
      backgroundStyle: 'gradient'
    },
    seo: {
      metaTitle: 'Aura Studio | Lifestyle, Fashion & Everyday Aesthetics',
      metaDescription: 'Daily outfit inspiration, beauty favorites, YouTube vlogs, and collaboration inquiries.',
      ogImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_bio_aura_hero',
        type: 'hero',
        title: 'Creator Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Aura Studio',
          subtitle: 'Content creator • Style curation • Mindful aesthetics',
          avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_bio_aura_btn1',
        type: 'button',
        title: 'Vlog Link',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: '✨ New YouTube Video: A Day in Paris',
          url: 'https://youtube.com',
          variant: 'primary'
        }
      },
      {
        id: 'b_bio_aura_btn2',
        type: 'button',
        title: 'Wardrobe Link',
        isVisible: true,
        orderIndex: 2,
        content: {
          label: '👗 Shop My Wardrobe & Favorite Looks',
          url: 'https://esaia.app',
          variant: 'secondary'
        }
      },
      {
        id: 'b_bio_aura_social',
        type: 'social_links',
        title: 'Socials',
        isVisible: true,
        orderIndex: 3,
        content: {
          links: [
            { platform: 'instagram', url: 'https://instagram.com' },
            { platform: 'tiktok', url: 'https://tiktok.com' },
            { platform: 'youtube', url: 'https://youtube.com' }
          ],
          style: 'icons'
        }
      }
    ]
  },

  // ==========================================
  // 10. LINK IN BIO: AUTUMN ESPRESSO (Coffee & Barista)
  // ==========================================
  {
    id: 'tpl_bio_autumn_coffee',
    title: 'Autumn Espresso (Link in Bio)',
    subtitle: 'Rich roasted espresso tones, warm amber mood, and coffee lover links',
    category: 'food',
    categoryName: 'Food',
    categoryNameAr: 'المطاعم والمأكولات',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Warm Vibe',
    badgeAr: 'أجواء دافئة',
    preview: {
      themePreset: 'beige',
      headerBg: '#2a1a14',
      cardBg: '#3d261e',
      accentColor: '#d97706',
      textColor: '#fef3c7',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      heroTitle: 'Your brand name',
      heroSubtitle: 'Add multiple links for your page',
      buttons: [
        { label: 'About me', labelAr: 'قصة المحمصة', style: 'filled', color: '#b45309' },
        { label: 'My Blog', labelAr: 'دليل تحضير القهوة', style: 'filled', color: '#b45309' },
        { label: 'Online Store', labelAr: 'اطلب البن الطازج', style: 'filled', color: '#b45309' },
        { label: 'Contact me', labelAr: 'موقع الكافيه', style: 'filled', color: '#92400e' }
      ],
      tags: ['Warm Amber', 'Single Origin', 'Specialty Coffee']
    },
    themeConfig: {
      preset: 'beige',
      palette: {
        background: '#23150f',
        cardBackground: '#301e16',
        textPrimary: '#fef3c7',
        textSecondary: '#d6c7b2',
        primaryAction: '#d97706',
        primaryActionText: '#23150f',
        accent: '#f59e0b',
        border: '#4a3024'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Playfair Display',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'lg',
      shadowLevel: 'md',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Artisan Roast | Specialty Coffee Cupping & Bean Subscriptions',
      metaDescription: 'Fresh micro-lot coffees sourced directly from Ethiopia and Colombia.',
      ogImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_bio_coffee_hero',
        type: 'hero',
        title: 'Coffee Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Artisan Roast Lab',
          subtitle: 'Specialty coffee roasting, barista workshops & brewing gear.',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_bio_coffee_btn1',
        type: 'button',
        title: 'Menu Link',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: '☕ View This Week Fresh Bean Harvest',
          url: 'https://esaia.app',
          variant: 'primary'
        }
      },
      {
        id: 'b_bio_coffee_btn2',
        type: 'button',
        title: 'Order Link',
        isVisible: true,
        orderIndex: 2,
        content: {
          label: '📦 Order 1KG Whole Beans for Home Delivery',
          url: 'https://wa.me/?text=Hi!%20I%20want%20to%20order%20the%20Ethiopia%20Yirgacheffe%20beans.',
          variant: 'secondary'
        }
      }
    ]
  },

  // ==========================================
  // 11. LINK IN BIO: CHERRY BLOSSOM (Beauty & Salon)
  // ==========================================
  {
    id: 'tpl_bio_cherry_blossom',
    title: 'Cherry Blossom (Link in Bio)',
    subtitle: 'Petal pink accents on sky blue backdrop for nail & hair artists',
    category: 'beauty',
    categoryName: 'Beauty',
    categoryNameAr: 'الجمال والعناية',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Chic',
    badgeAr: 'أنيق',
    preview: {
      themePreset: 'light',
      headerBg: '#e6f0fa',
      cardBg: '#ffffff',
      accentColor: '#ec4899',
      textColor: '#1e293b',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      heroTitle: 'Your brand name',
      heroSubtitle: 'Add multiple links for your page',
      buttons: [
        { label: 'ABOUT ME', labelAr: 'صالون التجميل', style: 'filled', color: '#f472b6' },
        { label: 'MY BLOG', labelAr: 'خدمات الأظافر والشعر', style: 'filled', color: '#f472b6' },
        { label: 'ONLINE STORE', labelAr: 'منتجات العناية', style: 'filled', color: '#f472b6' },
        { label: 'CONTACT ME', labelAr: 'احجزي موعدك', style: 'filled', color: '#ec4899' }
      ],
      tags: ['Pastel Pink', 'Salon & Spa', 'Booking Hub']
    },
    themeConfig: {
      preset: 'light',
      palette: {
        background: '#edf4fb',
        cardBackground: '#ffffff',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        primaryAction: '#ec4899',
        primaryActionText: '#ffffff',
        accent: '#f472b6',
        border: '#e2e8f0'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Plus Jakarta Sans',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'lg',
      shadowLevel: 'sm',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Blossom Nails & Lash Lounge | Luxury Beauty Appointments',
      metaDescription: 'Book gel extensions, Russian manicures, and keratin lash lifts with our master artists.',
      ogImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_bio_cherry_hero',
        type: 'hero',
        title: 'Beauty Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Blossom Lounge',
          subtitle: 'Luxury manicure, nail artistry & lash transformations.',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_bio_cherry_btn1',
        type: 'button',
        title: 'Appointment CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: '💅 Book Manicure or Pedicure Session',
          url: 'https://wa.me/?text=Hi%20Blossom!%20I%20would%20like%20to%20book%20a%20nail%20session.',
          variant: 'primary'
        }
      }
    ]
  },

  // ==========================================
  // 12. LINK IN BIO: MINIMALIST SAGE (Architecture)
  // ==========================================
  {
    id: 'tpl_bio_minimalist_sage',
    title: 'Minimalist Sage (Link in Bio)',
    subtitle: 'Understated olive & muted sand tones for architects and designers',
    category: 'design',
    categoryName: 'Design',
    categoryNameAr: 'التصميم والديكور',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Clean Line',
    badgeAr: 'خطوط هادئة',
    preview: {
      themePreset: 'beige',
      headerBg: '#f2eee8',
      cardBg: '#ffffff',
      accentColor: '#4f6053',
      textColor: '#2c352e',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      heroTitle: 'Your brand name',
      heroSubtitle: 'Add multiple links for your page',
      buttons: [
        { label: 'ABOUT ME', labelAr: 'الاستوديو المعماري', style: 'filled', color: '#5b6e60' },
        { label: 'MY BLOG', labelAr: 'المقالات والأبحاث', style: 'filled', color: '#5b6e60' },
        { label: 'ONLINE STORE', labelAr: 'تحميل الكتالوج', style: 'filled', color: '#5b6e60' },
        { label: 'CONTACT ME', labelAr: 'طلب دراسة مشروع', style: 'filled', color: '#4a5b4f' }
      ],
      tags: ['Muted Olive', 'Architectural Portfolio', 'Modernist']
    },
    themeConfig: {
      preset: 'beige',
      palette: {
        background: '#f4efe8',
        cardBackground: '#ffffff',
        textPrimary: '#28312a',
        textSecondary: '#6e7a70',
        primaryAction: '#526657',
        primaryActionText: '#ffffff',
        accent: '#738979',
        border: '#ded7cd'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Plus Jakarta Sans',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'lg',
      shadowLevel: 'none',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Kanso Architecture | Sustainable Living & Modular Spaces',
      metaDescription: 'Download project case studies, monographs, and schedule client discovery sessions.',
      ogImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_bio_sage_hero',
        type: 'hero',
        title: 'Studio Header',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Kanso Studio',
          subtitle: 'Sustainable residential architecture & contextual interiors.',
          avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_bio_sage_btn1',
        type: 'button',
        title: 'Projects Link',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: '📐 2026 Architecture Monograph (PDF Download)',
          url: 'https://esaia.app',
          variant: 'primary'
        }
      }
    ]
  },

  // ==========================================
  // 13. LANDING PAGE: HEALTH & CLINIC (SmileCraft)
  // ==========================================
  {
    id: 'tpl_health_dental',
    title: 'SmileCraft - Dental & Aesthetics',
    subtitle: 'Painless digital dentistry, Hollywood smiles, and pediatric care',
    category: 'health',
    categoryName: 'Health',
    categoryNameAr: 'الصحة والعيادات',
    type: 'landing',
    isFeatured: false,
    badge: 'Medical Pro',
    badgeAr: 'طبي معتمد',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdfa',
      cardBg: '#ffffff',
      accentColor: '#0d9488',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SmileCraft Dental',
      heroSubtitle: 'Advanced aesthetic dentistry & implants',
      buttons: [
        { label: 'Book appointment', labelAr: 'احجز موعد كشف', style: 'filled', color: '#0d9488' },
        { label: 'Our doctors', labelAr: 'طاقم الأطباء', style: 'outline' }
      ],
      tags: ['Painless Laser', 'Same-Day Crowns', 'Emergency Care']
    },
    themeConfig: {
      preset: 'light',
      palette: {
        background: '#f0fdfa',
        cardBackground: '#ffffff',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        primaryAction: '#0d9488',
        primaryActionText: '#ffffff',
        accent: '#14b8a6',
        border: '#ccfbf1'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Plus Jakarta Sans',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'lg',
      shadowLevel: 'sm',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'SmileCraft Dental Clinic | Modern Painless Dentistry',
      metaDescription: 'Book 3D dental scans, Invisalign clear aligners, and dental veneers with top specialists.',
      ogImageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_dental_hero',
        type: 'hero',
        title: 'Clinic Banner',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'SmileCraft Dental Center',
          subtitle: 'Next-generation painless dentistry and radiant smile transformations.',
          badge: 'CERTIFIED DENTAL HOSPITAL',
          coverUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_dental_book_btn',
        type: 'button',
        title: 'Booking CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Book Free Examination & 3D Scan',
          url: 'https://wa.me/?text=Hi%20SmileCraft,%20I%20want%20to%20book%20a%20dental%20appointment.',
          variant: 'primary'
        }
      }
    ]
  },

  // ==========================================
  // 14. LANDING PAGE: AUTO & CAR CARE (Apex Detailing)
  // ==========================================
  {
    id: 'tpl_auto_detailing',
    title: 'Apex Auto Detailing & PPF',
    subtitle: 'Ceramic coatings, paint protection film, and supercar restoration',
    category: 'auto',
    categoryName: 'Auto',
    categoryNameAr: 'السيارات والمحركات',
    type: 'landing',
    isFeatured: false,
    badge: 'Precision',
    badgeAr: 'دقة واحتراف',
    preview: {
      themePreset: 'dark',
      headerBg: '#0b0c10',
      cardBg: '#1f2833',
      accentColor: '#e11d48',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'Apex Auto Detailing',
      heroSubtitle: 'Ceramic pro • PPF • Interior perfection',
      buttons: [
        { label: 'Get a quote', labelAr: 'اطلب عرض سعر', style: 'filled', color: '#e11d48' },
        { label: 'View packages', labelAr: 'باقات الحماية', style: 'outline' }
      ],
      tags: ['Lifetime PPF Warranty', 'Dust-Free Booth', 'Pick-up Service']
    },
    themeConfig: {
      preset: 'dark',
      palette: {
        background: '#090a0d',
        cardBackground: '#141720',
        textPrimary: '#ffffff',
        textSecondary: '#94a3b8',
        primaryAction: '#e11d48',
        primaryActionText: '#ffffff',
        accent: '#f43f5e',
        border: '#1e2538'
      },
      typography: {
        fontFamily: 'Plus Jakarta Sans',
        headingFont: 'Plus Jakarta Sans',
        baseFontSize: 16
      },
      buttonStyle: 'filled',
      borderRadius: 'md',
      shadowLevel: 'md',
      backgroundStyle: 'solid'
    },
    seo: {
      metaTitle: 'Apex Auto Care | Supercar Ceramic Coating & Paint Protection',
      metaDescription: 'Certified XPEL PPF installers, leather restoration, and precision machine polishing.',
      ogImageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      {
        id: 'b_auto_hero',
        type: 'hero',
        title: 'Auto Detailing Hero',
        isVisible: true,
        orderIndex: 0,
        content: {
          title: 'Apex Detailing Studio',
          subtitle: 'Certified Paint Protection Film (PPF) & 9H Ceramic Coatings.',
          badge: 'SUPERCAR CARE',
          coverUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1000&auto=format&fit=crop&q=80',
          alignment: 'center'
        }
      },
      {
        id: 'b_auto_quote_btn',
        type: 'button',
        title: 'Quote CTA',
        isVisible: true,
        orderIndex: 1,
        content: {
          label: 'Request WhatsApp PPF Price Estimate',
          url: 'https://wa.me/?text=Hi%20Apex!%20I%20have%20a%20vehicle%20and%20need%20a%20PPF%20quote.',
          variant: 'primary'
        }
      }
    ]
  }
];
