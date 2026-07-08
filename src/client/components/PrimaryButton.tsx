import { ArrowRight } from 'lucide-react';

type PrimaryButtonProp = {
  label: string;
  onclick?: () => void;
  variant: 'danger' | 'safe';
};

export default function PrimaryButton({
  label,
  onclick,
  variant = 'danger',
}: PrimaryButtonProp) {
  const isSafe = variant === 'safe';
  return (
    <button
      onClick={onclick}
      className={`w-full py-5 px-6 font-sans text-headline-md font-bold flex items-center justify-between border transition-colors group ${isSafe ? 'bg-safe text-background border-safe hover:bg-[#5CF1A9]' : 'bg-danger text-text border-danger hover:bg-[#F25A5F]'}`}
    >
      <span className="uppercase tracking-wide">{label}</span>
      <ArrowRight
        className="group-hover:translate-x-1 transition-transform"
        size={20}
      />
    </button>
  );
}
