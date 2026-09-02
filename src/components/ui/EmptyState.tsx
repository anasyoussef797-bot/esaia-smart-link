/**
 * ESAIA - Empty State Presentation Component
 */

import React, { ReactNode } from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  id?: string;
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  id,
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon
}) => {
  return (
    <div
      id={id || 'empty-state-card'}
      className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-[#24293d] bg-[#0e1017]/40 max-w-xl mx-auto my-6"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#1a1e2d] border border-[#24293d] flex items-center justify-center text-slate-400 mb-4 shadow-inner">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 mt-1.5 max-w-md leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button id="empty-state-action-btn" onClick={onAction} leftIcon={actionIcon}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
