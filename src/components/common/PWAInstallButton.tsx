/**
 * ESAIA - In-App PWA Install Component
 * Prompts desktop & mobile users to install ESAIA as a standalone PWA,
 * with dedicated guided instructions for iOS Safari users.
 */

import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Button } from '../ui/Button';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Suppress if already running in standalone mode
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop standard install
  if (isInstallable) {
    return (
      <Button
        variant="secondary"
        size={compact ? 'sm' : 'md'}
        leftIcon={<Download className="w-3.5 h-3.5 text-blue-400" />}
        onClick={install}
        title="Install ESAIA Web App on your device"
      >
        {compact ? 'Install' : 'Install App'}
      </Button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <Button
          variant="secondary"
          size={compact ? 'sm' : 'md'}
          leftIcon={<Smartphone className="w-3.5 h-3.5 text-blue-400" />}
          onClick={() => setShowIOSGuide(true)}
          title="Install on iPhone / iPad"
        >
          {compact ? 'Install' : 'Install on iOS'}
        </Button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="max-w-sm w-full p-5 rounded-2xl bg-[#12151f] [data-theme=light]:bg-white [data-theme=beige]:bg-[#eae4d9] border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] shadow-2xl space-y-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                  Install on iPhone & iPad
                </h3>
                <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#6d6156]">
                  Install ESAIA directly to your Home Screen for instant offline access and native fullscreen performance.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#090b10] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fbf9f4] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-left text-xs space-y-2 text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#4d443e]">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
                  <span>Tap the <strong>Share</strong> icon in Safari <Share className="w-3.5 h-3.5 inline text-blue-400" /></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
                  <span>Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline text-blue-400" /></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
                  <span>Tap <strong>Add</strong> in the top-right corner</span>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => setShowIOSGuide(false)}
              >
                Got it
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop preview or already active
  return null;
};
