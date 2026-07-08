import { Check } from 'lucide-react';
import React from 'react';

type FlagOverlayProps = {
  id: string;
  isTapped: boolean;
  onTap: (id: string) => void;
  block?: boolean;
  children: React.ReactNode;
};

export function FlagOverlay({
  id,
  isTapped,
  onTap,
  block = false,
  children,
}: FlagOverlayProps) {
  return (
    <div className={`relative ${block ? 'w-full' : 'inline-block w-fit'}`}>
      <div className="relative z-10">{children}</div>
      <button
        type="button"
        aria-label={
          isTapped ? 'Flagged as suspicious' : 'Tap to flag as suspicious'
        }
        onClick={() => onTap(id)}
        className={`absolute -inset-1 z-20 flex items-start justify-end p-1 transition-colors ${
          isTapped
            ? 'border border-safe bg-safe/10'
            : 'border border-dashed border-muted hover:border-text'
        }`}
      >
        {isTapped && <Check size={14} className="text-safe" />}
      </button>
    </div>
  );
}
