import { useEffect, useState, useCallback, useMemo } from 'react';
import type { Scenario } from '../shared/types';
import type { ScenarioResponse } from '../../shared/api';

const ROUND_SECONDS = 30;
const BASE_SCORE = 1000;

export function useGameState() {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(ROUND_SECONDS);
  const [tappedIds, setTappedIds] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<'playing' | 'ended'>('playing');

  // Fetch today's scenario once on mount
  useEffect(() => {
    let cancelled = false;

    fetch('/api/scenario')
      .then((res) => res.json())
      .then((json: ScenarioResponse) => {
        if (cancelled) return;
        setScenario(json.scenario);
        setIsLoadingScenario(false);
      })
      .catch((error) => {
        console.error('Failed to load scenario:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const allFlags = useMemo(() => {
    if (!scenario) return [];
    return [
      scenario.sender,
      scenario.subject,
      scenario.bodyFlaggedLine,
      scenario.bodyLink,
    ];
  }, [scenario]);

  const totalRedFlags = useMemo(
    () => allFlags.filter((f) => f.isRedFlag).length,
    [allFlags]
  );

  const submit = useCallback(() => {
    setPhase((current) => (current === 'playing' ? 'ended' : current));
  }, []);

  // Countdown — only runs once the scenario has actually loaded, and
  // auto-submits when it hits zero
  useEffect(() => {
    if (phase !== 'playing') return;
    if (isLoadingScenario) return;

    const timer = setTimeout(() => {
      setSecondsRemaining((s) => {
        const next = s - 1;
        if (next <= 0) {
          submit();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, secondsRemaining, isLoadingScenario, submit]);

  const toggleFlag = useCallback(
    (id: string) => {
      if (phase !== 'playing') return;
      setTappedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [phase]
  );

  const correctFlagsFound = useMemo(
    () => allFlags.filter((f) => f.isRedFlag && tappedIds.has(f.id)).length,
    [allFlags, tappedIds]
  );

  const score = useMemo(
    () => BASE_SCORE + correctFlagsFound * 250,
    [correctFlagsFound]
  );

  return {
    scenario,
    isLoadingScenario,
    secondsRemaining,
    totalSeconds: ROUND_SECONDS,
    phase,
    tappedIds,
    toggleFlag,
    submit,
    correctFlagsFound,
    totalRedFlags,
    score,
  };
}
