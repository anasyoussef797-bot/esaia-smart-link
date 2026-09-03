/**
 * ESAIA - Landing Page & Block Builder Type Definitions
 */

export type PageType = 'landing' | 'business_card' | 'menu' | 'product' | 'link_in_bio';

export type PageStatus = 'published' | 'draft' | 'archived';

export type BlockType =
  | 'hero'
  | 'heading'
  | 'paragraph'
  | 'button'
  | 'whatsapp_button'
  | 'phone_button'
  | 'vcard_header'
  | 'social_links'
  | 'menu_category'
  | 'menu_item'
  | 'image'
  | 'gallery'
  | 'video_embed'
  | 'pdf_viewer'
  | 'contact_form'
  | 'map_location'
  | 'divider'
  | 'spacer'
  | 'business_hours';

export type PageThemePreset = 'dark' | 'light' | 'beige' | 'custom';

export interface VCardBlockContent {
  fullName: string;
  jobTitle?: string;
  company?: string;
  department?: string;
  avatarUrl?: string;
  coverUrl?: string;
  bio?: string;
  phone?: string;
  workPhone?: string;
  email?: string;
  workEmail?: string;
  website?: string;
  address?: string;
  whatsapp?: string;
  pronouns?: string;
  saveContactButtonText?: string;
}

export interface MenuItemBlockContent {
  name: string;
  description?: string;
  price: number;
  currency: string;
  category: string;
  imageUrl?: string;
  dietaryBadges?: Array<'vegan' | 'vegetarian' | 'gluten_free' | 'halal' | 'spicy' | 'chef_special'>;
  isSoldOut?: boolean;
  calories?: number;
  enableWhatsAppOrder?: boolean;
}

export interface MenuCategoryBlockContent {
  name: string;
  description?: string;
  icon?: string;
}

export interface HeroBlockContent {
  title: string;
  subtitle?: string;
  badge?: string;
  coverUrl?: string;
  avatarUrl?: string;
  alignment?: 'center' | 'left';
}

export interface ButtonBlockContent {
  label: string;
  url: string;
  subtext?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  icon?: string;
  newTab?: boolean;
}

export interface WhatsAppBlockContent {
  phoneNumber: string;
  buttonText: string;
  prefilledMessage?: string;
}

export interface PhoneBlockContent {
  phoneNumber: string;
  buttonText: string;
  subtext?: string;
}

export interface SocialLinksBlockContent {
  links: Array<{
    platform: 'linkedin' | 'x' | 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'github' | 'whatsapp' | 'telegram' | 'website';
    url: string;
  }>;
  style?: 'pills' | 'icons' | 'cards';
}

export interface BusinessHoursBlockContent {
  title?: string;
  days: Array<{
    day: string;
    open: string;
    close: string;
    isClosed?: boolean;
  }>;
  note?: string;
}

export interface MapLocationBlockContent {
  address: string;
  locationTitle?: string;
  directionsUrl?: string;
  embedQuery?: string;
}

export interface ContactFormBlockContent {
  heading: string;
  subtext?: string;
  submitButtonText?: string;
  successMessage?: string;
  recipientEmail?: string;
}

export interface PageBlock {
  id: string;
  type: BlockType;
  title?: string;
  content: Record<string, any>;
  isVisible: boolean;
  orderIndex: number;
}

export interface PageThemeConfig {
  preset?: PageThemePreset;
  palette: {
    background: string;
    cardBackground: string;
    textPrimary: string;
    textSecondary: string;
    primaryAction: string;
    primaryActionText: string;
    accent: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    headingFont: string;
    baseFontSize: number;
  };
  buttonStyle: 'filled' | 'outline' | 'soft' | 'glow';
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadowLevel: 'none' | 'sm' | 'md' | 'lg';
  backgroundStyle: 'solid' | 'gradient' | 'mesh' | 'pattern';
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  ogImageUrl?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
}

export interface Page {
  id: string;
  orgId: string;
  clientId: string;
  qrCodeId?: string | null;
  title: string;
  slug: string;
  pageType: PageType;
  status: PageStatus;
  seo: SeoConfig;
  themeConfig: PageThemeConfig;
  blocks: PageBlock[];
  viewCount: number;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
