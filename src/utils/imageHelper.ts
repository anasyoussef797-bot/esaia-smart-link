/**
 * Image processing and direct device upload helper
 */
import { storageService } from '../services/firebase/storageService';

export interface ProcessImageOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  orgId?: string;
  folder?: string;
}

/**
 * Optimizes an image File selected from the user's device and uploads it.
 * Automatically falls back to compressed Base64 Data URL if storage bucket is unavailable.
 */
export async function uploadDeviceImage(
  file: File,
  options: ProcessImageOptions = {}
): Promise<string> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.86,
    orgId,
    folder = 'page-assets'
  } = options;

  // 1. Try Firebase Storage directly if orgId is available
  if (orgId) {
    try {
      const res = await storageService.uploadFile(orgId, file, folder);
      if (res.downloadUrl) {
        return res.downloadUrl;
      }
    } catch (storageErr) {
      console.warn('Firebase Storage upload notice, falling back to optimized inline asset:', storageErr);
    }
  }

  // 2. Client-side Canvas downsampling for fast and reliable storage
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read file from device'));

    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image data'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaled dimensions while preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to raw data url if 2D context fails
          resolve(e.target?.result as string);
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Keep PNG transparency if file is PNG, otherwise use JPEG for size efficiency
        const isPng = file.type === 'image/png';
        const mimeType = isPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, isPng ? undefined : quality);

        resolve(dataUrl);
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
