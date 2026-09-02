/**
 * ESAIA - Media Library Manager View
 */

import React from 'react';
import { FolderOpen, Upload, Image as ImageIcon, FileText, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../context/LanguageContext';

export const MediaPage: React.FC = () => {
  const { t } = useLanguage();
  const assets = [
    { name: 'impact-hub-logo.svg', type: 'image/svg+xml', size: '24 KB', date: 'Aug 28, 2026' },
    { name: 'nile-beans-cover.jpg', type: 'image/jpeg', size: '1.2 MB', date: 'Aug 30, 2026' },
    { name: 'apex-investment-deck.pdf', type: 'application/pdf', size: '3.4 MB', date: 'Sep 01, 2026' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.mediaModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.mediaModule.subtitle}
          </p>
        </div>
        <Button leftIcon={<Upload className="w-4 h-4" />}>
          {t.mediaModule.uploadAssets}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map(asset => (
          <Card key={asset.name} padding="sm" className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#0e1017] border border-[#24293d] flex items-center justify-center text-blue-400 shrink-0">
                {asset.type.includes('image') ? <ImageIcon className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{asset.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{asset.size} • {asset.date}</p>
              </div>
            </div>
            <button className="text-slate-500 hover:text-rose-400 p-2" title={t.actions.delete}>
              <Trash2 className="w-4 h-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};
