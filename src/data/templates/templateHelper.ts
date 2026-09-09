import { PageBlock, VCardBlockContent, MenuItemBlockContent, PageThemeConfig, PageThemePreset } from '../../types/page';

export function createHeroBlock(
  id: string,
  title: string,
  subtitle?: string,
  coverUrl?: string,
  avatarUrl?: string,
  badge?: string,
  alignment: 'center' | 'left' = 'center'
): PageBlock {
  return {
    id,
    type: 'hero',
    title: 'Hero Banner',
    isVisible: true,
    orderIndex: 0,
    content: {
      title,
      subtitle,
      coverUrl,
      avatarUrl,
      badge,
      alignment
    }
  };
}

export function createButtonBlock(
  id: string,
  label: string,
  url: string,
  variant: 'primary' | 'secondary' | 'outline' | 'whatsapp' = 'primary',
  subtext?: string,
  orderIndex: number = 1
): PageBlock {
  return {
    id,
    type: 'button',
    title: label,
    isVisible: true,
    orderIndex,
    content: {
      label,
      url,
      variant,
      subtext
    }
  };
}

export function createParagraphBlock(
  id: string,
  text: string,
  title: string = 'Information',
  orderIndex: number = 2
): PageBlock {
  return {
    id,
    type: 'paragraph',
    title,
    isVisible: true,
    orderIndex,
    content: {
      text
    }
  };
}

export function createHeadingBlock(
  id: string,
  text: string,
  level: 'h1' | 'h2' | 'h3' = 'h2',
  orderIndex: number = 3
): PageBlock {
  return {
    id,
    type: 'heading',
    title: text,
    isVisible: true,
    orderIndex,
    content: {
      text,
      level
    }
  };
}

export function createVCardBlock(
  id: string,
  content: VCardBlockContent,
  orderIndex: number = 4
): PageBlock {
  return {
    id,
    type: 'vcard_header',
    title: content.fullName,
    isVisible: true,
    orderIndex,
    content
  };
}

export function createWhatsAppBlock(
  id: string,
  phoneNumber: string,
  buttonText: string,
  prefilledMessage?: string,
  orderIndex: number = 5
): PageBlock {
  return {
    id,
    type: 'whatsapp_button',
    title: 'WhatsApp Contact',
    isVisible: true,
    orderIndex,
    content: {
      phoneNumber,
      buttonText,
      prefilledMessage
    }
  };
}

export function createThemeConfig(
  preset: PageThemePreset,
  bg: string,
  cardBg: string,
  primaryAction: string,
  textPrimary: string,
  textSecondary: string,
  accent: string,
  border: string,
  fontFamily: string = 'Plus Jakarta Sans',
  headingFont: string = 'Plus Jakarta Sans',
  buttonStyle: 'filled' | 'outline' | 'soft' | 'glow' = 'filled',
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'lg'
): PageThemeConfig {
  return {
    preset,
    palette: {
      background: bg,
      cardBackground: cardBg,
      textPrimary,
      textSecondary,
      primaryAction,
      primaryActionText: preset === 'light' || preset === 'beige' ? '#ffffff' : '#0f172a',
      accent,
      border
    },
    typography: {
      fontFamily,
      headingFont,
      baseFontSize: 16
    },
    buttonStyle,
    borderRadius,
    shadowLevel: 'md',
    backgroundStyle: 'solid'
  };
}
