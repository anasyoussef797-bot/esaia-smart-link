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
// 10. MARKETING (التسويق والإعلانات) - 5 Distinct Templates
// =========================================================================
export const marketingTemplates: TemplateItem[] = [
  // 10.1 ScaleUp Performance Growth & Paid Ads Agency (High-Impact Electric Neon Blue & Dark Navy)
  {
    id: 'tpl_mkt_scaleup_growth',
    title: 'ScaleUp Growth & Paid Ads Agency',
    subtitle: 'Data-driven Meta, TikTok & Google ad scaling producing 4.8x average verified ROAS',
    category: 'marketing',
    categoryName: 'Marketing',
    categoryNameAr: 'التسويق والإعلانات',
    type: 'landing',
    isFeatured: true,
    badge: 'Growth Agency',
    badgeAr: 'وكالة إعلانات',
    preview: {
      themePreset: 'dark',
      headerBg: '#090f1d',
      cardBg: '#131e36',
      accentColor: '#3b82f6',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SCALEUP AGENCY',
      heroSubtitle: 'Predictable e-commerce and B2B customer acquisition at scale',
      buttons: [
        { label: 'Book Growth Audit', labelAr: 'تدقيق إعلاني مجاني', style: 'filled', color: '#2563eb' },
        { label: 'Verified ROAS Case Studies', labelAr: 'نتائج العائد على الإنفاق', style: 'outline' }
      ],
      tags: ['$50M+ Managed Spend', 'Meta Premier Partner', 'Creative Testing Engine']
    },
    themeConfig: createThemeConfig('dark', '#060a14', '#0f172a', '#3b82f6', '#f8fafc', '#93c5fd', '#60a5fa', '#1e293b', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'ScaleUp Growth | Performance Marketing & Paid Ads Scaling',
      metaDescription: 'Aggressive paid social and paid search media buying scaling DTC brands past $10M ARR.',
      ogImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mkt1_hero', 'SCALEUP GROWTH AGENCY', 'We engineer high-converting ad funnels and creative engines that scale your revenue.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80', undefined, 'PERFORMANCE MEDIA'),
      createButtonBlock('b_mkt1_btn', 'Claim Your Free 15-Minute Funnel & Ads Audit', 'https://wa.me/?text=Hi%20ScaleUp%2C%20I%20want%20a%20free%20ad%20audit', 'primary'),
      createParagraphBlock('b_mkt1_stats', '📈 $50M+ Ad Spend Managed  |  🎯 4.8x Average Client ROAS  |  ⚡ 24-Hour Dashboard Sync')
    ]
  },

  // 10.2 HyperViral TikTok & Reels Creator Collective (Vibrant Sunset Gradient & Magenta)
  {
    id: 'tpl_mkt_hyperviral_tiktok',
    title: 'HyperViral Short-Form Video Agency',
    subtitle: 'Hook-driven UGC, viral TikTok scripts, and authentic influencer seed campaigns',
    category: 'marketing',
    categoryName: 'Marketing',
    categoryNameAr: 'التسويق والإعلانات',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Viral TikTok',
    badgeAr: 'فيديوهات تيك توك',
    preview: {
      themePreset: 'dark',
      headerBg: '#180a22',
      cardBg: '#291238',
      accentColor: '#ec4899',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'HYPERVIRAL MEDIA',
      heroSubtitle: 'Generating over 500M organic views for high-growth brands',
      buttons: [
        { label: 'Watch Viral Showreel', labelAr: 'مشاهدة مقاطع التيك توك الفيروسية', style: 'filled', color: '#db2777' },
        { label: 'UGC Creator Network', labelAr: 'شبكة صناع محتوى UGC', style: 'outline' }
      ],
      tags: ['500M+ Views', 'Top 1% Hook Rate', '48-Hour Turnaround']
    },
    themeConfig: createThemeConfig('dark', '#110619', '#1f0d2b', '#ec4899', '#fdf2f8', '#f472b6', '#f43f5e', '#3c1854', 'Space Grotesk', 'Space Grotesk', 'filled', 'full'),
    seo: {
      metaTitle: 'HyperViral Media | TikTok Agency & UGC Creative Lab',
      metaDescription: 'End-to-end short-form video production that drives real brand awareness and customer conversion.',
      ogImageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mkt2_hero', 'HYPERVIRAL CREATIVE LAB', 'Stop the scroll. We turn casual viewers into loyal buyers through viral short-form storytelling.', 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1000&auto=format&fit=crop&q=80', undefined, 'SHORT-FORM VIDEO'),
      createButtonBlock('b_mkt2_btn', 'Order Your First 10 UGC Video Package', 'https://esaia.app', 'primary')
    ]
  },

  // 10.3 NorthStar B2B SaaS Inbound & SEO Consultancy (Clean Nordic Ice Grey & Deep Indigo)
  {
    id: 'tpl_mkt_northstar_seo',
    title: 'NorthStar B2B Inbound & SEO Advisory',
    subtitle: 'High-intent programmatic SEO, product-led content strategy & organic pipeline generation',
    category: 'marketing',
    categoryName: 'Marketing',
    categoryNameAr: 'التسويق والإعلانات',
    type: 'landing',
    isFeatured: true,
    badge: 'B2B Inbound',
    badgeAr: 'سيو وتسويق B2B',
    preview: {
      themePreset: 'light',
      headerBg: '#f8fafc',
      cardBg: '#ffffff',
      accentColor: '#4338ca',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'NORTHSTAR SEO',
      heroSubtitle: 'Build an organic acquisition moat that compounds over time',
      buttons: [
        { label: 'Request Keyword Strategy', labelAr: 'تحليل الكلمات المفتاحية', style: 'filled', color: '#4338ca' },
        { label: 'Organic ARR Case Studies', labelAr: 'دراسات نمو الأرباح العضوية', style: 'outline' }
      ],
      tags: ['Zero-Spam Content', 'Entity SEO', 'High-Intent Pipeline']
    },
    themeConfig: createThemeConfig('light', '#f1f5f9', '#ffffff', '#4338ca', '#0f172a', '#475569', '#3730a3', '#cbd5e1', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'NorthStar Inbound | Enterprise B2B SEO & Content Architecture',
      metaDescription: 'Turn organic Google search into your company’s most predictable sales pipeline channel.',
      ogImageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mkt3_hero', 'NORTHSTAR INBOUND ARCHITECTURE', 'Generate high-intent enterprise pipeline without paying for every single click.', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80', undefined, 'B2B INBOUND'),
      createButtonBlock('b_mkt3_btn', 'Request Inbound Organic Opportunity Roadmap', 'https://wa.me/?text=Hi%20NorthStar%2C%20we%20want%20to%20scale%20our%20SaaS%20organic%20pipeline', 'primary')
    ]
  },

  // 10.4 BrandCraft Global PR & Media Relations (Editorial Classic Monolith & Pure Gold)
  {
    id: 'tpl_mkt_brandcraft_pr',
    title: 'BrandCraft Global Communications & PR',
    subtitle: 'Strategic media placements in Forbes, Bloomberg, TechCrunch, and top tier television',
    category: 'marketing',
    categoryName: 'Marketing',
    categoryNameAr: 'التسويق والإعلانات',
    type: 'business_card',
    isFeatured: false,
    badge: 'PR & Media',
    badgeAr: 'علاقات عامة وإعلام',
    preview: {
      themePreset: 'dark',
      headerBg: '#121214',
      cardBg: '#1d1d21',
      accentColor: '#eab308',
      textColor: '#f8fafc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'BRANDCRAFT PR',
      heroSubtitle: 'Positioning founders and enterprises as definitive industry leaders',
      buttons: [
        { label: 'Media Inquiry / Press Kit', labelAr: 'البيان الصحفي وملف الإعلام', style: 'filled', color: '#ca8a04' },
        { label: 'Past Front-Page Hits', labelAr: 'تغطيات الصحافة العالمية', style: 'outline' }
      ],
      tags: ['Tier-1 Guaranteed Placements', 'Crisis PR Response', 'Executive Ghostwriting']
    },
    themeConfig: createThemeConfig('dark', '#0d0d0f', '#17171a', '#eab308', '#f8fafc', '#a1a1aa', '#facc15', '#27272a', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'BrandCraft PR | Global Strategic Communications & Media',
      metaDescription: 'Prestige public relations securing impactful editorial features in top-tier tier-1 publications.',
      ogImageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mkt4_hero', 'BRANDCRAFT COMMUNICATIONS', 'Authoritative reputation management and media prominence for visionary leaders.', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80', undefined, 'STRATEGIC PR'),
      createVCardBlock('b_mkt4_vcard', {
        fullName: 'Camilla Harrington',
        jobTitle: 'Managing Director & Head of Media',
        company: 'BrandCraft PR Global',
        phone: '+44 20 7946 0884',
        email: 'camilla@brandcraftpr.com',
        website: 'https://esaia.app',
        bio: 'Over 15 years placing tech unicorns and visionary executives on the global media stage.'
      })
    ]
  },

  // 10.5 InfluencerHub Creator Sponsorship Agency (Bold Cyber Tangerine & Deep Black)
  {
    id: 'tpl_mkt_influencer_hub',
    title: 'InfluencerHub Talent & Brand Deals',
    subtitle: 'Connecting premium creators with Tier-1 global brand endorsements and campaigns',
    category: 'marketing',
    categoryName: 'Marketing',
    categoryNameAr: 'التسويق والإعلانات',
    type: 'landing',
    isFeatured: false,
    badge: 'Creator Roster',
    badgeAr: 'رعاية المشاهير',
    preview: {
      themePreset: 'dark',
      headerBg: '#140c06',
      cardBg: '#21140a',
      accentColor: '#f97316',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'INFLUENCERHUB',
      heroSubtitle: 'High-performing creator partnerships that build enduring brand affinity',
      buttons: [
        { label: 'Browse Creator Roster', labelAr: 'استعراض قائمة المؤثرين المعتمدين', style: 'filled', color: '#ea580c' },
        { label: 'Apply as Creator', labelAr: 'انضمام كصانع محتوى', style: 'outline' }
      ],
      tags: ['Vetted ROI Creators', 'Automated Usage Rights', 'Full Compliance']
    },
    themeConfig: createThemeConfig('dark', '#0e0703', '#1a0e07', '#f97316', '#fff7ed', '#fdba74', '#ea580c', '#381c0d', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'InfluencerHub | Influencer Marketing & Creator Management',
      metaDescription: 'End-to-end influencer activation campaigns, contract negotiation, and ROI tracking.',
      ogImageUrl: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mkt5_hero', 'INFLUENCERHUB AGENCY', 'Authentic endorsements from creators your target audience genuinely trusts and loves.', 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=1000&auto=format&fit=crop&q=80', undefined, 'INFLUENCER MARKETING'),
      createButtonBlock('b_mkt5_btn', 'Launch an Influencer Campaign in 7 Days', 'https://esaia.app', 'primary')
    ]
  }
];

