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
// 1. AUTO (السيارات والمحركات) - 5 Distinct Templates
// =========================================================================
export const autoTemplates: TemplateItem[] = [
  // 1.1 Apex Ceramic & Detailing Studio (Dark Carbon & Crimson)
  {
    id: 'tpl_auto_detailing',
    title: 'Apex Detailing & Ceramic Studio',
    subtitle: 'Ceramic coatings, paint protection film & bespoke automotive styling',
    category: 'auto',
    categoryName: 'Auto',
    categoryNameAr: 'السيارات والمحركات',
    type: 'landing',
    isFeatured: true,
    badge: 'Pro Fleet',
    badgeAr: 'احترافي',
    preview: {
      themePreset: 'dark',
      headerBg: '#0b0c10',
      cardBg: '#15171e',
      accentColor: '#ef4444',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'APEX CERAMIC LAB',
      heroSubtitle: 'Master automotive surface preservation',
      buttons: [
        { label: 'Book Ceramic Package', labelAr: 'حجز باقة النانو سيراميك', style: 'filled', color: '#ef4444' },
        { label: 'Gallery & Work', labelAr: 'معرض الأعمال السابقة', style: 'outline' }
      ],
      tags: ['9H Graphene Coating', 'Paint Correction', 'Interior Detailing']
    },
    themeConfig: createThemeConfig('dark', '#090a0f', '#13151f', '#ef4444', '#f8fafc', '#94a3b8', '#dc2626', '#1e2230', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'Apex Detailing | High-End Paint Protection & Ceramic Lab',
      metaDescription: 'Certified 9H ceramic coating and paint protection film installation studio.',
      ogImageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_auto1_hero', 'APEX CERAMIC LAB', 'Certified 9H Graphene & Paint Protection Film Studio', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1000&auto=format&fit=crop&q=80', undefined, 'PREMIUM DETAILING'),
      createButtonBlock('b_auto1_btn', 'Book Paint Correction Assessment', 'https://wa.me/?text=Hi!%20I%20want%20to%20book%20a%20detailing%20inspection', 'primary'),
      createParagraphBlock('b_auto1_stats', '🏎️ 1,200+ Supercars Protected  |  💎 5-Year Graphene Warranty  |  ⏱️ 48-Hour Turnaround'),
      createHeadingBlock('b_auto1_h2', 'Our Specialist Protection Treatments', 'h2'),
      createWhatsAppBlock('b_auto1_wa', '+18005550190', 'Instant WhatsApp Consultation', 'Hello Apex team, I need a quote for ceramic coating.')
    ]
  },

  // 1.2 German Auto Meister & Repair Garage (Industrial Clean Titanium & Cyan)
  {
    id: 'tpl_auto_german_meister',
    title: 'MeisterWerk German Auto Care',
    subtitle: 'Factory-certified diagnostics, engine tuning & precision maintenance',
    category: 'auto',
    categoryName: 'Auto',
    categoryNameAr: 'السيارات والمحركات',
    type: 'landing',
    isFeatured: false,
    badge: 'Precision',
    badgeAr: 'صيانة متقدمة',
    preview: {
      themePreset: 'dark',
      headerBg: '#0f172a',
      cardBg: '#1e293b',
      accentColor: '#38bdf8',
      textColor: '#f8fafc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'MEISTERWERK AUTO',
      heroSubtitle: 'Certified Porsche, BMW & Mercedes Specialist',
      buttons: [
        { label: 'Schedule Diagnostic Scan', labelAr: 'فحص كمبيوتر معتمد', style: 'filled', color: '#0284c7' },
        { label: 'Our Guarantee', labelAr: 'الضمان المعتمد', style: 'outline' }
      ],
      tags: ['OEM Parts', 'ECU Remapping', 'Transmission Specialist']
    },
    themeConfig: createThemeConfig('dark', '#0b1120', '#162032', '#38bdf8', '#f8fafc', '#94a3b8', '#0284c7', '#223048', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'MeisterWerk | German Car Specialist & Diagnostics',
      metaDescription: 'Specialist service center for European marques with dealer-level diagnostics.',
      ogImageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_auto2_hero', 'MEISTERWERK GARAGE', 'Dealer-level German engineering & maintenance without dealer markups.', 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1000&auto=format&fit=crop&q=80', undefined, 'EUROPEAN SPECIALIST'),
      createButtonBlock('b_auto2_btn', 'Book Service Appointment', 'https://wa.me/?text=Hello%20MeisterWerk%2C%20I%20need%20a%20service%20slot', 'primary'),
      createParagraphBlock('b_auto2_info', '🛠️ 100% Genuine OEM Parts  |  💻 Factory Star & ISTA Diagnostics  |  🛡️ 2-Year Part Warranty')
    ]
  },

  // 1.3 Velocity Exotic Car Rental & Chauffeur (Luxury Dark Gold & Obsidian)
  {
    id: 'tpl_auto_velocity_rentals',
    title: 'Velocity Supercar & Chauffeur Hire',
    subtitle: 'Fleet of Lamborghinis, Ferraris, and Rolls-Royces for VIP occasions',
    category: 'auto',
    categoryName: 'Auto',
    categoryNameAr: 'السيارات والمحركات',
    type: 'landing',
    isFeatured: true,
    badge: 'Luxury VIP',
    badgeAr: 'فخامة VIP',
    preview: {
      themePreset: 'dark',
      headerBg: '#121214',
      cardBg: '#1c1d22',
      accentColor: '#d4af37',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'VELOCITY FLEET',
      heroSubtitle: 'Drive the world’s most coveted supercars',
      buttons: [
        { label: 'View Available Fleet', labelAr: 'استعراض الأسطول المتاح', style: 'filled', color: '#d4af37' },
        { label: 'Airport VIP Transfer', labelAr: 'توصيل مطار VIP', style: 'outline' }
      ],
      tags: ['Zero Deposit Options', 'Doorstep Delivery', '24/7 Concierge']
    },
    themeConfig: createThemeConfig('dark', '#0c0d10', '#181920', '#d4af37', '#fbfbfb', '#a3a3a3', '#f59e0b', '#2a2b34', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Velocity Supercar Rentals | Exotic Car Hire & Chauffeur',
      metaDescription: 'Drive Ferrari, Lamborghini, and Rolls-Royce. Instant delivery to your hotel or airport.',
      ogImageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_auto3_hero', 'VELOCITY EXOTICS', 'Drive luxury without limits. White-glove concierge delivery anywhere in the city.', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1000&auto=format&fit=crop&q=80', undefined, 'EXOTIC HIRE'),
      createButtonBlock('b_auto3_btn', 'Reserve Your Supercar on WhatsApp', 'https://wa.me/?text=Hi%2C%20I%20would%20like%20to%20rent%20a%20luxury%20car', 'primary'),
      createParagraphBlock('b_auto3_stats', '⭐ 5.0 Star VIP Trust  |  🔑 24-Hour Instant Delivery  |  🏎️ 45+ Exotic Models in Stock')
    ]
  },

  // 1.4 EcoVolt Mobile EV Fleet & Charging (Clean Eco Light Teal & White)
  {
    id: 'tpl_auto_ecovolt_ev',
    title: 'EcoVolt Mobile EV Rapid Charging',
    subtitle: 'On-demand roadside electric vehicle boost & home wallbox installations',
    category: 'auto',
    categoryName: 'Auto',
    categoryNameAr: 'السيارات والمحركات',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Eco Smart',
    badgeAr: 'طاقة نظيفة',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdf4',
      cardBg: '#ffffff',
      accentColor: '#10b981',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ECOVOLT CHARGING',
      heroSubtitle: 'Emergency roadside power & home charging solutions',
      buttons: [
        { label: 'Request Mobile Charge', labelAr: 'طلب شحن طوارئ متنقل', style: 'filled', color: '#059669' },
        { label: 'Buy Home Wallbox', labelAr: 'شراء شاحن منزلي', style: 'outline' }
      ],
      tags: ['Rapid 50kW Boost', 'All EV Standards', '15-Min Response']
    },
    themeConfig: createThemeConfig('light', '#f8fafc', '#ffffff', '#10b981', '#0f172a', '#64748b', '#059669', '#e2e8f0', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'EcoVolt | Mobile EV Charging & Roadside Power',
      metaDescription: 'Never get stranded with low battery. Fast mobile charging dispatched to your exact GPS coordinates.',
      ogImageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_auto4_hero', 'ECOVOLT MOBILE CHARGE', 'Clean, fast roadside rescue for all electric vehicles.', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1000&auto=format&fit=crop&q=80', undefined, 'EV RESCUE'),
      createButtonBlock('b_auto4_btn', 'SOS Immediate Mobile Charge (GPS)', 'https://wa.me/?text=Emergency%20EV%20charge%20needed%20at%20my%20location', 'primary'),
      createParagraphBlock('b_auto4_info', '⚡ 50kW DC Rapid Mobile Charging  |  🔋 Adds 50km in 15 mins  |  📱 Realtime GPS Dispatch')
    ]
  },

  // 1.5 Heritage Classic Motors Appraisal & Restoration (Warm Antique Cream & British Racing Green)
  {
    id: 'tpl_auto_heritage_classic',
    title: 'Heritage Classic Motorworks',
    subtitle: 'Vintage automobile restoration, provenance research & auction appraisal',
    category: 'auto',
    categoryName: 'Auto',
    categoryNameAr: 'السيارات والمحركات',
    type: 'business_card',
    isFeatured: false,
    badge: 'Vintage',
    badgeAr: 'كلاسيكي',
    preview: {
      themePreset: 'beige',
      headerBg: '#f5f0eb',
      cardBg: '#ffffff',
      accentColor: '#166534',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'HERITAGE MOTORWORKS',
      heroSubtitle: 'Concourse-grade historic car preservation',
      buttons: [
        { label: 'Request Appraisal', labelAr: 'طلب تقييم سيارة كلاسيكية', style: 'filled', color: '#166534' },
        { label: 'Past Restorations', labelAr: 'سجل الترميمات الموثقة', style: 'outline' }
      ],
      tags: ['FIVA Certified', 'Historic Provenance', 'Barn Find Recovery']
    },
    themeConfig: createThemeConfig('beige', '#faf7f2', '#ffffff', '#166534', '#1c1917', '#78716c', '#15803d', '#e7dfd5', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Heritage Classic Motorworks | Vintage Restoration & Valuation',
      metaDescription: 'Specialist preservation of 1950s-1980s automotive icons and historic sports cars.',
      ogImageUrl: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_auto5_hero', 'HERITAGE MOTORWORKS', 'Preserving timeless mechanical art with historic accuracy.', 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1000&auto=format&fit=crop&q=80', undefined, 'VINTAGE RESTORATION'),
      createVCardBlock('b_auto5_vcard', {
        fullName: 'Arthur Pendelton',
        jobTitle: 'Head of Classic Provenance',
        company: 'Heritage Motorworks LLC',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        phone: '+1 (555) 019-3321',
        email: 'arthur@heritagemotors.com',
        website: 'https://esaia.app',
        bio: 'FIVA certified judge and classic Jaguar & Porsche provenance historian.'
      })
    ]
  }
];

