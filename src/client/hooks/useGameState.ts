import { useEffect, useState, useCallback, useMemo } from 'react';
import type { Scenario } from '../shared/types';
import type { ScenarioResponse, SubmitResponse } from '../../shared/api';

const ROUND_SECONDS = 30;
const BASE_SCORE = 1000;

export function useGameState() {
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(ROUND_SECONDS);
  const [tappedIds, setTappedIds] = useState<Set<string>>(new Set());
  const [phase, setPhase] = useState<'playing' | 'ended'>('playing');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const endRound = useCallback(() => {
    setPhase((current) => (current === 'playing' ? 'ended' : current));
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (isLoadingScenario) return;

    const timer = setTimeout(() => {
      setSecondsRemaining((s) => {
        const next = s - 1;
        if (next <= 0) {
          endRound();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase, secondsRemaining, isLoadingScenario, endRound]);

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

  const submitRound = useCallback(async (): Promise<SubmitResponse | null> => {
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tappedIds: Array.from(tappedIds) }),
      });
      const json: SubmitResponse = await res.json();
      return json;
    } catch (error) {
      console.error('Failed to submit round:', error);
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [tappedIds]);

  return {
    scenario,
    isLoadingScenario,
    secondsRemaining,
    totalSeconds: ROUND_SECONDS,
    phase,
    tappedIds,
    toggleFlag,
    endRound,
    submitRound,
    isSubmitting,
    correctFlagsFound,
    totalRedFlags,
    score,
  };
}
