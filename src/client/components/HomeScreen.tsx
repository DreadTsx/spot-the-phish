import { StreakCard } from './StreakCard';
import PrimaryButton from './PrimaryButton';
import { useStreak } from '../hooks/useStreak';

export function HomeScreen() {
  const { data, isLoading } = useStreak();

  return (
    <main className="w-full max-w-120 min-h-screen mx-auto flex flex-col border-x border-border bg-background">
      <header className="w-full sticky top-0 z-40 bg-danger text-text flex justify-between items-center px-gutter h-14 border-b border-danger">
        <h1 className="text-headline-md font-sans font-bold tracking-tighter uppercase">
          Spot The Phish
        </h1>
      </header>

      <div className="flex-1 flex flex-col p-4 gap-6 mt-4">
        {isLoading || !data ? (
          <div className="text-label-sm font-mono text-muted uppercase">
            Loading...
          </div>
        ) : (
          <StreakCard streak={data.current} />
        )}

        <div className="flex flex-col gap-3 mt-8">
          <div className="flex justify-between items-center px-1">
            <span className="text-code-md font-mono text-muted">
              {new Date().toISOString().split('T')[0]}
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-danger animate-pulse block" />
              <span className="text-code-md font-mono text-danger font-bold uppercase tracking-wide">
                New Threat Detected
              </span>
            </div>
          </div>

          <PrimaryButton
            label="Analyze Today's Message"
            variant="danger"
            //! Would use this to redirect to the gameplay
            onclick={() => {}}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-muted
          hover:text-text font-mono text-code-md border-b border-muted
          hover:border-text pb-1"
          >
            View Leaderboard
          </a>
        </div>
      </div>
    </main>
  );
}
