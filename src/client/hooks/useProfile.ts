import { useEffect, useState, useCallback } from 'react';
import type { ProfileData } from '../shared/types';
import type { ProfileResponse } from '../../shared/api';

export function useProfile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [succeededAttempt, setSucceededAttempt] = useState<number | null>(null);
  const [erroredAttempt, setErroredAttempt] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/profile')
      .then((res) => res.json())
      .then((json: ProfileResponse) => {
        if (cancelled) return;
        setData(json.profile);
        setSucceededAttempt(retryCount);
      })
      .catch((error) => {
        console.error('Failed to load profile:', error);
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
