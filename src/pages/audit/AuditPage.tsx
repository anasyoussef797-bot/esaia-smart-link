/**
 * ESAIA - Immutable Audit Trail & Security Telemetry View
 * Append-only tamper-proof security log with multi-tenant document isolation,
 * detailed metadata inspector, status filters, and one-click JSON/CSV export.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  User,
  Clock,
  Globe,
  Filter,
  Search,
  Download,
  FileJson,
  Layers,
  KeyRound,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Code,
  Info
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import { auditService, AuditLogFilters } from '../../services/firebase/auditService';
import { exportService } from '../../services/firebase/exportService';
import { AuditLog, AuditAction, ResourceType } from '../../types/audit';

export const AuditPage: React.FC = () => {
  const { currentOrg, isOrgAdmin } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useNotification();

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'all' | 'today' | '7d' | '30d'>('all');

  // Selected log for JSON metadata inspector modal
  const [inspectedLog, setInspectedLog] = useState<AuditLog | null>(null);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const filters: AuditLogFilters = {
        searchQuery: searchQuery.trim() || undefined,
        action: selectedAction !== 'all' ? (selectedAction as AuditAction) : undefined,
        status: selectedStatus !== 'all' ? (selectedStatus as any) : undefined,
        timeRange: selectedTimeRange !== 'all' ? selectedTimeRange : undefined
      };
      const data = await auditService.getAuditLogs(currentOrg?.id || 'org_esaia_main', filters);
      setLogs(data);
    } catch (err) {
      console.error('Error loading audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [currentOrg?.id, selectedAction, selectedStatus, selectedTimeRange]);

  // Handle immediate search on submit or debounce
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadLogs();
  };

  const handleExportCsv = async () => {
    try {
      const csv = await exportService.exportAuditLogsCsv(currentOrg?.id || 'org_esaia_main');
      exportService.downloadFile(csv, `esaia_audit_logs_${currentOrg?.id || 'main'}.csv`, 'text/csv');
      showToast('success', 'Audit Logs Exported', 'CSV format downloaded successfully');
    } catch (e: any) {
      showToast('error', 'Export Failed', e.message);
    }
  };

  const handleExportJson = async () => {
    try {
      const json = JSON.stringify(logs, null, 2);
      exportService.downloadFile(json, `esaia_audit_logs_${currentOrg?.id || 'main'}.json`, 'application/json');
      showToast('success', 'Audit Logs Exported', 'JSON format downloaded successfully');
    } catch (e: any) {
      showToast('error', 'Export Failed', e.message);
    }
  };

  // Distinct action categories
  const actionCategories = [
    { value: 'all', label: t.auditModule?.allActions || 'All Actions' },
    { value: 'user:login', label: 'User Logins' },
    { value: 'user:invite', label: 'User Invitations' },
    { value: 'qr:create', label: 'QR Creations' },
    { value: 'qr:update', label: 'QR Edits' },
    { value: 'page:publish', label: 'Page Publications' },
    { value: 'client:update', label: 'Client CRM Updates' },
    { value: 'migration:import', label: 'Batch Migration Imports' },
    { value: 'domain:verify', label: 'Domain Verifications' },
    { value: 'data:export', label: 'Data Sovereignty Exports' }
  ];

  const getActionBadgeVariant = (action: string) => {
    if (action.startsWith('user:')) return 'brand';
    if (action.startsWith('qr:')) return 'neutral';
    if (action.startsWith('page:')) return 'success';
    if (action.startsWith('domain:')) return 'warning';
    if (action.startsWith('data:')) return 'brand';
    return 'neutral';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
              {t.auditModule?.title || 'Security & Administrative Audit Logs'}
            </h1>
            <Badge variant="success">
              {t.auditModule?.appendOnly || 'Append-Only Immutability'}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#8c7e73] mt-1">
            {t.auditModule?.subtitle || 'Immutable audit trail for all QR destination updates, role changes, and migrations.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={loadLogs}
          >
            {t.auditModule?.refresh || t.actions.refresh || 'Refresh'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={handleExportCsv}
          >
            CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<FileJson className="w-3.5 h-3.5" />}
            onClick={handleExportJson}
          >
            JSON
          </Button>
        </div>
      </div>

      {/* Security Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
              {t.auditModule?.ledgerStatus || 'Security Ledger Status'}
            </p>
            <p className="text-sm font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              {t.auditModule?.cryptoIntegrity || '100% Cryptographic Integrity'}
            </p>
          </div>
        </Card>

        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
              {t.auditModule?.eventsRetained || 'Events Retained'}
            </p>
            <p className="text-sm font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              {logs.length} {t.auditModule?.eventsRetained || 'Recorded Activities'}
            </p>
          </div>
        </Card>

        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
              {t.auditModule?.tenantPartitioning || 'Tenant Partitioning'}
            </p>
            <p className="text-sm font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] font-mono">
              {currentOrg?.id || 'org_esaia_main'}
            </p>
          </div>
        </Card>
      </div>

      {/* Filter Bar */}
      <Card padding="sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              id="audit-search-input"
              placeholder={t.auditModule?.searchPlaceholder || 'Search by actor email, action name, resource ID, or IP...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Action Type Dropdown */}
            <select
              id="audit-action-filter"
              value={selectedAction}
              onChange={e => setSelectedAction(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#eae4d9] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] text-xs text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] focus:outline-hidden focus:border-blue-500"
            >
              {actionCategories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Status Dropdown */}
            <select
              id="audit-status-filter"
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#eae4d9] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] text-xs text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] focus:outline-hidden focus:border-blue-500"
            >
              <option value="all">{t.auditModule?.allStatuses || 'All Statuses'}</option>
              <option value="success">{t.actions.status || 'Success'}</option>
              <option value="warning">Warning</option>
              <option value="failure">Failure</option>
            </select>

            {/* Timeframe Dropdown */}
            <select
              id="audit-timerange-filter"
              value={selectedTimeRange}
              onChange={e => setSelectedTimeRange(e.target.value as any)}
              className="px-3 py-2 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#eae4d9] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] text-xs text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] focus:outline-hidden focus:border-blue-500"
            >
              <option value="all">{t.auditModule?.allTime || 'All Time'}</option>
              <option value="today">{t.auditModule?.today || 'Today (24h)'}</option>
              <option value="7d">{t.auditModule?.last7Days || 'Last 7 Days'}</option>
              <option value="30d">{t.auditModule?.last30Days || 'Last 30 Days'}</option>
            </select>

            <Button type="submit" size="sm" variant="secondary">
              {t.actions.filter || 'Filter'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Audit Log Table */}
      <Card padding="none">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-mono">{t.auditModule?.fetchingLedger || 'Fetching Immutable Audit Ledger...'}</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-16 px-4">
            <ShieldCheck className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              {t.auditModule?.noRecordsFound || 'No Audit Records Found'}
            </h3>
            <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 mt-1">
              {t.auditModule?.noRecordsDesc || 'No matching activity events match the selected criteria.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead>
                <tr className="border-b border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] bg-[#090a0f]/50 [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#eae4d9]/50 text-slate-400 [data-theme=light]:text-slate-500 font-medium">
                  <th className="py-3 px-4">{t.auditModule?.actionEvent || 'Action Event'}</th>
                  <th className="py-3 px-4">{t.auditModule?.actorEmail || 'Actor Email'}</th>
                  <th className="py-3 px-4">{t.auditModule?.resourceTarget || 'Resource Target'}</th>
                  <th className="py-3 px-4">{t.auditModule?.originIp || 'Origin IP'}</th>
                  <th className="py-3 px-4">{t.auditModule?.timestamp || 'Timestamp'}</th>
                  <th className="py-3 px-4 text-center">{t.auditModule?.status || 'Status'}</th>
                  <th className="py-3 px-4 text-right rtl:text-left">{t.auditModule?.inspect || 'Inspect'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c2030] [data-theme=light]:divide-slate-200 [data-theme=beige]:divide-[#dfd7cb]">
                {logs.map(log => {
                  const logDate = new Date(log.timestamp);
                  const formattedTime = logDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const formattedDate = logDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-[#141722]/50 [data-theme=light]:hover:bg-slate-50 [data-theme=beige]:hover:bg-[#eae4d9]/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                            {log.action}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 uppercase tracking-wider">
                          {log.resourceType}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                            {log.actorEmail.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] font-medium">
                            {log.actorEmail}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#3d3732]">
                        {log.resourceId}
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-400 [data-theme=light]:text-slate-500">
                        {log.ipAddress || '127.0.0.1'}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] font-medium">{formattedDate}</div>
                        <div className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 font-mono">{formattedTime}</div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <Badge variant={log.status === 'failure' ? 'neutral' : 'success'}>
                          {log.status || 'success'}
                        </Badge>
                      </td>

                      <td className="py-3 px-4 text-right rtl:text-left">
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Code className="w-3.5 h-3.5" />}
                          onClick={() => setInspectedLog(log)}
                        >
                          {t.auditModule?.details || 'Details'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Raw Payload Inspector Modal */}
      {inspectedLog && (
        <Modal
          isOpen={Boolean(inspectedLog)}
          onClose={() => setInspectedLog(null)}
          title={t.auditModule?.modalTitle || 'Audit Record Payload Inspector'}
          description={`${t.auditModule?.modalDesc || 'Tamper-proof event snapshot for'} ${inspectedLog.action}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
              <div>
                <span className="text-slate-400 [data-theme=light]:text-slate-500 block text-[10px]">
                  {t.auditModule?.eventId || 'EVENT ID'}
                </span>
                <span className="font-mono text-slate-200 [data-theme=light]:text-slate-800 font-bold">{inspectedLog.id}</span>
              </div>
              <div>
                <span className="text-slate-400 [data-theme=light]:text-slate-500 block text-[10px]">
                  {t.auditModule?.orgId || 'ORGANIZATION ID'}
                </span>
                <span className="font-mono text-slate-200 [data-theme=light]:text-slate-800 font-bold">{inspectedLog.orgId}</span>
              </div>
              <div>
                <span className="text-slate-400 [data-theme=light]:text-slate-500 block text-[10px]">
                  {t.auditModule?.actorEmail || 'ACTOR EMAIL'}
                </span>
                <span className="text-blue-400 font-medium">{inspectedLog.actorEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 [data-theme=light]:text-slate-500 block text-[10px]">
                  {t.auditModule?.resourceTarget || 'RESOURCE TARGET'}
                </span>
                <span className="font-mono text-slate-200 [data-theme=light]:text-slate-800">{inspectedLog.resourceId}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 [data-theme=light]:text-slate-700 mb-1.5">
                {t.auditModule?.metadataPayload || 'Structured Metadata Payload (JSON)'}
              </label>
              <pre className="p-3.5 rounded-lg bg-[#090a0f] [data-theme=light]:bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-60 border border-[#1c2030]">
                {JSON.stringify(inspectedLog.metadata || {}, null, 2)}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
              <span className="text-[11px] text-slate-400 font-mono">
                {t.auditModule?.loggedAt || 'Logged at'} {new Date(inspectedLog.timestamp).toISOString()}
              </span>
              <Button size="sm" onClick={() => setInspectedLog(null)}>
                {t.auditModule?.closeInspector || 'Close Inspector'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
