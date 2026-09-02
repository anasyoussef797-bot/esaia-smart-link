/**
 * ESAIA - Templates Marketplace View
 */

import React from 'react';
import { Sparkles, UtensilsCrossed, CreditCard, Layers, Globe, ArrowRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

export const TemplatesPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const templates = [
    {
      id: 'tpl_bistro',
      title: 'Artisan Cafe & Restaurant Menu',
      category: 'Hospitality',
      description: 'Clean dark/light digital menu with allergen icons, category pills, and currency formatting.',
      icon: <UtensilsCrossed className="w-5 h-5 text-amber-400" />
    },
    {
      id: 'tpl_vcard',
      title: 'Executive vCard & Portfolio',
      category: 'Networking',
      description: 'Direct contact download, social link hubs, and executive biography layout.',
      icon: <CreditCard className="w-5 h-5 text-blue-400" />
    },
    {
      id: 'tpl_event',
      title: 'Conference & Event Pass Portal',
      category: 'Events',
      description: 'Schedule overview, speaker profiles, and live venue map coordinates.',
      icon: <Layers className="w-5 h-5 text-indigo-400" />
    },
    {
      id: 'tpl_linktree',
      title: 'Multi-Link Bio Hub',
      category: 'Social',
      description: 'Compact link listing with custom banner graphics and video embedding support.',
      icon: <Globe className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{t.templatesModule.title}</h1>
        <p className="text-xs text-slate-400 mt-1">
          {t.templatesModule.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {templates.map(tpl => (
          <Card key={tpl.id} padding="md" className="flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#0e1017] border border-[#24293d] flex items-center justify-center">
                  {tpl.icon}
                </div>
                <Badge variant="brand">{tpl.category}</Badge>
              </div>
              <h3 className="text-base font-semibold text-white mt-4">{tpl.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{tpl.description}</p>
            </div>

            <div className="mt-6 pt-3 border-t border-[#1c2030] flex justify-end">
              <Button
                size="sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => onNavigate('/admin/pages')}
              >
                {t.templatesModule.useTemplate}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
