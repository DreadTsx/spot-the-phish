import { useEffect, useRef, useState } from 'react';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#$%&@';

type GlitchTextProps = {
  text: string;
  className?: string;
};

export function GlitchText({ text, className }: GlitchTextProps) {
  const [display, setDisplay] = useState(text);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    function glitchOnce() {
      const chars = text.split('');
      const glitchCount = Math.max(1, Math.floor(chars.length * 0.15));

      for (let i = 0; i < glitchCount; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        if (chars[idx] === ' ' || chars[idx] === '\n') continue;
        chars[idx] =
          GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]!;
      }
      setDisplay(chars.join(''));

      timeoutRef.current = setTimeout(
        () => {
          setDisplay(text);
          scheduleNext();
        },
        90 + Math.random() * 80
      );
    }

    function scheduleNext() {
      timeoutRef.current = setTimeout(glitchOnce, 1800 + Math.random() * 2200);
    }

    scheduleNext();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text]);

  return <span className={className}>{display} </span>;
}
