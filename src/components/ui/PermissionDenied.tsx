/**
 * ESAIA - RBAC Permission Denied Display Component
 */

import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Button } from './Button';

export interface PermissionDeniedProps {
  requiredPermission?: string;
  onGoBack?: () => void;
}

export const PermissionDenied: React.FC<PermissionDeniedProps> = ({
  requiredPermission,
  onGoBack
}) => {
  return (
    <div
      id="permission-denied-view"
      className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-800/60 flex items-center justify-center text-rose-400 mb-4 shadow-xl">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-white tracking-tight">Access Restricted</h2>
      <p className="text-sm text-slate-400 mt-2 max-w-md">
        Your current role does not have the required permissions to access this section of the ESAIA workspace.
      </p>
      {requiredPermission && (
        <code className="mt-3 px-3 py-1 bg-[#141722] border border-[#24293d] rounded text-xs text-rose-300 font-mono">
          Required: {requiredPermission}
        </code>
      )}
      {onGoBack && (
        <div className="mt-6">
          <Button variant="secondary" onClick={onGoBack}>
            Return to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};
