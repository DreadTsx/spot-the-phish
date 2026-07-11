import { Flame, History } from 'lucide-react';
import AppLayout from './AppLayout';
import { useProfile } from '../hooks/useProfile';
import type { Tab } from '../shared/types';

type ProfileScreenProps = {
  onNavigate: (tab: Tab) => void;
};

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().split('T')[0]!);
  }
  return days;
}

function getRankLabel(threatsDetected: number): string {
  if (threatsDetected >= 500) return 'Gold Analyst';
  if (threatsDetected >= 100) return 'Silver Analyst';
  return 'Bronze Analyst';
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { data, isLoading } = useProfile();

  if (isLoading || !data) {
    return (
      <AppLayout activeTab="profile" onNavigate={onNavigate}>
        <span className="text-label-sm font-mono text-muted uppercase">
          Loading...
        </span>
      </AppLayout>
    );
  }

  const {
    streak,
    totalScore,
    threatsDetected,
    falsePositives,
    recentPlayDates,
  } = data;
  const totalRounds = threatsDetected + falsePositives;
  const accuracy =
    totalRounds === 0 ? 0 : Math.round((threatsDetected / totalRounds) * 100);
  const last7 = getLast7Days();
  const playedSet = new Set(recentPlayDates);

  return (
    <AppLayout activeTab="profile" onNavigate={onNavigate}>
      <div className="flex justify-between items-end animate-fade-in-up">
        <div>
          <p className="text-label-sm font-mono text-muted mb-1">Rank</p>
          <h2 className="text-headline-lg-mobile font-sans font-bold text-text uppercase tracking-tight">
            {getRankLabel(threatsDetected)}
          </h2>
        </div>
        <div className="border border-safe px-3 py-1">
          <span className="text-label-sm font-mono text-safe uppercase">
            {streak.current} Day{streak.current === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      <section
        className="bg-surface border border-border p-4 flex gap-4 w-full mt-6 animate-fade-in-up"
        style={{ animationDelay: '60ms' }}
      >
        <div className="flex-1 flex flex-col justify-center items-center p-4 border-r border-border">
          <p className="text-label-sm font-mono text-muted mb-2 text-center uppercase">
            Current Streak
          </p>
          <div className="flex items-center gap-2">
            <Flame size={22} className="text-safe" fill="currentColor" />
            <span className="text-[36px] font-mono font-bold text-text">
              {streak.current}
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <p className="text-label-sm font-mono text-muted mb-2 text-center uppercase">
            Longest Streak
          </p>
          <div className="flex items-center gap-2">
            <History size={22} className="text-muted" />
            <span className="text-[36px] font-mono font-bold text-text">
              {streak.longestStreak}
            </span>
          </div>
        </div>
      </section>

      <section
        className="bg-surface border border-border p-4 flex flex-col gap-4 mt-4 animate-fade-in-up"
        style={{ animationDelay: '120ms' }}
      >
        <div className="flex justify-between items-center border-b border-border pb-2">
          <h3 className="text-label-sm font-mono text-text uppercase">
            7-Day Activity
          </h3>
        </div>
        <div className="flex justify-between items-center w-full gap-2 pt-2">
          {last7.map((date) => (
            <div
              key={date}
              className={`w-full aspect-square border ${
                playedSet.has(date)
                  ? 'bg-safe border-safe'
                  : 'bg-transparent border-border'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between w-full mt-1 px-1">
          <span className="text-[10px] font-mono text-muted">T-7</span>
          <span className="text-[10px] font-mono text-muted">Today</span>
        </div>
      </section>

      <section
        className="bg-surface border border-border p-4 flex flex-col gap-3 mt-4 animate-fade-in-up"
        style={{ animationDelay: '180ms' }}
      >
        <div className="border-b border-border pb-2">
          <h3 className="text-label-sm font-mono text-text uppercase">
            Lifetime Performance
          </h3>
        </div>
        <div className="flex justify-between items-end pt-2">
          <span className="text-label-sm font-mono text-muted uppercase">
            Total Score
          </span>
          <span className="text-body-md font-mono text-text">
            {totalScore.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-label-sm font-mono text-muted uppercase">
            Threats Detected
          </span>
          <span className="text-body-md font-mono text-text">
            {threatsDetected.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-label-sm font-mono text-muted uppercase">
            False Positives
          </span>
          <span className="text-body-md font-mono text-danger">
            {falsePositives.toLocaleString()}
          </span>
        </div>

        {totalRounds > 0 && (
          <>
            <div className="mt-4 w-full h-2 bg-background border border-border flex">
              <div
                className="h-full bg-safe"
                style={{ width: `${accuracy}%` }}
              />
              <div
                className="h-full bg-danger"
                style={{ width: `${100 - accuracy}%` }}
              />
            </div>
            <div className="flex justify-between w-full mt-1">
              <span className="text-[10px] font-mono text-safe">
                Accuracy {accuracy}%
              </span>
              <span className="text-[10px] font-mono text-danger">
                Err {100 - accuracy}%
              </span>
            </div>
          </>
        )}
      </section>
    </AppLayout>
  );
}
