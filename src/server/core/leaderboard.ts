import { redis } from '@devvit/web/server';
import type { LeaderboardData, LeaderboardEntry } from '../../shared/types';
import { getLongestStreakForUser } from './streak';

type LeaderboardRecord = { username: string; score: number };
type Scope = 'today' | 'alltime';

function getLeaderboardKey(scope: Scope): string {
  if (scope === 'today') {
    const today = new Date().toISOString().split('T')[0];
    return `leaderboard:today:${today}`;
  }
  return 'leaderboard:alltime';
}

async function readEntries(key: string): Promise<LeaderboardRecord[]> {
  const raw = await redis.get(key);
  return raw ? (JSON.parse(raw) as LeaderboardRecord[]) : [];
}

export async function recordLeaderboardScore(
  username: string,
  roundScore: number
): Promise<void> {
  const scopes: Scope[] = ['today', 'alltime'];

  await Promise.all(
    scopes.map(async (scope) => {
      const key = getLeaderboardKey(scope);
      const entries = await readEntries(key);
      const existing = entries.find((e) => e.username === username);

      if (existing) {
        existing.score += roundScore;
      } else {
        entries.push({ username, score: roundScore });
      }

      await redis.set(key, JSON.stringify(entries));
    })
  );
}

export async function getLeaderboard(
  scope: Scope,
  currentUsername: string
): Promise<LeaderboardData> {
  const key = getLeaderboardKey(scope);
  const entries = await readEntries(key);
  const sorted = [...entries].sort((a, b) => b.score - a.score);

  const top: LeaderboardEntry[] = await Promise.all(
    sorted.slice(0, 10).map(async (e, i) => ({
      rank: i + 1,
      username: e.username,
      score: e.score,
      longestStreak: await getLongestStreakForUser(e.username),
    }))
  );

  const currentUserIndex = sorted.findIndex(
    (e) => e.username === currentUsername
  );
  let currentUser: LeaderboardEntry | null = null;

  if (currentUserIndex >= 0) {
    const entry = sorted[currentUserIndex];
    if (entry) {
      currentUser = {
        rank: currentUserIndex + 1,
        username: entry.username,
        score: entry.score,
        longestStreak: await getLongestStreakForUser(entry.username),
      };
    }
  }

  return { top, currentUser };
}

export async function removePlayerScore(username: string): Promise<void> {
  const scopes: Scope[] = ['today', 'alltime'];

  await Promise.all(
    scopes.map(async (scope) => {
      const key = getLeaderboardKey(scope);
      const entries = await readEntries(key);
      const filtered = entries.filter((e) => e.username !== username);

      if (filtered.length !== entries.length) {
        await redis.set(key, JSON.stringify(filtered));
      }
    })
  );
}
