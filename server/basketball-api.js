// Tiny full-stack API for HAZOOM Hoops.
// Run with: npm run api   (default http://127.0.0.1:8787)
// Vite dev proxies /api here; GitHub Pages uses the client-side fallback.

import http from 'node:http';
import { randomUUID } from 'node:crypto';

const PORT = Number(process.env.API_PORT || 8787);

let board = [
  { id: randomUUID(), name: 'HAZEM', points: 38, opponent: 24, result: 'W', source: 'server' },
  { id: randomUUID(), name: 'AI CORE', points: 34, opponent: 31, result: 'W', source: 'server' },
  { id: randomUUID(), name: 'COFFEE', points: 26, opponent: 33, result: 'L', source: 'server' },
  { id: randomUUID(), name: 'GIT COMMIT', points: 21, opponent: 28, result: 'L', source: 'server' },
];

const sortBoard = () => [...board].sort((a, b) => b.points - a.points).slice(0, 10);

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

  if (req.method === 'GET' && req.url === '/api/health') {
    return send(res, 200, { status: 'ok', game: 'HAZOOM Hoops' });
  }

  if (req.method === 'GET' && req.url === '/api/scores') {
    return send(res, 200, sortBoard());
  }

  if (req.method === 'POST' && req.url === '/api/scores') {
    const body = await readBody(req);
    board.push({
      id: randomUUID(),
      name: String(body.name || 'ANON').slice(0, 18).toUpperCase(),
      points: Number(body.points) || 0,
      opponent: Number(body.opponent) || 0,
      result: body.result === 'L' ? 'L' : 'W',
      source: 'server',
      playedAt: new Date().toISOString(),
    });
    board = sortBoard();
    return send(res, 201, board);
  }

  return send(res, 404, { error: 'Not found on this court.' });
});

server.listen(PORT, () => {
  console.log(`HAZOOM Hoops API listening on http://127.0.0.1:${PORT}`);
});
