/**
 * ESAIA - Enterprise Button & Link Details Editor
 * Comprehensive editor for button blocks with:
 * - Link Function selector (Web URL, WhatsApp Chat, Phone Call, Email Mailto, YouTube Video, vCard Download)
 * - Full Icon Picker with positioning (start/end)
 * - Custom colors, style variants, corner radius, and new-tab target
 * - Live real-time preview of the customized button
 */

import React, { useState, useEffect } from 'react';
import {
  Globe,
  MessageCircle,
  Phone,
  Mail,
  Play,
  Download,
  ExternalLink,
  Sparkles,
  Check,
  CheckCircle,
  Eye
} from 'lucide-react';
import {
  AVAILABLE_BUTTON_ICONS,
  LINK_ACTION_TYPES,
  LinkActionType,
  renderButtonIcon
} from './IconHelper';

export interface ButtonBlockContent {
  label: string;
  subtext?: string;
  url: string;
  linkAction?: LinkActionType;
  icon?: string;
  iconPosition?: 'start' | 'end';
  color?: string;
  textColor?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'gradient';
  borderRadius?: 'pill' | 'xl' | 'md';
  openInNewTab?: boolean;
  // Specific action params
  whatsappNumber?: string;
  whatsappMessage?: string;
  phoneNumber?: string;
  emailAddress?: string;
  emailSubject?: string;
}

interface ButtonDetailsEditorProps {
  content: ButtonBlockContent;
  onChange: (updatedContent: ButtonBlockContent) => void;
  isRTL?: boolean;
}

const QUICK_COLORS = [
  '#3b82f6', // Blue
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f43f5e', // Rose
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#090a0f', // Dark
  '#ffffff'  // White
];

