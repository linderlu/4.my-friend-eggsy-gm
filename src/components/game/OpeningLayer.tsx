"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import { layerPositionStyle, type OpeningLayerConfig } from "@/data/openingLayout";

interface OpeningLayerProps {
  layer: OpeningLayerConfig;
}

const ANIMATIONS: Partial<
  Record<OpeningLayerConfig["animate"], { animate: TargetAndTransition; transition: Transition }>
> = {
  sway: {
    animate: { rotate: [-3, 3, -3] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  flutter: {
    animate: { y: [0, -3, 0], x: [0, 5, 0], rotate: [-2, 2, -2] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
  "drift-left": {
    animate: { x: [-14, 14] },
    transition: { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  },
  "drift-right": {
    animate: { x: [14, -14] },
    transition: { duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  },
};

// Next/Image requires numeric width/height even when the real display size
// is fully controlled by CSS (style width:100%/height:auto below) — these
// are just a placeholder aspect box to avoid layout shift before the real
// PNG loads, and are overridden immediately once it does.
const PLACEHOLDER_WIDTH = 400;
const PLACEHOLDER_HEIGHT = 300;

/**
 * Generic renderer for a purely decorative OPENING_LAYOUT entry — position,
 * size, z-index, and animation all come from the config. Position lives on
 * a plain (non-animated) wrapper div so `transform: translateX(-50%)` /
 * static `rotate()` are always safe; a nested <motion.div> owns the
 * transform for any looping animation, so the two never fight over the
 * same CSS property. If the PNG 404s, the layer just quietly disappears.
 */
export default function OpeningLayer({ layer }: OpeningLayerProps) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const preset = !reduceMotion ? ANIMATIONS[layer.animate] : undefined;
  const positionStyle = layerPositionStyle(layer);

  return (
    <div style={positionStyle} aria-hidden={layer.decorative} data-opening-layer={layer.id}>
      <motion.div animate={preset?.animate ?? {}} transition={preset?.transition ?? {}}>
        <Image
          src={layer.src}
          alt={layer.alt}
          width={PLACEHOLDER_WIDTH}
          height={PLACEHOLDER_HEIGHT}
          priority={layer.priority}
          sizes={layer.width}
          style={{ width: "100%", height: "auto", display: "block" }}
          onError={() => setFailed(true)}
        />
      </motion.div>
    </div>
  );
}
