import AppLayout from './AppLayout';

export default function RankingScreen() {
  return (
    <AppLayout activeTab="ranking">
      <div className="text-label-sm font-mono text-muted uppercase">
        Leaderboard
      </div>
      <div className="text-code-md font-mono text-text">
        Player rankings and scores will appear here.
      </div>
    </AppLayout>
  );
}