# Spot the Phish

**A daily phishing-detection game for Reddit, built on Devvit.**

Spot the Phish drops you into a SOC (Security Operations Center) analyst terminal where a new suspicious email lands every day. You have 30 seconds to tap every red flag hidden in the message, a spoofed sender, a typosquatted domain, a manufactured deadline, a malicious link before time runs out. Get it right, keep your streak alive, and climb the community leaderboard.

---

## How to Play

1. Open today's post and hit **Analyze**.
2. A realistic email scenario appears: sender, subject, and body.
3. Tap any part of the message you believe is a **red flag** (phishing indicator).
4. You have **30 seconds** on the clock, the timer turns urgent in the final 10.
5. Submit before time runs out (or the round auto-submits when the clock hits zero).
6. See which flags you caught, which you missed, and a plain-English explanation for every flag, real or decoy.
7. Come back tomorrow to keep your streak going.

Each scenario is drawn from a rotating pool of realistic phishing/social-engineering emails (typosquatted domains, lookalike executives, fake IT help desks, urgency and authority pressure tactics, and more), based on CompTIA Security+ (SY0-701) social engineering concepts, with one scenario surfaced per day on a date-based rotation so the whole community sees and discusses the same email.

---

## Features

- **Daily rotating scenario** — a new phishing email each day, deterministically selected by date so every player in a subreddit is analyzing the same message and can compare notes in the comments.
- **Tap-to-flag gameplay** — an interactive terminal-style email viewer where any segment (sender, subject, body line, link) can be tapped as a suspected red flag.
- **30-second countdown timer** with an urgent pulse animation in the final 10 seconds, keeping the pressure realistic to how little time defenders actually get.
- **Scoring** — a base-1000-point round score, with detailed accuracy feedback (flags correctly found vs. missed vs. false positives).
- **Streaks** — daily streak tracking (current + longest), with grace for "yesterday or today" so a single busy day doesn't reset progress unfairly.
- **Rank progression** — Bronze → Silver (3-day streak) → Gold Analyst (7-day streak).
- **Leaderboards** — both a daily leaderboard and an all-time leaderboard, so there's always a reason to come back.
- **Intel screen** — an in-app reference library of phishing red flags and definitions, so the game teaches as you play instead of just testing you.
- **Profile screen** — total score, threats detected, false positives, and recent play history at a glance.
- **Terminal/SOC visual aesthetic** — monospace type, glitch-text effects, danger-red accenting, and a command-line feel that matches the "cybersecurity analyst" fantasy.

---

## 🧠 Why It's a Good Fit for Reddit

Phishing is something almost every redditor has a story about, and the daily-puzzle format (think Wordle/Connections) is a proven Reddit-native retention loop. Because everyone in a subreddit sees the _same_ scenario on a given day, comment sections naturally become a place to compare scores, argue about the ambiguous flags, and share "how did you miss that one" moments, turning a solo mini-game into a shared community ritual.

---

## 🛠️ Tech Stack

- [**Devvit**](https://developers.reddit.com/) — Reddit's developer platform, for building and hosting the app directly inside Reddit posts
- **React 19** — UI layer
- **TypeScript** — end-to-end type safety across client, server, and shared code
- **Vite** — client build tooling
- **Tailwind CSS 4** — styling
- **Hono** — lightweight backend server framework
- **Redis** (via `@devvit/web/server`) — persistence for streaks, scores, and leaderboards
- **lucide-react** — all icons

---

## 📁 Project Structure

```
src/
  client/            React frontend (runs in an iframe on reddit.com)
    components/      Screens & UI: Home, Gameplay, Intel, Ranking, Profile, Timer, etc.
    hooks/           Game state, streak, leaderboard, profile data hooks
    data/            Intel/reference entries shown in the Intel tab
  server/            Backend (Devvit serverless environment)
    core/            Leaderboard, streak, profile, registry, reset logic
    data/            The phishing scenario pool
    routes/          API routes, menu actions, form handlers, triggers
  shared/            Types and API contracts shared between client & server
devvit.json          App manifest: entrypoints, menu items, forms, triggers
```

- **`splash.html`** — the lightweight inline view shown in the Reddit feed
- **`game.html`** — the full expanded game view

---

## 🚀 Getting Started (Local Dev)

> Requires Node.js **22.2+**

```bash
# Install dependencies
npm install

# Log in to your Reddit developer account
npm run login

# Start a live playtest on Reddit
npm run dev
```

### Other useful commands

| Command              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `npm run build`      | Builds the client and server bundles               |
| `npm run type-check` | Runs the TypeScript compiler across all projects   |
| `npm run lint`       | Lints the codebase                                 |
| `npm run deploy`     | Type-checks, lints, then uploads a new app version |
| `npm run launch`     | Deploys and publishes the app for review           |

---

## 🔒 Data & Privacy

Player data (streaks, scores, leaderboard entries) is stored in Redis keyed by Reddit username, scoped to this app. Moderators can reset an individual player's data or wipe all data via the subreddit mod menu — useful for testing and support.

---

## 📄 License

BSD-3-Clause see [`LICENSE`](./LICENSE).

---

## 🏆 Built For

[Reddit's Games with a Hook Hackathon](https://redditgameswithahook.devpost.com/) — submitted under **"The Best Experience That Will Keep People Coming Back."**
