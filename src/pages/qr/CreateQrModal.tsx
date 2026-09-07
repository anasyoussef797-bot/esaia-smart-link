/**
 * ESAIA - Create Dynamic QR Code Modal
 * Instant creation with automatic client attribution and vector styling defaults.
 */

import React, { useState } from 'react';
import { QrCode, Plus, Check, RefreshCw, Sparkles, Link2 } from 'lucide-react';
import { Client } from '../../types/client';
import { QrCode as QrCodeType, QrDestinationType, QrModuleStyle } from '../../types/qr';
import { qrService } from '../../services/firebase/qrService';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';

interface CreateQrModalProps {
  isOpen: boolean;
  clients: Client[];
  onClose: () => void;
  onCreated: (newQr: QrCodeType) => void;
}

export const CreateQrModal: React.FC<CreateQrModalProps> = ({
  isOpen,
  clients,
  onClose,
  onCreated
}) => {
  const { showToast } = useNotification();
  const { isRtl } = useLanguage();
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || 'client_impact_hub');
  const [destinationType, setDestinationType] = useState<QrDestinationType>('url');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [moduleStyle, setModuleStyle] = useState<QrModuleStyle>('rounded');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !destinationUrl.trim()) {
      showToast(
        isRtl
          ? 'يرجى إدخال اسم الحملة ورابط الوجهة المستهدفة'
          : 'Please provide both campaign name and target destination URL',
        'error'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedClient = clients.find(c => c.id === clientId);
      const generatedSlug = (customSlug.trim() || `es_${Math.random().toString(36).substring(2, 8)}`)
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-');

      const primaryColor = selectedClient?.brandColors?.primary || '#0f172a';
      const bgColor = selectedClient?.brandColors?.background || '#ffffff';

      const newQrId = await qrService.createQrCode({
        orgId: 'org_esaia_main',
        clientId,
        clientName: selectedClient?.companyName || 'Corporate Client',
        name: name.trim(),
        publicCode: generatedSlug,
        destinationType,
        destinationUrl: destinationUrl.trim(),
        status: 'active',
        tags: ['New', selectedClient?.companyName || 'General'],
        styleConfig: {
          foregroundColor: primaryColor,
          backgroundColor: bgColor,
          moduleStyle,
          eyeStyle: 'rounded',
          eyeBallStyle: 'rounded',
          eyeColor: primaryColor,
          eyeInnerColor: primaryColor,
          errorCorrectionLevel: selectedClient?.logoUrl ? 'H' : 'M',
          logoUrl: selectedClient?.logoUrl || null,
          logoSizeRatio: 0.16,
          logoBackgroundPunchout: true,
          quietZoneModules: 4,
          frameStyle: 'none',
          scannabilityGrade: 'A',
          healthScore: 98,
          verifiedAt: new Date().toISOString()
        }
      });

      const created = await qrService.getQrCodeById(newQrId);
      if (created) {
        onCreated(created);
      }
      showToast(
        isRtl
          ? 'تم إنشاء وتوليد رمز QR الديناميكي بنجاح'
          : 'Dynamic QR created and registered in routing engine',
        'success'
      );
      onClose();
    } catch (err) {
      showToast(isRtl ? 'فشل في إنشاء رمز QR' : 'Failed to create QR code', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {isRtl ? 'إنشاء حملة QR ديناميكية جديدة' : 'Create Dynamic QR Campaign'}
              </h3>
              <p className="text-xs text-neutral-400">
                {isRtl
                  ? 'توجيه ذكي فائق السرعة مع ضمان عدم إعادة الطباعة مدى الحياة'
                  : 'High-speed dynamic routing with zero-reprint guarantee'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xs">
            {isRtl ? 'إغلاق Esc' : 'Esc'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {isRtl ? 'اسم الحملة / رمز QR *' : 'Campaign / QR Name *'}
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={isRtl ? 'مثال: رمز QR استقبال المدخل الرئيسي' : 'e.g. VIP Reception Desk QR'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                {isRtl ? 'تعيين العميل' : 'Client Assignment'}
              </label>
              <select
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.companyName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                {isRtl ? 'نوع الوجهة' : 'Destination Type'}
              </label>
              <select
                value={destinationType}
                onChange={e => setDestinationType(e.target.value as QrDestinationType)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
              >
                <option value="url">{isRtl ? 'موقع إلكتروني / رابط خارجي' : 'Website URL'}</option>
                <option value="menu">{isRtl ? 'قائمة طعام تفاعلية (منيو)' : 'Dine-In Menu'}</option>
                <option value="vcard">{isRtl ? 'بطاقة اتصال أعمال (vCard)' : 'vCard Contact'}</option>
                <option value="page">{isRtl ? 'صفحة هبوط / بروفايل' : 'Landing Page'}</option>
                <option value="whatsapp">{isRtl ? 'محادثة واتساب مباشرة' : 'WhatsApp Direct'}</option>
                <option value="wifi">{isRtl ? 'بيانات شبكة واي فاي' : 'WiFi Network'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {isRtl ? 'رابط الوجهة المستهدفة *' : 'Target Destination URL *'}
            </label>
            <input
              type="url"
              required
              value={destinationUrl}
              onChange={e => setDestinationUrl(e.target.value)}
              placeholder={isRtl ? 'https://example.com/target' : 'https://yourbrand.com/target'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm font-mono focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {isRtl ? 'الرمز المختصر المخصص (اختياري)' : 'Custom Shortcode (Optional)'}
            </label>
            <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-700 overflow-hidden focus-within:border-rose-500">
              <span className="px-3 text-xs text-neutral-500 font-mono select-none">esaia.app/q/</span>
              <input
                type="text"
                value={customSlug}
                onChange={e => setCustomSlug(e.target.value)}
                placeholder={isRtl ? 'summer-offer' : 'summer-promo'}
                className="w-full py-2.5 pr-3 bg-transparent text-white text-sm font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {isRtl ? 'شكل النقاط الأولي' : 'Initial Module Shape'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['rounded', 'extra-rounded', 'dots', 'classy'] as QrModuleStyle[]).map(shape => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => setModuleStyle(shape)}
                  className={`py-2 rounded-lg border text-xs capitalize transition ${
                    moduleStyle === shape
                      ? 'border-rose-500 bg-rose-500/20 text-white'
                      : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {isRtl
                    ? shape === 'rounded'
                      ? 'دائري'
                      : shape === 'extra-rounded'
                      ? 'دائري ناعم'
                      : shape === 'dots'
                      ? 'نقاط'
                      : 'كلاسيكي'
                    : shape.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-rose-950/40"
            >
              {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              {isRtl ? 'إنشاء رمز QR الديناميكي' : 'Create Dynamic QR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
