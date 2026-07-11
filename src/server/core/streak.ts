import { redis, reddit } from '@devvit/web/server';
import type { StreakData } from '../../shared/types';

type StoredStreak = {
  current: number;
  longestStreak: number;
  lastPlayedDate: string | null;
};

function todayUTC(): string {
  return new Date().toISOString().split('T')[0]!;
}

function yesterdayUTC(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().split('T')[0]!;
}

async function getStreakKey(): Promise<string> {
  const username = await reddit.getCurrentUsername();
  return `streak:${username ?? 'anonymous'}`;
}

async function readStored(key: string): Promise<StoredStreak> {
  const raw = await redis.get(key);
  return raw
    ? (JSON.parse(raw) as StoredStreak)
    : { current: 0, longestStreak: 0, lastPlayedDate: null };
}

export async function getStreak(): Promise<StreakData> {
  const key = await getStreakKey();
  const stored = await readStored(key);

  return {
    current: stored.current,
    longestStreak: stored.longestStreak,
    hasPlayedToday: stored.lastPlayedDate === todayUTC(),
  };
}

export async function recordRoundPlayed(): Promise<StreakData> {
  const key = await getStreakKey();
  const stored = await readStored(key);
  const today = todayUTC();

  const alreadyPlayedToday = stored.lastPlayedDate === today;

  if (!alreadyPlayedToday) {
    if (stored.lastPlayedDate === yesterdayUTC()) {
      stored.current += 1;
    } else {
      stored.current = 1;
    }
    stored.lastPlayedDate = today;
  }

  stored.longestStreak = Math.max(stored.longestStreak, stored.current);
  await redis.set(key, JSON.stringify(stored));

  return {
    current: stored.current,
    longestStreak: stored.longestStreak,
    hasPlayedToday: true,
  };
}
