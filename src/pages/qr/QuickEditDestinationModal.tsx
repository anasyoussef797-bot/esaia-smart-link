/**
 * ESAIA - Quick Edit Dynamic QR Destination Modal
 * Instant target URL rebinding with zero physical reprinting.
 */

import React, { useState, useEffect } from 'react';
import { ExternalLink, Link2, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { QrCode, QrDestinationType } from '../../types/qr';
import { LandingPage } from '../../types/page';
import { pageService } from '../../services/firebase/pageService';
import { getQrRedirectUrl } from '../../utils/qrUrl';
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
  const { t } = useLanguage();
  const [destinationUrl, setDestinationUrl] = useState('');
  const [destinationType, setDestinationType] = useState<QrDestinationType>('url');
  const [isSaving, setIsSaving] = useState(false);
  const [availablePages, setAvailablePages] = useState<LandingPage[]>([]);

  useEffect(() => {
    pageService.getPagesByOrg('org_esaia_main')
      .then(pages => setAvailablePages(pages))
      .catch(() => {});
  }, []);

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
      showToast(t.qrModule.enterValidDestinationUrl, 'error');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(qr.id, destinationUrl.trim(), destinationType);
      showToast(
        t.qrModule.targetUrlUpdatedSuccess,
        'success'
      );
      onClose();
    } catch (err) {
      showToast(t.qrModule.failedToUpdateUrl, 'error');
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
                {t.qrModule.quickEditTargetTitle}
              </h3>
              <p className="text-xs text-neutral-400">{qr.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded-md hover:bg-neutral-800"
          >
            {t.actions.close}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">
                {t.qrModule.zeroReprintGuarantee}
              </span>: {t.qrModule.printedQrExplainer}{' '}
              <code className="font-mono font-bold text-white">/q/{qr.publicCode}</code>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {t.qrModule.destinationTypeLabel}
            </label>
            <select
              value={destinationType}
              onChange={e => {
                const newType = e.target.value as QrDestinationType;
                setDestinationType(newType);
                if (newType === 'page' && availablePages.length > 0 && !destinationUrl.startsWith('/p/')) {
                  setDestinationUrl(`/p/${availablePages[0].slug}`);
                }
              }}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="url">{t.qrModule.destTypeUrl}</option>
              <option value="page">{t.qrModule.destTypePage}</option>
              <option value="dynamic_url">{t.qrModule.destTypeDynamic}</option>
              <option value="menu">{t.qrModule.destTypeMenu}</option>
              <option value="vcard">{t.qrModule.destTypeVcard}</option>
              <option value="whatsapp">{t.qrModule.destTypeWhatsapp}</option>
              <option value="wifi">{t.qrModule.destTypeWifi}</option>
            </select>
          </div>

          {destinationType === 'page' && availablePages.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                ربط مباشر بصفحة هبوط (Landing Page)
              </label>
              <select
                value={destinationUrl}
                onChange={e => setDestinationUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
              >
                <option value="">اختر صفحة الهبوط...</option>
                {availablePages.map(p => (
                  <option key={p.id} value={`/p/${p.slug}`}>
                    {p.title} (/p/{p.slug})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {t.qrModule.destinationTargetUrl}
            </label>
            <input
              type="text"
              required
              value={destinationUrl}
              onChange={e => setDestinationUrl(e.target.value)}
              placeholder="https://example.com/target أو /p/page-slug"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm font-mono focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs">
            <span className="text-neutral-400">رابط المسح الفعلي بالكاميرا:</span>{' '}
            <code className="text-emerald-400 font-mono select-all">{getQrRedirectUrl(qr.publicCode)}</code>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href={destinationUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition"
            >
              <ExternalLink className="w-3 h-3" />
              {t.qrModule.previewLink}
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
              >
                {t.actions.cancel}
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-rose-950/40"
              >
                {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                {t.qrModule.applyUpdate}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
