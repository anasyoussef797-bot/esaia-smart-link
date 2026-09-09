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
// 7. HEALTH (الصحة والعيادات) - 5 Distinct Templates
// =========================================================================
export const healthTemplates: TemplateItem[] = [
  // 7.1 Pearly White Aesthetic Dental Studio (Crisp Medical Cyan & Platinum)
  {
    id: 'tpl_health_dental',
    title: 'Pearly White Aesthetic Dental Studio',
    subtitle: 'Invisible aligners, porcelain veneers & gentle dental implants in Beverly Hills',
    category: 'health',
    categoryName: 'Health',
    categoryNameAr: 'الصحة والعيادات',
    type: 'landing',
    isFeatured: true,
    badge: 'Aesthetic Dental',
    badgeAr: 'طب أسنان تجميلي',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdfa',
      cardBg: '#ffffff',
      accentColor: '#0d9488',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'PEARLY WHITE DENTAL',
      heroSubtitle: 'Transforming smiles with painless digital dentistry',
      buttons: [
        { label: 'Book Smile Consultation', labelAr: 'حجز كشف تجميل الأسنان', style: 'filled', color: '#0f766e' },
        { label: 'Before & After Gallery', labelAr: 'معرض الحالات والنتائج', style: 'outline' }
      ],
      tags: ['Invisalign Diamond', 'Laser Teeth Whitening', 'Digital Smile Design']
    },
    themeConfig: createThemeConfig('light', '#f7fdfc', '#ffffff', '#0d9488', '#0f172a', '#475569', '#0f766e', '#ccfbf1', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'Pearly White Dental | Cosmetic Dentistry & Orthodontics',
      metaDescription: 'State-of-the-art porcelain veneers, Invisalign clear aligners, and pain-free dental implants.',
      ogImageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_health1_hero', 'PEARLY WHITE DENTAL', 'Experience painless, anxiety-free dentistry designed around your comfort and confidence.', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1000&auto=format&fit=crop&q=80', undefined, 'COSMETIC DENTAL'),
      createButtonBlock('b_health1_btn', 'Schedule 3D Digital Smile Scan', 'https://wa.me/?text=Hello%20Pearly%20White%2C%20I%20want%20to%20book%20a%20consultation', 'primary'),
      createParagraphBlock('b_health1_stats', '✨ 12,000+ Smiles Perfected  |  🔬 3D iTero Digital Scanner  |  💤 Sedation Dentistry Options')
    ]
  },

  // 7.2 Pure Mind Mental Health & Integrative Psychiatry (Soothing Lavender & Deep Slate)
  {
    id: 'tpl_health_pure_mind',
    title: 'Pure Mind Therapy & Integrative Psychiatry',
    subtitle: 'Confidential psychodynamic therapy, CBT, anxiety relief & holistic burnout recovery',
    category: 'health',
    categoryName: 'Health',
    categoryNameAr: 'الصحة والعيادات',
    type: 'business_card',
    isFeatured: false,
    badge: 'Confidential',
    badgeAr: 'صحة نفسية',
    preview: {
      themePreset: 'light',
      headerBg: '#faf5ff',
      cardBg: '#ffffff',
      accentColor: '#7c3aed',
      textColor: '#1e1b4b',
      heroCoverUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'PURE MIND CLINIC',
      heroSubtitle: 'Safe, empathetic space for psychological healing and growth',
      buttons: [
        { label: 'Book Confidential Intake', labelAr: 'حجز جلسة استشارة خاصة', style: 'filled', color: '#6d28d9' },
        { label: 'Therapist Bios', labelAr: 'سير الأطباء والمعالجين', style: 'outline' }
      ],
      tags: ['Licensed PsyD', 'Telehealth & In-Person', 'Trauma-Informed']
    },
    themeConfig: createThemeConfig('light', '#faf8ff', '#ffffff', '#7c3aed', '#1e1b4b', '#6b7280', '#6d28d9', '#ede9fe', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Pure Mind Clinic | Psychology & Mental Wellness Counseling',
      metaDescription: 'Compassionate licensed therapists providing evidence-based psychotherapy and executive coaching.',
      ogImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_health2_hero', 'PURE MIND WELLNESS', 'Nurturing inner peace, psychological resilience, and emotional clarity.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80', undefined, 'MENTAL WELLNESS'),
      createVCardBlock('b_health2_vcard', {
        fullName: 'Dr. Elena Rostova, Psy.D.',
        jobTitle: 'Clinical Psychologist & Director',
        company: 'Pure Mind Institute',
        phone: '+1 (555) 019-8832',
        email: 'elena@puremind.health',
        website: 'https://esaia.app',
        bio: 'Specializing in high-performance anxiety, trauma recovery, and mindful cognitive therapy.'
      })
    ]
  },

  // 7.3 SpineAlign Orthopedic & Physical Therapy (Modern High-Tech Navy & Energetic Lime)
  {
    id: 'tpl_health_spine_align',
    title: 'SpineAlign Sports Rehab & Physical Therapy',
    subtitle: 'Relieve chronic back pain, restore joint mobility & return to peak athletic performance',
    category: 'health',
    categoryName: 'Health',
    categoryNameAr: 'الصحة والعيادات',
    type: 'landing',
    isFeatured: true,
    badge: 'Sports Rehab',
    badgeAr: 'علاج طبيعي',
    preview: {
      themePreset: 'dark',
      headerBg: '#0b1329',
      cardBg: '#132042',
      accentColor: '#84cc16',
      textColor: '#f8fafc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SPINEALIGN REHAB',
      heroSubtitle: 'Targeted physical therapy without surgery or endless painkillers',
      buttons: [
        { label: 'Schedule Mobility Exam', labelAr: 'فحص الحركية والمفاصل', style: 'filled', color: '#65a30d' },
        { label: 'Treatment Methods', labelAr: 'التقنيات العلاجية', style: 'outline' }
      ],
      tags: ['Dry Needling', 'Spinal Decompression', 'Sports Return-to-Play']
    },
    themeConfig: createThemeConfig('dark', '#080d1c', '#101a36', '#84cc16', '#f8fafc', '#94a3b8', '#65a30d', '#1d2f5e', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'SpineAlign | Physical Therapy & Orthopedic Rehabilitation',
      metaDescription: 'Doctor of Physical Therapy specialists helping patients overcome spine and joint pain naturally.',
      ogImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_health3_hero', 'SPINEALIGN PHYSICAL REHAB', 'Reclaim your active life without relying on medications or invasive surgery.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80', undefined, 'PHYSIOTHERAPY'),
      createButtonBlock('b_health3_btn', 'Book Comprehensive Initial Physical Exam', 'https://wa.me/?text=Hello%20SpineAlign%2C%20I%20need%20a%20physical%20therapy%20appointment', 'primary')
    ]
  },

  // 7.4 Vitality Longevity & Functional Medicine Clinic (Luxury Deep Jade & Gold)
  {
    id: 'tpl_health_vitality_longevity',
    title: 'Vitality Longevity & Functional Medicine',
    subtitle: 'Comprehensive bio-marker testing, NAD+ cellular infusions & personalized hormone balance',
    category: 'health',
    categoryName: 'Health',
    categoryNameAr: 'الصحة والعيادات',
    type: 'landing',
    isFeatured: false,
    badge: 'Biohacking & Age',
    badgeAr: 'طب وظيفي وطول عمر',
    preview: {
      themePreset: 'dark',
      headerBg: '#091a16',
      cardBg: '#112b24',
      accentColor: '#d4af37',
      textColor: '#f0fdf4',
      heroCoverUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'VITALITY LONGEVITY',
      heroSubtitle: 'Optimizing your biological age and vitality from the inside out',
      buttons: [
        { label: 'Order Full Biomarker Panel', labelAr: 'طلب فحص المؤشرات الحيوية الشامل', style: 'filled', color: '#d4af37' },
        { label: 'NAD+ IV Therapy', labelAr: 'محاليل NAD+ الوريدية', style: 'outline' }
      ],
      tags: ['120+ Blood Markers', 'Epigenetic Age Test', 'Executive Health Concierge']
    },
    themeConfig: createThemeConfig('dark', '#061310', '#0c211c', '#d4af37', '#f0fdf4', '#a7f3d0', '#f59e0b', '#184036', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Vitality Longevity | Functional Medicine & Bio-Optimization',
      metaDescription: 'Personalized anti-aging medicine, comprehensive genomic profiling, and cellular rejuvenation therapies.',
      ogImageUrl: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_health4_hero', 'VITALITY LONGEVITY CLINIC', 'Unlock your peak physiological performance and reverse biological age.', 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1000&auto=format&fit=crop&q=80', undefined, 'FUNCTIONAL MEDICINE'),
      createButtonBlock('b_health4_btn', 'Book Consultation with Functional Physician', 'https://esaia.app', 'primary')
    ]
  },

  // 7.5 Nurture Mother & Infant Postpartum Practice (Gentle Rose Powder & Warm Cream)
  {
    id: 'tpl_health_nurture_maternal',
    title: 'Nurture Maternal & Infant Care',
    subtitle: 'Certified lactation consulting, gentle infant sleep coaching & postpartum recovery',
    category: 'health',
    categoryName: 'Health',
    categoryNameAr: 'الصحة والعيادات',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Maternal Care',
    badgeAr: 'رعاية الأم والطفل',
    preview: {
      themePreset: 'beige',
      headerBg: '#fff1f2',
      cardBg: '#ffffff',
      accentColor: '#e11d48',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'NURTURE MATERNAL CARE',
      heroSubtitle: 'Caring support for every step of your motherhood journey',
      buttons: [
        { label: 'Book In-Home Lactation Visit', labelAr: 'زيارة منزلية لاستشارات الرضاعة', style: 'filled', color: '#e11d48' },
        { label: 'Gentle Sleep Plans', labelAr: 'خطط تنظيم نوم الرضع', style: 'outline' }
      ],
      tags: ['IBCLC Certified', 'Home Visits Available', 'Virtual Support']
    },
    themeConfig: createThemeConfig('beige', '#fff8f8', '#ffffff', '#e11d48', '#1c1917', '#78716c', '#f43f5e', '#fecdd3', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'full'),
    seo: {
      metaTitle: 'Nurture Maternal | Lactation Consultant & Postpartum Doula',
      metaDescription: 'Holistic feeding support, postpartum recovery, and loving guidance for new mothers.',
      ogImageUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_health5_hero', 'NURTURE MATERNAL CARE', 'Because you and your newborn deserve calm, compassionate support.', 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1000&auto=format&fit=crop&q=80', undefined, 'POSTPARTUM CARE'),
      createButtonBlock('b_health5_btn', 'Request Urgent Same-Day Lactation Consultation', 'https://wa.me/?text=Hi%20Nurture%2C%20I%20am%20seeking%20breastfeeding%20support', 'primary')
    ]
  }
];

