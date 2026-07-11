import { useEffect, useState } from 'react';
import type { ProfileData } from '../shared/types';
import type { ProfileResponse } from '../../shared/api';

export function useProfile() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/profile')
      .then((res) => res.json())
      .then((json: ProfileResponse) => {
        if (cancelled) return;
        setData(json.profile);
        setIsLoading(false);
      })
      .catch((error) => console.error('Failed to load profile:', error));

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading };
}
