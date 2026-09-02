/**
 * ESAIA - Public Landing Page Renderer (/p/:slug)
 * High-performance mobile-first responsive renderer for published client pages and menus.
 */

import React from 'react';
import { Smartphone, Globe, ExternalLink, QrCode } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export interface PublicPageRendererProps {
  slug: string;
}

export const PublicPageRenderer: React.FC<PublicPageRendererProps> = ({ slug }) => {
  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto my-auto space-y-6">
        {/* Brand Banner */}
        <div className="rounded-3xl border border-[#24293d] bg-[#141722] p-6 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-lg text-white font-bold text-xl">
            {slug.substring(0, 2).toUpperCase()}
          </div>
          <h1 className="text-xl font-bold text-white capitalize">{slug.replace(/-/g, ' ')}</h1>
          <p className="text-xs text-slate-400 mt-1">ESAIA Verified Public Experience</p>

          <div className="mt-6 space-y-2.5">
            <Button className="w-full" size="md">
              View Digital Catalog &amp; Menu
            </Button>
            <Button variant="secondary" className="w-full" size="md">
              Save Contact to Phone (.vcf)
            </Button>
            <Button variant="outline" className="w-full" size="md">
              Visit Official Website
            </Button>
          </div>
        </div>
      </div>

      {/* Powered by ESAIA Footer */}
      <footer className="py-4 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
        <QrCode className="w-3.5 h-3.5 text-blue-500" />
        <span>Powered by ESAIA Enterprise Platform</span>
      </footer>
    </div>
  );
};
