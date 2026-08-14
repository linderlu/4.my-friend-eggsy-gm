"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { getLayer, layerPositionStyle } from "@/data/openingLayout";

const logoLayer = getLayer("logo");

/**
 * logo.png — top:0%, centered, width:82% of <OpeningContent>'s box (not
 * the outer Canvas — see openingLayout.ts). Position lives on a plain
 * wrapper (safe for translateX(-50%)); a nested <motion.div> owns the
 * entrance + idle-bob animation.
 */
export default function OpeningLogo() {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      await controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });
      if (cancelled || reduceMotion) return;
      controls.start({
        y: [0, -2, 0],
        transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
      });
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls]);

  const positionStyle = layerPositionStyle(logoLayer);

  return (
    <div style={positionStyle} data-opening-layer="logo">
      <motion.div initial={{ opacity: 0, y: -25, scale: 0.88 }} animate={controls}>
        {imageFailed ? (
          <div className="flex flex-col items-center justify-center text-center leading-tight">
            <span className="font-heading text-2xl text-sunny-brown">이상한 내 친구,</span>
            <span className="font-heading text-2xl text-sunny-coral">에그시</span>
          </div>
        ) : (
          <Image
            src={logoLayer.src}
            alt={logoLayer.alt}
            width={480}
            height={200}
            priority
            sizes={logoLayer.width}
            style={{ width: "100%", height: "auto", display: "block" }}
            onError={() => setImageFailed(true)}
          />
        )}
      </motion.div>
    </div>
  );
}
