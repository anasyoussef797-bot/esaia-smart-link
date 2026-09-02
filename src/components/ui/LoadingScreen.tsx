/**
 * ESAIA - Accessible Loading Screen Component
 */

import React from 'react';
import { Loader2, QrCode } from 'lucide-react';

export const LoadingScreen: React.FC<{ message?: string }> = ({
  message = 'Loading ESAIA Workspace...'
}) => {
  return (
    <div
      id="app-loading-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090a0f] text-white"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 shadow-2xl">
          <QrCode className="w-8 h-8 text-blue-500 animate-pulse" />
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 border-t-transparent animate-spin" />
        </div>
        <div className="text-center mt-2">
          <p className="text-sm font-medium text-slate-200 tracking-wide">{message}</p>
          <p className="text-xs text-slate-500 mt-1">ESAIA Enterprise Engine</p>
        </div>
      </div>
    </div>
  );
};
