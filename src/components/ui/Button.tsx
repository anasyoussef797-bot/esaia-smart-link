/**
 * ESAIA - Reusable Accessible Button Component
 */

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090a0f] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5'
  };

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-500 shadow-md shadow-blue-900/20 border border-blue-500/30',
    secondary: 'bg-[#1a1e2d] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eee9df] hover:bg-[#24293d] [data-theme=light]:hover:bg-slate-200 [data-theme=beige]:hover:bg-[#e4ded4] text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] focus:ring-slate-400 border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]',
    outline: 'bg-transparent hover:bg-[#1a1e2d] [data-theme=light]:hover:bg-slate-100 [data-theme=beige]:hover:bg-[#eee9df] text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#4a423d] hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] focus:ring-slate-400',
    ghost: 'bg-transparent hover:bg-[#1a1e2d] [data-theme=light]:hover:bg-slate-100 [data-theme=beige]:hover:bg-[#eee9df] text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#685f58] hover:text-slate-200 [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d] focus:ring-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500 shadow-md shadow-rose-900/20 border border-rose-500/30',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500 shadow-md shadow-emerald-900/20 border border-emerald-500/30'
  };

  return (
    <button
      id={id}
      disabled={disabled || isLoading}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      {children}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
