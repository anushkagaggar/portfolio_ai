"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

// Layered nodes (x, y in a 0..100 / 0..60 space) forming a small network.
const NODES = [
  { x: 8, y: 30 },
  { x: 8, y: 14 },
  { x: 8, y: 46 },
  { x: 32, y: 10 },
  { x: 32, y: 30 },
  { x: 32, y: 50 },
  { x: 56, y: 18 },
  { x: 56, y: 42 },
  { x: 80, y: 30 },
  { x: 92, y: 16 },
  { x: 92, y: 44 },
];

// Connections between node indices.
const EDGES: [number, number][] = [
  [0, 4], [1, 3], [2, 5],
  [3, 6], [4, 6], [4, 7], [5, 7],
  [6, 8], [7, 8],
  [8, 9], [8, 10],
];

/**
 * Thin schematic network that "draws in" on load: edges stroke on, nodes
 * settle, the whole thing breathes faintly via mouse parallax. Static when
 * reduced motion is requested.
 */
export function NeuralNet() {
  const ref = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const svg = ref.current;

      const edges = svg.querySelectorAll<SVGLineElement>("line");
      const nodes = svg.querySelectorAll<SVGCircleElement>("circle");

      gsap.set(nodes, { transformOrigin: "center", scale: 0, opacity: 0 });
      edges.forEach((edge) => {
        const len = edge.getTotalLength?.() ?? 120;
        gsap.set(edge, { strokeDasharray: len, strokeDashoffset: len });
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.to(edges, { strokeDashoffset: 0, duration: 1.1, stagger: 0.05 })
        .to(nodes, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.04 }, "-=0.9");

      // gentle mouse parallax
      const onMove = (e: MouseEvent) => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 14;
        const dy = (e.clientY / window.innerHeight - 0.5) * 10;
        gsap.to(svg, { x: dx, y: dy, duration: 0.8, ease: "power2.out" });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { dependencies: [reduced], scope: ref }
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 60"
      className="h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="var(--color-line)"
          strokeWidth={0.4}
        />
      ))}
      {NODES.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 8 ? 1.8 : 1.2}
          fill={i === 8 ? "var(--color-accent)" : "var(--color-ink)"}
        />
      ))}
    </svg>
  );
}
