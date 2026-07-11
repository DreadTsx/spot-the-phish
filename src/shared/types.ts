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

export type StreakData = {
  current: number;
  longestStreak: number;
  hasPlayedToday: boolean;
};

export type LeaderboardEntry = {
  rank: number;
  username: string;
  score: number;
};

export type LeaderboardData = {
  top: LeaderboardEntry[];
  currentUser: LeaderboardEntry | null;
};

export type ProfileData = {
  streak: StreakData;
  totalScore: number;
  threatsDetected: number;
  falsePositives: number;
  recentPlayDates: string[];
};
