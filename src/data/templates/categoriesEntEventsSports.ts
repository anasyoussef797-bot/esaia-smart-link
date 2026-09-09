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
// 16. ENTERTAINMENT (الترفيه والإعلام) - 5 Distinct Templates
// =========================================================================
export const entertainmentTemplates: TemplateItem[] = [
  // 16.1 CineScope Independent Film Production & Festival (Cinematic Dark Amber & Black)
  {
    id: 'tpl_ent_cinescope_films',
    title: 'CineScope Indie Film Studio & Production',
    subtitle: 'Feature films, Cannes & Sundance official selections, and 4K cinema equipment rentals',
    category: 'entertainment',
    categoryName: 'Entertainment',
    categoryNameAr: 'الترفيه والإعلام',
    type: 'landing',
    isFeatured: true,
    badge: 'Cannes Selection',
    badgeAr: 'إنتاج سينمائي',
    preview: {
      themePreset: 'dark',
      headerBg: '#120f0d',
      cardBg: '#1f1a16',
      accentColor: '#f59e0b',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'CINESCOPE STUDIOS',
      heroSubtitle: 'Bold visual storytelling commanding the silver screen worldwide',
      buttons: [
        { label: 'Watch 2026 Film Trailers', labelAr: 'مشاهدة إعلانات الأفلام الجديدة', style: 'filled', color: '#d97706' },
        { label: 'Festival Screenings', labelAr: 'مواعيد العروض بالمهرجانات', style: 'outline' }
      ],
      tags: ['Arri Alexa 35', 'Sundance Award Winner', 'International Distribution']
    },
    themeConfig: createThemeConfig('dark', '#0d0a09', '#171310', '#f59e0b', '#fffbeb', '#fbbf24', '#d97706', '#29221b', 'Space Grotesk', 'Playfair Display', 'filled', 'none'),
    seo: {
      metaTitle: 'CineScope Studios | Independent Film Production & Distribution',
      metaDescription: 'Award-winning cinematic narratives, documentaries, and boutique commercial production.',
      ogImageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_ent1_hero', 'CINESCOPE STUDIOS', 'Capturing raw human emotion through cinematic lighting and daring directing.', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80', undefined, 'CINEMA STUDIO'),
      createButtonBlock('b_ent1_btn', 'Screen the Award-Winning Short Film Online', 'https://esaia.app', 'primary')
    ]
  },

  // 16.2 PixelQuest Indie Game Studio & Steam Releases (Cyberpunk Neon Violet & Cyan)
  {
    id: 'tpl_ent_pixelquest_games',
    title: 'PixelQuest RPG & Indie Game Studio',
    subtitle: 'Deep narrative pixel RPGs, Steam wishlists, developer devlogs & Discord community',
    category: 'entertainment',
    categoryName: 'Entertainment',
    categoryNameAr: 'الترفيه والإعلام',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Steam Game',
    badgeAr: 'استوديو ألعاب فيديو',
    preview: {
      themePreset: 'dark',
      headerBg: '#0e0b1c',
      cardBg: '#191333',
      accentColor: '#a855f7',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'PIXELQUEST GAMES',
      heroSubtitle: 'Crafting unforgettable adventures for PC, Switch & PlayStation',
      buttons: [
        { label: 'Wishlist on Steam Now', labelAr: 'أضف لقائمة الرغبات على Steam', style: 'filled', color: '#9333ea' },
        { label: 'Join 50k Discord Community', labelAr: 'انضم لمجتمع ديسكورد', style: 'outline' }
      ],
      tags: ['Overwhelmingly Positive', 'Chiptune OST', 'Multiplatform Release']
    },
    themeConfig: createThemeConfig('dark', '#090714', '#130e26', '#a855f7', '#faf5ff', '#c084fc', '#9333ea', '#291e52', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'PixelQuest Games | Indie RPG Developer & Steam Releases',
      metaDescription: 'Explore our latest story-rich RPGs, soundtrack vinyls, and devlog updates.',
      ogImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_ent2_hero', 'PIXELQUEST STUDIOS', 'Handcrafted indie games fueled by passion, nostalgic visuals, and immersive lore.', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80', undefined, 'INDIE GAMING'),
      createButtonBlock('b_ent2_btn', 'Wishlist "Chronicles of Aethel" on Steam', 'https://esaia.app', 'primary')
    ]
  },

  // 16.3 The Velvet Comedy Club & Standup Speakeasy (Vintage Velvet Crimson & Golden Spotlight)
  {
    id: 'tpl_ent_velvet_comedy',
    title: 'The Velvet Comedy Cellar & Lounge',
    subtitle: 'Underground comedy club hosting Netflix specials, surprise celebrity drop-ins & craft cocktails',
    category: 'entertainment',
    categoryName: 'Entertainment',
    categoryNameAr: 'الترفيه والإعلام',
    type: 'landing',
    isFeatured: false,
    badge: 'Live Standup',
    badgeAr: 'نادي ستاند أب كوميدي',
    preview: {
      themePreset: 'dark',
      headerBg: '#1a0d10',
      cardBg: '#2a1419',
      accentColor: '#e11d48',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'THE VELVET CELLAR',
      heroSubtitle: 'The home of unapologetic, raw, laugh-out-loud live stand-up comedy',
      buttons: [
        { label: 'Buy Weekend Show Tickets', labelAr: 'تذاكر عروض نهاية الأسبوع', style: 'filled', color: '#be123c' },
        { label: 'Open Mic Registration', labelAr: 'التسجيل في المايك المفتوح', style: 'outline' }
      ],
      tags: ['No Drink Minimums', 'Surprise Headliners', 'Intimate 120 Seats']
    },
    themeConfig: createThemeConfig('dark', '#12080a', '#1e0d11', '#e11d48', '#fff1f2', '#fda4af', '#be123c', '#3b1a22', 'Space Grotesk', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'The Velvet Cellar | Stand-Up Comedy Club & Cocktail Speakeasy',
      metaDescription: 'Unforgettable live stand-up comedy featuring top comedians from HBO, Netflix, and Comedy Central.',
      ogImageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_ent3_hero', 'THE VELVET COMEDY CELLAR', 'Intimate, unfiltered comedy in a historic subterranean lounge with craft mixology.', 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=1000&auto=format&fit=crop&q=80', undefined, 'STAND-UP COMEDY'),
      createButtonBlock('b_ent3_btn', 'Get Tickets for Tonight’s Headliner Showcase', 'https://esaia.app', 'primary')
    ]
  },

  // 16.4 VoiceSphere Podcast Network & Audio Guild (Warm Charcoal & Neon Amber)
  {
    id: 'tpl_ent_voicesphere_podcast',
    title: 'VoiceSphere Podcast Network',
    subtitle: 'Top-charting investigative journalism podcasts, deep-dive tech interviews & true crime',
    category: 'entertainment',
    categoryName: 'Entertainment',
    categoryNameAr: 'الترفيه والإعلام',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Top 10 Podcast',
    badgeAr: 'شبكة بودكاست وإعلام',
    preview: {
      themePreset: 'dark',
      headerBg: '#13110e',
      cardBg: '#211d17',
      accentColor: '#f97316',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'VOICESPHERE NETWORK',
      heroSubtitle: 'Over 25 million monthly audio downloads across Apple Podcasts & Spotify',
      buttons: [
        { label: 'Listen to Latest Episodes', labelAr: 'الاستماع لأحدث الحلقات', style: 'filled', color: '#ea580c' },
        { label: 'Sponsorship Inquiries', labelAr: 'رعاية الإعلانات بالبودكاست', style: 'outline' }
      ],
      tags: ['Apple Podcasts #1', 'Binaural Audio', 'Weekly Episodes']
    },
    themeConfig: createThemeConfig('dark', '#0e0c0a', '#171410', '#f97316', '#fff7ed', '#fed7aa', '#ea580c', '#33291e', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'VoiceSphere | Investigative Journalism & Audio Podcasts',
      metaDescription: 'Original audio documentaries and interviews with world leaders, innovators, and thinkers.',
      ogImageUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_ent4_hero', 'VOICESPHERE PODCAST NETWORK', 'Stories that captivate the mind and challenge conventional narratives.', 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1000&auto=format&fit=crop&q=80', undefined, 'PODCAST NETWORK'),
      createButtonBlock('b_ent4_btn', 'Listen on Apple Podcasts or Spotify', 'https://esaia.app', 'primary')
    ]
  },

  // 16.5 Illusions Magic Lounge & Mindreading Experience (Mysterious Royal Indigo & Starlight Silver)
  {
    id: 'tpl_ent_illusions_magic',
    title: 'Illusions - Parlor Magic & Mentalism',
    subtitle: 'Intimate close-up sleight of hand, mentalism demonstrations & VIP private salon',
    category: 'entertainment',
    categoryName: 'Entertainment',
    categoryNameAr: 'الترفيه والإعلام',
    type: 'business_card',
    isFeatured: false,
    badge: 'Illusionist',
    badgeAr: 'عروض خفة وعقل',
    preview: {
      themePreset: 'dark',
      headerBg: '#0d1024',
      cardBg: '#171c3b',
      accentColor: '#818cf8',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ILLUSIONS PARLOR',
      heroSubtitle: 'Suspend disbelief in an intimate parlor where the impossible happens inches away',
      buttons: [
        { label: 'Book Parlor Show Tickets', labelAr: 'تذاكر العرض السحري الحصري', style: 'filled', color: '#6366f1' },
        { label: 'Private Event Bookings', labelAr: 'حجز الحفلات الخاصة والشركات', style: 'outline' }
      ],
      tags: ['Strictly 40 Guests/Show', 'Magic Castle Performer', 'Cocktails Included']
    },
    themeConfig: createThemeConfig('dark', '#080a17', '#101429', '#818cf8', '#f8fafc', '#c7d2fe', '#6366f1', '#212952', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Illusions Parlor | World-Class Close-Up Magic & Mentalism',
      metaDescription: 'Experience mesmerizing close-up illusion and telepathy in an exclusive luxury parlor.',
      ogImageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_ent5_hero', 'ILLUSIONS SALON', 'Witness true astonishment where magic happens not on a distant stage, but in your own hands.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80', undefined, 'PARLOR MAGIC'),
      createVCardBlock('b_ent5_vcard', {
        fullName: 'Damian Blackwood',
        jobTitle: 'Master Illusionist & Mentalist',
        company: 'Illusions Magic Society',
        phone: '+1 (415) 555-0196',
        email: 'damian@illusionsparlor.com',
        website: 'https://esaia.app',
        bio: 'Two-time Magic Castle Close-Up Magician of the Year and consulting illusionist.'
      })
    ]
  }
];

