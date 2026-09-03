/**
 * ESAIA - Enterprise Global Error Boundary
 * Prevents catastrophic UI crashes, captures runtime exception telemetry,
 * and renders a polished, theme-compatible 500 Recovery interface.
 */

import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
  showDetails: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null,
      copied: false,
      showDetails: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ESAIA Global Error Boundary captured exception:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
      showDetails: false
    });
    window.location.href = '/admin';
  };

  private handleCopyDiagnostic = () => {
    const details = `ESAIA Error Diagnostic:
Timestamp: ${new Date().toISOString()}
Message: ${this.state.error?.message}
Stack: ${this.state.error?.stack}
Component Stack: ${this.state.errorInfo?.componentStack}`;

    navigator.clipboard.writeText(details);
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 2000);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#090b10] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#f4efe6] text-slate-200 [data-theme=light]:text-slate-800 [data-theme=beige]:text-[#231f1d]">
          <div className="max-w-lg w-full p-6 sm:p-8 rounded-2xl bg-[#12151f] [data-theme=light]:bg-white [data-theme=beige]:bg-[#eae4d9] border border-[#24293d] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] shadow-xl text-center space-y-5">
            {/* Warning Icon */}
            <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">
                500 • Application Error
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white [data-theme=light]:text-slate-900 [data-theme=beige]:text-[#231f1d] tracking-tight">
                {this.props.fallbackTitle || 'Something went unexpectedly wrong'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 [data-theme=light]:text-slate-600 [data-theme=beige]:text-[#6d6156] max-w-sm mx-auto leading-relaxed">
                {this.props.fallbackMessage ||
                  'The application encountered an unhandled exception. Your data remains safely persisted.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Button
                variant="primary"
                leftIcon={<RefreshCw className="w-4 h-4" />}
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
              <Button
                variant="outline"
                leftIcon={<Home className="w-4 h-4" />}
                onClick={this.handleReset}
              >
                Return to Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={this.state.copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                onClick={this.handleCopyDiagnostic}
              >
                {this.state.copied ? 'Copied Log' : 'Copy Diagnostic'}
              </Button>
            </div>

            {/* Diagnostic Details Collapsible */}
            {this.state.error && (
              <div className="pt-3 border-t border-[#1c2030] [data-theme=light]:border-slate-200 [data-theme=beige]:border-[#dfd7cb] text-left">
                <button
                  type="button"
                  onClick={() => this.setState(prev => ({ showDetails: !prev.showDetails }))}
                  className="flex items-center justify-between w-full text-xs text-slate-400 [data-theme=light]:text-slate-500 hover:text-white [data-theme=light]:hover:text-slate-900 transition"
                >
                  <span className="font-mono text-[11px]">Exception Details</span>
                  {this.state.showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {this.state.showDetails && (
                  <div className="mt-2 p-3 rounded-lg bg-[#090a0f] [data-theme=light]:bg-slate-100 [data-theme=beige]:bg-[#fbf9f4] border border-[#1c2030] [data-theme=light]:border-slate-300 [data-theme=beige]:border-[#dfd7cb] text-[11px] font-mono text-rose-300 [data-theme=light]:text-rose-700 overflow-x-auto max-h-40">
                    <p className="font-semibold">{this.state.error.name}: {this.state.error.message}</p>
                    {this.state.error.stack && (
                      <pre className="mt-1 text-[10px] text-slate-500 whitespace-pre-wrap">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
