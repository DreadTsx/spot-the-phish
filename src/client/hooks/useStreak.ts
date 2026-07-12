import { useEffect, useState, useCallback } from 'react';
import type { StreakData } from '../shared/types';
import type { StreakResponse } from '../../shared/api';

export function useStreak() {
  const [data, setData] = useState<StreakData | null>(null);
  const [succeededAttempt, setSucceededAttempt] = useState<number | null>(null);
  const [erroredAttempt, setErroredAttempt] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/streak')
      .then((res) => res.json())
      .then((json: StreakResponse) => {
        if (cancelled) return;
        setData(json.streak);
        setSucceededAttempt(retryCount);
      })
      .catch((error) => {
        console.error('Failed to load streak:', error);
        if (!cancelled) setErroredAttempt(retryCount);
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const isLoading =
    succeededAttempt !== retryCount && erroredAttempt !== retryCount;
  const isError = erroredAttempt === retryCount;

  const retry = useCallback(() => setRetryCount((n) => n + 1), []);

  return { data, isLoading, isError, retry };
}
