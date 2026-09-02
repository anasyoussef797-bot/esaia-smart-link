/**
 * ESAIA - Admin Dashboard Overview View
 */

import React from 'react';
import {
  Users,
  QrCode,
  Layers,
  Activity,
  TrendingUp,
  Plus,
  UploadCloud
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export interface OverviewPageProps {
  onNavigate: (path: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const { currentOrg } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { label: t.overview.activeClients, value: '1,048', change: '+12%', icon: <Users className="w-5 h-5 text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700" /> },
    { label: t.overview.dynamicQrCodes, value: '4,892', change: '+184', icon: <QrCode className="w-5 h-5 text-indigo-400 [data-theme=light]:text-indigo-600 [data-theme=beige]:text-indigo-700" /> },
    { label: t.overview.totalScans, value: '184,290', change: '+28.4%', icon: <Activity className="w-5 h-5 text-emerald-400 [data-theme=light]:text-emerald-600 [data-theme=beige]:text-emerald-700" /> },
    { label: t.overview.activeLandingPages, value: '724', change: '99.9%', icon: <Layers className="w-5 h-5 text-amber-400 [data-theme=light]:text-amber-600 [data-theme=beige]:text-amber-700" /> }
  ];

  const topQrs = [
    { name: 'Impact Hub Cairo - Reception', code: 'es_hub_rec', type: 'Digital Menu', scans: '14,820', status: 'active' },
    { name: 'Summer Expo 2026 Badge', code: 'es_expo26', type: 'vCard Card', scans: '9,410', status: 'active' },
    { name: 'Downtown Bistro Menu', code: 'es_bistro_m', type: 'Restaurant Menu', scans: '6,280', status: 'active' },
    { name: 'VIP Partner Brochure', code: 'es_vip_part', type: 'PDF Document', scans: '3,190', status: 'active' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#141722] via-[#1a1e2d] to-[#141722] [data-theme=light]:from-blue-50/60 [data-theme=light]:via-white [data-theme=light]:to-slate-50 [data-theme=beige]:from-[#eee9df]/80 [data-theme=beige]:via-white [data-theme=beige]:to-[#eee9df]/50 border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] p-6 rounded-2xl transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
              {currentOrg?.name || t.overview.welcomeTitle}
            </h1>
            <Badge variant="brand">{t.overview.enterpriseTier}</Badge>
          </div>
          <p className="text-xs text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#685f58] mt-1 max-w-xl">
            {t.overview.welcomeSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<UploadCloud className="w-4 h-4" />}
            onClick={() => onNavigate('/admin/import')}
          >
            {t.overview.bulkCsvImport}
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => onNavigate('/admin/qr/new')}
          >
            {t.overview.newDynamicQr}
          </Button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <Card key={stat.label} padding="sm" className="flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72]">{stat.label}</span>
              <div className="w-9 h-9 rounded-xl bg-[#1a1e2d] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eee9df] border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">{stat.value}</div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 [data-theme=light]:text-emerald-600 [data-theme=beige]:text-emerald-700 font-medium mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>{stat.change}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid: Scan Volume & Top QRs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Scan Activity Overview */}
        <Card className="lg:col-span-2">
          <CardHeader
            title={t.overview.systemTelemetry}
            description={t.overview.systemTelemetrySub}
            action={
              <Button variant="outline" size="sm" onClick={() => onNavigate('/admin/analytics')}>
                {t.nav.analytics}
              </Button>
            }
          />
          <div className="h-64 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fbf9f4] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] p-4 flex flex-col justify-between">
            {/* Visual Mini Chart Bars */}
            <div className="flex items-end justify-between h-44 gap-2 pt-4 px-2">
              {[45, 60, 52, 80, 95, 78, 110, 125, 140, 130, 165, 180, 195, 210].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div
                    style={{ height: `${(val / 220) * 100}%` }}
                    className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-sm group-hover:from-blue-500 group-hover:to-indigo-400 transition-all cursor-pointer relative"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1a1e2d] [data-theme=light]:bg-slate-900 [data-theme=beige]:bg-[#231f1d] text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#24293d] shadow-lg">
                      {val * 100} scans
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 [data-theme=light]:text-slate-400 [data-theme=beige]:text-[#847a72] px-2 pt-2 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
              <span>Aug 20</span>
              <span>Aug 25</span>
              <span>Aug 30</span>
              <span>Sep 02</span>
            </div>
          </div>
        </Card>

        {/* Right 1 Col: Top Performing Dynamic QR Codes */}
        <Card>
          <CardHeader
            title={t.overview.topPerformingQrs}
            description={t.overview.topPerformingQrsSub}
            action={
              <Button variant="ghost" size="sm" onClick={() => onNavigate('/admin/qr')}>
                {t.overview.viewAllQrs}
              </Button>
            }
          />
          <div className="space-y-3">
            {topQrs.map((item) => (
              <div
                key={item.code}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fbf9f4] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] hover:border-[#24293d] [data-theme=light]:hover:border-slate-300 [data-theme=beige]:hover:border-[#cec3b1] transition-colors"
              >
                <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                  <p className="text-xs font-semibold text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72] font-mono mt-0.5">/q/{item.code}</p>
                </div>
                <div className="text-right rtl:text-left shrink-0">
                  <p className="text-xs font-bold text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700">{item.scans}</p>
                  <p className="text-[10px] text-slate-500 [data-theme=light]:text-slate-400 [data-theme=beige]:text-[#847a72]">{t.actions.details}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

