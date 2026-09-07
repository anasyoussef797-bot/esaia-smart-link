/**
 * ESAIA - Digital Business Cards (vCard) Manager View
 * Dedicated vCard fleet management with RFC 6350 .vcf generation,
 * dynamic QR bindings, and Client CRM brand association.
 */

import React, { useState, useEffect } from 'react';
import { CreditCard, Plus, User, Phone, Mail, Globe, ExternalLink, Download, Sparkles, QrCode } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { Page } from '../../types/page';
import { pageService } from '../../services/firebase/pageService';
import { downloadVCard } from '../../utils/vcard';

export const CardsManagerPage: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [cards, setCards] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCards() {
      setLoading(true);
      try {
        const pages = await pageService.getPagesByOrg('org_esaia_main');
        const vcardPages = pages.filter(p => p.pageType === 'business_card');
        setCards(vcardPages);
      } catch (err) {
        console.error('Error loading vcards:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCards();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.cardsModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.cardsModule.manageProfiles || t.cardsModule.subtitle}
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => onNavigate && onNavigate('/admin/pages')}
        >
          {t.cardsModule.createCard}
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-mono">{t.cardsModule.loadingCards || 'Loading Digital Cards...'}</p>
        </div>
      ) : cards.length === 0 ? (
        <Card padding="lg" className="text-center py-16">
          <CreditCard className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">{t.cardsModule.noCards}</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">{t.cardsModule.noCardsDesc}</p>
          <Button size="sm" onClick={() => onNavigate && onNavigate('/admin/pages')}>
            {t.cardsModule.createVCard}
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map(card => {
            const vcardBlock = card.blocks.find(b => b.type === 'vcard_header')?.content || {};
            return (
              <Card key={card.id} padding="md" className="flex flex-col justify-between hover:border-slate-700 transition-colors">
                <div>
                  <div className="flex items-center gap-3">
                    {vcardBlock.avatarUrl ? (
                      <img
                        src={vcardBlock.avatarUrl}
                        alt={vcardBlock.fullName}
                        className="w-12 h-12 rounded-full object-cover border border-slate-700 shadow-md"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-md">
                        {vcardBlock.fullName?.charAt(0) || card.title.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-white tracking-tight truncate">
                        {vcardBlock.fullName || card.title}
                      </h3>
                      <p className="text-xs text-blue-400 truncate">{vcardBlock.jobTitle || t.cardsModule.executive}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 truncate font-medium">
                    {vcardBlock.company || 'Enterprise Partner'}
                  </p>

                  <div className="space-y-1.5 mt-4 text-xs text-slate-300">
                    {vcardBlock.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="font-mono text-xs">{vcardBlock.phone}</span>
                      </div>
                    )}
                    {vcardBlock.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{vcardBlock.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-5 p-2.5 rounded-lg bg-[#0e1017] border border-[#1c2030] text-xs">
                    <span className="text-slate-400 font-mono">/p/{card.slug}</span>
                    <span className="text-blue-400 font-bold">{(card.viewCount || 0).toLocaleString()} {t.pagesModule.viewsCount}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1c2030] flex items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                    onClick={() =>
                      downloadVCard({
                        fullName: vcardBlock.fullName || card.title,
                        jobTitle: vcardBlock.jobTitle,
                        company: vcardBlock.company,
                        phone: vcardBlock.phone,
                        email: vcardBlock.email,
                        website: vcardBlock.website,
                        address: vcardBlock.address
                      })
                    }
                  >
                    .vcf
                  </Button>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                      onClick={() => window.open(`/p/${card.slug}`, '_blank')}
                    >
                      {t.cardsModule.preview}
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                      onClick={() => onNavigate && onNavigate(`/admin/pages/builder/${card.id}`)}
                    >
                      {t.cardsModule.builder}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
