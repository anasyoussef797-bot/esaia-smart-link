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
// 19. TECH (التكنولوجيا والبرمجيات) - 5 Distinct Templates
// =========================================================================
export const techTemplates: TemplateItem[] = [
  // 19.1 Agentic AI Enterprise Autonomous Agents (Deep Cosmic Indigo & Electric Violet)
  {
    id: 'tpl_tech_agentic_ai',
    title: 'CognitiveOS - Enterprise Autonomous AI Agents',
    subtitle: 'Deploy self-healing workflow agents that automate complex knowledge tasks across your stack',
    category: 'tech',
    categoryName: 'Tech',
    categoryNameAr: 'التكنولوجيا والبرمجيات',
    type: 'landing',
    isFeatured: true,
    badge: 'AI Agents',
    badgeAr: 'وكلاء ذكاء اصطناعي',
    preview: {
      themePreset: 'dark',
      headerBg: '#09081e',
      cardBg: '#12103b',
      accentColor: '#8b5cf6',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'COGNITIVEOS AI',
      heroSubtitle: 'Autonomous enterprise workflows with guaranteed accuracy and deterministic control',
      buttons: [
        { label: 'Book Live Agent Demo', labelAr: 'حجز عرض توضيحي مباشر', style: 'filled', color: '#7c3aed' },
        { label: 'SDK & API Documentation', labelAr: 'توثيق واجهة المطورين SDK', style: 'outline' }
      ],
      tags: ['Multi-Agent Swarms', 'SOC2 Type II & HIPAA', 'Self-Hosted LLM Option']
    },
    themeConfig: createThemeConfig('dark', '#060515', '#0e0c29', '#8b5cf6', '#faf5ff', '#c084fc', '#7c3aed', '#211d54', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'CognitiveOS | Autonomous AI Agents for Enterprise Automation',
      metaDescription: 'Deploy autonomous agent swarms that understand context, execute actions, and scale operations.',
      ogImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_tech1_hero', 'COGNITIVEOS AGENT PLATFORM', 'Empower your enterprise with autonomous AI agents that think, adapt, and execute 24/7.', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80', undefined, 'AGENTIC AI'),
      createButtonBlock('b_tech1_btn', 'Request Enterprise Architecture & Private Sandbox Demo', 'https://esaia.app', 'primary'),
      createParagraphBlock('b_tech1_stats', '🤖 10x Operational Speed  |  🔒 Enterprise Air-Gapped Security  |  ⚡ 99.99% Uptime SLA')
    ]
  },

  // 19.2 CyberShield Zero-Trust Cloud Cybersecurity (Terminal Dark Obsidian & Matrix Emerald)
  {
    id: 'tpl_tech_cybershield_sec',
    title: 'CyberShield Zero-Trust Cloud Defense',
    subtitle: 'Automated penetration testing, real-time threat hunting & identity-based zero trust',
    category: 'tech',
    categoryName: 'Tech',
    categoryNameAr: 'التكنولوجيا والبرمجيات',
    type: 'landing',
    isFeatured: true,
    badge: 'Zero-Trust',
    badgeAr: 'أمن سحابي وسيبراني',
    preview: {
      themePreset: 'dark',
      headerBg: '#08100d',
      cardBg: '#0f211b',
      accentColor: '#10b981',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'CYBERSHIELD DEFENSE',
      heroSubtitle: 'Continuous automated offensive security protecting multi-cloud architectures',
      buttons: [
        { label: 'Run Instant Vulnerability Scan', labelAr: 'فحص فوري للثغرات الأمنية', style: 'filled', color: '#059669' },
        { label: 'Compliance Readiness (SOC2)', labelAr: 'جاهزية الامتثال SOC2', style: 'outline' }
      ],
      tags: ['AI Threat Hunting', 'Zero-Day Shielding', 'Multi-Cloud Native']
    },
    themeConfig: createThemeConfig('dark', '#050a08', '#0a1713', '#10b981', '#f0fdf4', '#6ee7b7', '#059669', '#14382c', 'Space Grotesk', 'Space Grotesk', 'filled', 'none'),
    seo: {
      metaTitle: 'CyberShield | Autonomous Zero-Trust Cloud Security & Pentesting',
      metaDescription: 'Eliminate security vulnerabilities before hackers find them with autonomous AI penetration testing.',
      ogImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_tech2_hero', 'CYBERSHIELD AUTONOMOUS DEFENSE', 'Uncompromising cybersecurity built for modern distributed infrastructure and Kubernetes.', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80', undefined, 'CYBERSECURITY'),
      createButtonBlock('b_tech2_btn', 'Start Free Multi-Cloud Vulnerability Assessment', 'https://esaia.app', 'primary')
    ]
  },

  // 19.3 Pulse Cloud Observability & Telemetry Platform (High-Density Dark Slate & Cyan)
  {
    id: 'tpl_tech_pulse_devops',
    title: 'Pulse Observability & APM Platform',
    subtitle: 'Unified logs, distributed traces & eBPF system metrics with zero-overhead collection',
    category: 'tech',
    categoryName: 'Tech',
    categoryNameAr: 'التكنولوجيا والبرمجيات',
    type: 'landing',
    isFeatured: false,
    badge: 'Observability',
    badgeAr: 'مراقبة السيرفرات DevOps',
    preview: {
      themePreset: 'dark',
      headerBg: '#090e18',
      cardBg: '#111b2e',
      accentColor: '#0ea5e9',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'PULSE TELEMETRY',
      heroSubtitle: 'Pinpoint distributed microservice bottlenecks in milliseconds, not hours',
      buttons: [
        { label: 'Deploy Agent in 60 Seconds', labelAr: 'تثبيت عميل المراقبة في 60 ثانية', style: 'filled', color: '#0284c7' },
        { label: 'Interactive Live Sandbox', labelAr: 'تجربة لوحة التحكم التفاعلية', style: 'outline' }
      ],
      tags: ['OpenTelemetry Native', 'eBPF Kernel Tracing', 'Unlimited Retention']
    },
    themeConfig: createThemeConfig('dark', '#060910', '#0c1421', '#0ea5e9', '#f8fafc', '#7dd3fc', '#0284c7', '#172742', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'Pulse | Next-Gen Cloud Observability & APM Tracing',
      metaDescription: 'Full-fidelity distributed tracing and telemetry engineered for high-throughput cloud environments.',
      ogImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_tech3_hero', 'PULSE OBSERVABILITY', 'Deep visibility into every request, container, and database query across your global stack.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80', undefined, 'DEVOPS OBSERVABILITY'),
      createButtonBlock('b_tech3_btn', 'Start Free 14-Day Pro Cloud Trial', 'https://esaia.app', 'primary')
    ]
  },

  // 19.4 Nexa Quantum Computing Algorithms & Cryptography (Deep Space Black & Pulsing Cyan)
  {
    id: 'tpl_tech_quantum_nexa',
    title: 'Nexa Quantum Algorithms & Post-Quantum Encryption',
    subtitle: 'Simulating complex chemical synthesis and implementing NIST-approved post-quantum lattice crypto',
    category: 'tech',
    categoryName: 'Tech',
    categoryNameAr: 'التكنولوجيا والبرمجيات',
    type: 'landing',
    isFeatured: false,
    badge: 'Post-Quantum',
    badgeAr: 'حوسبة كمومية وتشفير',
    preview: {
      themePreset: 'dark',
      headerBg: '#05070d',
      cardBg: '#0c101c',
      accentColor: '#38bdf8',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'NEXA QUANTUM LAB',
      heroSubtitle: 'Bridging practical enterprise software to fault-tolerant quantum advantages',
      buttons: [
        { label: 'Read Research Papers', labelAr: 'قراءة الأوراق البحثية العلمية', style: 'filled', color: '#0284c7' },
        { label: 'Lattice Cryptography SDK', labelAr: 'مكتبة التشفير المقاوم للكم', style: 'outline' }
      ],
      tags: ['NIST FIPS Approved', 'QPU Cloud Access', 'Pharma Simulation Ready']
    },
    themeConfig: createThemeConfig('dark', '#030509', '#080c14', '#38bdf8', '#f8fafc', '#93c5fd', '#0284c7', '#121929', 'Space Grotesk', 'Space Grotesk', 'filled', 'none'),
    seo: {
      metaTitle: 'Nexa Quantum | Post-Quantum Cryptography & Quantum Computing',
      metaDescription: 'Future-proof enterprise security against quantum decryption with NIST-standardized algorithms.',
      ogImageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_tech4_hero', 'NEXA QUANTUM PLATFORM', 'Preparing world financial systems and pharmaceutical discovery for the post-quantum era.', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1000&auto=format&fit=crop&q=80', undefined, 'QUANTUM COMPUTING'),
      createButtonBlock('b_tech4_btn', 'Request Quantum Migration Advisory Consultation', 'https://esaia.app', 'primary')
    ]
  },

  // 19.5 David Chen Principal Solutions Architect & Tech Lead (Clean Modern Terminal Card)
  {
    id: 'tpl_tech_solutions_architect',
    title: 'David Chen - Principal Cloud & Distributed Systems Architect',
    subtitle: 'Advising Series B+ scale-ups on high-throughput microservices, Rust, and AWS cost reduction',
    category: 'tech',
    categoryName: 'Tech',
    categoryNameAr: 'التكنولوجيا والبرمجيات',
    type: 'business_card',
    isFeatured: false,
    badge: 'Staff Architect',
    badgeAr: 'مهندس معماري سحابي',
    preview: {
      themePreset: 'dark',
      headerBg: '#0e1117',
      cardBg: '#161b22',
      accentColor: '#58a6ff',
      textColor: '#f0f6fc',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'DAVID CHEN',
      heroSubtitle: 'Fractional CTO & Cloud Infrastructure Architect',
      buttons: [
        { label: 'Book Architecture Review', labelAr: 'حجز مراجعة معمارية النظام', style: 'filled', color: '#1f6feb' },
        { label: 'Technical Writing & GitHub', labelAr: 'مشاريع GitHub والمقالات التقنية', style: 'outline' }
      ],
      tags: ['Ex-AWS Principal', 'Kubernetes Expert', 'Rust & Golang Systems']
    },
    themeConfig: createThemeConfig('dark', '#090d13', '#0d1117', '#58a6ff', '#f0f6fc', '#8b949e', '#1f6feb', '#21262d', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'David Chen | Cloud Solutions Architect & Fractional CTO',
      metaDescription: 'Expert consulting for high-throughput cloud migrations, distributed architectures, and DevOps.',
      ogImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_tech5_hero', 'DAVID CHEN ARCHITECTURE', 'Architecting resilient, hyper-scale cloud backends that never buckle under traffic spikes.', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'SOLUTIONS ARCHITECT'),
      createVCardBlock('b_tech5_vcard', {
        fullName: 'David Chen',
        jobTitle: 'Principal Cloud Architect & Fractional CTO',
        company: 'Chen Systems Advisory',
        phone: '+1 (415) 555-0163',
        email: 'david@chensystems.io',
        website: 'https://esaia.app',
        bio: 'Over 16 years designing distributed backends serving 100M+ monthly active users.'
      })
    ]
  }
];

