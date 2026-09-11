/**
 * ESAIA - Enterprise White-Label Branding Engine
 * Custom logos, favicons, custom platform titles, domain footers,
 * removal of "Powered by", and custom email/SMTP signatures.
 */

import React, { useState, useEffect } from 'react';
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
  Smartphone,
  Send,
  Phone,
  HelpCircle,
  Code
} from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { useLanguage } from '../../context/LanguageContext';
import { WhiteLabelBranding } from '../../types/auth';
import { BrandAssetUploader } from './components/BrandAssetUploader';

const COLOR_PRESETS = [
  { name: 'Sapphire Modern', hex: '#2563eb' },
  { name: 'Emerald Hospitality', hex: '#059669' },
  { name: 'Midnight Amber', hex: '#d97706' },
  { name: 'Imperial Violet', hex: '#7c3aed' },
  { name: 'Crimson Rose', hex: '#e11d48' },
  { name: 'Obsidian Slate', hex: '#334155' }
];

export const WhiteLabelPage: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const { currentOrg, updateCurrentOrgBranding, isOrgAdmin, user } = useAuth();
  const { showToast } = useNotification();
  const { t, isRTL } = useLanguage();

  const orgBranding = currentOrg?.branding || {};

  const COLOR_PRESETS = [
    { name: t.whiteLabelModule?.sectionIdentity.presets.sapphire || 'Sapphire Modern', hex: '#2563eb' },
    { name: t.whiteLabelModule?.sectionIdentity.presets.emerald || 'Emerald Hospitality', hex: '#059669' },
    { name: t.whiteLabelModule?.sectionIdentity.presets.amber || 'Midnight Amber', hex: '#d97706' },
    { name: t.whiteLabelModule?.sectionIdentity.presets.violet || 'Imperial Violet', hex: '#7c3aed' },
    { name: t.whiteLabelModule?.sectionIdentity.presets.crimson || 'Crimson Rose', hex: '#e11d48' },
    { name: t.whiteLabelModule?.sectionIdentity.presets.obsidian || 'Obsidian Slate', hex: '#334155' }
  ];

  // Form State
  const [platformName, setPlatformName] = useState(orgBranding.platformName || currentOrg?.name || 'ESAIA');
  const [tagline, setTagline] = useState(orgBranding.tagline || 'Enterprise Dynamic QR & Mobile Micro-Sites');
  const [logoUrl, setLogoUrl] = useState(orgBranding.logoUrl || '');
  const [logoLightUrl, setLogoLightUrl] = useState(orgBranding.logoLightUrl || '');
  const [logoDarkUrl, setLogoDarkUrl] = useState(orgBranding.logoDarkUrl || '');
  const [faviconUrl, setFaviconUrl] = useState(orgBranding.faviconUrl || '');
  const [accentColor, setAccentColor] = useState(orgBranding.accentColor || '#2563eb');
  const [hidePoweredBy, setHidePoweredBy] = useState(orgBranding.hidePoweredBy ?? true);
  const [footerText, setFooterText] = useState(orgBranding.footerText || '');
  const [footerCopyright, setFooterCopyright] = useState(
    orgBranding.footerCopyright || `© ${new Date().getFullYear()} ${currentOrg?.name || 'Enterprise Client'}. All rights reserved.`
  );
  const [supportEmail, setSupportEmail] = useState(orgBranding.supportEmail || 'support@enterprise.eg');
  const [privacyPolicyUrl, setPrivacyPolicyUrl] = useState(orgBranding.privacyPolicyUrl || 'https://enterprise.eg/privacy');
  const [termsOfServiceUrl, setTermsOfServiceUrl] = useState(orgBranding.termsOfServiceUrl || 'https://enterprise.eg/terms');
  
  // Email / SMTP State
  const [senderName, setSenderName] = useState(orgBranding.senderName || `${currentOrg?.name || 'Enterprise'} Notifications`);
  const [senderEmail, setSenderEmail] = useState(orgBranding.senderEmail || 'notifications@qr.enterprise.eg');
  const [senderRole, setSenderRole] = useState(orgBranding.senderRole || 'Digital Fleet & Operations Team');
  const [senderPhone, setSenderPhone] = useState(orgBranding.senderPhone || '+20 100 123 4567');
  const [emailSignature, setEmailSignature] = useState(
    orgBranding.emailSignature || `Best regards,\n${currentOrg?.name || 'Enterprise'} Digital Fleet Team\nCairo, Egypt`
  );
  const [emailDisclaimer, setEmailDisclaimer] = useState(
    orgBranding.emailDisclaimer || 'CONFIDENTIALITY NOTICE: This transmission and any attachments are intended exclusively for the named addressee. Unauthorized distribution or copying is strictly prohibited.'
  );
  const [customCss, setCustomCss] = useState(orgBranding.customCss || '');

  const [isSaving, setIsSaving] = useState(false);
  const [previewTab, setPreviewTab] = useState<'portal' | 'mobile_footer' | 'email' | 'tab'>('portal');

  // Test Email Simulator Modal
  const [isTestEmailOpen, setIsTestEmailOpen] = useState(false);
  const [testRecipient, setTestRecipient] = useState(user?.email || 'admin@enterprise.eg');
  const [isSendingTest, setIsSendingTest] = useState(false);

  // Synchronize browser tab title and favicon in real-time when editing
  useEffect(() => {
    if (faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = faviconUrl;
    }
  }, [faviconUrl]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated: WhiteLabelBranding = {
        platformName,
        tagline,
        logoUrl: logoUrl || logoDarkUrl || logoLightUrl || null,
        logoLightUrl: logoLightUrl || null,
        logoDarkUrl: logoDarkUrl || null,
        faviconUrl: faviconUrl || null,
        accentColor,
        hidePoweredBy,
        poweredByBadge: !hidePoweredBy,
        footerText: footerText.trim() || undefined,
        footerCopyright,
        supportEmail,
        privacyPolicyUrl,
        termsOfServiceUrl,
        senderName,
        senderEmail,
        senderRole,
        senderPhone,
        emailSignature,
        emailDisclaimer,
        customCss
      };

      await updateCurrentOrgBranding(updated);
      showToast({
        title: t.whiteLabelModule?.savedSuccess || 'White-Label Branding Applied',
        message: t.whiteLabelModule?.savedSuccess || 'Your custom branding is now active across your organization workspace.',
        type: 'success'
      });
    } catch (err) {
      showToast({
        title: 'Error',
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
    setLogoUrl('');
    setLogoLightUrl('');
    setLogoDarkUrl('');
    setFaviconUrl('');
    setAccentColor('#2563eb');
    setHidePoweredBy(true);
    setFooterText('');
    setFooterCopyright(`© ${new Date().getFullYear()} ${currentOrg?.name || 'Organization'}. All rights reserved.`);
    setSupportEmail('support@enterprise.eg');
    setPrivacyPolicyUrl('https://enterprise.eg/privacy');
    setTermsOfServiceUrl('https://enterprise.eg/terms');
    setSenderName(`${currentOrg?.name || 'Organization'} Alerts`);
    setSenderEmail('alerts@qr.enterprise.eg');
    setSenderRole('Digital Fleet & Operations Team');
    setSenderPhone('+20 100 123 4567');
    setEmailSignature(`Best regards,\n${currentOrg?.name || 'Organization'} Team`);
    setEmailDisclaimer('CONFIDENTIALITY NOTICE: This transmission is intended solely for the addressee.');
    setCustomCss('');
    showToast({
      title: t.whiteLabelModule?.reset || 'Reset',
      message: 'Default branding values restored.',
      type: 'info'
    });
  };

  const handleSendTestEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingTest(true);
    setTimeout(() => {
      setIsSendingTest(false);
      setIsTestEmailOpen(false);
      showToast({
        title: t.whiteLabelModule?.sectionEmail.testSentSuccess || 'Test Email Dispatched',
        message: `${testRecipient}`,
        type: 'success'
      });
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
              {t.whiteLabelModule?.title || 'White-Label Enterprise Branding'}
            </h1>
            <Badge variant="brand" size="sm">
              {t.whiteLabelModule?.enterpriseTier || 'ENTERPRISE TIER'}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] mt-1">
            {t.whiteLabelModule?.subtitle || 'Customize platform logos, favicons, custom domain footers, and outgoing notification signatures for your agency or enterprise brand.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onNavigate && (
            <Button variant="outline" size="sm" onClick={() => onNavigate('/admin/settings')}>
              {t.whiteLabelModule?.backToSettings || 'Back to Settings'}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            leftIcon={<RotateCcw className="w-4 h-4" />}
            onClick={handleReset}
          >
            {t.whiteLabelModule?.reset || 'Reset'}
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
              {isSaving ? (t.whiteLabelModule?.saving || 'Saving...') : (t.whiteLabelModule?.saveChanges || 'Save Changes')}
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Configuration Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Section 1: Platform Identity */}
          <Card padding="md">
            <CardHeader
              title={t.whiteLabelModule?.sectionIdentity.title || 'Platform Identity & Titles'}
              description={t.whiteLabelModule?.sectionIdentity.description || 'Define the brand name and slogan that clients and team members see instead of default platform labels.'}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  {t.whiteLabelModule?.sectionIdentity.platformName || 'Platform Name / Application Title'}
                </label>
                <Input
                  value={platformName}
                  onChange={e => setPlatformName(e.target.value)}
                  placeholder={t.whiteLabelModule?.sectionIdentity.platformNamePlaceholder || 'e.g. Apex Media QR Suite or Impact Hub Portal'}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  {t.whiteLabelModule?.sectionIdentity.tagline || 'Brand Tagline / Slogan'}
                </label>
                <Input
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder={t.whiteLabelModule?.sectionIdentity.taglinePlaceholder || 'e.g. Enterprise Smart QR & Connected Hospitality'}
                />
              </div>

              {/* Accent Color Palette */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-2">
                  {t.whiteLabelModule?.sectionIdentity.accentColor || 'Primary Brand Accent Color'}
                </label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {COLOR_PRESETS.map(preset => (
                    <button
                      key={preset.hex}
                      type="button"
                      onClick={() => setAccentColor(preset.hex)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
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

          {/* Section 2: Visual Brand Asset Uploaders */}
          <Card padding="md">
            <CardHeader
              title={t.whiteLabelModule?.sectionLogos.title || 'Brand Logos & Favicon Upload'}
              description={t.whiteLabelModule?.sectionLogos.description || 'Upload high-resolution vector or raster graphics for light theme, dark theme, and browser tab favicons.'}
            />
            <div className="space-y-6">
              {/* Dark Mode Logo Uploader */}
              <BrandAssetUploader
                label={t.whiteLabelModule?.sectionLogos.darkLogoLabel || 'Dark Theme Logo (Header & Dark Mode)'}
                description={t.whiteLabelModule?.sectionLogos.darkLogoDesc || 'Displayed across dark dashboard headers and dark micro-sites. Usually white or colored text.'}
                value={logoDarkUrl}
                onChange={val => {
                  setLogoDarkUrl(val);
                  if (!logoUrl) setLogoUrl(val);
                }}
                recommendedSize={t.whiteLabelModule?.sectionLogos.recommendedLogoSize || '400 × 120 px SVG or PNG'}
              />

              <div className="border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]" />

              {/* Light Mode Logo Uploader */}
              <BrandAssetUploader
                label={t.whiteLabelModule?.sectionLogos.lightLogoLabel || 'Light Theme Logo (Public Pages & Light Mode)'}
                description={t.whiteLabelModule?.sectionLogos.lightLogoDesc || 'Displayed across light/beige backgrounds, public bio pages, and mobile redirects.'}
                value={logoLightUrl}
                onChange={val => {
                  setLogoLightUrl(val);
                  if (!logoUrl) setLogoUrl(val);
                }}
                recommendedSize={t.whiteLabelModule?.sectionLogos.recommendedLogoSize || '400 × 120 px SVG or PNG'}
              />

              <div className="border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]" />

              {/* Favicon Uploader */}
              <BrandAssetUploader
                label={t.whiteLabelModule?.sectionLogos.faviconLabel || 'Browser Tab Favicon'}
                description={t.whiteLabelModule?.sectionLogos.faviconDesc || 'The icon displayed in the browser tab and mobile home-screen bookmarks (.ico, .png, .svg).'}
                value={faviconUrl}
                onChange={setFaviconUrl}
                accept=".ico,image/x-icon,image/png,image/svg+xml"
                recommendedSize={t.whiteLabelModule?.sectionLogos.recommendedFaviconSize || '64 × 64 px or 32 × 32 px'}
                isFavicon
              />
            </div>
          </Card>

          {/* Section 3: Custom Domain Footers & Attributions */}
          <Card padding="md">
            <CardHeader
              title={t.whiteLabelModule?.sectionFooter.title || 'Custom Domain Footers & Attribution'}
              description={t.whiteLabelModule?.sectionFooter.description || 'Configure public-facing footer copyrights, support contacts, compliance links, and white-label badges.'}
            />
            <div className="space-y-4">
              {/* Hide Powered By Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#eae4d9]/50 border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
                <div>
                  <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                    {t.whiteLabelModule?.sectionFooter.hideBadgeTitle || 'Hide "Powered by ESAIA" Badge'}
                  </p>
                  <p className="text-[11px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] mt-0.5">
                    {t.whiteLabelModule?.sectionFooter.hideBadgeDesc || 'Completely removes third-party attribution badges on all public landing pages and QR scan redirects.'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={hidePoweredBy}
                  onChange={e => setHidePoweredBy(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              {/* Custom Footer Subtitle */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  {t.whiteLabelModule?.sectionFooter.headlineLabel || 'Custom Public Footer Headline (Optional)'}
                </label>
                <Input
                  value={footerText}
                  onChange={e => setFooterText(e.target.value)}
                  placeholder={t.whiteLabelModule?.sectionFooter.headlinePlaceholder || `e.g. ${platformName} Verified Enterprise Experience`}
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  {t.whiteLabelModule?.sectionFooter.headlineHint || 'Replaces the default verification text at the bottom of public mobile pages.'}
                </p>
              </div>

              {/* Footer Copyright */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  {t.whiteLabelModule?.sectionFooter.copyrightLabel || 'Footer Copyright Line'}
                </label>
                <Input
                  value={footerCopyright}
                  onChange={e => setFooterCopyright(e.target.value)}
                  placeholder={t.whiteLabelModule?.sectionFooter.copyrightPlaceholder || 'e.g. © 2026 Impact Hub Cairo. All rights reserved.'}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    {t.whiteLabelModule?.sectionFooter.supportEmail || 'Support Contact Email'}
                  </label>
                  <Input
                    type="email"
                    value={supportEmail}
                    onChange={e => setSupportEmail(e.target.value)}
                    placeholder="support@yourbrand.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    {t.whiteLabelModule?.sectionFooter.privacyPolicy || 'Privacy Policy URL'}
                  </label>
                  <Input
                    value={privacyPolicyUrl}
                    onChange={e => setPrivacyPolicyUrl(e.target.value)}
                    placeholder="https://yourbrand.com/privacy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  {t.whiteLabelModule?.sectionFooter.termsOfService || 'Terms of Service URL'}
                </label>
                <Input
                  value={termsOfServiceUrl}
                  onChange={e => setTermsOfServiceUrl(e.target.value)}
                  placeholder="https://yourbrand.com/terms"
                />
              </div>

              {/* Optional Custom CSS */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d]">
                    {t.whiteLabelModule?.sectionFooter.customCssLabel || 'Custom Public CSS (Advanced)'}
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {t.whiteLabelModule?.sectionFooter.optional || 'Optional'}
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={customCss}
                  onChange={e => setCustomCss(e.target.value)}
                  placeholder={t.whiteLabelModule?.sectionFooter.customCssPlaceholder || ":root { --brand-font: 'Poppins', sans-serif; }"}
                  className="w-full text-xs font-mono rounded-lg bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#fbf9f4] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] p-2.5 text-slate-200 [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>
          </Card>

          {/* Section 4: Email & SMTP Signatures */}
          <Card padding="md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <CardHeader
                title={t.whiteLabelModule?.sectionEmail.title || 'Automated Email & SMTP Signatures'}
                description={t.whiteLabelModule?.sectionEmail.description || 'Customize sender headers and corporate signatures for client invitations, password resets, and automated monthly analytics digests.'}
              />
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={() => setIsTestEmailOpen(true)}
              >
                {t.whiteLabelModule?.sectionEmail.sendTestBtn || 'Send Test Email'}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    {t.whiteLabelModule?.sectionEmail.senderName || 'Sender Display Name'}
                  </label>
                  <Input
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder={t.whiteLabelModule?.sectionEmail.senderNamePlaceholder || 'e.g. Apex Media Notifications'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    {t.whiteLabelModule?.sectionEmail.senderEmail || 'From / Reply-To Email'}
                  </label>
                  <Input
                    type="email"
                    value={senderEmail}
                    onChange={e => setSenderEmail(e.target.value)}
                    placeholder={t.whiteLabelModule?.sectionEmail.senderEmailPlaceholder || 'notifications@qr.yourbrand.com'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    {t.whiteLabelModule?.sectionEmail.senderRole || 'Sender Department / Title'}
                  </label>
                  <Input
                    value={senderRole}
                    onChange={e => setSenderRole(e.target.value)}
                    placeholder={t.whiteLabelModule?.sectionEmail.senderRolePlaceholder || 'e.g. Digital Fleet & Operations Team'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                    {t.whiteLabelModule?.sectionEmail.senderPhone || 'Contact Phone / WhatsApp'}
                  </label>
                  <Input
                    value={senderPhone}
                    onChange={e => setSenderPhone(e.target.value)}
                    placeholder={t.whiteLabelModule?.sectionEmail.senderPhonePlaceholder || 'e.g. +20 100 123 4567'}
                    leftIcon={<Phone className="w-3.5 h-3.5 text-slate-400" />}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  {t.whiteLabelModule?.sectionEmail.signatureBody || 'Email Footer Signature Body'}
                </label>
                <textarea
                  rows={3}
                  value={emailSignature}
                  onChange={e => setEmailSignature(e.target.value)}
                  className="w-full text-xs font-mono rounded-lg bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#fbf9f4] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] p-2.5 text-slate-200 [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                  {t.whiteLabelModule?.sectionEmail.disclaimer || 'Legal Confidentiality Disclaimer (Notice)'}
                </label>
                <textarea
                  rows={2}
                  value={emailDisclaimer}
                  onChange={e => setEmailDisclaimer(e.target.value)}
                  className="w-full text-[11px] font-sans rounded-lg bg-[#0e1017] [data-theme=light]:bg-white [data-theme=beige]:bg-[#fbf9f4] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] p-2.5 text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#8c7e73] focus:outline-hidden focus:border-blue-500"
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
                    {t.whiteLabelModule?.livePreview.title || 'Live Branded Preview'}
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {t.whiteLabelModule?.livePreview.realTime || 'Real-time'}
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
                <button
                  type="button"
                  onClick={() => setPreviewTab('portal')}
                  className={`flex-1 py-1 px-1.5 text-[11px] font-medium rounded-md transition cursor-pointer ${
                    previewTab === 'portal'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
                  }`}
                >
                  {t.whiteLabelModule?.livePreview.portalTab || 'Portal'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('mobile_footer')}
                  className={`flex-1 py-1 px-1.5 text-[11px] font-medium rounded-md transition cursor-pointer ${
                    previewTab === 'mobile_footer'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
                  }`}
                >
                  {t.whiteLabelModule?.livePreview.footerTab || 'Footer'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('email')}
                  className={`flex-1 py-1 px-1.5 text-[11px] font-medium rounded-md transition cursor-pointer ${
                    previewTab === 'email'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
                  }`}
                >
                  {t.whiteLabelModule?.livePreview.emailTab || 'Email'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('tab')}
                  className={`flex-1 py-1 px-1.5 text-[11px] font-medium rounded-md transition cursor-pointer ${
                    previewTab === 'tab'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white [data-theme=light]:text-slate-600 [data-theme=light]:hover:text-slate-900'
                  }`}
                >
                  {t.whiteLabelModule?.livePreview.faviconTab || 'Favicon'}
                </button>
              </div>

              {/* Preview Window Frame */}
              <div className="rounded-xl border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] overflow-hidden bg-[#090b10] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#f4efe6]">
                {/* Browser-like window header */}
                <div className="px-3 py-2 bg-[#141722] [data-theme=light]:bg-slate-200 [data-theme=beige]:bg-[#eae4d9] border-b border-[#24293d] [data-theme=light]:border-slate-300 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="truncate max-w-[180px]">
                    {previewTab === 'portal'
                      ? `qr.${currentOrg?.slug || 'enterprise'}.app/admin`
                      : previewTab === 'tab'
                      ? `${platformName} | Dashboard`
                      : 'menu.cairolounge.eg'}
                  </span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </div>

                {/* Preview Content */}
                <div className="p-4 space-y-4">
                  {/* Tab 1: Portal Header */}
                  {previewTab === 'portal' && (
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white border border-[#1c2030] [data-theme=light]:border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {logoDarkUrl || logoUrl ? (
                            <img
                              src={logoDarkUrl || logoUrl}
                              alt={platformName}
                              className="h-8 max-w-[120px] object-contain"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm"
                              style={{ backgroundColor: accentColor }}
                            >
                              {platformName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-white [data-theme=light]:text-slate-900 leading-tight truncate">
                              {platformName}
                            </p>
                            <p className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 leading-tight truncate">
                              {tagline}
                            </p>
                          </div>
                        </div>

                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-semibold text-white shrink-0"
                          style={{ backgroundColor: accentColor }}
                        >
                          Enterprise
                        </span>
                      </div>

                      <div className="p-4 rounded-lg bg-[#141722]/50 border border-dashed border-[#24293d] text-center space-y-1">
                        <p className="text-xs text-slate-300 [data-theme=light]:text-slate-700">
                          {t.whiteLabelModule?.livePreview.portalNotice || 'Workspace navigation and client bio cards branded under'} <strong>{platformName}</strong>.
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {t.whiteLabelModule?.livePreview.accentToken || 'Accent token active:'} <code className="font-mono text-blue-400">{accentColor}</code>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Mobile Public Footer */}
                  {previewTab === 'mobile_footer' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white border border-[#1c2030] [data-theme=light]:border-slate-200 text-center space-y-2.5">
                        {logoLightUrl || logoUrl ? (
                          <div className="flex justify-center mb-1">
                            <img
                              src={logoLightUrl || logoUrl}
                              alt={platformName}
                              className="h-6 max-w-[100px] object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : null}

                        {footerText ? (
                          <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900">
                            {footerText}
                          </p>
                        ) : (
                          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-slate-300 [data-theme=light]:text-slate-800">
                            <Shield className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{t.whiteLabelModule?.livePreview.verifiedFooter || `${platformName} Verified Enterprise Experience`}</span>
                          </div>
                        )}

                        <p className="text-[11px] text-slate-400 [data-theme=light]:text-slate-600">
                          {footerCopyright}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-2.5 text-[10px]" style={{ color: accentColor }}>
                          <a href="#" onClick={e => e.preventDefault()} className="hover:underline">
                            {t.whiteLabelModule?.sectionFooter.privacyPolicy || 'Privacy Policy'}
                          </a>
                          <span>•</span>
                          <a href="#" onClick={e => e.preventDefault()} className="hover:underline">
                            {t.whiteLabelModule?.sectionFooter.termsOfService || 'Terms of Service'}
                          </a>
                          <span>•</span>
                          <a href="#" onClick={e => e.preventDefault()} className="hover:underline">
                            {t.whiteLabelModule?.sectionFooter.supportEmail || 'Support'} ({supportEmail})
                          </a>
                        </div>

                        {!hidePoweredBy && (
                          <p className="text-[9px] text-slate-500 pt-1 border-t border-[#1c2030] [data-theme=light]:border-slate-200">
                            {t.whiteLabelModule?.livePreview.poweredBy || 'Powered by'} {platformName || 'ESAIA Smart Platform'} · {t.whiteLabelModule?.livePreview.sslEncrypted || 'SSL Encrypted'}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Email Notification & Signature */}
                  {previewTab === 'email' && (
                    <div className="p-3.5 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white border border-[#1c2030] [data-theme=light]:border-slate-200 text-xs space-y-3 font-sans">
                      <div className="border-b border-[#24293d] [data-theme=light]:border-slate-200 pb-2 space-y-0.5">
                        <p className="text-[11px] text-slate-400">
                          {t.whiteLabelModule?.livePreview.emailFrom || 'From:'} <strong className="text-white [data-theme=light]:text-slate-900">{senderName}</strong> &lt;{senderEmail}&gt;
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {t.whiteLabelModule?.livePreview.emailSubject || 'Subject:'} <strong>{t.whiteLabelModule?.livePreview.emailSubjectValue || 'Dynamic Fleet Performance Report'}</strong>
                        </p>
                      </div>

                      {logoLightUrl || logoUrl ? (
                        <div className="pb-1">
                          <img
                            src={logoLightUrl || logoUrl}
                            alt={platformName}
                            className="h-5 object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : null}

                      <p className="text-slate-300 [data-theme=light]:text-slate-700 leading-relaxed text-[11px] whitespace-pre-line">
                        {t.whiteLabelModule?.livePreview.emailGreeting || 'Hello Partner,\nYour dynamic QR campaigns recorded 18,420 scans across regions with zero bounce errors.'}
                      </p>

                      <div className="pt-2 border-t border-[#24293d] [data-theme=light]:border-slate-200 space-y-1">
                        <p className="font-semibold text-white [data-theme=light]:text-slate-900 text-[11px]">
                          {senderName}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {senderRole} • {senderPhone}
                        </p>
                        <div className="text-[10px] text-slate-400 whitespace-pre-line font-mono pt-1">
                          {emailSignature}
                        </div>
                      </div>

                      {emailDisclaimer && (
                        <div className="pt-2 border-t border-[#1c2030] [data-theme=light]:border-slate-100 text-[9px] text-slate-500 leading-tight">
                          {emailDisclaimer}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 4: Browser Favicon Tab Mockup */}
                  {previewTab === 'tab' && (
                    <div className="p-4 rounded-lg bg-[#0e1017] [data-theme=light]:bg-white border border-[#1c2030] [data-theme=light]:border-slate-200 space-y-3 text-center">
                      <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900">
                        {t.whiteLabelModule?.livePreview.tabTitleSim || 'Browser Tab & Bookmark Simulation'}
                      </p>
                      
                      {/* Browser Tab Chrome Mockup */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-[#1a1e2d] [data-theme=light]:bg-slate-200 border-t border-x border-[#24293d] [data-theme=light]:border-slate-300 shadow-sm text-xs">
                        {faviconUrl ? (
                          <img
                            src={faviconUrl}
                            alt="Favicon"
                            className="w-4 h-4 object-contain rounded-xs"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span
                            className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] text-white font-bold"
                            style={{ backgroundColor: accentColor }}
                          >
                            {platformName.charAt(0)}
                          </span>
                        )}
                        <span className="font-medium text-slate-200 [data-theme=light]:text-slate-800 text-[11px] truncate max-w-[140px]">
                          {platformName} | Dashboard
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500">
                        {faviconUrl ? (t.whiteLabelModule?.livePreview.customFaviconNotice || 'Custom favicon injected into document head.') : (t.whiteLabelModule?.livePreview.defaultFaviconNotice || 'Default platform emblem active.')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status summary */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 [data-theme=light]:text-slate-500 pt-1">
                <span>{t.whiteLabelModule?.livePreview.activeTenant || 'Active Tenant Workspace:'}</span>
                <strong className="text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                  {currentOrg?.name || 'Enterprise'}
                </strong>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Test Email Simulator Modal */}
      <Modal
        isOpen={isTestEmailOpen}
        onClose={() => setIsTestEmailOpen(false)}
        title={t.whiteLabelModule?.sectionEmail.testModalTitle || 'Simulate Branded Outgoing Email'}
        description={t.whiteLabelModule?.sectionEmail.testModalDesc || 'Verify how your custom sender headers, logos, and signatures render in real mail clients.'}
      >
        <form onSubmit={handleSendTestEmail} className="space-y-4">
          <Input
            label={t.whiteLabelModule?.sectionEmail.testRecipientLabel || 'Recipient Test Address'}
            type="email"
            value={testRecipient}
            onChange={e => setTestRecipient(e.target.value)}
            required
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          />

          <div className="p-3 rounded-lg bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#eae4d9]/50 border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-xs space-y-1.5">
            <p className="text-slate-400">
              {t.whiteLabelModule?.livePreview.emailFrom || 'From:'} <strong className="text-white [data-theme=light]:text-slate-900">{senderName}</strong> &lt;{senderEmail}&gt;
            </p>
            <p className="text-slate-400">
              {t.whiteLabelModule?.sectionEmail.senderRole || 'Role'}: <span className="font-mono text-blue-400">{senderRole}</span>
            </p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-[#24293d] [data-theme=light]:border-slate-200">
              {t.whiteLabelModule?.sectionEmail.simulateRelayInfo || 'Uses mock SMTP relay to simulate production delivery telemetry without incurring actual provider credits.'}
            </p>
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsTestEmailOpen(false)}>
              {t.actions.cancel || 'Cancel'}
            </Button>
            <Button type="submit" isLoading={isSendingTest} leftIcon={<Send className="w-4 h-4" />}>
              {t.whiteLabelModule?.sectionEmail.sendSimulatedBtn || 'Send Simulated Email'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
