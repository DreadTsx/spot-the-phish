import { Flame } from 'lucide-react';

type StreakCardProps = {
  streak: number;
};

export default function StreakCard({ streak }: StreakCardProps) {
  return (
    <div className="relative bg-surface border border-border p-6 flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle dot-grid texture, matches the SOC "technical readout" feel */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#F2F2F2 1px, transparent 1px)',
          backgroundSize: '8px 8px',
        }}
      />

      <Flame className="text-danger mb-2 z-10" size={32} fill="currentColor" />

      <div className="text-[80px] leading-none font-mono font-bold text-text tracking-tighter z-10">
        {streak}
      </div>

      <div className="text-label-sm font-mono text-muted uppercase mt-4 tracking-widest z-10">
        Day Streak
      </div>

      {/* Corner bracket decoration */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-muted" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-muted" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-muted" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-muted" />
    </div>
  );
}
