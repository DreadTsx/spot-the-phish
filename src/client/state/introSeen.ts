let hasSeenIntro = false;

export function getHasSeenIntro(): boolean {
  return hasSeenIntro;
}

export function markIntroSeen(): void {
  hasSeenIntro = true;
}
