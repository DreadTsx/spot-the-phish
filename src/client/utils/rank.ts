export function getRankLabel(longestStreak: number): string {
  if (longestStreak >= 7) return 'Gold Analyst';
  if (longestStreak >= 3) return 'Silver Analyst';
  return 'Bronze Analyst';
}
