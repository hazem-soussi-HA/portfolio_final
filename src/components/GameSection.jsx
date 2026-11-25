import { useEffect, useRef, useState } from 'react';
import { Bug, Gamepad2, Rocket, Sparkles, Trophy, RefreshCw, Github } from 'lucide-react';
import { fetchMood, submitBuild } from '../services/aiExchangeApi';

const GRID = 9;
const TILE_W = 64;
const TILE_H = 32;
const CANVAS_W = 760;
const CANVAS_H = 440;
const ORIGIN_X = CANVAS_W / 2;
const ORIGIN_Y = 64;
const PAD = { x: 7, y: 1 };
const TOKENS_PER_LEVEL = 5;

const MOVES = {
  ArrowUp: [-1, -1], w: [-1, -1], W: [-1, -1],
  ArrowDown: [1, 1], s: [1, 1], S: [1, 1],
  ArrowLeft: [-1, 1], a: [-1, 1], A: [-1, 1],
  ArrowRight: [1, -1], d: [1, -1], D: [1, -1],
};

const TOKEN_QUIPS = [
  'Token secured. Model is 0.3% more confident.',
  'Prompt cached. Bugs are temporarily confused.',
  'Gradient updated. Wallet unchanged.',
  'Context window expanded. Attention span did not.',
  'Token acquired. Hallucinations notified elsewhere.',
];

const BUG_QUIPS = [
  'Hallucination detected: 99% confident, 12% correct.',
  'Bug escaped the sandbox. Again.',
  'Model argued with itself. You lost 3 seconds.',
  'Overfitting spotted. Deployment reversed.',
];

const DEPLOY_QUIPS = [
  'Deployed! Users: you, your cat, and 3 unclear bots.',
  'Shipped to production. Prod is a Raspberry Pi.',
  'CI passed. Coffee failed.',
  'Release v1.0.1: fixed the bug we just introduced.',
];

const iso = (x, y) => ({
  x: ORIGIN_X + (x - y) * (TILE_W / 2),
  y: ORIGIN_Y + (x + y) * (TILE_H / 2),
});

function diamond(ctx, cx, cy, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - TILE_H / 2);
  ctx.lineTo(cx + TILE_W / 2, cy);
  ctx.lineTo(cx, cy + TILE_H / 2);
  ctx.lineTo(cx - TILE_W / 2, cy);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function inBounds(x, y) {
  return x >= 0 && y >= 0 && x < GRID && y < GRID;
}

function randomFreeTile(occupied) {
  let x = 0;
  let y = 0;
  for (let i = 0; i < 80; i += 1) {
    x = Math.floor(Math.random() * GRID);
    y = Math.floor(Math.random() * GRID);
    if (!occupied.has(`${x},${y}`)) break;
  }
  return { x, y };
}

