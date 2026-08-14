"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getLayer, layerPositionStyle } from "@/data/openingLayout";

interface StartGameButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const BURST_PARTICLES = Array.from({ length: 7 });
const buttonLayer = getLayer("start-button");

/**
 * start-button.png — bottom:3%, centered, width:68% of <OpeningContent>'s
 * box (not the outer Canvas — see openingLayout.ts). Intentionally
 * overlaps the bottom of Eggsy's body per the reference composition.
 * <OpeningContent> is pointer-events:none, so its direct wrapper there
 * re-enables pointer-events:auto for this button specifically. Position
 * lives on a plain wrapper; only the inner <motion.button> is
 * Framer-animated (scale only — no x/y), so there's nothing to conflict
 * with the wrapper's translateX(-50%) centering.
 */
export default function StartGameButton({ onClick, disabled = false }: StartGameButtonProps) {
  const [burstKey, setBurstKey] = useState<number | null>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  function handleClick() {
    if (disabled) return;
    setBurstKey(Date.now());
    onClick();
  }

  const idlePulse = disabled || reduceMotion ? { scale: 1 } : { scale: [1, 1.035, 1] };
  const positionStyle = layerPositionStyle(buttonLayer);

  return (
    <div style={positionStyle} data-opening-layer="start-button">
      <div className="relative">
        {burstKey !== null && (
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
            {BURST_PARTICLES.map((_, index) => {
              const angle = (index / BURST_PARTICLES.length) * Math.PI * 2;
              const distance = 60 + (index % 3) * 14;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              return (
                <motion.span
                  key={`${burstKey}-${index}`}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0], x, y, scale: [0.4, 1, 0.5] }}
                  transition={{ duration: 0.9, delay: index * 0.03, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 text-base"
                >
                  ✨
                </motion.span>
              );
            })}
          </div>
        )}

        <motion.button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          aria-label="게임 시작하기"
          animate={idlePulse}
          transition={{ duration: 1.8, repeat: disabled || reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
          whileHover={disabled ? undefined : { scale: 1.06 }}
          whileTap={disabled ? undefined : { scale: 0.95 }}
          className="relative block w-full rounded-full outline-none focus-visible:ring-4 focus-visible:ring-sunny-coral/60 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {imageFailed ? (
            <span className="flex w-full items-center justify-center rounded-full bg-sunny-yolk py-4 font-heading text-lg text-sunny-brown shadow-sunny">
              시작하기
            </span>
          ) : (
            <Image
              src={buttonLayer.src}
              alt=""
              width={420}
              height={160}
              sizes={buttonLayer.width}
              style={{ width: "100%", height: "auto", display: "block" }}
              onError={() => setImageFailed(true)}
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}
