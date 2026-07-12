import { redis } from '@devvit/web/server';
import { getAllKnownPlayers, clearRegistry } from './registry';
import { removePlayerScore } from './leaderboard';

export async function resetAllPlayerData(): Promise<{ playersReset: number }> {
  const players = await getAllKnownPlayers();
  const today = new Date().toISOString().split('T')[0];

  await Promise.all([
    ...players.flatMap((username) => [
      redis.del(`streak:${username}`),
      redis.del(`profile:${username}`),
      redis.del(`round:${username}:${today}`),
    ]),
    redis.del('leaderboard:alltime'),
    redis.del(`leaderboard:today:${today}`),
  ]);

  await clearRegistry();

  return { playersReset: players.length };
}

export async function resetOwnData(username: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];

  await Promise.all([
    redis.del(`streak:${username}`),
    redis.del(`profile:${username}`),
    redis.del(`round:${username}:${today}`),
    removePlayerScore(username),
  ]);
}
