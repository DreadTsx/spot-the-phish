import './index.css';

import { navigateTo } from '@devvit/web/client';
import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ShieldAlert } from 'lucide-react';
import { GlitchText } from './components/GlitchText';

export const Splash = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-text font-body-md overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(42,45,53,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42,45,53,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div
        className="fixed top-4 left-4 text-label-sm font-mono text-muted tracking-widest uppercase opacity-40 z-10"
        aria-hidden="true"
      >
        <GlitchText text="SYS_OS: KERNEL_PHISH_4.2" />
        <br />
        <GlitchText text="SEC_LVL: ALPHA" />
      </div>
      <div
        className="fixed top-4 right-4 text-label-sm font-mono text-muted tracking-widest text-right opacity-40 z-10"
        aria-hidden="true"
      >
        <GlitchText text="SIGNAL: 98%" />
        <br />
        <GlitchText text="ENCRYPTION: AES-256-GCM" />
      </div>

      <header className="relative z-10 w-full h-16 flex justify-center items-center border-b border-border">
        <div className="flex items-center gap-2">
          <ShieldAlert size={20} className="text-danger" />
          <h1 className="text-headline-md font-sans font-bold text-danger tracking-tighter uppercase">
            Spot The Phish
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-margin z-10 relative">
        <div className="max-w-md w-full border border-border bg-surface p-gutter relative">
          <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-danger" />
          <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-danger" />
          <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-danger" />
          <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-danger" />

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-32 h-32 flex items-center justify-center relative">
              <div className="absolute inset-0 border border-border border-dashed opacity-40 animate-[spin_20s_linear_infinite]" />
              <ShieldAlert size={48} className="text-danger relative z-10" />
            </div>

            <div className="inline-flex items-center gap-2 border border-safe bg-safe/10 px-4 py-1">
              <span className="w-2 h-2 bg-safe animate-pulse" />
              <span className="text-label-sm font-mono text-safe">
                System Status: Ready
              </span>
            </div>

            <h2 className="text-headline-lg-mobile font-mono text-text tracking-tight uppercase">
              Welcome,{' '}
              <span className="text-danger">
                {context.username ?? 'operator'}
              </span>
            </h2>

            <p className="text-label-sm font-mono text-muted max-w-xs uppercase">
              Protocol initialized. Security clearance verified. Awaiting
              command to begin daily threat analysis.
            </p>

            <button
              className="w-full mt-4 bg-danger text-text text-label-sm font-mono font-bold py-4 uppercase tracking-wide transition-colors hover:bg-[#F25A5F] active:scale-[0.98]"
              onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
            >
              Initialize Session
            </button>

            <div className="flex justify-center gap-6 pt-2 text-label-sm font-mono text-muted">
              <button
                className="hover:text-text transition-colors"
                onClick={() => navigateTo('https://developers.reddit.com/docs')}
              >
                Docs
              </button>
              <button
                className="hover:text-text transition-colors"
                onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}
              >
                r/Devvit
              </button>
              <button
                className="hover:text-text transition-colors"
                onClick={() =>
                  navigateTo('https://discord.com/invite/R7yu2wh9Qz')
                }
              >
                Discord
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