// =========================================================================
// 2. KIDS (الأطفال والتعليم) - 5 Distinct Templates
// =========================================================================
export const kidsTemplates: TemplateItem[] = [
  // 2.1 Little Stars Montessori Early Learning (Soft Pastel Peach & Mint)
  {
    id: 'tpl_kids_montessori',
    title: 'Little Stars Montessori Academy',
    subtitle: 'Nurturing curiosity, sensory discovery, and bilingual early development',
    category: 'kids',
    categoryName: 'Kids',
    categoryNameAr: 'الأطفال والتعليم',
    type: 'landing',
    isFeatured: true,
    badge: 'Montessori',
    badgeAr: 'مونتيسوري',
    preview: {
      themePreset: 'beige',
      headerBg: '#fff7ed',
      cardBg: '#ffffff',
      accentColor: '#f97316',
      textColor: '#1e293b',
      heroCoverUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'LITTLE STARS',
      heroSubtitle: 'Where young minds blossom with joy and independence',
      buttons: [
        { label: 'Book a Campus Tour', labelAr: 'حجز جولة في الروضة', style: 'filled', color: '#ea580c' },
        { label: 'Curriculum Guide', labelAr: 'دليل المنهج الدراسي', style: 'outline' }
      ],
      tags: ['Ages 18m - 6 yrs', 'Bilingual English & Arabic', 'Organic Kitchen']
    },
    themeConfig: createThemeConfig('beige', '#fffaf5', '#ffffff', '#ea580c', '#1e293b', '#64748b', '#f97316', '#fed7aa', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'Little Stars Montessori | Premier Early Childhood Learning',
      metaDescription: 'Child-centered Montessori education fostering joyful discovery and natural creativity.',
      ogImageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_kids1_hero', 'LITTLE STARS MONTESSORI', 'A loving haven for your child to explore, learn, and grow confidently.', 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1000&auto=format&fit=crop&q=80', undefined, 'EARLY CHILDHOOD'),
      createButtonBlock('b_kids1_btn', 'Schedule an In-Person Campus Tour', 'https://wa.me/?text=Hello%20Little%20Stars%2C%20I%20would%20like%20to%20visit%20your%20nursery', 'primary'),
      createParagraphBlock('b_kids1_stats', '🌱 1:4 Teacher Ratio  |  🎨 Daily Art & Sensory Play  |  🍎 100% Chef-Prepared Fresh Meals')
    ]
  },

  // 2.2 Junior STEM & Robotics Lab (Vibrant Electric Cyan & Solar Yellow)
  {
    id: 'tpl_kids_stem_robotics',
    title: 'RoboKids STEM & Coding Lab',
    subtitle: 'Hands-on robotics, scratch coding, and maker workshops for kids ages 6-14',
    category: 'kids',
    categoryName: 'Kids',
    categoryNameAr: 'الأطفال والتعليم',
    type: 'landing',
    isFeatured: false,
    badge: 'Robotics',
    badgeAr: 'روبوتات وبرمجة',
    preview: {
      themePreset: 'dark',
      headerBg: '#0f172a',
      cardBg: '#1e293b',
      accentColor: '#38bdf8',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ROBOKIDS LAB',
      heroSubtitle: 'Empowering future engineers through play',
      buttons: [
        { label: 'Free Trial Class', labelAr: 'حصة تجريبية مجانية', style: 'filled', color: '#0284c7' },
        { label: 'Weekend Clubs', labelAr: 'نوادي نهاية الأسبوع', style: 'outline' }
      ],
      tags: ['LEGO Spike', 'Python for Kids', 'Drone Building']
    },
    themeConfig: createThemeConfig('dark', '#090d16', '#141d2e', '#38bdf8', '#f8fafc', '#94a3b8', '#eab308', '#202d44', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'RoboKids Lab | STEM Robotics & Coding for Kids',
      metaDescription: 'Hands-on robotics and coding bootcamps for children to build real working inventions.',
      ogImageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_kids2_hero', 'ROBOKIDS STEM LAB', 'Build robots. Write real code. Invent the future today.', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80', undefined, 'FUTURE ENGINEERS'),
      createButtonBlock('b_kids2_btn', 'Book a Free Saturday Trial Session', 'https://wa.me/?text=Hi%2C%20I%20want%20to%20enroll%20my%20child%20in%20a%20free%20trial', 'primary')
    ]
  },

  // 2.3 Happy Smiles Pediatric Therapy (Gentle Medical Mint & Lavender)
  {
    id: 'tpl_kids_pediatric_therapy',
    title: 'Happy Smiles Pediatric Therapy',
    subtitle: 'Child speech therapy, occupational development & sensory integration',
    category: 'kids',
    categoryName: 'Kids',
    categoryNameAr: 'الأطفال والتعليم',
    type: 'business_card',
    isFeatured: false,
    badge: 'Therapy',
    badgeAr: 'علاج ونطق',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdf4',
      cardBg: '#ffffff',
      accentColor: '#10b981',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'HAPPY SMILES THERAPY',
      heroSubtitle: 'Gentle, compassionate child developmental care',
      buttons: [
        { label: 'Initial Evaluation', labelAr: 'حجز جلسة تقييم شاملة', style: 'filled', color: '#059669' },
        { label: 'Our Specialists', labelAr: 'أخصائيو المركز', style: 'outline' }
      ],
      tags: ['Speech Therapy', 'Sensory Gym', 'Autism Support']
    },
    themeConfig: createThemeConfig('light', '#f4fbf7', '#ffffff', '#10b981', '#0f172a', '#475569', '#059669', '#d1fae5', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'Happy Smiles | Pediatric Speech & Occupational Therapy',
      metaDescription: 'Accredited therapists guiding children towards confident communication and physical milestones.',
      ogImageUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_kids3_hero', 'HAPPY SMILES PEDIATRIC', 'Empowering every child with voice, movement, and joy.', 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1000&auto=format&fit=crop&q=80', undefined, 'CHILD DEVELOPMENT'),
      createVCardBlock('b_kids3_vcard', {
        fullName: 'Dr. Sarah Al-Mansoor, SLP',
        jobTitle: 'Lead Pediatric Speech Pathologist',
        company: 'Happy Smiles Center',
        phone: '+971 4 555 0192',
        email: 'dr.sarah@happysmiles.ae',
        bio: '15 years specializing in early childhood language acquisition and sensory therapy.'
      })
    ]
  },

  // 2.4 WonderKids Birthday Adventures & Parties (Festive Candy Coral & Golden Sun)
  {
    id: 'tpl_kids_birthday_adventures',
    title: 'WonderKids Parties & Magic Events',
    subtitle: 'Magical theme parties, entertainers, bouncy castles & gourmet treat stations',
    category: 'kids',
    categoryName: 'Kids',
    categoryNameAr: 'الأطفال والتعليم',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Fun Parties',
    badgeAr: 'حفلات ومناسبات',
    preview: {
      themePreset: 'light',
      headerBg: '#fff1f2',
      cardBg: '#ffffff',
      accentColor: '#f43f5e',
      textColor: '#1e1b4b',
      heroCoverUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'WONDERKIDS CELEBRATIONS',
      heroSubtitle: 'Unforgettable birthday magic planned to perfection',
      buttons: [
        { label: 'Check Date Availability', labelAr: 'التحقق من توفر الموعد', style: 'filled', color: '#e11d48' },
        { label: 'View Party Packages', labelAr: 'باقات أعياد الميلاد', style: 'outline' }
      ],
      tags: ['Face Painting', 'Custom Themes', 'Safety Certified Staff']
    },
    themeConfig: createThemeConfig('light', '#fff5f5', '#ffffff', '#f43f5e', '#1e1b4b', '#64748b', '#fb7185', '#fecdd3', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'WonderKids Celebrations | Luxury Kids Birthday Parties',
      metaDescription: 'Complete stress-free birthday party planning with entertainment and custom decorations.',
      ogImageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_kids4_hero', 'WONDERKIDS CELEBRATIONS', 'We create pure childhood wonder and memories that last forever.', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&auto=format&fit=crop&q=80', undefined, 'PARTY PLANNING'),
      createButtonBlock('b_kids4_btn', 'Select Party Theme & Get Custom Quote', 'https://wa.me/?text=Hi%20WonderKids%2C%20I%20am%20planning%20a%20birthday%20party', 'primary')
    ]
  },

  // 2.5 Tiny Tots Organic Baby & Toddler Boutique (Warm Minimalist Linen & Oat)
  {
    id: 'tpl_kids_organic_baby',
    title: 'Tiny Tots Organic Baby Store',
    subtitle: 'GOTS certified organic cotton clothes, wooden toys & eco nursery essentials',
    category: 'kids',
    categoryName: 'Kids',
    categoryNameAr: 'الأطفال والتعليم',
    type: 'landing',
    isFeatured: false,
    badge: 'Organic',
    badgeAr: 'عضوي وطبيعي',
    preview: {
      themePreset: 'beige',
      headerBg: '#faf5ef',
      cardBg: '#ffffff',
      accentColor: '#854d0e',
      textColor: '#292524',
      heroCoverUrl: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'TINY TOTS ORGANIC',
      heroSubtitle: 'Gentle on sensitive skin, gentle on the Earth',
      buttons: [
        { label: 'Shop Newborn Collection', labelAr: 'تشكيلة المواليد الجدد', style: 'filled', color: '#a16207' },
        { label: 'Baby Registry', labelAr: 'قائمة هدايا المواليد', style: 'outline' }
      ],
      tags: ['100% GOTS Cotton', 'Non-Toxic Dyes', 'Handmade Wood Toys']
    },
    themeConfig: createThemeConfig('beige', '#fdfbf7', '#ffffff', '#854d0e', '#292524', '#78716c', '#ca8a04', '#e7dfd5', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Tiny Tots Organic | Sustainable Baby & Toddler Essentials',
      metaDescription: 'Chemical-free baby clothing, safe teething toys, and minimalist nursery decor.',
      ogImageUrl: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_kids5_hero', 'TINY TOTS ORGANIC', 'Only the purest organic fabrics for your precious little miracle.', 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=1000&auto=format&fit=crop&q=80', undefined, 'ORGANIC BABY'),
      createButtonBlock('b_kids5_btn', 'Explore New Spring Wardrobe', 'https://esaia.app', 'primary')
    ]
  }
];

