import { redis } from '@devvit/web/server';

const REGISTRY_KEY = 'known-players';

export async function registerPlayer(username: string): Promise<void> {
  const raw = await redis.get(REGISTRY_KEY);
  const players: string[] = raw ? JSON.parse(raw) : [];

  if (!players.includes(username)) {
    players.push(username);
    await redis.set(REGISTRY_KEY, JSON.stringify(players));
  }
}

export async function getAllKnownPlayers(): Promise<string[]> {
  const raw = await redis.get(REGISTRY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function clearRegistry(): Promise<void> {
  await redis.del(REGISTRY_KEY);
}
