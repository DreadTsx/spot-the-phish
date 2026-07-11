import type { FlagSegment, Scenario, StreakData } from '../../shared/types';
export type { FlagSegment, Scenario, StreakData };

export type Tab = 'analyze' | 'intel' | 'ranking' | 'profile';

export type RoundResult = {
  scenario: Scenario;
  tappedIds: Set<string>;
  correctFlagsFound: number;
  totalRedFlags: number;
  score: number;
};
