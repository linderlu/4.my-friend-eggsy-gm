"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getLayer, layerPositionStyle } from "@/data/openingLayout";

const sunLayer = getLayer("sun");

/**
 * sun.png, top-right, intentionally cropped by the screen edge
 * (top:-2%, right:-6%). Slow ±1.5deg rotation. If sun.png hasn't been
 * placed yet (or fails to load), falls back to a hand-drawn circle with a
 * blinking face at the same position/size.
 */
export default function AnimatedSun() {
  const reduceMotion = useReducedMotion();
  const [blink, setBlink] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const blinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setBlink(true);
      blinkTimeoutRef.current = setTimeout(() => setBlink(false), 160);
    }, 4200);
    return () => {
      clearInterval(interval);
      if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
    };
  }, [reduceMotion]);

  const positionStyle = layerPositionStyle(sunLayer);

  return (
    <div style={positionStyle} aria-hidden data-opening-layer="sun">
      <motion.div
        className="aspect-square"
        animate={reduceMotion ? { rotate: 0 } : { rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4.5, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
      >
        {!imageFailed ? (
          <Image
            src={sunLayer.src}
            alt=""
            width={190}
            height={190}
            sizes={sunLayer.width}
            style={{ width: "100%", height: "auto", display: "block" }}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="relative h-full w-full rounded-full bg-sunny-yolk shadow-sunny">
            <div className="absolute inset-0 flex items-center justify-center gap-3">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-sunny-brown transition-transform duration-100 ${
                  blink ? "scale-y-[0.1]" : "scale-y-100"
                }`}
              />
              <span
                className={`h-1.5 w-1.5 rounded-full bg-sunny-brown transition-transform duration-100 ${
                  blink ? "scale-y-[0.1]" : "scale-y-100"
                }`}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
