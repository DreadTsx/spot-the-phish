import { ArrowRight } from 'lucide-react';

type PrimaryButtonProp = {
  label: string;
  onclick?: () => void;
  variant: 'danger' | 'safe' | 'ghost';
};

export default function PrimaryButton({
  label,
  onclick,
  variant = 'danger',
}: PrimaryButtonProp) {
  const isSafe = variant === 'safe';
  const isGhost = variant === 'ghost';

  const variantClasses = isGhost
    ? 'bg-transparent text-muted border-muted hover:text-text hover:border-text'
    : isSafe
      ? 'bg-safe text-background border-safe hover:bg-[#5CF1A9]'
      : 'bg-danger text-text border-danger hover:bg-[#F25A5F]';
  return (
    <button
      onClick={onclick}
      className={`w-full py-4 px-5 font-sans text-[16px] font-bold flex items-center justify-between gap-2 border transition-all duration-150 ease-out active:scale-[0.98] group whitespace-nowrap ${variantClasses}`}
    >
      <span className="uppercase">{label}</span>
      {!isGhost && (
        <ArrowRight
          className="group-hover:translate-x-1 transition-transform"
          size={20}
        />
      )}
    </button>
  );
}
