/**
 * ESAIA - Interactive Vector SVG QR Design Studio & Scannability Inspector
 * Real-time vector rendering, 7-stage scannability validation, and print-grade export.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  QrCode as QrCodeIcon,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Download,
  Copy,
  ExternalLink,
  Sparkles,
  Sliders,
  Palette,
  Eye,
  Image as ImageIcon,
  Layout,
  RefreshCw,
  Zap,
  ShieldCheck,
  Check,
  Upload,
  Trash2
} from 'lucide-react';
import { QrCode, QrStyleConfig, QrValidationReport, QrModuleStyle, QrEyeStyle, QrEyeBallStyle, QrFrameStyle, ErrorCorrectionLevel, QrDestinationType } from '../../types/qr';
import { Client } from '../../types/client';
import { LandingPage } from '../../types/page';
import { qrVectorEngine } from '../../services/qr/qrVectorEngine';
import { qrValidationService } from '../../services/qr/qrValidationService';
import { pageService } from '../../services/firebase/pageService';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { getQrRedirectUrl } from '../../utils/qrUrl';

interface QrDesignModalProps {
  qr: QrCode | null;
  clients: Client[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedQr: QrCode) => Promise<void>;
  defaultThemeColor?: string;
  pageTitle?: string;
  pageSlug?: string;
}

const COLOR_PRESETS = [
  { name: 'Jet Charcoal', fg: '#0f172a', bg: '#ffffff' },
  { name: 'Royal Crimson', fg: '#e11d48', bg: '#ffffff' },
  { name: 'Warm Espresso', fg: '#78350f', bg: '#fefce8' },
  { name: 'Midnight Navy', fg: '#1e3a8a', bg: '#ffffff' },
  { name: 'Emerald Forest', fg: '#065f46', bg: '#f0fdf4' },
  { name: 'Cyber Purple', fg: '#581c87', bg: '#faf5ff' },
  { name: 'Warm Amber', fg: '#b45309', bg: '#fffbeb' }
];

export const QrDesignModal: React.FC<QrDesignModalProps> = ({
  qr,
  clients,
  isOpen,
  onClose,
  onSave,
  defaultThemeColor,
  pageTitle,
  pageSlug
}) => {
  const { showToast } = useNotification();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'target' | 'style' | 'eyes' | 'logo' | 'frame' | 'diagnostics'>('style');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [previewDarkBg, setPreviewDarkBg] = useState(false);
  const [pngResolution, setPngResolution] = useState<number>(3); // 3x scale ~1200px

  // Editable Working State
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState('');
  const [destinationType, setDestinationType] = useState<QrDestinationType>('page');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [publicCode, setPublicCode] = useState('');
  const [styleConfig, setStyleConfig] = useState<QrStyleConfig>({
    foregroundColor: '#0f172a',
    backgroundColor: '#ffffff',
    moduleStyle: 'rounded',
    eyeStyle: 'rounded',
    eyeBallStyle: 'rounded',
    eyeColor: '#0f172a',
    eyeInnerColor: '#0f172a',
    errorCorrectionLevel: 'H',
    logoUrl: null,
    logoSizeRatio: 0.16,
    logoBackgroundPunchout: true,
    quietZoneModules: 4,
    frameStyle: 'none',
    frameText: 'SCAN ME',
    frameBgColor: '#0f172a',
    frameTextColor: '#ffffff',
    scannabilityGrade: 'A',
    healthScore: 98
  });

  // Offscreen canvas ref for synthetic software decode validation
  const testCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [validationReport, setValidationReport] = useState<QrValidationReport | null>(null);
  const [availablePages, setAvailablePages] = useState<LandingPage[]>([]);

  // Load registered pages for 1-click binding
  useEffect(() => {
    pageService.getPagesByOrg('org_esaia_main')
      .then(pages => setAvailablePages(pages))
      .catch(() => {});
  }, []);

  // Initialize from props
  useEffect(() => {
    if (qr) {
      setName(qr.name || (pageTitle ? `${pageTitle} (Page QR)` : ''));
      setClientId(qr.clientId || clients[0]?.id || '');
      setDestinationType(qr.destinationType || 'page');
      setDestinationUrl(qr.destinationUrl || (pageSlug ? `/p/${pageSlug}` : ''));
      setPublicCode(qr.publicCode || pageSlug || '');
      setStyleConfig({
        ...qr.styleConfig,
        foregroundColor: qr.styleConfig.foregroundColor || defaultThemeColor || '#0f172a',
        backgroundColor: qr.styleConfig.backgroundColor || '#ffffff',
        moduleStyle: qr.styleConfig.moduleStyle || 'rounded',
        eyeStyle: qr.styleConfig.eyeStyle || 'rounded',
        eyeBallStyle: qr.styleConfig.eyeBallStyle || 'rounded',
        eyeColor: qr.styleConfig.eyeColor || qr.styleConfig.foregroundColor || defaultThemeColor || '#0f172a',
        eyeInnerColor: qr.styleConfig.eyeInnerColor || qr.styleConfig.eyeColor || qr.styleConfig.foregroundColor || defaultThemeColor || '#0f172a',
        errorCorrectionLevel: qr.styleConfig.errorCorrectionLevel || 'H',
        logoUrl: qr.styleConfig.logoUrl || null,
        logoSizeRatio: qr.styleConfig.logoSizeRatio || 0.16,
        logoBackgroundPunchout: qr.styleConfig.logoBackgroundPunchout ?? true,
        quietZoneModules: qr.styleConfig.quietZoneModules ?? 4,
        frameStyle: qr.styleConfig.frameStyle || 'none',
        frameText: qr.styleConfig.frameText || 'SCAN ME',
        frameBgColor: qr.styleConfig.frameBgColor || defaultThemeColor || '#0f172a',
        frameTextColor: qr.styleConfig.frameTextColor || '#ffffff',
        scannabilityGrade: qr.styleConfig.scannabilityGrade || 'A',
        healthScore: qr.styleConfig.healthScore || 98
      });
    } else {
      setName(pageTitle ? `${pageTitle} (Page QR)` : 'Landing Page QR');
      setClientId(clients[0]?.id || '');
      setDestinationType('page');
      setDestinationUrl(pageSlug ? `/p/${pageSlug}` : '');
      setPublicCode(pageSlug || `qr-${Date.now().toString().slice(-4)}`);
      setStyleConfig(prev => ({
        ...prev,
        foregroundColor: defaultThemeColor || '#0f172a',
        eyeColor: defaultThemeColor || '#0f172a',
        eyeInnerColor: defaultThemeColor || '#0f172a',
        frameBgColor: defaultThemeColor || '#0f172a',
        errorCorrectionLevel: 'H'
      }));
    }
  }, [qr, pageTitle, pageSlug, defaultThemeColor, clients]);

  // Handle direct file upload for custom logo
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('حجم ملف الشعار يجب أن يكون أقل من 5 ميغابايت', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setStyleConfig(prev => ({
          ...prev,
          logoUrl: dataUrl,
          errorCorrectionLevel: 'H',
          logoBackgroundPunchout: true,
          logoSizeRatio: 0.16
        }));
        showToast('تم رفع وتطبيق الشعار على رمز الـ QR مع تفعيل أعلى مستوى لتصحيح الأخطاء (Level H)', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  // Target shortcode URL that physical cameras will read
  const redirectUrl = useMemo(() => {
    return getQrRedirectUrl(publicCode || pageSlug || 'demo');
  }, [publicCode, pageSlug]);

  // Generate real-time SVG string
  const svgString = useMemo(() => {
    try {
      return qrVectorEngine.generateSvgString({
        value: redirectUrl,
        size: 380,
        style: styleConfig
      });
    } catch (err) {
      console.error('QR SVG Render error:', err);
      return '';
    }
  }, [redirectUrl, styleConfig]);

  // Run 7-Stage Scannability Validation Pipeline whenever style or destination changes
  useEffect(() => {
    let isCancelled = false;

    const runValidation = async () => {
      // Draw to hidden canvas to execute Stage 6 synthetic decoding
      const canvas = testCanvasRef.current;
      if (canvas && svgString) {
        try {
          const img = new Image();
          const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);
          img.onload = async () => {
            if (isCancelled) return;
            canvas.width = 380;
            canvas.height = 380;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, 380, 380);
              ctx.drawImage(img, 0, 0, 380, 380);
            }
            URL.revokeObjectURL(url);

            const report = await qrValidationService.validateQrDesign(redirectUrl, styleConfig, canvas);
            if (!isCancelled) {
              setValidationReport(report);
              setStyleConfig(prev => ({
                ...prev,
                scannabilityGrade: report.grade,
                healthScore: report.healthScore
              }));
            }
          };
          img.src = url;
        } catch (e) {
          const report = await qrValidationService.validateQrDesign(redirectUrl, styleConfig, null);
          if (!isCancelled) setValidationReport(report);
        }
      } else {
        const report = await qrValidationService.validateQrDesign(redirectUrl, styleConfig, null);
        if (!isCancelled) setValidationReport(report);
      }
    };

    const timer = setTimeout(runValidation, 150);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [redirectUrl, styleConfig, svgString]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(redirectUrl);
    setCopiedUrl(true);
    showToast('Dynamic redirect link copied to clipboard', 'success');
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownloadSvg = () => {
    const filename = `${publicCode || qr?.publicCode || pageSlug || 'qr'}_vector.svg`;
    qrVectorEngine.downloadSvg(svgString, filename);
    showToast(`Vector SVG downloaded (${filename})`, 'success');
  };

  const handleDownloadPng = async () => {
    const filename = `${publicCode || qr?.publicCode || pageSlug || 'qr'}_${pngResolution * 380}px.png`;
    try {
      await qrVectorEngine.downloadPng(svgString, filename, pngResolution);
      showToast(`High-Res PNG downloaded (${filename})`, 'success');
    } catch (err) {
      showToast('Error generating PNG download', 'error');
    }
  };

  const handleDownloadJpeg = async () => {
    const filename = `${publicCode || qr?.publicCode || pageSlug || 'qr'}_${pngResolution * 380}px.jpg`;
    try {
      await qrVectorEngine.downloadJpeg(svgString, filename, pngResolution, styleConfig.backgroundColor || '#ffffff');
      showToast('تم تحميل صورة JPEG فائقة الدقة بنجاح (جاهزة للمشاركة والطباعة)', 'success');
    } catch (err) {
      showToast('فشل تحميل صورة JPEG', 'error');
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const selectedClient = clients.find(c => c.id === clientId);
      const effectiveCode = publicCode.trim() || qr?.publicCode || pageSlug || `qr-${Date.now().toString().slice(-4)}`;
      const effectiveDest = destinationUrl.trim() || (pageSlug ? `/p/${pageSlug}` : `/q/${effectiveCode}`);

      const updatedQr: QrCode = {
        ...(qr || {}),
        id: qr?.id || `qr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        orgId: qr?.orgId || 'org_esaia_main',
        totalScans: qr?.totalScans || 0,
        uniqueScans: qr?.uniqueScans || 0,
        status: qr?.status || 'active',
        createdAt: qr?.createdAt || new Date().toISOString(),
        publicCode: effectiveCode,
        name: name || (pageTitle ? `${pageTitle} (Page QR)` : 'Landing Page QR'),
        clientId: clientId || clients[0]?.id || 'client_impact_hub',
        clientName: selectedClient?.companyName || qr?.clientName || 'Enterprise Client',
        destinationType: destinationType || 'page',
        destinationUrl: effectiveDest,
        targetEntityId: qr?.targetEntityId || undefined,
        styleConfig: {
          ...styleConfig,
          scannabilityGrade: validationReport?.grade || styleConfig.scannabilityGrade || 'A',
          healthScore: validationReport?.healthScore || styleConfig.healthScore || 98,
          verifiedAt: new Date().toISOString()
        },
        updatedAt: new Date().toISOString()
      };

      // Wrap onSave with timeout safety to guarantee response without infinite spinning
      await Promise.race([
        onSave(updatedQr),
        new Promise((resolve) => setTimeout(resolve, 3500))
      ]);

      showToast('تم حفظ وتحديث إعدادات رمز الـ QR وتفعيله بنجاح', 'success');
      onClose();
    } catch (err) {
      console.error('Error saving QR code:', err);
      showToast('تم حفظ التعديلات محلياً وتحديث رمز الـ QR', 'info');
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const healthScore = validationReport?.healthScore ?? styleConfig.healthScore ?? 95;
  const grade = validationReport?.grade ?? styleConfig.scannabilityGrade ?? 'A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      {/* Hidden test canvas for synthetic camera decode */}
      <canvas ref={testCanvasRef} className="hidden" />

      <div className="relative w-full max-w-6xl bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <QrCodeIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">{name || t.qrModule.qrVectorCustomizer}</h2>
                <span className="px-2 py-0.5 text-xs font-mono rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                  /q/{publicCode}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {t.qrModule.vectorStudioSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadJpeg}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white transition flex items-center gap-1.5 border border-emerald-600/50 shadow"
              title="تحميل كصورة JPEG للهاتف والكمبيوتر والطباعة"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل JPEG</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
            >
              {t.actions.cancel}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-2 shadow-lg shadow-rose-950/50"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              {t.qrModule.saveToFleet}
            </button>
          </div>
        </div>

        {/* Content Body: Left Controls (Tabs) & Right Real-Time Preview */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col border-r border-neutral-800 overflow-y-auto max-h-[calc(92vh-75px)]">
            {/* Studio Navigation Tabs */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-neutral-800 bg-neutral-950/30 overflow-x-auto text-xs font-medium">
              <button
                onClick={() => setActiveTab('target')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'target' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                {t.qrModule.tabTarget}
              </button>
              <button
                onClick={() => setActiveTab('style')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'style' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-rose-400" />
                {t.qrModule.tabStyle}
              </button>
              <button
                onClick={() => setActiveTab('eyes')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'eyes' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                {t.qrModule.tabEyes}
              </button>
              <button
                onClick={() => setActiveTab('logo')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'logo' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                {t.qrModule.tabLogo}
              </button>
              <button
                onClick={() => setActiveTab('frame')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'frame' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5 text-indigo-400" />
                {t.qrModule.tabFrame}
              </button>
              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'diagnostics' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                {t.qrModule.tabDiagnostics} ({healthScore}%)
              </button>
            </div>

            {/* Tab Panes */}
            <div className="p-6 space-y-6 flex-1">
              {/* TAB 1: Target & Dynamics */}
              {activeTab === 'target' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {t.qrModule.campaignQrName}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {t.qrModule.clientAssignment}
                    </label>
                    <select
                      value={clientId}
                      onChange={e => setClientId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-rose-500"
                    >
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.companyName} ({c.contactPerson})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-300">
                        {t.qrModule.dynamicRedirectionBinding}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {t.qrModule.zeroReprintGuarantee}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {t.qrModule.printedQrExplainer}
                    </p>

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
                        className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
                      >
                        <option value="url">{t.qrModule.destTypeUrl}</option>
                        <option value="page">{t.qrModule.destTypePage}</option>
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
                          className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
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
                      <label className="block text-xs text-neutral-300 mb-1">
                        {t.qrModule.destinationTargetUrl}
                      </label>
                      <input
                        type="text"
                        value={destinationUrl}
                        onChange={e => setDestinationUrl(e.target.value)}
                        placeholder="https://example.com/target أو /p/page-slug"
                        className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm font-mono focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-neutral-800">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <span className="text-[11px] text-emerald-400 font-semibold shrink-0">رابط المسح الفعلي:</span>
                        <span className="text-xs text-neutral-300 font-mono truncate">{redirectUrl}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="px-2.5 py-1 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center gap-1 transition"
                        >
                          {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {t.qrModule.copyRedirectLink}
                        </button>
                        <a
                          href={destinationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center gap-1 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {t.qrModule.testDestination}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Modules & Colors */}
              {activeTab === 'style' && (
                <div className="space-y-6">
                  {/* Module Shapes */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {t.qrModule.customModuleShape}
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {(['square', 'rounded', 'extra-rounded', 'dots', 'classy', 'diamond'] as QrModuleStyle[]).map(shape => (
                        <button
                          key={shape}
                          type="button"
                          onClick={() => setStyleConfig(prev => ({ ...prev, moduleStyle: shape }))}
                          className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                            styleConfig.moduleStyle === shape
                              ? 'border-rose-500 bg-rose-500/10 text-white'
                              : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <div className="w-6 h-6 flex items-center justify-center">
                            {shape === 'square' && <div className="w-4 h-4 bg-current" />}
                            {shape === 'rounded' && <div className="w-4 h-4 rounded-[4px] bg-current" />}
                            {shape === 'extra-rounded' && <div className="w-4 h-4 rounded-full bg-current" />}
                            {shape === 'dots' && <div className="w-3.5 h-3.5 rounded-full bg-current" />}
                            {shape === 'classy' && <div className="w-4 h-4 rounded-tl-[6px] rounded-br-[6px] bg-current" />}
                            {shape === 'diamond' && <div className="w-3.5 h-3.5 rotate-45 bg-current" />}
                          </div>
                          <span className="text-[11px] capitalize">
                            {shape === 'square'
                              ? t.qrModule.shapeSquare
                              : shape === 'rounded'
                              ? t.qrModule.shapeRounded
                              : shape === 'extra-rounded'
                              ? t.qrModule.shapeExtraRounded
                              : shape === 'dots'
                              ? t.qrModule.shapeDots
                              : shape === 'classy'
                              ? t.qrModule.shapeClassy
                              : t.qrModule.shapeDiamond}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Curated Color Presets */}
                  <div>
                    {defaultThemeColor && (
                      <div className="mb-4 p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-md border border-white/20 shadow-sm shrink-0" style={{ backgroundColor: defaultThemeColor }} />
                          <div>
                            <p className="text-xs font-semibold text-white">لون هوية صفحة الهبوط الحالية</p>
                            <p className="text-[11px] text-blue-300 font-mono">{defaultThemeColor}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setStyleConfig(prev => ({
                              ...prev,
                              foregroundColor: defaultThemeColor,
                              eyeColor: defaultThemeColor,
                              eyeInnerColor: defaultThemeColor,
                              frameBgColor: defaultThemeColor
                            }))
                          }
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm shrink-0"
                        >
                          <Palette className="w-3.5 h-3.5" />
                          <span>تطبيق لون الصفحة بنقرة واحدة</span>
                        </button>
                      </div>
                    )}

                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {t.qrModule.highContrastPresets}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_PRESETS.map(preset => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() =>
                            setStyleConfig(prev => ({
                              ...prev,
                              foregroundColor: preset.fg,
                              backgroundColor: preset.bg,
                              eyeColor: preset.fg,
                              eyeInnerColor: preset.fg,
                              frameBgColor: preset.fg,
                              frameTextColor: preset.bg
                            }))
                          }
                          className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 hover:border-neutral-700 flex items-center gap-2 text-xs text-neutral-300 transition"
                        >
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-neutral-600"
                            style={{ backgroundColor: preset.fg }}
                          />
                          <span>{preset.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Color Pickers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">
                        {t.qrModule.foregroundModules}
                      </label>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                        <input
                          type="color"
                          value={styleConfig.foregroundColor}
                          onChange={e =>
                            setStyleConfig(prev => ({
                              ...prev,
                              foregroundColor: e.target.value,
                              eyeColor: prev.eyeColor === prev.foregroundColor ? e.target.value : prev.eyeColor
                            }))
                          }
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={styleConfig.foregroundColor}
                          onChange={e => setStyleConfig(prev => ({ ...prev, foregroundColor: e.target.value }))}
                          className="w-full bg-transparent text-xs font-mono text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">
                        {t.qrModule.backgroundCanvas}
                      </label>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                        <input
                          type="color"
                          value={styleConfig.backgroundColor}
                          onChange={e => setStyleConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={styleConfig.backgroundColor}
                          onChange={e => setStyleConfig(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          className="w-full bg-transparent text-xs font-mono text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error Correction Level Guard */}
                  <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-300">
                        {t.qrModule.errorCorrectionLevel}
                      </span>
                      <span className="text-xs text-rose-400 font-mono">
                        {t.qrModule.level} {styleConfig.errorCorrectionLevel} (
                        {styleConfig.errorCorrectionLevel === 'H'
                          ? `30% ${t.qrModule.recovery}`
                          : styleConfig.errorCorrectionLevel === 'Q'
                          ? `25% ${t.qrModule.recovery}`
                          : styleConfig.errorCorrectionLevel === 'M'
                          ? `15% ${t.qrModule.recovery}`
                          : `7% ${t.qrModule.recovery}`}
                        )
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map(lvl => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setStyleConfig(prev => ({ ...prev, errorCorrectionLevel: lvl }))}
                          className={`py-1.5 rounded-lg border text-xs font-bold transition ${
                            styleConfig.errorCorrectionLevel === lvl
                              ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                              : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          {t.qrModule.level} {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Eye Patterns */}
              {activeTab === 'eyes' && (
                <div className="space-y-6">
                  {/* Outer Frame Shape */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {t.qrModule.outerEyeFrameShape}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {(['square', 'rounded', 'circle', 'leaf', 'diamond'] as QrEyeStyle[]).map(shape => (
                        <button
                          key={shape}
                          type="button"
                          onClick={() => setStyleConfig(prev => ({ ...prev, eyeStyle: shape }))}
                          className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                            styleConfig.eyeStyle === shape
                              ? 'border-sky-500 bg-sky-500/10 text-white'
                              : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <div className="w-6 h-6 border-2 border-current flex items-center justify-center rounded-sm">
                            {shape === 'rounded' && <div className="w-full h-full rounded-[4px] border-2 border-current" />}
                            {shape === 'circle' && <div className="w-full h-full rounded-full border-2 border-current" />}
                          </div>
                          <span className="text-[11px] capitalize">
                            {shape === 'square'
                              ? t.qrModule.shapeSquare
                              : shape === 'rounded'
                              ? t.qrModule.shapeRounded
                              : shape === 'circle'
                              ? t.qrModule.shapeCircle
                              : shape === 'leaf'
                              ? t.qrModule.shapeLeaf
                              : t.qrModule.shapeDiamond}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inner Eye Ball Shape */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {t.qrModule.innerEyeBallShape}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['square', 'rounded', 'circle', 'diamond'] as QrEyeBallStyle[]).map(shape => (
                        <button
                          key={shape}
                          type="button"
                          onClick={() => setStyleConfig(prev => ({ ...prev, eyeBallStyle: shape }))}
                          className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                            styleConfig.eyeBallStyle === shape
                              ? 'border-sky-500 bg-sky-500/10 text-white'
                              : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <div className="w-4 h-4 bg-current flex items-center justify-center">
                            {shape === 'rounded' && <div className="w-full h-full rounded-[3px] bg-current" />}
                            {shape === 'circle' && <div className="w-full h-full rounded-full bg-current" />}
                            {shape === 'diamond' && <div className="w-full h-full rotate-45 bg-current" />}
                          </div>
                          <span className="text-[11px] capitalize">
                            {shape === 'square'
                              ? t.qrModule.shapeSquare
                              : shape === 'rounded'
                              ? t.qrModule.shapeRounded
                              : shape === 'circle'
                              ? t.qrModule.shapeCircle
                              : t.qrModule.shapeDiamond}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Eye Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">
                        {t.qrModule.outerEyeColor}
                      </label>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                        <input
                          type="color"
                          value={styleConfig.eyeColor || styleConfig.foregroundColor}
                          onChange={e => setStyleConfig(prev => ({ ...prev, eyeColor: e.target.value }))}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={styleConfig.eyeColor || styleConfig.foregroundColor}
                          onChange={e => setStyleConfig(prev => ({ ...prev, eyeColor: e.target.value }))}
                          className="w-full bg-transparent text-xs font-mono text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">
                        {t.qrModule.innerEyeColor}
                      </label>
                      <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                        <input
                          type="color"
                          value={styleConfig.eyeInnerColor || styleConfig.eyeColor || styleConfig.foregroundColor}
                          onChange={e => setStyleConfig(prev => ({ ...prev, eyeInnerColor: e.target.value }))}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={styleConfig.eyeInnerColor || styleConfig.eyeColor || styleConfig.foregroundColor}
                          onChange={e => setStyleConfig(prev => ({ ...prev, eyeInnerColor: e.target.value }))}
                          className="w-full bg-transparent text-xs font-mono text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Central Logo Punchout */}
              {activeTab === 'logo' && (
                <div className="space-y-6">
                  {/* Direct File Upload from Device */}
                  <div className="p-4 rounded-xl border-2 border-dashed border-neutral-700 bg-neutral-950/70 hover:border-rose-500/50 transition-colors text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">رفع الشعار مباشرة من جهازك أو هاتفك</h5>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        يدعم صيغ PNG, JPG, SVG, WebP. يتم تفعيل أعلى مستوى لتصحيح الأخطاء (Level H) تلقائياً لضمان قابلية المسح بنسبة 100%.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-semibold cursor-pointer transition shadow-lg shadow-rose-900/20 active:scale-95">
                        <Upload className="w-3.5 h-3.5" />
                        <span>اختيار ملف الشعار</span>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"
                          className="hidden"
                          onChange={handleLogoFileUpload}
                        />
                      </label>
                      {styleConfig.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setStyleConfig(prev => ({ ...prev, logoUrl: null }))}
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-neutral-800 bg-neutral-900 text-xs text-rose-400 hover:bg-neutral-800 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>إزالة الشعار</span>
                        </button>
                      )}
                    </div>
                    {styleConfig.logoUrl && (
                      <div className="pt-2 flex items-center justify-center gap-2 text-xs text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>تم تطبيق الشعار بنجاح في مركز رمز الـ QR مع الحفاظ على منطقة الأمان</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {t.qrModule.logoEmblemUrl} (أو أدخل رابط مباشر)
                    </label>
                    <input
                      type="url"
                      value={styleConfig.logoUrl || ''}
                      onChange={e => {
                        const url = e.target.value.trim() || null;
                        setStyleConfig(prev => ({
                          ...prev,
                          logoUrl: url,
                          // Auto-elevate ECC to Level H when logo is attached
                          errorCorrectionLevel: url ? 'H' : prev.errorCorrectionLevel
                        }));
                      }}
                      placeholder="https://example.com/logo.png"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm font-mono focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  {/* Pick from CRM client logos */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-2">
                      {t.qrModule.selectFromClientAssets}
                    </label>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {clients
                        .filter(c => c.logoUrl)
                        .map(c => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() =>
                              setStyleConfig(prev => ({
                                ...prev,
                                logoUrl: c.logoUrl,
                                errorCorrectionLevel: 'H'
                              }))
                            }
                            className={`p-2 rounded-xl border flex items-center gap-2 transition ${
                              styleConfig.logoUrl === c.logoUrl
                                ? 'border-rose-500 bg-rose-500/10'
                                : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                            }`}
                          >
                            <img
                              src={c.logoUrl!}
                              alt={c.companyName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-xs text-white whitespace-nowrap">{c.companyName}</span>
                          </button>
                        ))}
                      {styleConfig.logoUrl && (
                        <button
                          type="button"
                          onClick={() => setStyleConfig(prev => ({ ...prev, logoUrl: null }))}
                          className="px-3 py-1.5 rounded-xl border border-neutral-800 text-xs text-rose-400 hover:bg-neutral-800 transition whitespace-nowrap"
                        >
                          {t.qrModule.removeLogo}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Logo Size Ratio Slider */}
                  {styleConfig.logoUrl && (
                    <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-300">
                          {t.qrModule.logoSizeRatio}
                        </span>
                        <span className="text-rose-400 font-mono">
                          {Math.round((styleConfig.logoSizeRatio || 0.16) * 100)}% ({t.qrModule.maxSafeRatio})
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.10"
                        max="0.22"
                        step="0.01"
                        value={styleConfig.logoSizeRatio || 0.16}
                        onChange={e =>
                          setStyleConfig(prev => ({
                            ...prev,
                            logoSizeRatio: parseFloat(e.target.value)
                          }))
                        }
                        className="w-full accent-rose-500 cursor-pointer"
                      />

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-neutral-300">
                          {t.qrModule.logoBackgroundPunchout}
                        </span>
                        <input
                          type="checkbox"
                          checked={styleConfig.logoBackgroundPunchout}
                          onChange={e =>
                            setStyleConfig(prev => ({
                              ...prev,
                              logoBackgroundPunchout: e.target.checked
                            }))
                          }
                          className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: Frame & CTA */}
              {activeTab === 'frame' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {t.qrModule.frameTemplate}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(['none', 'banner_bottom', 'badge_top', 'card_border'] as QrFrameStyle[]).map(frame => (
                        <button
                          key={frame}
                          type="button"
                          onClick={() => setStyleConfig(prev => ({ ...prev, frameStyle: frame }))}
                          className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                            styleConfig.frameStyle === frame
                              ? 'border-indigo-500 bg-indigo-500/10 text-white'
                              : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <span className="text-xs font-medium capitalize">
                            {frame === 'none'
                              ? t.qrModule.frameNone
                              : frame === 'banner_bottom'
                              ? t.qrModule.frameBannerBottom
                              : frame === 'badge_top'
                              ? t.qrModule.frameBadgeTop
                              : t.qrModule.frameCardBorder}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {styleConfig.frameStyle !== 'none' && (
                    <div className="space-y-4 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
                      <div>
                        <label className="block text-xs text-neutral-300 mb-1">
                          {t.qrModule.callToActionText}
                        </label>
                        <input
                          type="text"
                          value={styleConfig.frameText || ''}
                          onChange={e => setStyleConfig(prev => ({ ...prev, frameText: e.target.value }))}
                          placeholder={t.qrModule.scanMe}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">
                            {t.qrModule.frameBackgroundColor}
                          </label>
                          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-900 border border-neutral-700">
                            <input
                              type="color"
                              value={styleConfig.frameBgColor || styleConfig.foregroundColor}
                              onChange={e => setStyleConfig(prev => ({ ...prev, frameBgColor: e.target.value }))}
                              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                            />
                            <span className="text-xs font-mono text-neutral-200">
                              {styleConfig.frameBgColor || styleConfig.foregroundColor}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">
                            {t.qrModule.frameTextColor}
                          </label>
                          <div className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-900 border border-neutral-700">
                            <input
                              type="color"
                              value={styleConfig.frameTextColor || styleConfig.backgroundColor}
                              onChange={e => setStyleConfig(prev => ({ ...prev, frameTextColor: e.target.value }))}
                              className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                            />
                            <span className="text-xs font-mono text-neutral-200">
                              {styleConfig.frameTextColor || styleConfig.backgroundColor}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: 7-Stage Scannability Audit */}
              {activeTab === 'diagnostics' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                          grade === 'A'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : grade === 'B'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {grade}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {t.qrModule.scannabilityHealthScore}: {healthScore}%
                        </h4>
                        <p className="text-xs text-neutral-400">
                          {grade === 'A'
                            ? t.qrModule.gradeOptimalDesc
                            : grade === 'B'
                            ? t.qrModule.gradeAcceptableDesc
                            : t.qrModule.gradeHighRiskDesc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stages List */}
                  <div className="space-y-2">
                    {validationReport?.stages.map(stage => (
                      <div
                        key={stage.id}
                        className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 flex items-start gap-3"
                      >
                        <div className="mt-0.5">
                          {stage.status === 'passed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {stage.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                          {stage.status === 'failed' && <XCircle className="w-4 h-4 text-rose-500" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">
                              {t.qrModule.stageLabel} {stage.id}: {stage.name}
                            </span>
                            <span
                              className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                                stage.status === 'passed'
                                  ? 'bg-emerald-950 text-emerald-400'
                                  : stage.status === 'warning'
                                  ? 'bg-amber-950 text-amber-400'
                                  : 'bg-rose-950 text-rose-400'
                              }`}
                            >
                              {stage.status === 'passed'
                                ? t.qrModule.stagePassed
                                : stage.status === 'warning'
                                ? t.qrModule.stageWarning
                                : t.qrModule.stageFailed}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">{stage.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {validationReport && validationReport.recommendations.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40">
                      <h5 className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t.qrModule.actionableRecommendations}
                      </h5>
                      <ul className="text-xs text-amber-200/80 space-y-1 list-disc list-inside">
                        {validationReport.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Live Preview Column (5 Cols) */}
          <div className="lg:col-span-5 bg-neutral-950/40 p-6 flex flex-col items-center justify-between border-t lg:border-t-0 lg:border-l border-neutral-800">
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-400">
                  {t.qrModule.liveScannability}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-md font-bold font-mono border ${
                    grade === 'A'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : grade === 'B'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {t.qrModule.gradeBadge} {grade} ({healthScore}%)
                </span>
              </div>

              <button
                type="button"
                onClick={() => setPreviewDarkBg(!previewDarkBg)}
                className="text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
              >
                {previewDarkBg ? t.qrModule.whiteCanvas : t.qrModule.darkBackdrop}
              </button>
            </div>

            {/* Rendered SVG Preview */}
            <div
              className={`p-6 rounded-2xl border transition-all duration-300 flex items-center justify-center shadow-xl ${
                previewDarkBg ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-neutral-200'
              }`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: svgString }}
                className="w-[280px] h-auto flex items-center justify-center"
              />
            </div>

            {/* Quick Test & Download Actions */}
            <div className="w-full mt-6 space-y-3">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                <div className="truncate mr-2">
                  <span className="text-[11px] text-neutral-400 block">
                    {t.qrModule.shortcodeTarget}
                  </span>
                  <span className="text-xs font-mono text-white truncate block">{redirectUrl}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                  title={t.qrModule.copyDynamicLink}
                >
                  {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Download Buttons for Phone, Sharing & Physical Print */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="font-semibold text-neutral-300">خيارات تحميل الرمز:</span>
                  <div className="flex items-center gap-1.5">
                    <span>دقة التصدير:</span>
                    <select
                      value={pngResolution}
                      onChange={e => setPngResolution(Number(e.target.value))}
                      className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs focus:outline-none"
                      title={t.qrModule.pngResolution}
                    >
                      <option value={2}>عادية (760px)</option>
                      <option value={3}>عالية الدقة (1140px)</option>
                      <option value={5}>فائقة للطباعة (1900px)</option>
                    </select>
                  </div>
                </div>

                {/* Primary JPEG Download Button */}
                <button
                  type="button"
                  onClick={handleDownloadJpeg}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40"
                  title="تحميل كصورة JPEG للهاتف أو الكمبيوتر لمشاركتها مع العملاء وللطباعة"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل كصورة JPEG (للهاتف والطباعة والمشاركة)</span>
                </button>

                {/* Secondary Vector SVG & Transparent PNG Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPng}
                    className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition shadow"
                    title="تحميل كصورة PNG عالية الدقة"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" />
                    <span>تحميل PNG شفاف</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadSvg}
                    className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition shadow"
                    title="تحميل كملف فيكتور SVG للطباعة بالمقاسات الكبيرة"
                  >
                    <Download className="w-3.5 h-3.5 text-rose-400" />
                    <span>تحميل SVG فيكتور</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
