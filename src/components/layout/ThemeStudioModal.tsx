/**
 * ESAIA - Theme Studio Customizer Modal
 * Grants users complete creative freedom to customize their theme colors:
 * Canvas, Cards, Sidebar, Borders, Primary/Secondary Text, and Accent colors.
 * Includes curated quick presets and a live interactive preview canvas.
 */

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useTheme, CUSTOM_PRESETS, CustomThemeColors } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Palette, RotateCcw, Check, Sparkles, Sliders, Eye } from 'lucide-react';

export const ThemeStudioModal: React.FC = () => {
  const {
    isCustomModalOpen,
    closeCustomModal,
    customColors,
    setCustomColors,
    resetCustomColors,
    setTheme,
    applyPreset
  } = useTheme();
  const { t, isRTL } = useLanguage();

  const [localColors, setLocalColors] = useState<CustomThemeColors>(customColors);

  // Keep local state in sync when modal opens
  React.useEffect(() => {
    if (isCustomModalOpen) {
      setLocalColors(customColors);
    }
  }, [isCustomModalOpen, customColors]);

  const handleColorChange = (key: keyof CustomThemeColors, value: string) => {
    const updated = { ...localColors, [key]: value };
    setLocalColors(updated);
    // Live update DOM immediately for instant gratification
    setCustomColors({ [key]: value });
    setTheme('custom');
  };

  const handleApply = () => {
    setCustomColors(localColors);
    setTheme('custom');
    closeCustomModal();
  };

  const handleReset = () => {
    resetCustomColors();
    setTheme('custom');
    closeCustomModal();
  };

  const colorFields: Array<{
    key: keyof CustomThemeColors;
    label: string;
    description: string;
  }> = [
    {
      key: 'appBg',
      label: t.themes.canvasBackground,
      description: isRTL ? 'الخلفية الكلية للصفحة والمساحة العامة' : 'Master canvas and background viewport'
    },
    {
      key: 'cardBg',
      label: t.themes.cardBackground,
      description: isRTL ? 'أسطح البطاقات والمربعات والقوائم المنبثقة' : 'Surfaces of cards, tables and dialog panels'
    },
    {
      key: 'sidebarBg',
      label: t.themes.sidebarBackground,
      description: isRTL ? 'خلفية الشريط الجانبي والترويسة العلوية' : 'Navigation rail and header background'
    },
    {
      key: 'borderColor',
      label: t.themes.borderColor,
      description: isRTL ? 'خطوط الحدود، الفواصل وحواف العناصر' : 'Structural borders, lines and dividers'
    },
    {
      key: 'textColor',
      label: t.themes.textColor,
      description: isRTL ? 'عناوين النصوص الرئيسية وأرقام البيانات' : 'Primary headings, titles and active numbers'
    },
    {
      key: 'accentColor',
      label: t.themes.accentColor,
      description: isRTL ? 'أزرار الإجراء، الروابط والشارات النشطة' : 'Buttons, primary action pills and active highlights'
    }
  ];

  return (
    <Modal
      id="theme-studio-modal"
      isOpen={isCustomModalOpen}
      onClose={closeCustomModal}
      title={t.themes.themeStudio}
      description={t.themes.customizeTheme}
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full gap-3">
          <Button
            id="reset-theme-btn"
            variant="ghost"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleReset}
          >
            {t.themes.resetDefault}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              id="cancel-theme-btn"
              variant="outline"
              size="sm"
              onClick={closeCustomModal}
            >
              {t.actions.cancel}
            </Button>
            <Button
              id="save-theme-btn"
              variant="primary"
              size="sm"
              leftIcon={<Check className="w-3.5 h-3.5" />}
              onClick={handleApply}
            >
              {t.themes.saveChanges}
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Curated Presets Section */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t.themes.quickPresets}
            </h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {CUSTOM_PRESETS.map(preset => (
              <button
                key={preset.id}
                id={`preset-${preset.id}`}
                onClick={() => {
                  applyPreset(preset.id);
                  setLocalColors(preset.colors);
                }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#24293d] bg-[#0e1017] hover:border-blue-500/50 transition-all text-left rtl:text-right group cursor-pointer"
              >
                <div
                  className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: preset.colors.appBg }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: preset.colors.accentColor }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-200 group-hover:text-white truncate">
                    {isRTL ? preset.nameAr : preset.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Customization Inputs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Sliders className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t.themes.customizeTheme}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {colorFields.map(field => {
              const val = localColors[field.key];
              return (
                <div
                  key={field.key}
                  className="p-3 rounded-xl border border-[#24293d] bg-[#0e1017] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor={`color-input-${field.key}`}
                      className="text-xs font-medium text-slate-200 block truncate"
                    >
                      {field.label}
                    </label>
                    <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                      {field.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[11px] text-slate-300 uppercase px-1.5 py-0.5 rounded bg-[#141722] border border-[#24293d]">
                      {val}
                    </span>
                    <input
                      id={`color-input-${field.key}`}
                      type="color"
                      value={val}
                      onChange={e => handleColorChange(field.key, e.target.value)}
                      className="w-8 h-8 rounded-lg border border-[#24293d] cursor-pointer bg-transparent p-0 overflow-hidden"
                      title={field.label}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Interactive Preview Box */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {isRTL ? 'معاينة النمط في الوقت الحقيقي' : 'Live UI Component Preview'}
            </h4>
          </div>

          <div
            className="p-4 rounded-xl border transition-colors shadow-inner"
            style={{
              backgroundColor: localColors.appBg,
              borderColor: localColors.borderColor
            }}
          >
            <div
              className="p-3.5 rounded-lg border shadow-sm space-y-3"
              style={{
                backgroundColor: localColors.cardBg,
                borderColor: localColors.borderColor,
                color: localColors.textColor
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: localColors.accentColor }}
                  />
                  <span className="text-xs font-bold" style={{ color: localColors.textColor }}>
                    {isRTL ? 'بطاقة تجريبية للنظام' : 'Enterprise Metric Card'}
                  </span>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    backgroundColor: localColors.accentColor + '25',
                    color: localColors.accentColor,
                    borderColor: localColors.accentColor,
                    borderWidth: 1
                  }}
                >
                  {isRTL ? 'مفعل' : 'Active'}
                </span>
              </div>

              <p className="text-xs leading-relaxed opacity-80" style={{ color: localColors.textColor }}>
                {isRTL
                  ? 'هذا نموذج لمعاينة شكل البطاقات والنصوص والأزرار بالألوان التي قمت باختيارها.'
                  : 'This sample card instantly reflects your customized palette choices.'}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white shadow-xs"
                  style={{ backgroundColor: localColors.accentColor }}
                >
                  {isRTL ? 'زر أساسي' : 'Primary Action'}
                </button>
                <div
                  className="px-3 py-1.5 rounded-lg text-xs border"
                  style={{
                    borderColor: localColors.borderColor,
                    color: localColors.textColor
                  }}
                >
                  {isRTL ? 'عنصر فرعي' : 'Secondary Item'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
