"use client";

import { useState } from "react";
import Image from "next/image";
import { getLayer } from "@/data/openingLayout";

const backgroundLayer = getLayer("background");

/**
 * Fills the whole screen (object-cover, min-height: 100dvh via the parent
 * container). Swap background-sky.png to change the whole scene (sky,
 * distant mountains, buildings, hanok, trees, flowers, ground can all live
 * in this one image) — nothing else needs to change. The sky gradient
 * underneath is the permanent fallback: it's always rendered first, so if
 * the PNG is missing (or fails to load) the screen still looks
 * intentional instead of breaking.
 */
export default function OpeningBackground() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="absolute inset-0" style={{ zIndex: backgroundLayer.zIndex }} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-sunny-skyLight via-sunny-white to-sunny-cream" />
      {!imageFailed && (
        <Image
          src={backgroundLayer.src}
          alt=""
          fill
          priority
          sizes="(min-width: 430px) 430px, 100vw"
          className="object-cover object-center"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
