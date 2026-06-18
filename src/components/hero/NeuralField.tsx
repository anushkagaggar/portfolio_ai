"use client";

import { useEffect, useRef } from "react";

type Node = {
  hx: number; hy: number; x: number; y: number; vx: number; vy: number; r: number; accent: boolean;
};

const INK = "#161616";
const ACCENT = "#4f46e5";
const LINK_DIST = 150;
const DENSITY = 14000;

/** A living constellation: particles glide into place, drift, and connect. */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let raf = 0;
    let start = performance.now();
    const mouse = { x: 0.5, y: 0.5 };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(28, Math.min(90, Math.floor((width * height) / DENSITY)));
      const cx = width / 2, cy = height / 2;
      nodes = Array.from({ length: count }, (_, i) => {
        const hx = rand(0, width), hy = rand(0, height);
        const ang = rand(0, Math.PI * 2), spread = rand(0.05, 0.35);
        return {
          hx, hy,
          x: cx + Math.cos(ang) * (hx - cx) * spread,
          y: cy + Math.sin(ang) * (hy - cy) * spread,
          vx: rand(-0.18, 0.18), vy: rand(-0.18, 0.18),
          r: rand(2.2, 3.6), accent: i === Math.floor(count * 0.62),
        };
      });
      start = performance.now();
    };

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const intro = Math.min(1, (now - start) / 1600);
      const e = easeOut(intro);
      const px = (mouse.x - 0.5) * 26, py = (mouse.y - 0.5) * 18;

      for (const n of nodes) {
        if (intro >= 1) {
          n.hx += n.vx; n.hy += n.vy;
          if (n.hx < 0 || n.hx > width) n.vx *= -1;
          if (n.hy < 0 || n.hy > height) n.vy *= -1;
        }
        n.x = n.x + (n.hx - n.x) * e;
        n.y = n.y + (n.hy - n.y) * e;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(150,149,140,${(1 - d / LINK_DIST) * 0.55 * e})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x + px, a.y + py);
            ctx.lineTo(b.x + px, b.y + py);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.accent ? ACCENT : INK;
        ctx.globalAlpha = (n.accent ? 1 : 0.85) * e;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (ev: MouseEvent) => {
      mouse.x = ev.clientX / window.innerWidth;
      mouse.y = ev.clientY / window.innerHeight;
    };
    const onResize = () => build();

    build();
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
