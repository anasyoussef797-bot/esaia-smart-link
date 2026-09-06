/**
 * ESAIA - System Notification & Toast Alert Context
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message?: string;
  description?: string;
  duration?: number;
}

export type ShowToastFn = {
  (options: ToastOptions): void;
  (type: ToastType, title: string, description?: string, duration?: number): void;
  (message: string, type?: ToastType, duration?: number): void;
};

interface NotificationContextValue {
  showToast: ShowToastFn;
  removeToast: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast: ShowToastFn = useCallback(
    (...args: any[]) => {
      const id = Math.random().toString(36).substring(2, 9);
      let toastType: ToastType = 'info';
      let title = '';
      let description: string | undefined;
      let duration = 4000;

      if (typeof args[0] === 'object' && args[0] !== null) {
        const opt = args[0] as ToastOptions;
        toastType = opt.type || 'info';
        title = opt.title || opt.message || '';
        description = opt.description || (opt.title && opt.message && opt.title !== opt.message ? opt.message : undefined);
        if (typeof opt.duration === 'number') duration = opt.duration;
      } else if (typeof args[0] === 'string') {
        const first = args[0];
        if (['success', 'error', 'info', 'warning'].includes(first)) {
          toastType = first as ToastType;
          title = args[1] || '';
          description = args[2];
          if (typeof args[3] === 'number') duration = args[3];
        } else {
          // first is message/title
          title = first;
          if (typeof args[1] === 'string') {
            if (['success', 'error', 'info', 'warning'].includes(args[1])) {
              toastType = args[1] as ToastType;
            } else {
              description = args[1];
            }
          }
          if (typeof args[2] === 'string' && ['success', 'error', 'info', 'warning'].includes(args[2])) {
            toastType = args[2] as ToastType;
          }
          if (typeof args[2] === 'number') duration = args[2];
          if (typeof args[3] === 'number') duration = args[3];
        }
      }

      const newToast: ToastMessage = { id, type: toastType, title, description, duration };
      setToasts(prev => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <NotificationContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Render Viewport */}
      <div
        id="toast-container"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl border border-[#24293d] bg-[#141722] text-[#f8fafc] shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold tracking-tight">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>

            <button
              id={`close-toast-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
