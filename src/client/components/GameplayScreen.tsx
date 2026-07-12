import { useEffect, useRef } from 'react';
import { ScenarioView } from './ScenarioView';
import Timer from './Timer';
import PrimaryButton from './PrimaryButton';
import { useGameState } from '../hooks/useGameState';
import { RoundResult } from '../shared/types';

type GameplayScreenProps = {
  onComplete: (result: RoundResult) => void;
};

export default function GameplayScreen({ onComplete }: GameplayScreenProps) {
  const {
    scenario,
    isLoadingScenario,
    secondsRemaining,
    totalSeconds,
    tappedIds,
    toggleFlag,
    endRound,
    submitRound,
    isSubmitting,
    correctFlagsFound,
    totalRedFlags,
    score,
    phase,
  } = useGameState();

  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (phase !== 'ended' || hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    void (async () => {
      const [result] = await Promise.all([
        submitRound(),
        new Promise((resolve) => setTimeout(resolve, 400)),
      ]);

      onComplete({
        scenario: scenario!,
        tappedIds,
        correctFlagsFound: result?.correctFlagsFound ?? correctFlagsFound,
        totalRedFlags: result?.totalRedFlags ?? totalRedFlags,
        score: result?.score ?? score,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (isLoadingScenario || !scenario) {
    return (
      <main className="w-full max-w-120 min-h-screen mx-auto flex flex-col items-center justify-center border-x border-border bg-background">
        <span className="text-label-sm font-mono text-muted uppercase tracking-widest">
          Loading Today&apos;s Threat...
        </span>
      </main>
    );
  }

  return (
    <main className="w-full max-w-120 min-h-screen mx-auto flex flex-col border-x border-border bg-background">
      <header className="flex justify-between items-center px-gutter h-14 w-full bg-surface border-b border-border animate-fade-in-up">
        <h1 className="text-headline-md font-sans font-bold tracking-tighter uppercase mx-auto">
          Spot The Phish
        </h1>
      </header>

      <div className="animate-fade-in-up" style={{ animationDelay: '40ms' }}>
        <Timer
          secondsRemaining={secondsRemaining}
          totalSeconds={totalSeconds}
        />
      </div>

      <section
        className="grow w-full p-4 flex flex-col gap-4 animate-fade-in-up"
        style={{ animationDelay: '100ms' }}
      >
        <ScenarioView
          scenario={scenario}
          tappedIds={tappedIds}
          onToggleFlag={toggleFlag}
        />

        <div className="flex gap-2 items-center w-full justify-end mt-2">
          <span className="text-[10px] font-mono text-muted uppercase">
            Flags Marked:
          </span>
          <div className="px-2 py-0.5 bg-surface border border-muted text-muted text-[10px] font-mono uppercase">
            {tappedIds.size}
          </div>
        </div>
      </section>

      <section className="w-full p-4 border-t border-border bg-surface">
        <PrimaryButton
          label={isSubmitting ? 'Submitting...' : 'Submit Analysis'}
          variant="danger"
          onclick={endRound}
          disabled={isSubmitting}
        />
      </section>
    </main>
  );
}
