import AppLayout from './AppLayout';

export default function IntelScreen() {
  return (
    <AppLayout activeTab="intel">
      <div className="text-label-sm font-mono text-muted uppercase">
        Intelligence Dashboard
      </div>
      <div className="text-code-md font-mono text-text">
        Threat intelligence and analysis data will appear here.
      </div>
    </AppLayout>
  );
}