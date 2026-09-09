import { TemplateItem } from '../templatesData';
import {
  createHeroBlock,
  createButtonBlock,
  createParagraphBlock,
  createHeadingBlock,
  createVCardBlock,
  createWhatsAppBlock,
  createThemeConfig
} from './templateHelper';

// =========================================================================
// 13. REAL ESTATE (العقارات) - 5 Distinct Templates
// =========================================================================
export const realEstateTemplates: TemplateItem[] = [
  // 13.1 Elysian Prime Luxury Penthouses & Waterfront Villas (Deep Rich Obsidian & Warm Sand Gold)
  {
    id: 'tpl_re_elysian_villas',
    title: 'Elysian Prime Waterfront Real Estate',
    subtitle: 'Ultra-luxury penthouses, private island villas, and off-market architectural estates',
    category: 'real_estate',
    categoryName: 'Real estate',
    categoryNameAr: 'العقارات',
    type: 'landing',
    isFeatured: true,
    badge: 'Ultra Luxury',
    badgeAr: 'عقارات فائقة الفخامة',
    preview: {
      themePreset: 'dark',
      headerBg: '#0b0f19',
      cardBg: '#131b2e',
      accentColor: '#c5a059',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ELYSIAN PRIME',
      heroSubtitle: 'Curating the world’s most prestigious residential sanctuaries',
      buttons: [
        { label: 'View Private Portfolio', labelAr: 'تصفح العقارات الحصرية', style: 'filled', color: '#c5a059' },
        { label: 'Schedule Confidential Tour', labelAr: 'حجز جولة خاصة سرية', style: 'outline' }
      ],
      tags: ['Waterfront Estates', 'Off-Market Access', 'Helipad & Yacht Slip']
    },
    themeConfig: createThemeConfig('dark', '#080b12', '#0f1524', '#c5a059', '#f8fafc', '#cbd5e1', '#dfb76c', '#1e293b', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Elysian Prime | Luxury Waterfront Estates & Penthouses',
      metaDescription: 'Exclusive off-market high-value residential properties in Dubai, London, and Miami.',
      ogImageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_re1_hero', 'ELYSIAN PRIME RESIDENCES', 'Bespoke architectural sanctuaries for discerning global investors.', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80', undefined, 'PRESTIGE REAL ESTATE'),
      createButtonBlock('b_re1_btn', 'Request Private Viewing & Confidential Dossier', 'https://wa.me/?text=Hello%20Elysian%20Prime%2C%20I%20am%20inquire%20about%20exclusive%20villas', 'primary'),
      createParagraphBlock('b_re1_stats', '🏛️ $450M+ Sold in 2025  |  🔒 Guaranteed NDAs  |  🛥️ Deepwater Marina Access')
    ]
  },

  // 13.2 UrbanNest Modern City Rentals & First-Time Buyers (Fresh Sky Blue & Crisp White)
  {
    id: 'tpl_re_urbannest_rentals',
    title: 'UrbanNest City Apartments & Rentals',
    subtitle: 'Verified studio apartments, lofts, and pet-friendly rentals with 3D virtual walkthroughs',
    category: 'real_estate',
    categoryName: 'Real estate',
    categoryNameAr: 'العقارات',
    type: 'landing',
    isFeatured: false,
    badge: 'Verified Rentals',
    badgeAr: 'شقق للإيجار والتملك',
    preview: {
      themePreset: 'light',
      headerBg: '#eff6ff',
      cardBg: '#ffffff',
      accentColor: '#0284c7',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'URBANNEST HOMES',
      heroSubtitle: 'Find your dream urban home with zero broker runarounds',
      buttons: [
        { label: 'Browse Verified Listings', labelAr: 'تصفح الشقق الموثقة', style: 'filled', color: '#0284c7' },
        { label: '3D Virtual Walkthrough', labelAr: 'جولة افتراضية ثلاثية الأبعاد', style: 'outline' }
      ],
      tags: ['No Broker Fees', 'Instant Online Deposit', 'Pet-Friendly Filter']
    },
    themeConfig: createThemeConfig('light', '#f8fafc', '#ffffff', '#0284c7', '#0f172a', '#64748b', '#0369a1', '#e2e8f0', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'UrbanNest | Verified City Apartments & Long-Term Rentals',
      metaDescription: 'Find curated modern apartments and lofts with transparent pricing and verified landlords.',
      ogImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_re2_hero', 'URBANNEST CITY LIVING', 'Discover modern spaces bathed in light with verified landlords and zero stress.', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&auto=format&fit=crop&q=80', undefined, 'URBAN RENTALS'),
      createButtonBlock('b_re2_btn', 'Explore Available Downtown Apartments Today', 'https://esaia.app', 'primary')
    ]
  },

  // 13.3 Julian Sterling Top 1% Luxury Real Estate Broker (Executive Navy & Gold Seal)
  {
    id: 'tpl_re_broker_sterling',
    title: 'Julian Sterling - Premier Real Estate Broker',
    subtitle: 'Beverly Hills & Bel Air residential specialist delivering record-breaking sale prices',
    category: 'real_estate',
    categoryName: 'Real estate',
    categoryNameAr: 'العقارات',
    type: 'business_card',
    isFeatured: true,
    badge: 'Top 1% Broker',
    badgeAr: 'وسيط عقاري أول',
    preview: {
      themePreset: 'dark',
      headerBg: '#091221',
      cardBg: '#122038',
      accentColor: '#d4af37',
      textColor: '#f8fafc',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'JULIAN STERLING',
      heroSubtitle: 'Representing prestigious estates with unmatched discretion',
      buttons: [
        { label: 'Request Property Valuation', labelAr: 'طلب تقييم سعر العقار', style: 'filled', color: '#d4af37' },
        { label: 'Direct WhatsApp Line', labelAr: 'تواصل مباشر واتساب', style: 'outline' }
      ],
      tags: ['Wall Street Journal Top 100', '$1.2B+ Career Sales', 'Global Network']
    },
    themeConfig: createThemeConfig('dark', '#060d17', '#0e1a2d', '#d4af37', '#f8fafc', '#94a3b8', '#dfb76c', '#1a2e4c', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Julian Sterling | Luxury Real Estate Broker',
      metaDescription: 'Private client real estate broker specializing in high-net-worth acquisitions and sales.',
      ogImageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_re3_hero', 'JULIAN STERLING REALTY', 'Strategic positioning, masterful negotiation, and unparalleled market intelligence.', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80', 'LUXURY REALTOR'),
      createVCardBlock('b_re3_vcard', {
        fullName: 'Julian Sterling',
        jobTitle: 'Managing Broker & Founder',
        company: 'Sterling & Co. Luxury Properties',
        phone: '+1 (310) 555-0182',
        email: 'julian@sterlingluxury.com',
        website: 'https://esaia.app',
        bio: 'Over $1.2B in lifetime sales across Beverly Hills, Bel Air, and the Hollywood Hills.'
      })
    ]
  },

  // 13.4 Vertex Commercial Logistics & Office Real Estate (Brutalist Charcoal & Cyber Yellow)
  {
    id: 'tpl_re_vertex_commercial',
    title: 'Vertex Commercial & Industrial Properties',
    subtitle: 'Grade-A tech headquarters, cold-storage logistics hubs & retail flagship spaces',
    category: 'real_estate',
    categoryName: 'Real estate',
    categoryNameAr: 'العقارات',
    type: 'landing',
    isFeatured: false,
    badge: 'Commercial',
    badgeAr: 'عقارات تجارية',
    preview: {
      themePreset: 'dark',
      headerBg: '#121316',
      cardBg: '#1e2025',
      accentColor: '#eab308',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'VERTEX COMMERCIAL',
      heroSubtitle: 'Institutional scale commercial assets optimized for enterprise operations',
      buttons: [
        { label: 'Download Asset Catalog', labelAr: 'تحميل كتالوج العقارات التجارية', style: 'filled', color: '#ca8a04' },
        { label: 'Tenant Advisory Services', labelAr: 'خدمات استشارات الشركات', style: 'outline' }
      ],
      tags: ['LEED Platinum Certified', 'High-Bay Warehousing', 'Major Transit Links']
    },
    themeConfig: createThemeConfig('dark', '#0c0d0f', '#17191c', '#eab308', '#f8fafc', '#9ca3af', '#facc15', '#2a2d34', 'Space Grotesk', 'Space Grotesk', 'filled', 'none'),
    seo: {
      metaTitle: 'Vertex Commercial | Enterprise Logistics & Prime Office Leasing',
      metaDescription: 'Institutional grade commercial and industrial real estate development and leasing.',
      ogImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_re4_hero', 'VERTEX COMMERCIAL ASSETS', 'Strategic footprint solutions for global enterprises, logistics leaders, and tech campuses.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80', undefined, 'COMMERCIAL REAL ESTATE'),
      createButtonBlock('b_re4_btn', 'Contact Institutional Commercial Leasing Team', 'https://esaia.app', 'primary')
    ]
  },

  // 13.5 Terra Verde Organic Vineyard & Country Estates (Warm Olive Green & Sandstone)
  {
    id: 'tpl_re_terra_verde',
    title: 'Terra Verde Country Estates & Vineyards',
    subtitle: 'Historic olive groves, biodynamic vineyards & secluded equestrian estates in Tuscany',
    category: 'real_estate',
    categoryName: 'Real estate',
    categoryNameAr: 'العقارات',
    type: 'landing',
    isFeatured: false,
    badge: 'Country Estates',
    badgeAr: 'مزارع وقصور ريفية',
    preview: {
      themePreset: 'beige',
      headerBg: '#f7f4ed',
      cardBg: '#ffffff',
      accentColor: '#4d7c0f',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'TERRA VERDE',
      heroSubtitle: 'Serene pastoral heritage properties with private wine production',
      buttons: [
        { label: 'Explore Italian Estates', labelAr: 'استكشاف مزارع توسكانا', style: 'filled', color: '#4d7c0f' },
        { label: 'Agricultural Yield Reports', labelAr: 'عوائد الإنتاج الزراعي', style: 'outline' }
      ],
      tags: ['Chianti Classico Vineyards', 'Centuries-Old Stone Villas', 'Private Wells & Solar']
    },
    themeConfig: createThemeConfig('beige', '#faf8f2', '#ffffff', '#4d7c0f', '#1c1917', '#78716c', '#3f6212', '#dcfce7', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Terra Verde | Tuscan Vineyards & Historical Country Estates',
      metaDescription: 'Rare rural properties, active vineyards, and restored stone country homes in Italy and France.',
      ogImageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_re5_hero', 'TERRA VERDE ESTATES', 'Embrace tranquil country living amidst rolling hills, ancient cyprus trees, and fertile vines.', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000&auto=format&fit=crop&q=80', undefined, 'VINEYARD ESTATES'),
      createButtonBlock('b_re5_btn', 'Inquire About Available Tuscan Vineyards', 'https://wa.me/?text=Hi%20Terra%20Verde%2C%20I%20am%20interested%20in%20country%20estates', 'primary')
    ]
  }
];

