"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation, useReducedMotion } from "framer-motion";
import { useGameAudio } from "./AudioProvider";
import IdleSpeechBubble from "./IdleSpeechBubble";
import { getLayer, layerPositionStyle } from "@/data/openingLayout";

const eggsyLayer = getLayer("eggsy");

interface AnimatedEggsyProps {
  /** Flip this to true to play a one-shot "excited" pulse (used on start-click). */
  pulse?: boolean;
  showIdleBubble?: boolean;
  onDismissIdleBubble?: () => void;
}

/**
 * eggsy.png — top:34%, centered, width:74% of <OpeningContent>'s box (not
 * the outer Canvas — see openingLayout.ts) — the single most important
 * element on this screen. Distinct from the post-title Eggsy image shown
 * via GameSlide (public/characters/eggsy/eggsy.png, same file, plain
 * <img> there — no bespoke entrance/idle logic once past the title
 * screen). Position lives on a plain wrapper (safe for translateX(-50%));
 * a nested <motion.div> owns the entrance + idle animation and also hosts
 * the idle speech bubble, so the bubble always stays anchored to Eggsy
 * regardless of where this box sits.
 */
export default function AnimatedEggsy({
  pulse = false,
  showIdleBubble = false,
  onDismissIdleBubble,
}: AnimatedEggsyProps) {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const { playSfx } = useGameAudio();
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      await controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.75, delay: 0.25, ease: "easeOut" },
      });
      if (cancelled) return;
      playSfx("pop");
      if (reduceMotion) return;
      controls.start({
        y: [0, -4, 0],
        rotate: [-0.8, 0.8, -0.8],
        transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
      });
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  // One-shot excited pulse, e.g. right when the start button is pressed.
  useEffect(() => {
    if (!pulse) return;
    controls.start({
      scale: [1, 1.12, 1],
      transition: { duration: 0.25, ease: "easeOut" },
    });
  }, [pulse, controls]);

  const positionStyle = layerPositionStyle(eggsyLayer);

  return (
    <div style={positionStyle} data-opening-layer="eggsy">
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.88 }} animate={controls} className="relative">
        {imageFailed ? (
          <div
            className="flex aspect-square w-full items-center justify-center rounded-full bg-sunny-yolkLight/60 text-6xl"
            aria-hidden
          >
            🥚
          </div>
        ) : (
          <Image
            src={eggsyLayer.src}
            alt={eggsyLayer.alt}
            width={520}
            height={520}
            priority
            sizes={eggsyLayer.width}
            style={{ width: "100%", height: "auto", display: "block" }}
            onError={() => setImageFailed(true)}
          />
        )}

        <AnimatePresence>
          {showIdleBubble && <IdleSpeechBubble onDismiss={() => onDismissIdleBubble?.()} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
