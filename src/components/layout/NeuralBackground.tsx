"use client";

import { NeuralField } from "@/components/hero/NeuralField";

/**
 * Site-wide background: the animated neural network + faint blueprint grid,
 * fixed behind all content so it shows through every section. Content cards
 * use an opaque paper background, so text stays readable on top of it.
 */
export function NeuralBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <NeuralField />
    </div>
  );
}
