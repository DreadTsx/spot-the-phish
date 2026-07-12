import { redis, reddit } from '@devvit/web/server';

type StoredProfileStats = {
  totalScore: number;
  threatsDetected: number;
  falsePositives: number;
  recentPlayDates: string[];
};

async function getProfileKey(): Promise<string> {
  const username = await reddit.getCurrentUsername();
  return `profile:${username ?? 'anonymous'}`;
}

async function readStored(key: string): Promise<StoredProfileStats> {
  const raw = await redis.get(key);
  return raw
    ? (JSON.parse(raw) as StoredProfileStats)
    : {
        totalScore: 0,
        threatsDetected: 0,
        falsePositives: 0,
        recentPlayDates: [],
      };
}

export async function getProfileStats(): Promise<StoredProfileStats> {
  const key = await getProfileKey();
  return readStored(key);
}

export async function recordRoundStats(
  tappedCount: number,
  correctFlagsFound: number,
  roundScore: number
): Promise<StoredProfileStats> {
  const key = await getProfileKey();
  const stored = await readStored(key);

  stored.totalScore += roundScore;
  stored.threatsDetected += correctFlagsFound;
  stored.falsePositives += Math.max(0, tappedCount - correctFlagsFound);

  const today = new Date().toISOString().split('T')[0]!;
  if (!stored.recentPlayDates.includes(today)) {
    stored.recentPlayDates.push(today);
    if (stored.recentPlayDates.length > 7) {
      stored.recentPlayDates.shift();
    }
  }

  await redis.set(key, JSON.stringify(stored));
  return stored;
}
