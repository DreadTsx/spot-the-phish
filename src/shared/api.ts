import type {
  Scenario,
  StreakData,
  LeaderboardData,
  ProfileData,
} from './types';

export type ScenarioResponse = {
  type: 'scenario';
  scenario: Scenario;
};

export type SubmitRequest = {
  tappedIds: string[];
};

export type SubmitResponse = {
  type: 'submit';
  correctFlagsFound: number;
  totalRedFlags: number;
  score: number;
  streak: StreakData;
  alreadyPlayed: boolean;
};

export type StreakResponse = {
  type: 'streak';
  streak: StreakData;
};

export type LeaderboardResponse = {
  type: 'leaderboard';
  scope: 'today' | 'alltime';
  data: LeaderboardData;
};

export type ProfileResponse = {
  type: 'profile';
  profile: ProfileData;
};

export type TodayRoundData = {
  tappedIds: string[];
  correctFlagsFound: number;
  totalRedFlags: number;
  score: number;
};

export type TodayResultResponse = {
  type: 'todayResult';
  round: TodayRoundData | null;
};

export type InitResponse = {
  type: 'init';
  postId: string;
  count: number;
  username: string;
};

export type IncrementResponse = {
  type: 'increment';
  postId: string;
  count: number;
};

export type DecrementResponse = {
  type: 'decrement';
  postId: string;
  count: number;
};
