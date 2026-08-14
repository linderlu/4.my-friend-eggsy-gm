"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { gameTheme } from "@/data/gameTheme";

interface GameButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
}

const BURST_PARTICLES = Array.from({ length: 6 });

/**
 * The one action-button style used everywhere after the title screen —
 * same pill shape, same sunny-yolk gradient + idle pulse + tap-scale +
 * sparkle burst as the opening's start-button.png, just rendered in CSS
 * (rather than that exact PNG) since every scene needs its own label
 * ("다음", "제출하기", ...) baked into the button, not "시작하기".
 */
export default function GameButton({
  label,
  onClick,
  disabled,
  variant = "primary",
}: GameButtonProps) {
  const [burstKey, setBurstKey] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (disabled) return;
    if (variant === "primary") setBurstKey(Date.now());
    onClick();
  }

  const idlePulse =
    disabled || reduceMotion || variant !== "primary" ? { scale: 1 } : { scale: [1, 1.03, 1] };

  const styles = variant === "primary" ? gameTheme.buttonPrimary : gameTheme.buttonGhost;

  return (
    <div className="relative">
      {burstKey !== null && (
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
          {BURST_PARTICLES.map((_, index) => {
            const angle = (index / BURST_PARTICLES.length) * Math.PI * 2;
            const distance = 44 + (index % 3) * 10;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            return (
              <motion.span
                key={`${burstKey}-${index}`}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 0], x, y, scale: [0.4, 1, 0.5] }}
                transition={{ duration: 0.7, delay: index * 0.03, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 text-sm"
              >
                ✨
              </motion.span>
            );
          })}
        </div>
      )}

      <motion.button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        animate={idlePulse}
        transition={{ duration: 1.8, repeat: disabled || reduceMotion || variant !== "primary" ? 0 : Infinity, ease: "easeInOut" }}
        whileTap={disabled ? undefined : { scale: 0.96 }}
        className={`${gameTheme.buttonBase} ${styles}`}
      >
        {label}
      </motion.button>
    </div>
  );
}
