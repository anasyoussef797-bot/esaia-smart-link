/**
 * ESAIA - Client CRM Management View
 * Multi-Tenant Brand & Portfolio Engine with Real-Time Search, Filters, Pagination & RBAC
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  QrCode,
  Layers,
  ExternalLink,
  Mail,
  Phone,
  LayoutGrid,
  List,
  Building,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Edit2,
  Trash2,
  Globe,
  Archive,
  Palette,
  CheckCircle2
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Skeleton } from '../../components/ui/Skeleton';
import { ClientModal } from './ClientModal';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { clientService } from '../../services/firebase/clientService';
import { Client, ClientStatus } from '../../types/client';

export interface ClientsPageProps {
  onNavigate: (path: string) => void;
}

type SortField = 'newest' | 'name' | 'scans';

export const ClientsPage: React.FC<ClientsPageProps> = ({ onNavigate }) => {
  const { showToast } = useNotification();
  const { t, isRtl } = useLanguage();
  const { currentOrg, hasPermission } = useAuth();

  const canManage = hasPermission('clients:manage');

  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ClientStatus>('all');
  const [sortBy, setSortBy] = useState<SortField>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClientForEdit, setSelectedClientForEdit] = useState<Client | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchClients = async () => {
    if (!currentOrg) return;
    setIsLoading(true);
    try {
      const data = await clientService.getClientsByOrg(
        currentOrg.id,
        statusFilter === 'all' ? undefined : statusFilter
      );
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [currentOrg, statusFilter]);

  // Search and Sort Pipeline
  const filteredAndSortedClients = useMemo(() => {
    let result = [...clients];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.companyName.toLowerCase().includes(q) ||
          c.contactPerson?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.tags?.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Sort order
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'name') {
        return a.companyName.localeCompare(b.companyName);
      }
      if (sortBy === 'scans') {
        return (b.stats?.totalScansAllTime || 0) - (a.stats?.totalScansAllTime || 0);
      }
      return 0;
    });

    return result;
  }, [clients, searchQuery, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedClients.length / itemsPerPage) || 1;
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedClients.slice(start, start + itemsPerPage);
  }, [filteredAndSortedClients, currentPage, itemsPerPage]);

  // Adjust page if out of bounds after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleOpenCreateModal = () => {
    setSelectedClientForEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (client: Client, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedClientForEdit(client);
    setIsModalOpen(true);
  };

  const handleSaveClient = async (clientData: Partial<Client>) => {
    if (!currentOrg) return;
    setIsSaving(true);
    try {
      if (selectedClientForEdit) {
        await clientService.updateClient(selectedClientForEdit.id, clientData);
        showToast('success', t.clientsModule.editModalTitle, selectedClientForEdit.companyName);
      } else {
        const newClientId = await clientService.createClient({
          orgId: currentOrg.id,
          companyName: clientData.companyName || 'New Client',
          contactPerson: clientData.contactPerson || '',
          email: clientData.email || '',
          phone: clientData.phone || '',
          whatsapp: clientData.whatsapp,
          website: clientData.website,
          address: clientData.address,
          notes: clientData.notes,
          tags: clientData.tags || [],
          status: clientData.status || 'active',
          brandColors: clientData.brandColors || {
            primary: '#2563eb',
            secondary: '#1e293b',
            accent: '#38bdf8',
            background: '#ffffff',
            text: '#0f172a'
          },
          logoUrl: clientData.logoUrl,
          stats: { totalQrCodes: 0, totalPages: 0, totalScansAllTime: 0, scansLast30Days: 0 }
        });
        showToast('success', t.clientsModule.modalTitle, clientData.companyName || 'Client');
      }
      setIsModalOpen(false);
      await fetchClients();
    } catch (err) {
      console.error('Failed to save client:', err);
      showToast('error', 'Operation Failed', 'Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClient = async (client: Client, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete ${client.companyName}?`)) {
      try {
        await clientService.deleteClient(client.id);
        showToast('success', t.actions.delete, client.companyName);
        await fetchClients();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleArchiveClient = async (client: Client, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await clientService.archiveClient(client.id);
      showToast('success', t.clientsModule.archiveClient, client.companyName);
      await fetchClients();
    } catch (err) {
      console.error('Archive failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
              {t.clientsModule.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {clients.length} {t.nav.clients}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">{t.clientsModule.subtitle}</p>
        </div>

        <div className="flex items-center gap-2.5">
          {!canManage && (
            <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
              {t.clientsModule.readOnlyNotice}
            </span>
          )}
          {canManage && (
            <Button
              id="add-new-client-btn"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={handleOpenCreateModal}
              className="shadow-lg shadow-blue-500/20"
            >
              {t.clientsModule.addClient}
            </Button>
          )}
        </div>
      </div>

      {/* Filter, Search & View Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
        {/* Search input */}
        <div className="flex-1 min-w-[240px]">
          <Input
            id="client-search-input"
            placeholder={t.clientsModule.searchPlaceholder}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: t.clientsModule.allStatus },
            { id: 'active', label: t.clientsModule.activeStatus },
            { id: 'pending', label: t.clientsModule.pendingStatus },
            { id: 'archived', label: t.clientsModule.archivedStatus }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id as any);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d] hover:bg-slate-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort & View Mode Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <Select
            id="client-sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortField)}
            options={[
              { value: 'newest', label: t.clientsModule.sortNewest },
              { value: 'name', label: t.clientsModule.sortName },
              { value: 'scans', label: t.clientsModule.sortScans }
            ]}
            className="w-36 text-xs"
          />

          <div className="flex items-center border border-[#1c2030] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] rounded-lg p-0.5 bg-[#141722] [data-theme=light]:bg-white [data-theme=beige]:bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d]'
              }`}
              title={t.clientsModule.gridView}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs transition-colors ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d]'
              }`}
              title={t.clientsModule.tableView}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] space-y-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-16 rounded-xl" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : paginatedClients.length === 0 ? (
        /* Empty State */
        <Card className="p-12 text-center space-y-4 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              {t.clientsModule.noClients}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              {t.clientsModule.noClientsDesc}
            </p>
          </div>
          {canManage && (
            <Button onClick={handleOpenCreateModal} className="mt-2">
              <Plus className="w-4 h-4 mr-1.5" />
              {t.clientsModule.addClient}
            </Button>
          )}
        </Card>
      ) : viewMode === 'grid' ? (
        /* GRID CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginatedClients.map(client => {
            const primaryColor = client.brandColors?.primary || '#2563eb';
            return (
              <Card
                key={client.id}
                padding="md"
                onClick={() => onNavigate(`/admin/clients/${client.id}`)}
                className="group flex flex-col justify-between hover:border-blue-500/60 transition-all cursor-pointer border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] relative overflow-hidden"
              >
                {/* Brand Color Top Indicator Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: primaryColor }} />

                <div className="space-y-4">
                  {/* Top Bar: Avatar, Company, Status */}
                  <div className="flex items-start justify-between gap-3 pt-1">
                    <div className="flex items-center gap-3">
                      {/* Logo or Brand Avatar */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden border shadow-sm shrink-0"
                        style={{
                          backgroundColor: client.brandColors?.background || '#ffffff',
                          borderColor: primaryColor
                        }}
                      >
                        {client.logoUrl ? (
                          <img
                            src={client.logoUrl}
                            alt={client.companyName}
                            className="w-full h-full object-contain p-1"
                            onError={e => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <span className="font-bold text-base" style={{ color: primaryColor }}>
                            {client.companyName.substring(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="truncate">
                        <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] group-hover:text-blue-400 transition-colors truncate">
                          {client.companyName}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">
                          {client.contactPerson || 'Contact Person'}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        client.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : client.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                      }`}
                    >
                      {client.status}
                    </span>
                  </div>

                  {/* Contact Snippet */}
                  <div className="space-y-1 text-xs text-slate-400">
                    {client.email && (
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{client.email}</span>
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Brand Color Swatches & Tags */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center -space-x-1">
                      <span
                        className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                        style={{ backgroundColor: client.brandColors?.primary || '#2563eb' }}
                        title={t.clientsModule.primaryColor}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                        style={{ backgroundColor: client.brandColors?.secondary || '#1e293b' }}
                        title={t.clientsModule.secondaryColor}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                        style={{ backgroundColor: client.brandColors?.accent || '#f59e0b' }}
                        title={t.clientsModule.accentColor}
                      />
                    </div>

                    {client.tags && client.tags.length > 0 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#141722] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37] truncate max-w-[140px]">
                        {client.tags[0]} {client.tags.length > 1 ? `+${client.tags.length - 1}` : ''}
                      </span>
                    )}
                  </div>

                  {/* Mini Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] text-center">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">{t.clientsModule.qrFleetTab || 'QRs'}</p>
                      <p className="text-xs font-bold text-slate-200 [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] mt-0.5">
                        {client.stats?.totalQrCodes || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">{t.nav.pages}</p>
                      <p className="text-xs font-bold text-slate-200 [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] mt-0.5">
                        {client.stats?.totalPages || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">{t.clientsModule.totalScans}</p>
                      <p className="text-xs font-bold text-blue-400 mt-0.5">
                        {(client.stats?.totalScansAllTime || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="mt-4 pt-3 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {canManage && (
                      <button
                        onClick={e => handleOpenEditModal(client, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d] hover:bg-slate-800/50 transition-colors"
                        title={t.actions.edit}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {canManage && (
                      <button
                        onClick={e => handleDeleteClient(client, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title={t.actions.delete}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    onClick={e => {
                      e.stopPropagation();
                      onNavigate(`/admin/clients/${client.id}`);
                    }}
                  >
                    {t.actions.details}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* DATA TABLE VIEW */
        <Card className="overflow-hidden border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border-b border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="p-3.5 pl-5">{t.clientsModule.thClientBrand}</th>
                  <th className="p-3.5">{t.clientsModule.thContact}</th>
                  <th className="p-3.5">{t.clientsModule.thColors}</th>
                  <th className="p-3.5 text-center">{t.clientsModule.thQrFleet}</th>
                  <th className="p-3.5 text-center">{t.clientsModule.thPages}</th>
                  <th className="p-3.5 text-center">{t.clientsModule.thAllTimeScans}</th>
                  <th className="p-3.5">{t.clientsModule.thStatus}</th>
                  <th className="p-3.5 pr-5 text-right">{t.clientsModule.thActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c2030] [data-theme=light]:divide-slate-200 [data-theme=beige]:divide-[#eae4d9]">
                {paginatedClients.map(client => {
                  const primaryColor = client.brandColors?.primary || '#2563eb';
                  return (
                    <tr
                      key={client.id}
                      onClick={() => onNavigate(`/admin/clients/${client.id}`)}
                      className="hover:bg-slate-800/30 [data-theme=light]:hover:bg-slate-50 [data-theme=beige]:hover:bg-[#fdfbf7] cursor-pointer transition-colors"
                    >
                      <td className="p-3.5 pl-5">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden border shrink-0"
                            style={{
                              backgroundColor: client.brandColors?.background || '#ffffff',
                              borderColor: primaryColor
                            }}
                          >
                            {client.logoUrl ? (
                              <img src={client.logoUrl} alt={client.companyName} className="w-full h-full object-contain p-1" />
                            ) : (
                              <span className="font-bold text-xs" style={{ color: primaryColor }}>
                                {client.companyName.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                              {client.companyName}
                            </span>
                            <span className="text-[11px] text-slate-400 block">{client.contactPerson}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-400">
                        <span>{client.email}</span>
                        {client.phone && <span className="text-[11px] block">{client.phone}</span>}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center -space-x-1">
                          <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: client.brandColors?.primary || '#2563eb' }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: client.brandColors?.secondary || '#1e293b' }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-black/40" style={{ backgroundColor: client.brandColors?.accent || '#f59e0b' }} />
                        </div>
                      </td>
                      <td className="p-3.5 text-center font-bold text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d]">
                        {client.stats?.totalQrCodes || 0}
                      </td>
                      <td className="p-3.5 text-center font-bold text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d]">
                        {client.stats?.totalPages || 0}
                      </td>
                      <td className="p-3.5 text-center font-bold text-blue-400">
                        {(client.stats?.totalScansAllTime || 0).toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                            client.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : client.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                          {canManage && (
                            <button
                              onClick={e => handleOpenEditModal(client, e)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d]"
                              title={t.actions.edit}
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                            onClick={() => onNavigate(`/admin/clients/${client.id}`)}
                          >
                            {t.actions.details}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {t.pagination.showing} {(currentPage - 1) * itemsPerPage + 1} {t.pagination.to}{' '}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedClients.length)} {t.pagination.of}{' '}
            {filteredAndSortedClients.length} {t.nav.clients}
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      )}

      {/* Unified Create / Edit Client Modal */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveClient}
        initialClient={selectedClientForEdit}
        isLoading={isSaving}
      />
    </div>
  );
};