// =========================================================================
// 8. BEAUTY (الجمال والعناية) - 5 Distinct Templates
// =========================================================================
export const beautyTemplates: TemplateItem[] = [
  // 8.1 Botanical Glow Organic Skincare (Natural Sage & Forest Gold)
  {
    id: 'tpl_bio_botanical',
    title: 'Botanical Glow - Organic Skin Sanctuary',
    subtitle: 'Wild-harvested cold-pressed plant oils, facial acupuncture & radiant hydration',
    category: 'beauty',
    categoryName: 'Beauty',
    categoryNameAr: 'الجمال والعناية',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Organic Glow',
    badgeAr: 'عناية عضوية',
    preview: {
      themePreset: 'light',
      headerBg: '#f2f7f4',
      cardBg: '#ffffff',
      accentColor: '#2d6a4f',
      textColor: '#1b4332',
      heroCoverUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'BOTANICAL GLOW',
      heroSubtitle: 'Rooted in botanical alchemy, formulated for enduring radiance',
      buttons: [
        { label: 'Shop Bestselling Elixirs', labelAr: 'شراء زيوت وإكسير البشرة', style: 'filled', color: '#2d6a4f' },
        { label: 'Skin Diagnostic Quiz', labelAr: 'اختبار تحديد نوع البشرة', style: 'outline' }
      ],
      tags: ['Cold-Pressed Jojoba', 'Rosehip Seed', 'Cruelty-Free Leaping Bunny']
    },
    themeConfig: createThemeConfig('light', '#f4f8f5', '#ffffff', '#2d6a4f', '#1b4332', '#52796f', '#40916c', '#d8f3dc', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Botanical Glow | Clean Organic Skincare & Facial Elixirs',
      metaDescription: '100% natural, active botanical skincare handcrafted to replenish the skin barrier.',
      ogImageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_beau1_hero', 'BOTANICAL GLOW SKINCARE', 'Pure botanical alchemy to nourish, restore, and illuminate your skin.', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1000&auto=format&fit=crop&q=80', undefined, 'NATURAL BEAUTY'),
      createButtonBlock('b_beau1_btn', 'Explore Our Award-Winning Barrier Serum', 'https://esaia.app', 'primary')
    ]
  },

  // 8.2 Sakura Cherry Blossom Nail & Hair Lounge (Delicate Blossom Pink & Pearl)
  {
    id: 'tpl_bio_cherry_blossom',
    title: 'Sakura Blossom - Tokyo Nail & Hair Atelier',
    subtitle: 'Japanese non-toxic gel nail art, Japanese head spa & scalp hydrotherapy',
    category: 'beauty',
    categoryName: 'Beauty',
    categoryNameAr: 'الجمال والعناية',
    type: 'landing',
    isFeatured: true,
    badge: 'Tokyo Head Spa',
    badgeAr: 'صالون ياباني',
    preview: {
      themePreset: 'light',
      headerBg: '#fff0f5',
      cardBg: '#ffffff',
      accentColor: '#db2777',
      textColor: '#37182b',
      heroCoverUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SAKURA BLOSSOM',
      heroSubtitle: 'Exquisite Japanese aesthetic nail artistry and calming scalp therapies',
      buttons: [
        { label: 'Book 90-Min Head Spa', labelAr: 'حجز جلسة هيد سبا ياباني', style: 'filled', color: '#db2777' },
        { label: 'Nail Art Lookbook', labelAr: 'كتالوج فن الأظافر والجل', style: 'outline' }
      ],
      tags: ['Organic Japanese Gels', 'Water Waterfall Spa', 'Private Treatment Pods']
    },
    themeConfig: createThemeConfig('light', '#fff5f8', '#ffffff', '#db2777', '#37182b', '#831843', '#f472b6', '#fce7f3', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Sakura Blossom | Japanese Head Spa & Tokyo Nail Atelier',
      metaDescription: 'Unwind with authentic Japanese scalp head spa and intricate handcrafted gel nail art.',
      ogImageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_beau2_hero', 'SAKURA BLOSSOM ATELIER', 'Step into serene Tokyo tranquility with soothing Japanese water therapies.', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&auto=format&fit=crop&q=80', undefined, 'JAPANESE HEAD SPA'),
      createButtonBlock('b_beau2_btn', 'Reserve Your Head Spa Session Online', 'https://wa.me/?text=Hello%20Sakura%20Blossom%2C%20I%20want%20to%20book%20a%20head%20spa', 'primary')
    ]
  },

  // 8.3 Noir Aesthetic & Laser Medical Spa (Dark Minimalist Platinum & Charcoal)
  {
    id: 'tpl_beauty_noir_medspa',
    title: 'Noir Aesthetic Laser & Medical Spa',
    subtitle: 'Morpheus8 radiofrequency, gentle laser hair removal, Botox & lip contouring',
    category: 'beauty',
    categoryName: 'Beauty',
    categoryNameAr: 'الجمال والعناية',
    type: 'landing',
    isFeatured: false,
    badge: 'Medical Aesthetics',
    badgeAr: 'تجميل وليزر',
    preview: {
      themePreset: 'dark',
      headerBg: '#0e0e11',
      cardBg: '#18181f',
      accentColor: '#c084fc',
      textColor: '#f8fafc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1512290900672-1f55a1532f74?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'NOIR MEDSPA',
      heroSubtitle: 'Clinical precision meets private luxury medical aesthetic care',
      buttons: [
        { label: 'Schedule Aesthetic Assessment', labelAr: 'كشف تجميلي استشاري', style: 'filled', color: '#9333ea' },
        { label: 'Treatment Pricing', labelAr: 'باقات جلسات الليزر', style: 'outline' }
      ],
      tags: ['Board-Certified MD', 'FDA Approved Lasers', 'Natural Results Only']
    },
    themeConfig: createThemeConfig('dark', '#0b0b0e', '#141419', '#c084fc', '#f8fafc', '#94a3b8', '#9333ea', '#27272a', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Noir Medspa | Advanced Aesthetic Lasers & Injectables',
      metaDescription: 'Physician-led laser rejuvenation, Morpheus8, dermal fillers, and subtle anti-aging artistry.',
      ogImageUrl: 'https://images.unsplash.com/photo-1512290900672-1f55a1532f74?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_beau3_hero', 'NOIR MEDICAL AESTHETICS', 'Clinical excellence delivering timeless, natural enhancements without overdone changes.', 'https://images.unsplash.com/photo-1512290900672-1f55a1532f74?w=1000&auto=format&fit=crop&q=80', undefined, 'MEDSPA'),
      createButtonBlock('b_beau3_btn', 'Book Consultation with Dr. Vivienne', 'https://wa.me/?text=Hello%20Noir%20Medspa%2C%20I%20am%20interested%20in%20a%20consultation', 'primary')
    ]
  },

  // 8.4 Barbers & Blades Traditional Gentlemans Parlor (Vintage Dark Walnut & Brass)
  {
    id: 'tpl_beauty_barbers_blades',
    title: 'Barbers & Blades Gentleman’s Parlor',
    subtitle: 'Hot towel straight-razor shaves, precision fades, beard sculpting & craft whiskey bar',
    category: 'beauty',
    categoryName: 'Beauty',
    categoryNameAr: 'الجمال والعناية',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Gentleman Grooming',
    badgeAr: 'صالون رجالي فاخر',
    preview: {
      themePreset: 'dark',
      headerBg: '#181412',
      cardBg: '#27201c',
      accentColor: '#d97706',
      textColor: '#fbf7f4',
      heroCoverUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'BARBERS & BLADES',
      heroSubtitle: 'Traditional hot towel shaves and master scissor craftsmanship',
      buttons: [
        { label: 'Book Barber Chair', labelAr: 'حجز مقعد حلاقة', style: 'filled', color: '#d97706' },
        { label: 'Beard Grooming Oils', labelAr: 'منتجات وزيوت اللحية', style: 'outline' }
      ],
      tags: ['Single-Blade Shaves', 'Complimentary Single-Malt', 'Hot Lather Face Massage']
    },
    themeConfig: createThemeConfig('dark', '#120f0d', '#1e1916', '#d97706', '#fbf7f4', '#a89d97', '#f59e0b', '#362c26', 'Space Grotesk', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Barbers & Blades | Luxury Men’s Barbering & Shave Parlor',
      metaDescription: 'Classic barber craftsmanship, straight razor hot towel shaves, and custom grooming for men.',
      ogImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_beau4_hero', 'BARBERS & BLADES', 'Rediscover the timeless gentleman’s ritual of a master straight-razor shave.', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1000&auto=format&fit=crop&q=80', undefined, 'GENTLEMAN BARBER'),
      createButtonBlock('b_beau4_btn', 'Book Your Chair for Today', 'https://esaia.app', 'primary')
    ]
  },

  // 8.5 GlowUp Permanent Makeup & Lash Artistry (Warm Terracotta, Coral & Champagne)
  {
    id: 'tpl_beauty_glowup_lash',
    title: 'GlowUp PMU & Russian Volume Lashes',
    subtitle: 'Ombre powder brows, lip blush tattooing, mega volume lash extensions & lash lifts',
    category: 'beauty',
    categoryName: 'Beauty',
    categoryNameAr: 'الجمال والعناية',
    type: 'business_card',
    isFeatured: false,
    badge: 'PMU & Lashes',
    badgeAr: 'مكياج دائم ورموش',
    preview: {
      themePreset: 'beige',
      headerBg: '#faf4ef',
      cardBg: '#ffffff',
      accentColor: '#f97316',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'GLOWUP BEAUTY',
      heroSubtitle: 'Wake up effortlessly gorgeous with bespoke permanent makeup',
      buttons: [
        { label: 'Book Brow Consultation', labelAr: 'استشارة رسم حواجب ميكروبليدنج', style: 'filled', color: '#ea580c' },
        { label: 'Healing & Aftercare', labelAr: 'إرشادات العناية بعد الجلسة', style: 'outline' }
      ],
      tags: ['PhiBrows Certified', 'Medical Pigments', 'Custom Lash Mapping']
    },
    themeConfig: createThemeConfig('beige', '#fdfaf6', '#ffffff', '#f97316', '#1c1917', '#78716c', '#ea580c', '#fed7aa', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'GlowUp Beauty | Microblading & Russian Volume Lashes',
      metaDescription: 'Expert microblading, powder brows, lip blush, and lightweight lash extensions.',
      ogImageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_beau5_hero', 'GLOWUP PERMANENT COSMETICS', 'Save 30 minutes every morning with perfectly contoured brows and lush lashes.', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1000&auto=format&fit=crop&q=80', undefined, 'PMU & LASHES'),
      createVCardBlock('b_beau5_vcard', {
        fullName: 'Yasmin Kabbani',
        jobTitle: 'Master PMU Artist & Lash Educator',
        company: 'GlowUp Beauty Atelier',
        phone: '+971 50 555 0184',
        email: 'yasmin@glowup.beauty',
        website: 'https://esaia.app',
        bio: 'PhiBrows certified with over 4,000 satisfied brow and lip transformations.'
      })
    ]
  }
];

