import AppLayout from './AppLayout';
import type { Tab } from '../shared/types';

type IntelScreenProps = {
  onNavigate: (tab: Tab) => void;
};

export default function IntelScreen({ onNavigate }: IntelScreenProps) {
  return (
    <AppLayout activeTab="intel" onNavigate={onNavigate}>
      <div className="text-label-sm font-mono text-muted uppercase">
        Intelligence Dashboard
      </div>
      <div className="text-code-md font-mono text-text">
        Threat intelligence and analysis data will appear here.
      </div>
    </AppLayout>
  );
}