// =========================================================================
// 3. DESIGN (التصميم والديكور) - 5 Distinct Templates
// =========================================================================
export const designTemplates: TemplateItem[] = [
  // 3.1 Tattoom Modern Dark Ink Studio (Dark Editorial Yellow & Obsidian)
  {
    id: 'tpl_tattoo_studio',
    title: 'Tattoom - Modern Ink Studio',
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
        { label: 'Free Consultation', labelAr: 'استشارة وتصميم مجاني', style: 'filled', color: '#eab308' },
        { label: 'View Portfolio', labelAr: 'معرض الرسومات', style: 'outline' }
      ],
      tags: ['Idea', 'Style', 'Sterile Space', '3D Preview']
    },
    themeConfig: createThemeConfig('dark', '#0b0b0e', '#141419', '#eab308', '#f8fafc', '#a1a1aa', '#facc15', '#27272a', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'Tattoom | Custom Tattoo Artistry & Piercing NYC',
      metaDescription: 'Bespoke realism, fine-line, and micro-tattoo artistry with medical-grade sterilization.',
      ogImageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_des1_hero', 'TATTOOM STUDIO', 'Where personal identity becomes enduring living art.', 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1000&auto=format&fit=crop&q=80', undefined, 'FINE ART INK'),
      createButtonBlock('b_des1_btn', 'Book Your Free Custom Sketch Consultation', 'https://wa.me/?text=Hi%20Tattoom%2C%20I%20have%20an%20idea%20for%20a%20tattoo', 'primary')
    ]
  },

  // 3.2 Studio Form Minimalist Architecture (Minimal Sage, Concrete & White)
  {
    id: 'tpl_bio_minimalist_sage',
    title: 'Studio Form - Minimalist Architecture',
    subtitle: 'Restrained Scandinavian aesthetics, organic textures & spatial harmony',
    category: 'design',
    categoryName: 'Design',
    categoryNameAr: 'التصميم والديكور',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Nordic Pure',
    badgeAr: 'نقاء إسكندنافي',
    preview: {
      themePreset: 'light',
      headerBg: '#f2f5f3',
      cardBg: '#ffffff',
      accentColor: '#4f7262',
      textColor: '#1f2923',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'STUDIO FORM',
      heroSubtitle: 'Spatial clarity, sustainable materials, and timeless light',
      buttons: [
        { label: 'View Recent Built Projects', labelAr: 'مشاريعنا المنفذة حديثاً', style: 'filled', color: '#4f7262' },
        { label: 'Design Inquiries', labelAr: 'استفسارات التصميم المعماري', style: 'outline' }
      ],
      tags: ['Passive Solar', 'Timber Craft', 'Minimal Interior']
    },
    themeConfig: createThemeConfig('light', '#f5f7f5', '#ffffff', '#4f7262', '#1f2923', '#5a6860', '#3b5549', '#dde5e0', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'Studio Form | Minimal Architecture & Interior Design',
      metaDescription: 'Creating serene residential sanctuaries that honor natural materials and daylight.',
      ogImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_des2_hero', 'STUDIO FORM ARCHITECTURE', 'Quiet elegance and sustainable architecture grounded in Scandinavian minimalism.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'ARCHITECTURE'),
      createButtonBlock('b_des2_btn', 'Explore 2026 Residential Portfolio', 'https://esaia.app', 'primary')
    ]
  },

  // 3.3 Chroma Brand Identity & Neo-Brutalist Visual Lab (Bold Electric Violet & Neon Lime)
  {
    id: 'tpl_design_chroma_branding',
    title: 'Chroma Identity & Motion Lab',
    subtitle: 'Award-winning brand identities, packaging design & kinetic typography',
    category: 'design',
    categoryName: 'Design',
    categoryNameAr: 'التصميم والديكور',
    type: 'landing',
    isFeatured: false,
    badge: 'Neo Studio',
    badgeAr: 'هوية بصرية',
    preview: {
      themePreset: 'dark',
      headerBg: '#130c24',
      cardBg: '#21153b',
      accentColor: '#a855f7',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'CHROMA LAB',
      heroSubtitle: 'Bold design for brands that refuse to be ignored',
      buttons: [
        { label: 'Start Brand Discovery', labelAr: 'بدء بناء الهوية البصرية', style: 'filled', color: '#9333ea' },
        { label: 'Behance Showreel', labelAr: 'معرض الأعمال Behance', style: 'outline' }
      ],
      tags: ['Brand Systems', '3D Packaging', 'Design Tokens']
    },
    themeConfig: createThemeConfig('dark', '#0e081a', '#1a1030', '#a855f7', '#fdf4ff', '#d8b4fe', '#c084fc', '#3b2068', 'Space Grotesk', 'Space Grotesk', 'filled', 'none'),
    seo: {
      metaTitle: 'Chroma Visual Lab | Brand Identity & Creative Direction',
      metaDescription: 'Boundary-pushing graphic design, custom typography, and dynamic digital branding.',
      ogImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_des3_hero', 'CHROMA VISUAL LAB', 'We build unmistakable brands that capture cultural momentum.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80', undefined, 'CREATIVE DIRECTION'),
      createButtonBlock('b_des3_btn', 'Schedule 30-Min Brand Strategy Call', 'https://wa.me/?text=Hi%20Chroma%2C%20we%20are%20looking%20for%20a%20rebrand', 'primary')
    ]
  },

  // 3.4 Velvet Atelier Luxury Interior Styling (Warm Champagne & Walnut)
  {
    id: 'tpl_design_velvet_interior',
    title: 'Velvet Atelier Luxury Interiors',
    subtitle: 'Bespoke penthouses, custom Italian millwork & curated art collections',
    category: 'design',
    categoryName: 'Design',
    categoryNameAr: 'التصميم والديكور',
    type: 'landing',
    isFeatured: true,
    badge: 'Luxury Decor',
    badgeAr: 'ديكور فاخر',
    preview: {
      themePreset: 'beige',
      headerBg: '#f7f4ef',
      cardBg: '#ffffff',
      accentColor: '#9a7b4f',
      textColor: '#1f1c19',
      heroCoverUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'VELVET ATELIER',
      heroSubtitle: 'Haute living spaces sculpted for discerning clientele',
      buttons: [
        { label: 'Request Private Portfolio', labelAr: 'طلب الكتالوج الخاص', style: 'filled', color: '#9a7b4f' },
        { label: 'Consult Principal Designer', labelAr: 'استشارة كبير المصممين', style: 'outline' }
      ],
      tags: ['Turnkey Luxury', 'Imported Marble', 'Custom Furniture']
    },
    themeConfig: createThemeConfig('beige', '#faf7f2', '#ffffff', '#9a7b4f', '#1f1c19', '#78716c', '#b38f5f', '#e6decb', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Velvet Atelier | High-End Interior Design & Architecture',
      metaDescription: 'Turnkey interior architecture for ultra-prime residences and boutique luxury hospitality.',
      ogImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_des4_hero', 'VELVET ATELIER INTERIORS', 'Every texture, fixture, and shadow orchestrated with refined European craftsmanship.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80', undefined, 'HAUTE INTERIORS'),
      createButtonBlock('b_des4_btn', 'Book Consultation with Lead Stylist', 'https://wa.me/?text=Hello%20Velvet%20Atelier%2C%20I%20have%20an%20interior%20project', 'primary')
    ]
  },

  // 3.5 Lumina 3D Motion & CGI Visuals (Dark Futuristic Deep Indigo & Cyan)
  {
    id: 'tpl_design_lumina_cgi',
    title: 'Lumina 3D CGI & Spatial Studio',
    subtitle: 'Photorealistic architectural rendering, virtual showrooms & product animation',
    category: 'design',
    categoryName: 'Design',
    categoryNameAr: 'التصميم والديكور',
    type: 'business_card',
    isFeatured: false,
    badge: '3D & CGI',
    badgeAr: 'تصميم ثلاثي الأبعاد',
    preview: {
      themePreset: 'dark',
      headerBg: '#090d16',
      cardBg: '#141a29',
      accentColor: '#06b6d4',
      textColor: '#f1f5f9',
      heroCoverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'LUMINA 3D',
      heroSubtitle: 'Virtual reality, Unreal Engine 5 & cinematic product visuals',
      buttons: [
        { label: 'Watch 4K Showreel', labelAr: 'مشاهدة فيديو الأعمال 4K', style: 'filled', color: '#0891b2' },
        { label: 'Get 3D Project Estimate', labelAr: 'تقدير تكلفة العمل 3D', style: 'outline' }
      ],
      tags: ['Unreal Engine 5', 'Raytracing', 'Virtual Tours']
    },
    themeConfig: createThemeConfig('dark', '#07090f', '#101524', '#06b6d4', '#f1f5f9', '#94a3b8', '#0891b2', '#1b253b', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'Lumina 3D | Architectural Visualization & CGI Animation',
      metaDescription: 'Hyper-realistic 3D rendering and virtual reality walkthroughs for real estate developers.',
      ogImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_des5_hero', 'LUMINA 3D STUDIOS', 'Translating blueprints into breathtaking cinematic photorealism.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80', undefined, 'CGI & 3D ART'),
      createVCardBlock('b_des5_vcard', {
        fullName: 'Julian Thorne',
        jobTitle: 'Creative Director & 3D Lead',
        company: 'Lumina CGI Lab',
        phone: '+44 20 7946 0912',
        email: 'julian@luminacgi.com',
        website: 'https://esaia.app',
        bio: 'Over a decade delivering VR experiences and high-fidelity rendering for luxury brands.'
      })
    ]
  }
];
