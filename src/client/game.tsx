import './index.css';

import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import HomeScreen from './components/HomeScreen';
import IntelScreen from './components/IntelScreen';
import RankingScreen from './components/RankingScreen';
import GameplayScreen from './components/GameplayScreen';
import ProfileScreen from './components/ProfileScreen';
import ResultsScreen from './components/ResultsScreen';
import type { Tab, RoundResult } from './shared/types';

const SCREENS: Record<
  Tab,
  React.ComponentType<{ onNavigate: (tab: Tab) => void }>
> = {
  analyze: HomeScreen,
  intel: IntelScreen,
  ranking: RankingScreen,
  profile: ProfileScreen,
};

export const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>('analyze');
  const [isPlaying, setIsPlaying] = useState(false);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);

  if (roundResult) {
    return (
      <ResultsScreen
        result={roundResult}
        onNavigate={(tab) => {
          setRoundResult(null);
          setActiveTab(tab);
        }}
      />
    );
  }

  if (isPlaying) {
    return (
      <GameplayScreen
        onComplete={(result) => {
          setIsPlaying(false);
          setRoundResult(result);
        }}
      />
    );
  }

  if (activeTab === 'analyze') {
    return (
      <HomeScreen
        onNavigate={setActiveTab}
        onAnalyze={() => setIsPlaying(true)}
      />
    );
  }
  const Screen = SCREENS[activeTab];

  return <Screen onNavigate={setActiveTab} />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