// =========================================================================
// 17. EVENTS (المناسبات والفعاليات) - 5 Distinct Templates
// =========================================================================
export const eventsTemplates: TemplateItem[] = [
  // 17.1 Rosewood Luxury Wedding Planning & Styling (Warm Blush, Ivory & Antique Gold)
  {
    id: 'tpl_events_rosewood_weddings',
    title: 'Rosewood Luxury Destination Weddings',
    subtitle: 'Lake Como, Amalfi & French Chateaux fairy tale wedding production and floral styling',
    category: 'events',
    categoryName: 'Events',
    categoryNameAr: 'المناسبات والفعاليات',
    type: 'landing',
    isFeatured: true,
    badge: 'Vogue Weddings',
    badgeAr: 'تنظيم أعراس فاخرة',
    preview: {
      themePreset: 'beige',
      headerBg: '#faf5f2',
      cardBg: '#ffffff',
      accentColor: '#c27d53',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ROSEWOOD WEDDINGS',
      heroSubtitle: 'Bespoke European destination nuptials crafted down to the most tender detail',
      buttons: [
        { label: 'Schedule Consultation', labelAr: 'حجز موعد استشارة زفاف', style: 'filled', color: '#c27d53' },
        { label: 'Real Weddings Gallery', labelAr: 'معرض الأعراس الحقيقية', style: 'outline' }
      ],
      tags: ['Featured in Vogue', 'Lake Como Specialists', 'Full Concierge Execution']
    },
    themeConfig: createThemeConfig('beige', '#fdfbf9', '#ffffff', '#c27d53', '#1c1917', '#78716c', '#b46d43', '#e7dfd5', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Rosewood Weddings | Destination Wedding Planner Italy & France',
      metaDescription: 'Exclusive destination wedding planning for couples seeking timeless European romance.',
      ogImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_eve1_hero', 'ROSEWOOD WEDDINGS', 'Creating breathless, deeply emotional celebrations of love across the world’s most romantic settings.', 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80', undefined, 'LUXURY WEDDINGS'),
      createButtonBlock('b_eve1_btn', 'Begin Planning Your 2026/27 Destination Nuptials', 'https://wa.me/?text=Hello%20Rosewood%2C%20we%20are%20planning%20our%20wedding', 'primary')
    ]
  },

  // 17.2 Apex Global Tech Summit & Innovation Conference (Modern High-Tech Navy & Cyan)
  {
    id: 'tpl_events_apex_summit',
    title: 'Apex Global Tech Summit 2026',
    subtitle: '5,000+ Founders, VCs, and AI engineers gathering in San Francisco & Singapore',
    category: 'events',
    categoryName: 'Events',
    categoryNameAr: 'المناسبات والفعاليات',
    type: 'landing',
    isFeatured: true,
    badge: 'Tech Summit',
    badgeAr: 'مؤتمر تقني عالمي',
    preview: {
      themePreset: 'dark',
      headerBg: '#090f1e',
      cardBg: '#121f3d',
      accentColor: '#06b6d4',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'APEX SUMMIT 2026',
      heroSubtitle: 'Defining the frontiers of artificial intelligence and venture capital',
      buttons: [
        { label: 'Register Early-Bird Pass', labelAr: 'حجز التذكرة المبكرة المخفضة', style: 'filled', color: '#0891b2' },
        { label: 'Keynote Speaker Roster', labelAr: 'قائمة المتحدثين الرئيسيين', style: 'outline' }
      ],
      tags: ['5,000 Attendees', '120+ Keynote Stages', 'VIP Investor Dinners']
    },
    themeConfig: createThemeConfig('dark', '#060a15', '#0e172e', '#06b6d4', '#f8fafc', '#67e8f9', '#0891b2', '#1b2e59', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'Apex Global Summit 2026 | AI, Tech & Venture Capital Conference',
      metaDescription: 'The premier global gathering of technology pioneers, unicorn founders, and seed investors.',
      ogImageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_eve2_hero', 'APEX TECH SUMMIT', 'Connect with the leaders building the next generation of technological civilization.', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1000&auto=format&fit=crop&q=80', undefined, 'GLOBAL SUMMIT'),
      createButtonBlock('b_eve2_btn', 'Secure Your Early Bird Pass (Save $400 Before March 31)', 'https://esaia.app', 'primary')
    ]
  },

  // 17.3 Gala dOr Annual Charity Philanthropy Ball (Gilded Midnight & Liquid Gold)
  {
    id: 'tpl_events_gala_dor',
    title: 'Gala d’Or Annual Charity Philanthropy Ball',
    subtitle: 'Black-tie charitable auction, symphony gala & banquet benefiting children’s hospitals',
    category: 'events',
    categoryName: 'Events',
    categoryNameAr: 'المناسبات والفعاليات',
    type: 'landing',
    isFeatured: false,
    badge: 'Charity Gala',
    badgeAr: 'حفل خيري راقي',
    preview: {
      themePreset: 'dark',
      headerBg: '#0f0e0c',
      cardBg: '#1c1a17',
      accentColor: '#d4af37',
      textColor: '#fdfcf7',
      heroCoverUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'GALA D’OR 2026',
      heroSubtitle: 'An evening of generosity, high culture, and enduring global impact',
      buttons: [
        { label: 'Reserve Patron Table', labelAr: 'حجز طاولة الرعاة الرسميين', style: 'filled', color: '#d4af37' },
        { label: 'Live Auction Lots', labelAr: 'معروضات المزاد الخيري', style: 'outline' }
      ],
      tags: ['$15M Raised to Date', 'Black-Tie & Haute Couture', 'Private Art Auction']
    },
    themeConfig: createThemeConfig('dark', '#0a0908', '#141210', '#d4af37', '#fdfcf7', '#a8a29e', '#f59e0b', '#2e2820', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Gala d’Or | Annual Philanthropy Benefit Ball & Auction',
      metaDescription: 'A prestigious black-tie gala uniting philanthropists and civic leaders for humanitarian causes.',
      ogImageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_eve3_hero', 'GALA D’OR PHILANTHROPY', 'Uniting influential leaders to fund world-changing medical breakthroughs.', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&auto=format&fit=crop&q=80', undefined, 'CHARITY GALA'),
      createButtonBlock('b_eve3_btn', 'Reserve a Private Patron Table (10 Seats)', 'https://wa.me/?text=Hello%20Gala%20d%27Or%2C%20we%20wish%20to%20reserve%20a%20table', 'primary')
    ]
  },

  // 17.4 NeonNights Electronic Music Festival (Ultra Neon Magenta, Violet & Cyan)
  {
    id: 'tpl_events_neonnights_fest',
    title: 'NeonNights 3-Day Music & Arts Festival',
    subtitle: '4 stages, 80 international electronic DJs, immersive light installations & desert camping',
    category: 'events',
    categoryName: 'Events',
    categoryNameAr: 'المناسبات والفعاليات',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Music Festival',
    badgeAr: 'مهرجان موسيقي',
    preview: {
      themePreset: 'dark',
      headerBg: '#130826',
      cardBg: '#220e42',
      accentColor: '#ec4899',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'NEONNIGHTS 2026',
      heroSubtitle: '3 days of otherworldly soundscapes, art, and desert sunrise sets',
      buttons: [
        { label: 'Buy Festival Weekend Wristbands', labelAr: 'شراء أساور الدخول لعطلة نهاية الأسبوع', style: 'filled', color: '#db2777' },
        { label: 'Glamping & RV Passes', labelAr: 'تذاكر التخييم الفاخر والكرفانات', style: 'outline' }
      ],
      tags: ['4 Massive Stages', 'Camping Village', 'Visual Projection Mapping']
    },
    themeConfig: createThemeConfig('dark', '#0c051a', '#180a30', '#ec4899', '#fdf2f8', '#f472b6', '#f43f5e', '#391463', 'Space Grotesk', 'Space Grotesk', 'filled', 'full'),
    seo: {
      metaTitle: 'NeonNights Festival | 3-Day Music & Visual Arts Experience',
      metaDescription: 'The ultimate electronic dance music festival featuring world-famous headliners and immersive art.',
      ogImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_eve4_hero', 'NEONNIGHTS FESTIVAL', 'Lose yourself in an extraordinary sanctuary of light, frequency, and dance.', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&auto=format&fit=crop&q=80', undefined, 'MUSIC FESTIVAL'),
      createButtonBlock('b_eve4_btn', 'Explore Festival Lineup and Wristband Tiers', 'https://esaia.app', 'primary')
    ]
  },

  // 17.5 Celebrate Kids Themed Birthday & Party Magic (Playful Pastel Rainbow & Confetti)
  {
    id: 'tpl_events_celebrate_kids',
    title: 'Celebrate Kids Birthday & Party Styling',
    subtitle: 'Balloon arches, character appearances, custom dessert tables & bounce castle packages',
    category: 'events',
    categoryName: 'Events',
    categoryNameAr: 'المناسبات والفعاليات',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Kids Parties',
    badgeAr: 'حفلات أعياد ميلاد أطفال',
    preview: {
      themePreset: 'light',
      headerBg: '#fdf4ff',
      cardBg: '#ffffff',
      accentColor: '#c026d3',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'CELEBRATE KIDS',
      heroSubtitle: 'Turning childhood birthday dreams into magical reality',
      buttons: [
        { label: 'Check Date & Party Themes', labelAr: 'التحقق من التاريخ وثيمات الحفل', style: 'filled', color: '#c026d3' },
        { label: 'Party Rental Packages', labelAr: 'باقات تأجير ألعاب الحفلات', style: 'outline' }
      ],
      tags: ['Organic Balloon Styling', 'Live Performers', 'Zero-Cleanup Service']
    },
    themeConfig: createThemeConfig('light', '#fef8ff', '#ffffff', '#c026d3', '#1c1917', '#78716c', '#a21caf', '#f5d0fe', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'full'),
    seo: {
      metaTitle: 'Celebrate Kids | Children’s Birthday Party Planner & Balloons',
      metaDescription: 'Stress-free children’s birthday parties, bespoke character visits, and luxury balloon installations.',
      ogImageUrl: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_eve5_hero', 'CELEBRATE KIDS ENTERTAINMENT', 'Pure childhood wonder with breathtaking party decor, games, and memories.', 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1000&auto=format&fit=crop&q=80', undefined, 'KIDS PARTIES'),
      createButtonBlock('b_eve5_btn', 'Book Your Child’s Birthday Party Package', 'https://esaia.app', 'primary')
    ]
  }
];

