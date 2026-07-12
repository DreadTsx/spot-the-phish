import { Hono } from 'hono';
import type { UiResponse } from '@devvit/web/shared';
import { context, reddit } from '@devvit/web/server';
import { resetAllPlayerData } from '../core/reset';

type ExampleFormValues = {
  message?: string;
};

type ResetConfirmValues = {
  confirmText?: string;
};

export const forms = new Hono();

async function isCurrentUserModerator(): Promise<boolean> {
  const user = await reddit.getCurrentUser();
  if (!user || !context.subredditName) return false;
  return user.modPermissions.has(context.subredditName);
}

forms.post('/example-submit', async (c) => {
  const { message } = await c.req.json<ExampleFormValues>();
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  return c.json<UiResponse>(
    {
      showToast: trimmedMessage
        ? `Form says: ${trimmedMessage}`
        : 'Form submitted with no message',
    },
    200
  );
});

forms.post('/reset-confirm-submit', async (c) => {
  if (!(await isCurrentUserModerator())) {
    return c.json<UiResponse>(
      { showToast: 'Only moderators can do this.' },
      403
    );
  }
  const { confirmText } = await c.req.json<ResetConfirmValues>();

  if (
    typeof confirmText !== 'string' ||
    confirmText.trim().toUpperCase() !== 'RESET'
  ) {
    return c.json<UiResponse>(
      { showToast: 'Reset cancelled — confirmation text did not match.' },
      200
    );
  }

  try {
    const { playersReset } = await resetAllPlayerData();
    return c.json<UiResponse>(
      {
        showToast: `Reset complete — cleared data for ${playersReset} player(s).`,
      },
      200
    );
  } catch (error) {
    console.error('Error resetting player data:', error);
    return c.json<UiResponse>(
      { showToast: 'Failed to reset player data' },
      400
    );
  }
});
