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

export interface PageBlock {
  id: string;
  type: BlockType;
  title?: string;
  content: Record<string, any>;
  isVisible: boolean;
  orderIndex: number;
}

export interface PageThemeConfig {
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
