/**
 * ESAIA - Universal Icon & Link Action System
 * Provides rich icon library and smart link function resolution for buttons, links, and cards.
 */

import React from 'react';
import {
  Link,
  Globe,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  ShoppingBag,
  Download,
  Star,
  Sparkles,
  Play,
  MapPin,
  Calendar,
  Send,
  Heart,
  ArrowRight,
  ArrowLeft,
  Share2,
  FileText,
  CreditCard,
  CheckCircle,
  HelpCircle,
  Utensils,
  Coffee,
  Clock,
  Video,
  Twitter,
  Facebook,
  Youtube
} from 'lucide-react';

export interface IconOption {
  id: string;
  name: string;
  nameAr: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const AVAILABLE_BUTTON_ICONS: IconOption[] = [
  { id: 'none', name: 'No Icon', nameAr: 'بدون أيقونة', icon: HelpCircle },
  { id: 'Link', name: 'Link', nameAr: 'رابط عام', icon: Link },
  { id: 'Globe', name: 'Website', nameAr: 'موقع إلكتروني', icon: Globe },
  { id: 'ExternalLink', name: 'External', nameAr: 'رابط خارجي', icon: ExternalLink },
  { id: 'MessageCircle', name: 'WhatsApp / Chat', nameAr: 'واتساب ومحادثة', icon: MessageCircle },
  { id: 'Phone', name: 'Call', nameAr: 'اتصال هاتفي', icon: Phone },
  { id: 'Mail', name: 'Email', nameAr: 'بريد إلكتروني', icon: Mail },
  { id: 'Instagram', name: 'Instagram', nameAr: 'إنستغرام', icon: Instagram },
  { id: 'Youtube', name: 'YouTube', nameAr: 'يوتيوب', icon: Youtube },
  { id: 'Twitter', name: 'Twitter / X', nameAr: 'تويتر / إكس', icon: Twitter },
  { id: 'Facebook', name: 'Facebook', nameAr: 'فيسبوك', icon: Facebook },
  { id: 'ShoppingBag', name: 'Store / Shop', nameAr: 'متجر وتسوق', icon: ShoppingBag },
  { id: 'Download', name: 'Download', nameAr: 'تنزيل ملف', icon: Download },
  { id: 'Star', name: 'Star', nameAr: 'نجمة ومميز', icon: Star },
  { id: 'Sparkles', name: 'Sparkles', nameAr: 'عرض خاص / جديد', icon: Sparkles },
  { id: 'Play', name: 'Play Video', nameAr: 'فيديو ومشاهدة', icon: Play },
  { id: 'MapPin', name: 'Location', nameAr: 'موقع وخريطة', icon: MapPin },
  { id: 'Calendar', name: 'Booking', nameAr: 'حجز وموعد', icon: Calendar },
  { id: 'Send', name: 'Inquiry', nameAr: 'إرسال واستفسار', icon: Send },
  { id: 'CreditCard', name: 'Payment', nameAr: 'دفع وبطاقة', icon: CreditCard },
  { id: 'Heart', name: 'Like / Favorite', nameAr: 'مفضل ودعم', icon: Heart },
  { id: 'Utensils', name: 'Food / Menu', nameAr: 'أطعمة وقائمة', icon: Utensils },
  { id: 'Coffee', name: 'Cafe / Drinks', nameAr: 'مقهى ومشروبات', icon: Coffee },
  { id: 'Clock', name: 'Hours / Time', nameAr: 'مواعيد وساعات', icon: Clock },
  { id: 'ArrowRight', name: 'Arrow Next', nameAr: 'سهم توجيه', icon: ArrowRight }
];

export function renderButtonIcon(iconName?: string, className: string = 'w-4 h-4 shrink-0'): React.ReactNode {
  if (!iconName || iconName === 'none') return null;

  switch (iconName.toLowerCase()) {
    case 'link':
      return <Link className={className} />;
    case 'globe':
      return <Globe className={className} />;
    case 'externallink':
    case 'external':
      return <ExternalLink className={className} />;
    case 'messagecircle':
    case 'whatsapp':
      return <MessageCircle className={className} />;
    case 'phone':
    case 'call':
      return <Phone className={className} />;
    case 'mail':
    case 'email':
      return <Mail className={className} />;
    case 'instagram':
      return <Instagram className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'twitter':
      return <Twitter className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'shoppingbag':
    case 'store':
    case 'shop':
      return <ShoppingBag className={className} />;
    case 'download':
      return <Download className={className} />;
    case 'star':
      return <Star className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'play':
    case 'video':
      return <Play className={className} />;
    case 'mappin':
    case 'map':
    case 'location':
      return <MapPin className={className} />;
    case 'calendar':
    case 'booking':
      return <Calendar className={className} />;
    case 'send':
      return <Send className={className} />;
    case 'creditcard':
      return <CreditCard className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'utensils':
      return <Utensils className={className} />;
    case 'coffee':
      return <Coffee className={className} />;
    case 'clock':
      return <Clock className={className} />;
    case 'arrowright':
      return <ArrowRight className={className} />;
    case 'arrowleft':
      return <ArrowLeft className={className} />;
    default:
      return <ExternalLink className={className} />;
  }
}

export type LinkActionType = 'url' | 'whatsapp' | 'call' | 'email' | 'video' | 'download_vcard';

export interface LinkActionDefinition {
  id: LinkActionType;
  label: string;
  labelAr: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultIcon: string;
  descriptionAr: string;
}

export const LINK_ACTION_TYPES: LinkActionDefinition[] = [
  {
    id: 'url',
    label: 'Open Web URL',
    labelAr: 'فتح موقع إلكتروني / رابط ويب',
    icon: Globe,
    defaultIcon: 'Globe',
    descriptionAr: 'توجيه الزائر إلى أي موقع أو متجر خارجي'
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Chat',
    labelAr: 'محادثة واتساب مباشرة',
    icon: MessageCircle,
    defaultIcon: 'MessageCircle',
    descriptionAr: 'فتح محادثة واتساب فورية برقم ورسالة تمهيدية'
  },
  {
    id: 'call',
    label: 'Direct Phone Call',
    labelAr: 'اتصال هاتفي مباشر',
    icon: Phone,
    defaultIcon: 'Phone',
    descriptionAr: 'تشغيل لوحة الاتصال برقم هاتفك بنقرة واحدة'
  },
  {
    id: 'email',
    label: 'Send Email',
    labelAr: 'إرسال بريد إلكتروني',
    icon: Mail,
    defaultIcon: 'Mail',
    descriptionAr: 'فتح تطبيق البريد مع تحديد العنوان والموضوع'
  },
  {
    id: 'video',
    label: 'Play YouTube Video',
    labelAr: 'تشغيل فيديو يوتيوب',
    icon: Play,
    defaultIcon: 'Play',
    descriptionAr: 'تشغيل فيديو أو Shorts لزوار الصفحة'
  },
  {
    id: 'download_vcard',
    label: 'Download Contact / vCard',
    labelAr: 'تحميل جهة الاتصال (vCard)',
    icon: Download,
    defaultIcon: 'Download',
    descriptionAr: 'حفظ بيانات الاتصال مباشرة في هاتف الزائر'
  }
];
