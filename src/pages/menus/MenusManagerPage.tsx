/**
 * ESAIA - Interactive Digital Menus & Catalogs Manager View
 * Full support for culinary and beverage items, dietary badges, WhatsApp ordering,
 * and 1-click dynamic QR linking.
 */

import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Plus, Sparkles, ExternalLink, QrCode, Coffee, Eye } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types/page';
import { pageService } from '../../services/firebase/pageService';

export const MenusManagerPage: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [menus, setMenus] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenus() {
      setLoading(true);
      try {
        const pages = await pageService.getPagesByOrg('org_esaia_main');
        const menuPages = pages.filter(p => p.pageType === 'menu');
        setMenus(menuPages);
      } catch (err) {
        console.error('Error loading menus:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMenus();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.menusModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.menusModule.tableSideDesc}
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => onNavigate && onNavigate('/admin/pages')}
        >
          {t.menusModule.createMenu}
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-mono">{t.menusModule.loadingMenus}</p>
        </div>
      ) : menus.length === 0 ? (
        <Card padding="lg" className="text-center py-16">
          <UtensilsCrossed className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">{t.menusModule.noMenus}</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">{t.menusModule.noMenusDesc}</p>
          <Button size="sm" onClick={() => onNavigate && onNavigate('/admin/pages')}>
            {t.menusModule.createMenuBtn}
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {menus.map(menu => {
            const categories = menu.blocks
              .filter(b => b.type === 'menu_category')
              .map(b => b.content.name)
              .slice(0, 4);
            const itemCount = menu.blocks.filter(b => b.type === 'menu_item').length;

            return (
              <Card key={menu.id} padding="md" className="flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-white tracking-tight">{menu.title}</h3>
                      <p className="text-xs font-mono text-blue-400 mt-1">/p/{menu.slug}</p>
                    </div>
                    <Badge variant="success">{t.menusModule.activeBadge}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {categories.length > 0 ? (
                      categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#0e1017] text-slate-300 border border-[#1c2030]"
                        >
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-500">{t.menusModule.specialtyMenu}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-5 p-2.5 rounded-lg bg-[#0e1017] border border-[#1c2030] text-xs">
                    <span className="text-slate-400">{itemCount} {t.menusModule.dishesItems}</span>
                    <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{(menu.viewCount || 0).toLocaleString()} {t.menusModule.liveVisits}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1c2030] flex items-center justify-between gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    onClick={() => window.open(`/p/${menu.slug}`, '_blank')}
                  >
                    {t.menusModule.preview}
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                    onClick={() => onNavigate && onNavigate(`/admin/pages/builder/${menu.id}`)}
                  >
                    {t.menusModule.openBuilder}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
