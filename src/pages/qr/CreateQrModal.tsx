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
  const { t } = useLanguage();
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
        t.qrModule.enterBothNameAndUrl,
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
        t.qrModule.dynamicQrCreatedSuccess,
        'success'
      );
      onClose();
    } catch (err) {
      showToast(t.qrModule.failedToUpdateUrl, 'error');
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
                {t.qrModule.createDynamicModalTitle}
              </h3>
              <p className="text-xs text-neutral-400">
                {t.qrModule.createCampaignSubtitle}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xs">
            {t.actions.close}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {t.qrModule.campaignQrName} *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. VIP Reception Desk QR"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                {t.qrModule.clientAssignment}
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
                {t.qrModule.destinationTypeLabel}
              </label>
              <select
                value={destinationType}
                onChange={e => setDestinationType(e.target.value as QrDestinationType)}
                className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
              >
                <option value="url">{t.qrModule.destTypeUrl}</option>
                <option value="menu">{t.qrModule.destTypeMenu}</option>
                <option value="vcard">{t.qrModule.destTypeVcard}</option>
                <option value="page">{t.qrModule.destTypePage}</option>
                <option value="whatsapp">{t.qrModule.destTypeWhatsapp}</option>
                <option value="wifi">{t.qrModule.destTypeWifi}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {t.qrModule.destinationTargetUrl} *
            </label>
            <input
              type="url"
              required
              value={destinationUrl}
              onChange={e => setDestinationUrl(e.target.value)}
              placeholder="https://example.com/target"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm font-mono focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {t.qrModule.customShortcodeOptional}
            </label>
            <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-700 overflow-hidden focus-within:border-rose-500">
              <span className="px-3 text-xs text-neutral-500 font-mono select-none">esaia.app/q/</span>
              <input
                type="text"
                value={customSlug}
                onChange={e => setCustomSlug(e.target.value)}
                placeholder="summer-promo"
                className="w-full py-2.5 pr-3 bg-transparent text-white text-sm font-mono focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              {t.qrModule.initialModuleShape}
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
                  {shape === 'rounded'
                    ? t.qrModule.shapeRounded
                    : shape === 'extra-rounded'
                    ? t.qrModule.shapeExtraRounded
                    : shape === 'dots'
                    ? t.qrModule.shapeDots
                    : t.qrModule.shapeClassy}
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
              {t.actions.cancel}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-rose-950/40"
            >
              {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              {t.qrModule.createDynamicModalTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
