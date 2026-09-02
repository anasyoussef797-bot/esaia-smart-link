/**
 * ESAIA - Smart Links & Shortener Management View
 */

import React, { useState } from 'react';
import { Link2, Plus, Search, ExternalLink, Copy, Check } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';

export const LinksManagerPage: React.FC = () => {
  const { showToast } = useNotification();
  const { t } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const links = [
    {
      id: 'link_1',
      title: 'Main Instagram Bio Link',
      slug: 'insta-bio',
      destinationUrl: 'https://esaia.app/p/hub-welcome',
      clicks: 8490,
      status: 'active'
    },
    {
      id: 'link_2',
      title: 'LinkedIn Campaign Fall 2026',
      slug: 'linkedin-fall',
      destinationUrl: 'https://impacthub.cairo/membership?utm_source=linkedin',
      clicks: 3120,
      status: 'active'
    }
  ];

  const handleCopy = (slug: string, id: string) => {
    navigator.clipboard.writeText(`https://esaia.app/go/${slug}`);
    setCopiedId(id);
    showToast('success', t.linksModule.copied, `https://esaia.app/go/${slug}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.linksModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.linksModule.subtitle}
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>
          {t.linksModule.createLink}
        </Button>
      </div>

      <div className="space-y-3">
        {links.map(link => (
          <Card key={link.id} padding="sm" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm font-semibold text-white tracking-tight">{link.title}</h3>
                <Badge variant="brand">/go/{link.slug}</Badge>
                <Badge variant="success">{t.actions.active}</Badge>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1 truncate max-w-lg">{link.destinationUrl}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right pr-2">
                <p className="text-xs font-bold text-blue-400">{link.clicks.toLocaleString()}</p>
                <p className="text-[10px] text-slate-500">{t.linksModule.clicks}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={copiedId === link.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                onClick={() => handleCopy(link.slug, link.id)}
              >
                {copiedId === link.id ? t.linksModule.copied : t.linksModule.copy}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
