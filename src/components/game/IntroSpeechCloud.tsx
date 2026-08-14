"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getLayer, layerPositionStyle } from "@/data/openingLayout";

const cloudLayer = getLayer("intro-speech-cloud");

/**
 * Always-visible top-left speech cloud (intro-cloud.png) with the text
 * baked in as HTML rather than assumed to be part of the PNG, per spec.
 * This is NOT the 3-second idle bubble — see IdleSpeechBubble, which is a
 * separate element anchored to Eggsy and only shown after inactivity.
 */
export default function IntroSpeechCloud() {
  const [imageFailed, setImageFailed] = useState(false);
  const positionStyle = layerPositionStyle(cloudLayer);

  return (
    <div style={positionStyle} data-opening-layer="intro-speech-cloud">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="relative flex aspect-[5/4] items-center justify-center"
      >
        {!imageFailed ? (
          <Image
            src={cloudLayer.src}
            alt=""
            width={0}
            height={0}
            sizes={cloudLayer.width}
            style={{ width: "100%", height: "auto", display: "block" }}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="sunny-card absolute inset-0 rounded-2xl bg-white/90 shadow-sunny" aria-hidden />
        )}
        
      </motion.div>
    </div>
  );
}
