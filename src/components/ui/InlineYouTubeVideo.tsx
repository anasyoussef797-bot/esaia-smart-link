import React, { useState } from 'react';
import { Play, Video } from 'lucide-react';
import { extractYouTubeId, getYouTubeEmbedUrl, getYouTubeThumbnailUrl } from '../../utils/youtube';

export interface InlineYouTubeVideoProps {
  url?: string;
  title?: string;
  caption?: string;
  aspectRatio?: '16:9' | '9:16';
  cardBg?: string;
  borderColor?: string;
  textPrimary?: string;
  textSecondary?: string;
  primaryAction?: string;
  className?: string;
  autoPlayOnClick?: boolean;
}

export const InlineYouTubeVideo: React.FC<InlineYouTubeVideoProps> = ({
  url,
  title,
  caption,
  aspectRatio = '16:9',
  cardBg = 'rgba(255, 255, 255, 0.05)',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  textPrimary = '#ffffff',
  textSecondary = '#94a3b8',
  primaryAction = '#ef4444',
  className = '',
  autoPlayOnClick = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = extractYouTubeId(url);
  const isShorts = aspectRatio === '9:16';
  const embedUrl = videoId ? getYouTubeEmbedUrl(url, { autoplay: true }) : null;
  const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(url, 'hq') : null;

  if (!videoId || !embedUrl) {
    return (
      <div
        className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${className}`}
        style={{ backgroundColor: cardBg, borderColor }}
      >
        {title && (
          <div className="text-xs font-bold truncate" style={{ color: textPrimary }}>
            {title}
          </div>
        )}
        <div
          className="w-full rounded-xl overflow-hidden bg-black/60 border flex flex-col items-center justify-center p-6 text-center mx-auto"
          style={{
            aspectRatio: isShorts ? '9/16' : '16/9',
            maxWidth: isShorts ? '260px' : '100%',
            borderColor
          }}
        >
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
            <Video className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-300">فيديو يوتيوب</span>
          <span className="text-[10px] text-slate-400 mt-1">يرجى إضافة رابط فيديو صالح من المحرر</span>
        </div>
        {caption && (
          <p className="text-[11px] opacity-80" style={{ color: textSecondary }}>
            {caption}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`p-3 sm:p-4 rounded-2xl border text-center space-y-2.5 transition-all shadow-sm ${className}`}
      style={{ backgroundColor: cardBg, borderColor }}
    >
      {/* Video Title Header */}
      {title && (
        <div className="flex items-center justify-center gap-1.5 px-2">
          <Play className="w-3.5 h-3.5 shrink-0" style={{ color: primaryAction }} />
          <span
            className="text-xs sm:text-sm font-bold truncate"
            style={{ color: textPrimary }}
          >
            {title}
          </span>
        </div>
      )}

      {/* Responsive In-Place Video Container */}
      <div
        className="w-full rounded-xl overflow-hidden bg-black shadow-inner relative mx-auto group"
        style={{
          aspectRatio: isShorts ? '9/16' : '16/9',
          maxWidth: isShorts ? '260px' : '100%'
        }}
      >
        {isPlaying ? (
          /* Live Iframe playing directly in the same spot */
          <iframe
            src={embedUrl}
            title={title || 'YouTube Video'}
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          /* High-def Thumbnail Poster with In-Place Play Trigger */
          <div
            onClick={() => {
              if (autoPlayOnClick) {
                setIsPlaying(true);
              }
            }}
            className="w-full h-full cursor-pointer relative flex items-center justify-center select-none"
            title="انقر لتشغيل الفيديو في نفس المكان"
          >
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt={title || 'YouTube Thumbnail'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            )}
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

            {/* Glowing Big Play Button in Center */}
            <div
              className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-2xl flex items-center justify-center z-10 transition-transform active:scale-90 group-hover:scale-110"
              style={{
                boxShadow: '0 0 25px rgba(239, 68, 68, 0.6)'
              }}
            >
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
            </div>

            {/* In-Place Play Hint */}
            <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-2 text-[10px] text-white/90 drop-shadow">
              <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full font-medium">
                تشغيل مباشر في الصفحة
              </span>
              {isShorts && (
                <span className="bg-red-600 px-1.5 py-0.5 rounded font-bold text-[9px]">
                  Shorts
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Video Caption / Description */}
      {caption && (
        <p className="text-[11px] sm:text-xs leading-relaxed opacity-85 px-1" style={{ color: textSecondary }}>
          {caption}
        </p>
      )}
    </div>
  );
};
