/**
 * ESAIA - Dynamic QR Code Fleet Management & Engine
 * Multi-status filters, dynamic destination re-binding, vector styling, and 7-stage scannability auditing.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  QrCode as QrCodeIcon,
  Plus,
  Search,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Sliders,
  Filter,
  Download,
  Trash2,
  Tag,
  LayoutGrid,
  List,
  Copy,
  Check,
  CheckSquare,
  Square,
  ArrowUpDown,
  FileSpreadsheet,
  AlertCircle,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { QrCode as QrCodeType, QrStatus, QrDestinationType } from '../../types/qr';
import { Client } from '../../types/client';
import { qrService } from '../../services/firebase/qrService';
import { clientService } from '../../services/firebase/clientService';
import { qrVectorEngine } from '../../services/qr/qrVectorEngine';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { QrDesignModal } from './QrDesignModal';
import { QuickEditDestinationModal } from './QuickEditDestinationModal';
import { BulkTagModal } from './BulkTagModal';
import { CreateQrModal } from './CreateQrModal';
import { getQrRedirectUrl } from '../../utils/qrUrl';

export const QrManagerPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { showToast } = useNotification();
  const { t } = useLanguage();

  // State
  const [qrs, setQrs] = useState<QrCodeType[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Controls
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'archived'>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'scans' | 'newest' | 'name' | 'health'>('scans');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [editingQr, setEditingQr] = useState<QrCodeType | null>(null);
  const [quickEditQr, setQuickEditQr] = useState<QrCodeType | null>(null);
  const [isBulkTagOpen, setIsBulkTagOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load Fleet & Clients
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [fetchedQrs, fetchedClients] = await Promise.all([
        qrService.getQrCodesByOrg('org_esaia_main'),
        clientService.getClientsByOrg('org_esaia_main')
      ]);
      setQrs(fetchedQrs);
      setClients(fetchedClients);
    } catch (err) {
      showToast('Error loading QR fleet data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute all unique tags across the fleet
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    qrs.forEach(q => q.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [qrs]);

  // Filter & Sort Logic
  const filteredQrs = useMemo(() => {
    return qrs
      .filter(qr => {
        // Status tab
        if (statusFilter !== 'all' && qr.status !== statusFilter) return false;
        // Client dropdown
        if (clientFilter !== 'all' && qr.clientId !== clientFilter) return false;
        // Tag filter
        if (tagFilter !== 'all' && !qr.tags?.includes(tagFilter)) return false;
        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = qr.name.toLowerCase().includes(q);
          const matchCode = qr.publicCode.toLowerCase().includes(q);
          const matchClient = (qr.clientName || '').toLowerCase().includes(q);
          const matchUrl = (qr.destinationUrl || '').toLowerCase().includes(q);
          const matchTags = qr.tags?.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchCode && !matchClient && !matchUrl && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'scans') return (b.totalScans || 0) - (a.totalScans || 0);
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'health') {
          return (b.styleConfig?.healthScore || 0) - (a.styleConfig?.healthScore || 0);
        }
        return 0;
      });
  }, [qrs, statusFilter, clientFilter, tagFilter, searchQuery, sortBy]);

  // Scan Counters
  const metrics = useMemo(() => {
    const totalScans = qrs.reduce((acc, q) => acc + (q.totalScans || 0), 0);
    const activeCount = qrs.filter(q => q.status === 'active').length;
    const pausedCount = qrs.filter(q => q.status === 'paused').length;
    const avgHealth = Math.round(
      qrs.reduce((acc, q) => acc + (q.styleConfig?.healthScore || 95), 0) / (qrs.length || 1)
    );
    return { totalScans, activeCount, pausedCount, avgHealth };
  }, [qrs]);

  // Bulk Handlers
  const handleSelectAll = () => {
    if (selectedIds.length === filteredQrs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredQrs.map(q => q.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const handleBulkStatusChange = async (status: QrStatus) => {
    try {
      await qrService.bulkUpdateStatus(selectedIds, status);
      setQrs(prev => prev.map(q => (selectedIds.includes(q.id) ? { ...q, status } : q)));
      showToast(`Updated ${selectedIds.length} QR code(s) to ${status}`, 'success');
      setSelectedIds([]);
    } catch (err) {
      showToast('Error executing bulk status update', 'error');
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Permanently delete ${selectedIds.length} selected QR code(s)?`)) return;
    try {
      await qrService.bulkDelete(selectedIds);
      setQrs(prev => prev.filter(q => !selectedIds.includes(q.id)));
      showToast(`Deleted ${selectedIds.length} QR code(s)`, 'success');
      setSelectedIds([]);
    } catch (err) {
      showToast('Error deleting QR codes', 'error');
    }
  };

  const handleExportCsv = (onlySelected = false) => {
    const targetQrs = onlySelected ? qrs.filter(q => selectedIds.includes(q.id)) : filteredQrs;
    const csvContent = qrService.exportQrFleetCsv(targetQrs);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ESAIA_QR_Fleet_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${targetQrs.length} QR records to CSV`, 'success');
  };

  // Status Single Toggle
  const handleToggleSingleStatus = async (qr: QrCodeType) => {
    const nextStatus: QrStatus = qr.status === 'active' ? 'paused' : 'active';
    try {
      await qrService.updateQrStatus(qr.id, nextStatus);
      setQrs(prev => prev.map(q => (q.id === qr.id ? { ...q, status: nextStatus } : q)));
      showToast(`QR "${qr.name}" set to ${nextStatus}`, 'success');
    } catch (err) {
      showToast('Failed to change status', 'error');
    }
  };

  // Quick Copy
  const handleCopyLink = (code: string) => {
    const url = getQrRedirectUrl(code);
    navigator.clipboard.writeText(url);
    setCopiedId(code);
    showToast('Copied redirect link to clipboard', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Save from Design Studio Modal
  const handleSaveDesign = async (updatedQr: QrCodeType) => {
    await qrService.updateQrCode(updatedQr.id, updatedQr);
    setQrs(prev => prev.map(q => (q.id === updatedQr.id ? updatedQr : q)));
  };

  // Save from Quick Destination Modal
  const handleSaveQuickDestination = async (qrId: string, newUrl: string, type: QrDestinationType) => {
    await qrService.updateDestination(qrId, newUrl, type);
    setQrs(prev =>
      prev.map(q => (q.id === qrId ? { ...q, destinationUrl: newUrl, destinationType: type } : q))
    );
  };

  // Assign bulk tags
  const handleAssignBulkTags = async (tags: string[]) => {
    await qrService.bulkAssignTags(selectedIds, tags);
    setQrs(prev =>
      prev.map(q => {
        if (selectedIds.includes(q.id)) {
          const merged = Array.from(new Set([...(q.tags || []), ...tags]));
          return { ...q, tags: merged };
        }
        return q;
      })
    );
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Fleet Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <QrCodeIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                {t.qrModule.dynamicQrEngine}
              </h1>
              <p className="text-xs text-neutral-400">
                {t.qrModule.dynamicQrEngineSubtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleExportCsv(false)}
            className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-neutral-600 text-neutral-200 text-xs font-semibold flex items-center gap-2 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            {t.qrModule.exportCsv}
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-2 transition shadow-lg shadow-rose-950/50"
          >
            <Plus className="w-4 h-4" />
            {t.qrModule.newDynamicQr}
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400">
              {t.qrModule.totalScansCaptured}
            </span>
            <div className="text-xl font-bold text-white font-mono mt-0.5">
              {metrics.totalScans.toLocaleString()}
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400">
              {t.qrModule.activeRoutingQrs}
            </span>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">
              {metrics.activeCount} <span className="text-xs text-neutral-500 font-normal">{t.qrModule.of} {qrs.length}</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Play className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400">
              {t.qrModule.pausedCampaigns}
            </span>
            <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">{metrics.pausedCount}</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Pause className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400">
              {t.qrModule.fleetHealthIndex}
            </span>
            <div className="text-xl font-bold text-sky-400 font-mono mt-0.5">{metrics.avgHealth}% A+</div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Status Tabs */}
      <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                statusFilter === 'all'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.qrModule.filterAll} ({qrs.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                statusFilter === 'active'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.qrModule.filterActive} ({qrs.filter(q => q.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('paused')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                statusFilter === 'paused'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.qrModule.filterPaused} ({qrs.filter(q => q.status === 'paused').length})
            </button>
            <button
              onClick={() => setStatusFilter('archived')}
              className={`px-3 py-1.5 rounded-lg transition font-medium ${
                statusFilter === 'archived'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t.qrModule.filterArchived} ({qrs.filter(q => q.status === 'archived').length})
            </button>
          </div>

          {/* View Toggle (Grid vs Table) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-950 border border-neutral-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title={t.clientsModule.gridView}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
              title={t.clientsModule.tableView}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search, Client Filter, Tag Filter, Sort Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2">
          {/* Search Box */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.qrModule.searchPlaceholderLong}
              className="w-full pl-9 rtl:pl-3.5 rtl:pr-9 pr-3.5 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
            />
          </div>

          {/* Client Filter */}
          <div className="lg:col-span-3">
            <select
              value={clientFilter}
              onChange={e => setClientFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="all">{t.qrModule.allClientsCount} ({clients.length})</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>
                  {c.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Filter */}
          <div className="lg:col-span-2">
            <select
              value={tagFilter}
              onChange={e => setTagFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="all">{t.qrModule.allTagsCount} ({allTags.length})</option>
              {allTags.map(tItem => (
                <option key={tItem} value={tItem}>
                  {tItem}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-xs focus:outline-none focus:border-rose-500"
            >
              <option value="scans">{t.qrModule.sortMostScans}</option>
              <option value="newest">{t.qrModule.sortNewest}</option>
              <option value="name">{t.qrModule.sortName}</option>
              <option value="health">{t.qrModule.sortHealth}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Action Bar (when 1 or more items selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 flex flex-wrap items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-rose-300">
              {selectedIds.length} {t.qrModule.selected}
            </span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-[11px] text-neutral-400 hover:text-white underline ml-2"
            >
              {t.actions.cancel}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkStatusChange('active')}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 text-xs flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" />
              {t.qrModule.resumeSelected}
            </button>
            <button
              onClick={() => handleBulkStatusChange('paused')}
              className="px-2.5 py-1.5 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 hover:bg-amber-900 text-xs flex items-center gap-1.5"
            >
              <Pause className="w-3.5 h-3.5" />
              {t.qrModule.pauseSelected}
            </button>
            <button
              onClick={() => setIsBulkTagOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 text-xs flex items-center gap-1.5"
            >
              <Tag className="w-3.5 h-3.5 text-sky-400" />
              {t.qrModule.bulkTags}
            </button>
            <button
              onClick={() => handleExportCsv(true)}
              className="px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-rose-400" />
              {t.qrModule.exportSelected}
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-2.5 py-1.5 rounded-lg bg-rose-900/60 border border-rose-700 text-rose-200 hover:bg-rose-900 text-xs flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {t.qrModule.deleteSelected}
            </button>
          </div>
        </div>
      )}

      {/* Main View: Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredQrs.map(qr => {
            const isSelected = selectedIds.includes(qr.id);
            const redirectUrl = getQrRedirectUrl(qr.publicCode);
            const svgPreview = qrVectorEngine.generateSvgString({
              value: redirectUrl,
              size: 200,
              style: qr.styleConfig
            });

            const health = qr.styleConfig?.healthScore || 95;
            const grade = qr.styleConfig?.scannabilityGrade || 'A';

            return (
              <div
                key={qr.id}
                className={`group rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col bg-neutral-900/90 ${
                  isSelected ? 'border-rose-500 shadow-lg shadow-rose-950/20' : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Card Top: Client Attribution & Selection */}
                <div className="px-5 py-3.5 border-b border-neutral-800/80 flex items-center justify-between bg-neutral-950/40">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleToggleSelect(qr.id)}
                      className="text-neutral-400 hover:text-white transition"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-rose-500" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-xs font-semibold text-neutral-300 truncate max-w-[170px]">
                      {qr.clientName || t.qrModule.directClient}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Health Grade Badge */}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        grade === 'A'
                          ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                          : grade === 'B'
                          ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                          : 'bg-rose-950/80 text-rose-400 border-rose-800'
                      }`}
                      title={`${t.qrModule.scannabilityHealthScore}: ${health}%`}
                    >
                      {t.qrModule.gradeBadge} {grade} ({health}%)
                    </span>

                    {/* Status Pill */}
                    <button
                      type="button"
                      onClick={() => handleToggleSingleStatus(qr)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border flex items-center gap-1 transition ${
                        qr.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                          : qr.status === 'paused'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                          : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      {qr.status === 'active' ? <Play className="w-2.5 h-2.5 fill-current" /> : <Pause className="w-2.5 h-2.5" />}
                      {qr.status === 'active' ? t.qrModule.filterActive : qr.status === 'paused' ? t.qrModule.filterPaused : t.qrModule.filterArchived}
                    </button>
                  </div>
                </div>

                {/* Card Center: Visual SVG Preview & Details */}
                <div className="p-5 flex gap-4 items-center">
                  {/* Actual SVG QR Graphic */}
                  <div
                    onClick={() => setEditingQr(qr)}
                    className="w-28 h-28 rounded-xl bg-white p-2 border border-neutral-300 shadow-sm shrink-0 flex items-center justify-center cursor-pointer group-hover:scale-[1.03] transition duration-200"
                    dangerouslySetInnerHTML={{ __html: svgPreview }}
                  />

                  {/* Metadata */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h3
                      onClick={() => setEditingQr(qr)}
                      className="text-sm font-bold text-white hover:text-rose-400 transition cursor-pointer truncate"
                      title={qr.name}
                    >
                      {qr.name}
                    </h3>

                    {/* Shortcode URL with Copy */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-rose-400 truncate">
                        /q/{qr.publicCode}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(qr.publicCode)}
                        className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-800 transition"
                        title={t.qrModule.copyDynamicLink}
                      >
                        {copiedId === qr.publicCode ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>

                    {/* Target Destination URL with quick rebind */}
                    <div className="text-[11px] text-neutral-400 truncate flex items-center gap-1">
                      <span className="truncate" title={qr.destinationUrl}>
                        {qr.destinationUrl}
                      </span>
                    </div>

                    {/* Scan counters */}
                    <div className="flex items-center gap-3 pt-1 text-xs">
                      <div>
                        <span className="text-neutral-500 text-[10px] block">{t.qrModule.totalScans}</span>
                        <span className="font-mono font-bold text-white">
                          {(qr.totalScans || 0).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[10px] block">{t.qrModule.uniqueScans}</span>
                        <span className="font-mono text-neutral-300">
                          {(qr.uniqueScans || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Tags */}
                {qr.tags && qr.tags.length > 0 && (
                  <div className="px-5 pb-3 flex flex-wrap gap-1">
                    {qr.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-800/80 text-neutral-300 border border-neutral-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                    {qr.tags.length > 3 && (
                      <span className="text-[10px] text-neutral-500">+{qr.tags.length - 3}</span>
                    )}
                  </div>
                )}

                {/* Card Footer Actions */}
                <div className="mt-auto px-5 py-3 border-t border-neutral-800/80 bg-neutral-950/50 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickEditQr(qr)}
                    className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-medium flex items-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-3 h-3 text-rose-400" />
                    {t.qrModule.quickEdit}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const filename = `${qr.publicCode}_vector.svg`;
                        qrVectorEngine.downloadSvg(svgPreview, filename);
                        showToast(`Downloaded SVG (${filename})`, 'success');
                      }}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
                      title={t.qrModule.exportVectorSvg}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingQr(qr)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Sliders className="w-3 h-3" />
                      {t.qrModule.styleStudio}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main View: Table Mode */}
      {viewMode === 'table' && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-neutral-950/80 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800">
                <tr>
                  <th className="p-4 w-10">
                    <button onClick={handleSelectAll} className="hover:text-white">
                      {selectedIds.length === filteredQrs.length && filteredQrs.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-rose-500" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4">{t.qrModule.thQrCode}</th>
                  <th className="p-4">/q/:code</th>
                  <th className="p-4">{t.qrModule.thTargetDestination}</th>
                  <th className="p-4">{t.qrModule.thClientBrand}</th>
                  <th className="p-4 text-center">{t.qrModule.thStatus}</th>
                  <th className="p-4 text-center">{t.qrModule.thQuality}</th>
                  <th className="p-4 text-right rtl:text-left">{t.qrModule.thScans}</th>
                  <th className="p-4 text-right rtl:text-left">{t.qrModule.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredQrs.map(qr => {
                  const isSelected = selectedIds.includes(qr.id);
                  const redirectUrl = getQrRedirectUrl(qr.publicCode);
                  const svgPreview = qrVectorEngine.generateSvgString({
                    value: redirectUrl,
                    size: 80,
                    style: qr.styleConfig
                  });
                  const health = qr.styleConfig?.healthScore || 95;
                  const grade = qr.styleConfig?.scannabilityGrade || 'A';

                  return (
                    <tr
                      key={qr.id}
                      className={`hover:bg-neutral-800/40 transition ${
                        isSelected ? 'bg-rose-950/20' : ''
                      }`}
                    >
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleSelect(qr.id)}
                          className="hover:text-white"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-rose-500" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-500" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            onClick={() => setEditingQr(qr)}
                            className="w-10 h-10 rounded-lg bg-white p-1 border border-neutral-300 shrink-0 cursor-pointer"
                            dangerouslySetInnerHTML={{ __html: svgPreview }}
                          />
                          <div>
                            <span
                              onClick={() => setEditingQr(qr)}
                              className="font-bold text-white hover:text-rose-400 cursor-pointer block text-sm"
                            >
                              {qr.name}
                            </span>
                            <span className="text-[11px] text-neutral-400 capitalize">
                              {t.qrModule.initialModuleShape}: {qr.styleConfig?.moduleStyle || 'rounded'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-rose-400 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>/q/{qr.publicCode}</span>
                          <button
                            onClick={() => handleCopyLink(qr.publicCode)}
                            className="text-neutral-400 hover:text-white p-1 rounded"
                            title={t.qrModule.copyDynamicLink}
                          >
                            {copiedId === qr.publicCode ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="p-4 max-w-[200px]">
                        <div className="truncate text-neutral-300 font-mono text-[11px]" title={qr.destinationUrl}>
                          {qr.destinationUrl}
                        </div>
                        <button
                          onClick={() => setQuickEditQr(qr)}
                          className="text-[10px] text-rose-400 hover:underline mt-0.5 inline-block"
                        >
                          {t.qrModule.quickEdit}
                        </button>
                      </td>
                      <td className="p-4 text-neutral-300">{qr.clientName || '-'}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleSingleStatus(qr)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                            qr.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : qr.status === 'paused'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                          }`}
                        >
                          {qr.status === 'active' ? <Play className="w-2 h-2 fill-current" /> : <Pause className="w-2 h-2" />}
                          {qr.status === 'active' ? t.qrModule.filterActive : qr.status === 'paused' ? t.qrModule.filterPaused : t.qrModule.filterArchived}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            grade === 'A'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : grade === 'B'
                              ? 'bg-amber-950 text-amber-400 border-amber-800'
                              : 'bg-rose-950 text-rose-400 border-rose-800'
                          }`}
                        >
                          {grade} ({health}%)
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono font-bold text-white">
                        {(qr.totalScans || 0).toLocaleString()}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setEditingQr(qr)}
                            className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium"
                          >
                            {t.actions.edit}
                          </button>
                          <button
                            onClick={() => {
                              const filename = `${qr.publicCode}_vector.svg`;
                              qrVectorEngine.downloadSvg(svgPreview, filename);
                            }}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
                            title={t.qrModule.exportVectorSvg}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredQrs.length === 0 && !isLoading && (
        <div className="p-12 text-center rounded-2xl border border-neutral-800 bg-neutral-900/40 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
            <QrCodeIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">{t.qrModule.noQrFound}</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            {t.qrModule.noQrFoundDesc}
          </p>
          <button
            onClick={() => {
              setStatusFilter('all');
              setClientFilter('all');
              setTagFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition"
          >
            {t.qrModule.resetFilters || t.actions.reset}
          </button>
        </div>
      )}

      {/* Studio Design Modal */}
      {editingQr && (
        <QrDesignModal
          qr={editingQr}
          clients={clients}
          isOpen={!!editingQr}
          onClose={() => setEditingQr(null)}
          onSave={handleSaveDesign}
        />
      )}

      {/* Quick Redirection Target Modal */}
      {quickEditQr && (
        <QuickEditDestinationModal
          qr={quickEditQr}
          isOpen={!!quickEditQr}
          onClose={() => setQuickEditQr(null)}
          onSave={handleSaveQuickDestination}
        />
      )}

      {/* Bulk Tag Assignment Modal */}
      <BulkTagModal
        selectedCount={selectedIds.length}
        isOpen={isBulkTagOpen}
        onClose={() => setIsBulkTagOpen(false)}
        onAssign={handleAssignBulkTags}
      />

      {/* Create QR Modal */}
      <CreateQrModal
        isOpen={isCreateOpen}
        clients={clients}
        onClose={() => setIsCreateOpen(false)}
        onCreated={newQr => setQrs(prev => [newQr, ...prev])}
      />
    </div>
  );
};
