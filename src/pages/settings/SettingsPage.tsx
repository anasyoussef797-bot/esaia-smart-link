/**
 * ESAIA - Organization & Platform Settings View (with Team RBAC & Zero-Lock-In Export Engine)
 */

import React, { useState, useEffect } from 'react';
import { Settings, Download, Building2, Shield, Database, Trash2, CheckCircle2, UserPlus, Users, Mail, KeyRound } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { authService } from '../../services/firebase/authService';
import { exportService } from '../../services/firebase/exportService';
import { useNotification } from '../../context/NotificationContext';
import { OrganizationMember, Role, Permission, ROLE_DEFAULT_PERMISSIONS } from '../../types/auth';

export const SettingsPage: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const { currentOrg, isSuperAdmin, isOrgAdmin } = useAuth();
  const { showToast } = useNotification();
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);

  // Invite modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('staff_editor');
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    if (currentOrg?.id) {
      loadMembers(currentOrg.id);
    }
  }, [currentOrg?.id]);

  const loadMembers = async (orgId: string) => {
    setIsLoadingMembers(true);
    try {
      const data = await authService.getOrgMembers(orgId);
      setMembers(data);
    } catch (e) {
      console.warn('Load members error:', e);
    } finally {
      setIsLoadingMembers(false);
    }
  };

  const handleExportJson = async () => {
    setIsExporting(true);
    try {
      const json = await exportService.exportTenantData(currentOrg?.id || 'org_esaia_main');
      exportService.downloadFile(json, `esaia_tenant_backup_${currentOrg?.id || 'main'}.json`, 'application/json');
      showToast('success', t.settingsModule.exportDatabase, 'JSON');
    } catch (e: any) {
      showToast('error', 'Export Failed', e.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !currentOrg) return;

    setIsInviting(true);
    try {
      const newMember = await authService.inviteMember(
        currentOrg.id,
        inviteEmail,
        inviteRole,
        ROLE_DEFAULT_PERMISSIONS[inviteRole]
      );
      setMembers(prev => [newMember, ...prev]);
      showToast('success', t.settingsModule.inviteMember, `${inviteEmail}`);
      setIsInviteModalOpen(false);
      setInviteEmail('');
    } catch (err: any) {
      showToast('error', 'Invitation Failed', err.message);
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemoveMember = async (memberId: string, email: string) => {
    if (members.length <= 1) {
      showToast('warning', 'Action Prohibited', 'An organization must have at least one active administrator.');
      return;
    }
    await authService.removeMember(memberId);
    setMembers(prev => prev.filter(m => m.id !== memberId));
    showToast('info', 'Member Removed', `Revoked access for ${email}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t.settingsModule.title}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {t.settingsModule.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* General Organization Info */}
          <Card>
            <CardHeader title={t.settingsModule.organizationInfo} description="Basic identification for your tenant organization" />
            <div className="space-y-4">
              <Input
                label="Workspace Name"
                value={currentOrg?.name || 'ESAIA Main Workspace'}
                readOnly
              />
              <Input
                label="Workspace Slug / Identifier"
                value={currentOrg?.slug || 'esaia-main'}
                readOnly
              />
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0e1017] border border-[#1c2030] text-xs">
                <span className="text-slate-400">Current Subscription Tier</span>
                <Badge variant="brand">{(currentOrg?.plan || 'enterprise').toUpperCase()} TIER</Badge>
              </div>
            </div>
          </Card>

          {/* Team Members & RBAC Management */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <CardHeader
                title={t.settingsModule.teamMembers}
                description="Manage workspace collaborators, roles, and granular operational permissions."
              />
              {isOrgAdmin() && (
                <Button
                  id="invite-member-btn"
                  size="sm"
                  leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                  onClick={() => setIsInviteModalOpen(true)}
                >
                  {t.settingsModule.inviteMember}
                </Button>
              )}
            </div>

            <div className="space-y-2.5">
              {members.map(member => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0e1017] border border-[#1c2030] text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
                      {member.userEmail.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-200">{member.userEmail}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {t.settingsModule.role}: <span className="text-blue-400 uppercase font-mono">{member.role.replace('_', ' ')}</span> • {member.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={member.role === 'super_admin' ? 'brand' : member.role === 'org_admin' ? 'success' : 'neutral'}>
                      {member.role.replace('_', ' ')}
                    </Badge>
                    {isOrgAdmin() && member.role !== 'super_admin' && (
                      <button
                        onClick={() => handleRemoveMember(member.id, member.userEmail)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                        title={t.actions.delete}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Data Sovereignty & Zero-Lock-In Export */}
          <Card>
            <CardHeader
              title={t.settingsModule.exportDatabase}
              description={t.settingsModule.exportDesc}
            />
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#eae4d9]/50 border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">Full Organization Backup (JSON)</p>
                  <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] mt-0.5">
                    Includes all clients, QR codes, style vectors, and pages.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {onNavigate && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onNavigate('/admin/settings/export')}
                    >
                      Advanced Export Center
                    </Button>
                  )}
                  <Button
                    variant="primary"
                    size="sm"
                    isLoading={isExporting}
                    leftIcon={<Download className="w-4 h-4" />}
                    onClick={handleExportJson}
                  >
                    {t.settingsModule.exportBtn}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Info: System Limits */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Tenant Quotas & Limits" description="Resource allocation" />
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#1c2030]">
                <span className="text-slate-400">Client CRM Capacity</span>
                <span className="text-white font-semibold">{currentOrg?.maxClients || 5000} Clients</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1c2030]">
                <span className="text-slate-400">Dynamic QR Fleet Limit</span>
                <span className="text-white font-semibold">{currentOrg?.maxQrCodes || 50000} QRs</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1c2030]">
                <span className="text-slate-400">Monthly Scan Allowance</span>
                <span className="text-emerald-400 font-semibold">Unlimited</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Custom Domains</span>
                <span className="text-white font-semibold">10 Domains</span>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Security & Compliance" description="Enterprise guarantees" />
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Multi-tenant document isolation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted credentials at rest</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sub-10ms edge caching routing</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Modal: Invite Team Member */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title={t.settingsModule.inviteMember}
        description="Grant access to this workspace with defined RBAC operational roles."
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <Input
            id="invite-email-input"
            type="email"
            label="Work Email Address"
            placeholder="colleague@company.com"
            leftIcon={<Mail className="w-4 h-4" />}
            value={inviteEmail}
            onChange={e => setInviteEmail(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-200">
              Assigned Workspace Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'org_admin', label: 'Org Admin', desc: 'Full workspace management' },
                { id: 'staff_editor', label: 'Staff Editor', desc: 'Create & style QRs and pages' },
                { id: 'client_viewer', label: 'Client Viewer', desc: 'Read-only analytics' }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setInviteRole(r.id as Role)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-colors ${
                    inviteRole === r.id
                      ? 'bg-blue-600/15 border-blue-500 text-white font-medium'
                      : 'bg-[#0e1017] border-[#24293d] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="font-semibold capitalize text-white">{r.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsInviteModalOpen(false)}
            >
              {t.actions.cancel}
            </Button>
            <Button
              type="submit"
              isLoading={isInviting}
              leftIcon={<UserPlus className="w-4 h-4" />}
            >
              {t.settingsModule.inviteMember}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
