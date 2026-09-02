/**
 * ESAIA - Reusable Skeleton Loader Component
 */

import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  id,
  variant = 'rect',
  className,
  ...props
}) => {
  return (
    <div
      id={id}
      className={clsx(
        'animate-pulse bg-[#1c2030] rounded-lg',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 rounded-sm w-full',
        className
      )}
      {...props}
    />
  );
};
