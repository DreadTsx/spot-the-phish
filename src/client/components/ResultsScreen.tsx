import AppLayout from './AppLayout';
import FlagReveal from './FlagReveal';
import { useStreak } from '../hooks/useStreak';
import type { RoundResult, FlagSegment, Tab } from '../shared/types';
import PrimaryButton from './PrimaryButton';

type ResultsScreenProps = {
  result: RoundResult;
  onNavigate: (tab: Tab) => void;
};

function getStatus(flag: FlagSegment, tapped: boolean) {
  if (flag.isRedFlag && tapped) return 'correct' as const;
  if (flag.isRedFlag && !tapped) return 'missed' as const;
  if (!flag.isRedFlag && tapped) return 'falsePositive' as const;
  return 'clear' as const;
}

function getPerformanceLabel(correct: number, total: number) {
  const ratio = total === 0 ? 1 : correct / total;
  if (ratio === 1) return 'Sharp Eye';
  if (ratio >= 0.5) return 'Nice Catch';
  return 'Stay Alert';
}

export default function ResultsScreen({
  result,
  onNavigate,
}: ResultsScreenProps) {
  const { scenario, tappedIds, correctFlagsFound, totalRedFlags } = result;
  const { data: streak } = useStreak();

  return (
    <AppLayout activeTab="analyze" onNavigate={onNavigate}>
      {/* Hero score */}
      <section className="text-center pt-2 pb-2 animate-fade-in-up">
        <h1 className="text-headline-lg-mobile font-sans font-bold text-text mb-1">
          {correctFlagsFound}/{totalRedFlags} Flags Found
        </h1>
        <p className="text-label-sm font-mono text-safe uppercase tracking-widest">
          {getPerformanceLabel(correctFlagsFound, totalRedFlags)}
        </p>
      </section>

      {/* Streak badge */}
      <section
        className="flex justify-center items-center gap-2 border border-safe bg-surface px-4 py-2 w-max mx-auto animate-fade-in-up"
        style={{ animationDelay: '60ms' }}
      >
        <span className="text-code-md font-mono text-text">
          {streak ? streak.current : '–'} Day Streak
        </span>
      </section>

      {/* Annotated message recap */}
      <article
        className="bg-surface border border-border w-full flex flex-col text-code-md font-mono text-muted leading-relaxed animate-fade-in-up"
        style={{ animationDelay: '120ms' }}
      >
        <div className="border-b border-border p-3 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-widest text-muted opacity-70">
              From:
            </span>
            <FlagReveal
              status={getStatus(
                scenario.sender,
                tappedIds.has(scenario.sender.id)
              )}
              explanation={scenario.sender.explanation}
            >
              <span className="text-text break-all">
                {scenario.sender.text}
              </span>
            </FlagReveal>
          </div>

          <div className="flex flex-col gap-1 mt-2">
            <div className="flex text-[11px] uppercase tracking-widest text-muted opacity-70 gap-2">
              <span className="w-12">To:</span>
              <span className="text-text normal-case">
                {scenario.recipient}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-2 pt-2 border-t border-dashed border-border">
            <span className="text-[11px] uppercase tracking-widest text-muted opacity-70 mb-1">
              Subject:
            </span>
            <FlagReveal
              status={getStatus(
                scenario.subject,
                tappedIds.has(scenario.subject.id)
              )}
              explanation={scenario.subject.explanation}
            >
              <span className="text-text font-bold uppercase tracking-tight">
                {scenario.subject.text}
              </span>
            </FlagReveal>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4 text-sm text-text/90">
          <p>{scenario.bodyIntro}</p>

          <FlagReveal
            status={getStatus(
              scenario.bodyFlaggedLine,
              tappedIds.has(scenario.bodyFlaggedLine.id)
            )}
            explanation={scenario.bodyFlaggedLine.explanation}
            block
          >
            <span className="underline">{scenario.bodyFlaggedLine.text}</span>
          </FlagReveal>

          <p>
            Click the secure link below to complete the verification process:
          </p>

          <FlagReveal
            status={getStatus(
              scenario.bodyLink,
              tappedIds.has(scenario.bodyLink.id)
            )}
            explanation={scenario.bodyLink.explanation}
            block
          >
            <div className="p-3 bg-background break-all text-danger">
              {scenario.bodyLink.text}
            </div>
          </FlagReveal>

          <p className="mt-2">{scenario.bodyOutro}</p>
        </div>
      </article>
      <div
        className="flex flex-col gap-3 mt-6 animate-fade-in-up"
        style={{ animationDelay: '180ms' }}
      >
        <PrimaryButton
          label="View Leaderboard"
          variant="ghost"
          onclick={() => onNavigate('ranking')}
        />
        <PrimaryButton
          label="Share Result"
          variant="safe"
          onclick={() => {
            //! wire real share functionality later
          }}
        />
      </div>
    </AppLayout>
  );
}
