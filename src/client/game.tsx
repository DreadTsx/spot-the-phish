import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { navigateTo } from '@devvit/web/client';
import HomeScreen from './components/HomeScreen';

export const App = () => {
  return <HomeScreen />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
