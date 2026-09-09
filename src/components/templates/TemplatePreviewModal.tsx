import React, { useState } from 'react';
import { X, Smartphone, Tablet, Monitor, Sparkles, ExternalLink, ArrowRight, ArrowLeft, Play, Video } from 'lucide-react';
import { TemplateItem } from '../../data/templatesData';
import { useLanguage } from '../../context/LanguageContext';
import { getYouTubeEmbedUrl } from '../../utils/youtube';

interface TemplatePreviewModalProps {
  template: TemplateItem | null;
  onClose: () => void;
  onUseTemplate: (template: TemplateItem) => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  onClose,
  onUseTemplate
}) => {
  const { isRTL } = useLanguage();
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet'>('mobile');

  if (!template) return null;

  const p = template.preview;
  const theme = template.themeConfig;
  const blocks = template.blocks;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[900px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100 truncate">{template.title}</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {isRTL ? template.categoryNameAr : template.categoryName}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">{template.subtitle}</p>
            </div>
          </div>

          {/* Device Switcher */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isRTL ? 'هاتف' : 'Mobile'}</span>
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                deviceMode === 'tablet'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>{isRTL ? 'تابلت' : 'Tablet'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onUseTemplate(template)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>{isRTL ? 'استخدم هذا النموذج' : 'Use this template'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Device Stage Simulator */}
        <div className="flex-1 bg-slate-950 p-4 sm:p-8 flex justify-center items-center overflow-y-auto">
          <div
            className={`transition-all duration-300 rounded-[40px] border-[10px] border-slate-800/90 shadow-2xl overflow-hidden flex flex-col bg-slate-900 ${
              deviceMode === 'mobile' ? 'w-[360px] h-[650px]' : 'w-[520px] h-[650px]'
            }`}
            style={{
              backgroundColor: theme.palette.background,
              color: theme.palette.textPrimary
            }}
          >
            {/* Top Phone Notch */}
            <div className="h-6 w-full bg-slate-950/80 shrink-0 flex items-center justify-between px-6 select-none">
              <span className="text-[10px] font-bold text-slate-400">9:41</span>
              <div className="w-16 h-3 bg-black rounded-full" />
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2 bg-slate-400 rounded-2xs" />
                <div className="w-3 h-2 bg-slate-400 rounded-xs" />
              </div>
            </div>

            {/* Scrollable Page Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Cover or Header */}
              {p.heroCoverUrl && (
                <div className="w-full h-40 rounded-2xl overflow-hidden relative shadow-md">
                  <img
                    src={p.heroCoverUrl}
                    alt={template.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                        {template.categoryName}
                      </span>
                      <h2 className="text-lg font-black text-white mt-1 leading-tight">{p.heroTitle}</h2>
                    </div>
                  </div>
                </div>
              )}

              {/* Avatar for Link in Bio */}
              {p.avatarUrl && (
                <div className="flex flex-col items-center text-center pt-2">
                  <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 to-indigo-500 shadow-xl mb-2">
                    <img
                      src={p.avatarUrl}
                      alt={p.heroTitle}
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h2 className="text-base font-bold" style={{ color: theme.palette.textPrimary }}>
                    {p.heroTitle}
                  </h2>
                  {p.heroSubtitle && (
                    <p className="text-xs mt-0.5 opacity-80" style={{ color: theme.palette.textSecondary }}>
                      {p.heroSubtitle}
                    </p>
                  )}
                </div>
              )}

              {/* Realistic Rendered Blocks */}
              <div className="space-y-3 pt-2">
                {blocks.map((block) => {
                  if (block.type === 'button') {
                    const isOutline = block.content.variant === 'outline';
                    return (
                      <div
                        key={block.id}
                        className="py-3 px-4 rounded-xl text-center font-bold text-xs shadow-xs transition-transform transform active:scale-98 cursor-pointer select-none"
                        style={{
                          backgroundColor: isOutline ? 'transparent' : theme.palette.primaryAction,
                          color: isOutline ? theme.palette.primaryAction : theme.palette.primaryActionText,
                          border: isOutline ? `1.5px solid ${theme.palette.primaryAction}` : undefined
                        }}
                      >
                        {block.content.label}
                      </div>
                    );
                  }

                  if (block.type === 'paragraph') {
                    return (
                      <div
                        key={block.id}
                        className="p-3 rounded-xl border text-xs leading-relaxed"
                        style={{
                          backgroundColor: theme.palette.cardBackground,
                          borderColor: theme.palette.border,
                          color: theme.palette.textSecondary
                        }}
                      >
                        {block.content.text}
                      </div>
                    );
                  }

                  if (block.type === 'vcard_header') {
                    return (
                      <div
                        key={block.id}
                        className="p-4 rounded-2xl border flex items-center gap-3.5"
                        style={{
                          backgroundColor: theme.palette.cardBackground,
                          borderColor: theme.palette.border
                        }}
                      >
                        {block.content.avatarUrl && (
                          <img
                            src={block.content.avatarUrl}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold" style={{ color: theme.palette.textPrimary }}>
                            {block.content.fullName}
                          </h4>
                          <p className="text-[11px]" style={{ color: theme.palette.textSecondary }}>
                            {block.content.jobTitle}
                          </p>
                          <p className="text-[10px] opacity-70" style={{ color: theme.palette.textSecondary }}>
                            {block.content.company}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  if (block.type === 'whatsapp_button') {
                    return (
                      <div
                        key={block.id}
                        className="py-3 px-4 rounded-xl text-center font-bold text-xs bg-emerald-600 text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>💬</span>
                        <span>{block.content.buttonText}</span>
                      </div>
                    );
                  }

                  if (block.type === 'menu_item') {
                    return (
                      <div
                        key={block.id}
                        className="p-3 rounded-xl border flex items-center gap-3"
                        style={{
                          backgroundColor: theme.palette.cardBackground,
                          borderColor: theme.palette.border
                        }}
                      >
                        {block.content.imageUrl && (
                          <img
                            src={block.content.imageUrl}
                            alt=""
                            className="w-14 h-14 rounded-lg object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-bold" style={{ color: theme.palette.textPrimary }}>
                              {block.content.name}
                            </h4>
                            <span className="text-xs font-bold" style={{ color: theme.palette.primaryAction }}>
                              {block.content.currency} {block.content.price}
                            </span>
                          </div>
                          <p className="text-[10px] mt-0.5 line-clamp-2" style={{ color: theme.palette.textSecondary }}>
                            {block.content.description}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  if (block.type === 'video_embed') {
                    const embedUrl = getYouTubeEmbedUrl(block.content.url);
                    const isShorts = block.content.aspectRatio === '9:16';
                    return (
                      <div
                        key={block.id}
                        className="p-3 rounded-2xl border text-center space-y-2 shadow-sm"
                        style={{
                          backgroundColor: theme.palette.cardBackground,
                          borderColor: theme.palette.border
                        }}
                      >
                        {block.content.title && (
                          <div className="flex items-center justify-center gap-1.5 text-xs font-bold" style={{ color: theme.palette.textPrimary }}>
                            <Play className="w-3 h-3 text-red-500 fill-current" />
                            <span>{block.content.title}</span>
                          </div>
                        )}
                        <div
                          className="w-full rounded-xl overflow-hidden bg-black shadow-inner relative mx-auto"
                          style={{
                            aspectRatio: isShorts ? '9/16' : '16/9',
                            maxWidth: isShorts ? '220px' : '100%'
                          }}
                        >
                          {embedUrl ? (
                            <iframe
                              src={embedUrl}
                              title={block.content.title || 'YouTube Video'}
                              className="w-full h-full border-0 absolute inset-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <div className="w-full h-full min-h-[120px] flex items-center justify-center text-slate-500 text-xs">
                              <Video className="w-5 h-5 text-red-500 mr-1.5" />
                              <span>YouTube Video</span>
                            </div>
                          )}
                        </div>
                        {block.content.caption && (
                          <p className="text-[11px] line-clamp-2 opacity-80" style={{ color: theme.palette.textSecondary }}>
                            {block.content.caption}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Subtle ESAIA Footer */}
              <div className="text-center pt-6 pb-4">
                <span className="text-[10px] font-medium tracking-wide uppercase opacity-50" style={{ color: theme.palette.textSecondary }}>
                  Powered by ESAIA Platform
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="text-xs text-slate-400">
            {isRTL
              ? 'يمكنك تعديل وتخصيص كافة البلوكات والنصوص والصور والألوان بعد اختيار النموذج.'
              : 'All blocks, colors, typography, and images can be fully customized in the Page Builder.'}
          </div>

          <button
            onClick={() => onUseTemplate(template)}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <span>{isRTL ? 'ابدأ التخصيص الآن' : 'Start Customizing Now'}</span>
            {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
