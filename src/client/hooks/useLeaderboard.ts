import { useEffect, useState } from 'react';
import type { LeaderboardData } from '../shared/types';
import type { LeaderboardResponse } from '../../shared/api';

type Scope = 'today' | 'alltime';

export function useLeaderboard(scope: Scope) {
  const [result, setResult] = useState<{
    scope: Scope;
    data: LeaderboardData;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/leaderboard?scope=${scope}`)
      .then((res) => res.json())
      .then((json: LeaderboardResponse) => {
        if (cancelled) return;
        setResult({ scope: json.scope, data: json.data });
      })
      .catch((error) => console.error('Failed to load leaderboard:', error));

    return () => {
      cancelled = true;
    };
  }, [scope]);

  const isLoading = result === null || result.scope !== scope;
  const data = result && result.scope === scope ? result.data : null;

  return { data, isLoading };
}
