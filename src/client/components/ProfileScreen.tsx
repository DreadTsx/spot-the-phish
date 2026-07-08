import AppLayout from './AppLayout';
import type { Tab } from '../shared/types';

type ProfileScreenProps = {
  onNavigate: (tab: Tab) => void;
};

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  return (
    <AppLayout activeTab="profile" onNavigate={onNavigate}>
      <div className="text-label-sm font-mono text-muted uppercase">
        User Profile
      </div>
      <div className="text-code-md font-mono text-text">
        User profile and settings will appear here.
      </div>
    </AppLayout>
  );
}
