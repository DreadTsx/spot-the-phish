import { ReactNode } from 'react';
import BottomNav from './BottomNav';
import type { Tab } from '../shared/types';

type AppLayoutProps = {
  children: ReactNode;
  activeTab: Tab;
  onNavigate: (tab: Tab) => void;
};

export default function AppLayout({
  children,
  activeTab,
  onNavigate,
}: AppLayoutProps) {
  return (
    <main className="w-full max-w-120 min-h-screen mx-auto flex flex-col border-x border-border bg-background pb-20">
      <header className="w-full sticky top-0 z-40 bg-danger text-text flex justify-between items-center px-gutter h-14 border-b border-danger">
        <h1 className="text-headline-md font-sans font-bold tracking-tighter text-center uppercase">
          Spot The Phish
        </h1>
      </header>

      <div className="flex-1 flex flex-col p-4 gap-6 mt-4">{children}</div>

      <BottomNav active={activeTab} onNavigate={onNavigate} />
    </main>
  );
}
