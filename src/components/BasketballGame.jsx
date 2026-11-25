import { useEffect, useRef, useState } from 'react';
import { Activity, Dribbble, Radio, RotateCcw, Trophy, Volume2, VolumeX, Zap } from 'lucide-react';
import { fetchLeaderboard, submitScore } from '../services/basketballApi';

const W = 900;
const H = 500;
const GROUND = 415;
const GRAVITY = 0.42;
const HOOP_R = { x: 822, y: 212 };
const HOOP_L = { x: 78, y: 212 };
const THREE_R = 580;
const THREE_L = 320;
const QUARTER_SECONDS = 60;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function makeStats() {
  return {
    player: { fga: 0, fgm: 0, tpa: 0, tpm: 0, reb: 0, stl: 0 },
    ai: { fga: 0, fgm: 0, tpa: 0, tpm: 0, reb: 0, stl: 0 },
  };
}

function drawCourt(ctx) {
  ctx.fillStyle = '#050914';
  ctx.fillRect(0, 0, W, H);

  const wood = ctx.createLinearGradient(0, 90, 0, GROUND + 60);
  wood.addColorStop(0, '#6b4426');
  wood.addColorStop(1, '#3a2416');
  ctx.fillStyle = wood;
  ctx.fillRect(24, 90, W - 48, H - 150);

  ctx.strokeStyle = 'rgba(0,0,0,0.14)';
  ctx.lineWidth = 1;
  for (let y = 102; y < GROUND + 45; y += 22) {
    ctx.beginPath();
    ctx.moveTo(24, y);
    ctx.lineTo(W - 24, y);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(248,250,252,0.72)';
  ctx.lineWidth = 2;
  ctx.strokeRect(34, 100, W - 68, H - 160);
  ctx.beginPath();
  ctx.moveTo(W / 2, 100);
  ctx.lineTo(W / 2, GROUND + 40);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W / 2, (100 + GROUND + 40) / 2, 52, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(30,58,138,0.55)';
  ctx.fillRect(34, 250, 150, 205);
  ctx.fillRect(W - 184, 250, 150, 205);
  ctx.strokeRect(34, 250, 150, 205);
  ctx.strokeRect(W - 184, 250, 150, 205);
  ctx.beginPath();
  ctx.arc(184, 352, 52, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(W - 184, 352, 52, Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(HOOP_R.x, HOOP_R.y + 22, 250, Math.PI * 0.62, Math.PI * 1.38);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(HOOP_L.x, HOOP_L.y + 22, 250, -Math.PI * 0.38, Math.PI * 0.38);
  ctx.stroke();

  ctx.fillStyle = 'rgba(8,18,40,0.94)';
  ctx.fillRect(0, 0, W, 88);
  ctx.fillStyle = '#22d3ee';
  ctx.font = 'bold 16px JetBrains Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HAZOOM ARENA · PROOF OVER CLAIMS', W / 2, 34);
  ctx.fillStyle = '#64748b';
  ctx.font = '10px JetBrains Mono, monospace';
  ctx.fillText('LOCAL FIRST · CI GREEN · COFFEE OPTIONAL', W / 2, 58);
}

function drawHoop(ctx, hoop, side) {
  const dir = side === 'right' ? 1 : -1;
  const bx = hoop.x + dir * 24;

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(bx, 150);
  ctx.lineTo(bx, 238);
  ctx.stroke();

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(bx + dir * 14, 238);
  ctx.lineTo(bx + dir * 14, GROUND);
  ctx.stroke();

  ctx.fillStyle = 'rgba(148,163,184,0.16)';
  ctx.fillRect(bx - 3, 162, 6, 72);
  ctx.strokeStyle = 'rgba(226,232,240,0.85)';
  ctx.lineWidth = 2;
  ctx.strokeRect(bx - 3, 162, 6, 72);
  ctx.strokeStyle = '#f8fafc';
  const innerX = side === 'right' ? bx - 34 : bx + 2;
  ctx.strokeRect(innerX, 190, 32, 36);

  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(hoop.x - 18, hoop.y);
  ctx.lineTo(hoop.x + 18, hoop.y);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255,255,255,0.75)';
  ctx.lineWidth = 1;
  for (let i = -3; i <= 3; i += 1) {
    ctx.beginPath();
    ctx.moveTo(hoop.x + i * 5, hoop.y + 1);
    ctx.lineTo(hoop.x + i * 2.5, hoop.y + 27);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(hoop.x - 15, hoop.y + 11);
  ctx.lineTo(hoop.x + 15, hoop.y + 11);
  ctx.stroke();
}

function drawAthlete(ctx, entity, color, number, label) {
  const { x, y } = entity;
  ctx.fillStyle = 'rgba(0,0,0,0.38)';
  ctx.beginPath();
  ctx.ellipse(x, GROUND + 2, 24, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-6, -18);
  ctx.lineTo(-10, -2);
  ctx.moveTo(6, -18);
  ctx.lineTo(10, -2);
  ctx.stroke();

  roundedRect(ctx, -16, -56, 32, 38, 9);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fillRect(-16, -48, 32, 4);

  ctx.strokeStyle = color;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(-14, -48);
  ctx.lineTo(-25, -34);
  ctx.moveTo(14, -48);
  ctx.lineTo(25, -38);
  ctx.stroke();

  ctx.fillStyle = '#f1c7a3';
  ctx.beginPath();
  ctx.arc(0, -68, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(0, -72, 11, Math.PI, 0);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px JetBrains Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText(number, 0, -31);
  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  ctx.font = '9px JetBrains Mono, monospace';
  ctx.fillText(label, 0, -82);
  ctx.restore();
}

function drawBall(ctx, ball) {
  const { x, y } = ball;
  ctx.save();
  ctx.shadowColor = 'rgba(249,115,22,0.65)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#ea580c';
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#7c2d12';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x - 9, y);
  ctx.lineTo(x + 9, y);
  ctx.moveTo(x, y - 9);
  ctx.lineTo(x, y + 9);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x - 4, y, 6, -Math.PI / 2, Math.PI / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x + 4, y, 6, Math.PI / 2, Math.PI * 1.5);
  ctx.stroke();
  ctx.restore();
}

export default function BasketballGame() {
  const canvasRef = useRef(null);
  const keysRef = useRef({ left: false, right: false });
  const actionRef = useRef(() => {});
  const startRef = useRef(() => {});
  const stateRef = useRef(null);
  const hudRef = useRef({});
  const [hud, setHud] = useState({
    status: 'ready', playerScore: 0, aiScore: 0, quarter: 1,
    gameClock: QUARTER_SECONDS, shotClock: 24, possession: 'player',
    stats: makeStats(), log: ['Tip-off is ready. Press TIP OFF to start.'], soundOn: true,
  });
  const [leaderboard, setLeaderboard] = useState([]);
  const [apiSource, setApiSource] = useState('connecting');

  if (!stateRef.current) {
    stateRef.current = {
      status: 'ready',
      quarter: 1,
      gameClock: QUARTER_SECONDS,
      shotClock: 24,
      playerScore: 0,
      aiScore: 0,
      possession: 'player',
      player: { x: 250, y: GROUND, vy: 0, onGround: true, cooldown: 0 },
      ai: { x: 620, y: GROUND, vy: 0, onGround: true, cooldown: 0 },
      ball: { x: 268, y: GROUND - 58, vx: 0, vy: 0, heldBy: 'player', lastShooter: null, releaseFrames: 0, shotThree: false },
      stats: makeStats(),
      log: ['Tip-off is ready. Press TIP OFF to start.'],
      particles: [],
      popups: [],
      lastTime: 0,
      lastBounceSound: 0,
      resultSubmitted: false,
      soundOn: true,
    };
  }

  useEffect(() => {
    let alive = true;
    fetchLeaderboard().then((board) => {
      if (!alive) return;
      setLeaderboard(board);
      setApiSource(board[0]?.source || 'local');
    });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    let audioCtx;
    const tone = (freq, duration, type = 'sine', volume = 0.045, slide = 0) => {
      if (!stateRef.current.soundOn) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        audioCtx = audioCtx || new AudioCtx();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(60, freq + slide), audioCtx.currentTime + duration);
        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch {
        // Audio is a bonus, never a blocker.
      }
    };

    const say = (text) => {
      const s = stateRef.current;
      s.log = [text, ...s.log].slice(0, 6);
    };

    const addPopup = (x, y, text, color = '#fbbf24') => {
      stateRef.current.popups.push({ x, y, text, color, life: 70 });
    };

    const burst = (x, y, color = '#fbbf24') => {
      for (let i = 0; i < 18; i += 1) {
        const angle = (Math.PI * 2 * i) / 18 + Math.random() * 0.3;
        const speed = 1.4 + Math.random() * 2.6;
        stateRef.current.particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          life: 38 + Math.random() * 22,
          color,
        });
      }
    };

    const resetPossession = (team, reason) => {
      const s = stateRef.current;
      s.possession = team;
      s.shotClock = 24;
      s.ball.heldBy = team;
      s.ball.vx = 0;
      s.ball.vy = 0;
      s.ball.lastShooter = null;
      s.ball.releaseFrames = 0;
      s.player.cooldown = Math.max(s.player.cooldown, 8);
      s.ai.cooldown = Math.max(s.ai.cooldown, 8);
      if (reason) say(reason);
    };

    const startGame = () => {
      const s = stateRef.current;
      s.status = 'playing';
      s.quarter = 1;
      s.gameClock = QUARTER_SECONDS;
      s.shotClock = 24;
      s.playerScore = 0;
      s.aiScore = 0;
      s.stats = makeStats();
      s.player = { x: 250, y: GROUND, vy: 0, onGround: true, cooldown: 0 };
      s.ai = { x: 620, y: GROUND, vy: 0, onGround: true, cooldown: 0 };
      s.ball = { x: 268, y: GROUND - 58, vx: 0, vy: 0, heldBy: 'player', lastShooter: null, releaseFrames: 0, shotThree: false };
      s.particles = [];
      s.popups = [];
      s.resultSubmitted = false;
      s.log = ['Tip-off! Hazem brings the ball up the court.'];
    };

    const endGame = () => {
      const s = stateRef.current;
      if (s.status === 'over') return;
      s.status = 'over';
      s.ball.heldBy = null;
      const result = s.playerScore >= s.aiScore ? 'W' : 'L';
      say(`Final buzzer. HAZEM ${s.playerScore} — AI CORE ${s.aiScore}.`);
      if (!s.resultSubmitted) {
        s.resultSubmitted = true;
        submitScore({ name: 'HAZEM', points: s.playerScore, opponent: s.aiScore, result })
          .then((board) => {
            setLeaderboard(board);
            setApiSource(board[0]?.source || 'local');
          });
      }
    };

    const shoot = (who) => {
      const s = stateRef.current;
      const shooter = who === 'player' ? s.player : s.ai;
      const target = who === 'player' ? HOOP_R : HOOP_L;
      const distance = Math.abs(target.x - shooter.x);
      const three = who === 'player' ? shooter.x < THREE_R : shooter.x > THREE_L;
      const contested = Math.abs(s.ai.x - s.player.x) < 82;
      const flight = clamp(distance / 11.5, 28, 64);
      const error = (contested ? 24 : 8) + (distance > 520 ? 10 : 0);
      const targetX = target.x + (Math.random() - 0.5) * error * 2;
      const targetY = target.y + (Math.random() - 0.5) * error;

      s.ball.x = shooter.x + (who === 'player' ? 18 : -18);
      s.ball.y = shooter.y - 58;
      s.ball.vx = (targetX - s.ball.x) / flight;
      s.ball.vy = (targetY - s.ball.y - 0.5 * GRAVITY * flight * flight) / flight;
      s.ball.heldBy = null;
      s.ball.lastShooter = who;
      s.ball.releaseFrames = 0;
      s.ball.shotThree = three;
      shooter.cooldown = who === 'player' ? 22 : 40;

      const st = s.stats[who];
      st.fga += 1;
      if (three) st.tpa += 1;
      say(`${who === 'player' ? 'Hazem' : 'AI Core'} puts up a ${three ? 'three' : 'mid-range'} attempt.`);
      tone(430, 0.07, 'sine', 0.03, 130);
    };

    const scoreBasket = (who, three) => {
      const s = stateRef.current;
      const points = three ? 3 : 2;
      const st = s.stats[who];
      st.fgm += 1;
      if (three) st.tpm += 1;
      if (who === 'player') s.playerScore += points;
      else s.aiScore += points;
      const hoop = who === 'player' ? HOOP_R : HOOP_L;
      addPopup(hoop.x, hoop.y - 34, `+${points}`, who === 'player' ? '#22d3ee' : '#f87171');
      burst(hoop.x, hoop.y, who === 'player' ? '#22d3ee' : '#f87171');
      say(`${who === 'player' ? 'Hazem' : 'AI Core'} drains the ${three ? 'three' : 'bucket'}! +${points}`);
      tone(880, 0.16, 'triangle', 0.055, 240);
      setTimeout(() => tone(1320, 0.12, 'sine', 0.035, 160), 90);
      resetPossession(who === 'player' ? 'ai' : 'player');
    };

    const action = () => {
      const s = stateRef.current;
      if (s.status === 'ready' || s.status === 'over') {
        startGame();
        return;
      }
      if (s.possession === 'player' && s.player.cooldown <= 0) {
        shoot('player');
      } else if (!s.player.onGround) {
        s.player.vy = -9.6;
        s.player.onGround = false;
        say('Hazem elevates for the rebound.');
      }
    };

    startRef.current = startGame;
    actionRef.current = action;

    const onKeyDown = (event) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'].includes(event.code) || event.key === ' ') event.preventDefault();
      if (event.code === 'ArrowLeft' || event.key.toLowerCase() === 'a') keysRef.current.left = true;
      if (event.code === 'ArrowRight' || event.key.toLowerCase() === 'd') keysRef.current.right = true;
      if (event.code === 'Space' || event.code === 'ArrowUp' || event.key.toLowerCase() === 'w') action();
    };
    const onKeyUp = (event) => {
      if (event.code === 'ArrowLeft' || event.key.toLowerCase() === 'a') keysRef.current.left = false;
      if (event.code === 'ArrowRight' || event.key.toLowerCase() === 'd') keysRef.current.right = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    let raf = 0;

    const draw = (now) => {
      const s = stateRef.current;
      const dt = s.lastTime ? clamp((now - s.lastTime) / 16.67, 0, 2.4) : 1;
      s.lastTime = now;

      if (s.status === 'playing') {
        s.gameClock = Math.max(0, s.gameClock - dt / 60);
        s.shotClock = Math.max(0, s.shotClock - dt / 60);
        s.player.cooldown = Math.max(0, s.player.cooldown - dt);
        s.ai.cooldown = Math.max(0, s.ai.cooldown - dt);

        if (s.gameClock <= 0) {
          if (s.quarter >= 4) {
            endGame();
          } else {
            s.quarter += 1;
            s.gameClock = QUARTER_SECONDS;
            s.shotClock = 24;
            resetPossession(s.quarter % 2 === 1 ? 'player' : 'ai', `End of Q${s.quarter - 1}. Q${s.quarter} is live.`);
          }
        }

        if (s.status === 'playing' && s.shotClock <= 0) {
          resetPossession(s.possession === 'player' ? 'ai' : 'player', 'Shot clock violation. Turnover.');
        }

        if (keysRef.current.left) s.player.x -= 4.4 * dt;
        if (keysRef.current.right) s.player.x += 4.4 * dt;
        s.player.x = clamp(s.player.x, 46, W - 46);

        if (s.possession === 'ai') {
          const target = 210;
          const step = Math.min(Math.abs(target - s.ai.x), 3.1 * dt);
          s.ai.x += Math.sign(target - s.ai.x) * step;
          if (s.ai.x < 270 && s.ai.cooldown <= 0) shoot('ai');
        } else if (s.possession === 'player') {
          const target = clamp(s.player.x + 76, 120, W - 100);
          const step = Math.min(Math.abs(target - s.ai.x), 2.7 * dt);
          s.ai.x += Math.sign(target - s.ai.x) * step;
          if (Math.abs(s.ai.x - s.player.x) < 46 && s.ai.cooldown <= 0 && Math.random() < 0.016 * dt) {
            s.stats.ai.stl += 1;
            s.ai.cooldown = 52;
            resetPossession('ai', 'AI Core pokes it loose. Steal!');
            tone(240, 0.09, 'square', 0.03, -90);
          }
        } else {
          [s.player, s.ai].forEach((athlete) => {
            const target = clamp(s.ball.x, 46, W - 46);
            const step = Math.min(Math.abs(target - athlete.x), 3.4 * dt);
            athlete.x += Math.sign(target - athlete.x) * step;
          });
        }
        s.ai.x = clamp(s.ai.x, 46, W - 46);

        [s.player, s.ai].forEach((athlete) => {
          if (!athlete.onGround) {
            athlete.vy += GRAVITY * 1.55 * dt;
            athlete.y += athlete.vy * dt;
            if (athlete.y >= GROUND) {
              athlete.y = GROUND;
              athlete.vy = 0;
              athlete.onGround = true;
            }
          }
        });

        if (s.ball.heldBy) {
          const holder = s.ball.heldBy === 'player' ? s.player : s.ai;
          s.ball.x = holder.x + (s.ball.heldBy === 'player' ? 18 : -18);
          s.ball.y = holder.y - 58;
          s.ball.vx = 0;
          s.ball.vy = 0;
        } else {
          const prevY = s.ball.y;
          s.ball.vy += GRAVITY * dt;
          s.ball.x += s.ball.vx * dt;
          s.ball.y += s.ball.vy * dt;
          s.ball.releaseFrames += dt;

          const scoredRight = s.ball.lastShooter === 'player' && prevY <= HOOP_R.y && s.ball.y >= HOOP_R.y && Math.abs(s.ball.x - HOOP_R.x) < 14 && s.ball.vy > 0;
          const scoredLeft = s.ball.lastShooter === 'ai' && prevY <= HOOP_L.y && s.ball.y >= HOOP_L.y && Math.abs(s.ball.x - HOOP_L.x) < 14 && s.ball.vy > 0;
          if (scoredRight || scoredLeft) {
            scoreBasket(s.ball.lastShooter, s.ball.shotThree);
          } else {
            [HOOP_R, HOOP_L].forEach((hoop) => {
              const d = Math.hypot(s.ball.x - hoop.x, s.ball.y - hoop.y);
              if (d > 0 && d < 22 && s.ball.releaseFrames > 6) {
                const nx = (s.ball.x - hoop.x) / d;
                const ny = (s.ball.y - hoop.y) / d;
                const dot = s.ball.vx * nx + s.ball.vy * ny;
                if (dot < 0) {
                  s.ball.vx -= 2 * dot * nx;
                  s.ball.vy -= 2 * dot * ny;
                  s.ball.vx *= 0.62;
                  s.ball.vy *= 0.62;
                  s.shotClock = 24;
                  say('Off the rim! Shot clock resets.');
                  tone(210, 0.05, 'sine', 0.025, -40);
                }
              }
            });

            if (s.ball.x > 842 && s.ball.y > 155 && s.ball.y < 238 && s.ball.vx > 0) {
              s.ball.x = 842;
              s.ball.vx = -Math.abs(s.ball.vx) * 0.56;
              s.shotClock = 24;
              tone(190, 0.05, 'sine', 0.025, -40);
            }
            if (s.ball.x < 58 && s.ball.y > 155 && s.ball.y < 238 && s.ball.vx < 0) {
              s.ball.x = 58;
              s.ball.vx = Math.abs(s.ball.vx) * 0.56;
              s.shotClock = 24;
              tone(190, 0.05, 'sine', 0.025, -40);
            }

            if (s.ball.y > GROUND - 9) {
              s.ball.y = GROUND - 9;
              s.ball.vy = -s.ball.vy * 0.62;
              s.ball.vx *= 0.86;
              if (Math.abs(s.ball.vy) < 1.2) s.ball.vy = 0;
              if (now - s.lastBounceSound > 130) {
                s.lastBounceSound = now;
                tone(160, 0.045, 'sine', 0.022, -50);
              }
            }

            if (s.ball.releaseFrames > 12 && s.ball.y > GROUND - 150) {
              const pDist = Math.hypot(s.ball.x - s.player.x, s.ball.y - (s.player.y - 45));
              const aDist = Math.hypot(s.ball.x - s.ai.x, s.ball.y - (s.ai.y - 45));
              if (pDist < 46 && s.player.y <= s.ball.y + 30) {
                s.stats.player.reb += 1;
                resetPossession('player', 'Hazem grabs the rebound.');
              } else if (aDist < 46 && s.ai.y <= s.ball.y + 30) {
                s.stats.ai.reb += 1;
                resetPossession('ai', 'AI Core controls the glass.');
              }
            }
          }
        }
      }

      s.particles = s.particles.filter((p) => p.life > 0);
      s.particles.forEach((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.12 * dt;
        p.life -= dt;
      });
      s.popups = s.popups.filter((p) => p.life > 0);
      s.popups.forEach((p) => {
        p.y -= 0.45 * dt;
        p.life -= dt;
      });

      const nextHud = {
        status: s.status,
        playerScore: s.playerScore,
        aiScore: s.aiScore,
        quarter: s.quarter,
        gameClock: s.gameClock,
        shotClock: s.shotClock,
        possession: s.possession,
        stats: s.stats,
        log: s.log,
        soundOn: s.soundOn,
      };
      if (JSON.stringify(nextHud) !== JSON.stringify(hudRef.current)) {
        hudRef.current = nextHud;
        setHud(nextHud);
      }

      drawCourt(ctx);
      drawHoop(ctx, HOOP_L, 'left');
      drawHoop(ctx, HOOP_R, 'right');
      drawAthlete(ctx, s.ai, '#ef4444', '01', 'AI CORE');
      drawAthlete(ctx, s.player, '#22d3ee', '23', 'HAZEM');
      drawBall(ctx, s.ball);

      s.particles.forEach((p) => {
        ctx.globalAlpha = clamp(p.life / 40, 0, 1);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      s.popups.forEach((p) => {
        ctx.globalAlpha = clamp(p.life / 50, 0, 1);
        ctx.fillStyle = p.color;
        ctx.font = 'bold 22px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.text, p.x, p.y);
      });
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const toggleSound = () => {
    stateRef.current.soundOn = !stateRef.current.soundOn;
  };

  const clock = (seconds) => {
    const safe = Math.max(0, seconds);
    const m = Math.floor(safe / 60);
    const sec = Math.floor(safe % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const pct = (made, attempted) => (attempted ? Math.round((made / attempted) * 100) : 0);

  return (
    <section id="play" className="py-20 px-6 border-t border-white/5 section-grid">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-blue-400 tracking-[0.35em] uppercase mb-3">Playable proof</p>
        <div className="flex items-end justify-between gap-6 flex-wrap mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold">HAZOOM Hoops</h2>
          <span className="inline-flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded border border-green-500/30 text-green-400">
            <Radio size={13} /> API: {apiSource} · GitHub Actions deploy
          </span>
        </div>
        <p className="text-slate-400 max-w-2xl mb-8">
          A polished 2D basketball simulation: full court, four quarters, shot clock, steals, rebounds,
          contested shooting and a live scoreboard. Built with canvas physics, a small full-stack Node API,
          and the same automated delivery pipeline as this portfolio.
        </p>

        <div className="grid lg:grid-cols-[1fr_260px] gap-6">
          <div className="glass apex-panel rounded-2xl p-4 sm:p-5">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 mb-4">
              <div className="text-right">
                <p className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">Hazem</p>
                <p className="text-3xl font-bold text-cyan-300">{hud.playerScore}</p>
              </div>
              <div className="text-center px-3">
                <p className="font-mono text-[10px] text-slate-500 uppercase">Q{hud.quarter}</p>
                <p className="font-mono text-lg text-slate-100">{clock(hud.gameClock)}</p>
                <p className={`font-mono text-[11px] ${hud.shotClock < 5 ? 'text-red-400' : 'text-slate-500'}`}>
                  SHOT {Math.ceil(hud.shotClock)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-red-400 uppercase tracking-widest">AI Core</p>
                <p className="text-3xl font-bold text-red-300">{hud.aiScore}</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#050914]">
              <canvas
                ref={canvasRef}
                className="block w-full"
                style={{ aspectRatio: `${W} / ${H}` }}
                aria-label="HAZOOM Hoops basketball game"
              />
              {(hud.status === 'ready' || hud.status === 'over') && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#040711]/72 backdrop-blur-sm">
                  <Dribbble size={42} className="text-blue-400" />
                  <p className="text-xl font-bold">
                    {hud.status === 'ready' ? 'Tip off' : 'Final buzzer'}
                  </p>
                  <p className="text-sm text-slate-300">
                    {hud.status === 'over'
                      ? `HAZEM ${hud.playerScore} — AI CORE ${hud.aiScore}`
                      : 'Four quarters. One ball. No excuses.'}
                  </p>
                  <button
                    onClick={() => startRef.current()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold transition"
                  >
                    <RotateCcw size={17} /> {hud.status === 'ready' ? 'Start game' : 'Run it back'}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onPointerDown={() => { keysRef.current.left = true; }}
                  onPointerUp={() => { keysRef.current.left = false; }}
                  onPointerLeave={() => { keysRef.current.left = false; }}
                  className="w-12 h-10 rounded-lg border border-white/10 bg-[#060a14] text-slate-300 hover:border-blue-500/50 transition"
                >←</button>
                <button
                  onPointerDown={() => { keysRef.current.right = true; }}
                  onPointerUp={() => { keysRef.current.right = false; }}
                  onPointerLeave={() => { keysRef.current.right = false; }}
                  className="w-12 h-10 rounded-lg border border-white/10 bg-[#060a14] text-slate-300 hover:border-blue-500/50 transition"
                >→</button>
                <button
                  onClick={() => actionRef.current()}
                  className="px-4 h-10 rounded-lg bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 font-semibold hover:bg-cyan-600/30 transition"
                >SHOOT / JUMP</button>
              </div>
              <button
                onClick={toggleSound}
                className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition"
              >
                {hud.soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
                {hud.soundOn ? 'Sound on' : 'Sound off'}
              </button>
            </div>
            <p className="mt-3 text-[11px] text-slate-600 font-mono">
              ← / → move · SPACE or W shoot · jump to rebound when the ball is loose
            </p>
          </div>

          <aside className="space-y-4">
            <div className="glass glass-hover apex-panel rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Activity size={16} className="text-blue-400" />
                <h3 className="font-semibold text-sm">Player stats</h3>
              </div>
              <div className="space-y-2 font-mono text-[11px] text-slate-400">
                <div className="flex justify-between"><span>FG</span><span>{hud.stats.player.fgm}/{hud.stats.player.fga} · {pct(hud.stats.player.fgm, hud.stats.player.fga)}%</span></div>
                <div className="flex justify-between"><span>3PT</span><span>{hud.stats.player.tpm}/{hud.stats.player.tpa}</span></div>
                <div className="flex justify-between"><span>REB</span><span>{hud.stats.player.reb}</span></div>
                <div className="flex justify-between"><span>STL</span><span>{hud.stats.player.stl}</span></div>
                <div className="flex justify-between text-cyan-400"><span>POSSESSION</span><span>{hud.possession.toUpperCase()}</span></div>
              </div>
            </div>

            <div className="glass glass-hover apex-panel rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap size={16} className="text-amber-400" />
                <h3 className="font-semibold text-sm">Game log</h3>
              </div>
              <ul className="space-y-2 text-[11px] text-slate-400">
                {hud.log.slice(0, 5).map((entry, i) => (
                  <li key={`${entry}-${i}`} className="leading-snug">
                    <span className="text-slate-600 font-mono mr-1">{String(i + 1).padStart(2, '0')}</span>
                    {entry}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass glass-hover apex-panel rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Trophy size={16} className="text-amber-400" />
                <h3 className="font-semibold text-sm">Leaderboard</h3>
              </div>
              <ol className="space-y-2 text-[11px] font-mono">
                {leaderboard.slice(0, 5).map((row, i) => (
                  <li key={row.id || `${row.name}-${i}`} className="flex justify-between gap-2">
                    <span className="text-slate-500">{i + 1}. {row.name}</span>
                    <span className={row.result === 'W' ? 'text-cyan-300' : 'text-slate-500'}>
                      {row.points}-{row.opponent} {row.result}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
