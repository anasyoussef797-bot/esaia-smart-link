/**
 * YouTube URL Parser and Embed Utilities
 */

export function extractYouTubeId(url?: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // If already an 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Common YouTube URL regex patterns
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i,
    /^[a-zA-Z0-9_-]{11}$/
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export const getYouTubeVideoId = extractYouTubeId;

export function isYouTubeUrl(url?: string): boolean {
  return Boolean(extractYouTubeId(url));
}

export function getYouTubeEmbedUrl(url?: string, options: { autoplay?: boolean; mute?: boolean } = {}): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1'
  });

  if (options.autoplay) {
    params.set('autoplay', '1');
  }
  if (options.mute) {
    params.set('mute', '1');
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function getYouTubeThumbnailUrl(url?: string, quality: 'max' | 'hq' | 'mq' = 'hq'): string | null {
  const id = extractYouTubeId(url);
  if (!id) return null;

  switch (quality) {
    case 'max':
      return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    case 'mq':
      return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    case 'hq':
    default:
      return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }
}
