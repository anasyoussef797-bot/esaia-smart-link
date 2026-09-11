/**
 * ESAIA - Create Dynamic QR Code Modal
 * Instant creation with automatic client attribution, vector styling defaults,
 * and immediate high-resolution JPEG download for phone, computer, client sharing and physical printing.
 */

import React, { useState, useMemo } from 'react';
import { QrCode, Plus, Check, RefreshCw, Sparkles, Link2, Download, CheckCircle2, Copy, Sliders } from 'lucide-react';
import { Client } from '../../types/client';
import { QrCode as QrCodeType, QrDestinationType, QrModuleStyle } from '../../types/qr';
import { LandingPage } from '../../types/page';
import { qrService } from '../../services/firebase/qrService';
import { pageService } from '../../services/firebase/pageService';
import { qrVectorEngine } from '../../services/qr/qrVectorEngine';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { getAppBaseUrl, getQrRedirectUrl } from '../../utils/qrUrl';

interface CreateQrModalProps {
  isOpen: boolean;
  clients: Client[];
  onClose: () => void;
  onCreated: (newQr: QrCodeType) => void;
  onOpenDesigner?: (qr: QrCodeType) => void;
}

export const CreateQrModal: React.FC<CreateQrModalProps> = ({
  isOpen,
  clients,
  onClose,
  onCreated,
  onOpenDesigner
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
  const [isDownloading, setIsDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [createdQr, setCreatedQr] = useState<QrCodeType | null>(null);
  const [availablePages, setAvailablePages] = useState<LandingPage[]>([]);

  React.useEffect(() => {
    pageService.getPagesByOrg('org_esaia_main')
      .then(pages => setAvailablePages(pages))
      .catch(() => {});
  }, []);

  const redirectUrl = useMemo(() => {
    if (!createdQr) return '';
    return getQrRedirectUrl(createdQr.publicCode);
  }, [createdQr]);

  const svgString = useMemo(() => {
    if (!createdQr) return '';
    return qrVectorEngine.generateSvgString({
      value: getQrRedirectUrl(createdQr.publicCode),
      size: 380,
      style: createdQr.styleConfig
    });
  }, [createdQr]);

  if (!isOpen) return null;

  const handleClose = () => {
    setName('');
    setDestinationUrl('');
    setCustomSlug('');
    setCreatedQr(null);
    onClose();
  };

  const handleCopyLink = () => {
    if (!redirectUrl) return;
    navigator.clipboard.writeText(redirectUrl);
    setCopied(true);
    showToast(t.qrModule.copyDynamicLink, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJpeg = async () => {
    if (!createdQr || !svgString) return;
    setIsDownloading(true);
    try {
      const filename = `${createdQr.publicCode || 'qr-code'}_print.jpg`;
      await qrVectorEngine.downloadJpeg(
        svgString,
        filename,
        3,
        createdQr.styleConfig?.backgroundColor || '#ffffff'
      );
      showToast(t.qrModule.downloadJpegBtn + ' - تم التحميل بنجاح', 'success');
    } catch (err) {
      showToast('فشل تحميل صورة JPEG', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPng = async () => {
    if (!createdQr || !svgString) return;
    try {
      const filename = `${createdQr.publicCode || 'qr-code'}.png`;
      await qrVectorEngine.downloadPng(svgString, filename, 3);
      showToast('تم تحميل صورة PNG بنجاح', 'success');
    } catch (err) {
      showToast('فشل تحميل PNG', 'error');
    }
  };

  const handleDownloadSvg = () => {
    if (!createdQr || !svgString) return;
    const filename = `${createdQr.publicCode || 'qr-code'}_vector.svg`;
    qrVectorEngine.downloadSvg(svgString, filename);
    showToast('تم تحميل ملف SVG الفيكتور بنجاح', 'success');
  };

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
        setCreatedQr(created);
      }
      showToast(
        t.qrModule.dynamicQrCreatedSuccess,
        'success'
      );
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
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              createdQr ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
            }`}>
              {createdQr ? <CheckCircle2 className="w-4 h-4" /> : <QrCode className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {createdQr ? t.qrModule.createdSuccessTitle : t.qrModule.createDynamicModalTitle}
              </h3>
              <p className="text-xs text-neutral-400">
                {createdQr ? t.qrModule.createdSuccessSubtitle : t.qrModule.createCampaignSubtitle}
              </p>
            </div>
          </div>
          <button onClick={handleClose} className="text-neutral-400 hover:text-white text-xs">
            {t.actions.close}
          </button>
        </div>

        {createdQr ? (
          <div className="p-6 space-y-5 text-center">
            {/* Crisp Rendered Vector QR Graphic */}
            <div className="flex justify-center">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xl inline-flex items-center justify-center">
                <div
                  dangerouslySetInnerHTML={{ __html: svgString }}
                  className="w-48 h-48 flex items-center justify-center"
                />
              </div>
            </div>

            {/* Campaign Name and Client Tag */}
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">{createdQr.name}</h4>
              <p className="text-xs text-neutral-400">{createdQr.clientName}</p>
            </div>

            {/* Shortcode URL Box with Copy */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-left text-xs">
              <div className="truncate mr-2">
                <span className="text-[10px] text-neutral-500 block">{t.qrModule.shortcodeTarget}</span>
                <span className="font-mono text-emerald-400 truncate block">{redirectUrl}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition shrink-0"
                title={t.qrModule.copyDynamicLink}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Prominent Primary JPEG Download Button */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                disabled={isDownloading}
                onClick={handleDownloadJpeg}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition cursor-pointer"
                title={t.qrModule.downloadJpegBtn}
              >
                {isDownloading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>{t.qrModule.downloadJpegBtn}</span>
              </button>
              <p className="text-[11px] text-neutral-400">
                {t.qrModule.downloadJpegSub}
              </p>

              {/* Secondary Download buttons (PNG / SVG) */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  className="py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <span>{t.qrModule.downloadPngBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t.qrModule.downloadSvgBtn}</span>
                </button>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
              {onOpenDesigner && (
                <button
                  type="button"
                  onClick={() => {
                    const qrToEdit = createdQr;
                    handleClose();
                    onOpenDesigner(qrToEdit);
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{t.qrModule.customizeInStudio}</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="ml-auto px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition"
              >
                {t.qrModule.doneBtn}
              </button>
            </div>
          </div>
        ) : (
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
                  <option value="menu">{t.qrModule.destTypeMenu}</option>
                  <option value="vcard">{t.qrModule.destTypeVcard}</option>
                  <option value="whatsapp">{t.qrModule.destTypeWhatsapp}</option>
                  <option value="wifi">{t.qrModule.destTypeWifi}</option>
                </select>
              </div>
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
                {t.qrModule.destinationTargetUrl} *
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

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                {t.qrModule.customShortcodeOptional}
              </label>
              <div className="flex items-center rounded-xl bg-neutral-950 border border-neutral-700 overflow-hidden focus-within:border-rose-500">
                <span className="px-3 text-xs text-neutral-500 font-mono select-none">
                  {getAppBaseUrl().replace(/^https?:\/\//, '')}/q/
                </span>
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
                onClick={handleClose}
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
        )}
      </div>
    </div>
  );
};
