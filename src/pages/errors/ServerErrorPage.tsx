/**
 * ESAIA - Custom 500 Server Error Page
 */

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface ServerErrorPageProps {
  onNavigate?: (path: string) => void;
  error?: Error | null;
}

export const ServerErrorPage: React.FC<ServerErrorPageProps> = ({ onNavigate, error }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">
            500 • Internal Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
            Service Interruption
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#6d6156] leading-relaxed">
            An unexpected error occurred while processing this request. Our automated telemetry has logged the issue.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={() => window.location.reload()}
          >
            Retry Connection
          </Button>
          <Button
            variant="outline"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={() => (onNavigate ? onNavigate('/admin') : (window.location.href = '/admin'))}
          >
            Dashboard
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#1c2030] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] text-left text-xs font-mono text-rose-400 overflow-x-auto">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};
