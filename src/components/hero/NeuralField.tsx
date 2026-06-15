"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Node = {
  // resting/home position
  hx: number;
  hy: number;
  // current position
  x: number;
  y: number;
  // drift velocity
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
};

const INK = "#161616";
const ACCENT = "#4f46e5";
const LINK_DIST = 150; // px at which two nodes connect
const DENSITY = 14000; // one node per ~this many px²

/**
 * A living constellation: nodes start scattered off their marks, glide into a
 * loose lattice over the first ~1.6s ("neurons coming together"), then drift
 * gently and connect to nearby neighbours. Reacts subtly to the mouse.
 * Under reduced motion it renders one calm static frame.
 */
export function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    let raf = 0;
    let start = performance.now();
    const mouse = { x: 0.5, y: 0.5, active: false };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(28, Math.min(90, Math.floor((width * height) / DENSITY)));
      const cx = width / 2;
      const cy = height / 2;
      nodes = Array.from({ length: count }, (_, i) => {
        const hx = rand(0, width);
        const hy = rand(0, height);
        // start collapsed toward the centre, then expand outward into place
        const ang = rand(0, Math.PI * 2);
        const spread = rand(0.05, 0.35);
        return {
          hx,
          hy,
          x: cx + Math.cos(ang) * (hx - cx) * spread,
          y: cy + Math.sin(ang) * (hy - cy) * spread,
          vx: rand(-0.18, 0.18),
          vy: rand(-0.18, 0.18),
          r: rand(2.2, 3.6),
          accent: i === Math.floor(count * 0.62),
        };
      });
      start = performance.now();
    };

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      const intro = Math.min(1, (now - start) / 1600); // 0..1 entrance
      const e = easeOut(intro);
      const px = (mouse.x - 0.5) * 26;
      const py = (mouse.y - 0.5) * 18;

      // update positions
      for (const n of nodes) {
        if (intro >= 1 && !reduced) {
          n.hx += n.vx;
          n.hy += n.vy;
          if (n.hx < 0 || n.hx > width) n.vx *= -1;
          if (n.hy < 0 || n.hy > height) n.vy *= -1;
        }
        const tx = reduced ? n.hx : n.x + (n.hx - n.x) * e;
        const ty = reduced ? n.hy : n.y + (n.hy - n.y) * e;
        n.x = tx;
        n.y = ty;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.55 * e;
            ctx.strokeStyle = `rgba(150,149,140,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x + px, a.y + py);
            ctx.lineTo(b.x + px, b.y + py);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.accent ? ACCENT : INK;
        ctx.globalAlpha = n.accent ? e : 0.85 * e;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMouse = (ev: MouseEvent) => {
      mouse.x = ev.clientX / window.innerWidth;
      mouse.y = ev.clientY / window.innerHeight;
      mouse.active = true;
    };

    build();
    if (reduced) {
      draw(start + 2000); // single settled frame
    } else {
      window.addEventListener("mousemove", onMouse, { passive: true });
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      build();
      if (reduced) draw(start + 2000);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
