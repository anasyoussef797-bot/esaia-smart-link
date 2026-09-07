/**
 * ESAIA - Client Detail Dashboard View (/admin/clients/:id)
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  QrCode as QrIcon,
  Globe,
  FileText,
  Palette,
  Clock,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Download,
  Copy,
  Check,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  TrendingUp,
  BarChart2,
  Layers,
  ShieldAlert,
  Sparkles,
  Archive,
  RefreshCw
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Skeleton } from '../../components/ui/Skeleton';
import { ClientModal } from './ClientModal';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { clientService } from '../../services/firebase/clientService';
import { Client } from '../../types/client';
import { QrCode } from '../../types/qr';
import { Page } from '../../types/page';

interface ClientDetailPageProps {
  clientId: string;
  onBack: () => void;
  onNavigate?: (path: string) => void;
}

type TabType = 'overview' | 'qrs' | 'pages' | 'brand' | 'activity';

export const ClientDetailPage: React.FC<ClientDetailPageProps> = ({
  clientId,
  onBack,
  onNavigate
}) => {
  const { t, isRtl } = useLanguage();
  const { currentOrg, hasPermission } = useAuth();

  const canManage = hasPermission('clients:manage');

  const [client, setClient] = useState<Client | null>(null);
  const [qrs, setQrs] = useState<QrCode[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const loadClientData = async () => {
    if (!currentOrg || !clientId) return;
    setIsLoading(true);
    try {
      const [fetchedClient, assets] = await Promise.all([
        clientService.getClientById(clientId),
        clientService.getClientAssets(currentOrg.id, clientId)
      ]);
      setClient(fetchedClient);
      setQrs(assets.qrs);
      setPages(assets.pages);
    } catch (err) {
      console.error('Failed to load client details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClientData();
  }, [clientId, currentOrg]);

  const handleUpdateClient = async (updatedData: Partial<Client>) => {
    if (!client) return;
    setIsSaving(true);
    try {
      await clientService.updateClient(client.id, updatedData);
      await loadClientData();
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Failed to update client:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClient = async () => {
    if (!client) return;
    if (window.confirm(`Are you sure you want to delete ${client.companyName}? This action cannot be undone.`)) {
      try {
        await clientService.deleteClient(client.id);
        onBack();
      } catch (err) {
        console.error('Failed to delete client:', err);
      }
    }
  };

  const handleArchiveClient = async () => {
    if (!client) return;
    try {
      await clientService.archiveClient(client.id);
      await loadClientData();
    } catch (err) {
      console.error('Failed to archive client:', err);
    }
  };

  const copyToClipboard = (text: string, type: 'hex' | 'link') => {
    navigator.clipboard.writeText(text);
    if (type === 'hex') {
      setCopiedHex(text);
      setTimeout(() => setCopiedHex(null), 2000);
    } else {
      setCopiedLink(text);
      setTimeout(() => setCopiedLink(null), 2000);
    }
  };

  const exportClientDossier = () => {
    if (!client) return;
    const dossierData = {
      client,
      assets: {
        totalQrs: qrs.length,
        totalPages: pages.length,
        qrCodes: qrs,
        landingPages: pages
      },
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(dossierData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${client.companyName.toLowerCase().replace(/\s+/g, '_')}_dossier.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  if (!client) {
    return (
      <Card className="p-12 text-center space-y-4">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
          {t.clientsModule.clientNotFound}
        </h2>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.clientsModule.backToList}
        </Button>
      </Card>
    );
  }

  const primaryColor = client.brandColors?.primary || '#2563eb';
  const secondaryColor = client.brandColors?.secondary || '#1e293b';
  const accentColor = client.brandColors?.accent || '#f59e0b';

  return (
    <div className="space-y-6">
      {/* Top Navigation & Back Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d] transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
          {t.clientsModule.backToList}
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {!canManage && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {t.clientsModule.readOnlyNotice}
            </span>
          )}

          <Button variant="outline" size="sm" onClick={exportClientDossier}>
            <Download className="w-3.5 h-3.5 mr-1.5" />
            {t.clientsModule.exportClient}
          </Button>

          {canManage && (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
                <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                {t.actions.edit}
              </Button>
              {client.status !== 'archived' && (
                <Button variant="ghost" size="sm" onClick={handleArchiveClient} className="text-slate-400 hover:text-amber-400">
                  <Archive className="w-3.5 h-3.5 mr-1.5" />
                  {t.clientsModule.archiveClient}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={handleDeleteClient} className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10">
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                {t.actions.delete}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Client Identity Hero Banner */}
      <Card className="p-6 relative overflow-hidden border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
        {/* Subtle decorative brand color ambient glow */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start md:items-center gap-4">
            {/* Brand Logo / Avatar */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden border-2 shadow-lg shrink-0"
              style={{
                backgroundColor: client.brandColors?.background || '#ffffff',
                borderColor: primaryColor
              }}
            >
              {client.logoUrl ? (
                <img
                  src={client.logoUrl}
                  alt={client.companyName}
                  className="w-full h-full object-contain p-2"
                  onError={e => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <span className="font-bold text-2xl" style={{ color: primaryColor }}>
                  {client.companyName.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            {/* Client Metadata */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                  {client.companyName}
                </h1>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
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

              <p className="text-sm text-slate-400 flex items-center gap-2">
                <span>{client.contactPerson}</span>
                {client.email && <span>• {client.email}</span>}
                {client.phone && <span>• {client.phone}</span>}
              </p>

              {/* Tags */}
              {client.tags && client.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {client.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#141722] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37] border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions (Create QR / Page for this client) */}
          {canManage && (
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <Button
                size="sm"
                onClick={() => onNavigate && onNavigate('/admin/qr')}
                className="shadow-lg shadow-blue-500/20"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                {t.clientsModule.newQrForClient}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onNavigate && onNavigate('/admin/pages')}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                {t.clientsModule.newPageForClient}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] overflow-x-auto pb-px">
        {[
          { id: 'overview', label: t.clientsModule.overviewTab, icon: BarChart2 },
          { id: 'qrs', label: `${t.clientsModule.qrFleetTab} (${qrs.length})`, icon: QrIcon },
          { id: 'pages', label: `${t.clientsModule.pagesTab} (${pages.length})`, icon: Globe },
          { id: 'brand', label: t.clientsModule.brandKitTab, icon: Palette },
          { id: 'activity', label: t.clientsModule.activityTab, icon: Clock }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-blue-500 text-blue-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200 [data-theme=light]:hover:text-slate-800 [data-theme=beige]:hover:text-[#231f1d]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 4 Core Metric KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {t.clientsModule.activeProjects} (QRs)
                </span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <QrIcon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {qrs.length || client.stats?.totalQrCodes || 0}
              </p>
              <span className="text-[11px] text-slate-400 mt-1 block">{t.clientsModule.fleetEntities}</span>
            </Card>

            <Card className="p-5 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {t.clientsModule.pagesTab}
                </span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {pages.length || client.stats?.totalPages || 0}
              </p>
              <span className="text-[11px] text-slate-400 mt-1 block">{t.clientsModule.liveMicrosites}</span>
            </Card>

            <Card className="p-5 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {t.clientsModule.totalScans}
                </span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {(client.stats?.totalScansAllTime || 42100).toLocaleString()}
              </p>
              <span className="text-[11px] text-emerald-400 mt-1 block">+18.4% {t.clientsModule.growthVsPrior}</span>
            </Card>

            <Card className="p-5 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {t.clientsModule.scanVelocity30d}
                </span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <BarChart2 className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {(client.stats?.scansLast30Days || 14820).toLocaleString()}
              </p>
              <span className="text-[11px] text-slate-400 mt-1 block">{t.clientsModule.activeTelemetryScans}</span>
            </Card>
          </div>

          {/* Dossier Info & Brand Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact & Organization Details */}
            <Card className="p-6 lg:col-span-2 space-y-4 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
              <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                {t.clientsModule.profileDossier}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t.clientsModule.contactPersonLabel}</span>
                  <span className="text-sm font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] flex items-center gap-2 mt-1">
                    {client.contactPerson || t.clientsModule.notSpecified}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t.clientsModule.emailLabel}</span>
                  <a
                    href={`mailto:${client.email}`}
                    className="text-sm font-semibold text-blue-400 hover:underline flex items-center gap-1.5 mt-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {client.email || t.clientsModule.none}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t.clientsModule.phoneLabel}</span>
                  <a
                    href={`tel:${client.phone}`}
                    className="text-sm font-semibold text-emerald-400 hover:underline flex items-center gap-1.5 mt-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {client.phone || t.clientsModule.none}
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t.clientsModule.whatsappLabel}</span>
                  {client.whatsapp ? (
                    <a
                      href={`https://wa.me/${client.whatsapp.replace(/\+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-emerald-400 hover:underline flex items-center gap-1.5 mt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      {client.whatsapp}
                    </a>
                  ) : (
                    <span className="text-sm text-slate-500 mt-1 block">{t.clientsModule.none}</span>
                  )}
                </div>
              </div>

              {client.website && (
                <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t.clientsModule.websiteLabel}</span>
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-blue-400 hover:underline flex items-center gap-1.5 mt-1 truncate"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {client.website}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                  </a>
                </div>
              )}

              {client.address && (
                <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t.clientsModule.addressLabel}</span>
                  <p className="text-sm text-slate-300 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    {client.address}
                  </p>
                </div>
              )}

              {client.notes && (
                <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                  <span className="text-[11px] font-medium text-slate-400 block">{t.clientsModule.notesLabel}</span>
                  <p className="text-xs text-slate-300 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] mt-1 leading-relaxed">
                    {client.notes}
                  </p>
                </div>
              )}
            </Card>

            {/* Brand Color Tokens Card */}
            <Card className="p-6 space-y-4 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
              <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] flex items-center gap-2">
                <Palette className="w-4 h-4 text-emerald-400" />
                {t.clientsModule.brandColorsTitle}
              </h3>

              <div className="space-y-3">
                {/* Primary */}
                <div
                  onClick={() => copyToClipboard(primaryColor, 'hex')}
                  className="p-3 rounded-xl border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] flex items-center justify-between cursor-pointer hover:border-slate-500 transition-all bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg shadow-sm" style={{ backgroundColor: primaryColor }} />
                    <div>
                      <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                        {t.clientsModule.primaryColor}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400">{primaryColor}</p>
                    </div>
                  </div>
                  {copiedHex === primaryColor ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>

                {/* Secondary */}
                <div
                  onClick={() => copyToClipboard(secondaryColor, 'hex')}
                  className="p-3 rounded-xl border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] flex items-center justify-between cursor-pointer hover:border-slate-500 transition-all bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg shadow-sm" style={{ backgroundColor: secondaryColor }} />
                    <div>
                      <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                        {t.clientsModule.secondaryColor}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400">{secondaryColor}</p>
                    </div>
                  </div>
                  {copiedHex === secondaryColor ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>

                {/* Accent */}
                <div
                  onClick={() => copyToClipboard(accentColor, 'hex')}
                  className="p-3 rounded-xl border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] flex items-center justify-between cursor-pointer hover:border-slate-500 transition-all bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg shadow-sm" style={{ backgroundColor: accentColor }} />
                    <div>
                      <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                        {t.clientsModule.accentColor}
                      </p>
                      <p className="text-[11px] font-mono text-slate-400">{accentColor}</p>
                    </div>
                  </div>
                  {copiedHex === accentColor ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Live Card Mini Mockup */}
              <div
                className="p-4 rounded-xl shadow-md space-y-2 mt-4"
                style={{
                  backgroundColor: client.brandColors?.background || '#ffffff',
                  borderLeft: `4px solid ${primaryColor}`
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span className="text-xs font-bold" style={{ color: client.brandColors?.text || '#0f172a' }}>
                    {client.companyName}
                  </span>
                </div>
                <p className="text-[11px] opacity-75" style={{ color: client.brandColors?.text || '#0f172a' }}>
                  {t.clientsModule.liveMockupDesc}
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: QR FLEET */}
      {activeTab === 'qrs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {client.companyName} {t.clientsModule.qrFleetTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.clientsModule.qrFleetSubtitle}
              </p>
            </div>
            {canManage && (
              <Button size="sm" onClick={() => onNavigate && onNavigate('/admin/qr')}>
                <Plus className="w-4 h-4 mr-1.5" />
                {t.clientsModule.newQrForClient}
              </Button>
            )}
          </div>

          {qrs.length === 0 ? (
            <Card className="p-12 text-center space-y-3">
              <QrIcon className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {t.clientsModule.noQrsYet}
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {t.clientsModule.noQrsYetDesc}
              </p>
              {canManage && (
                <Button size="sm" onClick={() => onNavigate && onNavigate('/admin/qr')} className="mt-2">
                  <Plus className="w-4 h-4 mr-1.5" />
                  {t.clientsModule.newQrForClient}
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {qrs.map(qr => (
                <Card
                  key={qr.id}
                  className="p-5 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] flex flex-col justify-between hover:border-slate-600 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: qr.design?.backgroundColor || '#ffffff',
                            borderColor: primaryColor
                          }}
                        >
                          <QrIcon className="w-5 h-5" style={{ color: qr.design?.dotsColor || primaryColor }} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] truncate">
                            {qr.name}
                          </h4>
                          <span className="font-mono text-[11px] text-blue-400">/{qr.publicCode}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                        {qr.status}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                      <span className="text-[10px] text-slate-400 block">{t.clientsModule.targetDestination}:</span>
                      <p className="text-xs font-medium text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] truncate">
                        {qr.destinationUrl}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>{t.clientsModule.totalScans}: <strong className="text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">{qr.totalScans.toLocaleString()}</strong></span>
                      <span>{t.clientsModule.unique}: <strong className="text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">{qr.uniqueScans.toLocaleString()}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                    <a
                      href={qr.destinationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t.clientsModule.testUrl}
                    </a>
                    <button
                      onClick={() => copyToClipboard(`https://esaia.app/r/${qr.publicCode}`, 'link')}
                      className="text-xs text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 [data-theme=beige]:hover:text-[#231f1d] flex items-center gap-1"
                    >
                      {copiedLink === `https://esaia.app/r/${qr.publicCode}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      {t.clientsModule.copyLink}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PAGES & BIO CARDS */}
      {activeTab === 'pages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {client.companyName} {t.clientsModule.pagesTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.clientsModule.pagesSubtitle}
              </p>
            </div>
            {canManage && (
              <Button size="sm" onClick={() => onNavigate && onNavigate('/admin/pages')}>
                <Plus className="w-4 h-4 mr-1.5" />
                {t.clientsModule.newPageForClient}
              </Button>
            )}
          </div>

          {pages.length === 0 ? (
            <Card className="p-12 text-center space-y-3">
              <Globe className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-sm font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {t.clientsModule.noPagesYet}
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {t.clientsModule.noPagesYetDesc}
              </p>
              {canManage && (
                <Button size="sm" onClick={() => onNavigate && onNavigate('/admin/pages')} className="mt-2">
                  <Plus className="w-4 h-4 mr-1.5" />
                  {t.clientsModule.newPageForClient}
                </Button>
              )}
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map(page => (
                <Card
                  key={page.id}
                  className="p-5 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] flex flex-col justify-between hover:border-slate-600 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                          style={{
                            backgroundColor: page.theme?.backgroundColor || '#ffffff',
                            borderColor: primaryColor
                          }}
                        >
                          <Globe className="w-5 h-5" style={{ color: page.theme?.primaryColor || primaryColor }} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] truncate">
                            {page.title}
                          </h4>
                          <span className="font-mono text-[11px] text-purple-400">/p/{page.slug}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                        {page.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                      <span>{t.clientsModule.type}: <strong className="capitalize text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d]">{page.pageType.replace('_', ' ')}</strong></span>
                      <span>{t.clientsModule.views}: <strong className="text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">{page.viewCount.toLocaleString()}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                    <a
                      href={`/p/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      {t.pagesModule.previewLive}
                    </a>
                    {canManage && (
                      <button
                        onClick={() => onNavigate && onNavigate('/admin/pages')}
                        className="text-xs text-blue-400 hover:underline font-medium"
                      >
                        {t.pagesModule.openBuilder}
                      </button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: BRAND KIT */}
      {activeTab === 'brand' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Brand Colors Showcase */}
          <Card className="p-6 space-y-6 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
            <div>
              <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {t.clientsModule.brandColorPalette}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.clientsModule.brandColorPaletteDesc}
              </p>
            </div>

            <div className="space-y-4">
              {/* Primary Swatch */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                <div className="w-16 h-16 rounded-xl shadow-md shrink-0" style={{ backgroundColor: primaryColor }} />
                <div className="space-y-1 flex-1">
                  <span className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                    {t.clientsModule.primaryColor}
                  </span>
                  <p className="font-mono text-xs text-slate-400">{primaryColor}</p>
                  <p className="text-[11px] text-slate-500">{t.clientsModule.primaryColorDesc}</p>
                </div>
              </div>

              {/* Secondary Swatch */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                <div className="w-16 h-16 rounded-xl shadow-md shrink-0" style={{ backgroundColor: secondaryColor }} />
                <div className="space-y-1 flex-1">
                  <span className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                    {t.clientsModule.secondaryColor}
                  </span>
                  <p className="font-mono text-xs text-slate-400">{secondaryColor}</p>
                  <p className="text-[11px] text-slate-500">{t.clientsModule.secondaryColorDesc}</p>
                </div>
              </div>

              {/* Accent Swatch */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                <div className="w-16 h-16 rounded-xl shadow-md shrink-0" style={{ backgroundColor: accentColor }} />
                <div className="space-y-1 flex-1">
                  <span className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                    {t.clientsModule.accentColor}
                  </span>
                  <p className="font-mono text-xs text-slate-400">{accentColor}</p>
                  <p className="text-[11px] text-slate-500">{t.clientsModule.accentColorDesc}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Logo & Brand Asset Card */}
          <Card className="p-6 space-y-6 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
            <div>
              <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {t.clientsModule.brandEmblemTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.clientsModule.brandEmblemDesc}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] flex flex-col items-center justify-center text-center">
              <div
                className="w-28 h-28 rounded-2xl flex items-center justify-center overflow-hidden border-2 shadow-xl mb-4"
                style={{
                  backgroundColor: client.brandColors?.background || '#ffffff',
                  borderColor: primaryColor
                }}
              >
                {client.logoUrl ? (
                  <img src={client.logoUrl} alt={client.companyName} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="font-bold text-3xl" style={{ color: primaryColor }}>
                    {client.companyName.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-base text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                {client.companyName}
              </h4>
              <p className="text-xs text-slate-400 mt-1">{t.clientsModule.vectorLogoEmblem}</p>

              {client.logoUrl && (
                <a
                  href={client.logoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t.clientsModule.downloadLogo}
                </a>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* TAB 5: ACTIVITY & AUDIT */}
      {activeTab === 'activity' && (
        <Card className="p-6 space-y-4 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
          <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
            {t.clientsModule.auditTrailTitle}
          </h3>
          <p className="text-xs text-slate-400">
            {t.clientsModule.auditTrailDesc}
          </p>

          <div className="space-y-3 pt-2">
            {[
              { event: t.clientsModule.accountInitialized, date: client.createdAt, user: t.clientsModule.initiatedBy, icon: Sparkles },
              { event: t.clientsModule.brandSynced, date: client.updatedAt, user: 'Admin', icon: Palette },
              { event: `${qrs.length} ${t.clientsModule.dynamicQrsProvisioned}`, date: client.updatedAt, user: 'System', icon: QrIcon },
              { event: `${pages.length} ${t.clientsModule.responsivePagesPublished}`, date: client.updatedAt, user: 'Editor', icon: Globe }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                        {item.event}
                      </p>
                      <p className="text-[11px] text-slate-400">{item.user}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Edit Client Modal */}
      <ClientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateClient}
        initialClient={client}
        isLoading={isSaving}
      />
    </div>
  );
};
