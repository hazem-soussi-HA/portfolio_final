// Basketball API client.
// Local dev: Vite proxies /api to server/basketball-api.js.
// GitHub Pages: /api is unavailable, so we fall back to an in-memory board.

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SEED = [
  { name: 'HAZEM', points: 38, opponent: 24, result: 'W', source: 'local' },
  { name: 'AI CORE', points: 34, opponent: 31, result: 'W', source: 'local' },
  { name: 'COFFEE', points: 26, opponent: 33, result: 'L', source: 'local' },
  { name: 'GIT COMMIT', points: 21, opponent: 28, result: 'L', source: 'local' },
];

let localBoard = [...SEED];

const sortBoard = (board) => [...board].sort((a, b) => b.points - a.points).slice(0, 10);

export async function fetchLeaderboard() {
  try {
    const response = await fetch('/api/scores', { headers: { Accept: 'application/json' } });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) return data;
    }
  } catch {
    // Static hosting — use the local board.
  }
  await wait(70);
  return sortBoard(localBoard);
}

export async function submitScore(entry) {
  try {
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        localBoard = data;
        return data;
      }
    }
  } catch {
    // Static hosting — keep the board in memory.
  }
  await wait(90);
  localBoard = sortBoard([{ ...entry, source: 'local' }, ...localBoard]);
  return localBoard;
}
