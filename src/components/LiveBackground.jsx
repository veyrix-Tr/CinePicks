import { useEffect, useRef } from 'react';

function LiveBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const colors = [
      ['rgba(168, 85, 247, 0.95)', 'rgba(139, 92, 246, 0.55)'],
      ['rgba(139, 92, 246, 0.95)', 'rgba(99, 102, 241, 0.55)'],
      ['rgba(99, 102, 241, 0.95)', 'rgba(34, 211, 238, 0.55)'],
      ['rgba(34, 211, 238, 0.95)', 'rgba(6, 182, 212, 0.55)'],
      ['rgba(236, 72, 153, 0.95)', 'rgba(219, 39, 119, 0.55)'],
      ['rgba(251, 191, 36, 0.95)', 'rgba(245, 158, 11, 0.55)'],
      ['rgba(16, 185, 129, 0.95)', 'rgba(5, 150, 105, 0.55)'],
      ['rgba(244, 63, 94, 0.95)', 'rgba(220, 38, 38, 0.55)'],
      ['rgba(251, 146, 60, 0.95)', 'rgba(234, 88, 12, 0.55)'],
      ['rgba(96, 165, 250, 0.95)', 'rgba(37, 99, 235, 0.55)'],
      ['rgba(196, 181, 253, 0.95)', 'rgba(167, 139, 250, 0.55)'],
      ['rgba(251, 207, 232, 0.95)', 'rgba(244, 114, 182, 0.55)'],
    ];

    const makeGradient = (x, y, r, c1, c2) => {
      const gx = x - r * 0.35;
      const gy = y - r * 0.35;
      const grad = ctx.createRadialGradient(gx, gy, r * 0.1, x, y, r);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
      grad.addColorStop(0.18, c1);
      grad.addColorStop(1, c2);
      return grad;
    };

    const balls = [];
    const sim = {
      startMs: performance.now(),
    };

    const rand = (min, max) => min + Math.random() * (max - min);

    const placeNonOverlapping = (r, cx, cy, maxAttempts) => {
      let attempt = 0;
      let spread = 2;
      while (attempt < maxAttempts) {
        const t = Math.random() * Math.PI * 2;
        const mag = rand(0, spread);
        const x = cx + Math.cos(t) * mag;
        const y = cy + Math.sin(t) * mag;

        let ok = true;
        for (let i = 0; i < balls.length; i += 1) {
          const b = balls[i];
          const dx = x - b.x;
          const dy = y - b.y;
          const minDist = r + b.r;
          if (dx * dx + dy * dy < minDist * minDist) {
            ok = false;
            break;
          }
        }

        if (ok) return { x, y };

        attempt += 1;
        if (attempt % 60 === 0) spread += 6;
      }

      return { x: cx, y: cy };
    };

    const init = () => {
      balls.length = 0;
      sim.startMs = performance.now();

      const count = 34;
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < count; i += 1) {
        const r = rand(40, 52);
        const { x, y } = placeNonOverlapping(r, cx, cy, 900);

        const [c1, c2] = colors[i % colors.length];

        const angle = (i / count) * Math.PI * 2 + rand(-0.25, 0.25);
        const speed = rand(280, 520);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        balls.push({
          x,
          y,
          vx,
          vy,
          r,
          c1,
          c2,
          hit: 0,
          wallHit: 0,
        });
      }
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      draw(0);
    };

    const restitution = 0.975;
    const friction = 0.99985;

    const step = (dt) => {
      for (let i = 0; i < balls.length; i += 1) {
        const b = balls[i];

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        b.vx *= friction;
        b.vy *= friction;

        const speedSq = b.vx * b.vx + b.vy * b.vy;
        if (speedSq < (70 * 1.25) * (70 * 1.25)) {
          const boost = 1.0035;
          b.vx *= boost;
          b.vy *= boost;
        }

        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx = Math.abs(b.vx) * restitution;
          b.wallHit = 0.22;
        } else if (b.x + b.r > width) {
          b.x = width - b.r;
          b.vx = -Math.abs(b.vx) * restitution;
          b.wallHit = 0.22;
        }

        if (b.y - b.r < 0) {
          b.y = b.r;
          b.vy = Math.abs(b.vy) * restitution;
          b.wallHit = 0.22;
        } else if (b.y + b.r > height) {
          b.y = height - b.r;
          b.vy = -Math.abs(b.vy) * restitution;
          b.wallHit = 0.22;
        }

        b.hit = Math.max(0, b.hit - dt);
        b.wallHit = Math.max(0, b.wallHit - dt);
      }

      for (let i = 0; i < balls.length; i += 1) {
        for (let j = i + 1; j < balls.length; j += 1) {
          const a = balls[i];
          const b = balls[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          const minDist = a.r + b.r;
          if (distSq === 0 || distSq >= minDist * minDist) continue;

          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;

          const overlap = minDist - dist;
          const totalMass = a.r * a.r + b.r * b.r;
          const aMass = (a.r * a.r) / totalMass;
          const bMass = (b.r * b.r) / totalMass;

          a.x -= nx * overlap * bMass;
          a.y -= ny * overlap * bMass;
          b.x += nx * overlap * aMass;
          b.y += ny * overlap * aMass;

          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const relVel = rvx * nx + rvy * ny;
          if (relVel > 0) continue;

          const e = 0.9;
          const invA = 1 / (a.r * a.r);
          const invB = 1 / (b.r * b.r);
          const jImpulse = -(1 + e) * relVel / (invA + invB);

          a.vx -= (jImpulse * nx) * invA;
          a.vy -= (jImpulse * ny) * invA;
          b.vx += (jImpulse * nx) * invB;
          b.vy += (jImpulse * ny) * invB;

          a.hit = 0.16;
          b.hit = 0.16;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const now = performance.now();
      const explodeT = Math.min(1, Math.max(0, (now - sim.startMs) / 900));
      const p = 1 - Math.pow(1 - explodeT, 3);
      const cx = width / 2;
      const cy = height / 2;

      const bg = ctx.createRadialGradient(width * 0.5, height * 0.35, 0, width * 0.5, height * 0.5, Math.max(width, height) * 0.75);
      bg.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      bg.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < balls.length; i += 1) {
        const b = balls[i];
        const hitBoost = Math.max(b.hit * 1.8, b.wallHit * 2.2);

        const x = cx + (b.x - cx) * p;
        const y = cy + (b.y - cy) * p;
        const r = b.r * (0.25 + 0.75 * p);

        ctx.shadowBlur = 22 + hitBoost * 42;
        ctx.shadowColor = b.wallHit > 0 ? 'rgba(255, 120, 100, 0.85)' : b.c1;

        ctx.fillStyle = makeGradient(x, y, r, b.c1, b.c2);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let last = performance.now();

    const loop = (now) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      if (!prefersReducedMotion) {
        step(dt);
      }
      draw();

      rafRef.current = window.requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    resize();

    if (!prefersReducedMotion) {
      rafRef.current = window.requestAnimationFrame(loop);
    }

    return () => {
      ro.disconnect();
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="live-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="bg-canvas" />
      <div className="bg-glass" />
      <div className="overlay" />
    </div>
  );
}

export default LiveBackground;
