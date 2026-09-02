/**
 * ESAIA - Digital Menus Manager View
 */

import React from 'react';
import { UtensilsCrossed, Plus, Sparkles, ExternalLink } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

export const MenusManagerPage: React.FC = () => {
  const { t } = useLanguage();
  const menus = [
    {
      id: 'menu_1',
      title: 'Nile Artisan - Main Specialty Coffee & Pastries',
      slug: 'nile-menu-2026',
      itemsCount: 38,
      categories: ['Espresso Bar', 'Pour Over', 'Bakery', 'Matcha'],
      scans: 6280
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.menusModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.menusModule.subtitle}
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>
          {t.menusModule.createMenu}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {menus.map(menu => (
          <Card key={menu.id} padding="md" className="flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold text-white tracking-tight">{menu.title}</h3>
                <Badge variant="success">{t.actions.active}</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {menu.categories.map(cat => (
                  <span key={cat} className="text-[10px] px-2 py-0.5 rounded-md bg-[#0e1017] text-slate-300 border border-[#1c2030]">
                    {cat}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-5 p-2.5 rounded-lg bg-[#0e1017] border border-[#1c2030] text-xs">
                <span className="text-slate-400">{menu.itemsCount} {t.menusModule.menuItems}</span>
                <span className="text-blue-400 font-bold">{menu.scans.toLocaleString()} {t.menusModule.guestScans}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c2030] flex justify-end">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => window.open(`/p/${menu.slug}`, '_blank')}
              >
                {t.menusModule.viewLiveMenu}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
