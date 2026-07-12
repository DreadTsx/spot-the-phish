import StreakCard from './StreakCard';
import PrimaryButton from './PrimaryButton';
import AppLayout from './AppLayout';
import { useStreak } from '../hooks/useStreak';
import { useTodayResult } from '../hooks/useTodayResult';
import type { Tab, RoundResult } from '../shared/types';
import type { ScenarioResponse, TodayRoundData } from '../../shared/api';
import { getPerformanceTier } from '../utils/performance';

type HomeScreenProps = {
  onNavigate: (tab: Tab) => void;
  onAnalyze: () => void;
  onViewTodayResult: (result: RoundResult) => void;
};

type ThreatStatus = {
  label: string;
  textClass: string;
  dotClass: string;
  pulse: boolean;
};

function getThreatStatus(round: TodayRoundData): ThreatStatus {
  const falsePositives = round.tappedIds.length - round.correctFlagsFound;
  const tier = getPerformanceTier(
    round.correctFlagsFound,
    round.totalRedFlags,
    falsePositives
  );

  if (tier === 'full') {
    return {
      label: 'Threat Contained',
      textClass: 'text-safe',
      dotClass: 'bg-safe',
      pulse: false,
    };
  }
  if (tier === 'none') {
    return {
      label: 'Threat Not Contained',
      textClass: 'text-danger',
      dotClass: 'bg-danger',
      pulse: true,
    };
  }
  return {
    label: 'Threat Mitigated',
    textClass: 'text-muted',
    dotClass: 'bg-muted',
    pulse: false,
  };
}

export default function HomeScreen({
  onNavigate,
  onAnalyze,
  onViewTodayResult,
}: HomeScreenProps) {
  const { data, isLoading, isError, retry } = useStreak();
  const { round } = useTodayResult(Boolean(data?.hasPlayedToday));

  const handleAnalyzeClick = async () => {
    if (data?.hasPlayedToday && round) {
      try {
        const scenarioJson: ScenarioResponse = await fetch(
          '/api/scenario'
        ).then((res) => res.json());

        onViewTodayResult({
          scenario: scenarioJson.scenario,
          tappedIds: new Set(round.tappedIds),
          correctFlagsFound: round.correctFlagsFound,
          totalRedFlags: round.totalRedFlags,
          score: round.score,
        });
        return;
      } catch (error) {
        console.error("Failed to load today's result:", error);
      }
    }

    onAnalyze();
  };

  const status: ThreatStatus | null =
    data?.hasPlayedToday && round ? getThreatStatus(round) : null;

  return (
    <AppLayout activeTab="analyze" onNavigate={onNavigate}>
      {isError ? (
        <div className="flex flex-col items-center gap-3">
          <span className="text-label-sm font-mono text-danger uppercase">
            Failed to connect
          </span>
          <button
            onClick={retry}
            className="text-label-sm font-mono text-muted hover:text-text border-b border-muted hover:border-text pb-1"
          >
            Retry
          </button>
        </div>
      ) : isLoading || !data ? (
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
            <span
              className={`w-2 h-2 block ${
                status ? status.dotClass : 'bg-danger'
              } ${status ? (status.pulse ? 'animate-pulse' : '') : 'animate-pulse'}`}
            />
            <span
              className={`text-code-md font-mono font-bold uppercase tracking-wide ${
                status ? status.textClass : 'text-danger'
              }`}
            >
              {status ? status.label : 'New Threat Detected'}
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

      {/* <div
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
      </div> */}
    </AppLayout>
  );
}
