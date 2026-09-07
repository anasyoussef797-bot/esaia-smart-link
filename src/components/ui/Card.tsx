/**
 * ESAIA - Reusable Card Component
 */

import React, { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  id,
  children,
  className,
  padding = 'md',
  ...props
}) => {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      id={id}
      className={clsx(
        'rounded-xl border border-[#24293d] bg-[#141722] text-[#f8fafc] shadow-sm transition-colors duration-150',
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
}> = ({ id, title, description, action, className }) => (
  <div id={id} className={clsx('flex items-start justify-between gap-4 mb-4', className)}>
    <div>
      <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
      {description && <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
