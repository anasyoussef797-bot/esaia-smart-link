/**
 * ESAIA - Media & Digital Asset Type Definitions
 */

export interface MediaAsset {
  id: string;
  orgId: string;
  clientId: string;
  fileName: string;
  storagePath: string;
  downloadUrl: string;
  fileSizeBytes: number;
  mimeType: string;
  folder?: string;
  uploadedBy: string;
  createdAt: string;
}
