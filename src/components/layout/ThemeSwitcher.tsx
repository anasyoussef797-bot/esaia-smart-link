/**
 * ESAIA - Multi-Theme Switcher Component
 * Supports:
 * - Dark Slate (الوضع الداكن)
 * - Light Clean (الوضع الفاتح)
 * - Warm Desert Beige (الوضع البيج الصحراوي الفعال)
 * - Olive Tactical (الوضع الزيتي)
 * - Charcoal Gray (الوضع الرمادي)
 * - Custom Theme Studio (استوديو الألوان وتخصيص الوضع)
 */

import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Sparkles, Trees, Sliders, Palette, Check, Settings2 } from 'lucide-react';
import { useTheme, AppTheme, THEME_OPTIONS } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { ThemeStudioModal } from './ThemeStudioModal';
import clsx from 'clsx';

export const ThemeSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, setTheme, openCustomModal } = useTheme();
  const { t } = useLanguage();
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

  const getThemeIcon = (themeId: AppTheme) => {
    switch (themeId) {
      case 'dark':
        return <Moon className="w-4 h-4 text-blue-400" />;
      case 'light':
        return <Sun className="w-4 h-4 text-amber-500" />;
      case 'beige':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'olive':
        return <Trees className="w-4 h-4 text-lime-500" />;
      case 'gray':
        return <Sliders className="w-4 h-4 text-sky-400" />;
      case 'custom':
        return <Palette className="w-4 h-4 text-purple-400" />;
    }
  };

  const getThemeLocalizedName = (themeId: AppTheme) => {
    switch (themeId) {
      case 'dark':
        return t.themes.dark;
      case 'light':
        return t.themes.light;
      case 'beige':
        return t.themes.beige;
      case 'olive':
        return t.themes.olive || 'الوضع الزيتي';
      case 'gray':
        return t.themes.gray || 'الوضع الرمادي';
      case 'custom':
        return t.themes.custom || 'استوديو الألوان المخصص';
    }
  };

  return (
    <>
      <div className={clsx('relative inline-block', className)} ref={containerRef}>
        <button
          id="theme-switcher-trigger"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#1a1e2d] border border-transparent hover:border-[#24293d] transition-all cursor-pointer"
          aria-label={t.themes.selectTheme}
          title={t.themes.selectTheme}
        >
          {getThemeIcon(theme)}
        </button>

        {isOpen && (
          <div
            id="theme-switcher-dropdown"
            className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-64 rounded-xl border border-[#24293d] bg-[#141722] text-[#f8fafc] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="px-2 py-1.5 border-b border-[#1c2030] flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-blue-400" />
                {t.themes.selectTheme}
              </span>
            </div>

            <div className="space-y-1 pt-1.5">
              {THEME_OPTIONS.map(opt => {
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    id={`theme-opt-${opt.id}`}
                    onClick={() => {
                      setTheme(opt.id);
                      setIsOpen(false);
                      if (opt.id === 'custom') {
                        openCustomModal();
                      }
                    }}
                    className={clsx(
                      'w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-left rtl:text-right cursor-pointer',
                      isSelected
                        ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-[#1a1e2d] border border-transparent'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 shadow-xs"
                        style={{
                          backgroundColor: opt.previewBg,
                          borderColor: opt.previewBorder
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: opt.previewAccent }}
                        />
                      </div>
                      <span className="truncate">{getThemeLocalizedName(opt.id)}</span>
                    </div>

                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Direct Button to open Custom Theme Studio */}
            <div className="pt-2 mt-2 border-t border-[#1c2030]">
              <button
                id="open-theme-studio-btn"
                onClick={() => {
                  setIsOpen(false);
                  openCustomModal();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-blue-300 border border-blue-500/30 transition-all cursor-pointer"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>{t.themes.customizeTheme}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Global Theme Studio Modal */}
      <ThemeStudioModal />
    </>
  );
};
