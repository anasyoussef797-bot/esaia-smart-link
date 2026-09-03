/**
 * ESAIA - Bulk Tag Assignment Modal
 */

import React, { useState } from 'react';
import { Tag, Check, RefreshCw } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface BulkTagModalProps {
  selectedCount: number;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (tags: string[]) => Promise<void>;
}

export const BulkTagModal: React.FC<BulkTagModalProps> = ({
  selectedCount,
  isOpen,
  onClose,
  onAssign
}) => {
  const { showToast } = useNotification();
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    if (tags.length === 0) {
      showToast('Please enter at least one tag', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await onAssign(tags);
      showToast(`Assigned ${tags.length} tag(s) to ${selectedCount} QR codes`, 'success');
      onClose();
    } catch (err) {
      showToast('Failed to assign tags', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Assign Tags</h3>
              <p className="text-xs text-neutral-400">Applying to {selectedCount} selected QR code(s)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xs">
            Esc
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              autoFocus
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              placeholder="e.g. Retail, Summer 2026, VIP, Acrylic Stand"
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white text-sm focus:outline-none focus:border-sky-500"
            />
            <p className="text-[11px] text-neutral-400 mt-1">
              Existing tags will be preserved and new tags will be appended.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition flex items-center gap-1.5 shadow-lg shadow-sky-950/40"
            >
              {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Assign Tags
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
