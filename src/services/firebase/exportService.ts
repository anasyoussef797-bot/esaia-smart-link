/**
 * ESAIA - Zero-Lock-In Data Export Service
 * Enables complete tenant export to JSON & CSV to guarantee 100% data sovereignty.
 */

import { clientService } from './clientService';
import { qrService } from './qrService';
import { pageService } from './pageService';

export const exportService = {
  /**
   * Generates a complete JSON export package of the organization's entire database
   */
  async exportTenantData(orgId: string): Promise<string> {
    const [clients, qrCodes, pages] = await Promise.all([
      clientService.getClientsByOrg(orgId),
      qrService.getQrCodesByOrg(orgId),
      pageService.getPagesByOrg(orgId)
    ]);

    const payload = {
      platform: 'ESAIA SaaS',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      orgId,
      summary: {
        totalClients: clients.length,
        totalQrCodes: qrCodes.length,
        totalPages: pages.length
      },
      data: {
        clients,
        qrCodes,
        pages
      }
    };

    return JSON.stringify(payload, null, 2);
  },

  /**
   * Converts JSON array to CSV format
   */
  convertToCsv(items: Record<string, any>[]): string {
    if (!items.length) return '';
    const headers = Object.keys(items[0]);
    const rows = items.map(item =>
      headers
        .map(header => {
          const val = item[header];
          if (val === null || val === undefined) return '""';
          if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  },

  /**
   * Triggers a browser file download
   */
  downloadFile(content: string, filename: string, mimeType = 'application/json') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
