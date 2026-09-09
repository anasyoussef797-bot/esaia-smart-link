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
// 4. HOME & REPAIR (المنازل والصيانة) - 5 Distinct Templates
// =========================================================================
export const homeRepairTemplates: TemplateItem[] = [
  // 4.1 Studio Line Interior Architect & Renovation (Warm Terracotta & Sand)
  {
    id: 'tpl_interior_designer',
    title: 'Studio Line - Interior Architecture',
    subtitle: 'From layout development to project commissioning and bespoke renovation',
    category: 'home_repair',
    categoryName: 'Home & repair',
    categoryNameAr: 'المنازل والصيانة',
    type: 'landing',
    isFeatured: true,
    badge: 'Turnkey Design',
    badgeAr: 'تشطيب متكامل',
    preview: {
      themePreset: 'beige',
      headerBg: '#f6f2ec',
      cardBg: '#ffffff',
      accentColor: '#c27d53',
      textColor: '#292524',
      heroCoverUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'STUDIO LINE',
      heroSubtitle: 'Interior design and full cycle project supervision',
      buttons: [
        { label: 'Calculate Renovation Cost', labelAr: 'حساب تكلفة التشطيب', style: 'filled', color: '#c27d53' },
        { label: 'Recent Renovations', labelAr: 'المشاريع المنفذة', style: 'outline' }
      ],
      tags: ['Turnkey Renovation', '3D Layout', 'Contract Supervision']
    },
    themeConfig: createThemeConfig('beige', '#faf7f2', '#ffffff', '#c27d53', '#292524', '#78716c', '#b46d43', '#e7dfd5', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Studio Line | Architectural Renovation & Interior Styling',
      metaDescription: 'Complete residential refurbishment, structural remodeling, and turnkey interior design.',
      ogImageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_home1_hero', 'STUDIO LINE RENOVATION', 'We transform raw spaces into timeless, functional sanctuaries.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&auto=format&fit=crop&q=80', undefined, 'INTERIOR FIT-OUT'),
      createButtonBlock('b_home1_btn', 'Request On-Site Measurement & Consultation', 'https://wa.me/?text=Hello%20Studio%20Line%2C%20I%20need%20a%20home%20renovation%20quote', 'primary'),
      createParagraphBlock('b_home1_info', '📐 Architectural 3D CAD Blueprint  |  🔨 Fixed Budget Guarantee  |  ⏳ Guaranteed Delivery Date')
    ]
  },

  // 4.2 MasterFlow 24/7 Emergency Plumbing & HVAC (High-Trust Cobalt Blue & Safety Amber)
  {
    id: 'tpl_home_masterflow_plumbing',
    title: 'MasterFlow Emergency Plumbing & HVAC',
    subtitle: 'Licensed technicians dispatched in 30 minutes for leaks, boilers & AC repair',
    category: 'home_repair',
    categoryName: 'Home & repair',
    categoryNameAr: 'المنازل والصيانة',
    type: 'landing',
    isFeatured: false,
    badge: '24/7 Rapid SOS',
    badgeAr: 'طوارئ 24/7',
    preview: {
      themePreset: 'dark',
      headerBg: '#09152e',
      cardBg: '#132448',
      accentColor: '#3b82f6',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'MASTERFLOW REPAIR',
      heroSubtitle: '30-minute rapid response for urgent home mechanicals',
      buttons: [
        { label: 'Call Emergency Dispatch', labelAr: 'اتصال طوارئ فوري', style: 'filled', color: '#2563eb' },
        { label: 'Fixed Pricing Rates', labelAr: 'جدول الأسعار الثابتة', style: 'outline' }
      ],
      tags: ['Zero Call-Out Fee', 'Licensed & Insured', 'Upfront Pricing']
    },
    themeConfig: createThemeConfig('dark', '#071024', '#0f1f40', '#3b82f6', '#f8fafc', '#93c5fd', '#f59e0b', '#1d3568', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'MasterFlow | 24/7 Emergency Plumbing & HVAC Services',
      metaDescription: 'Fast local plumbing, leak repair, drain clearing, and AC cooling restoration.',
      ogImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_home2_hero', 'MASTERFLOW PLUMBING & AC', 'Prompt, honest, licensed service when disaster strikes your home.', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80', undefined, '24/7 RAPID DISPATCH'),
      createWhatsAppBlock('b_home2_wa', '+18005550188', 'Direct WhatsApp Dispatcher', 'EMERGENCY: I have an urgent leak/issue at my home.'),
      createParagraphBlock('b_home2_stats', '⚡ 30-Min Arrival  |  🛡️ 1-Year Labor Warranty  |  💰 No Hidden Trip Charges')
    ]
  },

  // 4.3 SolidCraft Bespoke Carpentry & Cabinetry (Warm Timber Oak & Deep Charcoal)
  {
    id: 'tpl_home_solidcraft_wood',
    title: 'SolidCraft Custom Wood & Cabinetry',
    subtitle: 'Handmade solid oak kitchens, walk-in closets, and architectural woodwork',
    category: 'home_repair',
    categoryName: 'Home & repair',
    categoryNameAr: 'المنازل والصيانة',
    type: 'business_card',
    isFeatured: false,
    badge: 'Artisan Wood',
    badgeAr: 'نجارة مخصصة',
    preview: {
      themePreset: 'beige',
      headerBg: '#f7f3ec',
      cardBg: '#ffffff',
      accentColor: '#78350f',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SOLIDCRAFT WOOD',
      heroSubtitle: 'Heirloom quality handcrafted cabinetry and joinery',
      buttons: [
        { label: 'View Kitchen Showcase', labelAr: 'معرض المطابخ الخشبية', style: 'filled', color: '#78350f' },
        { label: 'Book Wood Consultation', labelAr: 'استشارة اختيار الأخشاب', style: 'outline' }
      ],
      tags: ['Solid European Oak', 'Blum Soft-Close', 'Hand Rubbed Finishes']
    },
    themeConfig: createThemeConfig('beige', '#fbf8f3', '#ffffff', '#78350f', '#1c1917', '#78716c', '#92400e', '#e7decb', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'SolidCraft | Custom Handmade Cabinetry & Joinery',
      metaDescription: 'Tailored kitchen islands, custom bookshelves, and luxury hardwood cabinetry.',
      ogImageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_home3_hero', 'SOLIDCRAFT JOINERY', 'Custom hardwood craftsmanship built to endure generations.', 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1000&auto=format&fit=crop&q=80', undefined, 'BESPOKE JOINERY'),
      createVCardBlock('b_home3_vcard', {
        fullName: 'Marcus Vance',
        jobTitle: 'Master Joiner & Founder',
        company: 'SolidCraft Woodworks',
        phone: '+1 (555) 018-9412',
        email: 'marcus@solidcraftwood.com',
        website: 'https://esaia.app',
        bio: 'Over 20 years crafting architectural timber installations and custom fine cabinetry.'
      })
    ]
  },

  // 4.4 SunVolt Solar Roofing & Clean Energy (Clean Sky Blue & Sun Gold)
  {
    id: 'tpl_home_sunvolt_solar',
    title: 'SunVolt Clean Energy & Solar Roofing',
    subtitle: 'Zero-down solar panels, Tesla Powerwall storage & 25-year energy independence',
    category: 'home_repair',
    categoryName: 'Home & repair',
    categoryNameAr: 'المنازل والصيانة',
    type: 'landing',
    isFeatured: true,
    badge: 'Solar Eco',
    badgeAr: 'طاقة شمسية',
    preview: {
      themePreset: 'light',
      headerBg: '#eff6ff',
      cardBg: '#ffffff',
      accentColor: '#0284c7',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SUNVOLT SOLAR',
      heroSubtitle: 'Slash your electric bill to $0 with smart solar',
      buttons: [
        { label: 'Calculate Your Solar Savings', labelAr: 'احسب وفر فواتيرك مع الطاقة', style: 'filled', color: '#0284c7' },
        { label: 'Government Rebates', labelAr: 'الدعم الحكومي المتاح', style: 'outline' }
      ],
      tags: ['25-Yr Full Warranty', 'Battery Backup Included', 'Tier-1 High Efficiency']
    },
    themeConfig: createThemeConfig('light', '#f8fafc', '#ffffff', '#0284c7', '#0f172a', '#475569', '#f59e0b', '#e2e8f0', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'SunVolt Solar | Residential Solar Roofs & Battery Systems',
      metaDescription: 'Harness clean energy and eliminate monthly power bills with premium tier-1 solar panels.',
      ogImageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_home4_hero', 'SUNVOLT RESIDENTIAL SOLAR', 'Energy freedom for your home with state-of-the-art monocrystalline solar panels.', 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1000&auto=format&fit=crop&q=80', undefined, 'CLEAN ENERGY'),
      createButtonBlock('b_home4_btn', 'Get Satellite Roof Assessment & Savings Quote', 'https://wa.me/?text=Hello%20SunVolt%2C%20I%20would%20like%20a%20solar%20quote', 'primary')
    ]
  },

  // 4.5 Pristine Home Deep Cleaning & Sanitization (Crisp Aqua, Slate & Pure White)
  {
    id: 'tpl_home_pristine_clean',
    title: 'Pristine Pro Deep Home Cleaning',
    subtitle: 'Hospital-grade sanitization, steam carpet cleaning & move-in/out readiness',
    category: 'home_repair',
    categoryName: 'Home & repair',
    categoryNameAr: 'المنازل والصيانة',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Pro Clean',
    badgeAr: 'تنظيف عميق',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdfa',
      cardBg: '#ffffff',
      accentColor: '#0d9488',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'PRISTINE HOME CARE',
      heroSubtitle: 'White-glove residential deep cleaning and sanitization',
      buttons: [
        { label: 'Book Cleaning Slot Online', labelAr: 'حجز موعد تنظيف فوري', style: 'filled', color: '#0d9488' },
        { label: 'Move-in Checklist', labelAr: 'قائمة تسليم الشقق', style: 'outline' }
      ],
      tags: ['Eco-Friendly Products', 'Background Checked Staff', '100% Satisfaction Guarantee']
    },
    themeConfig: createThemeConfig('light', '#f7fdfc', '#ffffff', '#0d9488', '#0f172a', '#64748b', '#0f766e', '#ccfbf1', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'Pristine Pro | Luxury Residential Deep Cleaning Services',
      metaDescription: 'Trusted, certified cleaners delivering immaculate homes using non-toxic eco detergents.',
      ogImageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_home5_hero', 'PRISTINE PRO HOME CLEANING', 'Step into a spotless, allergen-free sanctuary every time.', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1000&auto=format&fit=crop&q=80', undefined, 'DEEP CLEANING'),
      createButtonBlock('b_home5_btn', 'Instant Online Booking & Instant Price Calculator', 'https://esaia.app', 'primary')
    ]
  }
];