// =========================================================================
// 11. FASHION (الأزياء والموضة) - 5 Distinct Templates
// =========================================================================
export const fashionTemplates: TemplateItem[] = [
  // 11.1 Maison de Soie Haute Couture (Editorial Parisian Cream & Jet Black)
  {
    id: 'tpl_fash_maison_soie',
    title: 'Maison de Soie - Haute Couture Atelier',
    subtitle: 'Hand-draped French silks, bespoke bridal gowns & bespoke private red carpet tailoring',
    category: 'fashion',
    categoryName: 'Fashion & style',
    categoryNameAr: 'الأزياء والموضة',
    type: 'landing',
    isFeatured: true,
    badge: 'Haute Couture',
    badgeAr: 'أزياء راقية',
    preview: {
      themePreset: 'beige',
      headerBg: '#f6f3ee',
      cardBg: '#ffffff',
      accentColor: '#171717',
      textColor: '#171717',
      heroCoverUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'MAISON DE SOIE',
      heroSubtitle: 'Parisian craftsmanship dedicated to the architecture of elegance',
      buttons: [
        { label: 'Book Private Fitting', labelAr: 'حجز بروفة قياس خاصة', style: 'filled', color: '#171717' },
        { label: 'View 2026 Collection', labelAr: 'مجموعة أزياء 2026', style: 'outline' }
      ],
      tags: ['Lyon Pure Silk', 'Hand-Beaded Lace', 'Private Parisian Salon']
    },
    themeConfig: createThemeConfig('beige', '#faf8f5', '#ffffff', '#171717', '#171717', '#525252', '#404040', '#e5e5e5', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'none'),
    seo: {
      metaTitle: 'Maison de Soie | Haute Couture & Bespoke Evening Gowns',
      metaDescription: 'Handcrafted bridal couture and evening wear created with timeless French tailoring artistry.',
      ogImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fash1_hero', 'MAISON DE SOIE', 'Every stitch sculpted to celebrate individuality, grace, and timeless poise.', 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80', undefined, 'PARISIAN COUTURE'),
      createButtonBlock('b_fash1_btn', 'Request Appointment with Master Couturier', 'https://wa.me/?text=Hello%20Maison%20de%20Soie%2C%20I%20wish%20to%20book%20a%20private%20fitting', 'primary')
    ]
  },

  // 11.2 UrbanDrop Streetwear & Capsule Apparel (Dark Grunge Industrial Orange & Metal)
  {
    id: 'tpl_fash_urbandrop_street',
    title: 'UrbanDrop Heavyweight Streetwear',
    subtitle: '500GSM oversized French terry hoodies, distressed denim & limited drop culture',
    category: 'fashion',
    categoryName: 'Fashion & style',
    categoryNameAr: 'الأزياء والموضة',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Limited Drop',
    badgeAr: 'ستريت وير حصري',
    preview: {
      themePreset: 'dark',
      headerBg: '#0f0f10',
      cardBg: '#191a1d',
      accentColor: '#f97316',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'URBANDROP',
      heroSubtitle: 'Heavyweight essentials engineered for the modern subculture',
      buttons: [
        { label: 'Shop Capsule Drop 04', labelAr: 'تسوق الإصدار المحدود 04', style: 'filled', color: '#ea580c' },
        { label: 'Join VIP SMS Early Access', labelAr: 'اشتراك بالرسائل للإصدار القادم', style: 'outline' }
      ],
      tags: ['500GSM Cotton', 'Acid Washed', 'Ships Worldwide']
    },
    themeConfig: createThemeConfig('dark', '#0b0b0c', '#141416', '#f97316', '#f8fafc', '#a1a1aa', '#ea580c', '#27272a', 'Space Grotesk', 'Space Grotesk', 'filled', 'none'),
    seo: {
      metaTitle: 'UrbanDrop | Heavyweight Streetwear & Limited Hoodies',
      metaDescription: 'Limited edition oversized luxury streetwear engineered with custom vintage washing and hardware.',
      ogImageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fash2_hero', 'URBANDROP HEAVYWEIGHT', 'Raw texture, heavyweight drapery, and unmistakable streetwear silhouettes.', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=80', undefined, 'STREETWEAR DROP'),
      createButtonBlock('b_fash2_btn', 'Shop Drop 04 Before Sells Out', 'https://esaia.app', 'primary')
    ]
  },

  // 11.3 Sol y Mar Sustainable Resort & Swimwear (Sun-bleached Terracotta & Turquoise)
  {
    id: 'tpl_fash_solymar_swim',
    title: 'Sol y Mar Mediterranean Resortwear',
    subtitle: 'Recycled ocean plastic bikinis, breezy linen resort shirts & vacation pareos',
    category: 'fashion',
    categoryName: 'Fashion & style',
    categoryNameAr: 'الأزياء والموضة',
    type: 'landing',
    isFeatured: false,
    badge: 'Eco Resort',
    badgeAr: 'ملابس بحر مستدامة',
    preview: {
      themePreset: 'beige',
      headerBg: '#fef7ed',
      cardBg: '#ffffff',
      accentColor: '#0ea5e9',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SOL Y MAR',
      heroSubtitle: 'Sun-drenched Mediterranean resortwear made sustainably from the sea',
      buttons: [
        { label: 'Shop Summer 2026', labelAr: 'تسوق تشكيلة الصيف', style: 'filled', color: '#0284c7' },
        { label: 'Our Ocean Fabric Mission', labelAr: 'قصة الأقمشة المعاد تدويرها', style: 'outline' }
      ],
      tags: ['ECONYL Regenerated', 'UPF 50+ Sun Guard', 'Plastic-Free Packaging']
    },
    themeConfig: createThemeConfig('beige', '#fdfaf5', '#ffffff', '#0ea5e9', '#1c1917', '#78716c', '#0284c7', '#e0f2fe', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Sol y Mar | Sustainable Luxury Swimwear & Resortwear',
      metaDescription: 'Eco-conscious swimwear and airy linen travel pieces designed for idyllic coastal getaways.',
      ogImageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fash3_hero', 'SOL Y MAR RESORTWEAR', 'Sun, saltwater, and sustainable elegance crafted for endless summer days.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=80', undefined, 'RESORTWEAR'),
      createButtonBlock('b_fash3_btn', 'Explore the Amalfi Coast 2026 Collection', 'https://esaia.app', 'primary')
    ]
  },

  // 11.4 KicksCulture Rare Sneaker Consignment (High-Contrast Bold Monochrome & Volt)
  {
    id: 'tpl_fash_kicksculture',
    title: 'KicksCulture Rare Sneaker Consignment',
    subtitle: '100% verified authentic Air Jordans, Yeezys, Dunks & luxury runway collaborations',
    category: 'fashion',
    categoryName: 'Fashion & style',
    categoryNameAr: 'الأزياء والموضة',
    type: 'link_in_bio',
    isFeatured: false,
    badge: '100% Legit',
    badgeAr: 'سنيكرز أصلية 100%',
    preview: {
      themePreset: 'dark',
      headerBg: '#090a0f',
      cardBg: '#131520',
      accentColor: '#84cc16',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'KICKSCULTURE',
      heroSubtitle: 'The premier destination for deadstock grails and rare sneaker investments',
      buttons: [
        { label: 'Browse Fresh Grails', labelAr: 'تصفح أحدث الأحذية النادرة', style: 'filled', color: '#65a30d' },
        { label: 'Sell Your Sneakers With Us', labelAr: 'اعرض حذائك للبيع بأمان', style: 'outline' }
      ],
      tags: ['Entrupy Verified', 'Same-Day Insured Dispatch', 'Grail Search Concierge']
    },
    themeConfig: createThemeConfig('dark', '#07080c', '#10121a', '#84cc16', '#f8fafc', '#94a3b8', '#65a30d', '#1f2433', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'KicksCulture | Rare Sneaker Marketplace & Verified Consignment',
      metaDescription: 'Shop authenticated collectible sneakers, retro Jordans, and limited designer footwear.',
      ogImageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fash4_hero', 'KICKSCULTURE CONSIGNMENT', 'Every pair physically verified by master authenticators with guaranteed authenticity.', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1000&auto=format&fit=crop&q=80', undefined, 'SNEAKER GRAILS'),
      createButtonBlock('b_fash4_btn', 'Shop Rare Deadstock Pairs', 'https://esaia.app', 'primary')
    ]
  },

  // 11.5 Aurelia Fine Handcrafted Jewelry & Diamonds (Velvety Midnight Sapphire & Polished Gold)
  {
    id: 'tpl_fash_aurelia_jewelry',
    title: 'Aurelia Fine Handcrafted Jewelry',
    subtitle: 'Conflict-free diamonds, 18k solid gold heirloom rings, and bespoke bridal jewelry',
    category: 'fashion',
    categoryName: 'Fashion & style',
    categoryNameAr: 'الأزياء والموضة',
    type: 'business_card',
    isFeatured: true,
    badge: 'Fine Jewelry',
    badgeAr: 'مجوهرات وألماس',
    preview: {
      themePreset: 'dark',
      headerBg: '#090e1a',
      cardBg: '#111b30',
      accentColor: '#d4af37',
      textColor: '#f8fafc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'AURELIA JEWELS',
      heroSubtitle: 'Heirloom creations designed to capture eternity in pure gold and precious gems',
      buttons: [
        { label: 'Book Custom Ring Design', labelAr: 'تصميم خاتم خطوبة مخصص', style: 'filled', color: '#d4af37' },
        { label: 'Engagement Ring Guide', labelAr: 'دليل اختيار الألماس', style: 'outline' }
      ],
      tags: ['GIA Certified Diamonds', 'Recycled 18K Gold', 'Lifetime Cleanings']
    },
    themeConfig: createThemeConfig('dark', '#060912', '#0c1424', '#d4af37', '#f8fafc', '#cbd5e1', '#f59e0b', '#182744', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Aurelia Jewels | Handcrafted Engagement Rings & Fine Diamonds',
      metaDescription: 'Bespoke fine jewelry crafted with GIA certified diamonds, emeralds, and 18k solid gold.',
      ogImageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fash5_hero', 'AURELIA FINE JEWELRY', 'Crafting the precious symbols of your deepest love and enduring milestones.', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80', undefined, 'FINE JEWELRY'),
      createVCardBlock('b_fash5_vcard', {
        fullName: 'Dominique Laurent',
        jobTitle: 'Master Gemologist & Founder',
        company: 'Aurelia Fine Jewels',
        phone: '+1 (212) 555-0145',
        email: 'dominique@aureliajewels.com',
        website: 'https://esaia.app',
        bio: 'GIA Graduate Gemologist creating custom bespoke engagement rings and high jewelry.'
      })
    ]
  }
];

