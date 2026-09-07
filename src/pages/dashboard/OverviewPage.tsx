/**
 * ESAIA - Admin Dashboard Overview View
 * Fully responsive across Mobile, Tablet, and Desktop with fluid motion animations,
 * interactive KPI cards, telemetry charts, and rapid actions.
 */

import React from 'react';
import {
  Users,
  QrCode,
  Layers,
  Activity,
  TrendingUp,
  Plus,
  UploadCloud,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
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
  const { t, isRTL } = useLanguage();

  const stats = [
    { label: t.overview.activeClients, value: '1,048', change: '+12%', icon: <Users className="w-5 h-5 text-blue-400" /> },
    { label: t.overview.dynamicQrCodes, value: '4,892', change: '+184', icon: <QrCode className="w-5 h-5 text-indigo-400" /> },
    { label: t.overview.totalScans, value: '184,290', change: '+28.4%', icon: <Activity className="w-5 h-5 text-emerald-400" /> },
    { label: t.overview.activeLandingPages, value: '724', change: '99.9%', icon: <Layers className="w-5 h-5 text-amber-400" /> }
  ];

  const topQrs = [
    { name: 'Impact Hub Cairo - Reception', code: 'es_hub_rec', type: 'Digital Menu', scans: '14,820', status: 'active' },
    { name: 'Summer Expo 2026 Badge', code: 'es_expo26', type: 'vCard Card', scans: '9,410', status: 'active' },
    { name: 'Downtown Bistro Menu', code: 'es_bistro_m', type: 'Restaurant Menu', scans: '6,280', status: 'active' },
    { name: 'VIP Partner Brochure', code: 'es_vip_part', type: 'PDF Document', scans: '3,190', status: 'active' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-5 sm:space-y-6"
    >
      {/* Top Banner / Welcome with Responsive Actions */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#141722] via-[#1a1e2d] to-[#141722] border border-[#24293d] p-4 sm:p-6 rounded-2xl transition-all shadow-sm"
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {currentOrg?.name || t.overview.welcomeTitle}
            </h1>
            <Badge variant="brand">{t.overview.enterpriseTier}</Badge>
          </div>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            {t.overview.welcomeSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<UploadCloud className="w-4 h-4" />}
            onClick={() => onNavigate('/admin/import')}
            className="flex-1 sm:flex-initial"
          >
            {t.overview.bulkCsvImport}
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => onNavigate('/admin/qr/new')}
            className="flex-1 sm:flex-initial"
          >
            {t.overview.newDynamicQr}
          </Button>
        </div>
      </motion.div>

      {/* Primary KPI Grid - 1 Col Mobile, 2 Col Tablet, 4 Col Desktop */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {stats.map(stat => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.18 }}
          >
            <Card padding="sm" className="flex flex-col justify-between h-full hoverable">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <div className="w-9 h-9 rounded-xl bg-[#1a1e2d] border border-[#24293d] flex items-center justify-center shadow-xs">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Grid: Scan Volume & Top QRs */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Left 2 Cols: Scan Activity Overview */}
        <Card className="lg:col-span-2">
          <CardHeader
            title={t.overview.systemTelemetry}
            description={t.overview.systemTelemetrySub}
            action={
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                onClick={() => onNavigate('/admin/analytics')}
              >
                {t.nav.analytics}
              </Button>
            }
          />
          <div className="h-64 rounded-xl bg-[#0e1017] border border-[#1c2030] p-4 flex flex-col justify-between overflow-hidden">
            {/* Visual Mini Chart Bars with fluid responsive heights */}
            <div className="flex items-end justify-between h-44 gap-1.5 sm:gap-2 pt-4 px-1 sm:px-2">
              {[45, 60, 52, 80, 95, 78, 110, 125, 140, 130, 165, 180, 195, 210].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / 220) * 100}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.02, ease: 'easeOut' }}
                    className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-md group-hover:from-blue-400 group-hover:to-indigo-400 transition-colors cursor-pointer relative"
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1a1e2d] text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#24293d] shadow-lg z-10">
                      {val * 100} scans
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-2 pt-2 border-t border-[#1c2030]">
              <span>Aug 20</span>
              <span className="hidden sm:inline">Aug 25</span>
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
          <div className="space-y-2.5">
            {topQrs.map((item, i) => (
              <motion.div
                key={item.code}
                whileHover={{ x: isRTL ? -3 : 3 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0e1017] border border-[#1c2030] hover:border-blue-500/30 transition-all cursor-pointer"
                onClick={() => onNavigate('/admin/qr')}
              >
                <div className="min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                  <p className="text-xs font-semibold text-slate-200 truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">/q/{item.code}</p>
                </div>
                <div className="text-right rtl:text-left shrink-0">
                  <p className="text-xs font-bold text-blue-400">{item.scans}</p>
                  <p className="text-[10px] text-slate-500">{t.actions.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};
