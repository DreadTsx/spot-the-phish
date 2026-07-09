export type Tab = 'analyze' | 'intel' | 'ranking' | 'profile';

export type StreakData = {
  current: number;
  longestStreak: number;
  hasPlayedToday: boolean;
};

export type FlagSegment = {
  id: string;
  text: string;
  isRedFlag: boolean;
  explanation: string;
};

export type Scenario = {
  id: string;
  sender: FlagSegment;
  recipient: string;
  date: string;
  subject: FlagSegment;
  bodyIntro: string;
  bodyFlaggedLine: FlagSegment;
  bodyLink: FlagSegment;
  bodyOutro: string;
};

export type RoundResult = {
  scenario: Scenario;
  tappedIds: Set<string>;
  correctFlagsFound: number;
  totalRedFlags: number;
  score: number;
};