// =========================================================================
// 20. FINANCE (المالية والاستثمار) - 5 Distinct Templates
// =========================================================================
export const financeTemplates: TemplateItem[] = [
  // 20.1 Aureus Private Wealth & Multi-Family Office (Swiss Bank Navy & Antique Gold)
  {
    id: 'tpl_fin_aureus_wealth',
    title: 'Aureus Multi-Family Office & Wealth Management',
    subtitle: 'Generational estate planning, private equity allocations & global wealth preservation',
    category: 'finance',
    categoryName: 'Finance',
    categoryNameAr: 'المالية والاستثمار',
    type: 'landing',
    isFeatured: true,
    badge: 'Family Office',
    badgeAr: 'إدارة ثروات عائلية',
    preview: {
      themePreset: 'dark',
      headerBg: '#090e18',
      cardBg: '#121c2e',
      accentColor: '#c5a059',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'AUREUS WEALTH',
      heroSubtitle: 'Protecting and compounding multi-generational family legacies with Swiss precision',
      buttons: [
        { label: 'Schedule Confidential Intake', labelAr: 'جلسة استشارية سرية للثروات', style: 'filled', color: '#c5a059' },
        { label: 'Private Wealth Dossier', labelAr: 'ملف استراتيجيات حماية الأصول', style: 'outline' }
      ],
      tags: ['Minimum $10M Liquid', 'Zurich & Geneva Offices', 'Fiduciary Standard Only']
    },
    themeConfig: createThemeConfig('dark', '#060a12', '#0e1726', '#c5a059', '#f8fafc', '#cbd5e1', '#dfb76c', '#1b2a42', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Aureus Wealth | Multi-Family Office & Private Wealth Advisory',
      metaDescription: 'Bespoke investment stewardship, cross-border tax planning, and philanthropic endowment management.',
      ogImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fin1_hero', 'AUREUS PRIVATE WEALTH', 'Generational stewardship safeguarding family enterprises against macroeconomic volatility.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80', undefined, 'FAMILY OFFICE'),
      createButtonBlock('b_fin1_btn', 'Request Private Wealth Partner Consultation', 'https://wa.me/?text=Hello%20Aureus%2C%20I%20wish%20to%20inquire%20about%20wealth%20advisory', 'primary'),
      createParagraphBlock('b_fin1_stats', '💼 $4.2B Assets Under Management  |  🛡️ 100% Pure Fiduciary  |  🌐 4 Global Financial Hubs')
    ]
  },

  // 20.2 AlphaMetrics Algorithmic Quant Hedge Fund (Wall Street Midnight Navy & Mint Green)
  {
    id: 'tpl_fin_alphametrics_hedge',
    title: 'AlphaMetrics Quantitative Hedge Fund',
    subtitle: 'Statistical arbitrage, machine-learning market signals & market-neutral liquid strategies',
    category: 'finance',
    categoryName: 'Finance',
    categoryNameAr: 'المالية والاستثمار',
    type: 'landing',
    isFeatured: true,
    badge: 'Quant Fund',
    badgeAr: 'صندوق استثمار كمي',
    preview: {
      themePreset: 'dark',
      headerBg: '#090e18',
      cardBg: '#111b2e',
      accentColor: '#10b981',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ALPHAMETRICS QUANT',
      heroSubtitle: 'Systematic alpha extraction powered by proprietary high-frequency models',
      buttons: [
        { label: 'Institutional Investor Portal', labelAr: 'بوابة المستثمرين المؤسسيين', style: 'filled', color: '#059669' },
        { label: 'Historical Sharpe Ratio Report', labelAr: 'تقارير الأداء ومعدل شارب', style: 'outline' }
      ],
      tags: ['Sharpe Ratio 2.8', 'Market-Neutral Returns', 'Low Drawdown Mandate']
    },
    themeConfig: createThemeConfig('dark', '#060910', '#0c1421', '#10b981', '#f8fafc', '#6ee7b7', '#059669', '#172742', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'AlphaMetrics | Quantitative Systematic Hedge Fund',
      metaDescription: 'Institutional systematic quantitative investment fund delivering uncorrelated returns across market regimes.',
      ogImageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fin2_hero', 'ALPHAMETRICS QUANTITATIVE CAPITAL', 'Extracting uncorrelated alpha through mathematical modeling, big data, and machine intelligence.', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1000&auto=format&fit=crop&q=80', undefined, 'QUANTITATIVE CAPITAL'),
      createButtonBlock('b_fin2_btn', 'Request Accredited Investor Information Memorandum', 'https://esaia.app', 'primary')
    ]
  },

  // 20.3 WealthWise Personal Financial Planning & Tax Optimization (Friendly Warm Emerald & Sage)
  {
    id: 'tpl_fin_wealthwise_cfp',
    title: 'WealthWise Personal Financial Planning',
    subtitle: 'Fee-only Certified Financial Planners helping families retire early and eliminate tax burdens',
    category: 'finance',
    categoryName: 'Finance',
    categoryNameAr: 'المالية والاستثمار',
    type: 'landing',
    isFeatured: false,
    badge: 'Fee-Only CFP',
    badgeAr: 'تخطيط مالي وتقاعد',
    preview: {
      themePreset: 'light',
      headerBg: '#f0fdf4',
      cardBg: '#ffffff',
      accentColor: '#16a34a',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'WEALTHWISE ADVISORY',
      heroSubtitle: 'Clarity, confidence, and tax-smart strategies for your financial future',
      buttons: [
        { label: 'Book Free 30-Min Discovery Call', labelAr: 'حجز مكالمة استكشافية مجانية', style: 'filled', color: '#16a34a' },
        { label: 'Retirement Readiness Quiz', labelAr: 'اختبار الجاهزية للتقاعد', style: 'outline' }
      ],
      tags: ['No Sales Commissions', 'Fiduciary Oath', 'Comprehensive Tax Planning']
    },
    themeConfig: createThemeConfig('light', '#f5faf6', '#ffffff', '#16a34a', '#0f172a', '#475569', '#15803d', '#dcfce7', 'Plus Jakarta Sans', 'Plus Jakarta Sans', 'filled', 'lg'),
    seo: {
      metaTitle: 'WealthWise | Fee-Only Certified Financial Planner (CFP)',
      metaDescription: 'Holistic personal financial planning, tax reduction, and early retirement guidance without commissions.',
      ogImageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fin3_hero', 'WEALTHWISE FINANCIAL ADVISORY', 'Your money working for you. Clear plans, smart taxes, and peace of mind.', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80', undefined, 'FINANCIAL PLANNING'),
      createButtonBlock('b_fin3_btn', 'Schedule Complimentary 30-Minute Financial Audit', 'https://wa.me/?text=Hello%20WealthWise%2C%20I%20would%20like%20to%20book%20a%20call', 'primary')
    ]
  },

  // 20.4 Nexus Crypto & DeFi Yield Treasury Management (Cyber Violet & Neon Blue)
  {
    id: 'tpl_fin_nexus_crypto',
    title: 'Nexus Institutional Digital Asset Treasury',
    subtitle: 'Cold-storage institutional custody, yield generation on stablecoins & automated staking',
    category: 'finance',
    categoryName: 'Finance',
    categoryNameAr: 'المالية والاستثمار',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Digital Assets',
    badgeAr: 'أصول رقمية وعملات مشفرة',
    preview: {
      themePreset: 'dark',
      headerBg: '#0b0817',
      cardBg: '#15102a',
      accentColor: '#8b5cf6',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'NEXUS DIGITAL ASSETS',
      heroSubtitle: 'Institutional-grade custody and compliant DeFi yield solutions',
      buttons: [
        { label: 'Explore Treasury Yield Rates', labelAr: 'عوائد إدارة الخزينة الرقمية', style: 'filled', color: '#7c3aed' },
        { label: 'Custody Insurance Policy ($250M)', labelAr: 'وثيقة التأمين على المحافظ', style: 'outline' }
      ],
      tags: ['Fireblocks Multi-Sig', 'SOC2 Compliant', 'Automated Proof of Reserves']
    },
    themeConfig: createThemeConfig('dark', '#07050f', '#100c21', '#8b5cf6', '#faf5ff', '#c084fc', '#7c3aed', '#261c47', 'Space Grotesk', 'Space Grotesk', 'filled', 'full'),
    seo: {
      metaTitle: 'Nexus Digital Assets | Institutional Crypto Custody & Yield',
      metaDescription: 'Secure digital asset management and insured institutional crypto treasury operations.',
      ogImageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fin4_hero', 'NEXUS INSTITUTIONAL TREASURY', 'Secure, insured, and compliant digital asset infrastructure for corporations and family offices.', 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1000&auto=format&fit=crop&q=80', undefined, 'CRYPTO TREASURY'),
      createButtonBlock('b_fin4_btn', 'Explore Institutional Digital Asset Custody Options', 'https://esaia.app', 'primary')
    ]
  },

  // 20.5 Elena Rostova Senior Private Banker & M&A Advisor (Classic Swiss Navy & Seal Gold)
  {
    id: 'tpl_fin_private_banker',
    title: 'Elena Rostova - Senior Private Banker & Wealth Partner',
    subtitle: 'Cross-border structured lending, liquidity events, yacht financing & sovereign tax residency',
    category: 'finance',
    categoryName: 'Finance',
    categoryNameAr: 'المالية والاستثمار',
    type: 'business_card',
    isFeatured: false,
    badge: 'Private Banker',
    badgeAr: 'مصرفي خاص وكبار العملاء',
    preview: {
      themePreset: 'dark',
      headerBg: '#090e18',
      cardBg: '#121c2e',
      accentColor: '#d4af37',
      textColor: '#f8fafc',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ELENA ROSTOVA',
      heroSubtitle: 'Managing Director | Private Wealth & Bespoke Structured Credit',
      buttons: [
        { label: 'Direct WhatsApp Line', labelAr: 'تواصل مباشر واتساب', style: 'filled', color: '#d4af37' },
        { label: 'Download Contact vCard', labelAr: 'حفظ بطاقة الاتصال الرسمية', style: 'outline' }
      ],
      tags: ['Zurich & Dubai', 'Bespoke Lombard Lending', 'UHNW Specialist']
    },
    themeConfig: createThemeConfig('dark', '#060a12', '#0e1726', '#d4af37', '#f8fafc', '#94a3b8', '#dfb76c', '#1b2a42', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Elena Rostova | Senior Private Banker & UHNW Advisor',
      metaDescription: 'Trusted private banking advisor helping founders, executives, and family offices navigate liquidity.',
      ogImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_fin5_hero', 'ELENA ROSTOVA PRIVATE BANKING', 'Uncompromising discretion and tailored liquidity solutions for high-net-worth innovators.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', 'PRIVATE BANKER'),
      createVCardBlock('b_fin5_vcard', {
        fullName: 'Elena Rostova',
        jobTitle: 'Managing Director, Private Client Group',
        company: 'Vanguard Private Bank AG',
        phone: '+41 22 555 0177',
        email: 'elena.rostova@vanguardprivate.ch',
        website: 'https://esaia.app',
        bio: 'Over 18 years structuring bespoke private credit, Lombard loans, and sovereign family offices.'
      })
    ]
  }
];

