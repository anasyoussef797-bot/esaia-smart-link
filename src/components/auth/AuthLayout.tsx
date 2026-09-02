/**
 * ESAIA - Auth Layout Component
 * Aesthetic, high-contrast wrapper for Authentication, Organization Onboarding, and Password Recovery.
 */

import React, { ReactNode } from 'react';
import { QrCode, Shield, Zap, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = 'ESAIA SaaS Platform',
  subtitle = 'Dynamic QR Codes, Smart Link Routing & Micro-Landing Pages'
}) => {
  return (
    <div className="min-h-screen bg-[#090a0f] flex flex-col lg:flex-row items-stretch selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left Column: Brand Story & Capabilities */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 xl:p-16 border-r border-[#1c2030] bg-gradient-to-b from-[#0e1017] to-[#090a0f] relative z-10">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-600/25 border border-blue-400/30">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">ESAIA</h1>
              <p className="text-[11px] text-blue-400 font-mono">ENTERPRISE QR PLATFORM</p>
            </div>
          </div>

          {/* Hero Pitch */}
          <div className="mt-16 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Version 2.4 Enterprise Release</span>
            </div>
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
              One Unified Workspace for Dynamic QRs, Client CRMs &amp; Micro-Pages.
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Power millions of dynamic QR scans, instant contactless menus, digital business cards, and smart links with sub-10ms edge redirects and zero vendor lock-in.
            </p>
          </div>

          {/* Key Differentiators */}
          <div className="mt-12 space-y-4 max-w-md">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Sub-10ms Server-Side Redirects</p>
                <p className="text-[11px] text-slate-400">Fast HTTP 302 edge caching with real-time destination editing without reprinting.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Multi-Tenant Client CRM</p>
                <p className="text-[11px] text-slate-400">Manage thousands of brands, custom domains, and team roles under tenant isolation.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Zero Vendor Lock-In</p>
                <p className="text-[11px] text-slate-400">Export complete organization data, vectors, and analytics to JSON or CSV anytime.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="pt-8 border-t border-[#1c2030] flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>SOC2 Type II &amp; GDPR Compliant Tenant Isolation</span>
          </div>
          <span className="font-mono">esaia.app</span>
        </div>
      </div>

      {/* Right Column: Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile Logo Header (visible on mobile only) */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">ESAIA</h1>
            <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
          </div>

          {/* Form Content */}
          {children}

          {/* Global Copyright */}
          <p className="text-center text-[11px] text-slate-500 mt-8">
            &copy; {new Date().getFullYear()} ESAIA Platform Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
