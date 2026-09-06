import React from 'react';
import { Eye, Sparkles, Plus, Bookmark, BookmarkCheck } from 'lucide-react';
import { TemplateItem } from '../../data/templatesData';
import { useLanguage } from '../../context/LanguageContext';

interface TemplatePhoneMockupProps {
  template: TemplateItem;
  onPreview: (template: TemplateItem) => void;
  onUseTemplate: (template: TemplateItem) => void;
  isSaved?: boolean;
  onToggleSave?: (templateId: string) => void;
}

export const TemplatePhoneMockup: React.FC<TemplatePhoneMockupProps> = ({
  template,
  onPreview,
  onUseTemplate,
  isSaved = false,
  onToggleSave
}) => {
  const { isRTL } = useLanguage();
  const p = template.preview;

  return (
    <div className="group relative flex flex-col bg-slate-900/60 dark:bg-slate-900/80 rounded-2xl border border-slate-800/80 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
      {/* Top Meta Bar */}
      <div className="p-3.5 flex items-center justify-between gap-2 border-b border-slate-800/60 bg-slate-950/40">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[11px] font-semibold text-slate-400 truncate">
            {isRTL ? template.categoryNameAr : template.categoryName}
          </span>
          {template.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20 shrink-0">
              {isRTL ? template.badgeAr || template.badge : template.badge}
            </span>
          )}
        </div>

        {onToggleSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(template.id);
            }}
            title={isSaved ? 'Remove from My Templates' : 'Save to My Templates'}
            className={`p-1.5 rounded-lg transition-colors ${
              isSaved
                ? 'text-amber-400 bg-amber-400/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Realistic Mobile Device Frame */}
      <div className="p-4 flex justify-center items-center bg-gradient-to-b from-slate-950/20 to-slate-950/60">
        <div
          className="relative w-[210px] h-[370px] rounded-[32px] border-[5px] border-slate-800/90 shadow-2xl overflow-hidden flex flex-col transition-transform duration-300 group-hover:scale-[1.02]"
          style={{
            backgroundColor: p.headerBg.startsWith('linear') ? undefined : p.headerBg,
            background: p.headerBg.startsWith('linear') ? p.headerBg : undefined
          }}
        >
          {/* Dynamic Island / Speaker Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800/80 mr-1.5" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-950/50" />
          </div>

          {/* Device Mockup Content */}
          <div className="flex-1 flex flex-col overflow-hidden text-center pt-8 px-3 pb-3 relative select-none">
            {/* Cover Image if Landing Page */}
            {p.heroCoverUrl && (
              <div className="absolute top-0 left-0 right-0 h-28 overflow-hidden z-0 opacity-70">
                <img
                  src={p.heroCoverUrl}
                  alt={template.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, transparent 20%, ${p.headerBg} 100%)`
                  }}
                />
              </div>
            )}

            {/* Avatar for Link in Bio */}
            {p.avatarUrl && (
              <div className="relative z-10 flex justify-center mb-2 mt-2">
                <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-indigo-500 shadow-md">
                  <img
                    src={p.avatarUrl}
                    alt={p.heroTitle}
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}

            {/* Hero Text */}
            <div className="relative z-10 my-auto">
              <h3
                className="text-xs font-black tracking-tight leading-tight line-clamp-1 mb-1"
                style={{ color: p.textColor }}
              >
                {p.heroTitle}
              </h3>
              {p.heroSubtitle && (
                <p
                  className="text-[10px] font-medium line-clamp-2 opacity-80 leading-relaxed px-1"
                  style={{ color: p.textColor }}
                >
                  {p.heroSubtitle}
                </p>
              )}
            </div>

            {/* Rendered Mockup Buttons */}
            <div className="relative z-10 flex flex-col gap-1.5 mt-auto w-full">
              {p.buttons.slice(0, 4).map((btn, idx) => {
                const isOutline = btn.style === 'outline';
                const isGlass = btn.style === 'glass';
                return (
                  <div
                    key={idx}
                    className="h-7 px-2.5 rounded-lg flex items-center justify-center text-[10px] font-bold shadow-xs truncate"
                    style={{
                      backgroundColor: isOutline
                        ? 'transparent'
                        : isGlass
                        ? 'rgba(255,255,255,0.7)'
                        : btn.color || p.accentColor,
                      color: isOutline
                        ? btn.color || p.accentColor
                        : isGlass
                        ? '#1f2937'
                        : '#ffffff',
                      border: isOutline ? `1px solid ${btn.color || p.accentColor}` : undefined
                    }}
                  >
                    <span className="truncate">{isRTL ? btn.labelAr : btn.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hover Overlay with Quick Actions */}
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2.5 p-4 z-30">
            <button
              onClick={() => onUseTemplate(template)}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition-all transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>{isRTL ? 'استخدم هذا النموذج' : 'Use this template'}</span>
            </button>

            <button
              onClick={() => onPreview(template)}
              className="w-full py-2 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold text-xs border border-slate-700/60 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isRTL ? 'معاينة حية' : 'Live Preview'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Title & Action Bar */}
      <div className="p-3.5 border-t border-slate-800/60 flex items-center justify-between gap-2 mt-auto bg-slate-950/30">
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-slate-200 truncate">{template.title}</h4>
          <p className="text-[11px] text-slate-400 truncate mt-0.5">{template.subtitle}</p>
        </div>

        <button
          onClick={() => onUseTemplate(template)}
          className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all shrink-0 active:scale-90"
          title={isRTL ? 'تخصيص هذا النموذج' : 'Customize template'}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
