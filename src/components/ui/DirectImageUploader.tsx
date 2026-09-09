import React, { useState, useRef } from 'react';
import { Upload, Trash2, RefreshCw, CheckCircle2, Image as ImageIcon, Link as LinkIcon, Loader2 } from 'lucide-react';
import { uploadDeviceImage } from '../../utils/imageHelper';

export interface DirectImageUploaderProps {
  label: string;
  sublabel?: string;
  value?: string;
  onChange: (url: string) => void;
  onClear?: () => void;
  aspectRatio?: '1:1' | '16:9' | 'banner' | 'auto';
  orgId?: string;
  className?: string;
  accept?: string;
}

export const DirectImageUploader: React.FC<DirectImageUploaderProps> = ({
  label,
  sublabel,
  value,
  onChange,
  onClear,
  aspectRatio = 'auto',
  orgId,
  className = '',
  accept = 'image/*'
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsUploading(true);
    try {
      const url = await uploadDeviceImage(file, { orgId });
      onChange(url);
    } catch (err) {
      console.error('Error uploading file from device:', err);
    } finally {
      setIsUploading(false);
    }
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
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case '1:1':
        return 'w-24 h-24 rounded-2xl';
      case '16:9':
        return 'w-full h-36 rounded-xl';
      case 'banner':
        return 'w-full h-28 rounded-xl';
      default:
        return 'w-28 h-28 rounded-xl';
    }
  };

  return (
    <div className={`space-y-2 p-3.5 rounded-2xl bg-[#0e1017] border border-[#24293d] ${className}`}>
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-slate-200 block">{label}</label>
          {sublabel && <p className="text-[10px] text-slate-400 mt-0.5">{sublabel}</p>}
        </div>
        {value && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>تم اختيار الصورة</span>
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileSelect(file);
            e.target.value = ''; // reset to allow picking same file again
          }
        }}
      />

      {/* Main Upload / Preview Area */}
      {value ? (
        /* Image Preview Box with Device Change Buttons */
        <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl bg-[#090a0f] border border-[#24293d]">
          <div className={`${getAspectClass()} overflow-hidden bg-slate-900 border border-slate-700 shrink-0 relative group shadow-md`}>
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-wrap gap-2 justify-center sm:justify-start w-full">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )}
              <span>استبدال صورة من جهازك</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onChange('');
                onClear?.();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition-all active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>حذف</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone from Device */
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group cursor-pointer p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center gap-2 ${
            isDragging
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-[#24293d] hover:border-blue-500/60 bg-[#090a0f] hover:bg-[#121520]'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>

          <div>
            <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition-colors">
              {isUploading ? 'جاري رفع الصورة من جهازك...' : 'اضغط لاختيار صورة مباشرة من جهازك'}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              أو اسحب وأفلت الملف هنا (JPG, PNG, WEBP, GIF)
            </span>
          </div>
        </div>
      )}

      {/* Subtle URL fallback toggle if ever needed */}
      <div className="pt-1">
        {!showUrlFallback ? (
          <button
            type="button"
            onClick={() => setShowUrlFallback(true)}
            className="text-[10px] text-slate-500 hover:text-slate-400 inline-flex items-center gap-1 transition-colors"
          >
            <LinkIcon className="w-2.5 h-2.5" />
            <span>أو لصق رابط خارجي كبديل اختياري</span>
          </button>
        ) : (
          <div className="space-y-1 p-2 rounded-xl bg-[#090a0f] border border-[#24293d]/60">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400">رابط الصورة الخارجي (اختياري)</span>
              <button
                type="button"
                onClick={() => setShowUrlFallback(false)}
                className="text-[10px] text-slate-500 hover:text-slate-300"
              >
                إغلاق
              </button>
            </div>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-[#0e1017] border border-[#24293d] text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};