// =========================================================================
// 21. LEGAL (القانون والمحاماة) - 5 Distinct Templates
// =========================================================================
export const legalTemplates: TemplateItem[] = [
  // 21.0 The Begendorf - Classic New York Law Firm
  {
    id: 'tpl_law_firm',
    title: 'The Begendorf - Law Firm',
    subtitle: 'Professional legal services in New York with 25+ years experience',
    category: 'legal',
    categoryName: 'Legal & consulting',
    categoryNameAr: 'القانون والمحاماة',
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
    themeConfig: createThemeConfig('dark', '#151310', '#1e1b16', '#c5a059', '#fbf8f5', '#a89f91', '#dfb76c', '#2e2a22', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'The Begendorf | Premium Legal Services & Corporate Law',
      metaDescription: 'Trusted legal advisory for corporate transactions, asset protection, and arbitration in New York.',
      ogImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_law_hero', 'THE BEGENDORF', 'Institutional legal counsel & trial advocacy in New York.', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80', undefined, 'LAW FIRM & COUNSEL'),
      createButtonBlock('b_law_btn_consult', 'Book a Free Confidential Consultation', 'https://wa.me/?text=Hello!%20I%20would%20like%20to%20schedule%20a%20legal%20consultation.', 'primary'),
      createParagraphBlock('b_law_stats', '⚖️ 25 Years of Trial Experience  |  🏆 1,000+ Cases Won  |  🏛️ 99.4% Arbitration Settlement Rate'),
      createHeadingBlock('b_law_heading_areas', 'Core Legal Practice Areas', 'h2'),
      createVCardBlock('b_law_vcard', {
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
      }),
      createWhatsAppBlock('b_law_whatsapp', '+12125550192', 'Direct WhatsApp Legal Hot-line', 'Hi Alexander, I need urgent legal guidance regarding a corporate contract.')
    ]
  },

  // 21.1 Sterling & Cross Global Corporate Law & Cross-Border M&A (Classic Oxford Navy & Antique Brass)
  {
    id: 'tpl_legal_sterling_corporate',
    title: 'Sterling & Cross - Corporate & M&A Law Firm',
    subtitle: 'Cross-border acquisitions, venture financings, intellectual property & corporate governance',
    category: 'legal',
    categoryName: 'Legal & consulting',
    categoryNameAr: 'القانون والمحاماة',
    type: 'landing',
    isFeatured: true,
    badge: 'Corporate Law',
    badgeAr: 'محاماة ودمج واستحواذ',
    preview: {
      themePreset: 'dark',
      headerBg: '#09101d',
      cardBg: '#111d33',
      accentColor: '#c5a059',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'STERLING & CROSS',
      heroSubtitle: 'Formidable corporate counsel guiding industry-defining transactions worldwide',
      buttons: [
        { label: 'Consult With Senior Partner', labelAr: 'استشارة الشريك القانوني الأول', style: 'filled', color: '#c5a059' },
        { label: 'Recent Transactions ($3B+)', labelAr: 'أبرز الصفقات المنجزة', style: 'outline' }
      ],
      tags: ['Chambers Band 1 Ranked', 'London & New York Bar', 'M&A and Private Equity']
    },
    themeConfig: createThemeConfig('dark', '#060b14', '#0d1628', '#c5a059', '#f8fafc', '#cbd5e1', '#dfb76c', '#182744', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Sterling & Cross | Corporate Mergers & Acquisitions Law Firm',
      metaDescription: 'Elite corporate attorneys advising enterprises, PE firms, and tech founders on complex M&A.',
      ogImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_leg1_hero', 'STERLING & CROSS LEGAL COUNSEL', 'Precision legal strategy defending your vital interests and sealing multi-billion dollar transactions.', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80', undefined, 'CORPORATE LAW'),
      createButtonBlock('b_leg1_btn', 'Request Partner-Level Retainer Consultation', 'https://wa.me/?text=Hello%20Sterling%20%26%20Cross%2C%20we%20require%20corporate%20counsel', 'primary'),
      createParagraphBlock('b_leg1_stats', '⚖️ $3B+ M&A Closed in 2025  |  🏛️ Chambers Band-1 Ranked  |  🔒 Supreme Discretion')
    ]
  },

  // 21.2 Apex Justice Personal Injury & Trial Litigators (High-Trust Navy & Assertive Gold)
  {
    id: 'tpl_legal_apex_justice',
    title: 'Apex Justice Trial Litigators & Personal Injury',
    subtitle: 'Over $250M won for injury victims. No fee unless we win. Fierce courtroom advocates.',
    category: 'legal',
    categoryName: 'Legal & consulting',
    categoryNameAr: 'القانون والمحاماة',
    type: 'landing',
    isFeatured: true,
    badge: 'No Win No Fee',
    badgeAr: 'تعويضات وقضايا إصابات',
    preview: {
      themePreset: 'dark',
      headerBg: '#0e121a',
      cardBg: '#181e2b',
      accentColor: '#f59e0b',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'APEX JUSTICE LAW',
      heroSubtitle: 'Standing up against giant insurance corporations and fighting for your maximum recovery',
      buttons: [
        { label: 'Free 24/7 Case Evaluation', labelAr: 'تقييم مجاني للقضية 24/7', style: 'filled', color: '#d97706' },
        { label: 'Past Verdicts & Settlements', labelAr: 'أحكام وتعويضات سابقة', style: 'outline' }
      ],
      tags: ['Zero Out-of-Pocket Cost', 'Over $250M Recovered', 'Top 100 Trial Lawyers']
    },
    themeConfig: createThemeConfig('dark', '#0a0d13', '#121721', '#f59e0b', '#f8fafc', '#fde68a', '#d97706', '#222c3d', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'Apex Justice | Personal Injury Attorneys & Trial Litigators',
      metaDescription: 'Relentless legal advocacy for injury victims. We charge zero fees unless we recover money for you.',
      ogImageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_leg2_hero', 'APEX JUSTICE LITIGATION', 'We stand between you and the insurance companies, relentlessly fighting for your full justice.', 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1000&auto=format&fit=crop&q=80', undefined, 'TRIAL ADVOCACY'),
      createButtonBlock('b_leg2_btn', 'Claim Your Free Confidential Case Review (Available 24/7)', 'https://wa.me/?text=Hello%20Apex%20Justice%2C%20I%20need%20a%20free%20case%20evaluation', 'primary')
    ]
  },

  // 21.3 Nexus IP & Patent Law Firm for Tech & Biotech (Clean Minimalist Swiss Blue & Slate)
  {
    id: 'tpl_legal_nexus_patents',
    title: 'Nexus Intellectual Property & Patent Attorneys',
    subtitle: 'Securing global patents, trademarks & trade secrets for AI, quantum & biotech inventors',
    category: 'legal',
    categoryName: 'Legal & consulting',
    categoryNameAr: 'القانون والمحاماة',
    type: 'landing',
    isFeatured: false,
    badge: 'Patent Attorneys',
    badgeAr: 'براءات اختراع وملكية فكرية',
    preview: {
      themePreset: 'light',
      headerBg: '#f8fafc',
      cardBg: '#ffffff',
      accentColor: '#2563eb',
      textColor: '#0f172a',
      heroCoverUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'NEXUS IP LAW',
      heroSubtitle: 'Protecting your most valuable technological breakthroughs globally',
      buttons: [
        { label: 'Patentability Search & Audit', labelAr: 'فحص أهلية براءة الاختراع', style: 'filled', color: '#1d4ed8' },
        { label: 'Trademark Protection Packages', labelAr: 'باقات حماية العلامات التجارية', style: 'outline' }
      ],
      tags: ['USPTO & EPO Registered', 'PhD Patent Agents', 'Defense Against Trolls']
    },
    themeConfig: createThemeConfig('light', '#f1f5f9', '#ffffff', '#2563eb', '#0f172a', '#475569', '#1d4ed8', '#cbd5e1', 'Space Grotesk', 'Space Grotesk', 'filled', 'md'),
    seo: {
      metaTitle: 'Nexus IP | Patent Law Firm & Technology Intellectual Property',
      metaDescription: 'Registered patent attorneys specializing in software, artificial intelligence, and life sciences IP.',
      ogImageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_leg3_hero', 'NEXUS INTELLECTUAL PROPERTY', 'Transforming your technological innovations into ironclad, defensible global monopolies.', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1000&auto=format&fit=crop&q=80', undefined, 'PATENT LAW'),
      createButtonBlock('b_leg3_btn', 'Schedule Patentability Consultation with PhD Agent', 'https://esaia.app', 'primary')
    ]
  },

  // 21.4 GlobalPass Golden Visa & Citizenship by Investment Law (Warm Mediterranean Sand & Navy)
  {
    id: 'tpl_legal_globalpass_visa',
    title: 'GlobalPass Citizenship & Golden Visa Legal Group',
    subtitle: 'Sovereign tax planning, European Golden Visas (Portugal, Greece, Spain) & second passports',
    category: 'legal',
    categoryName: 'Legal & consulting',
    categoryNameAr: 'القانون والمحاماة',
    type: 'landing',
    isFeatured: false,
    badge: 'Golden Visa',
    badgeAr: 'جنسية ثانية وإقامات ذهبية',
    preview: {
      themePreset: 'beige',
      headerBg: '#f8f5ee',
      cardBg: '#ffffff',
      accentColor: '#b45309',
      textColor: '#1c1917',
      heroCoverUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'GLOBALPASS LEGAL',
      heroSubtitle: 'Secure global mobility and protect your family with sovereign residence rights',
      buttons: [
        { label: 'Check Country Eligibility', labelAr: 'التحقق من الأهلية للبرامج', style: 'filled', color: '#b45309' },
        { label: 'Compare Golden Visa Programs', labelAr: 'مقارنة برامج الإقامة الذهبية', style: 'outline' }
      ],
      tags: ['100% Application Success', 'Government Authorized', 'Family Inclusion']
    },
    themeConfig: createThemeConfig('beige', '#fbf9f4', '#ffffff', '#b45309', '#1c1917', '#78716c', '#92400e', '#fef3c7', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'lg'),
    seo: {
      metaTitle: 'GlobalPass | Investment Migration & European Golden Visa Lawyers',
      metaDescription: 'Official immigration lawyers facilitating Golden Visa investments and second passports worldwide.',
      ogImageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_leg4_hero', 'GLOBALPASS MIGRATION LAW', 'Expand your freedom, secure your assets, and grant your children world-class passports.', 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1000&auto=format&fit=crop&q=80', undefined, 'CITIZENSHIP BY INVESTMENT'),
      createButtonBlock('b_leg4_btn', 'Request Confidential Golden Visa Assessment', 'https://wa.me/?text=Hello%20GlobalPass%2C%20I%20want%20to%20apply%20for%20a%20Golden%20Visa', 'primary')
    ]
  },

  // 21.5 Victoria Sterling Family & High-Asset Divorce Advocate (Velvety Wine & Polished Silver)
  {
    id: 'tpl_legal_family_divorce',
    title: 'Victoria Sterling - High-Asset Family & Matrimonial Law',
    subtitle: 'Protecting generational fortunes, prenuptial agreements & discreet complex divorce settlements',
    category: 'legal',
    categoryName: 'Legal & consulting',
    categoryNameAr: 'القانون والمحاماة',
    type: 'business_card',
    isFeatured: false,
    badge: 'Family Law',
    badgeAr: 'قضايا عائلية وأصول',
    preview: {
      themePreset: 'dark',
      headerBg: '#170f14',
      cardBg: '#261921',
      accentColor: '#e11d48',
      textColor: '#f8fafc',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'VICTORIA STERLING',
      heroSubtitle: 'Managing Partner | High-Net-Worth Matrimonial & Family Law',
      buttons: [
        { label: 'Book Confidential Consultation', labelAr: 'حجز جلسة استشارة سرية', style: 'filled', color: '#be123c' },
        { label: 'Prenuptial Agreement Guide', labelAr: 'دليل اتفاقيات ما قبل الزواج', style: 'outline' }
      ],
      tags: ['Discreet Resolution', 'Complex Business Valuation', 'Trial Tested']
    },
    themeConfig: createThemeConfig('dark', '#110b0e', '#1c1218', '#e11d48', '#f8fafc', '#94a3b8', '#fb7185', '#38202d', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Victoria Sterling | High-Asset Divorce & Family Law Attorney',
      metaDescription: 'Strategic legal counsel for high-net-worth matrimonial disputes and asset division.',
      ogImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_leg5_hero', 'VICTORIA STERLING ADVOCACY', 'Composed strength, sophisticated financial analysis, and unwavering protection in family law.', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80', 'MATRIMONIAL LAW'),
      createVCardBlock('b_leg5_vcard', {
        fullName: 'Victoria Sterling, Esq.',
        jobTitle: 'Senior Partner & Chair of Matrimonial Practice',
        company: 'Sterling Family Law Group',
        phone: '+1 (212) 555-0192',
        email: 'victoria@sterlingfamilylaw.com',
        website: 'https://esaia.app',
        bio: 'Over 20 years discreetly handling high-profile separations and multi-million dollar asset divisions.'
      })
    ]
  }
];

