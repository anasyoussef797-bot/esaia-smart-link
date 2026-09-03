/**
 * ESAIA - Data Sovereignty & Zero-Lock-In Export Engine
 * Route: /admin/settings/export
 * Guarantees 100% data portability with complete JSON backups and granular CSV dataset exports.
 */

import React, { useState } from 'react';
import {
  Download,
  Database,
  FileJson,
  FileSpreadsheet,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  QrCode,
  Users,
  Layers,
  BarChart3,
  Lock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { exportService } from '../../services/firebase/exportService';

export const DataExportPage: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const { currentOrg } = useAuth();
  const { t, isRTL } = useLanguage();
  const { showToast } = useNotification();

  const [isExportingFull, setIsExportingFull] = useState(false);
  const [activeExportingId, setActiveExportingId] = useState<string | null>(null);

  // 1-Click Full JSON Tenant Backup
  const handleFullBackup = async () => {
    setIsExportingFull(true);
    try {
      const json = await exportService.exportTenantData(currentOrg?.id || 'org_esaia_main');
      const filename = `esaia_complete_tenant_backup_${currentOrg?.id || 'main'}_${new Date().toISOString().split('T')[0]}.json`;
      exportService.downloadFile(json, filename, 'application/json');
      showToast('success', 'Full Tenant Backup Complete', `${filename} generated.`);
    } catch (err: any) {
      showToast('error', 'Export Failed', err.message);
    } finally {
      setIsExportingFull(false);
    }
  };

  // Granular CSV Exports
  const handleExportCsv = async (dataset: 'qrs' | 'clients' | 'pages' | 'analytics' | 'audit') => {
    setActiveExportingId(`${dataset}_csv`);
    try {
      const orgId = currentOrg?.id || 'org_esaia_main';
      let csv = '';
      let filename = '';

      if (dataset === 'qrs') {
        csv = await exportService.exportQrCodesCsv(orgId);
        filename = `esaia_qr_fleet_${orgId}.csv`;
      } else if (dataset === 'clients') {
        csv = await exportService.exportClientsCsv(orgId);
        filename = `esaia_clients_crm_${orgId}.csv`;
      } else if (dataset === 'pages') {
        csv = await exportService.exportPagesCsv(orgId);
        filename = `esaia_landing_pages_${orgId}.csv`;
      } else if (dataset === 'analytics') {
        csv = await exportService.exportAnalyticsCsv(orgId);
        filename = `esaia_telemetry_rollups_${orgId}.csv`;
      } else if (dataset === 'audit') {
        csv = await exportService.exportAuditLogsCsv(orgId);
        filename = `esaia_security_audit_${orgId}.csv`;
      }

      exportService.downloadFile(csv, filename, 'text/csv');
      showToast('success', 'Dataset Exported', `${filename} generated.`);
    } catch (err: any) {
      showToast('error', 'Export Failed', err.message);
    } finally {
      setActiveExportingId(null);
    }
  };

  const exportDatasets = [
    {
      id: 'qrs',
      title: 'Dynamic QR Fleet Dataset',
      description: 'All dynamic QR codes, campaign statuses, scan counters, destination URLs, and short link slugs.',
      icon: <QrCode className="w-5 h-5 text-blue-400" />,
      recordType: 'QRs'
    },
    {
      id: 'clients',
      title: 'Client CRM Directory',
      description: 'Enterprise accounts, contact personas, email addresses, phone contacts, industries, and active assets.',
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      recordType: 'Clients'
    },
    {
      id: 'pages',
      title: 'Mobile Landing Pages & Menus',
      description: 'Published landing pages, contactless menus, digital business cards, block layouts, and view metrics.',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      recordType: 'Pages'
    },
    {
      id: 'analytics',
      title: 'Scan Telemetry & Rollups',
      description: '30-day pre-aggregated daily scan metrics, unique visitors, device platforms, and geographic hotspots.',
      icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
      recordType: 'Telemetry'
    },
    {
      id: 'audit',
      title: 'Immutable Security Audit Trail',
      description: 'Tamper-proof event logs, actor email signatures, timestamps, IP hashes, and administrative events.',
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      recordType: 'Audit Events'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {onNavigate && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4 rtl:rotate-180" />}
                onClick={() => onNavigate('/admin/settings')}
              >
                Settings
              </Button>
            )}
            <Badge variant="brand">Zero-Lock-In Guarantee</Badge>
          </div>
          <h1 className="text-xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
            Data Sovereignty & Enterprise Backup Center
          </h1>
          <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#8c7e73] mt-1">
            Export 100% of your organization's records into open, standardized formats anytime.
          </p>
        </div>
      </div>

      {/* 1-Click Master Tenant Backup Banner */}
      <Card padding="lg" className="border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-[#0e1017] to-indigo-950/20 [data-theme=light]:from-blue-50 [data-theme=light]:via-white [data-theme=light]:to-indigo-50 [data-theme=beige]:from-[#fbf9f4] [data-theme=beige]:via-[#f6f3eb] [data-theme=beige]:to-[#eae4d9]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
              <Database className="w-4 h-4" />
              <span>Comprehensive Organization Snapshot (JSON)</span>
            </div>
            <h2 className="text-lg font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              1-Click Complete Database Portability Package
            </h2>
            <p className="text-xs text-slate-300 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#5e544c] leading-relaxed">
              Downloads a unified, self-contained JSON archive containing your client directories, dynamic QR codes,
              landing pages, content blocks, daily telemetry rollups, and tamper-proof security audit trails.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                No proprietary database wrappers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                RFC 8259 JSON compliant
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                SHA-256 Checksum Included
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              isLoading={isExportingFull}
              leftIcon={<Download className="w-4 h-4" />}
              onClick={handleFullBackup}
            >
              Export Full Database (.json)
            </Button>
          </div>
        </div>
      </Card>

      {/* Granular CSV Datasets Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
            Granular Structured CSV Datasets
          </h3>
          <span className="text-xs text-slate-400 [data-theme=light]:text-slate-500">
            Ready for Microsoft Excel, Google Sheets, or BI pipelines
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportDatasets.map(ds => {
            const isLoading = activeExportingId === `${ds.id}_csv`;
            return (
              <Card key={ds.id} padding="md" className="flex flex-col justify-between hover:border-slate-700 [data-theme=light]:hover:border-slate-300 transition-colors">
                <div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] shrink-0">
                      {ds.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                        {ds.title}
                      </h4>
                      <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#8c7e73] mt-1 leading-relaxed">
                        {ds.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 [data-theme=light]:text-slate-400">
                    Standard RFC 4180 CSV
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    isLoading={isLoading}
                    leftIcon={<FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />}
                    onClick={() => handleExportCsv(ds.id as any)}
                  >
                    Export CSV
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Enterprise Data Sovereignty Pledge */}
      <Card padding="md">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] uppercase tracking-wider">
              ESAIA Zero-Vendor-Lock-In Guarantee
            </h4>
            <p className="text-xs text-slate-300 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#5e544c] leading-relaxed">
              Your organization maintains 100% intellectual property and data sovereignty over all registered assets,
              dynamic QR bindings, scan logs, client relationships, and digital menus. Data can be transferred to external
              databases or third-party platforms at any moment without penalty or export throttling.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
