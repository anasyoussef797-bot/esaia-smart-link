/**
 * ESAIA - Multi-Language Switcher Component
 * Supports 10 languages: English, Arabic (RTL), Chinese, French, German, Spanish, Italian, Turkish, Japanese, Russian.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguage } from '../../i18n/translations';
import clsx from 'clsx';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { language, setLanguage, supportedLanguages, currentLanguageInfo, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={clsx('relative inline-block', className)} ref={containerRef}>
      <button
        id="language-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-[#1a1e2d] border border-transparent hover:border-[#24293d] transition-all text-xs font-medium cursor-pointer"
        aria-label={`${currentLanguageInfo.nativeName} - ${t.header.language}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={t.header.language}
      >
        <span className="text-sm">{currentLanguageInfo.flag}</span>
        <span className="font-medium hidden sm:inline">{currentLanguageInfo.nativeName}</span>
        <span className="uppercase text-[10px] text-slate-400 font-mono sm:hidden">
          {currentLanguageInfo.code}
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div
          id="language-switcher-dropdown"
          className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-xl border border-[#24293d] bg-[#141722] text-[#f8fafc] shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-2.5 py-1.5 border-b border-[#1c2030] flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              {t.header.language}
            </span>
            <span className="text-[10px] font-mono text-slate-500">10 Languages</span>
          </div>

          <div className="space-y-0.5 pt-1.5">
            {supportedLanguages.map(lang => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-opt-${lang.code}`}
                  onClick={() => {
                    setLanguage(lang.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    'w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-left rtl:text-right cursor-pointer',
                    isSelected
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-[#1a1e2d] border border-transparent'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="leading-tight">{lang.nativeName}</span>
                      <span className="text-[10px] text-slate-400">{lang.name}</span>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