export default function GameSection() {
  const canvasRef = useRef(null);
  const moveRef = useRef(() => {});
  const stateRef = useRef(null);
  const hudRef = useRef({});
  const [hud, setHud] = useState({
    score: 0, level: 1, time: 60, lives: 3, status: 'ready',
    message: '', combo: 0, collected: 0,
  });
  const [mood, setMood] = useState({ mood: 'CONNECTING', line: 'Asking the exchange for a mood...' });
  const [build, setBuild] = useState(null);

  if (!stateRef.current) {
    stateRef.current = {
      player: { x: 4, y: 4 },
      tokens: [{ x: 2, y: 3 }, { x: 6, y: 6 }, { x: 3, y: 7 }],
      bugs: [{ x: 1, y: 1 }, { x: 8, y: 7 }],
      score: 0,
      level: 1,
      lives: 3,
      combo: 0,
      collected: 0,
      status: 'ready',
      endAt: 0,
      lastMove: 0,
      lastBugMove: 0,
      message: 'Press Start or use arrow keys / WASD to enter the exchange.',
      messageUntil: Infinity,
    };
  }

  useEffect(() => {
    let alive = true;
    const loadMood = async () => {
      const data = await fetchMood();
      if (alive) setMood(data);
    };
    loadMood();
    const timer = setInterval(loadMood, 15000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_W * dpr;
    canvas.height = CANVAS_H * dpr;
    ctx.scale(dpr, dpr);

    const occupied = () => {
      const s = stateRef.current;
      const set = new Set([`${s.player.x},${s.player.y}`, `${PAD.x},${PAD.y}`]);
      s.tokens.forEach((t) => set.add(`${t.x},${t.y}`));
      s.bugs.forEach((b) => set.add(`${b.x},${b.y}`));
      return set;
    };

    const say = (text, ms = 2600) => {
      const s = stateRef.current;
      s.message = text;
      s.messageUntil = performance.now() + ms;
    };

    const startGame = () => {
      const s = stateRef.current;
      s.player = { x: 4, y: 4 };
      s.tokens = [{ x: 2, y: 3 }, { x: 6, y: 6 }, { x: 3, y: 7 }];
      s.bugs = [{ x: 1, y: 1 }, { x: 8, y: 7 }];
      s.score = 0;
      s.level = 1;
      s.lives = 3;
      s.combo = 0;
      s.collected = 0;
      s.status = 'playing';
      s.endAt = performance.now() + 60000;
      s.message = 'Go! Collect AI tokens, dodge bugs, reach DEPLOY.';
      s.messageUntil = performance.now() + 3000;
    };

    const attemptMove = (dx, dy) => {
      const s = stateRef.current;
      const now = performance.now();
      if (s.status === 'ready' || s.status === 'over') startGame();
      if (s.status !== 'playing' || now - s.lastMove < 105) return;

      const nx = s.player.x + dx;
      const ny = s.player.y + dy;
      if (!inBounds(nx, ny)) return;
      s.player = { x: nx, y: ny };
      s.lastMove = now;

      const tokenIndex = s.tokens.findIndex((t) => t.x === nx && t.y === ny);
      if (tokenIndex !== -1) {
        s.score += 10 * s.level + s.combo;
        s.combo += 1;
        s.collected += 1;
        s.tokens[tokenIndex] = randomFreeTile(occupied());
        say(TOKEN_QUIPS[Math.floor(Math.random() * TOKEN_QUIPS.length)]);
      } else {
        s.combo = 0;
      }

      const bugIndex = s.bugs.findIndex((b) => b.x === nx && b.y === ny);
      if (bugIndex !== -1) {
        s.lives -= 1;
        s.combo = 0;
        s.endAt -= 3000;
        s.bugs[bugIndex] = randomFreeTile(occupied());
        say(BUG_QUIPS[Math.floor(Math.random() * BUG_QUIPS.length)]);
        if (s.lives <= 0) {
          s.status = 'over';
          s.lives = 0;
          s.message = `Session ended. Final score: ${s.score}. The bugs won this round.`;
          s.messageUntil = Infinity;
        }
      }

      if (s.status === 'playing' && nx === PAD.x && ny === PAD.y) {
        if (s.collected >= TOKENS_PER_LEVEL) {
          s.level += 1;
          s.score += 100 * s.level;
          s.collected = 0;
          s.tokens = [randomFreeTile(occupied()), randomFreeTile(occupied()), randomFreeTile(occupied())];
          s.bugs = [randomFreeTile(occupied()), randomFreeTile(occupied())];
          say('Dispatching build to the AI Exchange...', 4200);
          submitBuild({ score: s.score, level: s.level }).then((result) => {
            setBuild(result);
            say(`${result.message} (${result.source} API)`, 4200);
          });
        } else {
          say(`Need ${TOKENS_PER_LEVEL - s.collected} more token(s) before this build can deploy.`, 3200);
        }
      }
    };

    moveRef.current = attemptMove;

    const onKey = (event) => {
      const move = MOVES[event.key];
      if (!move) return;
      event.preventDefault();
      attemptMove(move[0], move[1]);
    };
    window.addEventListener('keydown', onKey);

    let raf = 0;

    const draw = (now) => {
      const s = stateRef.current;

      if (s.status === 'playing') {
        const time = Math.max(0, Math.ceil((s.endAt - now) / 1000));
        if (time !== s.timeLeft) s.timeLeft = time;
        if (time <= 0) {
          s.status = 'over';
          s.message = `Time! Final score: ${s.score}. The exchange closes at 5 PM.`;
          s.messageUntil = Infinity;
        }
        if (now - s.lastBugMove > 520) {
          s.lastBugMove = now;
          s.bugs.forEach((bug) => {
            if (Math.random() < 0.68) {
              const dx = Math.sign(s.player.x - bug.x);
              const dy = Math.sign(s.player.y - bug.y);
              const options = [[dx, 0], [0, dy], [dx, dy]].filter(([ax, ay]) =>
                inBounds(bug.x + ax, bug.y + ay) && !(ax === 0 && ay === 0));
              if (options.length) {
                const [ax, ay] = options[Math.floor(Math.random() * options.length)];
                bug.x += ax;
                bug.y += ay;
              }
            } else {
              const adj = [[1, 0], [-1, 0], [0, 1], [0, -1]]
                .map(([ax, ay]) => ({ x: bug.x + ax, y: bug.y + ay }))
                .filter((p) => inBounds(p.x, p.y));
              if (adj.length) {
                const next = adj[Math.floor(Math.random() * adj.length)];
                bug.x = next.x;
                bug.y = next.y;
              }
            }
          });
        }
      }

      if (now > s.messageUntil && s.messageUntil !== Infinity) {
        s.message = '';
        s.messageUntil = Infinity;
      }

      const hudNext = {
        score: s.score,
        level: s.level,
        time: s.timeLeft ?? 60,
        lives: s.lives,
        status: s.status,
        message: s.message,
        combo: s.combo,
        collected: s.collected,
      };
      if (JSON.stringify(hudNext) !== JSON.stringify(hudRef.current)) {
        hudRef.current = hudNext;
        setHud(hudNext);
      }

      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      const bg = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      bg.addColorStop(0, '#081226');
      bg.addColorStop(1, '#040711');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Isometric floor with a small side face for depth.
      for (let sum = 0; sum <= 2 * (GRID - 1); sum += 1) {
        for (let x = Math.max(0, sum - GRID + 1); x <= Math.min(GRID - 1, sum); x += 1) {
          const y = sum - x;
          const { x: cx, y: cy } = iso(x, y);
          diamond(ctx, cx, cy + 7, '#050a16', null);
          diamond(
            ctx, cx, cy,
            (x + y) % 2 === 0 ? '#101d3a' : '#0c1730',
            'rgba(96,165,250,0.13)',
          );
        }
      }

      const entities = [];
      entities.push({ depth: PAD.x + PAD.y, type: 'pad', x: PAD.x, y: PAD.y });
      s.tokens.forEach((t) => entities.push({ depth: t.x + t.y, type: 'token', ...t }));
      s.bugs.forEach((b) => entities.push({ depth: b.x + b.y, type: 'bug', ...b }));
      entities.push({ depth: s.player.x + s.player.y, type: 'player', ...s.player });
      entities.sort((a, b) => a.depth - b.depth);

      entities.forEach((entity) => {
        const { x: cx, y: cy } = iso(entity.x, entity.y);
        if (entity.type === 'pad') {
          ctx.save();
          ctx.shadowColor = 'rgba(34,211,238,0.9)';
          ctx.shadowBlur = 22;
          diamond(ctx, cx, cy, 'rgba(8,145,178,0.45)', '#22d3ee');
          ctx.restore();
          ctx.fillStyle = '#cffafe';
          ctx.font = 'bold 10px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('DEPLOY', cx, cy + 3);
          return;
        }
        if (entity.type === 'token') {
          ctx.save();
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 16;
          ctx.beginPath();
          ctx.arc(cx, cy - 8, 11, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();
          ctx.restore();
          ctx.fillStyle = '#451a03';
          ctx.font = 'bold 9px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('AI', cx, cy - 5);
          return;
        }
        if (entity.type === 'bug') {
          const wobble = Math.sin(now / 160 + entity.x) * 2;
          ctx.save();
          ctx.translate(cx, cy - 9 + wobble);
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.ellipse(0, 0, 14, 11, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(-5, -2, 2.5, 0, Math.PI * 2);
          ctx.arc(5, -2, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#450a0a';
          ctx.font = 'bold 8px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('BUG', 0, 15);
          ctx.restore();
          return;
        }
        ctx.save();
        ctx.shadowColor = 'rgba(96,165,250,0.8)';
        ctx.shadowBlur = 20;
        roundedRect(ctx, cx - 16, cy - 26, 32, 34, 8);
        ctx.fillStyle = '#2563eb';
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#bfdbfe';
        ctx.beginPath();
        ctx.arc(cx, cy - 34, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(cx - 4, cy - 36, 2, 0, Math.PI * 2);
        ctx.arc(cx + 4, cy - 36, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#dbeafe';
        ctx.font = 'bold 10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('H', cx, cy - 6);
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const start = () => moveRef.current(0, 0);

  return (
    <section id="play" className="py-20 px-6 border-t border-white/5 section-grid">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">Playable proof</p>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold">AI Exchange: Bug Market</h2>
          <span className="inline-flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded border border-green-500/30 text-green-400">
            <Github size={13} /> Built &amp; deployed with GitHub Actions
          </span>
        </div>
        <p className="text-slate-400 max-w-2xl mb-8">
          A tiny isometric game about trading AI tokens, dodging hallucinations and shipping builds.
          It runs in the browser, talks to a small full-stack API in local dev, and falls back to a
          simulated exchange on GitHub Pages — the same build-and-deploy path as this portfolio.
        </p>

        <div className="glass apex-panel rounded-2xl p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="rounded-lg bg-[#060a14] border border-white/5 px-3 py-2">
              <p className="font-mono text-[10px] text-slate-500 uppercase">Score</p>
              <p className="text-lg font-bold text-blue-300">{hud.score}</p>
            </div>
            <div className="rounded-lg bg-[#060a14] border border-white/5 px-3 py-2">
              <p className="font-mono text-[10px] text-slate-500 uppercase">Level</p>
              <p className="text-lg font-bold text-cyan-300">{hud.level}</p>
            </div>
            <div className="rounded-lg bg-[#060a14] border border-white/5 px-3 py-2">
              <p className="font-mono text-[10px] text-slate-500 uppercase">Time</p>
              <p className="text-lg font-bold text-slate-200">{hud.time}s</p>
            </div>
            <div className="rounded-lg bg-[#060a14] border border-white/5 px-3 py-2">
              <p className="font-mono text-[10px] text-slate-500 uppercase">Lives</p>
              <p className="text-lg font-bold text-red-300">{'♥'.repeat(hud.lives) || '—'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px] font-mono">
            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-300">
              {mood.mood} · {mood.line}
            </span>
            <span className="px-2 py-1 rounded border border-white/10 text-slate-500">
              API: {mood.source}
            </span>
            <span className="px-2 py-1 rounded border border-white/10 text-slate-500">
              Tokens: {hud.collected}/{TOKENS_PER_LEVEL}
            </span>
            {hud.combo > 1 && (
              <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-300">Combo x{hud.combo}</span>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#040711]">
            <canvas
              ref={canvasRef}
              className="block w-full"
              style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
              aria-label="AI Exchange isometric game"
            />
            {hud.message && (
              <div className="absolute left-1/2 top-4 -translate-x-1/2 max-w-[90%] rounded-lg bg-slate-950/85 border border-blue-500/30 px-4 py-2 text-center text-xs sm:text-sm text-slate-200">
                {hud.message}
              </div>
            )}
            {(hud.status === 'ready' || hud.status === 'over') && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#040711]/70 backdrop-blur-sm">
                <Gamepad2 size={40} className="text-blue-400" />
                <p className="text-lg font-bold">{hud.status === 'ready' ? 'Enter the exchange' : 'Session closed'}</p>
                <p className="text-sm text-slate-400 max-w-sm text-center px-4">
                  Arrow keys / WASD to move. Collect glowing AI tokens, avoid red bugs, then step on the cyan DEPLOY tile to ship a build.
                </p>
                <button
                  onClick={start}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold transition"
                >
                  {hud.status === 'ready' ? <Rocket size={17} /> : <RefreshCw size={17} />}
                  {hud.status === 'ready' ? 'Start trading' : 'Play again'}
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {[
                { label: '↑', dx: -1, dy: -1 },
                { label: '←', dx: -1, dy: 1 },
                { label: '↓', dx: 1, dy: 1 },
                { label: '→', dx: 1, dy: -1 },
              ].map((dir) => (
                <button
                  key={dir.label}
                  onClick={() => moveRef.current(dir.dx, dir.dy)}
                  className="w-10 h-10 rounded-lg border border-white/10 bg-[#060a14] text-slate-300 hover:border-blue-500/50 hover:text-white transition"
                  aria-label={`Move ${dir.label}`}
                >
                  {dir.label}
                </button>
              ))}
            </div>
            {build && (
              <div className="text-[11px] font-mono text-slate-500">
                <Trophy size={12} className="inline mr-1 text-amber-400" />
                build {build.hash} · {build.message}
              </div>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          <div className="glass glass-hover apex-panel rounded-xl p-5">
            <Sparkles size={20} className="text-blue-400 mb-2" />
            <p className="text-sm font-semibold mb-1">AI exchange</p>
            <p className="text-xs text-slate-500">Mood feed from a small Node API with a static fallback.</p>
          </div>
          <div className="glass glass-hover apex-panel rounded-xl p-5">
            <Bug size={20} className="text-red-400 mb-2" />
            <p className="text-sm font-semibold mb-1">Bug market</p>
            <p className="text-xs text-slate-500">Hallucinations chase you. Confidence is not accuracy.</p>
          </div>
          <div className="glass glass-hover apex-panel rounded-xl p-5">
            <Rocket size={20} className="text-cyan-400 mb-2" />
            <p className="text-sm font-semibold mb-1">Deploy loop</p>
            <p className="text-xs text-slate-500">Collect tokens, hit DEPLOY, watch a build record appear.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
