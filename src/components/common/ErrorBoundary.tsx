/**
 * ESAIA - Enterprise Global Error Boundary
 * Catches unhandled runtime exceptions in React components, captures diagnostics,
 * and renders a unified, theme-compatible 500 Server Error interface.
 */

import React, { ErrorInfo, ReactNode } from 'react';
import { ServerErrorPage } from '../../pages/errors/ServerErrorPage';

export interface ErrorBoundaryProps {
  children?: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error('ESAIA Global Error Boundary caught exception:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    window.location.href = '/admin';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#090b10] [data-theme=light]:bg-slate-50 [data-theme=beige]:bg-[#f4efe6]">
          <ServerErrorPage
            error={this.state.error}
            errorInfo={this.state.errorInfo}
            onReset={this.handleReset}
          />
        </div>
      );
    }

    return this.props.children;
  }
}
