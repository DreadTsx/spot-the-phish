import { useEffect, useState } from 'react';
import type { TodayResultResponse, TodayRoundData } from '../../shared/api';

export function useTodayResult(enabled: boolean) {
  const [round, setRound] = useState<TodayRoundData | null>(null);
  const [isLoading, setIsLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    fetch('/api/today-result')
      .then((res) => res.json())
      .then((json: TodayResultResponse) => {
        if (cancelled) return;
        setRound(json.round);
      })
      .catch((error) => console.error("Failed to load today's result:", error))
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { round, isLoading };
}
