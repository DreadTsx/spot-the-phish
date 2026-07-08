import { useEffect, useState, useCallback, useMemo } from 'react';
import { mockScenario } from '../data/mockScenario';
import type { Scenario } from '../shared/types';

const ROUND_SECONDS = 30;
const BASE_SCORE = 1000;

export function useGameState() {
  const [scenario] = useState<Scenario>(mockScenario);
  const [secondsRemaining, setSecondsRemaining] = useState(ROUND_SECONDS);
  const [tappedIds, setTappedIds] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<'playing' | 'ended'>('playing');

  const allFlags = useMemo(
    () => [
      scenario.sender,
      scenario.subject,
      scenario.bodyFlaggedLine,
      scenario.bodyLink,
    ],
    [scenario]
  );
  const totalRedFlags = useMemo(
    () => allFlags.filter((f) => f.isRedFlag).length,
    [allFlags]
  );

  const submit = useCallback(() => {
    setPhase((current) => (current === 'playing' ? 'ended' : current));
  }, []);

  // Countdown — auto-submits at zero
  useEffect(() => {
    if (phase !== 'playing') return;
    if (secondsRemaining <= 0) {
      submit();
      return;
    }
    const timer = setTimeout(() => setSecondsRemaining((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, secondsRemaining, submit]);

  const toggleFlag = useCallback(
    (id: string) => {
      if (phase !== 'playing') return;
      setTappedIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
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
