import AppLayout from './AppLayout';
import type { Tab } from '../shared/types';

type RankingScreenProps = {
  onNavigate: (tab: Tab) => void;
};

export default function RankingScreen({ onNavigate }: RankingScreenProps) {
  return (
    <AppLayout activeTab="ranking" onNavigate={onNavigate}>
      <div className="text-label-sm font-mono text-muted uppercase">
        Leaderboard
      </div>
      <div className="text-code-md font-mono text-text">
        Player rankings and scores will appear here.
      </div>
    </AppLayout>
  );
}
