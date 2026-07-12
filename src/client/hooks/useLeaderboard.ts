import { useEffect, useState, useCallback } from 'react';
import type { LeaderboardData } from '../shared/types';
import type { LeaderboardResponse } from '../../shared/api';

type Scope = 'today' | 'alltime';

export function useLeaderboard(scope: Scope) {
  const [result, setResult] = useState<{
    scope: Scope;
    data: LeaderboardData;
  } | null>(null);
  const [errorScope, setErrorScope] = useState<Scope | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/leaderboard?scope=${scope}`)
      .then((res) => res.json())
      .then((json: LeaderboardResponse) => {
        if (cancelled) return;
        setResult({ scope: json.scope, data: json.data });
        setErrorScope(null);
      })
      .catch((error) => {
        console.error('Failed to load leaderboard:', error);
        if (!cancelled) setErrorScope(scope);
      });

    return () => {
      cancelled = true;
    };
  }, [scope, retryCount]);

  const isLoading = result?.scope !== scope && errorScope !== scope;
  const isError = errorScope === scope;
  const data = result && result.scope === scope ? result.data : null;

  const retry = useCallback(() => setRetryCount((n) => n + 1), []);

  return { data, isLoading, isError, retry };
}
