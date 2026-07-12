import { Hono } from 'hono';
import type { UiResponse } from '@devvit/web/shared';
import { context, reddit } from '@devvit/web/server';
import { createPost } from '../core/post';
import { resetOwnData } from '../core/reset';

export const menu = new Hono();

async function isCurrentUserModerator(): Promise<boolean> {
  const user = await reddit.getCurrentUser();
  if (!user || !context.subredditName) return false;
  return user.modPermissions.has(context.subredditName);
}

menu.post('/post-create', async (c) => {
  try {
    const post = await createPost();

    return c.json<UiResponse>(
      {
        navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
      },
      200
    );
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    return c.json<UiResponse>(
      {
        showToast: 'Failed to create post',
      },
      400
    );
  }
});

menu.post('/reset-all-data', async (c) => {
  if (!(await isCurrentUserModerator())) {
    return c.json<UiResponse>(
      { showToast: 'Only moderators can do this.' },
      403
    );
  }

  return c.json<UiResponse>(
    {
      showForm: {
        name: 'resetConfirm',
        form: {
          title: 'Reset ALL Player Data?',
          description:
            "This permanently wipes every player's streak, stats, and leaderboard scores. This cannot be undone. Type RESET to confirm.",
          acceptLabel: 'Reset Everything',
          cancelLabel: 'Cancel',
          fields: [
            {
              type: 'string',
              name: 'confirmText',
              label: 'Type RESET to confirm',
              required: true,
            },
          ],
        },
      },
    },
    200
  );
});

menu.post('/reset-my-data', async (c) => {
  try {
    const username = await reddit.getCurrentUsername();

    if (!username) {
      return c.json<UiResponse>(
        { showToast: 'Could not identify current user.' },
        400
      );
    }

    await resetOwnData(username);
    return c.json<UiResponse>(
      { showToast: `Your data has been reset, ${username}.` },
      200
    );
  } catch (error) {
    console.error('Error resetting own data:', error);
    return c.json<UiResponse>({ showToast: 'Failed to reset your data' }, 400);
  }
});