// =========================================================================
// 22. NETWORK MARKETING (التسويق الشبكي) - 5 Distinct Templates
// =========================================================================
export const networkMarketingTemplates: TemplateItem[] = [
  // 22.1 Lumina Global Wellness & Collagen Direct Sales Leader (Warm Rose Champagne & Pure Pearl)
  {
    id: 'tpl_net_lumina_wellness',
    title: 'Lumina Wellness - Executive Ambassador',
    subtitle: 'Award-winning hydrolyzed marine collagen, gut health bio-hacks & financial freedom leadership',
    category: 'network_marketing',
    categoryName: 'Network marketing',
    categoryNameAr: 'التسويق الشبكي',
    type: 'link_in_bio',
    isFeatured: true,
    badge: 'Diamond Leader',
    badgeAr: 'سفير رتبة ألماسي',
    preview: {
      themePreset: 'beige',
      headerBg: '#faf4f0',
      cardBg: '#ffffff',
      accentColor: '#e11d48',
      textColor: '#1c1917',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1512290900672-1f55a1532f74?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'LUMINA WELLNESS',
      heroSubtitle: 'Build residual recurring income while glowing from the inside out',
      buttons: [
        { label: 'Shop Pure Marine Collagen', labelAr: 'شراء كولاجين بحري طبيعي', style: 'filled', color: '#e11d48' },
        { label: 'Join My Global Mentorship Team', labelAr: 'انضم إلى فريقي العالمي مباشرة', style: 'outline' }
      ],
      tags: ['Over 10k Active Team Members', 'Monthly Passive Car Bonus', 'Direct Mentorship']
    },
    themeConfig: createThemeConfig('beige', '#fdfaf7', '#ffffff', '#e11d48', '#1c1917', '#78716c', '#f43f5e', '#fecdd3', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'full'),
    seo: {
      metaTitle: 'Lumina Wellness | Direct Sales Ambassador & Business Mentorship',
      metaDescription: 'Explore award-winning organic collagen products and join an empowering global entrepreneurship team.',
      ogImageUrl: 'https://images.unsplash.com/photo-1512290900672-1f55a1532f74?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_net1_hero', 'LUMINA WELLNESS FREEDOM', 'Transform your health and design a life of financial sovereignty with our proven model.', 'https://images.unsplash.com/photo-1512290900672-1f55a1532f74?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80', 'WELLNESS MENTOR'),
      createButtonBlock('b_net1_btn1', 'Shop Bestselling Glow Liquid Collagen (20% Off)', 'https://esaia.app', 'primary'),
      createButtonBlock('b_net1_btn2', 'Watch 12-Min Business Blueprint Webinar', 'https://wa.me/?text=Hi%20there%2C%20I%20want%20to%20learn%20more%20about%20joining%20your%20team', 'outline')
    ]
  },

  // 22.2 Freedom Legacy Forex & Crypto Academy Network (Dark Midnight & Cyber Gold)
  {
    id: 'tpl_net_freedom_legacy',
    title: 'Freedom Legacy Financial Trading Network',
    subtitle: 'Live trading education, algorithmic copy-trading & weekly residual commission structure',
    category: 'network_marketing',
    categoryName: 'Network marketing',
    categoryNameAr: 'التسويق الشبكي',
    type: 'landing',
    isFeatured: true,
    badge: 'Chairman 100',
    badgeAr: 'أكاديمية تداول ودخل سلبي',
    preview: {
      themePreset: 'dark',
      headerBg: '#090d14',
      cardBg: '#111826',
      accentColor: '#eab308',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'FREEDOM LEGACY',
      heroSubtitle: 'Learn high-income trading skills and scale your team worldwide',
      buttons: [
        { label: 'Watch 15-Minute Opportunity Video', labelAr: 'مشاهدة فيديو فرصة العمل 15 دقيقة', style: 'filled', color: '#ca8a04' },
        { label: 'Join Private Signals Telegram', labelAr: 'انضمام لقناة التوصيات والتعليم', style: 'outline' }
      ],
      tags: ['Daily Live Trading Calls', 'Automated Marketing Funnel', 'Weekly Payouts']
    },
    themeConfig: createThemeConfig('dark', '#06090f', '#0c111c', '#eab308', '#f8fafc', '#facc15', '#ca8a04', '#1f293d', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'Freedom Legacy | Trading Education & Affiliate Network',
      metaDescription: 'Master financial market trading and build residual income with our automated digital team system.',
      ogImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_net2_hero', 'FREEDOM LEGACY MOVEMENT', 'Stop trading your precious time for hourly wages. Learn institutional market trading and build leverage.', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80', undefined, 'DIGITAL ENTREPRENEUR'),
      createButtonBlock('b_net2_btn', 'Start Your 7-Day Trading Academy Trial', 'https://esaia.app', 'primary')
    ]
  },

  // 22.3 PureEssence Essential Oils & Clean Living Community (Natural Leaf Green & Calming Linen)
  {
    id: 'tpl_net_pure_essence',
    title: 'PureEssence - Non-Toxic Living & Direct Essential Oils',
    subtitle: 'Certified therapeutic essential oils, clean home kits & work-from-home mom community',
    category: 'network_marketing',
    categoryName: 'Network marketing',
    categoryNameAr: 'التسويق الشبكي',
    type: 'link_in_bio',
    isFeatured: false,
    badge: 'Clean Living',
    badgeAr: 'زيوت عطرية ومنتجات نقية',
    preview: {
      themePreset: 'light',
      headerBg: '#f2f8f4',
      cardBg: '#ffffff',
      accentColor: '#15803d',
      textColor: '#14532d',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'PUREESSENCE LIVING',
      heroSubtitle: 'Ditch harmful toxic chemicals and create a toxin-free sanctuary for your family',
      buttons: [
        { label: 'Shop Starter Diffuser Kit', labelAr: 'شراء حقيبة الموزع والزيوت الأساسية', style: 'filled', color: '#15803d' },
        { label: 'Free Oil Protocol Guidebook', labelAr: 'دليل استخدام الزيوت الطبيعية مجاناً', style: 'outline' }
      ],
      tags: ['Seed-to-Seal Quality', 'Supportive Community', 'Flexible Work from Home']
    },
    themeConfig: createThemeConfig('light', '#f4faf6', '#ffffff', '#15803d', '#14532d', '#475569', '#16a34a', '#dcfce7', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'full'),
    seo: {
      metaTitle: 'PureEssence | Clean Non-Toxic Home & Direct Sales Community',
      metaDescription: 'Discover therapeutic essential oils and start a home-based wellness business you can be proud of.',
      ogImageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_net3_hero', 'PUREESSENCE OILS', 'Ditch toxins, embrace pure botanical wellness, and build an authentic home business.', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80', 'CLEAN LIVING'),
      createButtonBlock('b_net3_btn', 'Order Your Starter Kit & Get Free Oil Mentorship', 'https://esaia.app', 'primary')
    ]
  },

  // 22.4 Elite Lifestyle Travel Club & VIP Wholesale Membership (Caribbean Turquoise & Slate)
  {
    id: 'tpl_net_elite_travel_club',
    title: 'Elite Pass - Wholesale Luxury Travel Club',
    subtitle: 'Access wholesale five-star resorts at up to 70% off retail, while earning travel reward points',
    category: 'network_marketing',
    categoryName: 'Network marketing',
    categoryNameAr: 'التسويق الشبكي',
    type: 'landing',
    isFeatured: false,
    badge: 'Travel Club',
    badgeAr: 'نادي سفر وأرباح سياحية',
    preview: {
      themePreset: 'dark',
      headerBg: '#091524',
      cardBg: '#112238',
      accentColor: '#06b6d4',
      textColor: '#ffffff',
      heroCoverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'ELITE PASS CLUB',
      heroSubtitle: 'Travel the world for less and earn while you share vacation memories',
      buttons: [
        { label: 'Compare Hotel Rates vs Booking.com', labelAr: 'مقارنة أسعار الفنادق مع المواقع العالمية', style: 'filled', color: '#0891b2' },
        { label: 'Club Membership Benefits', labelAr: 'مميزات العضوية والعمولات', style: 'outline' }
      ],
      tags: ['70% Off 5-Star Resorts', 'Free Luxury Trips for Leaders', 'Earn While Vacationing']
    },
    themeConfig: createThemeConfig('dark', '#060e18', '#0d1a2b', '#06b6d4', '#f8fafc', '#67e8f9', '#0891b2', '#172d47', 'Space Grotesk', 'Space Grotesk', 'filled', 'lg'),
    seo: {
      metaTitle: 'Elite Pass | Wholesale Travel Club & Affiliate Membership',
      metaDescription: 'Unlock private wholesale rates on luxury vacations and earn recurring commissions sharing travel.',
      ogImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_net4_hero', 'ELITE PASS TRAVEL CLUB', 'See the world in luxury without paying inflated retail prices. Turn your passion for travel into profit.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80', undefined, 'TRAVEL MEMBERSHIP'),
      createButtonBlock('b_net4_btn', 'Join Elite Pass Club & Book Your First Discounted Trip', 'https://esaia.app', 'primary')
    ]
  },

  // 22.5 Tariq Al-Mansoor Crown Diamond Business Coach (Sophisticated Dubai Black & Pure Gold)
  {
    id: 'tpl_net_crown_mentor',
    title: 'Tariq Al-Mansoor - Crown Diamond Mentor',
    subtitle: 'Helping corporate professionals transition into multi-million dollar direct sales enterprises',
    category: 'network_marketing',
    categoryName: 'Network marketing',
    categoryNameAr: 'التسويق الشبكي',
    type: 'business_card',
    isFeatured: true,
    badge: 'Crown Diamond',
    badgeAr: 'مدرب ورائد أعمال معتمد',
    preview: {
      themePreset: 'dark',
      headerBg: '#0e0e11',
      cardBg: '#18181f',
      accentColor: '#c5a059',
      textColor: '#f8fafc',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      heroCoverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      heroTitle: 'TARIQ AL-MANSOOR',
      heroSubtitle: 'Crown Ambassador | Top 1% Direct Selling Earner & Keynote Speaker',
      buttons: [
        { label: 'Direct WhatsApp Interview', labelAr: 'طلب مقابلة انضمام مباشرة عبر واتساب', style: 'filled', color: '#c5a059' },
        { label: 'Download vCard Contact', labelAr: 'تحميل بطاقة الاتصال الرقمية', style: 'outline' }
      ],
      tags: ['Mentored 40+ Six-Figure Earners', 'Middle East & Global Ranks', 'Turnkey Duplication System']
    },
    themeConfig: createThemeConfig('dark', '#0a0a0c', '#131318', '#c5a059', '#f8fafc', '#a1a1aa', '#dfb76c', '#27272a', 'Plus Jakarta Sans', 'Playfair Display', 'filled', 'md'),
    seo: {
      metaTitle: 'Tariq Al-Mansoor | Crown Diamond Direct Sales Leader & Coach',
      metaDescription: 'Personal mentorship from Tariq Al-Mansoor on building scalable residual income networks.',
      ogImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80'
    },
    blocks: [
      createHeroBlock('b_net5_hero', 'TARIQ AL-MANSOOR MENTORSHIP', 'True leadership is not about creating followers, but empowering other leaders to succeed.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', 'EXECUTIVE MENTOR'),
      createVCardBlock('b_net5_vcard', {
        fullName: 'Tariq Al-Mansoor',
        jobTitle: 'Crown Diamond Ambassador',
        company: 'Apex Global Network',
        phone: '+971 50 555 0198',
        email: 'tariq@almansoor.me',
        website: 'https://esaia.app',
        bio: 'Top 1% global networker with over 80,000 organization partners across 35 countries.'
      })
    ]
  }
];