// =========================================================================
// 14. EDUCATION (التعليم والتدريب) - 5 Distinct Templates
// =========================================================================
export const educationTemplates: TemplateItem[] = [
  // 14.1 Oxford & Ivy League Admissions Consulting (Academic Oxblood & Parchment)
  {
    id: 'tpl_edu_ivy_admissions',
    title: 'Summit Ivy & Oxbridge Admissions',
    subtitle: '98% acceptance rate into top-10 global universities through bespoke mentorship',
    category: 'education',
    categoryName: 'Education',
    categoryNameAr: 'التعليم والتدريب',
    type: 'landing',
    isFeatured: true,
    badge: 'Ivy Admissions',
    badgeAr: 'قبول جامعي نخبوي',
    preview: {
      themePreset: 'dark',
      headerBg: '#170c10',
      cardBg: '#26131b',
      accentColor: '#e11d48',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SUMMIT ADMISSIONS',
      heroSubtitle: 'Guiding visionary students into Harvard, Stanford, Oxford, and Cambridge',
      buttons: [
        { label: 'Book Diagnostic Evaluation', labelAr: 'حجز تقييم ملف القبول', style: 'filled', color: '#be123c' },
        { label: 'Verified Acceptance Stats', labelAr: 'إحصائيات القبول الموثقة', style: 'outline' }
      ],
      tags: ['Former Admissions Officers', 'Personal Statement Coaching', 'SAT/ACT 1550+']
    },
    themeConfig: createThemeConfig('dark', '#11080c', '#1d0e14', '#e11d48', '#f8fafc', '#f43f5e', '#be123c', '#381622', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Summit Admissions | Elite Ivy League & Oxbridge Consulting',
      metaDescription: 'Comprehensive college counseling by former Ivy League admissions directors.',
      ogImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_edu1_hero', 'SUMMIT ADMISSIONS MENTORSHIP', 'Turn academic ambition into life-changing acceptances at the world’s elite universities.', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1000&auto=format&fit=crop&q=80', undefined, 'COLLEGE ADMISSIONS'),
      createButtonBlock('b_edu1_btn', 'Schedule 1-on-1 Profile Strategy Consultation', 'https://wa.me/?text=Hello%20Summit%2C%20I%20want%20to%20apply%20to%20Ivy%20League', 'primary')
    ]
  },

  // 14.2 DevCraft Full-Stack AI & Engineering Bootcamp (Cyber Neon Teal & Jet Black)
  {
    id: 'tpl_edu_devcraft_bootcamp',
    title: 'DevCraft Full-Stack AI Coding Bootcamp',
    subtitle: 'Master React, Next.js, Python LLM agents & land a $120k+ remote software role',
    category: 'education',
    categoryName: 'Education',
    categoryNameAr: 'التعليم والتدريب',
    type: 'landing',
    isFeatured: true,
    badge: 'AI Software',
    badgeAr: 'معسكر برمجة وذكاء اصطناعي',
    preview: {
      themePreset: 'dark',
      headerBg: '#081318',
      cardBg: '#0f242d',
      accentColor: '#06b6d4',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'DEVCRAFT ACADEMY',
      heroSubtitle: 'From beginner to shipping production AI web apps in 16 intensive weeks',
      buttons: [
        { label: 'Download Syllabus 2026', labelAr: 'تحميل المنهاج البرمجي 2026', style: 'filled', color: '#0891b2' },
        { label: 'Job Placement Guarantee', labelAr: 'ضمان التوظيف والتدريب', style: 'outline' }
      ],
      tags: ['Agentic AI Workflows', '1-on-1 Senior Mentors', 'Income Share Option']
    },
    themeConfig: createThemeConfig('dark', '#050c10', '#0a1a21', '#06b6d4', '#f0fdfa', '#67e8f9', '#0891b2', '#163845', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'DevCraft | Full-Stack & AI Engineer Bootcamp',
      metaDescription: 'Hands-on coding academy teaching TypeScript, cloud architecture, and generative AI agents.',
      ogImageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_edu2_hero', 'DEVCRAFT ACADEMY', 'Build scalable software products with modern web technologies and AI agents.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80', undefined, 'SOFTWARE BOOTCAMP'),
      createButtonBlock('b_edu2_btn', 'Apply for the Upcoming Cohort (Limited 25 Seats)', 'https://esaia.app', 'primary')
    ]
  },

  // 14.3 LinguaFlow Fluency & Language Immersion School (Warm Sunlit Orange & Sky Blue)
  {
    id: 'tpl_edu_linguaflow_languages',
    title: 'LinguaFlow Language Immersion Institute',
    subtitle: 'Native speaker conversation clubs, CEFR B2/C1 diplomas & business language mastery',
    category: 'education',
    categoryName: 'Education',
    categoryNameAr: 'التعليم والتدريب',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Fluency Fast',
    badgeAr: 'تعليم لغات معتمد',
    preview: {
      themePreset: 'light',
      headerBg: '#fff7ed',
      cardBg: '#ffffff',
      accentColor: '#ea580c',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'LINGUAFLOW',
      heroSubtitle: 'Speak English, German, French, or Spanish naturally within 90 days',
      buttons: [
        { label: 'Free Language Level Test', labelAr: 'اختبار تحديد المستوى مجاناً', style: 'filled', color: '#ea580c' },
        { label: 'Native Speaker Club', labelAr: 'نادي المحادثة مع ناطقين أصليين', style: 'outline' }
      ],
      tags: ['No Boring Grammar', 'Instant Speaking Drills', 'Certified Diplomas']
    },
    themeConfig: createThemeConfig('light', '#fffbf5', '#ffffff', '#ea580c', '#1c1917', '#78716c', '#c2410c', '#fed7aa', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'LinguaFlow | Accelerated Language Fluency & Online Tutoring',
      metaDescription: 'Learn to speak foreign languages confidently with interactive audio drills and certified native tutors.',
      ogImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_edu3_hero', 'LINGUAFLOW IMMERSION', 'Break the language barrier and open new global career horizons.', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1000&auto=format&fit=crop&q=80', undefined, 'LANGUAGE ACADEMY'),
      createButtonBlock('b_edu3_btn', 'Take Free 10-Minute Assessment & Get Level Report', 'https://esaia.app', 'primary')
    ]
  },

  // 14.4 Executive Mind MBA & Leadership Masterclasses (Refined Slate Charcoal & Navy)
  {
    id: 'tpl_edu_exec_leadership',
    title: 'Executive Mind - Strategic Leadership Seminars',
    subtitle: 'Executive coaching for directors, board governance, crisis leadership & M&A strategy',
    category: 'education',
    categoryName: 'Education',
    categoryNameAr: 'التعليم والتدريب',
    type: 'landing',
    isFeatured: false,
    badge: 'Executive MBA',
    badgeAr: 'قيادة تنفيذية',
    preview: {
      themePreset: 'dark',
      headerBg: '#0d131f',
      cardBg: '#162033',
      accentColor: '#6366f1',
      textColor: '#f8fafc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'EXECUTIVE MIND',
      heroSubtitle: 'Transforming senior managers into decisive, high-impact enterprise leaders',
      buttons: [
        { label: 'View 2026 Cohort Calendar', labelAr: 'جدول برامج 2026 التنفيذية', style: 'filled', color: '#4f46e5' },
        { label: 'Corporate In-House Workshops', labelAr: 'ورش عمل مخصصة للشركات', style: 'outline' }
      ],
      tags: ['C-Suite Peer Network', 'Case-Method Learning', 'Wharton Alumni Faculty']
    },
    themeConfig: createThemeConfig('dark', '#080d17', '#10192a', '#6366f1', '#f8fafc', '#94a3b8', '#4f46e5', '#1d2c47', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Executive Mind | C-Suite Leadership Development & Seminars',
      metaDescription: 'Elite leadership intensive modules for Vice Presidents, Directors, and aspiring CEOs.',
      ogImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_edu4_hero', 'EXECUTIVE MIND LEADERSHIP', 'Equip yourself with the mental models and decision clarity required at the highest levels.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=80', undefined, 'EXECUTIVE COACHING'),
      createButtonBlock('b_edu4_btn', 'Request Executive Program Prospectus', 'https://esaia.app', 'primary')
    ]
  },

  // 14.5 MathCraft Olympiad & STEM Mastery Lab (Deep Indigo & Bright Sunflower Yellow)
  {
    id: 'tpl_edu_mathcraft_olympiad',
    title: 'MathCraft Olympiad & Advanced STEM Lab',
    subtitle: 'Competition math, AMC 10/12 training, physics problem solving & algorithmic thinking',
    category: 'education',
    categoryName: 'Education',
    categoryNameAr: 'التعليم والتدريب',
    type: 'business_card',
    isFeatured: false,
    badge: 'Math Olympiad',
    badgeAr: 'أولمبياد الرياضيات والعلوم',
    preview: {
      themePreset: 'light',
      headerBg: '#fefce8',
      cardBg: '#ffffff',
      accentColor: '#ca8a04',
      textColor: '#1e1b4b',
      heroCoverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'MATHCRAFT LAB',
      heroSubtitle: 'Cultivating deep mathematical curiosity and Olympiad medals',
      buttons: [
        { label: 'Register for Math Diagnostic', labelAr: 'تسجيل اختبار قياس القدرات', style: 'filled', color: '#ca8a04' },
        { label: 'Past Olympiad Medals', labelAr: 'ميداليات وإنجازات الطلاب', style: 'outline' }
      ],
      tags: ['IMO Gold Medalist Coaches', 'Proof-Based Logic', 'Small Groups (Max 6)']
    },
    themeConfig: createThemeConfig('light', '#fefdf2', '#ffffff', '#ca8a04', '#1e1b4b', '#475569', '#eab308', '#fef08a', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'MathCraft | Olympiad Math & Advanced STEM Training',
      metaDescription: 'Rigorous competition mathematics coaching preparing students for national and international contests.',
      ogImageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_edu5_hero', 'MATHCRAFT ACADEMY', 'Where bright young minds learn to love rigorous logical proofs and challenging problems.', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1000&auto=format&fit=crop&q=80', undefined, 'COMPETITION MATH'),
      createVCardBlock('b_edu5_vcard', {
        fullName: 'Prof. Alexei Voronin',
        jobTitle: 'Olympiad Head Coach & IMO Gold Medalist',
        company: 'MathCraft Institute',
        phone: '+1 (617) 555-0138',
        email: 'alexei@mathcraftlab.org',
        website: 'https://esaia.app',
        bio: 'Trained over 85 national math olympiad winners and USAMO qualifiers.'
      })
    ]
  }
];

