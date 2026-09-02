/**
 * ESAIA - Client CRM Create / Edit Modal with Brand Color Pickers & Logo Upload
 */

import React, { useState, useEffect, useRef } from 'react';
import { Upload, X, Check, Palette, Sparkles, Image as ImageIcon, Building, User, Mail, Phone, Globe, MessageSquare, MapPin } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useLanguage } from '../../context/LanguageContext';
import { Client, BrandColors, ClientStatus } from '../../types/client';

export interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (clientData: Partial<Client>) => Promise<void>;
  initialClient?: Client | null;
  isLoading?: boolean;
}

const PRESET_PALETTES = [
  { name: 'Crimson Modern', primary: '#e11d48', secondary: '#1e293b', accent: '#f59e0b' },
  { name: 'Royal Sapphire', primary: '#2563eb', secondary: '#0f172a', accent: '#38bdf8' },
  { name: 'Emerald Forest', primary: '#059669', secondary: '#064e3b', accent: '#10b981' },
  { name: 'Amber Artisan', primary: '#92400e', secondary: '#451a03', accent: '#d97706' },
  { name: 'Teal Luxury', primary: '#0d9488', secondary: '#134e4a', accent: '#14b8a6' },
  { name: 'Indigo Corporate', primary: '#4f46e5', secondary: '#1e1b4b', accent: '#818cf8' },
  { name: 'Midnight Violet', primary: '#7c3aed', secondary: '#2e1065', accent: '#c084fc' },
  { name: 'Slate Minimal', primary: '#334155', secondary: '#0f172a', accent: '#64748b' }
];

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialClient,
  isLoading = false
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<ClientStatus>('active');

  const [brandColors, setBrandColors] = useState<BrandColors>({
    primary: '#2563eb',
    secondary: '#1e293b',
    accent: '#38bdf8',
    background: '#ffffff',
    text: '#0f172a'
  });

  const [logoUrl, setLogoUrl] = useState<string>('');
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);

  useEffect(() => {
    if (initialClient) {
      setCompanyName(initialClient.companyName || '');
      setContactPerson(initialClient.contactPerson || '');
      setEmail(initialClient.email || '');
      setPhone(initialClient.phone || '');
      setWhatsapp(initialClient.whatsapp || '');
      setWebsite(initialClient.website || '');
      setAddress(initialClient.address || '');
      setNotes(initialClient.notes || '');
      setTagsInput(initialClient.tags?.join(', ') || '');
      setStatus(initialClient.status || 'active');
      setBrandColors({
        primary: initialClient.brandColors?.primary || '#2563eb',
        secondary: initialClient.brandColors?.secondary || '#1e293b',
        accent: initialClient.brandColors?.accent || '#38bdf8',
        background: initialClient.brandColors?.background || '#ffffff',
        text: initialClient.brandColors?.text || '#0f172a'
      });
      setLogoUrl(initialClient.logoUrl || '');
    } else {
      setCompanyName('');
      setContactPerson('');
      setEmail('');
      setPhone('');
      setWhatsapp('');
      setWebsite('');
      setAddress('');
      setNotes('');
      setTagsInput('');
      setStatus('active');
      setBrandColors({
        primary: '#2563eb',
        secondary: '#1e293b',
        accent: '#38bdf8',
        background: '#ffffff',
        text: '#0f172a'
      });
      setLogoUrl('');
    }
  }, [initialClient, isOpen]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      if (typeof e.target?.result === 'string') {
        setLogoUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingLogo(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    await onSave({
      companyName: companyName.trim(),
      contactPerson: contactPerson.trim(),
      email: email.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || undefined,
      website: website.trim() || undefined,
      address: address.trim() || undefined,
      notes: notes.trim() || undefined,
      tags: parsedTags,
      status,
      brandColors,
      logoUrl: logoUrl || undefined
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialClient ? t.clientsModule.editModalTitle : t.clientsModule.modalTitle}
      description={initialClient ? t.clientsModule.editModalSubtitle : t.clientsModule.modalSubtitle}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
            <Building className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37]">
              {t.settingsModule.organizationInfo}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="client-form-company-name"
              label={t.clientsModule.companyNameLabel}
              placeholder="e.g. Nile Artisan Roastery"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              required
            />
            <Input
              id="client-form-contact-person"
              label={t.clientsModule.contactPersonLabel}
              placeholder="e.g. Farida Selim"
              value={contactPerson}
              onChange={e => setContactPerson(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Input
              id="client-form-email"
              type="email"
              label={t.clientsModule.emailLabel}
              placeholder="contact@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              id="client-form-phone"
              label={t.clientsModule.phoneLabel}
              placeholder="+20 100 123 4567"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <Input
              id="client-form-whatsapp"
              label={t.clientsModule.whatsappLabel}
              placeholder="+20 100 123 4567"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="client-form-website"
              label={t.clientsModule.websiteLabel}
              placeholder="https://company.com"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
            <Select
              id="client-form-status"
              label={t.actions.status}
              value={status}
              onChange={e => setStatus(e.target.value as ClientStatus)}
              options={[
                { value: 'active', label: t.clientsModule.activeStatus },
                { value: 'pending', label: t.clientsModule.pendingStatus },
                { value: 'archived', label: t.clientsModule.archivedStatus }
              ]}
            />
          </div>

          <Input
            id="client-form-address"
            label={t.clientsModule.addressLabel}
            placeholder="e.g. 14 Brazil St, Zamalek, Cairo"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="client-form-tags"
              label={t.clientsModule.tagsLabel}
              placeholder="F&B, Retail, VIP, Specialty"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
            />
            <Input
              id="client-form-notes"
              label={t.clientsModule.notesLabel}
              placeholder="Key account background, dynamic QR campaign notes..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Brand Visual Identity & Color Pickers */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-1 border-b border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37]">
                {t.clientsModule.brandColorsTitle}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Hex color tokens & brand identity</span>
          </div>

          {/* Quick Preset Palettes */}
          <div>
            <p className="text-xs font-medium text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37] mb-2">
              Quick Palettes
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_PALETTES.map(palette => (
                <button
                  type="button"
                  key={palette.name}
                  onClick={() =>
                    setBrandColors(prev => ({
                      ...prev,
                      primary: palette.primary,
                      secondary: palette.secondary,
                      accent: palette.accent
                    }))
                  }
                  className="flex items-center gap-2 p-2 rounded-xl border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] hover:border-slate-500 bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] text-left transition-all"
                >
                  <div className="flex -space-x-1.5 shrink-0">
                    <span className="w-4 h-4 rounded-full border border-black/30" style={{ backgroundColor: palette.primary }} />
                    <span className="w-4 h-4 rounded-full border border-black/30" style={{ backgroundColor: palette.secondary }} />
                    <span className="w-4 h-4 rounded-full border border-black/30" style={{ backgroundColor: palette.accent }} />
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#332b25] truncate">
                    {palette.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Granular Color Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Primary */}
            <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] space-y-2">
              <label className="text-xs font-medium text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37] flex items-center justify-between">
                <span>{t.clientsModule.primaryColor}</span>
                <span className="font-mono text-[10px] text-slate-400">{brandColors.primary}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandColors.primary}
                  onChange={e => setBrandColors({ ...brandColors, primary: e.target.value })}
                  className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={brandColors.primary}
                  onChange={e => setBrandColors({ ...brandColors, primary: e.target.value })}
                  className="w-full text-xs font-mono uppercase bg-[#141722] [data-theme=light]:bg-white [data-theme=beige]:bg-white border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] rounded-lg px-2.5 py-1.5 text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]"
                />
              </div>
            </div>

            {/* Secondary */}
            <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] space-y-2">
              <label className="text-xs font-medium text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37] flex items-center justify-between">
                <span>{t.clientsModule.secondaryColor}</span>
                <span className="font-mono text-[10px] text-slate-400">{brandColors.secondary}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandColors.secondary}
                  onChange={e => setBrandColors({ ...brandColors, secondary: e.target.value })}
                  className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={brandColors.secondary}
                  onChange={e => setBrandColors({ ...brandColors, secondary: e.target.value })}
                  className="w-full text-xs font-mono uppercase bg-[#141722] [data-theme=light]:bg-white [data-theme=beige]:bg-white border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] rounded-lg px-2.5 py-1.5 text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]"
                />
              </div>
            </div>

            {/* Accent */}
            <div className="p-3 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] space-y-2">
              <label className="text-xs font-medium text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37] flex items-center justify-between">
                <span>{t.clientsModule.accentColor}</span>
                <span className="font-mono text-[10px] text-slate-400">{brandColors.accent}</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={brandColors.accent}
                  onChange={e => setBrandColors({ ...brandColors, accent: e.target.value })}
                  className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                />
                <input
                  type="text"
                  value={brandColors.accent}
                  onChange={e => setBrandColors({ ...brandColors, accent: e.target.value })}
                  className="w-full text-xs font-mono uppercase bg-[#141722] [data-theme=light]:bg-white [data-theme=beige]:bg-white border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] rounded-lg px-2.5 py-1.5 text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo Upload & Brand Asset */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between pb-1 border-b border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#453e37]">
                {t.clientsModule.logoUploadTitle}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Drag and drop logo dropzone */}
            <div>
              <div
                onDragOver={e => {
                  e.preventDefault();
                  setIsDraggingLogo(true);
                }}
                onDragLeave={() => setIsDraggingLogo(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-5 rounded-xl border-2 border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[140px] ${
                  isDraggingLogo
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] hover:border-slate-500 bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7]'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                  Click or drag &amp; drop logo image
                </p>
                <p className="text-[11px] text-slate-400 mt-1">PNG, SVG, JPG (Max 5MB)</p>
              </div>

              {/* Direct URL input */}
              <div className="mt-2">
                <Input
                  id="client-form-logo-url"
                  placeholder="Or paste direct image URL (https://...)"
                  value={logoUrl}
                  onChange={e => setLogoUrl(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            {/* Live Brand Identity Preview */}
            <div className="p-4 rounded-xl border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9] bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#fdfbf7] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {t.clientsModule.brandPreview}
                  </span>
                  {logoUrl && (
                    <button
                      type="button"
                      onClick={() => setLogoUrl('')}
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      {t.clientsModule.removeLogo}
                    </button>
                  )}
                </div>

                <div
                  className="p-4 rounded-xl shadow-md flex items-center gap-3 transition-colors"
                  style={{
                    backgroundColor: brandColors.background || '#ffffff',
                    borderLeft: `4px solid ${brandColors.primary}`
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-slate-200"
                    style={{ backgroundColor: '#ffffff' }}
                  >
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Logo Preview"
                        className="w-full h-full object-contain p-1"
                        onError={() => setLogoUrl('')}
                      />
                    ) : (
                      <span className="font-bold text-sm" style={{ color: brandColors.primary }}>
                        {(companyName || 'Brand').substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-sm truncate" style={{ color: brandColors.text || '#0f172a' }}>
                      {companyName || 'Acme Corporation'}
                    </p>
                    <p className="text-[11px] truncate opacity-75" style={{ color: brandColors.text || '#0f172a' }}>
                      {contactPerson || 'Contact Person'} • {status.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample QR & Page Pill */}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                  style={{ backgroundColor: brandColors.primary }}
                >
                  Primary CTA
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                  style={{ backgroundColor: brandColors.secondary }}
                >
                  Secondary Dark
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-slate-900"
                  style={{ backgroundColor: brandColors.accent }}
                >
                  Accent Highlight
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#eae4d9]">
          <Button variant="ghost" type="button" onClick={onClose} disabled={isLoading}>
            {t.actions.cancel}
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {initialClient ? t.clientsModule.saveBtn : t.clientsModule.createBtn}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
