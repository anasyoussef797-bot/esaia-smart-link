/**
 * ESAIA - Dynamic QR Code Management View
 */

import React, { useState } from 'react';
import { QrCode, Plus, Search, Play, Pause, ExternalLink, Sparkles } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { QrCode as QrCodeType } from '../../types/qr';

export const QrManagerPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { showToast } = useNotification();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewQrModalOpen, setIsNewQrModalOpen] = useState(false);
  const [qrName, setQrName] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');

  const [qrs, setQrs] = useState<QrCodeType[]>([
    {
      id: 'qr_1',
      orgId: 'org_esaia_main',
      clientId: 'client_1',
      name: 'Impact Hub Cairo - Reception & Wifi',
      publicCode: 'es_hub_rec',
      destinationType: 'url',
      destinationUrl: 'https://impacthub.cairo/welcome',
      status: 'active',
      totalScans: 14820,
      uniqueScans: 11200,
      styleConfig: {
        foregroundColor: '#0f172a',
        backgroundColor: '#ffffff',
        errorCorrectionLevel: 'M',
        moduleStyle: 'rounded',
        eyeStyle: 'rounded',
        logoSizeRatio: 0.15,
        quietZoneModules: 4,
        frameStyle: 'none',
        logoBackgroundPunchout: true,
        scannabilityGrade: 'A'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'qr_2',
      orgId: 'org_esaia_main',
      clientId: 'client_2',
      name: 'Nile Artisan - Summer Specialty Menu',
      publicCode: 'es_nile_menu',
      destinationType: 'menu',
      destinationUrl: 'https://esaia.app/p/nile-menu-2026',
      status: 'active',
      totalScans: 6280,
      uniqueScans: 5120,
      styleConfig: {
        foregroundColor: '#78350f',
        backgroundColor: '#fef3c7',
        errorCorrectionLevel: 'H',
        moduleStyle: 'dots',
        eyeStyle: 'circle',
        logoSizeRatio: 0.18,
        quietZoneModules: 4,
        frameStyle: 'none',
        logoBackgroundPunchout: true,
        scannabilityGrade: 'A'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'qr_3',
      orgId: 'org_esaia_main',
      clientId: 'client_3',
      name: 'Apex Capital - Executive vCard',
      publicCode: 'es_apex_tariq',
      destinationType: 'vcard',
      destinationUrl: 'https://esaia.app/p/apex-tariq-vcard',
      status: 'active',
      totalScans: 3190,
      uniqueScans: 2840,
      styleConfig: {
        foregroundColor: '#1e3a8a',
        backgroundColor: '#ffffff',
        errorCorrectionLevel: 'M',
        moduleStyle: 'square',
        eyeStyle: 'square',
        logoSizeRatio: 0.15,
        quietZoneModules: 4,
        frameStyle: 'none',
        logoBackgroundPunchout: true,
        scannabilityGrade: 'A'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const toggleQrStatus = (qrId: string) => {
    setQrs(prev =>
      prev.map(item => {
        if (item.id === qrId) {
          const nextStatus = item.status === 'active' ? 'paused' : 'active';
          showToast(
            'info',
            t.actions.status,
            `${item.name} -> ${nextStatus}`
          );
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleCreateQr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrName || !destinationUrl) return;

    const publicCode = `es_${Math.random().toString(36).substring(2, 8)}`;
    const newQr: QrCodeType = {
      id: `qr_${Date.now()}`,
      orgId: 'org_esaia_main',
      clientId: 'client_1',
      name: qrName,
      publicCode,
      destinationType: 'url',
      destinationUrl,
      status: 'active',
      totalScans: 0,
      uniqueScans: 0,
      styleConfig: {
        foregroundColor: '#0f172a',
        backgroundColor: '#ffffff',
        errorCorrectionLevel: 'M',
        moduleStyle: 'rounded',
        eyeStyle: 'rounded',
        logoSizeRatio: 0.15,
        quietZoneModules: 4,
        frameStyle: 'none',
        logoBackgroundPunchout: true,
        scannabilityGrade: 'A'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setQrs(prev => [newQr, ...prev]);
    setIsNewQrModalOpen(false);
    setQrName('');
    setDestinationUrl('');
    showToast('success', t.qrModule.modalTitle, `/q/${publicCode}`);
  };

  const filtered = qrs.filter(q =>
    q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.publicCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.destinationUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.qrModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.qrModule.subtitle}
          </p>
        </div>
        <Button
          id="create-qr-btn"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsNewQrModalOpen(true)}
        >
          {t.qrModule.createQr}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <Input
            id="qr-search-input"
            placeholder={t.qrModule.searchPlaceholder}
            leftIcon={<Search className="w-4 h-4" />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Dynamic QR Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(qr => (
          <Card key={qr.id} padding="md" className="flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              {/* Header & Status */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">{qr.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/40">
                      /q/{qr.publicCode}
                    </span>
                    <Badge variant={qr.status === 'active' ? 'success' : 'warning'}>
                      {qr.status === 'active' ? t.qrModule.statusActive : t.qrModule.statusPaused}
                    </Badge>
                  </div>
                </div>
                <button
                  id={`toggle-status-${qr.id}`}
                  onClick={() => toggleQrStatus(qr.id)}
                  className="p-1.5 rounded-lg bg-[#0e1017] hover:bg-[#1a1e2d] text-slate-400 hover:text-white border border-[#24293d] transition-colors"
                  title={qr.status === 'active' ? t.qrModule.pauseCampaign : t.qrModule.resumeCampaign}
                >
                  {qr.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>

              {/* Destination URL */}
              <div className="mt-4 p-2.5 rounded-lg bg-[#0e1017] border border-[#1c2030] text-xs">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">{t.qrModule.destinationUrlLabel}</p>
                <p className="text-slate-300 truncate mt-0.5 font-mono">{qr.destinationUrl}</p>
              </div>

              {/* Scannability Grade & Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 rounded-lg bg-[#0e1017] border border-[#1c2030]">
                  <p className="text-[10px] text-slate-500 uppercase">Grade</p>
                  <p className="text-xs font-bold text-emerald-400 mt-0.5">Grade A (99%)</p>
                </div>
                <div className="p-2 rounded-lg bg-[#0e1017] border border-[#1c2030]">
                  <p className="text-[10px] text-slate-500 uppercase">{t.overview.totalScans}</p>
                  <p className="text-xs font-bold text-slate-200 mt-0.5">{qr.totalScans.toLocaleString()}</p>
                </div>
                <div className="p-2 rounded-lg bg-[#0e1017] border border-[#1c2030]">
                  <p className="text-[10px] text-slate-500 uppercase">Type</p>
                  <p className="text-xs font-bold text-indigo-400 mt-0.5 capitalize">{qr.destinationType}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-3 border-t border-[#1c2030] flex items-center justify-between gap-2">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => window.open(`/q/${qr.publicCode}`, '_blank')}
              >
                {t.qrModule.testRedirect}
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                onClick={() => onNavigate(`/admin/qr/editor/${qr.id}`)}
              >
                {t.qrModule.customDesign}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal: Create QR */}
      <Modal
        isOpen={isNewQrModalOpen}
        onClose={() => setIsNewQrModalOpen(false)}
        title={t.qrModule.modalTitle}
        description={t.qrModule.modalSubtitle}
      >
        <form onSubmit={handleCreateQr} className="space-y-4">
          <Input
            id="create-qr-name"
            label={t.qrModule.qrNameLabel}
            placeholder={t.qrModule.qrNamePlaceholder}
            value={qrName}
            onChange={e => setQrName(e.target.value)}
            required
          />
          <Input
            id="create-qr-url"
            label={t.qrModule.destinationUrlLabel}
            placeholder={t.qrModule.destinationUrlPlaceholder}
            value={destinationUrl}
            onChange={e => setDestinationUrl(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2.5 pt-4">
            <Button variant="ghost" type="button" onClick={() => setIsNewQrModalOpen(false)}>
              {t.actions.cancel}
            </Button>
            <Button type="submit">
              {t.qrModule.createBtn}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
