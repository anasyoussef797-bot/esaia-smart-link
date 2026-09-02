/**
 * ESAIA - Reusable Status Badge Component
 */

import React, { ReactNode } from 'react';
import clsx from 'clsx';

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'brand' | 'purple';

export interface BadgeProps {
  id?: string;
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  id,
  variant = 'neutral',
  size = 'sm',
  children,
  className
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full whitespace-nowrap';

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5'
  };

  const variantStyles = {
    neutral: 'bg-slate-800/80 [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eee9df] text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#4a423d] border border-slate-700/60 [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]',
    success: 'bg-emerald-950/60 [data-theme=light]:bg-emerald-50 [data-theme=beige]:bg-emerald-50 text-emerald-400 [data-theme=light]:text-emerald-700 [data-theme=beige]:text-emerald-800 border border-emerald-800/50 [data-theme=light]:border-emerald-200 [data-theme=beige]:border-emerald-200',
    warning: 'bg-amber-950/60 [data-theme=light]:bg-amber-50 [data-theme=beige]:bg-amber-50 text-amber-400 [data-theme=light]:text-amber-800 [data-theme=beige]:text-amber-900 border border-amber-800/50 [data-theme=light]:border-amber-200 [data-theme=beige]:border-amber-200',
    danger: 'bg-rose-950/60 [data-theme=light]:bg-rose-50 [data-theme=beige]:bg-rose-50 text-rose-400 [data-theme=light]:text-rose-700 [data-theme=beige]:text-rose-800 border border-rose-800/50 [data-theme=light]:border-rose-200 [data-theme=beige]:border-rose-200',
    brand: 'bg-blue-950/60 [data-theme=light]:bg-blue-50 [data-theme=beige]:bg-blue-50 text-blue-400 [data-theme=light]:text-blue-700 [data-theme=beige]:text-blue-800 border border-blue-800/50 [data-theme=light]:border-blue-200 [data-theme=beige]:border-blue-200',
    purple: 'bg-indigo-950/60 [data-theme=light]:bg-indigo-50 [data-theme=beige]:bg-indigo-50 text-indigo-400 [data-theme=light]:text-indigo-700 [data-theme=beige]:text-indigo-800 border border-indigo-800/50 [data-theme=light]:border-indigo-200 [data-theme=beige]:border-indigo-200'
  };

  return (
    <span id={id} className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
      {children}
    </span>
  );
};
