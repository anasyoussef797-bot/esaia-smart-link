/**
 * ESAIA - Accessible Tabs Component
 */

import React, { ReactNode } from 'react';
import clsx from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  id?: string;
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pills' | 'underline';
}

export const Tabs: React.FC<TabsProps> = ({
  id,
  tabs,
  activeTab,
  onChange,
  variant = 'pills'
}) => {
  return (
    <div
      id={id}
      className={clsx(
        'flex items-center gap-1.5 overflow-x-auto pb-1',
        variant === 'underline' && 'border-b border-[#24293d] gap-6'
      )}
    >
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        if (variant === 'underline') {
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={clsx(
                'flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap',
                isActive
                  ? 'border-blue-500 text-blue-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              )}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#1a1e2d] text-slate-300">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap',
              isActive
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#1a1e2d]'
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={clsx(
                  'text-[10px] px-1.5 py-0.2 rounded-full',
                  isActive ? 'bg-blue-700 text-white' : 'bg-[#141722] text-slate-400'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
