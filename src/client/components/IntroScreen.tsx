import { ShieldAlert } from 'lucide-react';

const BOOT_LINES = [
  '> INITIALIZING SCANNER MODULE... [OK]',
  '> ESTABLISHING SECURE UPLINK... [OK]',
  '> LOADING THREAT DATABASE... [OK]',
  '> CROSS-REFERENCING KNOWN PATTERNS... [OK]',
  '> CALIBRATING DETECTION ENGINE... [OK]',
  '> SYNCING OPERATOR CREDENTIALS... [OK]',
  '> VERIFYING SECURE CHANNEL... [OK]',
  '> AWAITING OPERATOR INPUT...',
];

const FIRST_LINE_DELAY = 500;
const LINE_SPACING = 480;

export default function IntroScreen() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-0.5 bg-danger/40 animate-scan-sweep pointer-events-none" />

      <ShieldAlert size={56} className="text-danger animate-shield-snap" />

      <div className="mt-8 flex flex-col gap-1 items-start">
        {BOOT_LINES.map((line, i) => (
          <span
            key={line}
            className="text-label-sm font-mono text-muted opacity-0 animate-fade-in-up"
            style={{
              animationDelay: `${FIRST_LINE_DELAY + i * LINE_SPACING}ms`,
            }}
          >
            {line}
          </span>
        ))}
        <span
          className="opacity-0 animate-fade-in-up mt-1"
          style={{
            animationDelay: `${FIRST_LINE_DELAY + BOOT_LINES.length * LINE_SPACING}ms`,
          }}
        >
          <span className="w-2 h-4 bg-muted animate-pulse inline-block" />
        </span>
      </div>

      <div className="w-48 h-1 bg-surface overflow-hidden mt-8">
        <div className="h-full bg-danger animate-progress-fill" />
      </div>
    </div>
  );
}
