import './index.css';

import React, { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import HomeScreen from './components/HomeScreen';
import IntelScreen from './components/IntelScreen';
import RankingScreen from './components/RankingScreen';
import GameplayScreen from './components/GameplayScreen';
import ProfileScreen from './components/ProfileScreen';
import type { Tab } from './shared/types';

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

  if (isPlaying) {
    return <GameplayScreen onExit={() => setIsPlaying(false)} />;
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
