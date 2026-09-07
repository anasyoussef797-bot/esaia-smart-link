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
  Check
} from 'lucide-react';
import { QrCode, QrStyleConfig, QrValidationReport, QrModuleStyle, QrEyeStyle, QrEyeBallStyle, QrFrameStyle, ErrorCorrectionLevel, QrDestinationType } from '../../types/qr';
import { Client } from '../../types/client';
import { qrVectorEngine } from '../../services/qr/qrVectorEngine';
import { qrValidationService } from '../../services/qr/qrValidationService';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';

interface QrDesignModalProps {
  qr: QrCode | null;
  clients: Client[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedQr: QrCode) => Promise<void>;
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
  onSave
}) => {
  const { showToast } = useNotification();
  const { t, isRtl } = useLanguage();

  const [activeTab, setActiveTab] = useState<'target' | 'style' | 'eyes' | 'logo' | 'frame' | 'diagnostics'>('style');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [previewDarkBg, setPreviewDarkBg] = useState(false);
  const [pngResolution, setPngResolution] = useState<number>(3); // 3x scale ~1200px

  // Editable Working State
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState('');
  const [destinationType, setDestinationType] = useState<QrDestinationType>('url');
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

  // Initialize from props
  useEffect(() => {
    if (qr) {
      setName(qr.name);
      setClientId(qr.clientId);
      setDestinationType(qr.destinationType || 'url');
      setDestinationUrl(qr.destinationUrl || 'https://esaia.app');
      setPublicCode(qr.publicCode);
      setStyleConfig({
        ...qr.styleConfig,
        foregroundColor: qr.styleConfig.foregroundColor || '#0f172a',
        backgroundColor: qr.styleConfig.backgroundColor || '#ffffff',
        moduleStyle: qr.styleConfig.moduleStyle || 'rounded',
        eyeStyle: qr.styleConfig.eyeStyle || 'rounded',
        eyeBallStyle: qr.styleConfig.eyeBallStyle || 'rounded',
        eyeColor: qr.styleConfig.eyeColor || qr.styleConfig.foregroundColor || '#0f172a',
        eyeInnerColor: qr.styleConfig.eyeInnerColor || qr.styleConfig.eyeColor || qr.styleConfig.foregroundColor || '#0f172a',
        errorCorrectionLevel: qr.styleConfig.errorCorrectionLevel || 'H',
        logoUrl: qr.styleConfig.logoUrl || null,
        logoSizeRatio: qr.styleConfig.logoSizeRatio || 0.16,
        logoBackgroundPunchout: qr.styleConfig.logoBackgroundPunchout ?? true,
        quietZoneModules: qr.styleConfig.quietZoneModules ?? 4,
        frameStyle: qr.styleConfig.frameStyle || 'none',
        frameText: qr.styleConfig.frameText || 'SCAN ME',
        frameBgColor: qr.styleConfig.frameBgColor || qr.styleConfig.foregroundColor || '#0f172a',
        frameTextColor: qr.styleConfig.frameTextColor || qr.styleConfig.backgroundColor || '#ffffff',
        scannabilityGrade: qr.styleConfig.scannabilityGrade || 'A',
        healthScore: qr.styleConfig.healthScore || 95
      });
    }
  }, [qr]);

  // Target shortcode URL that physical cameras will read
  const redirectUrl = useMemo(() => {
    return `https://esaia.app/q/${publicCode || 'demo'}`;
  }, [publicCode]);

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

  if (!isOpen || !qr) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(redirectUrl);
    setCopiedUrl(true);
    showToast('Dynamic redirect link copied to clipboard', 'success');
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownloadSvg = () => {
    const filename = `${qr.publicCode || 'qr'}_vector.svg`;
    qrVectorEngine.downloadSvg(svgString, filename);
    showToast(`Vector SVG downloaded (${filename})`, 'success');
  };

  const handleDownloadPng = async () => {
    const filename = `${qr.publicCode || 'qr'}_${pngResolution * 380}px.png`;
    try {
      await qrVectorEngine.downloadPng(svgString, filename, pngResolution);
      showToast(`High-Res PNG downloaded (${filename})`, 'success');
    } catch (err) {
      showToast('Error generating PNG download', 'error');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const selectedClient = clients.find(c => c.id === clientId);
      const updatedQr: QrCode = {
        ...qr,
        name,
        clientId,
        clientName: selectedClient?.companyName || qr.clientName,
        destinationType,
        destinationUrl,
        styleConfig: {
          ...styleConfig,
          scannabilityGrade: validationReport?.grade || styleConfig.scannabilityGrade,
          healthScore: validationReport?.healthScore || styleConfig.healthScore,
          verifiedAt: new Date().toISOString()
        },
        updatedAt: new Date().toISOString()
      };
      await onSave(updatedQr);
      showToast('QR Code design & destination bindings updated successfully', 'success');
      onClose();
    } catch (err) {
      showToast('Failed to save QR design updates', 'error');
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
                <h2 className="text-lg font-bold text-white tracking-tight">{name || (isRtl ? 'مخصص متجهات QR' : 'QR Vector Customizer')}</h2>
                <span className="px-2 py-0.5 text-xs font-mono rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                  /q/{publicCode}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {isRtl
                  ? 'محرك متجهات SVG وفحص مسح ضوئي شامل من 7 مراحل'
                  : 'Vector SVG Engine & 7-Stage Scannability Validation Pipeline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-2 shadow-lg shadow-rose-950/50"
            >
              {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
              {isRtl ? 'حفظ في الأسطول' : 'Save to Fleet'}
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
                {isRtl ? 'الهدف والروابط' : 'Target & Dynamics'}
              </button>
              <button
                onClick={() => setActiveTab('style')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'style' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5 text-rose-400" />
                {isRtl ? 'النقاط والألوان' : 'Modules & Colors'}
              </button>
              <button
                onClick={() => setActiveTab('eyes')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'eyes' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                {isRtl ? 'أنماط العيون' : 'Eye Patterns'}
              </button>
              <button
                onClick={() => setActiveTab('logo')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'logo' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                {isRtl ? 'تفريغ الشعار' : 'Logo Punchout'}
              </button>
              <button
                onClick={() => setActiveTab('frame')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'frame' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Layout className="w-3.5 h-3.5 text-indigo-400" />
                {isRtl ? 'إطار الإجراء CTA' : 'CTA Frame'}
              </button>
              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`px-3 py-2 rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'diagnostics' ? 'bg-neutral-800 text-white shadow' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                {isRtl ? `تدقيق 7 مراحل (${healthScore}%)` : `7-Stage Audit (${healthScore}%)`}
              </button>
            </div>

            {/* Tab Panes */}
            <div className="p-6 space-y-6 flex-1">
              {/* TAB 1: Target & Dynamics */}
              {activeTab === 'target' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {isRtl ? 'اسم الحملة / رمز QR' : 'Campaign / QR Name'}
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
                      {isRtl ? 'تعيين العميل من CRM' : 'Client CRM Assignment'}
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
                        {isRtl ? 'ربط إعادة التوجيه الديناميكي' : 'Dynamic Redirection Binding'}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {isRtl ? 'ضمان عدم إعادة الطباعة' : 'Zero-Reprint Guarantee'}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {isRtl ? (
                        <>
                          رموز QR المطبوعة تشفر دائماً الرابط الثابت <code className="text-rose-400 font-mono">/q/{publicCode}</code>.
                          يمكنك تعديل الرابط المستهدف أدناه في أي وقت دون التأثير على المواد المطبوعة.
                        </>
                      ) : (
                        <>
                          Physical QR prints always encode <code className="text-rose-400 font-mono">/q/{publicCode}</code>.
                          You can modify the destination URL below at any time without breaking existing printed media.
                        </>
                      )}
                    </p>

                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">
                        {isRtl ? 'رابط الوجهة المستهدف' : 'Destination Target URL'}
                      </label>
                      <input
                        type="url"
                        value={destinationUrl}
                        onChange={e => setDestinationUrl(e.target.value)}
                        placeholder={isRtl ? 'https://example.com/target' : 'https://yourbrand.com/target'}
                        className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm font-mono focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-neutral-400 font-mono">https://esaia.app/q/{publicCode}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyLink}
                          className="px-2.5 py-1 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center gap-1 transition"
                        >
                          {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          {isRtl ? 'نسخ الرابط' : 'Copy Link'}
                        </button>
                        <a
                          href={destinationUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 text-xs rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center gap-1 transition"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {isRtl ? 'تجربة التوجيه' : 'Test Redirect'}
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
                      {isRtl ? 'شكل النقاط المخصص' : 'Custom Module Shape'}
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
                            {isRtl
                              ? shape === 'square'
                                ? 'مربع'
                                : shape === 'rounded'
                                ? 'دائري'
                                : shape === 'extra-rounded'
                                ? 'دائري ناعم'
                                : shape === 'dots'
                                ? 'نقاط'
                                : shape === 'classy'
                                ? 'كلاسيكي'
                                : 'ماسي'
                              : shape.replace('-', ' ')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Curated Color Presets */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {isRtl ? 'نماذج ألوان عالية التباين' : 'High-Contrast Presets'}
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
                        {isRtl ? 'لون النقاط (Foreground)' : 'Foreground (Modules)'}
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
                        {isRtl ? 'لون الخلفية (Background)' : 'Background Canvas'}
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
                        {isRtl ? 'مستوى تصحيح الأخطاء (ECC)' : 'Error Correction Level'}
                      </span>
                      <span className="text-xs text-rose-400 font-mono">
                        {isRtl ? 'المستوى' : 'Level'} {styleConfig.errorCorrectionLevel} (
                        {styleConfig.errorCorrectionLevel === 'H'
                          ? isRtl ? 'استرداد 30%' : '30% recovery'
                          : styleConfig.errorCorrectionLevel === 'Q'
                          ? isRtl ? 'استرداد 25%' : '25% recovery'
                          : styleConfig.errorCorrectionLevel === 'M'
                          ? isRtl ? 'استرداد 15%' : '15% recovery'
                          : isRtl ? 'استرداد 7%' : '7% recovery'}
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
                          {isRtl ? 'مستوى' : 'Level'} {lvl}
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
                      {isRtl ? 'شكل إطار العين الخارجي' : 'Outer Eye Frame Shape'}
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
                            {isRtl
                              ? shape === 'square'
                                ? 'مربع'
                                : shape === 'rounded'
                                ? 'دائري'
                                : shape === 'circle'
                                ? 'حلقة'
                                : shape === 'leaf'
                                ? 'ورقة شجر'
                                : 'ماسي'
                              : shape}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Inner Eye Ball Shape */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {isRtl ? 'شكل بؤبؤ العين الداخلي' : 'Inner Eye Ball Shape'}
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
                            {isRtl
                              ? shape === 'square'
                                ? 'مربع'
                                : shape === 'rounded'
                                ? 'دائري'
                                : shape === 'circle'
                                ? 'نقطة دائرية'
                                : 'ماسي'
                              : shape}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Eye Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-300 mb-1">
                        {isRtl ? 'لون إطار العين الخارجي' : 'Outer Eye Frame Color'}
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
                        {isRtl ? 'لون بؤبؤ العين الداخلي' : 'Inner Eye Ball Color'}
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
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      {isRtl ? 'رابط أيقونة الشعار (PNG / SVG)' : 'Logo Emblem URL (PNG / SVG)'}
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
                      placeholder="https://yourbrand.com/logo.png"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm font-mono focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  {/* Pick from CRM client logos */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-2">
                      {isRtl ? 'أو اختر مباشرة من أصول هوية العميل:' : 'Or Select from Client Brand Assets:'}
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
                          {isRtl ? 'إزالة الشعار' : 'Remove Logo'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Logo Size Ratio Slider */}
                  {styleConfig.logoUrl && (
                    <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-300">
                          {isRtl ? 'نسبة حجم الشعار' : 'Logo Size Ratio'}
                        </span>
                        <span className="text-rose-400 font-mono">
                          {Math.round((styleConfig.logoSizeRatio || 0.16) * 100)}% ({isRtl ? 'الحد الأقصى الآمن: 22%' : 'Max safe: 22%'})
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
                          {isRtl ? 'تفريغ الخلفية أسفل الشعار' : 'Background Module Punchout'}
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
                      {isRtl ? 'قالب الإطار' : 'Frame Template'}
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
                            {isRtl
                              ? frame === 'none'
                                ? 'بدون إطار'
                                : frame === 'banner_bottom'
                                ? 'شريط سفلي'
                                : frame === 'badge_top'
                                ? 'شارة علوية'
                                : 'إطار بطاقة'
                              : frame.replace('_', ' ')}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {styleConfig.frameStyle !== 'none' && (
                    <div className="space-y-4 p-4 rounded-xl bg-neutral-950/80 border border-neutral-800">
                      <div>
                        <label className="block text-xs text-neutral-300 mb-1">
                          {isRtl ? 'نص الحث على الإجراء (CTA)' : 'Call to Action Text'}
                        </label>
                        <input
                          type="text"
                          value={styleConfig.frameText || ''}
                          onChange={e => setStyleConfig(prev => ({ ...prev, frameText: e.target.value }))}
                          placeholder={isRtl ? 'امسح الرمز ضوئياً' : 'SCAN ME'}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-neutral-300 mb-1">
                            {isRtl ? 'لون خلفية الإطار' : 'Frame Background'}
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
                            {isRtl ? 'لون نص الإطار' : 'Frame Text Color'}
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
                          {isRtl ? `درجة كفاءة المسح الضوئي: ${healthScore}%` : `Scannability Health Score: ${healthScore}%`}
                        </h4>
                        <p className="text-xs text-neutral-400">
                          {grade === 'A'
                            ? isRtl
                              ? 'سرعة مسح واستجابة مثالية لكاميرات الهواتف في جميع ظروف الإضاءة.'
                              : 'Optimal camera sensor capture speed under all lighting conditions.'
                            : grade === 'B'
                            ? isRtl
                              ? 'سرعة مسح مقبولة مع تباين أو نسبة ألوان طفيفة دون المثالية.'
                              : 'Acceptable capture speed with minor sub-optimal contrast or ratio.'
                            : isRtl
                            ? 'خطر مرتفع في بطء أو فشل المسح بكاميرا الهاتف. يرجى تعديل المراحل المحددة.'
                            : 'High risk of camera scan degradation. Correct highlighted stages.'}
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
                              {isRtl ? `المرحلة ${stage.id}: ${stage.name}` : `Stage ${stage.id}: ${stage.name}`}
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
                              {isRtl
                                ? stage.status === 'passed'
                                  ? 'ناجح'
                                  : stage.status === 'warning'
                                  ? 'تحذير'
                                  : 'فشل'
                                : stage.status}
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
                        {isRtl ? 'توصيات وإجراءات مقترحة لتحسين المسح:' : 'Actionable Recommendations:'}
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
                  {isRtl ? 'المسح المباشر:' : 'Live Scannability:'}
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
                  {isRtl ? `الدرجة ${grade} (${healthScore}%)` : `Grade ${grade} (${healthScore}%)`}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setPreviewDarkBg(!previewDarkBg)}
                className="text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
              >
                {previewDarkBg
                  ? isRtl ? 'خلفية بيضاء' : 'White Canvas'
                  : isRtl ? 'خلفية داكنة' : 'Dark Backdrop'}
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
                    {isRtl ? 'الرابط المختصر المستهدف:' : 'Shortcode Target:'}
                  </span>
                  <span className="text-xs font-mono text-white truncate block">{redirectUrl}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                  title={isRtl ? 'نسخ الرابط الديناميكي' : 'Copy dynamic link'}
                >
                  {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="px-3 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Download className="w-3.5 h-3.5 text-rose-400" />
                  {isRtl ? 'تحميل متجه SVG' : 'Download Vector SVG'}
                </button>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={handleDownloadPng}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" />
                    {isRtl ? 'PNG للطباعة' : 'PNG Print'}
                  </button>
                  <select
                    value={pngResolution}
                    onChange={e => setPngResolution(Number(e.target.value))}
                    className="px-2 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs focus:outline-none"
                    title={isRtl ? 'دقة صورة PNG' : 'PNG Resolution'}
                  >
                    <option value={2}>2x</option>
                    <option value={3}>3x</option>
                    <option value={5}>5x</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