// =========================================================================
// 18. SPORTS & FITNESS (الرياضة واللياقة) - 5 Distinct Templates
// =========================================================================
export const sportsTemplates: TemplateItem[] = [
  // 18.1 Forge Performance Functional Cross-Training Gym (Industrial Iron Charcoal & Neon Lime)
  {
    id: 'tpl_sports_forge_crossfit',
    title: 'Forge Performance Functional Training Gym',
    subtitle: 'Olympic weightlifting, high-intensity functional conditioning & elite strength coaching',
    category: 'sports',
    categoryName: 'Sports & fitness',
    categoryNameAr: 'الرياضة واللياقة',
    type: 'landing',
    isFeatured: true,
    badge: 'Strength Gym',
    badgeAr: 'نادي كروس فت ولياقة',
    preview: {
      themePreset: 'dark',
      headerBg: '#0b0e14',
      cardBg: '#131924',
      accentColor: '#84cc16',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'FORGE PERFORMANCE',
      heroSubtitle: 'Build unbreakable physical capacity and mental toughness',
      buttons: [
        { label: 'Claim Free Trial Week', labelAr: 'تجربة مجانية لمدة أسبوع', style: 'filled', color: '#65a30d' },
        { label: 'Class Timetable', labelAr: 'جدول الحصص والتمارين', style: 'outline' }
      ],
      tags: ['Eleiko Barbells', 'Daily Metcon Coaching', 'In-House Physiotherapist']
    },
    themeConfig: createThemeConfig('dark', '#070a0e', '#0f141c', '#84cc16', '#f8fafc', '#a3e635', '#65a30d', '#1e293b', 'Space Grotesk', 'Space Grotesk', 'filled', 'none'),
    seo: {
      metaTitle: 'Forge Performance | Functional Training & Olympic Lifting Gym',
      metaDescription: 'World-class strength and conditioning facility helping athletes of all levels achieve peak fitness.',
      ogImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_spo1_hero', 'FORGE PERFORMANCE FACILITY', 'Discipline, barbell precision, and conditioning engineered to forge real strength.', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&auto=format&fit=crop&q=80', undefined, 'FUNCTIONAL FITNESS'),
      createButtonBlock('b_spo1_btn', 'Book Your Free Fitness Assessment & Trial Session', 'https://wa.me/?text=Hi%20Forge%2C%20I%20want%20to%20try%20a%20free%20trial%20class', 'primary'),
      createParagraphBlock('b_spo1_stats', '🏋️ 500+ Active Athletes  |  🏆 Certified Level 3 Coaches  |  ⏱️ 60-Minute High-Energy Classes')
    ]
  },

  // 18.2 Prana Sanctuary Ashtanga & Sound Healing Yoga (Serene Sand, Sage & Lotus Pink)
  {
    id: 'tpl_sports_prana_yoga',
    title: 'Prana Sanctuary Yoga & Sound Healing',
    subtitle: 'Hot vinyasa flow, yin restorative, Tibetan singing bowl sound baths & meditation',
    category: 'sports',
    categoryName: 'Sports & fitness',
    categoryNameAr: 'الرياضة واللياقة',
    type: 'landing',
    isFeatured: true,
    badge: 'Zen Sanctuary',
    badgeAr: 'استوديو يوغا وتأمل',
    preview: {
      themePreset: 'beige',
      headerBg: '#f5f2eb',
      cardBg: '#ffffff',
      accentColor: '#0d9488',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'PRANA SANCTUARY',
      heroSubtitle: 'Restore balance to body, breath, and mind in our light-filled cedar studio',
      buttons: [
        { label: 'Book First Class ($15)', labelAr: 'حجز أول حصة يوغا (15$)', style: 'filled', color: '#0d9488' },
        { label: 'Sound Bath Schedule', labelAr: 'جدول جلسات الصوت والشاكرات', style: 'outline' }
      ],
      tags: ['Infrared Radiant Heat', 'Complimentary Mats', 'Tea Lounge']
    },
    themeConfig: createThemeConfig('beige', '#faf7f2', '#ffffff', '#0d9488', '#1c1917', '#78716c', '#0f766e', '#ccfbf1', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Prana Sanctuary | Hot Yoga, Sound Baths & Meditation Studio',
      metaDescription: 'Transformative yoga practices and deep sound healing baths designed for mindful living.',
      ogImageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_spo2_hero', 'PRANA YOGA SANCTUARY', 'A serene refuge from city noise to reconnect with your authentic inner rhythm.', 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1000&auto=format&fit=crop&q=80', undefined, 'YOGA & SOUND'),
      createButtonBlock('b_spo2_btn', 'Reserve Your Mat for Upcoming Sound Bath', 'https://esaia.app', 'primary')
    ]
  },

  // 18.3 IronPadel Club & Racquet Academy (Mediterranean Terracotta & Electric Blue)
  {
    id: 'tpl_sports_iron_padel',
    title: 'IronPadel Premium Racquet Club',
    subtitle: '8 panoramic glass padel courts, professional private coaching, pro shop & clubhouse lounge',
    category: 'sports',
    categoryName: 'Sports & fitness',
    categoryNameAr: 'الرياضة واللياقة',
    type: 'landing',
    isFeatured: false,
    badge: 'Padel Club',
    badgeAr: 'نادي بادل وتنس',
    preview: {
      themePreset: 'dark',
      headerBg: '#0b1626',
      cardBg: '#12253f',
      accentColor: '#38bdf8',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'IRONPADEL CLUB',
      heroSubtitle: 'The fastest growing racquet sport in unmatched architectural luxury',
      buttons: [
        { label: 'Book Court Online', labelAr: 'حجز ملعب بادل إلكترونياً', style: 'filled', color: '#0284c7' },
        { label: 'Padel Academy Classes', labelAr: 'أكاديمية التدريب للمبتدئين والمحترفين', style: 'outline' }
      ],
      tags: ['Super-Panoramic Glass', 'Mondo WPT Turf', 'Locker Rooms & Saunas']
    },
    themeConfig: createThemeConfig('dark', '#070f1a', '#0d1c30', '#38bdf8', '#f8fafc', '#93c5fd', '#0284c7', '#172f4f', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'IronPadel | Luxury Padel Courts, Academy & Tournaments',
      metaDescription: 'State-of-the-art indoor and outdoor panoramic padel courts with online booking and league play.',
      ogImageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_spo3_hero', 'IRONPADEL CLUB', 'High-energy matches, world-class turf, and an electric post-match social atmosphere.', 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1000&auto=format&fit=crop&q=80', undefined, 'PADEL CLUB'),
      createButtonBlock('b_spo3_btn', 'Book a 90-Minute Court Session Instantly', 'https://esaia.app', 'primary')
    ]
  },

  // 18.4 Marcus Vance Celebrity Personal Trainer & Physique Architect (Dark Obsidian & Pure Orange)
  {
    id: 'tpl_sports_physique_coach',
    title: 'Marcus Vance - Celebrity Physique Coach',
    subtitle: 'Bespoke body recomposition, biomechanics analysis & macro nutrition protocols',
    category: 'sports',
    categoryName: 'Sports & fitness',
    categoryNameAr: 'الرياضة واللياقة',
    type: 'business_card',
    isFeatured: false,
    badge: 'Physique Coach',
    badgeAr: 'مدرب لياقة شخصي',
    preview: {
      themePreset: 'dark',
      headerBg: '#120d09',
      cardBg: '#1f1610',
      accentColor: '#f97316',
      textColor: '#ffffff',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'MARCUS VANCE',
      heroSubtitle: 'Transforming high-performing executives and actors with surgical precision',
      buttons: [
        { label: 'Apply for 1-on-1 Coaching', labelAr: 'التقديم للتدريب الخاص 1-على-1', style: 'filled', color: '#ea580c' },
        { label: 'Client Transformation Photos', labelAr: 'صور التحولات والنتائج الحقيقية', style: 'outline' }
      ],
      tags: ['CSCS Certified', 'Strict 10-Client Cap', 'Custom Mobile App Tracking']
    },
    themeConfig: createThemeConfig('dark', '#0d0906', '#16100b', '#f97316', '#fff7ed', '#fed7aa', '#ea580c', '#332215', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'Marcus Vance | Elite Personal Trainer & Body Recomposition',
      metaDescription: 'High-touch private personal training focusing on fat loss, muscle sculpting, and longevity.',
      ogImageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_spo4_hero', 'MARCUS VANCE COACHING', 'No fads. No guesswork. Just rigorous physiological science and undeniable body transformations.', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80', undefined, 'ELITE COACHING'),
      createVCardBlock('b_spo4_vcard', {
        fullName: 'Marcus Vance, CSCS',
        jobTitle: 'Head Performance Coach',
        company: 'Vance Physique Systems',
        phone: '+1 (310) 555-0149',
        email: 'marcus@vancephysique.com',
        website: 'https://esaia.app',
        bio: 'Over 12 years transforming actors, athletes, and founders through science-based lifting.'
      })
    ]
  },

  // 18.5 Apex Combat Muay Thai & Brazilian Jiu-Jitsu Academy (Aggressive Crimson & Carbon Black)
  {
    id: 'tpl_sports_combat_academy',
    title: 'Apex Combat Muay Thai & BJJ Academy',
    subtitle: 'Authentic Bangkok striking, IBJJF championship Brazilian Jiu-Jitsu & self-defense',
    category: 'sports',
    categoryName: 'Sports & fitness',
    categoryNameAr: 'الرياضة واللياقة',
    type: 'landing',
    isFeatured: false,
    badge: 'Martial Arts',
    badgeAr: 'فنون قتالية ومواي تاي',
    preview: {
      themePreset: 'dark',
      headerBg: '#120b0b',
      cardBg: '#1f1212',
      accentColor: '#ef4444',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'APEX COMBAT ACADEMY',
      heroSubtitle: 'True discipline, humility, and lethal self-defense on the mats',
      buttons: [
        { label: 'Book First Free Trial Class', labelAr: 'حجز حصة تجريبية مجانية', style: 'filled', color: '#dc2626' },
        { label: 'Black Belt Instructors', labelAr: 'المدربين الحزام الأسود', style: 'outline' }
      ],
      tags: ['Lumpinee Champions', 'Gi & No-Gi Jiu Jitsu', 'All Levels Welcome']
    },
    themeConfig: createThemeConfig('dark', '#0c0707', '#140c0c', '#ef4444', '#fef2f2', '#fca5a5', '#dc2626', '#2d1818', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'Apex Combat | Muay Thai & Brazilian Jiu-Jitsu Academy',
      metaDescription: 'World-class martial arts instruction in Brazilian Jiu-Jitsu, Muay Thai kickboxing, and MMA.',
      ogImageUrl: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_spo5_hero', 'APEX COMBAT ACADEMY', 'Forge unbreakable mental grit and master real martial arts in a welcoming community.', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1000&auto=format&fit=crop&q=80', undefined, 'MARTIAL ARTS'),
      createButtonBlock('b_spo5_btn', 'Sign Up for Your Free Introductory Class', 'https://esaia.app', 'primary')
    ]
  }
];
