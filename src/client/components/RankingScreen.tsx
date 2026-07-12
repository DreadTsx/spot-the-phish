import { useState } from 'react';
import { Flame } from 'lucide-react';
import AppLayout from './AppLayout';
import { useLeaderboard } from '../hooks/useLeaderboard';
import type { Tab } from '../shared/types';
import { getRankLabel } from '../utils/rank';

type RankingScreenProps = {
  onNavigate: (tab: Tab) => void;
};

export default function RankingScreen({ onNavigate }: RankingScreenProps) {
  const [scope, setScope] = useState<'today' | 'alltime'>('today');
  const { data, isLoading } = useLeaderboard(scope);

  return (
    <AppLayout activeTab="ranking" onNavigate={onNavigate}>
      <div className="flex w-full border border-border bg-surface animate-fade-in-up">
        <button
          onClick={() => setScope('today')}
          className={`flex-1 py-2 text-label-sm font-mono uppercase font-bold transition-colors ${
            scope === 'today'
              ? 'bg-safe text-background'
              : 'text-muted hover:text-text'
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setScope('alltime')}
          className={`flex-1 py-2 text-label-sm font-mono uppercase font-bold border-l border-border transition-colors ${
            scope === 'alltime'
              ? 'bg-safe text-background'
              : 'text-muted hover:text-text'
          }`}
        >
          All-Time
        </button>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        {isLoading || !data ? (
          <span className="text-label-sm font-mono text-muted uppercase">
            Loading...
          </span>
        ) : data.top.length === 0 ? (
          <span className="text-label-sm font-mono text-muted uppercase">
            No scores yet — be the first to play today.
          </span>
        ) : (
          data.top.map((entry, i) => {
            const isTopThree = entry.rank <= 3;
            return (
              <div
                key={entry.username}
                className={`flex items-center justify-between gap-3 p-4 animate-fade-in-up ${
                  isTopThree
                    ? 'bg-surface border border-safe'
                    : 'border-b border-border'
                }`}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-8 shrink-0 text-center font-mono ${
                      isTopThree
                        ? 'text-headline-md text-safe'
                        : 'text-label-sm text-muted'
                    }`}
                  >
                    {String(entry.rank).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`font-mono tracking-wide truncate ${
                          isTopThree
                            ? 'text-body-md font-bold text-text'
                            : 'text-label-sm text-muted'
                        }`}
                      >
                        {entry.username}
                      </span>
                      {isTopThree && (
                        <Flame
                          size={14}
                          className="text-safe shrink-0"
                          fill="currentColor"
                        />
                      )}
                    </div>
                    {isTopThree && (
                      <span className="text-[9px] font-mono text-safe border border-safe px-1.5 py-0.5 uppercase tracking-widest w-fit">
                        {getRankLabel(entry.longestStreak)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-mono text-code-md text-safe shrink-0">
                  {entry.score.toLocaleString()}
                </span>
              </div>
            );
          })
        )}

        {data?.currentUser &&
          !data.top.some((e) => e.username === data.currentUser!.username) && (
            <div className="mt-4 border-l-4 border-safe bg-surface border-y border-r p-3 flex items-center justify-between animate-fade-in-up">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-label-sm font-mono text-text w-8 shrink-0 text-center">
                  {data.currentUser.rank}
                </span>
                <span className="text-body-md font-mono text-text font-bold truncate">
                  You ({data.currentUser.username})
                </span>
              </div>
              <span className="text-code-md font-mono text-text shrink-0">
                {data.currentUser.score.toLocaleString()}
              </span>
            </div>
          )}
      </div>
    </AppLayout>
  );
}
