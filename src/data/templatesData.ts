/**
 * ESAIA - Enterprise Ready-Made Template Library (Inspired by Taplink)
 * Fully customizable Landing Pages & Link-in-Bio templates across 22 industry categories.
 * Each category contains at least 5 ready-to-edit, uniquely styled templates.
 */

import { Page, PageBlock, PageThemeConfig, PageType, SeoConfig } from '../types/page';
import { ALL_CATEGORY_TEMPLATES } from './templates';

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

export const READY_MADE_TEMPLATES: TemplateItem[] = ALL_CATEGORY_TEMPLATES;
