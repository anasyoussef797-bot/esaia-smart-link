/**
 * ESAIA - Aggregated Analytics Dashboard
 */

import React from 'react';
import { BarChart3, TrendingUp, Smartphone, Globe, Calendar, Download, Eye, Activity } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { exportService } from '../../services/firebase/exportService';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const AnalyticsPage: React.FC = () => {
  const { currentOrg } = useAuth();
  const { t } = useLanguage();

  const handleExportCsv = () => {
    const data = [
      { Date: '2026-09-01', TotalScans: 4820, UniqueDevices: 3910, TopCity: 'Cairo', TopDevice: 'iOS' },
      { Date: '2026-09-02', TotalScans: 5120, UniqueDevices: 4200, TopCity: 'Alexandria', TopDevice: 'Android' }
    ];
    const csv = exportService.convertToCsv(data);
    exportService.downloadFile(csv, `esaia_analytics_${currentOrg?.id || 'org'}.csv`, 'text/csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.analyticsModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.analyticsModule.subtitle}
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExportCsv}
        >
          {t.analyticsModule.exportCsv}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="sm">
          <p className="text-xs text-slate-400">{t.analyticsModule.totalScans}</p>
          <p className="text-2xl font-bold text-white mt-1">1,489,200</p>
          <span className="text-[11px] text-emerald-400 font-medium mt-1 inline-block">+14% vs last period</span>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-slate-400">{t.analyticsModule.uniqueDevices}</p>
          <p className="text-2xl font-bold text-white mt-1">1,120,840</p>
          <span className="text-[11px] text-slate-400 mt-1 inline-block">75.2% unique ratio</span>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-slate-400">{t.analyticsModule.topOs}</p>
          <p className="text-2xl font-bold text-white mt-1">iOS (64%)</p>
          <span className="text-[11px] text-blue-400 mt-1 inline-block">Android: 34%</span>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-slate-400">{t.analyticsModule.peakHour}</p>
          <p className="text-2xl font-bold text-white mt-1">8:00 PM</p>
          <span className="text-[11px] text-amber-400 mt-1 inline-block">Evening hospitality surge</span>
        </Card>
      </div>

      {/* OS & City breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title={t.analyticsModule.osDeviceTypes} description={t.analyticsModule.osDeviceDesc} />
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Apple iOS (iPhone / iPad)</span>
                <span className="text-blue-400 font-semibold">64%</span>
              </div>
              <div className="w-full bg-[#0e1017] rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '64%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Google Android</span>
                <span className="text-emerald-400 font-semibold">34%</span>
              </div>
              <div className="w-full bg-[#0e1017] rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '34%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Desktop / Other</span>
                <span className="text-slate-400 font-semibold">2%</span>
              </div>
              <div className="w-full bg-[#0e1017] rounded-full h-2">
                <div className="bg-slate-500 h-2 rounded-full" style={{ width: '2%' }} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title={t.analyticsModule.geoLocations} description={t.analyticsModule.geoLocationsDesc} />
          <div className="space-y-2.5">
            {[
              { city: 'Cairo, Egypt', pct: '54%', count: '98,400 scans' },
              { city: 'Alexandria, Egypt', pct: '21%', count: '38,200 scans' },
              { city: 'Dubai, UAE', pct: '14%', count: '25,400 scans' },
              { city: 'Riyadh, Saudi Arabia', pct: '11%', count: '20,000 scans' }
            ].map(geo => (
              <div key={geo.city} className="flex items-center justify-between p-2.5 rounded-lg bg-[#0e1017] border border-[#1c2030] text-xs">
                <span className="text-slate-200 font-medium">{geo.city}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono">{geo.count}</span>
                  <Badge variant="brand">{geo.pct}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
