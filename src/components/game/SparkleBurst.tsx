"use client";

import { motion } from "framer-motion";

const PARTICLES = ["✨", "⭐", "🥚", "💫", "✨", "⭐"];

interface SparkleBurstProps {
  /** Change this value to replay the burst (e.g. Date.now()). */
  triggerKey: string | number;
}

/** Small star / eggshell particle burst for important moments (choices, mission success). */
export default function SparkleBurst({ triggerKey }: SparkleBurstProps) {
  return (
    <div
      key={triggerKey}
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      aria-hidden
    >
      {PARTICLES.map((particle, i) => {
        const angle = (i / PARTICLES.length) * Math.PI * 2;
        const distance = 70 + (i % 3) * 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
            animate={{ opacity: [0, 1, 0], x, y, scale: [0.4, 1, 0.6] }}
            transition={{ duration: 1.1, delay: i * 0.04, ease: "easeOut" }}
            className="absolute left-1/2 top-1/3 text-xl"
          >
            {particle}
          </motion.span>
        );
      })}
    </div>
  );
}
