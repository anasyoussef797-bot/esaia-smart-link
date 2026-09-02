/**
 * ESAIA - Digital Business Cards (vCard) Manager View
 */

import React from 'react';
import { CreditCard, Plus, User, Phone, Mail, Globe, ExternalLink, Download } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useLanguage } from '../../context/LanguageContext';

export const CardsManagerPage: React.FC = () => {
  const { t } = useLanguage();
  const cards = [
    {
      id: 'card_1',
      fullName: 'Tariq Al-Masri',
      title: 'Managing Partner',
      company: 'Apex Capital Partners',
      slug: 'apex-tariq-vcard',
      email: 'tariq@apexcap.ae',
      phone: '+971 50 123 9988',
      scans: 3190
    },
    {
      id: 'card_2',
      fullName: 'Karim Mansour',
      title: 'Head of Ecosystem',
      company: 'Impact Hub Cairo',
      slug: 'karim-impact-vcard',
      email: 'karim@impacthub.eg',
      phone: '+20 100 123 4567',
      scans: 1840
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.cardsModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.cardsModule.subtitle}
          </p>
        </div>
        <Button leftIcon={<Plus className="w-4 h-4" />}>
          {t.cardsModule.createCard}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map(card => (
          <Card key={card.id} padding="md" className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-md">
                  {card.fullName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">{card.fullName}</h3>
                  <p className="text-xs text-slate-400">{card.title} • {card.company}</p>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>{card.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{card.phone}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#1c2030] flex items-center justify-between">
              <span className="text-xs font-medium text-blue-400">{card.scans} {t.cardsModule.vcardDownloads}</span>
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                onClick={() => window.open(`/p/${card.slug}`, '_blank')}
              >
                {t.cardsModule.previewCard}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
