import type { Scenario } from '../shared/types';

export const mockScenario: Scenario = {
  id: 'MSG-8942-A',
  sender: {
    id: 'sender',
    text: 'admin@poypal.com.security-update.net',
    isRedFlag: true,
    explanation: 'Lookalike domain — not the real company domain.',
  },
  recipient: 'user@company.org',
  date: 'Oct 24, 2023, 14:32 UTC',
  subject: {
    id: 'subject',
    text: 'ACTION REQUIRED: Your Account Has Been Limited',
    isRedFlag: false, // decoy — alarming tone, but subject lines aren't a real signal on their own
    explanation:
      'Urgent-sounding subject lines alone are common and not a reliable signal.',
  },
  bodyIntro:
    'Dear Customer, we noticed unusual activity on your account. To prevent unauthorized access, we have temporarily restricted your ability to send or receive funds.',
  bodyFlaggedLine: {
    id: 'urgent-line',
    text: 'Please verify your identity immediately to restore access within 24 hours or your account will be permanently closed.',
    isRedFlag: true,
    explanation:
      'Artificial urgency and threat of loss — classic pressure tactic.',
  },
  bodyLink: {
    id: 'link',
    text: 'https://verify.poypal-security.com/auth/login?token=8f92a1',
    isRedFlag: true,
    explanation: 'Domain does not match any legitimate company domain.',
  },
  bodyOutro: 'Thank you, The Security Team',
};
