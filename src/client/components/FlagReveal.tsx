import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import React from 'react';

type FlagStatus = 'correct' | 'missed' | 'falsePositive' | 'clear';

type FlagRevealProps = {
  status: FlagStatus;
  explanation: string;
  block?: boolean;
  children: React.ReactNode;
};

export default function FlagReveal({
  status,
  explanation,
  block = false,
  children,
}: FlagRevealProps) {
  if (status === 'clear') {
    return <span>{children}</span>;
  }

  const styles: Record<
    Exclude<FlagStatus, 'clear'>,
    { border: string; text: string; Icon: typeof CheckCircle2 }
  > = {
    correct: {
      border: 'border-safe bg-safe/10',
      text: 'text-safe',
      Icon: CheckCircle2,
    },
    missed: {
      border: 'border-danger bg-danger/10',
      text: 'text-danger',
      Icon: AlertTriangle,
    },
    falsePositive: {
      border: 'border-danger border-dashed bg-danger/5',
      text: 'text-danger',
      Icon: XCircle,
    },
  };

  const { border, text, Icon } = styles[status];

  return (
    <div
      className={`${block ? 'w-full' : 'inline-block w-fit'} flex flex-col gap-1`}
    >
      <div className={`border px-1 ${border} ${block ? 'w-full' : 'w-fit'}`}>
        {children}
      </div>
      <div className={`flex items-center gap-1 text-[10px] font-mono ${text}`}>
        <Icon size={11} />
        <span>{explanation}</span>
      </div>
    </div>
  );
}
