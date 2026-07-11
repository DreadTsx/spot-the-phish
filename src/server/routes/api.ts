import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import type {
  DecrementResponse,
  IncrementResponse,
  InitResponse,
  ScenarioResponse,
  SubmitRequest,
  SubmitResponse,
  StreakResponse,
} from '../../shared/api';
import { getScenarioForDate } from '../data/scenarios';
import { getStreak, recordRoundPlayed } from '../core/streak';

type ErrorResponse = {
  status: 'error';
  message: string;
};

export const api = new Hono();

api.get('/scenario', async (c) => {
  try {
    const scenario = getScenarioForDate(new Date());
    return c.json<ScenarioResponse>({ type: 'scenario', scenario });
  } catch (error) {
    console.error('API Scenario Error:', error);
    return c.json<ErrorResponse>(
      { status: 'error', message: "Failed to load today's scenario" },
      500
    );
  }
});

api.get('/streak', async (c) => {
  try {
    const streak = await getStreak();
    return c.json<StreakResponse>({ type: 'streak', streak });
  } catch (error) {
    console.error('API Streak Error:', error);
    return c.json<ErrorResponse>(
      { status: 'error', message: 'Failed to load streak' },
      500
    );
  }
});

api.post('/submit', async (c) => {
  try {
    const { tappedIds } = await c.req.json<SubmitRequest>();
    const scenario = getScenarioForDate(new Date());

    const allFlags = [
      scenario.sender,
      scenario.subject,
      scenario.bodyFlaggedLine,
      scenario.bodyLink,
    ];
    const totalRedFlags = allFlags.filter((f) => f.isRedFlag).length;
    const correctFlagsFound = allFlags.filter(
      (f) => f.isRedFlag && tappedIds.includes(f.id)
    ).length;
    const score = 1000 + correctFlagsFound * 250;

    const streak = await recordRoundPlayed();

    return c.json<SubmitResponse>({
      type: 'submit',
      correctFlagsFound,
      totalRedFlags,
      score,
      streak,
    });
  } catch (error) {
    console.error('API Submit Error:', error);
    return c.json<ErrorResponse>(
      { status: 'error', message: 'Failed to submit round' },
      500
    );
  }
});

api.get('/init', async (c) => {
  const { postId } = context;

  if (!postId) {
    console.error('API Init Error: postId not found in devvit context');
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required but missing from context',
      },
      400
    );
  }

  try {
    const [count, username] = await Promise.all([
      redis.get('count'),
      reddit.getCurrentUsername(),
    ]);

    return c.json<InitResponse>({
      type: 'init',
      postId: postId,
      count: count ? parseInt(count) : 0,
      username: username ?? 'anonymous',
    });
  } catch (error) {
    console.error(`API Init Error for post ${postId}:`, error);
    let errorMessage = 'Unknown error during initialization';
    if (error instanceof Error) {
      errorMessage = `Initialization failed: ${error.message}`;
    }
    return c.json<ErrorResponse>(
      { status: 'error', message: errorMessage },
      400
    );
  }
});

api.post('/increment', async (c) => {
  const { postId } = context;
  if (!postId) {
    return c.json<ErrorResponse>(
      { status: 'error', message: 'postId is required' },
      400
    );
  }

  const count = await redis.incrBy('count', 1);
  return c.json<IncrementResponse>({ count, postId, type: 'increment' });
});

api.post('/decrement', async (c) => {
  const { postId } = context;
  if (!postId) {
    return c.json<ErrorResponse>(
      { status: 'error', message: 'postId is required' },
      400
    );
  }

  const count = await redis.incrBy('count', -1);
  return c.json<DecrementResponse>({ count, postId, type: 'decrement' });
});
