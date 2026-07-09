import type { FlagSegment, Scenario } from '../../shared/types';
export type { FlagSegment, Scenario };
export type Tab = 'analyze' | 'intel' | 'ranking' | 'profile';

export type StreakData = {
  current: number;
  longestStreak: number;
  hasPlayedToday: boolean;
};

export type RoundResult = {
  scenario: Scenario;
  tappedIds: Set<string>;
  correctFlagsFound: number;
  totalRedFlags: number;
  score: number;
};
