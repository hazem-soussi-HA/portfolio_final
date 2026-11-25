// Mock "AI Exchange" API client.
// In local full-stack mode, Vite proxies /api to server/ai-exchange-api.js.
// On GitHub Pages the /api call fails fast and the local fallback keeps the game playable.

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const LOCAL_MOODS = [
  { mood: 'BULLISH', line: 'Models are up. Confidence is up. Reality is unchanged.' },
  { mood: 'CAUTIOUS', line: 'The market hedged. Nobody knows why. Very professional.' },
  { mood: 'CHAOTIC', line: 'A gradientdescent trader just bought a whole bucket of tokens.' },
  { mood: 'SIDEWAYS', line: 'The AI exchange is moving sideways. Like a confused crab.' },
];

const BUILD_LINES = [
  'Deployed to prod. Prod is currently a laptop in a closet.',
  'CI green. Coffee cold. Users: you + 3 unclear bots.',
  'Shipped v1.0.1: fixed the bug we introduced in v1.0.0.',
  'Build passed. The model now agrees with itself 61% of the time.',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export async function fetchMood() {
  try {
    const response = await fetch('/api/mood', {
      headers: { Accept: 'application/json' },
    });
    if (response.ok) return await response.json();
  } catch {
    // Static hosting has no API — fall through to local simulation.
  }
  await wait(90);
  return { ...pick(LOCAL_MOODS), source: 'local' };
}

export async function submitBuild({ score = 0, level = 1 } = {}) {
  try {
    const response = await fetch('/api/build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score, level }),
    });
    if (response.ok) return await response.json();
  } catch {
    // Static hosting has no API — fall through to local simulation.
  }
  await wait(120);
  return {
    id: `build-${Date.now().toString(36)}`,
    hash: Math.random().toString(16).slice(2, 9),
    message: pick(BUILD_LINES),
    url: 'https://hazem-soussi-ha.github.io/portfolio_final/',
    source: 'local',
  };
}