export const ButtonDetailsEditor: React.FC<ButtonDetailsEditorProps> = ({
  content,
  onChange,
  isRTL = true
}) => {
  // Local state initialized with smart defaults
  const actionType: LinkActionType = content.linkAction || (
    content.url?.startsWith('https://wa.me') || content.url?.startsWith('https://api.whatsapp.com')
      ? 'whatsapp'
      : content.url?.startsWith('tel:')
      ? 'call'
      : content.url?.startsWith('mailto:')
      ? 'email'
      : content.url?.includes('youtube.com') || content.url?.includes('youtu.be')
      ? 'video'
      : 'url'
  );

  const [activeAction, setActiveAction] = useState<LinkActionType>(actionType);

  // Keep activeAction in sync when incoming props change
  useEffect(() => {
    if (content.linkAction) {
      setActiveAction(content.linkAction);
    } else {
      const derived = content.url?.startsWith('https://wa.me') || content.url?.startsWith('https://api.whatsapp.com')
        ? 'whatsapp'
        : content.url?.startsWith('tel:')
        ? 'call'
        : content.url?.startsWith('mailto:')
        ? 'email'
        : content.url?.includes('youtube.com') || content.url?.includes('youtu.be')
        ? 'video'
        : 'url';
      setActiveAction(derived);
    }
  }, [content.linkAction, content.url]);

  // Sync internal fields
  const handleFieldChange = (field: keyof ButtonBlockContent, value: any) => {
    const updated = { ...content, [field]: value };

    // Auto-compute URL if action-specific fields change
    if (field === 'whatsappNumber' || field === 'whatsappMessage') {
      const num = (field === 'whatsappNumber' ? value : content.whatsappNumber || '').replace(/[^\d+]/g, '');
      const msg = encodeURIComponent(field === 'whatsappMessage' ? value : content.whatsappMessage || '');
      updated.url = `https://wa.me/${num}${msg ? `?text=${msg}` : ''}`;
    } else if (field === 'phoneNumber') {
      updated.url = `tel:${value.replace(/\s+/g, '')}`;
    } else if (field === 'emailAddress' || field === 'emailSubject') {
      const email = field === 'emailAddress' ? value : content.emailAddress || '';
      const subject = encodeURIComponent(field === 'emailSubject' ? value : content.emailSubject || '');
      updated.url = `mailto:${email}${subject ? `?subject=${subject}` : ''}`;
    }

    onChange(updated);
  };

  const handleActionChange = (newAction: LinkActionType) => {
    setActiveAction(newAction);
    const actionDef = LINK_ACTION_TYPES.find(a => a.id === newAction);
    const currentIcon = content.icon;
    const newIcon = (!currentIcon || currentIcon === 'none') ? (actionDef?.defaultIcon || 'Link') : currentIcon;

    let computedUrl = content.url || '';
    if (newAction === 'whatsapp') {
      const num = (content.whatsappNumber || '+201001234567').replace(/[^\d+]/g, '');
      const msg = encodeURIComponent(content.whatsappMessage || 'Hi! I would like to inquire.');
      computedUrl = `https://wa.me/${num}?text=${msg}`;
    } else if (newAction === 'call') {
      computedUrl = `tel:${content.phoneNumber || '+201001234567'}`;
    } else if (newAction === 'email') {
      computedUrl = `mailto:${content.emailAddress || 'contact@example.com'}`;
    }

    onChange({
      ...content,
      linkAction: newAction,
      icon: newIcon,
      url: computedUrl
    });
  };

  const selectedIcon = content.icon || 'Link';
  const iconPos = content.iconPosition || 'start';
  const btnColor = content.color || '#3b82f6';
  const btnTextColor = content.textColor || '#ffffff';
  const btnVariant = content.variant || 'primary';
  const btnRadius = content.borderRadius || 'xl';

  return (
    <div className="space-y-4 text-xs">
      {/* 1. LINK ACTION / FUNCTION TABS */}
      <div>
        <label className="text-xs font-bold text-slate-200 block mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isRTL ? 'وظيفة الرابط ونوع الإجراء (Link Function)' : 'Link Function & Action Type'}</span>
        </label>
        <p className="text-[11px] text-slate-400 mb-2">
          {isRTL
            ? 'حدد نوع التفاعل المطلوب عند نقر الزائر على هذا الزر:'
            : 'Select what happens when the visitor clicks this button:'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LINK_ACTION_TYPES.map(action => {
            const Icon = action.icon;
            const isSelected = activeAction === action.id;

            return (
              <button
                key={action.id}
                type="button"
                onClick={() => handleActionChange(action.id)}
                className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-xs font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-xs font-bold text-white">
                    {isRTL ? action.labelAr : action.label}
                  </span>
                  <span className="block truncate text-[9px] text-slate-400">
                    {action.id}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. CONTEXT-SPECIFIC ACTION FIELDS */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        {activeAction === 'url' && (
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {isRTL ? 'رابط صفحة الويب المستهدفة (Web URL)' : 'Target Website URL'}
            </label>
            <input
              type="url"
              value={content.url || ''}
              onChange={e => handleFieldChange('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        )}

        {activeAction === 'whatsapp' && (
          <div className="space-y-2.5">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isRTL ? 'رقم هاتف واتساب (بالكود الدولي)' : 'WhatsApp Phone Number'}
              </label>
              <input
                type="text"
                value={content.whatsappNumber || ''}
                onChange={e => handleFieldChange('whatsappNumber', e.target.value)}
                placeholder="+201001234567"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isRTL ? 'رسالة المحادثة التمهيدية المسبقة' : 'Prefilled Chat Message'}
              </label>
              <textarea
                rows={2}
                value={content.whatsappMessage || ''}
                onChange={e => handleFieldChange('whatsappMessage', e.target.value)}
                placeholder={isRTL ? 'مرحباً! أود الاستفسار عن تفاصيل خدماتكم...' : 'Hi! I would like to inquire...'}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {activeAction === 'call' && (
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {isRTL ? 'رقم الهاتف للاتصال المباشر' : 'Phone Number to Dial'}
            </label>
            <input
              type="tel"
              value={content.phoneNumber || ''}
              onChange={e => handleFieldChange('phoneNumber', e.target.value)}
              placeholder="+971501234567"
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        )}

        {activeAction === 'email' && (
          <div className="space-y-2.5">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isRTL ? 'البريد الإلكتروني المستلم' : 'Destination Email Address'}
              </label>
              <input
                type="email"
                value={content.emailAddress || ''}
                onChange={e => handleFieldChange('emailAddress', e.target.value)}
                placeholder="contact@example.com"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                {isRTL ? 'موضوع الرسالة (Email Subject)' : 'Email Subject Line'}
              </label>
              <input
                type="text"
                value={content.emailSubject || ''}
                onChange={e => handleFieldChange('emailSubject', e.target.value)}
                placeholder={isRTL ? 'استفسار جديد من الموقع' : 'New Website Inquiry'}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {activeAction === 'video' && (
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {isRTL ? 'رابط فيديو يوتيوب (YouTube Video URL)' : 'YouTube Video Link'}
            </label>
            <input
              type="url"
              value={content.url || ''}
              onChange={e => handleFieldChange('url', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        )}

        {activeAction === 'download_vcard' && (
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              {isRTL ? 'رابط ملف بطاقة الاتصال (.vcf) أو التحميل المباشر' : 'vCard File Download URL'}
            </label>
            <input
              type="url"
              value={content.url || ''}
              onChange={e => handleFieldChange('url', e.target.value)}
              placeholder="https://.../contact.vcf"
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        )}

        {/* Display computed final URL */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">{isRTL ? 'الرابط الناتج الفعلي:' : 'Effective URL:'}</span>
          <span className="font-mono text-indigo-400 truncate max-w-[280px]" title={content.url}>
            {content.url || '#'}
          </span>
        </div>
      </div>

      {/* 3. BUTTON TEXT & SUBTEXT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            {isRTL ? 'نص الزر الرئيسي (Button Label)' : 'Button Label'}
          </label>
          <input
            type="text"
            value={content.label || ''}
            onChange={e => handleFieldChange('label', e.target.value)}
            placeholder={isRTL ? 'مثال: تواصل معنا، اطلب الآن' : 'e.g. Contact Us, Order Now'}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            {isRTL ? 'نص توضيحي صغير أسفل الزر' : 'Subtext (Optional)'}
          </label>
          <input
            type="text"
            value={content.subtext || ''}
            onChange={e => handleFieldChange('subtext', e.target.value)}
            placeholder={isRTL ? 'مثال: رد فوري خلال 5 دقائق' : 'e.g. Instant response'}
            className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* 4. ATTACH ICON (إرفاق أيقونة للزر) */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <span>{isRTL ? 'إرفاق أيقونة للزر (Attach Icon)' : 'Attach Icon to Button'}</span>
            {selectedIcon && selectedIcon !== 'none' && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                {selectedIcon}
              </span>
            )}
          </label>

          {/* Icon Position Toggle */}
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => handleFieldChange('iconPosition', 'start')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                iconPos === 'start' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isRTL ? 'يمين / البداية' : 'Start'}
            </button>
            <button
              type="button"
              onClick={() => handleFieldChange('iconPosition', 'end')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                iconPos === 'end' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isRTL ? 'يسار / النهاية' : 'End'}
            </button>
          </div>
        </div>

        {/* Icon Grid Picker */}
        <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-4 sm:grid-cols-7 gap-1.5 max-h-[160px] overflow-y-auto">
          {AVAILABLE_BUTTON_ICONS.map(item => {
            const Icon = item.icon;
            const isSelected = selectedIcon === item.id || (!selectedIcon && item.id === 'none');

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFieldChange('icon', item.id === 'none' ? '' : item.id)}
                title={isRTL ? item.nameAr : item.name}
                className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm scale-105'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[9px] truncate max-w-full font-medium">
                  {isRTL ? item.nameAr.split(' ')[0] : item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. BUTTON STYLING & APPEARANCE */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <span className="text-xs font-bold text-slate-300 block">
          {isRTL ? 'تخصيص ألوان وتصميم الزر' : 'Button Styling & Colors'}
        </span>

        {/* Color presets and picker */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-400 shrink-0">
            {isRTL ? 'لون الزر:' : 'Button Color:'}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {QUICK_COLORS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => handleFieldChange('color', c)}
                className={`w-6 h-6 rounded-full border transition-transform ${
                  btnColor === c ? 'scale-125 border-white shadow-md' : 'border-slate-700 hover:scale-110'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
            <input
              type="color"
              value={btnColor}
              onChange={e => handleFieldChange('color', e.target.value)}
              className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent ml-1"
            />
          </div>
        </div>

        {/* Style Variant and Corner Radius */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              {isRTL ? 'نمط التصميم (Variant)' : 'Style Variant'}
            </label>
            <select
              value={btnVariant}
              onChange={e => handleFieldChange('variant', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
            >
              <option value="primary">{isRTL ? 'ممتلئ (Filled Solid)' : 'Filled Solid'}</option>
              <option value="outline">{isRTL ? 'حد مفرغ (Outline)' : 'Outline Border'}</option>
              <option value="glass">{isRTL ? 'زجاجي شفاف (Glass)' : 'Glass Backdrop'}</option>
              <option value="gradient">{isRTL ? 'تدرج لوني (Gradient)' : 'Vibrant Gradient'}</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              {isRTL ? 'استدارة الحواف (Radius)' : 'Border Radius'}
            </label>
            <select
              value={btnRadius}
              onChange={e => handleFieldChange('borderRadius', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
            >
              <option value="pill">{isRTL ? 'كبسولة دائرية (Pill / Full)' : 'Pill (Full)'}</option>
              <option value="xl">{isRTL ? 'منحنية عصرية (Rounded XL)' : 'Rounded XL'}</option>
              <option value="md">{isRTL ? 'مربعة ناعمة (Rounded MD)' : 'Rounded MD'}</option>
            </select>
          </div>
        </div>

        {/* Open in New Tab Toggle */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={content.openInNewTab !== false}
              onChange={e => handleFieldChange('openInNewTab', e.target.checked)}
              className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>{isRTL ? 'فتح الرابط في نافذة أو تبويب جديد (_blank)' : 'Open in new window / tab'}</span>
          </label>
        </div>
      </div>

      {/* 6. LIVE REAL-TIME BUTTON PREVIEW */}
      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-1.5">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5 text-indigo-400" />
          <span>{isRTL ? 'معاينة فورية لشكل الزر:' : 'Live Button Preview:'}</span>
        </span>

        <div
          className={`w-full py-3 px-4 flex items-center justify-center gap-2.5 font-bold text-xs select-none transition-all shadow-md ${
            btnRadius === 'pill' ? 'rounded-full' : btnRadius === 'md' ? 'rounded-lg' : 'rounded-2xl'
          }`}
          style={{
            backgroundColor: btnVariant === 'outline'
              ? 'transparent'
              : btnVariant === 'glass'
              ? 'rgba(255,255,255,0.1)'
              : btnColor,
            color: btnVariant === 'outline' ? btnColor : btnTextColor,
            border: btnVariant === 'outline' ? `2px solid ${btnColor}` : btnVariant === 'glass' ? '1px solid rgba(255,255,255,0.2)' : undefined,
            background: btnVariant === 'gradient' ? `linear-gradient(135deg, ${btnColor}, #8b5cf6)` : undefined
          }}
        >
          {iconPos === 'start' && renderButtonIcon(selectedIcon, 'w-4 h-4 shrink-0')}
          <div className="truncate text-center">
            <span className="block truncate">{content.label || 'Button Label'}</span>
            {content.subtext && (
              <span className="block text-[10px] font-normal opacity-80 truncate">{content.subtext}</span>
            )}
          </div>
          {iconPos === 'end' && renderButtonIcon(selectedIcon, 'w-4 h-4 shrink-0')}
        </div>
      </div>
    </div>
  );
};
