/**
 * ESAIA - Media & Asset Storage Service
 */

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

export const storageService = {
  async uploadFile(
    orgId: string,
    file: File,
    folder = 'general'
  ): Promise<{ downloadUrl: string; storagePath: string }> {
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `orgs/${orgId}/${folder}/${timestamp}_${cleanFileName}`;
    const storageRef = ref(storage, storagePath);

    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        orgId,
        uploadedAt: new Date().toISOString()
      }
    });

    const downloadUrl = await getDownloadURL(snapshot.ref);
    return { downloadUrl, storagePath };
  },

  async deleteFile(storagePath: string): Promise<void> {
    const storageRef = ref(storage, storagePath);
    return deleteObject(storageRef);
  }
};
