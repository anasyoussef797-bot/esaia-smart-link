/**
 * ESAIA - Security & Audit Log View
 */

import React from 'react';
import { ShieldCheck, User, Clock, Globe } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

export const AuditPage: React.FC = () => {
  const { t } = useLanguage();
  const logs = [
    {
      id: 'log_1',
      actor: 'anasyoussef797@gmail.com',
      action: 'qr.update_destination',
      target: '/q/es_hub_rec',
      ip: '197.38.112.44',
      time: '12 minutes ago'
    },
    {
      id: 'log_2',
      actor: 'system.migration_engine',
      action: 'migration.batch_import',
      target: '1,048 records imported',
      ip: 'Internal Cloud Function',
      time: '1 hour ago'
    },
    {
      id: 'log_3',
      actor: 'admin@esaia.app',
      action: 'page.publish',
      target: '/p/nile-menu-2026',
      ip: '156.204.18.91',
      time: '3 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{t.auditModule.title}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t.auditModule.subtitle}
        </p>
      </div>

      <div className="space-y-2.5">
        {logs.map(log => (
          <Card key={log.id} padding="sm" className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0e1017] border border-[#24293d] flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  <span className="font-mono text-blue-400">{log.action}</span> by {log.actor}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Target: {log.target}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
              <span>{log.ip}</span>
              <span>{log.time}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
