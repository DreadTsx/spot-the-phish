import { redis, reddit } from '@devvit/web/server';
import type { TodayRoundData } from '../../shared/api';

async function getRoundKey(): Promise<string> {
  const username = (await reddit.getCurrentUsername()) ?? 'anonymous';
  const today = new Date().toISOString().split('T')[0]!;
  return `round:${username}:${today}`;
}

export async function getTodayRound(): Promise<TodayRoundData | null> {
  const key = await getRoundKey();
  const raw = await redis.get(key);
  return raw ? (JSON.parse(raw) as TodayRoundData) : null;
}

export async function saveTodayRound(round: TodayRoundData): Promise<void> {
  const key = await getRoundKey();
  await redis.set(key, JSON.stringify(round));
}
