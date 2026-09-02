/**
 * ESAIA - Custom Domain & Whitelabel Routing View
 */

import React from 'react';
import { Globe, Plus, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

export const DomainsPage: React.FC = () => {
  const { t } = useLanguage();
  const domains = [
    {
      domain: 'qr.impacthub.eg',
      type: 'QR & Smart Link Domain',
      target: 'cname.esaia.app',
      status: 'active',
      ssl: 'Valid (Let\'s Encrypt)'
    },
    {
      domain: 'menu.nilecoffee.com',
      type: 'Public Landing Page Domain',
      target: 'cname.esaia.app',
      status: 'active',
      ssl: 'Valid (Let\'s Encrypt)'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.domainsModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.domainsModule.subtitle}
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>
          {t.domainsModule.connectDomain}
        </Button>
      </div>

      <div className="space-y-3">
        {domains.map(d => (
          <Card key={d.domain} padding="md" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white tracking-tight">{d.domain}</h3>
                  <Badge variant="success">{t.actions.active}</Badge>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{d.type} • Target: <code className="text-blue-400 font-mono">{d.target}</code></p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{d.ssl}</span>
              </div>
              <Button variant="outline" size="sm">
                {t.domainsModule.dnsSettings}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
