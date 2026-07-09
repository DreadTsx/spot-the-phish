export type IntelEntry = {
  id: string;
  category: string;
  title: string;
  description: string;
};

export const intelEntries: IntelEntry[] = [
  {
    id: 'lookalike-domain',
    category: 'Sender',
    title: 'Lookalike Domains',
    description:
      "Attackers register domains that resemble a real company's at a glance — extra words, swapped letters, or an unexpected suffix tacked onto the real name.",
  },
  {
    id: 'urgency',
    category: 'Language',
    title: 'Artificial Urgency',
    description:
      'Tight deadlines and threats of account loss are designed to make you act before you think. Legitimate companies rarely demand action within hours.',
  },
  {
    id: 'generic-greeting',
    category: 'Language',
    title: 'Generic Greetings',
    description:
      '"Dear Customer" instead of your name often means the sender doesn\'t actually have your account details — a real provider usually does.',
  },
  {
    id: 'mismatched-link',
    category: 'Links',
    title: 'Mismatched Link Destination',
    description:
      'The visible link text and where it actually leads can be two different things. Hover or long-press before tapping to preview the real destination.',
  },
  {
    id: 'credential-request',
    category: 'Requests',
    title: 'Unusual Credential Requests',
    description:
      'Legitimate services rarely ask you to "verify" a password or full card number by clicking a link in an email or message.',
  },
  {
    id: 'poor-grammar',
    category: 'Language',
    title: 'Spelling & Grammar Errors',
    description:
      'Not every phishing message has typos, but unexpected grammar mistakes from a supposedly professional sender are worth a second look.',
  },
];
