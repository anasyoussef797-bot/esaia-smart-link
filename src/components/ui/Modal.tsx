/**
 * ESAIA - Accessible Modal Dialog Component
 */

import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

export interface ModalProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  id,
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div
      id={id || 'modal-backdrop'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="modal-container"
        className={clsx(
          'w-full rounded-2xl border border-[#24293d] bg-[#141722] text-[#f8fafc] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]',
          sizeClasses[size]
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#1c2030]">
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight">{title}</h2>
            {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
          </div>
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1a1e2d] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>

        {/* Footer */}
        {footer && <div className="p-4 bg-[#0e1017] border-t border-[#1c2030] flex justify-end gap-2.5">{footer}</div>}
      </div>
    </div>
  );
};
