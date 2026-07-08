import { Terminal, Shield, BarChart3, CircleUser } from 'lucide-react';

type Tab = 'analyze' | 'intel' | 'ranking' | 'profile';

const TABS: { id: Tab; label: string; Icon: typeof Terminal }[] = [
  { id: 'analyze', label: 'Analyze', Icon: Terminal },
  { id: 'intel', label: 'Intel', Icon: Shield },
  { id: 'ranking', label: 'Ranking', Icon: BarChart3 },
  { id: 'profile', label: 'Profile', Icon: CircleUser },
];

type BottomNavProps = {
  active: Tab;
  onNavigate?: (tab: Tab) => void;
};

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 w-full max-w-120 bg-surface border-t border-border flex justify-around items-center z-50">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            onClick={() => onNavigate?.(id)}
            className={`flex flex-col items-center justify-center py-3 flex-1 border-t-2 transition-colors ${
              isActive
                ? 'text-danger border-danger bg-danger/5'
                : 'text-muted border-transparent hover:text-text hover:bg-border/30'
            }`}
          >
            <Icon
              size={20}
              className="mb-1"
              fill={isActive ? 'currentColor' : 'none'}
            />
            <span className="text-label-sm font-mono uppercase tracking-widest">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
