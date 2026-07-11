import type {
  FlagSegment,
  Scenario,
  StreakData,
  LeaderboardEntry,
  LeaderboardData,
  ProfileData,
} from '../../shared/types';
export type {
  FlagSegment,
  Scenario,
  StreakData,
  LeaderboardEntry,
  LeaderboardData,
  ProfileData,
};

export type Tab = 'analyze' | 'intel' | 'ranking' | 'profile';

export type RoundResult = {
  scenario: Scenario;
  tappedIds: Set<string>;
  correctFlagsFound: number;
  totalRedFlags: number;
  score: number;
};