// =========================================================================
// 9. PERSONAL PAGE (الصفحة الشخصية) - 5 Distinct Templates
// =========================================================================
export const personalTemplates: TemplateItem[] = [
  // 9.1 Pastel Aura Content Creator & Influencer (Dreamy Iridescent Lilac & Cotton Candy)
  {
    id: 'tpl_bio_pastel_aura',
    title: 'Pastel Aura - Creator & Visual Storyteller',
    subtitle: 'Daily lifestyle vlogs, aesthetic presets, brand partnerships, and beauty favorites',
    category: 'personal',
    categoryName: 'Personal page',
    categoryNameAr: 'الصفحة الشخصية',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Creator Bio',
    badgeAr: 'صانع محتوى',
    preview: {
      themePreset: 'light',
      headerBg: '#fbf7ff',
      cardBg: '#ffffff',
      accentColor: '#9333ea',
      textColor: '#2e1065',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'LARA VANCE',
      heroSubtitle: 'Sharing joy, design aesthetics, and mindful living routines',
      buttons: [
        { label: 'My Lightroom Presets Pack', labelAr: 'فلاتر لايتروم الاحترافية', style: 'filled', color: '#9333ea' },
        { label: 'Weekly Vlog on YouTube', labelAr: 'فلوج الأسبوع على يوتيوب', style: 'outline' }
      ],
      tags: ['850k Community', 'Aesthetic Lifestyle', 'Brand Collabs Open']
    },
    themeConfig: createThemeConfig('light', '#fbf8ff', '#ffffff', '#9333ea', '#2e1065', '#7e22ce', '#c084fc', '#f3e8ff', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'Lara Vance | Official Links, Presets & Collaborations',
      metaDescription: 'Connect with Lara Vance across YouTube, TikTok, and download exclusive Lightroom photo presets.',
      ogImageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_pers1_hero', 'LARA VANCE', 'Visual storyteller, lifestyle blogger, and creative consultant.', 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80', 'CREATOR'),
      createButtonBlock('b_pers1_btn1', 'Shop My Favorite Wardrobe & Beauty Picks', 'https://esaia.app', 'primary'),
      createButtonBlock('b_pers1_btn2', 'Brand Partnerships & Media Kit', 'https://wa.me/?text=Hi%20Lara%2C%20we%20have%20a%20brand%20collaboration%20proposal', 'outline')
    ]
  },

  // 9.2 Alexander Vance Venture Partner & Angel Investor (Executive Deep Onyx & Bronze)
  {
    id: 'tpl_pers_venture_investor',
    title: 'Alexander Vance - Angel Investor & Board Advisor',
    subtitle: 'Backing early-stage B2B SaaS, AI infrastructure, and fintech pioneers across EMEA',
    category: 'personal',
    categoryName: 'Personal page',
    categoryNameAr: 'الصفحة الشخصية',
    type: 'business_card',
    isFeatured: true,
    badge: 'Angel Investor',
    badgeAr: 'مستثمر ملائكي',
    preview: {
      themePreset: 'dark',
      headerBg: '#0e1014',
      cardBg: '#181b22',
      accentColor: '#c5a059',
      textColor: '#f8fafc',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ALEXANDER VANCE',
      heroSubtitle: 'Venture Partner @ Horizon Capital | 4x Exited Founder',
      buttons: [
        { label: 'Submit Pitch Deck', labelAr: 'تقديم العرض الاستثماري (Deck)', style: 'filled', color: '#c5a059' },
        { label: 'Portfolio Companies', labelAr: 'الشركات الممولة', style: 'outline' }
      ],
      tags: ['Series Seed - Series A', '$250k - $2M Cheques', 'AI & FinTech Focus']
    },
    themeConfig: createThemeConfig('dark', '#0a0c0f', '#13161c', '#c5a059', '#f8fafc', '#94a3b8', '#dfb76c', '#252a36', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Alexander Vance | Venture Investor & Startup Advisor',
      metaDescription: 'Personal portfolio, investment thesis, and contact dossier for Alexander Vance.',
      ogImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_pers2_hero', 'ALEXANDER VANCE', 'Investing in visionary founders building generational technological infrastructure.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'INVESTOR'),
      createVCardBlock('b_pers2_vcard', {
        fullName: 'Alexander Vance',
        jobTitle: 'Managing Partner',
        company: 'Horizon Ventures',
        phone: '+1 (415) 555-0199',
        email: 'alexander@horizonvc.com',
        website: 'https://esaia.app',
        bio: 'Angel investor in 40+ startups with 4 unicorns. Focusing on agentic AI and cloud infra.'
      })
    ]
  },

  // 9.3 Maya Lin Senior Product Designer & Writer (Clean Swiss Editorial Monochrome)
  {
    id: 'tpl_pers_swiss_designer',
    title: 'Maya Lin - Principal Product Designer',
    subtitle: 'Crafting complex design systems, spatial computing interfaces & design engineering',
    category: 'personal',
    categoryName: 'Personal page',
    categoryNameAr: 'الصفحة الشخصية',
    type: 'landing',
    isFeatured: false,
    badge: 'Swiss Editorial',
    badgeAr: 'تصميم منتجات',
    preview: {
      themePreset: 'light',
      headerBg: '#ffffff',
      cardBg: '#f8fafc',
      accentColor: '#0f172a',
      textColor: '#0f172a',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'MAYA LIN',
      heroSubtitle: 'Designing digital tools that give humans superpowers',
      buttons: [
        { label: 'Read Selected Case Studies', labelAr: 'دراسات الحالة والمشاريع', style: 'filled', color: '#0f172a' },
        { label: 'Substack Essays on Design', labelAr: 'مقالات التصميم على Substack', style: 'outline' }
      ],
      tags: ['Figma Community Creator', 'Former Staff @ Stripe', 'Design Tokens']
    },
    themeConfig: createThemeConfig('light', '#ffffff', '#f8fafc', '#0f172a', '#0f172a', '#64748b', '#334155', '#e2e8f0', 'Space Grotesk', 'Space Grotesk', 'filled', 'none'),
    seo: {
      metaTitle: 'Maya Lin | Principal Product Designer & Systems Architect',
      metaDescription: 'Interactive design portfolio, case studies on fin-tech platforms, and design writing.',
      ogImageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_pers3_hero', 'MAYA LIN', 'High-craft digital interfaces, precision typography, and scalable design architecture.', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'PRODUCT DESIGN'),
      createButtonBlock('b_pers3_btn', 'Explore Interactive Design Portfolio & Prototypes', 'https://esaia.app', 'primary')
    ]
  },

  // 9.4 Chef Tariq Culinary Influencer & Cookbook Author (Warm Terracotta & Saffron)
  {
    id: 'tpl_pers_chef_tariq',
    title: 'Chef Tariq - Culinary Arts & Recipes',
    subtitle: 'Modern Middle Eastern fusion gastronomy, masterclasses, and best-selling cookbooks',
    category: 'personal',
    categoryName: 'Personal page',
    categoryNameAr: 'الصفحة الشخصية',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Master Chef',
    badgeAr: 'شيف ومؤلف',
    preview: {
      themePreset: 'beige',
      headerBg: '#fcf6ee',
      cardBg: '#ffffff',
      accentColor: '#c2410c',
      textColor: '#292524',
      avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'CHEF TARIQ',
      heroSubtitle: 'Celebrating vibrant Levant spices with modern culinary artistry',
      buttons: [
        { label: 'Order Signed Cookbook', labelAr: 'طلب كتاب الطبخ الموقع', style: 'filled', color: '#c2410c' },
        { label: 'Online Cooking Masterclass', labelAr: 'كورس الطبخ أونلاين', style: 'outline' }
      ],
      tags: ['NYT Best Seller', 'MasterChef Finalist', 'Artisan Spices Line']
    },
    themeConfig: createThemeConfig('beige', '#fdf8f2', '#ffffff', '#c2410c', '#292524', '#78716c', '#ea580c', '#fed7aa', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Chef Tariq | Modern Levant Recipes & Masterclasses',
      metaDescription: 'Discover chef-crafted spice blends, seasonal recipes, and culinary video tutorials.',
      ogImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_pers4_hero', 'CHEF TARIQ CULINARY', 'Bringing the intoxicating aromas and warmth of Levantine heritage to your home table.', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&auto=format&fit=crop&q=80', 'CULINARY ART'),
      createButtonBlock('b_pers4_btn', 'Order "Saffron & Salt" Cookbook with Free Apron', 'https://esaia.app', 'primary')
    ]
  },

  // 9.5 Dr. Sarah Jenkins Keynote Speaker & Neuroscientist (Deep Royal Sapphire & Ice White)
  {
    id: 'tpl_pers_keynote_speaker',
    title: 'Dr. Sarah Jenkins - Keynote Speaker',
    subtitle: 'Neuroscience of decision making, high-pressure resilience & executive brain health',
    category: 'personal',
    categoryName: 'Personal page',
    categoryNameAr: 'الصفحة الشخصية',
    type: 'landing',
    isFeatured: true,
    badge: 'TEDx Speaker',
    badgeAr: 'متحدث رئيسي',
    preview: {
      themePreset: 'dark',
      headerBg: '#0a1226',
      cardBg: '#131e3d',
      accentColor: '#38bdf8',
      textColor: '#ffffff',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'DR. SARAH JENKINS',
      heroSubtitle: 'Demystifying the brain for world-class executive teams and summit stages',
      buttons: [
        { label: 'Check Speaking Availability', labelAr: 'حجز موعد للمؤتمرات والقمم', style: 'filled', color: '#0284c7' },
        { label: 'Watch 2026 Keynote Reel', labelAr: 'مشاهدة مقاطع المحاضرات', style: 'outline' }
      ],
      tags: ['Oxford PhD', '3x TEDx Speaker', 'Fortune 500 Advisor']
    },
    themeConfig: createThemeConfig('dark', '#070c1a', '#101830', '#38bdf8', '#f8fafc', '#93c5fd', '#0284c7', '#1c294e', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Dr. Sarah Jenkins | Neuroscience Keynote Speaker',
      metaDescription: 'Book Dr. Sarah Jenkins for global corporate summits on neuro-resilience, focus, and cognitive stamina.',
      ogImageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_pers5_hero', 'DR. SARAH JENKINS', 'Translating cutting-edge cognitive neuroscience into peak leadership performance.', 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80', 'KEYNOTE SPEAKER'),
      createButtonBlock('b_pers5_btn', 'Inquire About Keynote Availability for 2026', 'https://wa.me/?text=Hi%20Dr.%20Sarah%2C%20we%20want%20to%20invite%20you%20as%20a%20speaker', 'primary')
    ]
  }
];
