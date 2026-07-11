import StreakCard from './StreakCard';
import PrimaryButton from './PrimaryButton';
import AppLayout from './AppLayout';
import { useStreak } from '../hooks/useStreak';
import type { Tab, RoundResult } from '../shared/types';
import type { ScenarioResponse, TodayResultResponse } from '../../shared/api';

type HomeScreenProps = {
  onNavigate: (tab: Tab) => void;
  onAnalyze: () => void;
  onViewTodayResult: (result: RoundResult) => void;
};

export default function HomeScreen({
  onNavigate,
  onAnalyze,
  onViewTodayResult,
}: HomeScreenProps) {
  const { data, isLoading } = useStreak();

  const handleAnalyzeClick = async () => {
    if (data?.hasPlayedToday) {
      try {
        const [scenarioJson, roundJson] = await Promise.all([
          fetch('/api/scenario').then(
            (res) => res.json() as Promise<ScenarioResponse>
          ),
          fetch('/api/today-result').then(
            (res) => res.json() as Promise<TodayResultResponse>
          ),
        ]);

        if (roundJson.round) {
          onViewTodayResult({
            scenario: scenarioJson.scenario,
            tappedIds: new Set(roundJson.round.tappedIds),
            correctFlagsFound: roundJson.round.correctFlagsFound,
            totalRedFlags: roundJson.round.totalRedFlags,
            score: roundJson.round.score,
          });
          return;
        }
      } catch (error) {
        console.error("Failed to load today's result:", error);
      }
    }

    onAnalyze();
  };

  return (
    <AppLayout activeTab="analyze" onNavigate={onNavigate}>
      {isLoading || !data ? (
        <div className="text-label-sm font-mono text-muted uppercase">
          Loading...
        </div>
      ) : (
        <StreakCard streak={data.current} />
      )}

      <div className="flex flex-col gap-3 mt-8">
        <div className="flex justify-between items-center px-1">
          <span className="text-code-md font-mono text-muted">
            {new Date().toISOString().split('T')[0]}
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-danger animate-pulse block" />
            <span className="text-code-md font-mono text-danger font-bold uppercase tracking-wide">
              {data?.hasPlayedToday
                ? 'Threat Contained'
                : 'New Threat Detected'}
            </span>
          </div>
        </div>

        <PrimaryButton
          label={
            data?.hasPlayedToday
              ? "View Today's Result"
              : "Analyze Today's Message"
          }
          variant={data?.hasPlayedToday ? 'safe' : 'danger'}
          onclick={handleAnalyzeClick}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => onNavigate('ranking')}
          className="inline-flex items-center gap-2 text-muted hover:text-text font-mono text-code-md border-b border-muted hover:border-text pb-1"
        >
          View Leaderboard
        </button>
      </div>

      {/* Terminal decorative footer */}
      <div
        className="mt-auto pt-12 animate-fade-in-up"
        style={{ animationDelay: '200ms' }}
      >
        <div className="border-t border-border pt-4">
          <div className="text-label-sm font-mono text-muted opacity-50 flex flex-col gap-1">
            <div>&gt; INITIALIZING SCANNER MODULE... [OK]</div>
            <div>&gt; ESTABLISHING SECURE UPLINK... [OK]</div>
            <div>&gt; AWAITING OPERATOR INPUT...</div>
            <div className="flex">
              <span className="w-2 h-4 bg-muted animate-pulse inline-block mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
