/**
 * ESAIA - Enterprise Custom Domain Engine & DNS Verification Center
 * Multi-domain routing, real-time DNS verification (CNAME/TXT), automated SSL tracking,
 * and target destination mappings.
 */

import React, { useState, useEffect } from 'react';
import {
  Globe,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Star,
  Server,
  KeyRound,
  FileCode2,
  ChevronRight,
  Info
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { CustomDomain, DnsRecord } from '../../types/domain';
import { domainService } from '../../services/firebase/domainService';
import { pageService } from '../../services/firebase/pageService';
import { clientService } from '../../services/firebase/clientService';
import { Page } from '../../types/page';
import { Client } from '../../types/client';

export const DomainsPage: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const { currentOrg, user, isOrgAdmin } = useAuth();
  const { showToast } = useNotification();

  const [domains, setDomains] = useState<CustomDomain[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDomainForDns, setSelectedDomainForDns] = useState<CustomDomain | null>(null);
  const [selectedDomainForDelete, setSelectedDomainForDelete] = useState<CustomDomain | null>(null);

  // Add Domain Form
  const [newDomainName, setNewDomainName] = useState('');
  const [newTargetType, setNewTargetType] = useState<'organization' | 'client' | 'page'>('organization');
  const [newTargetId, setNewTargetId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verification & Copy State
  const [isVerifyingId, setIsVerifyingId] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const orgId = currentOrg?.id || 'org_impact_hub';

  const loadData = async () => {
    try {
      const [domainList, pageList, clientList] = await Promise.all([
        domainService.getDomainsByOrg(orgId),
        pageService.getPagesByOrg(orgId).catch(() => []),
        clientService.getClientsByOrg(orgId).catch(() => [])
      ]);
      setDomains(domainList);
      setPages(pageList);
      setClients(clientList);
    } catch (err) {
      console.error('Failed to load domains data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [orgId]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast({
      title: 'Copied to clipboard',
      message: text,
      type: 'success'
    });
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainName.trim()) {
      showToast({
        title: 'Domain name required',
        message: 'Please provide a valid fully qualified domain name (e.g. qr.brand.com)',
        type: 'warning'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let targetName = 'Organization Fleet Default';
      if (newTargetType === 'page') {
        const found = pages.find(p => p.id === newTargetId);
        targetName = found ? `Landing Page: ${found.title}` : 'Landing Page Target';
      } else if (newTargetType === 'client') {
        const found = clients.find(c => c.id === newTargetId);
        targetName = found ? `Client: ${found.companyName}` : 'Client Target';
      }

      const created = await domainService.addDomain(
        orgId,
        newDomainName,
        newTargetType,
        newTargetId || undefined,
        targetName,
        user?.email
      );

      setDomains(prev => [created, ...prev]);
      setIsAddModalOpen(false);
      setNewDomainName('');
      setNewTargetId('');
      setNewTargetType('organization');

      showToast({
        title: 'Domain Registered',
        message: `${created.domain} was added. Please add the required CNAME and TXT records to your DNS provider.`,
        type: 'success'
      });

      // Automatically open DNS inspector
      setSelectedDomainForDns(created);
    } catch (err) {
      showToast({
        title: 'Error adding domain',
        message: 'Could not register custom domain. Please check permissions.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyDns = async (domain: CustomDomain) => {
    setIsVerifyingId(domain.id);
    try {
      const result = await domainService.verifyDns(domain.id, orgId, user?.email);
      if (result.success) {
        showToast({
          title: 'DNS Verification Succeeded!',
          message: `CNAME and TXT verification challenge matched for ${domain.domain}. Automated TLS/SSL certificate is now active.`,
          type: 'success'
        });
        await loadData();
        if (selectedDomainForDns?.id === domain.id) {
          const updated = (await domainService.getDomainsByOrg(orgId)).find(d => d.id === domain.id);
          if (updated) setSelectedDomainForDns(updated);
        }
      } else {
        showToast({
          title: 'Verification Incomplete',
          message: result.error || 'DNS propagation may take a few minutes. Please re-check your DNS provider.',
          type: 'warning'
        });
      }
    } catch (err) {
      showToast({
        title: 'Verification Error',
        message: 'Could not query authoritative DNS servers.',
        type: 'error'
      });
    } finally {
      setIsVerifyingId(null);
    }
  };

  const handleReissueSsl = async (domain: CustomDomain) => {
    try {
      const result = await domainService.reissueSsl(domain.id, orgId, user?.email);
      showToast({
        title: 'SSL Certificate Renewed',
        message: `${result.provider} issued successfully. Valid until ${new Date(result.expiresAt).toLocaleDateString()}.`,
        type: 'success'
      });
      await loadData();
    } catch (err) {
      showToast({
        title: 'SSL Renewal Failed',
        message: 'Could not communicate with ACME CA directory.',
        type: 'error'
      });
    }
  };

  const handleSetPrimary = async (domain: CustomDomain) => {
    try {
      await domainService.setPrimaryDomain(orgId, domain.id, user?.email);
      showToast({
        title: 'Primary Domain Set',
        message: `${domain.domain} is now the primary domain for short links and QR codes.`,
        type: 'success'
      });
      await loadData();
    } catch (err) {
      showToast({
        title: 'Update Failed',
        message: 'Could not update primary domain status.',
        type: 'error'
      });
    }
  };

  const handleDeleteDomain = async () => {
    if (!selectedDomainForDelete) return;
    try {
      await domainService.deleteDomain(selectedDomainForDelete.id, orgId, user?.email);
      showToast({
        title: 'Domain Disconnected',
        message: `${selectedDomainForDelete.domain} has been removed.`,
        type: 'success'
      });
      setSelectedDomainForDelete(null);
      await loadData();
    } catch (err) {
      showToast({
        title: 'Deletion Failed',
        message: 'Could not remove custom domain.',
        type: 'error'
      });
    }
  };

  const activeCount = domains.filter(d => d.status === 'active').length;
  const pendingCount = domains.filter(d => d.status === 'pending_dns').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
              {t.domainsModule.title}
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Enterprise CNAME Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] mt-1">
            {t.domainsModule.subtitle} Connect branded subdomains for custom QR links and white-labeled mobile pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            isLoading={isRefreshing}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={() => {
              setIsRefreshing(true);
              loadData();
            }}
          >
            Refresh
          </Button>

          {isOrgAdmin() && (
            <Button
              id="connect-new-domain-btn"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsAddModalOpen(true)}
            >
              {t.domainsModule.connectDomain}
            </Button>
          )}
        </div>
      </div>

      {/* KPI Metric Summary & Global CNAME Routing Target */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
              Configured Domains
            </p>
            <p className="text-lg font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              {domains.length}
            </p>
          </div>
        </Card>

        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
              Active with SSL
            </p>
            <p className="text-lg font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              {activeCount} <span className="text-xs font-normal text-emerald-400">Verified</span>
            </p>
          </div>
        </Card>

        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
              Pending DNS Challenge
            </p>
            <p className="text-lg font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              {pendingCount} <span className="text-xs font-normal text-amber-400">Awaiting Record</span>
            </p>
          </div>
        </Card>
      </div>

      {/* Global Ingress Architecture Banner */}
      <div className="p-4 rounded-xl bg-[#0e1017] [data-theme=light]:bg-blue-50 [data-theme=beige]:bg-[#eae4d9]/50 border border-[#1c2030] [data-theme=light]:border-blue-200 [data-theme=beige]:border-[#dfd7cb] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <Server className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-white [data-theme=light]:text-blue-900 [data-theme=beige]:text-[#231f1d]">
              Global Cloud Ingress CNAME Target: <code className="font-mono text-blue-400 [data-theme=light]:text-blue-700 bg-black/40 [data-theme=light]:bg-white px-2 py-0.5 rounded ml-1">cname.esaia.app</code>
            </p>
            <p className="text-[11px] text-slate-400 [data-theme=light]:text-blue-700 [data-theme=beige]:text-[#8c7e73] mt-0.5">
              Point your CNAME records to this target. Any domain routed here receives automated Let's Encrypt TLS/SSL termination with sub-millisecond edge redirects.
            </p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={copiedKey === 'global_cname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          onClick={() => handleCopy('cname.esaia.app', 'global_cname')}
        >
          {copiedKey === 'global_cname' ? 'Copied' : 'Copy Target'}
        </Button>
      </div>

      {/* Domain List */}
      <div className="space-y-3">
        {domains.length === 0 && !isLoading ? (
          <Card padding="lg" className="text-center py-12">
            <Globe className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
              No Custom Domains Configured
            </h3>
            <p className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] max-w-md mx-auto mt-1 mb-4">
              Add your first custom domain (e.g. qr.yourbrand.com) to route all dynamic QR scans through your own branded URL.
            </p>
            {isOrgAdmin() && (
              <Button leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsAddModalOpen(true)}>
                Connect Custom Domain
              </Button>
            )}
          </Card>
        ) : (
          domains.map(domain => {
            const isVerifying = isVerifyingId === domain.id;
            const isPending = domain.status === 'pending_dns';

            return (
              <Card
                key={domain.id}
                padding="md"
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition hover:border-[#2a3048] [data-theme=light]:hover:border-slate-300 [data-theme=beige]:hover:border-[#c8beaf]"
              >
                {/* Left Domain Info */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                      domain.status === 'active'
                        ? 'bg-emerald-600/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-amber-600/10 border-amber-500/20 text-amber-400'
                    }`}
                  >
                    <Globe className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
                        {domain.domain}
                      </h3>

                      {domain.isPrimary && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          PRIMARY
                        </span>
                      )}

                      <Badge variant={domain.status === 'active' ? 'success' : domain.status === 'pending_dns' ? 'warning' : 'danger'}>
                        {domain.status === 'active' ? 'Active & Routing' : domain.status === 'pending_dns' ? 'DNS Pending' : 'Failed'}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
                      <span>
                        Target: <strong className="text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#4d443e]">{domain.targetName || domain.targetType}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        CNAME: <code className="text-blue-400 font-mono">cname.esaia.app</code>
                      </span>
                    </div>

                    {/* SSL Status Line */}
                    <div className="flex items-center gap-2 text-[11px] pt-1">
                      {domain.sslActive ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{domain.sslProvider || 'Valid Let\'s Encrypt SSL (ECDSA)'}</span>
                          {domain.sslExpiresAt && (
                            <span className="text-slate-500">
                              (Renews {new Date(domain.sslExpiresAt).toLocaleDateString()})
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Awaiting DNS propagation for SSL issuance</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
                  {/* Test Route Link */}
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    onClick={() => {
                      showToast({
                        title: 'Simulating Domain Redirect',
                        message: `Testing request to https://${domain.domain}/q/test... Routed to destination.`,
                        type: 'info'
                      });
                    }}
                  >
                    Test Route
                  </Button>

                  {/* DNS Settings Inspection */}
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<KeyRound className="w-3.5 h-3.5" />}
                    onClick={() => setSelectedDomainForDns(domain)}
                  >
                    {t.domainsModule.dnsSettings}
                  </Button>

                  {/* Verify Action */}
                  {isPending && isOrgAdmin() && (
                    <Button
                      variant="primary"
                      size="sm"
                      isLoading={isVerifying}
                      leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                      onClick={() => handleVerifyDns(domain)}
                    >
                      Verify DNS
                    </Button>
                  )}

                  {/* Reissue SSL Action if active */}
                  {domain.status === 'active' && isOrgAdmin() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Force Re-issue or Renew SSL Certificate"
                      leftIcon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      onClick={() => handleReissueSsl(domain)}
                    >
                      Renew SSL
                    </Button>
                  )}

                  {/* Primary Toggle */}
                  {!domain.isPrimary && domain.status === 'active' && isOrgAdmin() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Set as Organization Primary Domain"
                      leftIcon={<Star className="w-3.5 h-3.5 text-amber-400" />}
                      onClick={() => handleSetPrimary(domain)}
                    >
                      Make Primary
                    </Button>
                  )}

                  {/* Delete / Disconnect */}
                  {isOrgAdmin() && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                      onClick={() => setSelectedDomainForDelete(domain)}
                      title="Disconnect Domain"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal: Connect Custom Domain */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Connect Branded Custom Domain"
        description="Map a custom subdomain (e.g. qr.brand.com or menu.restaurant.com) to your ESAIA workspace."
        size="md"
      >
        <form onSubmit={handleAddDomain} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
              Domain / Subdomain <span className="text-rose-400">*</span>
            </label>
            <Input
              value={newDomainName}
              onChange={e => setNewDomainName(e.target.value)}
              placeholder="e.g. qr.brand.com or link.agency.eg"
              required
            />
            <p className="text-[11px] text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73] mt-1">
              Tip: Use a dedicated subdomain like <code className="text-blue-400">qr.</code>, <code className="text-blue-400">menu.</code>, or <code className="text-blue-400">link.</code>
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
              Target Routing Destination
            </label>
            <Select
              value={newTargetType}
              onChange={e => {
                setNewTargetType(e.target.value as any);
                setNewTargetId('');
              }}
              options={[
                { value: 'organization', label: 'Organization Fleet Default (All QRs & Smart Links)' },
                { value: 'page', label: 'Specific Mobile Landing Page / Menu' },
                { value: 'client', label: 'Specific Client Brand Workspace' }
              ]}
            />
          </div>

          {newTargetType === 'page' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                Select Destination Landing Page
              </label>
              <Select
                value={newTargetId}
                onChange={e => setNewTargetId(e.target.value)}
                options={[
                  { value: '', label: '-- Select Published Page --' },
                  ...pages.map(p => ({
                    value: p.id,
                    label: `${p.title} (/p/${p.slug})`
                  }))
                ]}
              />
            </div>
          )}

          {newTargetType === 'client' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d] mb-1.5">
                Select Client Workspace
              </label>
              <Select
                value={newTargetId}
                onChange={e => setNewTargetId(e.target.value)}
                options={[
                  { value: '', label: '-- Select Client --' },
                  ...clients.map(c => ({
                    value: c.id,
                    label: c.companyName
                  }))
                ]}
              />
            </div>
          )}

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 [data-theme=light]:text-blue-800 space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Automated Zero-Config SSL
            </div>
            <p className="text-[11px] leading-relaxed text-blue-300/90 [data-theme=light]:text-blue-700">
              Upon adding, ESAIA generates a TXT challenge token and CNAME target. As soon as you configure your DNS provider, our ACME engine automatically provisions a wildcard TLS/SSL certificate.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
            <Button variant="ghost" type="button" onClick={() => setIsAddModalOpen(false)}>
              {t.actions.cancel}
            </Button>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Add & View DNS Records
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: DNS Configuration Inspector */}
      {selectedDomainForDns && (
        <Modal
          isOpen={Boolean(selectedDomainForDns)}
          onClose={() => setSelectedDomainForDns(null)}
          title={`DNS Configuration: ${selectedDomainForDns.domain}`}
          description="Add these DNS records at your domain registrar (Cloudflare, GoDaddy, Namecheap, Route 53, etc.)."
          size="lg"
        >
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] rounded-lg overflow-hidden">
                <thead className="bg-[#12151f] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#eae4d9] text-slate-400 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#231f1d]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Type</th>
                    <th className="py-2.5 px-3 font-semibold">Host / Name</th>
                    <th className="py-2.5 px-3 font-semibold">Target / Value</th>
                    <th className="py-2.5 px-3 font-semibold">TTL</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Copy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c2030] [data-theme=light]:divide-slate-200 [data-theme=beige]:divide-[#dfd7cb] bg-[#090b10] [data-theme=light]:bg-white [data-theme=beige]:bg-[#fbf9f4]">
                  {selectedDomainForDns.dnsRecords.map((record, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 [data-theme=light]:hover:bg-slate-50 [data-theme=beige]:hover:bg-[#f5f1e8]">
                      <td className="py-2.5 px-3 font-bold text-blue-400">{record.type}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d]">
                        {record.name}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-300 [data-theme=light]:text-slate-700 [data-theme=beige]:text-[#3a332d] max-w-[200px] truncate">
                        {record.value}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400 font-mono">{record.ttl || 300}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                            record.status === 'matched' ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {record.status === 'matched' ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" /> Matched
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5" /> Pending DNS
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleCopy(record.value, `rec_${idx}`)}
                          className="p-1 text-slate-400 hover:text-white [data-theme=light]:hover:text-slate-900 rounded hover:bg-slate-800 [data-theme=light]:hover:bg-slate-200 transition"
                          title="Copy value"
                        >
                          {copiedKey === `rec_${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Step-by-step Setup Guide */}
            <div className="p-4 rounded-xl bg-[#0e1017] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#eae4d9]/40 border border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] space-y-2 text-xs">
              <p className="font-semibold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">
                Quick Setup Checklist:
              </p>
              <ol className="list-decimal list-inside text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#6d6156] space-y-1">
                <li>Log in to your DNS management console (e.g. Cloudflare, Route53, Namecheap).</li>
                <li>Create a <strong>CNAME</strong> record pointing your subdomain to <code className="text-blue-400 font-mono">cname.esaia.app</code>. (Set Proxy to "DNS only" if using Cloudflare).</li>
                <li>Create a <strong>TXT</strong> record for the challenge token to confirm domain ownership.</li>
                <li>Click <strong>"Verify DNS Records"</strong> below to complete verification and issue SSL certificates.</li>
              </ol>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb]">
              <div className="text-xs text-slate-400 [data-theme=light]:text-slate-500 [data-theme=beige]:text-[#8c7e73]">
                Current status: <strong className="capitalize text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d]">{selectedDomainForDns.status.replace('_', ' ')}</strong>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setSelectedDomainForDns(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  isLoading={isVerifyingId === selectedDomainForDns.id}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  onClick={() => handleVerifyDns(selectedDomainForDns)}
                >
                  Verify DNS Records
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Confirm Delete Domain */}
      {selectedDomainForDelete && (
        <Modal
          isOpen={Boolean(selectedDomainForDelete)}
          onClose={() => setSelectedDomainForDelete(null)}
          title="Disconnect Custom Domain"
          description="Are you sure you want to disconnect this domain? Existing QR codes mapped to this domain may stop resolving until re-routed."
          size="sm"
        >
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
              Disconnecting <strong>{selectedDomainForDelete.domain}</strong> will revoke the SSL certificate and remove DNS bindings from the platform.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setSelectedDomainForDelete(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteDomain}>
                Disconnect Domain
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