// =========================================================================
// 5. FOOD (المطاعم والمأكولات) - 5 Distinct Templates
// =========================================================================
export const foodTemplates: TemplateItem[] = [
  // 5.1 Belcanto Trattoria Italiana (Warm Tuscan Wine & Olive Charcoal)
  {
    id: 'tpl_belcanto_restaurant',
    title: 'Belcanto - Trattoria Italiana',
    subtitle: 'Wood-fired sourdough pizza, handmade fresh pasta, and curated Italian wines',
    category: 'food',
    categoryName: 'Food',
    categoryNameAr: 'المطاعم والمأكولات',
    type: 'menu',
    isFeatured: true,
    badge: 'Michelin Guide',
    badgeAr: 'مطعم فاخر',
    preview: {
      themePreset: 'dark',
      headerBg: '#171312',
      cardBg: '#241e1c',
      accentColor: '#e07a5f',
      textColor: '#fbf5f2',
      heroCoverUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'BELCANTO',
      heroSubtitle: 'Authentic Italian dining with chef-curated seasonal pairings',
      buttons: [
        { label: 'Reserve Table', labelAr: 'حجز طاولة', style: 'filled', color: '#e07a5f' },
        { label: 'Seasonal Menu', labelAr: 'قائمة الأطباق الموسمية', style: 'outline' }
      ],
      tags: ['Truffle Pasta', 'Wood-Fired Pizza', 'Private Cellar']
    },
    themeConfig: createThemeConfig('dark', '#120f0e', '#1c1716', '#e07a5f', '#fbf5f2', '#a89d97', '#f4a261', '#302724', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Belcanto | Authentic Italian Trattoria & Wine Bar',
      metaDescription: 'Handmade pasta, wood-fired Neapolitan pizza, and classic Tuscan desserts.',
      ogImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_food1_hero', 'BELCANTO TRATTORIA', 'Handmade pasta crafted fresh every morning, paired with rare Tuscan wines.', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80', undefined, 'ITALIAN CUISINE'),
      createButtonBlock('b_food1_btn', 'Reserve a Dinner Table for Tonight', 'https://wa.me/?text=Hi%20Belcanto%2C%20I%20would%20like%20to%20reserve%20a%20table', 'primary')
    ]
  },

  // 5.2 Artisan Roast Autumn Specialty Coffee (Warm Cinnamon, Espresso & Oat)
  {
    id: 'tpl_bio_autumn_coffee',
    title: 'Artisan Roast - Specialty Coffee Bar',
    subtitle: 'Single-origin Geisha coffees, cold drips, and freshly baked French viennoiserie',
    category: 'food',
    categoryName: 'Food',
    categoryNameAr: 'المطاعم والمأكولات',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Specialty Roaster',
    badgeAr: 'قهوة مختصة',
    preview: {
      themePreset: 'beige',
      headerBg: '#271c19',
      cardBg: '#362824',
      accentColor: '#d48d56',
      textColor: '#f7eee7',
      heroCoverUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ARTISAN ROAST',
      heroSubtitle: 'Ethically sourced micro-lots, roasted with obsessive devotion',
      buttons: [
        { label: 'Order Fresh Whole Beans', labelAr: 'طلب بن محمص طازج', style: 'filled', color: '#d48d56' },
        { label: 'Brew Guides & Recipes', labelAr: 'طرق التحضير والوصفات', style: 'outline' }
      ],
      tags: ['Geisha Micro-Lot', 'Cold Brew', 'Almond Croissants']
    },
    themeConfig: createThemeConfig('beige', '#1f1614', '#2c201c', '#d48d56', '#f7eee7', '#baa59a', '#e2a373', '#42322d', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Artisan Roast | Specialty Coffee Micro-Roastery',
      metaDescription: 'Direct-trade Ethiopian and Colombian specialty coffee beans with flavor notes of jasmine and cacao.',
      ogImageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_food2_hero', 'ARTISAN ROAST LAB', 'Direct-trade specialty micro-lots roasted to perfection in small batches.', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&auto=format&fit=crop&q=80', undefined, 'SPECIALTY COFFEE'),
      createButtonBlock('b_food2_btn', 'Browse This Week’s Fresh Roasts & Beans', 'https://esaia.app', 'primary')
    ]
  },

  // 5.3 Sakura Omakase & Sushi Bar (Dark Minimal Japanese Hinoki & Crimson)
  {
    id: 'tpl_food_sakura_omakase',
    title: 'Sakura Japanese Omakase & Sake Bar',
    subtitle: 'Tokyo Toyosu fish market flown in daily, Edomae nigiri & rare Junmai Daiginjo',
    category: 'food',
    categoryName: 'Food',
    categoryNameAr: 'المطاعم والمأكولات',
    type: 'landing',
    isFeatured: true,
    badge: 'Omakase',
    badgeAr: 'سوشي ياباني',
    preview: {
      themePreset: 'dark',
      headerBg: '#0f0f12',
      cardBg: '#191920',
      accentColor: '#e11d48',
      textColor: '#f8fafc',
      heroCoverUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'SAKURA OMAKASE',
      heroSubtitle: 'Intimate 10-seat dining crafted by Chef Kenjiro',
      buttons: [
        { label: 'Book Omakase Counter', labelAr: 'حجز مقعد أمام الشيف', style: 'filled', color: '#be123c' },
        { label: 'Sake Tasting Flight', labelAr: 'تجربة المشروبات اليابانية', style: 'outline' }
      ],
      tags: ['Toyosu Direct', 'A5 Wagyu', '18-Course Tasting']
    },
    themeConfig: createThemeConfig('dark', '#0b0b0e', '#14141a', '#e11d48', '#f8fafc', '#94a3b8', '#fb7185', '#242430', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Sakura Omakase | Exclusive Japanese Counter Dining',
      metaDescription: '18-course chef experience featuring Bluefin Otoro, Hokkaido Uni, and Japanese Wagyu.',
      ogImageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_food3_hero', 'SAKURA OMAKASE', 'An intimate culinary journey through Japan’s most revered seafood treasures.', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1000&auto=format&fit=crop&q=80', undefined, 'EDOMAE SUSHI'),
      createButtonBlock('b_food3_btn', 'Reserve Your Omakase Seat (Limited 10 Seats/Night)', 'https://wa.me/?text=Hello%20Sakura%20Omakase%2C%20I%20would%20like%20to%20reserve', 'primary')
    ]
  },

  // 5.4 Green Bowl Plant-Based & Cold-Pressed Juicery (Vibrant Crisp Matcha & Lemon)
  {
    id: 'tpl_food_green_bowl',
    title: 'Green Bowl Organics & Juicery',
    subtitle: '100% plant-based nourish bowls, cold-pressed raw tonics, and superfood acai',
    category: 'food',
    categoryName: 'Food',
    categoryNameAr: 'المطاعم والمأكولات',
    type: 'menu',
    isFeatured: false,
    badge: 'Vegan Clean',
    badgeAr: 'نباتي وصحي',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdf4',
      cardBg: '#ffffff',
      accentColor: '#15803d',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'GREEN BOWL',
      heroSubtitle: 'Fuel your day with organic vibrancy and whole plants',
      buttons: [
        { label: 'Order Pickup & Delivery', labelAr: 'طلب استلام وتوصيل', style: 'filled', color: '#16a34a' },
        { label: 'Juice Cleanse Plans', labelAr: 'باقات ديتوكس العصير', style: 'outline' }
      ],
      tags: ['Cold-Pressed Juice', 'Organic Acai', 'Gluten-Free Kitchen']
    },
    themeConfig: createThemeConfig('light', '#f6fbf7', '#ffffff', '#15803d', '#0f172a', '#475569', '#16a34a', '#dcfce7', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'Green Bowl | Plant-Based Nutrition & Cold-Pressed Cleanse',
      metaDescription: 'Fresh superfood bowls, cold-pressed juices, and protein-packed organic salads.',
      ogImageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_food4_hero', 'GREEN BOWL ORGANICS', 'Pure vitality from seed to bowl. Zero refined sugars or artificial additives.', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000&auto=format&fit=crop&q=80', undefined, 'PLANT-BASED FUEL'),
      createButtonBlock('b_food4_btn', 'Order Your Custom Superfood Bowl', 'https://esaia.app', 'primary')
    ]
  },

  // 5.5 Fire & Smoke Texas Craft Smokehouse (Deep Smoked Hickory & Ember Orange)
  {
    id: 'tpl_food_smokehouse_bbq',
    title: 'Fire & Smoke Texas BBQ Smokehouse',
    subtitle: '16-hour oak-smoked USDA prime brisket, jalapeno sausages & Carolina pulled pork',
    category: 'food',
    categoryName: 'Food',
    categoryNameAr: 'المطاعم والمأكولات',
    type: 'landing',
    isFeatured: false,
    badge: 'Smoked BBQ',
    badgeAr: 'باربيكيو مدخن',
    preview: {
      themePreset: 'dark',
      headerBg: '#1c130e',
      cardBg: '#2a1d17',
      accentColor: '#f97316',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'FIRE & SMOKE BBQ',
      heroSubtitle: 'Real Texas wood-pit barbecue smoked low and slow',
      buttons: [
        { label: 'Pre-Order Weekend Brisket', labelAr: 'حجز بريسكت نهاية الأسبوع', style: 'filled', color: '#ea580c' },
        { label: 'Catering Inquiries', labelAr: 'خدمات التموين والولائم', style: 'outline' }
      ],
      tags: ['Prime Black Angus', 'Post Oak Smoke', 'Homemade Sauces']
    },
    themeConfig: createThemeConfig('dark', '#140c08', '#20130d', '#f97316', '#fff7ed', '#fed7aa', '#ea580c', '#3d2319', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'Fire & Smoke | Texas Craft BBQ & Smoked Meats',
      metaDescription: 'Authentic 16-hour smoked prime brisket, ribs, and cornbread straight from the pit.',
      ogImageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_food5_hero', 'FIRE & SMOKE PITMASTERS', 'Low, slow, and honest Texas pit barbecue seasoned with coarse pepper and sea salt.', 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1000&auto=format&fit=crop&q=80', undefined, 'CRAFT SMOKEHOUSE'),
      createButtonBlock('b_food5_btn', 'Pre-Order for Today Before Sells Out', 'https://wa.me/?text=Hi%20Smokehouse%2C%20I%20want%20to%20order%20brisket', 'primary')
    ]
  }
];

