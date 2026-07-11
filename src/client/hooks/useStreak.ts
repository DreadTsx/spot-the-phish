import { useEffect, useState } from 'react';
import type { StreakData } from '../shared/types';
import type { StreakResponse } from '../../shared/api';

export function useStreak() {
  const [data, setData] = useState<StreakData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/streak')
      .then((res) => res.json())
      .then((json: StreakResponse) => {
        if (cancelled) return;
        setData(json.streak);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load streak:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading };
}
