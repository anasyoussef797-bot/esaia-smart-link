/**
 * ESAIA - Custom 404 Not Found Page
 * Theme-aware, responsive, and provides immediate return pathways.
 */

import React from 'react';
import { Compass, Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface NotFoundPageProps {
  onNavigate?: (path: string) => void;
  requestedPath?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, requestedPath }) => {
  const handleHome = () => {
    if (onNavigate) {
      onNavigate('/admin');
    } else {
      window.location.href = '/admin';
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Visual Graphic */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-600 text-white shadow-md">
            404
          </span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#6d6156] leading-relaxed">
            The requested destination{' '}
            {requestedPath && (
              <code className="text-blue-400 bg-black/30 [data-theme=light]:bg-slate-200 px-1.5 py-0.5 rounded font-mono text-xs">
                {requestedPath}
              </code>
            )}{' '}
            does not exist, has been moved, or you may not have access permissions.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={handleHome}
          >
            Dashboard
          </Button>
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={handleBack}
          >
            Go Back
          </Button>
          {onNavigate && (
            <Button
              variant="ghost"
              leftIcon={<Search className="w-4 h-4" />}
              onClick={() => onNavigate('/admin/qr')}
            >
              Browse QRs
            </Button>
          )}
        </div>

        {/* Help footer */}
        <div className="pt-6 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-xs text-slate-500 [data-theme=beige]:text-[#8c7e73] flex items-center justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Need help finding a campaign? Contact your workspace administrator.</span>
        </div>
      </div>
    </div>
  );
};
