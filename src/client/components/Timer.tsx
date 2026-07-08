type TimerProps = {
  secondsRemaining: number;
  totalSeconds: number;
};

export default function Timer({ secondsRemaining, totalSeconds }: TimerProps) {
  const pct = Math.max(0, (secondsRemaining / totalSeconds) * 100);
  const isUrgent = secondsRemaining <= 10;

  return (
    <section className="w-full px-4 py-3 flex flex-col gap-2 border-b border-border bg-background">
      <div className="flex justify-between items-center w-full">
        <span className="text-label-sm font-mono text-danger uppercase tracking-widest">
          Time Remaining
        </span>

        <span
          className={`text-code-md font-mono text-danger font-bold ${isUrgent ? 'animate-pulse' : ''}`}
        >
          {String(secondsRemaining).padStart(2, '0')}s
        </span>
      </div>
      <div className="w-full h-1 bg-surface overflow-hidden">
        <div
          className="h-full bg-danger transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
    </section>
  );
}