// =========================================================================
// 12. MUSIC (الموسيقى والصوتيات) - 5 Distinct Templates
// =========================================================================
export const musicTemplates: TemplateItem[] = [
  // 12.1 SoundWave Electronic Music Producer & DJ (Dark Club Neon Purple & Synth Blue)
  {
    id: 'tpl_music_soundwave_dj',
    title: 'SoundWave - Electronic Music Producer & DJ',
    subtitle: 'Melodic techno, festival tour dates, Spotify releases, and exclusive VIP remixes',
    category: 'music',
    categoryName: 'Music',
    categoryNameAr: 'الموسيقى والصوتيات',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Touring DJ',
    badgeAr: 'منتج موسيقي ودي جي',
    preview: {
      themePreset: 'dark',
      headerBg: '#120826',
      cardBg: '#1f0d3d',
      accentColor: '#8b5cf6',
      textColor: '#ffffff',
      avatarUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SOUNDWAVE',
      heroSubtitle: 'Touring Europe & Ibiza Summer 2026 | New Single Out Now',
      buttons: [
        { label: 'Stream New EP on Spotify', labelAr: 'استمع للألبوم على سبوتيفاي', style: 'filled', color: '#8b5cf6' },
        { label: 'Festival Tour Tickets', labelAr: 'تذاكر الحفلات والمهرجانات', style: 'outline' }
      ],
      tags: ['Afterlife Records', '2M+ Monthly Listeners', 'Pioneer DJ Artist']
    },
    themeConfig: createThemeConfig('dark', '#0c051a', '#170a2e', '#8b5cf6', '#faf5ff', '#c084fc', '#a855f7', '#2e1457', 'Space Grotesk', 'Space Grotesk', 'filled', 'full'),
    seo: {
      metaTitle: 'SoundWave DJ | Music Releases, Spotify & Tour Dates',
      metaDescription: 'Official artist hub for SoundWave. Stream latest melodic techno tracks and buy tour tickets.',
      ogImageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mus1_hero', 'SOUNDWAVE LIVE', 'Euphoric frequencies, atmospheric basslines, and unforgettable festival energy.', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80', 'ELECTRONIC ARTIST'),
      createButtonBlock('b_mus1_btn', 'Stream "Starlight Odyssey" EP Everywhere', 'https://esaia.app', 'primary'),
      createButtonBlock('b_mus1_btn2', 'Worldwide Festival Booking & Management', 'https://wa.me/?text=Hi%20SoundWave%20management%2C%20we%20want%20to%20book%20a%20set', 'outline')
    ]
  },

  // 12.2 Acoustic Soul Indie Singer-Songwriter (Warm Vintage Sepia, Amber & Honey)
  {
    id: 'tpl_music_acoustic_soul',
    title: 'Acoustic Soul - Indie Folk Songwriter',
    subtitle: 'Intimate acoustic sessions, heartfelt lyricism, vinyl records & Patreon community',
    category: 'music',
    categoryName: 'Music',
    categoryNameAr: 'الموسيقى والصوتيات',
    type: 'landing',
    isFeatured: false,
    badge: 'Indie Folk',
    badgeAr: 'غناء وعزف حي',
    preview: {
      themePreset: 'beige',
      headerBg: '#211712',
      cardBg: '#30221a',
      accentColor: '#d97706',
      textColor: '#fdf8f4',
      heroCoverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'MARA JADE',
      heroSubtitle: 'Songs of memory, cedar trees, and open highways',
      buttons: [
        { label: 'Order Vinyl Edition', labelAr: 'طلب أسطوانة الفينيل الموقعة', style: 'filled', color: '#d97706' },
        { label: 'Join Songwriting Patreon', labelAr: 'الانضمام لمجتمع الداعمين', style: 'outline' }
      ],
      tags: ['Acoustic Guitar', 'Independent Artist', 'Living Room Tours']
    },
    themeConfig: createThemeConfig('beige', '#1a120e', '#261b15', '#d97706', '#fdf8f4', '#bfaea4', '#f59e0b', '#3d2b21', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Mara Jade | Indie Folk Singer-Songwriter & Vinyl Store',
      metaDescription: 'Acoustic recordings, handwritten lyrics, and private living room tour dates.',
      ogImageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mus2_hero', 'MARA JADE ACOUSTIC', 'Honest acoustic ballads capturing the warmth and fragile beauty of the human heart.', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80', undefined, 'INDIE FOLK'),
      createButtonBlock('b_mus2_btn', 'Order Signed Gatefold Vinyl Record', 'https://esaia.app', 'primary')
    ]
  },

  // 12.3 Opus 9 Philharmonia & Classical Chamber (Classic Royal Burgundy & Antique Gold)
  {
    id: 'tpl_music_opus9_orchestra',
    title: 'Opus 9 Philharmonia & Chamber Ensemble',
    subtitle: 'World-class orchestral symphony concerts, guest soloists, and youth masterclasses',
    category: 'music',
    categoryName: 'Music',
    categoryNameAr: 'الموسيقى والصوتيات',
    type: 'landing',
    isFeatured: true,
    badge: 'Classical Hall',
    badgeAr: 'أوركسترا كلاسيكية',
    preview: {
      themePreset: 'dark',
      headerBg: '#170d11',
      cardBg: '#26151c',
      accentColor: '#c5a059',
      textColor: '#fdf8f9',
      heroCoverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'OPUS 9 ORCHESTRA',
      heroSubtitle: 'Celebrating timeless masterpieces in acoustic splendor',
      buttons: [
        { label: 'Season Subscription Tickets', labelAr: 'اشتراك الموسم الموسيقي', style: 'filled', color: '#c5a059' },
        { label: 'Concert Calendar', labelAr: 'جدول الحفلات الموسيقية', style: 'outline' }
      ],
      tags: ['80-Piece Symphony', 'Beethoven & Mahler Cycle', 'Acoustic Concert Hall']
    },
    themeConfig: createThemeConfig('dark', '#120a0d', '#1d1016', '#c5a059', '#fdf8f9', '#a8949a', '#dfb76c', '#381e28', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Opus 9 Philharmonia | Classical Symphony & Chamber Concerts',
      metaDescription: 'Experience breathtaking classical symphony concerts, piano concertos, and operatic galas.',
      ogImageUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mus3_hero', 'OPUS 9 PHILHARMONIA', 'Preserving the grandeur and emotional power of humanity’s greatest symphonic music.', 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1000&auto=format&fit=crop&q=80', undefined, 'SYMPHONIC ORCHESTRA'),
      createButtonBlock('b_mus3_btn', 'Reserve Premier Orchestra Hall Seats', 'https://esaia.app', 'primary')
    ]
  },

  // 12.4 BeatVault Urban Hip-Hop Beat Store & Licensing (Aggressive Red & Matte Black)
  {
    id: 'tpl_music_beatvault_store',
    title: 'BeatVault Producer Beats & Licensing',
    subtitle: 'Industry-standard trap, boom-bap & drill instrumentals ready for instant WAV leasing',
    category: 'music',
    categoryName: 'Music',
    categoryNameAr: 'الموسيقى والصوتيات',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Beat Store',
    badgeAr: 'متجر موسيقى وبيز',
    preview: {
      themePreset: 'dark',
      headerBg: '#0e0b0b',
      cardBg: '#1a1313',
      accentColor: '#ef4444',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'BEATVAULT LABS',
      heroSubtitle: 'Chart-ready production for rappers, vocalists, and content creators',
      buttons: [
        { label: 'Listen to Trending Beats', labelAr: 'الاستماع لأحدث الإيقاعات', style: 'filled', color: '#dc2626' },
        { label: 'Licensing Terms & Stems', labelAr: 'شروط الترخيص وتراخيص الحقوق', style: 'outline' }
      ],
      tags: ['Instant Untagged WAV', 'Trackouts Included', 'Commercial Radio Ready']
    },
    themeConfig: createThemeConfig('dark', '#0a0808', '#140e0e', '#ef4444', '#f8fafc', '#f87171', '#dc2626', '#291818', 'Space Grotesk', 'Space Grotesk', 'filled', 'none'),
    seo: {
      metaTitle: 'BeatVault | Royalty-Free Hip Hop & Trap Beats Store',
      metaDescription: 'Lease and buy exclusive hip-hop and trap instrumentals with instant untagged delivery.',
      ogImageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mus4_hero', 'BEATVAULT INSTRUMENTALS', 'Hard-hitting drums, moody melodies, and professional mixdowns for your next hit record.', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&auto=format&fit=crop&q=80', undefined, 'BEAT STORE'),
      createButtonBlock('b_mus4_btn', 'Stream and License Beats on BeatStars', 'https://esaia.app', 'primary')
    ]
  },

  // 12.5 Sonar Audio Mastering & Analog Recording Studios (Precision Studio Charcoal & Meter Green)
  {
    id: 'tpl_music_sonar_studios',
    title: 'Sonar Analog Recording & Mastering',
    subtitle: 'SSL 4000 console, Neve preamps, Studer 2-inch tape & Dolby Atmos spatial mixing',
    category: 'music',
    categoryName: 'Music',
    categoryNameAr: 'الموسيقى والصوتيات',
    type: 'business_card',
    isFeatured: false,
    badge: 'Analog Studio',
    badgeAr: 'استوديو تسجيل وماسترنج',
    preview: {
      themePreset: 'dark',
      headerBg: '#0d1117',
      cardBg: '#161b22',
      accentColor: '#10b981',
      textColor: '#f0f6fc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SONAR SOUND LABS',
      heroSubtitle: 'Pristine acoustic recording environments and analog mastering chain',
      buttons: [
        { label: 'Book Studio Lockout Days', labelAr: 'حجز أيام تسجيل بالاستوديو', style: 'filled', color: '#059669' },
        { label: 'Gear List & Microphones', labelAr: 'قائمة المعدات والمايكروفونات', style: 'outline' }
      ],
      tags: ['Dolby Atmos Certified', 'Vintage Neumann U47', 'Stem Mastering']
    },
    themeConfig: createThemeConfig('dark', '#090d12', '#10151c', '#10b981', '#f0f6fc', '#8b949e', '#059669', '#21262d', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'Sonar Sound | Professional Audio Recording & Dolby Atmos',
      metaDescription: 'Grammy-grade analog mixing and mastering facilities featuring legendary vintage hardware.',
      ogImageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_mus5_hero', 'SONAR RECORDING LAB', 'Where sonic clarity, warm harmonic saturation, and artistic vision unite.', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&auto=format&fit=crop&q=80', undefined, 'AUDIO MASTERING'),
      createVCardBlock('b_mus5_vcard', {
        fullName: 'Lucas Meyer',
        jobTitle: 'Chief Audio Engineer & Producer',
        company: 'Sonar Sound Studios',
        phone: '+49 30 555 0194',
        email: 'lucas@sonarsound.de',
        website: 'https://esaia.app',
        bio: 'Over 18 years engineering platinum records and immersive spatial audio.'
      })
    ]
  }
];
