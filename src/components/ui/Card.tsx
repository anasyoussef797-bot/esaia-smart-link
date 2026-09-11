/**
 * ESAIA - Reusable Card Component
 * Responsive layout container with smooth transitions, subtle lift on hover,
 * and adaptive padding across Mobile, Tablet, and Desktop.
 */

import React, { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  id,
  children,
  className,
  padding = 'md',
  hoverable = false,
  ...props
}) => {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-5 sm:p-7 md:p-8'
  };

  return (
    <div
      id={id}
      className={clsx(
        'rounded-2xl border border-[#24293d] bg-[#141722] text-[#f8fafc] shadow-sm transition-all duration-200',
        hoverable && 'hover:border-slate-700/80 hover:shadow-md hover:-translate-y-0.5',
        paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  id?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  headingLevel?: 'h2' | 'h3' | 'h4';
}> = ({ id, title, description, action, className, headingLevel = 'h2' }) => {
  const HeadingTag = headingLevel;
  return (
    <div id={id} className={clsx('flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4', className)}>
      <div className="min-w-0">
        <HeadingTag className="text-base font-semibold text-white tracking-tight leading-tight">{title}</HeadingTag>
        {description && <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>}
      </div>
      {action && <div className="shrink-0 self-start sm:self-auto">{action}</div>}
    </div>
  );
};
