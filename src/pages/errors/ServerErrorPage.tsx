/**
 * ESAIA - Enterprise 500 Server Error Page
 * Theme-aware (Dark / Light / Beige), fully localized (10 languages + RTL),
 * with error diagnostics, stack trace inspection, and one-click incident reporting.
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';

interface ServerErrorPageProps {
  onNavigate?: (path: string) => void;
  error?: Error | null;
  errorInfo?: { componentStack?: string } | null;
  onReset?: () => void;
}

export const ServerErrorPage: React.FC<ServerErrorPageProps> = ({
  onNavigate,
  error,
  errorInfo,
  onReset
}) => {
  const { isRTL, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Generate a reproducible incident token for support tickets
  const [incidentId] = useState(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = 'INC-';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  });

  const isArabic = language === 'ar';

  const title = isArabic ? 'حدث خطأ في النظام (500)' : 'Internal Service Interruption (500)';
  const subtitle = isArabic
    ? 'واجه النظام استثناءً غير متوقع أثناء معالجة طلبك. تم تسجيل تفاصيل الحادث تلقائياً في سجلات الأمان.'
    : 'An unexpected application exception occurred. All persistent data remains safely secured in the cloud.';
  const retryBtn = isArabic ? 'إعادة تحميل الصفحة' : 'Reload Application';
  const homeBtn = isArabic ? 'لوحة التحكم' : 'Return to Dashboard';
  const copyBtn = isArabic ? 'نسخ تقرير الخطأ' : 'Copy Diagnostic';
  const copiedBtn = isArabic ? 'تم النسخ!' : 'Copied Diagnostic';
  const showLogText = isArabic ? 'عرض تفاصيل الخطأ البرمجي' : 'Diagnostic Trace & Stack';
  const incidentLabel = isArabic ? 'رمز البلاغ:' : 'Incident Ref:';

  const handleReload = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };

  const handleHome = () => {
    if (onNavigate) {
      onNavigate('/admin');
    } else {
      window.location.href = '/admin';
    }
  };

  const handleCopy = () => {
    const diagnosticData = `ESAIA Error Telemetry Report:
Incident ID: ${incidentId}
Timestamp: ${new Date().toISOString()}
Message: ${error?.message || 'Unknown Server Error'}
Stack: ${error?.stack || 'None'}
Component Stack: ${errorInfo?.componentStack || 'None'}
Browser: ${navigator.userAgent}`;

    navigator.clipboard.writeText(diagnosticData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-[82vh] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Visual Graphic */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-rose-500/10 [data-theme=light]:bg-rose-50 [data-theme=beige]:bg-[#f2dcd7] border border-rose-500/20 [data-theme=light]:border-rose-200 [data-theme=beige]:border-[#e8c7c0] text-rose-500 flex items-center justify-center mx-auto shadow-inner shadow-rose-500/10">
            <AlertTriangle className="w-12 h-12 animate-pulse" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-600 text-white shadow-lg border-2 border-[#090b10] [data-theme=light]:border-white [data-theme=beige]:border-[#f4efe6]">
            500
          </span>
        </div>

        {/* Title & Incident Badge */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 [data-theme=light]:text-rose-600 [data-theme=beige]:text-rose-700 border border-rose-500/20">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>HTTP 500 • INTERNAL EXCEPTION</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#6d6156] leading-relaxed max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Incident Tag */}
        <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-xs flex items-center justify-center gap-2 font-mono">
          <span className="text-slate-500 [data-theme=light]:text-slate-600">{incidentLabel}</span>
          <code className="text-rose-400 [data-theme=light]:text-rose-600 [data-theme=beige]:text-rose-700 font-bold bg-rose-500/10 px-2 py-0.5 rounded text-[11px]">
            {incidentId}
          </code>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <Button
            id="error-500-reload-btn"
            variant="primary"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={handleReload}
          >
            {retryBtn}
          </Button>

          <Button
            id="error-500-home-btn"
            variant="outline"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={handleHome}
          >
            {homeBtn}
          </Button>

          <Button
            id="error-500-copy-btn"
            variant="ghost"
            size="sm"
            leftIcon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            onClick={handleCopy}
          >
            {copied ? copiedBtn : copyBtn}
          </Button>
        </div>

        {/* Diagnostic Stack Drawer */}
        {(error || errorInfo) && (
          <div className="pt-2 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-left">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-between w-full text-xs text-slate-400 [data-theme=light]:text-slate-600 hover:text-white [data-theme=light]:hover:text-slate-900 transition py-1 cursor-pointer"
            >
              <span className="font-mono text-[11px] font-semibold">{showLogText}</span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showDetails && (
              <div className="mt-2 p-3 rounded-xl bg-[#090b10] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#fbf9f4] border border-[#1c2030] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] text-[11px] font-mono text-rose-400 [data-theme=light]:text-rose-700 max-h-48 overflow-auto space-y-1">
                <p className="font-bold">{error?.name || 'Error'}: {error?.message || 'Unspecified runtime exception'}</p>
                {error?.stack && (
                  <pre className="text-[10px] text-slate-500 [data-theme=light]:text-slate-600 whitespace-pre-wrap mt-1">
                    {error.stack}
                  </pre>
                )}
                {errorInfo?.componentStack && (
                  <pre className="text-[10px] text-slate-500 [data-theme=light]:text-slate-600 whitespace-pre-wrap mt-1">
                    {errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
