import { Flame } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

type StreakCardProps = {
  streak: number;
};

export default function StreakCard({ streak }: StreakCardProps) {
  const displayedStreak = useCountUp(streak, 500);

  return (
    <div className="relative bg-surface border border-border p-6 flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F2F2F2 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />

      <div className="flex flex-col items-center animate-streak-pop z-10">
        <Flame
          className="text-danger mb-2 animate-flame-flicker"
          size={32}
          fill="currentColor"
        />
        <div className="text-[80px] leading-none font-mono font-bold text-text tracking-tighter">
          {displayedStreak}
        </div>
      </div>

      <div className="text-label-sm font-mono text-muted uppercase mt-4 tracking-widest z-10">
        Day Streak
      </div>

      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-muted" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-muted" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-muted" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-muted" />
    </div>
  );
}
