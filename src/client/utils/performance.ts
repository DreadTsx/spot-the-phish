export type PerformanceTier = 'full' | 'partial' | 'none';

export function getPerformanceTier(
  correctFlagsFound: number,
  totalRedFlags: number,
  falsePositives: number
): PerformanceTier {
  const allCorrect = correctFlagsFound === totalRedFlags;
  const noFalsePositives = falsePositives <= 0;

  if (allCorrect && noFalsePositives) return 'full';
  if (correctFlagsFound === 0 && falsePositives === 0) return 'none';
  return 'partial';
}
