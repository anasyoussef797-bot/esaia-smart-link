/**
 * ESAIA - Enterprise White-Label Branding Engine
 * Custom logos, favicons, custom platform titles, domain footers,
 * removal of "Powered by", and custom email/SMTP signatures.
 */

import React, { useState } from 'react';
import {
  Palette,
  Check,
  Save,
  RotateCcw,
  Sparkles,
  Shield,
  Eye,
  Mail,
  FileText,
  Upload,
  Globe,
  Sliders,
  ExternalLink,
  Laptop,
  Smartphone
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { WhiteLabelBranding } from '../../types/auth';

const COLOR_PRESETS = [
  { name: 'Sapphire Modern', hex: '#2563eb' },
  { name: 'Emerald Hospitality', hex: '#059669' },
  { name: 'Midnight Amber', hex: '#d97706' },
  { name: 'Imperial Violet', hex: '#7c3aed' },
  { name: 'Crimson Rose', hex: '#e11d48' },
  { name: 'Obsidian Slate', hex: '#334155' }
];

export const WhiteLabelPage: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const { currentOrg, updateCurrentOrgBranding, isOrgAdmin } = useAuth();
  const { showToast } = useNotification();
  const { t } = useLanguage();

  const orgBranding = currentOrg?.branding || {};

  // Form State
  const [platformName, setPlatformName] = useState(orgBranding.platformName || currentOrg?.name || 'ESAIA');
  const [tagline, setTagline] = useState(orgBranding.tagline || 'Enterprise Dynamic QR & Mobile Micro-Sites');
  const [logoLightUrl, setLogoLightUrl] = useState(orgBranding.logoLightUrl || '');
  const [logoDarkUrl, setLogoDarkUrl] = useState(orgBranding.logoDarkUrl || '');
  const [faviconUrl, setFaviconUrl] = useState(orgBranding.faviconUrl || '');
  const [accentColor, setAccentColor] = useState(orgBranding.accentColor || '#2563eb');
  const [hidePoweredBy, setHidePoweredBy] = useState(orgBranding.hidePoweredBy ?? true);
  const [footerCopyright, setFooterCopyright] = useState(
    orgBranding.footerCopyright || `© ${new Date().getFullYear()} ${currentOrg?.name || 'Impact Hub Cairo'}. All rights reserved.`
  );
  const [supportEmail, setSupportEmail] = useState(orgBranding.supportEmail || 'support@impacthub.eg');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState(orgBranding.privacyPolicyUrl || 'https://impacthub.eg/privacy');
  const [termsOfServiceUrl, setTermsOfServiceUrl] = useState(orgBranding.termsOfServiceUrl || 'https://impacthub.eg/terms');
  const [senderName, setSenderName] = useState(orgBranding.senderName || `${currentOrg?.name || 'Impact Hub'} Notifications`);
  const [senderEmail, setSenderEmail] = useState(orgBranding.senderEmail || 'alerts@qr.impacthub.eg');
  const [emailSignature, setEmailSignature] = useState(
    orgBranding.emailSignature || `Best regards,\n${currentOrg?.name || 'Impact Hub Cairo'} Digital Fleet Team\nCairo, Egypt`
  );

  const [isSaving, setIsSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<'portal' | 'mobile_footer' | 'email'>('portal');

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated: WhiteLabelBranding = {
        platformName,
        tagline,
        logoLightUrl: logoLightUrl || null,
        logoDarkUrl: logoDarkUrl || null,
        faviconUrl: faviconUrl || null,
        accentColor,
        hidePoweredBy,
        footerCopyright,
        supportEmail,
        privacyPolicyUrl,
        termsOfServiceUrl,
        senderName,
        senderEmail,
        emailSignature
      };

      await updateCurrentOrgBranding(updated);
      showToast({
        title: 'White-Label Branding Applied',
        message: 'Your custom logos, colors, and email signatures are now active across your organization workspace.',
        type: 'success'
      });
    } catch (err) {
      showToast({
        title: 'Failed to Save Branding',
        message: 'Could not update organization branding. Please check permissions.',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setPlatformName(currentOrg?.name || 'ESAIA');
    setTagline('Enterprise Dynamic QR & Mobile Micro-Sites');
    setLogoLightUrl('');
    setLogoDarkUrl('');
    setFaviconUrl('');
    setAccentColor('#2563eb');
    setHidePoweredBy(true);
    setFooterCopyright(`© ${new Date().getFullYear()} ${currentOrg?.name || 'Organization'}. All rights reserved.`);
    setSupportEmail('support@impacthub.eg');
    setPrivacyPolicyUrl('https://impacthub.eg/privacy');
    setTermsOfServiceUrl('https://impacthub.eg/terms');
    setSenderName(`${currentOrg?.name || 'Organization'} Alerts`);
    setSenderEmail('alerts@qr.impacthub.eg');
    setEmailSignature(`Best regards,\n${currentOrg?.name || 'Organization'} Team`);
    showToast({
      title: 'Reset to Defaults',
      message: 'Default branding values restored.',
      type: 'info'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
              White-Label Enterprise Branding
            </h1>
            <Badge variant="primary" size="sm">
              ENTERPRISE TIER
            </Badge>
          </div>
          <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] mt-1">
            Customize platform logos, custom domain footers, and outgoing notification signatures for your agency or enterprise brand.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigate && (
            <Button variant="outline" size="sm" onClick={() => onNavigate('/admin/settings')}>
              Back to Settings
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={handleReset}
          >
            Reset
          </Button>

          {isOrgAdmin() && (
            <Button
              id="save-whitelabel-btn"
              variant="primary"
              size="sm"
              isLoading={isSaving}
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Configuration Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Platform Identity */}
          <Card padding="md">
            <CardHeader
              title="Platform Identity & Titles"
              description="Define the brand name that clients and team members see instead of default platform labels."
            />
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  Platform Name
                </label>
                <Input
                  value={platformName}
                  onChange={e => setPlatformName(e.target.value)}
                  placeholder="e.g. Impact Hub QR Suite or Apex Media Portal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  Brand Tagline / Slogan
                </label>
                <Input
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="e.g. Enterprise Smart QR & Connected Hospitality"
                />
              </div>
            </div>
          </Card>

          {/* Visual Brand Assets */}
          <Card padding="md">
            <CardHeader
              title="Visual Assets & Brand Colors"
              description="Provide custom SVG or PNG image URLs for your organization's logos and favicons."
            />
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    Dark Mode Logo URL
                  </label>
                  <Input
                    value={logoDarkUrl}
                    onChange={e => setLogoDarkUrl(e.target.value)}
                    placeholder="https://cdn.brand.com/logo-light.svg"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Rendered on dark theme backgrounds.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    Light Mode Logo URL
                  </label>
                  <Input
                    value={logoLightUrl}
                    onChange={e => setLogoLightUrl(e.target.value)}
                    placeholder="https://cdn.brand.com/logo-dark.svg"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">Rendered on light / beige backgrounds.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  Custom Favicon URL (.ico / .svg / .png)
                </label>
                <Input
                  value={faviconUrl}
                  onChange={e => setFaviconUrl(e.target.value)}
                  placeholder="https://cdn.brand.com/favicon.png"
                />
              </div>

              {/* Accent Color Palette */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-2">
                  Primary Brand Accent Color
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {COLOR_PRESETS.map(preset => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setAccentColor(preset.hex)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition ${
                        accentColor === preset.hex
                          ? 'border-white [data-theme=light]:border-slate-900 bg-slate-800 [data-theme=light]:bg-slate-200 text-white [data-theme=light]:text-slate-900 shadow-sm'
                          : 'border-[#24293d] [data-theme=light]:border-slate-200 hover:border-slate-500 text-slate-300 [data-theme=light]:text-slate-700'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.hex }} />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={e => setAccentColor(e.target.value)}
                    className="w-9 h-9 rounded-lg bg-transparent border border-[#24293d] cursor-pointer p-0.5"
                  />
                  <Input
                    value={accentColor}
                    onChange={e => setAccentColor(e.target.value)}
                    placeholder="#2563eb"
                    className="font-mono w-32"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Domain Footers & Powered-By Removal */}
          <Card padding="md">
            <CardHeader
              title="Footers & 'Powered by' Whitelabeling"
              description="Configure public-facing footer copyrights, support contacts, and compliance links."
            />
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#eae4d9]/50 border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
                <div>
                  <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                    Hide "Powered by ESAIA" Badge
                  </p>
                  <p className="text-[11px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] mt-0.5">
                    Completely removes third-party attribution badges on all public landing pages and QR scan redirects.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={hidePoweredBy}
                  onChange={e => setHidePoweredBy(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  Footer Copyright Line
                </label>
                <Input
                  value={footerCopyright}
                  onChange={e => setFooterCopyright(e.target.value)}
                  placeholder="e.g. © 2026 Impact Hub Cairo. All rights reserved."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    Support Contact Email
                  </label>
                  <Input
                    value={supportEmail}
                    onChange={e => setSupportEmail(e.target.value)}
                    placeholder="support@brand.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    Privacy Policy URL
                  </label>
                  <Input
                    value={privacyPolicyUrl}
                    onChange={e => setPrivacyPolicyUrl(e.target.value)}
                    placeholder="https://brand.com/privacy"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Email / SMTP Signatures */}
          <Card padding="md">
            <CardHeader
              title="Automated Email & Alert Signatures"
              description="Customize the sender display and footer signatures for client invites and monthly scan reports."
            />
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    Sender Display Name
                  </label>
                  <Input
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder="e.g. Impact Hub Cairo Alerts"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    From Email Address
                  </label>
                  <Input
                    value={senderEmail}
                    onChange={e => setSenderEmail(e.target.value)}
                    placeholder="notifications@qr.impacthub.eg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  Email Footer Signature
                </label>
                <textarea
                  rows={3}
                  value={emailSignature}
                  onChange={e => setEmailSignature(e.target.value)}
                  className="w-full text-xs font-mono rounded-lg bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#fbf9f4] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] p-2.5 text-slate-200 [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Form: Live Interactive Preview Container (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-20">
            <Card padding="md" className="space-y-4 border-blue-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                    Live Branded Preview
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Real-time
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
                <button
                  type="button"
                  onClick={() => setPreviewTab('portal')}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition ${
                    previewTab === 'portal'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
                  }`}
                >
                  Portal Header
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('mobile_footer')}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition ${
                    previewTab === 'mobile_footer'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
                  }`}
                >
                  Page Footer
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('email')}
                  className={`flex-1 py-1 px-2 text-xs font-medium rounded-md transition ${
                    previewTab === 'email'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
                  }`}
                >
                  Alert Email
                </button>
              </div>

              {/* Preview Window Frame */}
              <div className="rounded-xl border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] overflow-hidden bg-[#090b10] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#f4efe6]">
                {/* Browser-like window header */}
                <div className="px-3 py-2 bg-[#141722] [data-theme=light]:bg-slate-200 [data-theme=beige]:border-b [data-theme=beige]:bg-[#eae4d9] border-b border-[#24293d] [data-theme=light]:border-slate-300 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="truncate max-w-[180px]">{previewTab === 'portal' ? 'qr.impacthub.eg/admin' : 'menu.nilecoffee.com'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </div>

                {/* Preview Content */}
                <div className="p-4 space-y-4">
                  {previewTab === 'portal' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white border border-[#1c2030] [data-theme=light]:border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm"
                            style={{ backgroundColor: accentColor }}
                          >
                            {platformName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white [data-theme=light]:text-slate-900 leading-tight">
                              {platformName}
                            </p>
                            <p className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 leading-tight">
                              {tagline}
                            </p>
                          </div>
                        </div>

                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-semibold text-white"
                          style={{ backgroundColor: accentColor }}
                        >
                          Workspace
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-[#141722]/50 border border-dashed border-[#24293d] text-center py-6">
                        <p className="text-xs text-slate-400">
                          Branded client dashboard loaded with accent <code className="font-mono text-blue-400">{accentColor}</code>.
                        </p>
                      </div>
                    </div>
                  )}

                  {previewTab === 'mobile_footer' && (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white border border-[#1c2030] [data-theme=light]:border-slate-200 text-center space-y-2">
                        <p className="text-xs text-slate-300 [data-theme=light]:text-slate-800">
                          {footerCopyright}
                        </p>
                        <div className="flex items-center justify-center gap-3 text-[10px] text-blue-400">
                          <a href="#" onClick={e => e.preventDefault()} className="hover:underline">
                            Privacy Policy
                          </a>
                          <span>•</span>
                          <a href="#" onClick={e => e.preventDefault()} className="hover:underline">
                            Terms of Service
                          </a>
                          <span>•</span>
                          <a href="#" onClick={e => e.preventDefault()} className="hover:underline">
                            Support ({supportEmail})
                          </a>
                        </div>

                        {!hidePoweredBy && (
                          <p className="text-[9px] text-slate-500 pt-1">
                            Powered by ESAIA Cloud
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {previewTab === 'email' && (
                    <div className="p-3 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white border border-[#1c2030] [data-theme=light]:border-slate-200 text-xs space-y-3 font-sans">
                      <div className="border-b border-[#24293d] [data-theme=light]:border-slate-200 pb-2">
                        <p className="text-[11px] text-slate-400">
                          From: <strong className="text-white [data-theme=light]:text-slate-900">{senderName}</strong> &lt;{senderEmail}&gt;
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Subject: <strong>Your Weekly QR Analytics Summary</strong>
                        </p>
                      </div>
                      <p className="text-slate-300 [data-theme=light]:text-slate-700 leading-relaxed">
                        Hello team,<br />
                        Your dynamic QR campaigns received <strong>14,892 total scans</strong> across Cairo and Alexandria this week.
                      </p>
                      <div className="border-t border-[#24293d] [data-theme=light]:border-slate-200 pt-2 text-[11px] text-slate-400 whitespace-pre-line font-mono">
                        {emailSignature}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status summary */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 [data-theme=light]:text-slate-500 pt-1">
                <span>Active Workspace:</span>
                <strong className="text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                  {currentOrg?.name || 'Impact Hub Cairo'}
                </strong>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
