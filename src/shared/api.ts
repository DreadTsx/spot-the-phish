import type { Scenario, StreakData } from './types';

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
};

export type StreakResponse = {
  type: 'streak';
  streak: StreakData;
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
