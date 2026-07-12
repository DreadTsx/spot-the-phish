import { FlagOverlay } from './FlagOverlay';
import type { Scenario } from '../shared/types';

type ScenarioViewProps = {
  scenario: Scenario;
  tappedIds: Set<string>;
  onToggleFlag: (id: string) => void;
};

export function ScenarioView({
  scenario,
  tappedIds,
  onToggleFlag,
}: ScenarioViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-muted" />
        <span className="text-label-sm font-mono text-muted uppercase">
          Target ID: {scenario.id}
        </span>
      </div>

      <article className="relative bg-surface border border-border flex flex-col text-code-md font-mono text-muted leading-relaxed">
        <div className="border-b border-border p-3 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-widest text-muted opacity-70">
              From:
            </span>
            <FlagOverlay
              id={scenario.sender.id}
              isTapped={tappedIds.has(scenario.sender.id)}
              onTap={onToggleFlag}
            >
              <span className="text-text break-all">
                {scenario.sender.text}
              </span>
            </FlagOverlay>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <div className="flex text-[11px] uppercase tracking-widest text-muted opacity-70 gap-2">
              <span className="w-12">To:</span>
              <span className="text-text normal-case">
                {scenario.recipient}
              </span>
            </div>
            <div className="flex text-[11px] uppercase tracking-widest text-muted opacity-70 gap-2">
              <span className="w-12">Date:</span>
              <span className="text-text normal-case">{scenario.date}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-dashed border-border">
            <span className="text-[11px] uppercase tracking-widest text-muted opacity-70 mb-1">
              Subject:
            </span>
            <FlagOverlay
              id={scenario.subject.id}
              isTapped={tappedIds.has(scenario.subject.id)}
              onTap={onToggleFlag}
            >
              <span className="text-text font-bold uppercase tracking-tight">
                {scenario.subject.text}
              </span>
            </FlagOverlay>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4 text-sm text-text/90">
          <p>{scenario.bodyIntro}</p>

          <FlagOverlay
            id={scenario.bodyFlaggedLine.id}
            isTapped={tappedIds.has(scenario.bodyFlaggedLine.id)}
            onTap={onToggleFlag}
            block
          >
            <span className="underline">{scenario.bodyFlaggedLine.text}</span>
          </FlagOverlay>

          <p>
            {scenario.bodyLinkIntro ??
              'Click the secure link below to complete the verification process:'}
          </p>

          <FlagOverlay
            id={scenario.bodyLink.id}
            isTapped={tappedIds.has(scenario.bodyLink.id)}
            onTap={onToggleFlag}
            block
          >
            <div className="p-3 bg-background border border-border break-all text-danger">
              {scenario.bodyLink.text}
            </div>
          </FlagOverlay>

          <p className="mt-2">{scenario.bodyOutro}</p>
        </div>

        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-text opacity-50" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-text opacity-50" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-text opacity-50" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-text opacity-50" />
      </article>
    </div>
  );
}
