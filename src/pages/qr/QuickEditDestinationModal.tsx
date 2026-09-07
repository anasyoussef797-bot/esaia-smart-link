/**
 * ESAIA - Quick Edit Dynamic QR Destination Modal
 * Instant target URL rebinding with zero physical reprinting.
 */

import React, { useState, useEffect } from 'react';
import { ExternalLink, Link2, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { QrCode, QrDestinationType } from '../../types/qr';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';

interface QuickEditDestinationModalProps {
  qr: QrCode | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (qrId: string, newUrl: string, type: QrDestinationType) => Promise<void>;
}

export const QuickEditDestinationModal: React.FC<QuickEditDestinationModalProps> = ({
  qr,
  isOpen,
  onClose,
  onSave
}) => {
  const { showToast } = useNotification();
  const { isRtl } = useLanguage();
  const [destinationUrl, setDestinationUrl] = useState('');
  const [destinationType, setDestinationType] = useState<QrDestinationType>('url');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (qr) {
      setDestinationUrl(qr.destinationUrl || '');
      setDestinationType(qr.destinationType || 'url');
    }
  }, [qr]);

  if (!isOpen || !qr) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationUrl.trim()) {
      showToast(isRtl ? 'يرجى إدخال رابط وجهة صالح' : 'Please enter a valid destination URL', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(qr.id, destinationUrl.trim(), destinationType);
      showToast(
        isRtl
          ? 'تم تحديث الرابط المستهدف بنجاح. كافة النسخ المطبوعة ستوجه فوراً للرابط الجديد.'
          : 'Target URL updated instantly. Physical prints will now redirect to the new URL.',
        'success'
      );
      onClose();
    } catch (err) {
      showToast(isRtl ? 'فشل في تحديث رابط الوجهة' : 'Failed to update destination URL', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Link2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {isRtl ? 'تحديث فوري للرابط المستهدف' : 'Quick Edit Target Destination'}
              </h3>
              <p className="text-xs text-neutral-400">{qr.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-neutral-800"
          >
            {isRtl ? 'إغلاق Esc' : 'Esc'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">
                {isRtl ? 'ربط ديناميكي بدون إعادة طباعة' : 'Dynamic Zero-Reprint Binding'}
              </span>: {isRtl ? 'جميع النسخ المطبوعة بالرمز المختصر' : 'All physical copies with shortcode'}{' '}
              <code className="font-mono font-bold text-white">/q/{qr.publicCode}</code>{' '}
              {isRtl ? 'ستوجه فوراً وبشكل لحظي إلى الرابط المستهدف الجديد.' : 'will immediately redirect to the new destination.'}
            </div>
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
              <option value="url">{isRtl ? 'موقع إلكتروني / رابط خارجي' : 'External Website / URL'}</option>
              <option value="dynamic_url">{isRtl ? 'توجيه ديناميكي ذكي' : 'Dynamic Smart Routing'}</option>
              <option value="menu">{isRtl ? 'قائمة طعام تفاعلية (منيو)' : 'Digital Food & Beverage Menu'}</option>
              <option value="vcard">{isRtl ? 'بطاقة اتصال أعمال (vCard)' : 'Executive vCard Contact'}</option>
              <option value="page">{isRtl ? 'صفحة هبوط / بروفايل' : 'Landing Page / Bio Card'}</option>
              <option value="whatsapp">{isRtl ? 'محادثة واتساب مباشرة' : 'WhatsApp Direct Chat'}</option>
              <option value="wifi">{isRtl ? 'بيانات شبكة واي فاي' : 'WiFi Network Credentials'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {isRtl ? 'رابط الوجهة المستهدف الجديد' : 'Target Destination URL'}
            </label>
            <input
              type="url"
              required
              value={destinationUrl}
              onChange={e => setDestinationUrl(e.target.value)}
              placeholder={isRtl ? 'https://example.com/target' : 'https://yourbrand.com/new-campaign'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm font-mono focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href={destinationUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition"
            >
              <ExternalLink className="w-3 h-3" />
              {isRtl ? 'معاينة الرابط' : 'Preview Link'}
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-rose-950/40"
              >
                {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                {isRtl ? 'تطبيق التحديث فوراً' : 'Apply Update'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
