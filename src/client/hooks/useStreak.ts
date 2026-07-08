import { useEffect, useState } from 'react';

export type StreakData = {
  current: number;
  longestStreak: number;
  hasPlayedToday: boolean;
};

/**
 * ! I need to replace the mock below with a real fetch to the Hono backend once it exists.
 */
export function useStreak() {
  const [data, setData] = useState<StreakData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mock: StreakData = {
      current: 14,
      longestStreak: 24,
      hasPlayedToday: false,
    };
    const timer = setTimeout(() => {
      setData(mock);
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
}
