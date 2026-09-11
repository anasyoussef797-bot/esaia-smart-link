/**
 * ESAIA - Enterprise Brand Asset Uploader Component
 * Supports Drag-and-Drop and Manual Click File Upload for SVG/PNG/JPG/ICO assets
 * with live dimension detection, multi-background checkerboard preview, and URL fallback.
 */

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Link2, Check, AlertCircle, Eye } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useLanguage } from '../../../context/LanguageContext';

interface BrandAssetUploaderProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  accept?: string;
  recommendedSize?: string;
  isFavicon?: boolean;
}

export const BrandAssetUploader: React.FC<BrandAssetUploaderProps> = ({
  label,
  description,
  value,
  onChange,
  accept = 'image/png,image/svg+xml,image/jpeg,image/webp,image/x-icon',
  recommendedSize = '512 x 512 px (Max 2MB)',
  isFavicon = false
}) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [activeMode, setActiveMode] = useState<'upload' | 'url'>('upload');
  const [previewBg, setPreviewBg] = useState<'dark' | 'light' | 'beige'>('dark');
  const [fileDetails, setFileDetails] = useState<{ name?: string; size?: string; dimensions?: string } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setUploadError(null);

    // Max 2MB
    if (file.size > 2 * 1024 * 1024) {
      setUploadError(t.assetUploader?.fileTooLarge || 'File exceeds 2MB limit. Please upload an optimized asset.');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      onChange(result);

      // Detect image dimensions
      const img = new Image();
      img.onload = () => {
        setFileDetails({
          name: file.name,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          dimensions: `${img.naturalWidth} × ${img.naturalHeight} px`
        });
      };
      img.src = result;
    };
    reader.onerror = () => {
      setUploadError(t.assetUploader?.readError || 'Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    onChange('');
    setFileDetails(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-semibold text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d]">
            {label}
          </label>
          <p className="text-[11px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
            {description}
          </p>
        </div>

        {/* Upload Mode Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-[10px]">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2 py-0.5 rounded-md font-medium transition cursor-pointer ${
              activeMode === 'upload'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
            }`}
          >
            {t.assetUploader?.uploadFile || 'Upload File'}
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2 py-0.5 rounded-md font-medium transition cursor-pointer ${
              activeMode === 'url'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
            }`}
          >
            {t.assetUploader?.directUrl || 'Direct URL'}
          </button>
        </div>
      </div>

      {activeMode === 'url' ? (
        <div className="space-y-2">
          <Input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="https://cdn.yourbrand.com/assets/logo.svg"
            leftIcon={<Link2 className="w-3.5 h-3.5 text-slate-400" />}
          />
          <p className="text-[10px] text-slate-500">
            {t.assetUploader?.recommended || 'Recommended:'} {recommendedSize}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          {!value ? (
            /* Drag and Drop Zone */
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
                isDragging
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] hover:border-blue-500/60 bg-[#0e1017]/60 [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#f4efe6]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-600/10 [data-theme=light]:bg-blue-50 border border-blue-500/20 flex items-center justify-center text-blue-400 [data-theme=light]:text-blue-600">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d]">
                  {t.assetUploader?.clickOrDrag || 'Click to upload or drag & drop'}
                </p>
                <p className="text-[10px] text-slate-500 [data-theme=light]:text-slate-400 mt-0.5">
                  {t.assetUploader?.dropzoneHint || 'Supports SVG, PNG, WebP, JPG, or ICO'} • {recommendedSize}
                </p>
              </div>
            </div>
          ) : (
            /* Asset Preview & Controls */
            <div className="p-3 rounded-xl border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#fbf9f4] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Preview Frame with toggleable background */}
                <div
                  className={`w-14 h-14 rounded-lg border flex items-center justify-center p-1.5 shrink-0 overflow-hidden relative ${
                    previewBg === 'dark'
                      ? 'bg-[#090b10] border-[#1c2030]'
                      : previewBg === 'light'
                      ? 'bg-slate-100 border-slate-200'
                      : 'bg-[#f4efe6] border-[#dfd7cb]'
                  }`}
                >
                  <img
                    src={value}
                    alt={label}
                    className={`max-w-full max-h-full object-contain ${isFavicon ? 'w-6 h-6' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] truncate">
                      {fileDetails?.name || (isFavicon ? 'Favicon Asset' : 'Brand Logo')}
                    </span>
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] font-mono">
                    {fileDetails?.dimensions ? `${fileDetails.dimensions} • ` : ''}
                    {fileDetails?.size || 'Custom asset active'}
                  </p>

                  {/* Preview Background Toggles */}
                  <div className="flex items-center gap-1 mt-1 text-[9px]">
                    <span className="text-slate-500">{t.assetUploader?.previewBg || 'Preview on:'}</span>
                    <button
                      type="button"
                      onClick={() => setPreviewBg('dark')}
                      className={`px-1 rounded cursor-pointer ${
                        previewBg === 'dark' ? 'bg-slate-800 text-white font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {t.assetUploader?.darkBg || 'Dark'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewBg('light')}
                      className={`px-1 rounded cursor-pointer ${
                        previewBg === 'light' ? 'bg-slate-300 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {t.assetUploader?.lightBg || 'Light'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewBg('beige')}
                      className={`px-1 rounded cursor-pointer ${
                        previewBg === 'beige' ? 'bg-[#dfd7cb] text-[#231f1d] font-bold' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {t.assetUploader?.beigeBg || 'Beige'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t.actions.edit || 'Change'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  onClick={handleClear}
                >
                  <X className="w-3.5 h-3.5 mr-1 rtl:mr-0 rtl:ml-1" />
                  {t.assetUploader?.remove || t.actions.delete || 'Remove'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}
    </div>
  );
};
