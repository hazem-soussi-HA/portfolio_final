// Tiny full-stack API for the AI Exchange game.
// Run with: npm run api   (default http://127.0.0.1:8787)
// Vite dev proxies /api here; GitHub Pages uses the client-side fallback.

import http from 'node:http';
import { randomUUID } from 'node:crypto';

const PORT = Number(process.env.API_PORT || 8787);

const MOODS = [
  { mood: 'BULLISH', line: 'Models are up. Confidence is up. Reality is unchanged.' },
  { mood: 'CAUTIOUS', line: 'The market hedged. Nobody knows why. Very professional.' },
  { mood: 'CHAOTIC', line: 'A gradient-descent trader just bought a whole bucket of tokens.' },
  { mood: 'SIDEWAYS', line: 'The AI exchange is moving sideways. Like a confused crab.' },
];

const BUILDS = [
  'Deployed to prod. Prod is currently a laptop in a closet.',
  'CI green. Coffee cold. Users: you + 3 unclear bots.',
  'Shipped v1.0.1: fixed the bug we introduced in v1.0.0.',
  'Build passed. The model now agrees with itself 61% of the time.',
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function send(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1e5) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});

  if (req.method === 'GET' && req.url === '/api/mood') {
    return send(res, 200, { ...pick(MOODS), source: 'server', id: randomUUID() });
  }

  if (req.method === 'POST' && req.url === '/api/build') {
    const body = await readBody(req);
    return send(res, 201, {
      id: randomUUID(),
      hash: randomUUID().replaceAll('-', '').slice(0, 7),
      score: Number(body.score) || 0,
      level: Number(body.level) || 1,
      message: pick(BUILDS),
      url: 'https://hazem-soussi-ha.github.io/portfolio_final/',
      source: 'server',
    });
  }

  return send(res, 404, { error: 'Not found on the AI Exchange.' });
});

server.listen(PORT, () => {
  console.log(`AI Exchange API listening on http://127.0.0.1:${PORT}`);
});
