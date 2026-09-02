/**
 * ESAIA - Reusable Accessible Input Component
 */

import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, helperText, errorMessage, leftIcon, rightIcon, className, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#3d3733] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 rtl:left-auto rtl:right-3 text-slate-400 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={clsx(
              'w-full rounded-lg bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-white border text-sm text-slate-100 [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] placeholder-slate-500 [data-theme=light]:placeholder-slate-400 [data-theme=beige]:placeholder-[#a89d94] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon ? 'pl-9 rtl:pl-3.5 rtl:pr-9' : 'pl-3.5',
              rightIcon ? 'pr-9 rtl:pr-3.5 rtl:pl-9' : 'pr-3.5',
              'py-2',
              errorMessage ? 'border-rose-500/80 focus:ring-rose-500' : 'border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] hover:border-[#333a54] [data-theme=light]:hover:border-slate-400 [data-theme=beige]:hover:border-[#cec3b1]',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 rtl:right-auto rtl:left-3 text-slate-400 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {errorMessage ? (
          <p className="text-xs text-rose-400 mt-1">{errorMessage}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
