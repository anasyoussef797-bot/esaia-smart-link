/**
 * ESAIA - High Speed Public QR Code Redirect Engine (/q/:code)
 * Handles physical phone scans, resolves target destinations, records scan analytics,
 * and executes seamless client-side and server-side redirection.
 */

import React, { useEffect, useState } from 'react';
import { qrService } from '../../services/firebase/qrService';
import { pageService } from '../../services/firebase/pageService';
import { QrCode } from '../../types/qr';
import { Loader2, ArrowRight, ExternalLink, AlertTriangle, Clock, RefreshCw } from 'lucide-react';

interface PublicQrRedirectProps {
  code: string;
  onNavigate?: (path: string) => void;
}

export const PublicQrRedirect: React.FC<PublicQrRedirectProps> = ({ code, onNavigate }) => {
  const [status, setStatus] = useState<'resolving' | 'redirecting' | 'paused' | 'expired' | 'not_found'>('resolving');
  const [resolvedUrl, setResolvedUrl] = useState<string>('');
  const [qrDetails, setQrDetails] = useState<QrCode | null>(null);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    let isMounted = true;
    const cleanCode = (code || '')
      .trim()
      .split('?')[0]
      .split('#')[0]
      .replace(/^\/+/, '')
      .replace(/^(q|go|r)\//, '')
      .replace(/\/+$/, '');

    const initiateBrowserRedirect = (target: string) => {
      if (!isMounted || !target) return;
      setResolvedUrl(target);
      setStatus('redirecting');

      // If internal SPA destination (/p/... or /admin/...), use SPA client routing to eliminate reload latency
      if (onNavigate && target.startsWith('/') && !target.startsWith('//')) {
        onNavigate(target);
        return;
      }

      // External destination: execute immediate browser redirect
      try {
        window.location.replace(target);
      } catch {
        window.location.href = target;
      }
    };

    async function resolveDestination() {
      try {
        // 1. Check QR service for registered QR fleet in Firestore & memory
        const qr = await qrService.getQrByPublicCode(cleanCode);

        if (qr && isMounted) {
          setQrDetails(qr);

          // Check if paused
          if (qr.status === 'paused') {
            setStatus('paused');
            return;
          }

          // Check expiration
          if (qr.expiresAt && new Date(qr.expiresAt).getTime() < Date.now()) {
            setStatus('expired');
            return;
          }

          // Format target destination URL accurately
          let target = (qr.destinationUrl || '/').trim();
          if (qr.destinationType === 'page' || qr.targetEntityId) {
            if (!target.startsWith('http') && !target.startsWith('/p/')) {
              target = `/p/${target}`;
            }
          } else if (qr.destinationType === 'whatsapp') {
            if (!target.startsWith('http')) {
              target = `https://wa.me/${target.replace(/[^0-9]/g, '')}`;
            }
          } else if (qr.destinationType === 'phone') {
            if (!target.startsWith('tel:')) {
              target = `tel:${target}`;
            }
          } else if (qr.destinationType === 'email') {
            if (!target.startsWith('mailto:')) {
              target = `mailto:${target}`;
            }
          }

          // Record scan event asynchronously (non-blocking)
          try {
            qrService.recordScan(qr.id);
          } catch (e) {
            // Ignore telemetry recording failure
          }

          initiateBrowserRedirect(target);
          return;
        }

        // 2. Direct Landing Page slug check (e.g. food_sakura_omakase-fv3c)
        const matchedPage = await pageService.getPageBySlug(cleanCode);
        if (matchedPage && isMounted) {
          const target = `/p/${matchedPage.slug}`;
          initiateBrowserRedirect(target);
          return;
        }

        // 3. Check server-side resolver endpoint
        try {
          const res = await fetch(`/api/qr/resolve/${encodeURIComponent(cleanCode)}`);
          if (res.ok) {
            const data = await res.json();
            if (data?.destinationUrl && isMounted) {
              initiateBrowserRedirect(data.destinationUrl);
              return;
            }
          }
        } catch (e) {
          // Ignore server fetch error
        }

        // 4. Check local storage fallback for any page matching
        try {
          const pagesRaw = localStorage.getItem('esaia_pages_store');
          if (pagesRaw) {
            const pages = JSON.parse(pagesRaw);
            const found = pages.find((p: any) => 
              p.slug?.toLowerCase() === cleanCode.toLowerCase() || 
              p.id === cleanCode || 
              p.qrCodeId === cleanCode
            );
            if (found && isMounted) {
              const target = `/p/${found.slug}`;
              initiateBrowserRedirect(target);
              return;
            }
          }
        } catch (e) {
          // Ignore parse error
        }

        if (isMounted) {
          setStatus('not_found');
        }
      } catch (err) {
        console.error('Error resolving QR code:', err);
        if (isMounted) {
          setStatus('not_found');
        }
      }
    }

    resolveDestination();

    return () => {
      isMounted = false;
    };
  }, [code, onNavigate]);

  // Countdown timer for user feedback
  useEffect(() => {
    if (status === 'redirecting' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [status, countdown]);

  // Paused Campaign State
  if (status === 'paused') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 rounded-2xl bg-[#12141f] border border-[#24293d] text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold">الحملة متوقفة مؤقتاً</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            تم إيقاف هذا الرمز مؤقتاً من قِبل إدارة الحملة ({qrDetails?.clientName || 'المؤسسة'}). يرجى إعادة المحاولة لاحقاً.
          </p>
          <div className="pt-2 text-[11px] font-mono text-slate-500">
            رمز التحقق: /q/{code}
          </div>
        </div>
      </div>
    );
  }

  // Expired Campaign State
  if (status === 'expired') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 rounded-2xl bg-[#12141f] border border-[#24293d] text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
            <Clock className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold">انتهت صلاحية الرمز</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            انتهت الفترة الترويجية المحددة لهذا الرمز التفاعلي.
          </p>
          <div className="pt-2 text-[11px] font-mono text-slate-500">
            الرمز: /q/{code}
          </div>
        </div>
      </div>
    );
  }

  // Not Found State
  if (status === 'not_found') {
    return (
      <div className="min-h-screen bg-[#090a0f] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-6 rounded-2xl bg-[#12141f] border border-[#24293d] text-center space-y-4 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <RefreshCw className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold">جاري البحث عن الوجهة</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            لم نتمكن من العثور على رابط مباشر للرمز (<code className="text-blue-400 font-mono">/q/{code}</code>). يرجى التأكد من نشر الصفحة وربط الرمز بها في لوحة التحكم.
          </p>
          <div className="pt-3 flex flex-col gap-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
            >
              إعادة المحاولة
            </button>
            <a
              href="/"
              className="w-full py-2.5 px-4 rounded-xl bg-[#1c2030] hover:bg-[#252b42] text-slate-300 text-xs font-semibold transition"
            >
              العودة للرئيسية
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Resolving or Redirecting State
  return (
    <div className="min-h-screen bg-[#090a0f] text-white flex flex-col items-center justify-center p-4">
      {/* HTML Meta fallback refresh */}
      {resolvedUrl && (
        <meta httpEquiv="refresh" content={`0;url=${resolvedUrl}`} />
      )}

      <div className="max-w-sm w-full p-6 rounded-2xl bg-[#12141f] border border-[#24293d] text-center space-y-4 shadow-2xl animate-fade-in">
        <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-rose-500/20 blur-lg animate-pulse" />
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-400 flex items-center justify-center shadow-lg">
            <Loader2 className="w-7 h-7 text-white animate-spin" />
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-white">
            {status === 'redirecting' ? 'جاري توجيهك الآن...' : 'جاري قراءة رمز QR...'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {qrDetails?.name ? `الوجهة: ${qrDetails.name}` : 'لحظات وننقلك إلى الصفحة المطلوبة'}
          </p>
        </div>

        {resolvedUrl && (
          <div className="pt-3">
            <a
              href={resolvedUrl}
              onClick={(e) => {
                if (onNavigate && resolvedUrl.startsWith('/') && !resolvedUrl.startsWith('//')) {
                  e.preventDefault();
                  onNavigate(resolvedUrl);
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50"
            >
              <span>اضغط هنا إذا لم يتم التحويل تلقائياً</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <div className="text-[11px] font-mono text-slate-500 pt-1">
          ESAIA High-Speed Dynamic Redirect
        </div>
      </div>
    </div>
  );
};
