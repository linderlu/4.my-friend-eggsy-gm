"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SPARKLE_POSITIONS } from "@/data/openingLayout";

/** Twinkling stars at fixed %-based positions — never randomized. */
export default function SparkleField() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0" style={{ zIndex: 15 }} aria-hidden>
      {SPARKLE_POSITIONS.map((star, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-sunny-yolkLight"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{
            duration: 2.6 + (index % 4) * 0.3,
            delay: index * 0.25,
            repeat: reduceMotion ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
