import { ShieldCheck } from 'lucide-react';
import AppLayout from './AppLayout';
import { intelEntries } from '../data/intelEntries';
import type { Tab } from '../shared/types';

type IntelScreenProps = {
  onNavigate: (tab: Tab) => void;
};

export default function IntelScreen({ onNavigate }: IntelScreenProps) {
  return (
    <AppLayout activeTab="intel" onNavigate={onNavigate}>
      <div className="flex items-center gap-2 animate-fade-in-up">
        <ShieldCheck size={16} className="text-safe" />
        <h2 className="text-label-sm font-mono text-muted uppercase tracking-widest">
          Threat Pattern Archive
        </h2>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {intelEntries.map((entry, i) => (
          <div
            key={entry.id}
            className="bg-surface border border-border p-4 flex flex-col gap-2 animate-fade-in-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
              {entry.category}
            </span>
            <h3 className="text-body-md font-sans font-bold text-text">
              {entry.title}
            </h3>
            <p className="text-code-md font-mono text-muted leading-relaxed">
              {entry.description}
            </p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
