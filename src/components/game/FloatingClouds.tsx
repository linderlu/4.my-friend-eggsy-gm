"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/** Layer 2 — cloud1.png / cloud2.png drifting slowly in opposite directions. */
export default function FloatingClouds() {
  const reduceMotion = useReducedMotion();
  const [cloud1Failed, setCloud1Failed] = useState(false);
  const [cloud2Failed, setCloud2Failed] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden>
      {!cloud1Failed && (
        <motion.div
          className="opening-cloud-1 absolute left-[-8%] top-[12%] aspect-[2/1]"
          animate={reduceMotion ? { x: 0 } : { x: [-30, 30] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <Image
            src="/images/opening/cloud1.png"
            alt=""
            fill
            sizes="(max-width: 430px) 34vw, 260px"
            className="object-contain"
            onError={() => setCloud1Failed(true)}
          />
        </motion.div>
      )}

      {!cloud2Failed && (
        <motion.div
          className="opening-cloud-2 absolute right-[-10%] top-[24%] aspect-[2/1]"
          animate={reduceMotion ? { x: 0 } : { x: [25, -25] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          <Image
            src="/images/opening/cloud2.png"
            alt=""
            fill
            sizes="(max-width: 430px) 26vw, 220px"
            className="object-contain"
            onError={() => setCloud2Failed(true)}
          />
        </motion.div>
      )}
    </div>
  );
}