// =========================================================================
// 6. ANIMALS (الحيوانات والبيطرة) - 5 Distinct Templates
// =========================================================================
export const animalsTemplates: TemplateItem[] = [
  // 6.1 Paw & Paws Modern Veterinary Hospital (Clean Clinical Teal & Pure White)
  {
    id: 'tpl_anim_vet_hospital',
    title: 'Paw & Paws Advanced Veterinary Hospital',
    subtitle: 'Comprehensive pet wellness, digital diagnostics, surgical theater & dental care',
    category: 'animals',
    categoryName: 'Animals',
    categoryNameAr: 'الحيوانات والبيطرة',
    type: 'landing',
    isFeatured: true,
    badge: '24/7 Vet Care',
    badgeAr: 'مستشفى بيطري',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdfa',
      cardBg: '#ffffff',
      accentColor: '#0f766e',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'PAW & PAWS HOSPITAL',
      heroSubtitle: 'Fear-free clinical veterinary excellence for your beloved companions',
      buttons: [
        { label: 'Book Health Checkup', labelAr: 'حجز كشف بيطري', style: 'filled', color: '#0f766e' },
        { label: '24/7 Emergency Clinic', labelAr: 'طوارئ بيطرية 24 ساعة', style: 'outline' }
      ],
      tags: ['Ultrasound & X-Ray', 'Vaccine Passport', 'Pet Dentistry']
    },
    themeConfig: createThemeConfig('light', '#f5faf9', '#ffffff', '#0f766e', '#0f172a', '#475569', '#14b8a6', '#ccfbf1', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'Paw & Paws | Modern Veterinary Clinic & Pet Hospital',
      metaDescription: 'Compassionate medical, surgical, and dental care for dogs, cats, and exotic companion pets.',
      ogImageUrl: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_anim1_hero', 'PAW & PAWS VETERINARY', 'Dedicated veterinarians keeping your furry family members happy and healthy.', 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1000&auto=format&fit=crop&q=80', undefined, 'VET HOSPITAL'),
      createButtonBlock('b_anim1_btn', 'Schedule Wellness Exam Online', 'https://wa.me/?text=Hello%20Paw%20Paws%2C%20I%20need%20an%20appointment%20for%20my%20pet', 'primary')
    ]
  },

  // 6.2 The Velvet Hound Luxury Pet Spa & Grooming (Warm Rose-Gold & Soft Cream)
  {
    id: 'tpl_anim_velvet_spa',
    title: 'The Velvet Hound Luxury Pet Spa',
    subtitle: 'Hydro-massage baths, blueberry facials, breed styling & gentle deshedding',
    category: 'animals',
    categoryName: 'Animals',
    categoryNameAr: 'الحيوانات والبيطرة',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Luxury Grooming',
    badgeAr: 'سبا وحلاقة',
    preview: {
      themePreset: 'beige',
      headerBg: '#fff7ed',
      cardBg: '#ffffff',
      accentColor: '#c2410c',
      textColor: '#292524',
      heroCoverUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'THE VELVET HOUND',
      heroSubtitle: 'Five-star pampering and styling for your four-legged royalty',
      buttons: [
        { label: 'Book Spa Appointment', labelAr: 'حجز باقة سبا كاملة', style: 'filled', color: '#c2410c' },
        { label: 'Grooming Packages', labelAr: 'باقات الحلاقة والعناية', style: 'outline' }
      ],
      tags: ['Organic Shampoo', 'Nail Trimming & Buffing', 'No Cages Guarantee']
    },
    themeConfig: createThemeConfig('beige', '#fffbf5', '#ffffff', '#c2410c', '#292524', '#78716c', '#ea580c', '#fed7aa', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'full'),
    seo: {
      metaTitle: 'The Velvet Hound | Premium Dog & Cat Grooming Spa',
      metaDescription: 'Stress-free pet salon offering soothing hydro-therapy, styling, and organic skin treatments.',
      ogImageUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_anim2_hero', 'THE VELVET HOUND PET SPA', 'Every bath is a soothing experience of comfort, care, and love.', 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1000&auto=format&fit=crop&q=80', undefined, 'LUXURY PET SALON'),
      createButtonBlock('b_anim2_btn', 'Reserve Your Pet’s Grooming Session', 'https://esaia.app', 'primary')
    ]
  },

  // 6.3 Canine Elite Academy & Dog Training (Forest Pine Green & Golden Tan)
  {
    id: 'tpl_anim_canine_elite',
    title: 'Canine Elite Training Academy',
    subtitle: 'Positive reinforcement obedience, puppy socialization & behavioral rehabilitation',
    category: 'animals',
    categoryName: 'Animals',
    categoryNameAr: 'الحيوانات والبيطرة',
    type: 'landing',
    isFeatured: true,
    badge: 'Certified Trainers',
    badgeAr: 'تدريب سلوكي',
    preview: {
      themePreset: 'dark',
      headerBg: '#0f1712',
      cardBg: '#19261e',
      accentColor: '#22c55e',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'CANINE ELITE',
      heroSubtitle: 'Build an unbreakable bond with your dog through science-based training',
      buttons: [
        { label: 'Book Behavior Assessment', labelAr: 'تقييم سلوكي مجاني', style: 'filled', color: '#16a34a' },
        { label: 'Puppy Bootcamps', labelAr: 'معسكرات تدريب الجراء', style: 'outline' }
      ],
      tags: ['Off-Leash Freedom', 'Aggression Rehab', 'AKC Certified']
    },
    themeConfig: createThemeConfig('dark', '#0a100c', '#131e17', '#22c55e', '#f0fdf4', '#86efac', '#15803d', '#1f3326', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'Canine Elite Academy | Professional Dog Training',
      metaDescription: 'Gentle, modern, evidence-based dog obedience and behavioral modification programs.',
      ogImageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_anim3_hero', 'CANINE ELITE ACADEMY', 'Real-world obedience and reliable off-leash manners built on positive trust.', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1000&auto=format&fit=crop&q=80', undefined, 'DOG TRAINING'),
      createButtonBlock('b_anim3_btn', 'Schedule Behavioral Assessment Call', 'https://wa.me/?text=Hi%2C%20I%20need%20training%20for%20my%20dog', 'primary')
    ]
  },

  // 6.4 Whisker Haven Luxury Cat Hotel & Cafe (Warm Cozy Peach & Latte)
  {
    id: 'tpl_anim_whisker_haven',
    title: 'Whisker Haven Cat Boarding & Hotel',
    subtitle: 'Private luxury feline suites with webcam monitoring, cat trees & calming ambient music',
    category: 'animals',
    categoryName: 'Animals',
    categoryNameAr: 'الحيوانات والبيطرة',
    type: 'landing',
    isFeatured: false,
    badge: 'Cat Only Hotel',
    badgeAr: 'فندق قطط حصري',
    preview: {
      themePreset: 'beige',
      headerBg: '#fbf5ef',
      cardBg: '#ffffff',
      accentColor: '#d97706',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'WHISKER HAVEN',
      heroSubtitle: 'A dog-free, serene vacation hotel designed entirely for cats',
      buttons: [
        { label: 'Check Suite Availability', labelAr: 'التحقق من توفر الأجنحة', style: 'filled', color: '#d97706' },
        { label: 'Live Webcam Demo', labelAr: 'تجربة الكاميرا المباشرة', style: 'outline' }
      ],
      tags: ['24/7 Live Webcams', 'Individual Climbing Trees', 'Veterinary On Call']
    },
    themeConfig: createThemeConfig('beige', '#fdfbf7', '#ffffff', '#d97706', '#1c1917', '#78716c', '#b45309', '#e7dfd5', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'Whisker Haven | Luxury Feline Resort & Boarding',
      metaDescription: 'Peaceful cat hotel featuring spacious custom multi-level condos with 24/7 HD camera access.',
      ogImageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_anim4_hero', 'WHISKER HAVEN HOTEL', 'Peace of mind while you travel, with luxurious stress-free boarding for cats.', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&auto=format&fit=crop&q=80', undefined, 'CAT RESORT'),
      createButtonBlock('b_anim4_btn', 'Book Your Cat’s Private Suite', 'https://esaia.app', 'primary')
    ]
  },

  // 6.5 WildHeart Equestrian & Equine Sanctuary (Natural Earth Ochre & Deep Forest)
  {
    id: 'tpl_anim_wildheart_equine',
    title: 'WildHeart Equestrian & Stables',
    subtitle: 'Full-board horse livery, dressage training, show jumping arenas & scenic trail rides',
    category: 'animals',
    categoryName: 'Animals',
    categoryNameAr: 'الحيوانات والبيطرة',
    type: 'business_card',
    isFeatured: false,
    badge: 'Equestrian',
    badgeAr: 'فروسية وخيل',
    preview: {
      themePreset: 'dark',
      headerBg: '#171c14',
      cardBg: '#232b1e',
      accentColor: '#84cc16',
      textColor: '#f7fee7',
      heroCoverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'WILDHEART STABLES',
      heroSubtitle: 'World-class equestrian training and luxury livery estate',
      buttons: [
        { label: 'Book Riding Lesson', labelAr: 'حجز حصة ركوب خيل', style: 'filled', color: '#65a30d' },
        { label: 'Stabling Facilities', labelAr: 'مرافق الإيواء والاسطبلات', style: 'outline' }
      ],
      tags: ['Indoor Olympic Arena', 'Daily Turnout Grass Pastures', 'FEI Certified Coaches']
    },
    themeConfig: createThemeConfig('dark', '#11150f', '#1c2219', '#84cc16', '#f7fee7', '#bef264', '#65a30d', '#2e3828', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'WildHeart Equestrian | Luxury Stables & Horse Training',
      metaDescription: 'Premier equestrian center offering livery, dressage clinics, and private riding tuition.',
      ogImageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_anim5_hero', 'WILDHEART EQUESTRIAN', 'Passionate horsemanship and premier care on 50 acres of rolling green pastures.', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=80', undefined, 'EQUESTRIAN STABLES'),
      createVCardBlock('b_anim5_vcard', {
        fullName: 'Captain Edward Montgomery',
        jobTitle: 'Equestrian Director & FEI Coach',
        company: 'WildHeart Stables',
        phone: '+44 1632 960144',
        email: 'edward@wildheartstables.com',
        website: 'https://esaia.app',
        bio: 'Former international eventer dedicated to compassionate horse training and rider harmony.'
      })
    ]
  }
];
