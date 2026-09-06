/**
 * ESAIA - Offline Connectivity Indicator
 * Displays a non-intrusive, theme-adaptive floating banner when network drops,
 * reassuring the user that cached data and offline PWA capabilities are active.
 */

import React, { useState } from 'react';
import { WifiOff, RefreshCw, X } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useLanguage } from '../../context/LanguageContext';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [isDismissed, setIsDismissed] = useState(false);
  const { isRTL } = useLanguage();

  if (isOnline || isDismissed) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 ${isRTL ? 'left-5' : 'right-5'} z-50 max-w-sm w-[calc(100vw-2.5rem)] animate-in slide-in-from-bottom-5 duration-300`}
    >
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#161a26] [data-theme=light]:bg-slate-900 [data-theme=beige]:bg-[#362f2d] border border-amber-500/40 text-white shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <WifiOff className="w-4 h-4 animate-pulse" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white flex items-center gap-1.5 leading-tight">
              <span>Offline Mode Active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </p>
            <p className="text-[11px] text-slate-300 [data-theme=light]:text-slate-300 [data-theme=beige]:text-[#dfd7cb] truncate leading-tight mt-0.5">
              Cached PWA data in use. Changes will sync once reconnected.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => window.location.reload()}
            title="Check connection"
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            title="Dismiss notice"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
