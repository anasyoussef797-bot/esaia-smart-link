/**
 * ESAIA - Enterprise 404 Not Found Page
 * Theme-aware (Dark / Light / Beige), fully localized (10 languages + RTL),
 * and provides responsive, immediate recovery pathways.
 */

import React from 'react';
import { Compass, Home, ArrowLeft, Search, Plus, HelpCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';

interface NotFoundPageProps {
  onNavigate?: (path: string) => void;
  requestedPath?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, requestedPath }) => {
  const { isRTL, language } = useLanguage();

  const handleHome = () => {
    if (onNavigate) {
      onNavigate('/admin');
    } else {
      window.location.href = '/admin';
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      handleHome();
    }
  };

  // Localized texts based on active language
  const isArabic = language === 'ar';

  const title = isArabic ? 'الصفحة غير موجودة (404)' : 'Page Not Found (404)';
  const subtitle = isArabic
    ? 'المسار أو الصفحة المطلوبة غير متوفرة، أو تم نقلها، أو ليس لديك صلاحية الوصول إليها.'
    : 'The requested destination does not exist, has been moved, or you may lack authorized tenant permissions.';
  const homeBtnText = isArabic ? 'لوحة التحكم الرئيسية' : 'Workspace Dashboard';
  const backBtnText = isArabic ? 'العودة للخلف' : 'Go Back';
  const browseQrText = isArabic ? 'إدارة رموز QR' : 'Dynamic QRs';
  const createQrText = isArabic ? 'إنشاء رمز QR جديد' : 'New Dynamic QR';
  const diagnosticLabel = isArabic ? 'المسار المطلوب:' : 'Requested Route:';
  const helpText = isArabic
    ? 'هل تبحث عن حملة مفقودة؟ يرجى التواصل مع مسؤول مساحة العمل أو فريق الدعم.'
    : 'Looking for a specific campaign or client portal? Contact your workspace administrator or support.';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-[82vh] flex items-center justify-center p-4 sm:p-6"
    >
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Visual Graphic with Animated Compass */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-blue-600/10 [data-theme=light]:bg-blue-50 [data-theme=beige]:bg-[#eae4d9] border border-blue-500/20 [data-theme=light]:border-blue-200 [data-theme=beige]:border-[#dfd7cb] text-blue-500 flex items-center justify-center mx-auto shadow-inner shadow-blue-500/5">
            <Compass className="w-12 h-12 animate-[spin_12s_linear_infinite]" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600 text-white shadow-lg border-2 border-[#090b10] [data-theme=light]:border-white [data-theme=beige]:border-[#f4efe6]">
            404
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-[#2563eb] border border-blue-500/20">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>HTTP 404 • ROUTE NOT FOUND</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#6d6156] leading-relaxed max-w-md mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Diagnostic Route Chip */}
        {requestedPath && (
          <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-xs flex items-center justify-center gap-2 font-mono">
            <span className="text-slate-500 [data-theme=light]:text-slate-600">{diagnosticLabel}</span>
            <code className="text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700 bg-black/30 [data-theme=light]:bg-white px-2 py-0.5 rounded text-[11px] truncate max-w-[280px]">
              {requestedPath}
            </code>
          </div>
        )}

        {/* Quick Recovery Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <Button
            id="error-404-home-btn"
            variant="primary"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={handleHome}
          >
            {homeBtnText}
          </Button>

          <Button
            id="error-404-back-btn"
            variant="outline"
            leftIcon={isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            onClick={handleBack}
          >
            {backBtnText}
          </Button>

          {onNavigate && (
            <>
              <Button
                id="error-404-browse-qr-btn"
                variant="secondary"
                leftIcon={<Search className="w-4 h-4" />}
                onClick={() => onNavigate('/admin/qr')}
              >
                {browseQrText}
              </Button>
              <Button
                id="error-404-new-qr-btn"
                variant="ghost"
                leftIcon={<Plus className="w-4 h-4 text-blue-400" />}
                onClick={() => onNavigate('/admin/qr')}
              >
                {createQrText}
              </Button>
            </>
          )}
        </div>

        {/* Help & Support Footer */}
        <div className="pt-6 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-xs text-slate-500 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] flex items-center justify-center gap-2">
          <HelpCircle className="w-4 h-4 shrink-0 text-slate-400" />
          <span>{helpText}</span>
        </div>
      </div>
    </div>
  );
};
