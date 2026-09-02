/**
 * ESAIA - Reusable Select Component
 */

import React, { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, helperText, errorMessage, options, className, disabled, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            id={selectId}
            ref={ref}
            disabled={disabled}
            className={clsx(
              'w-full appearance-none rounded-lg bg-[#0e1017] border text-sm text-slate-100 pl-3.5 pr-9 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
              errorMessage ? 'border-rose-500/80 focus:ring-rose-500' : 'border-[#24293d] hover:border-[#333a54]',
              className
            )}
            {...props}
          >
            {options.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-[#141722] text-slate-100">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 text-slate-400 pointer-events-none flex items-center">
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = 'Select';
