/**
 * ESAIA - Organization & Multi-Tenant Switcher Component
 * Supports seamless switching between organizations and rapid tenant onboarding.
 */

import React, { useState } from 'react';
import { Building2, Check, ChevronDown, Plus, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useNotification } from '../../context/NotificationContext';

export const OrgSwitcher: React.FC = () => {
  const { currentOrg, availableOrgs, switchOrganization, createNewOrganization } = useAuth();
  const { showToast } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgSlug, setNewOrgSlug] = useState('');
  const [newOrgPlan, setNewOrgPlan] = useState<'starter' | 'growth' | 'enterprise'>('growth');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;

    setIsCreating(true);
    try {
      const created = await createNewOrganization(newOrgName, newOrgSlug || undefined, newOrgPlan);
      showToast('success', 'Workspace Created', `Switched to "${created.name}"`);
      setIsCreateModalOpen(false);
      setNewOrgName('');
      setNewOrgSlug('');
    } catch (err: any) {
      showToast('error', 'Creation Failed', err.message || 'Could not create workspace.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="relative">
      <button
        id="org-switcher-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#141722] [data-theme=light]:bg-white [data-theme=beige]:bg-white hover:bg-[#1a1e2d] [data-theme=light]:hover:bg-slate-50 [data-theme=beige]:hover:bg-[#fbf9f4] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] text-xs text-left rtl:text-right transition-colors cursor-pointer w-full max-w-[220px]"
        aria-label="Switch organization"
      >
        <div className="w-6 h-6 rounded-md bg-blue-600/20 [data-theme=light]:bg-blue-100 [data-theme=beige]:bg-blue-100 border border-blue-500/30 [data-theme=light]:border-blue-300 [data-theme=beige]:border-blue-300 flex items-center justify-center text-blue-400 [data-theme=light]:text-blue-700 [data-theme=beige]:text-blue-800 shrink-0 font-bold text-[11px]">
          {currentOrg?.name ? currentOrg.name.charAt(0).toUpperCase() : 'W'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-200 [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] truncate">{currentOrg?.name || 'Workspace'}</p>
          <p className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72] capitalize">{currentOrg?.plan || 'Enterprise'} Plan</p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            id="org-switcher-dropdown"
            className="absolute left-0 rtl:left-auto rtl:right-0 mt-1.5 w-64 rounded-xl border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] bg-[#141722] [data-theme=light]:bg-white [data-theme=beige]:bg-white text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d] shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="px-2.5 py-1.5 flex items-center justify-between border-b border-[#1c2030] [data-theme=light]:border-slate-100 [data-theme=beige]:border-[#eae4d9] mb-1">
              <span className="text-[10px] font-semibold text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72] uppercase tracking-wider">
                Workspaces ({availableOrgs.length})
              </span>
            </div>

            <div className="space-y-0.5 max-h-52 overflow-y-auto">
              {availableOrgs.map(org => {
                const isSelected = org.id === currentOrg?.id;
                return (
                  <button
                    key={org.id}
                    id={`select-org-${org.id}`}
                    onClick={() => {
                      switchOrganization(org.id);
                      setIsOpen(false);
                      showToast('info', 'Workspace Switched', `Active workspace: ${org.name}`);
                    }}
                    className={`flex items-center justify-between w-full px-2.5 py-2 rounded-lg text-xs transition-colors text-left rtl:text-right ${
                      isSelected
                        ? 'bg-blue-600/15 [data-theme=light]:bg-blue-50 [data-theme=beige]:bg-blue-50 text-white [data-theme=light]:text-blue-900 [data-theme=beige]:text-blue-900 font-medium border border-blue-500/30 [data-theme=light]:border-blue-200 [data-theme=beige]:border-blue-200'
                        : 'hover:bg-[#1a1e2d] [data-theme=light]:hover:bg-slate-100 [data-theme=beige]:hover:bg-[#eee9df] text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#4a423d]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-5 h-5 rounded bg-[#0e1017] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eee9df] border border-[#24293d] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] flex items-center justify-center text-[10px] text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700 font-bold">
                        {org.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <p className="truncate text-xs">{org.name}</p>
                        <p className="text-[10px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#847a72] capitalize">{org.plan} Tier</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-1.5 mt-1 border-t border-[#1c2030] [data-theme=light]:border-slate-100 [data-theme=beige]:border-[#eae4d9]">
              <button
                id="create-new-org-btn"
                onClick={() => {
                  setIsOpen(false);
                  setIsCreateModalOpen(true);
                }}
                className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs text-blue-400 [data-theme=light]:text-blue-600 [data-theme=beige]:text-blue-700 hover:text-blue-300 hover:bg-blue-950/30 [data-theme=light]:hover:bg-blue-50 [data-theme=beige]:hover:bg-blue-50 font-medium transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Workspace</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal: Create Workspace */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Organization Workspace"
        description="Provision a tenant-isolated workspace with custom domains, permissions, and client directories."
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <Input
            id="create-org-name"
            label="Organization / Company Name"
            placeholder="e.g. Nile Hospitality Group"
            value={newOrgName}
            onChange={e => {
              setNewOrgName(e.target.value);
              if (!newOrgSlug) {
                setNewOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
              }
            }}
            required
          />

          <Input
            id="create-org-slug"
            label="Workspace Identifier (Slug)"
            placeholder="nile-hospitality"
            value={newOrgSlug}
            onChange={e => setNewOrgSlug(e.target.value)}
            helperText="Used for internal references and tenant routing: esaia.app/org/{slug}"
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-200">
              Subscription Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'starter', label: 'Starter', limit: '50 QRs' },
                { id: 'growth', label: 'Growth', limit: '2.5k QRs' },
                { id: 'enterprise', label: 'Enterprise', limit: '50k QRs' }
              ].map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setNewOrgPlan(tier.id as any)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                    newOrgPlan === tier.id
                      ? 'bg-blue-600/15 border-blue-500 text-white font-medium'
                      : 'bg-[#0e1017] border-[#24293d] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="font-semibold capitalize text-white">{tier.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{tier.limit}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isCreating}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Provision Workspace
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