// =========================================================================
// 15. TRAVEL (السياحة والسفر) - 5 Distinct Templates
// =========================================================================
export const travelTemplates: TemplateItem[] = [
  // 15.1 Wanderlust Boutique Journeys & Luxury Safaris (African Sunset Ochre & Deep Charcoal)
  {
    id: 'tpl_travel_wanderlust_safari',
    title: 'Wanderlust Bespoke Safaris & Expeditions',
    subtitle: 'Serengeti luxury tented camps, gorilla trekking in Rwanda & private helicopter transfers',
    category: 'travel',
    categoryName: 'Travel & tourism',
    categoryNameAr: 'السياحة والسفر',
    type: 'landing',
    isFeatured: true,
    badge: 'Luxury Safari',
    badgeAr: 'سفاري فاخر ورحلات خاصة',
    preview: {
      themePreset: 'beige',
      headerBg: '#231812',
      cardBg: '#33231a',
      accentColor: '#d97706',
      textColor: '#fdf6ee',
      heroCoverUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'WANDERLUST SAFARIS',
      heroSubtitle: 'Raw wilderness meets unprecedented private five-star luxury',
      buttons: [
        { label: 'Plan Bespoke Itinerary', labelAr: 'تصميم برنامج رحلة مخصص', style: 'filled', color: '#d97706' },
        { label: 'Signature African Camps', labelAr: 'مخيماتنا الفاخرة المعتمدة', style: 'outline' }
      ],
      tags: ['Private Bush Flights', 'Conservation Focused', 'Private Expert Guides']
    },
    themeConfig: createThemeConfig('beige', '#1c130e', '#291c15', '#d97706', '#fdf6ee', '#b8a69a', '#f59e0b', '#3d2b20', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Wanderlust | Luxury African Safaris & Wilderness Expeditions',
      metaDescription: 'Tailored luxury safari expeditions featuring five-star lodges, private flights, and wildlife encounters.',
      ogImageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_trav1_hero', 'WANDERLUST EXPEDITIONS', 'Witness the majestic rhythms of the African wild in absolute private elegance.', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1000&auto=format&fit=crop&q=80', undefined, 'LUXURY SAFARIS'),
      createButtonBlock('b_trav1_btn', 'Begin Crafting Your Custom Safari Itinerary', 'https://wa.me/?text=Hello%20Wanderlust%2C%20I%20want%20to%20plan%20a%20private%20safari', 'primary')
    ]
  },

  // 15.2 Alpine Peaks Ski Chalets & Heli-Skiing (Frosty Ice Blue & Slate Peak)
  {
    id: 'tpl_travel_alpine_ski',
    title: 'Alpine Peaks Luxury Chalets & Heli-Ski',
    subtitle: 'Ski-in ski-out chalets in Zermatt & Courchevel, private chefs & untouched powder runs',
    category: 'travel',
    categoryName: 'Travel & tourism',
    categoryNameAr: 'السياحة والسفر',
    type: 'landing',
    isFeatured: false,
    badge: 'Swiss Chalets',
    badgeAr: 'شاليهات تزلج سويسرية',
    preview: {
      themePreset: 'dark',
      headerBg: '#0a1324',
      cardBg: '#12203d',
      accentColor: '#38bdf8',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ALPINE PEAKS',
      heroSubtitle: 'The apex of winter luxury in the Swiss and French Alps',
      buttons: [
        { label: 'Check Chalet Availability', labelAr: 'حجز شاليهات التزلج الفاخرة', style: 'filled', color: '#0284c7' },
        { label: 'Heli-Skiing Packages', labelAr: 'باقات التزلج بالمروحية', style: 'outline' }
      ],
      tags: ['Private Michelin Chef', 'Outdoor Thermal Hot Tub', 'Dedicated Chauffeur']
    },
    themeConfig: createThemeConfig('dark', '#070e1b', '#0f1b33', '#38bdf8', '#f8fafc', '#93c5fd', '#0284c7', '#1b2f56', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Alpine Peaks | Luxury Ski Chalets & Heli-Skiing Zermatt',
      metaDescription: 'Exclusive catered alpine chalets in the world’s most renowned European ski destinations.',
      ogImageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_trav2_hero', 'ALPINE PEAKS CHALETS', 'Powder snow, roaring fireplaces, and five-star hospitality high above the clouds.', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&auto=format&fit=crop&q=80', undefined, 'ALPINE LUXURY'),
      createButtonBlock('b_trav2_btn', 'Reserve Your Winter Chalet for Season 2026/27', 'https://esaia.app', 'primary')
    ]
  },

  // 15.3 Ryokan Koyo Kyoto Hot Springs & Zen Sanctuary (Minimalist Japanese Hinoki & Forest Bamboo)
  {
    id: 'tpl_travel_kyoto_ryokan',
    title: 'Ryokan Koyo - Kyoto Traditional Onsen',
    subtitle: 'Centuries-old hot spring sanctuary, multi-course seasonal Kaiseki & private Zen gardens',
    category: 'travel',
    categoryName: 'Travel & tourism',
    categoryNameAr: 'السياحة والسفر',
    type: 'landing',
    isFeatured: true,
    badge: 'Kyoto Onsen',
    badgeAr: 'منتجع ياباني تقليدي',
    preview: {
      themePreset: 'beige',
      headerBg: '#211d1a',
      cardBg: '#302a26',
      accentColor: '#84cc16',
      textColor: '#f5efe9',
      heroCoverUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'RYOKAN KOYO',
      heroSubtitle: 'Experience the deep stillness and hospitality of classical Japan',
      buttons: [
        { label: 'Reserve Tatami Room', labelAr: 'حجز غرفة تاتامي تقليدية', style: 'filled', color: '#65a30d' },
        { label: 'Kaiseki Dinner Menu', labelAr: 'قائمة عشاء كايسيكي الفاخر', style: 'outline' }
      ],
      tags: ['Private Open-Air Onsen', 'Authentic Tatami Suites', 'Century-Old Heritage']
    },
    themeConfig: createThemeConfig('beige', '#1a1714', '#26211e', '#84cc16', '#f5efe9', '#baa797', '#65a30d', '#3d342f', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Ryokan Koyo | Authentic Kyoto Onsen & Kaiseki Retreat',
      metaDescription: 'Tranquil Japanese traditional hot spring inn with private open-air baths and garden views.',
      ogImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_trav3_hero', 'RYOKAN KOYO KYOTO', 'Step into a world of cedar aromas, soothing mineral hot springs, and profound peace.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1000&auto=format&fit=crop&q=80', undefined, 'JAPANESE RYOKAN'),
      createButtonBlock('b_trav3_btn', 'Check Available Onsen Suites for Your Dates', 'https://esaia.app', 'primary')
    ]
  },

  // 15.4 Azure Blue Mediterranean Superyacht Charter (Deep Navy & Turquoise Ocean)
  {
    id: 'tpl_travel_yacht_charter',
    title: 'Azure Blue Superyacht Charters',
    subtitle: 'Fully crewed 50m+ mega-yachts across Monaco, Amalfi, Mykonos & French Riviera',
    category: 'travel',
    categoryName: 'Travel & tourism',
    categoryNameAr: 'السياحة والسفر',
    type: 'landing',
    isFeatured: false,
    badge: 'Superyacht',
    badgeAr: 'يخوت فاخرة مأهولة',
    preview: {
      themePreset: 'dark',
      headerBg: '#09152b',
      cardBg: '#12254a',
      accentColor: '#06b6d4',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'AZURE BLUE YACHTS',
      heroSubtitle: 'Bespoke seafaring holidays aboard the world’s most celebrated vessels',
      buttons: [
        { label: 'Browse Yacht Fleet', labelAr: 'تصفح أسطول اليخوت المتاح', style: 'filled', color: '#0891b2' },
        { label: 'Sample Cruising Routes', labelAr: 'مسارات الإبحار المقترحة', style: 'outline' }
      ],
      tags: ['Captains & Private Chefs', 'Seabobs & Jet Skis Included', 'Zero-Speed Stabilizers']
    },
    themeConfig: createThemeConfig('dark', '#061021', '#0e1e3b', '#06b6d4', '#f8fafc', '#67e8f9', '#0891b2', '#1b376b', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'Azure Blue Yachts | Mediterranean Mega Yacht Charters',
      metaDescription: 'Ultra-luxury crewed yacht charters in Greece, the French Riviera, and the Caribbean.',
      ogImageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_trav4_hero', 'AZURE BLUE CHARTERS', 'Sail crystal-clear coves and vibrant Mediterranean ports in ultimate seclusion.', 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1000&auto=format&fit=crop&q=80', undefined, 'YACHT CHARTER'),
      createButtonBlock('b_trav4_btn', 'Request Custom Mediterranean Charter Proposal', 'https://wa.me/?text=Hello%20Azure%20Blue%2C%20I%20am%20looking%20to%20charter%20a%20yacht', 'primary')
    ]
  },

  // 15.5 EcoWild Costa Rica Rainforest Treehouses (Vibrant Rainforest Emerald & Leaf Green)
  {
    id: 'tpl_travel_costarica_ecolodge',
    title: 'EcoWild Costa Rica Rainforest Retreat',
    subtitle: 'Sustainable canopy treehouses, waterfall rappelling, sloth spotting & organic farm dining',
    category: 'travel',
    categoryName: 'Travel & tourism',
    categoryNameAr: 'السياحة والسفر',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Eco Treehouse',
    badgeAr: 'أكواخ الغابات المطيرة',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdf4',
      cardBg: '#ffffff',
      accentColor: '#16a34a',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ECOWILD RETREAT',
      heroSubtitle: 'Wake up to the sounds of toucans high above the cloud forest canopy',
      buttons: [
        { label: 'Check Treehouse Dates', labelAr: 'التحقق من توفر الأكواخ الشجرية', style: 'filled', color: '#16a34a' },
        { label: 'Rainforest Adventure Tours', labelAr: 'رحلات الشلالات والمغامرات', style: 'outline' }
      ],
      tags: ['100% Solar Powered', 'Private Waterfall Access', 'Birdwatching Guides']
    },
    themeConfig: createThemeConfig('light', '#f5faf6', '#ffffff', '#16a34a', '#0f172a', '#475569', '#15803d', '#dcfce7', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'EcoWild Costa Rica | Eco-Lodge & Rainforest Treehouses',
      metaDescription: 'Off-grid luxury treehouse lodge immersed in Costa Rica’s breathtaking biodiversity.',
      ogImageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_trav5_hero', 'ECOWILD RAINFOREST', 'Immerse your senses in one of Earth’s most vibrant living ecosystems.', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=1000&auto=format&fit=crop&q=80', undefined, 'ECO LODGE'),
      createButtonBlock('b_trav5_btn', 'Book Your Treehouse Getaway', 'https://esaia.app', 'primary')
    ]
  }
];
