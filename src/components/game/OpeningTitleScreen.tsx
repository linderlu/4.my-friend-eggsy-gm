"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import OpeningBackground from "./OpeningBackground";
import OpeningLayer from "./OpeningLayer";
import AnimatedSun from "./AnimatedSun";
import SparkleField from "./SparkleField";
import IntroSpeechCloud from "./IntroSpeechCloud";
import OpeningContent from "./OpeningContent";
import SoundToggle from "./SoundToggle";
import GameCanvas from "./GameCanvas";
import { useGameAudio } from "./AudioProvider";
import { OPENING_LAYOUT, BESPOKE_LAYER_IDS } from "@/data/openingLayout";

// Everything except the ids rendered by their own dedicated component
// (background, sun, logo, eggsy, start-button, intro-speech-cloud) is
// purely decorative and rendered generically — see OpeningLayer.tsx.
const DECORATIVE_LAYERS = OPENING_LAYOUT.filter((layer) => !BESPOKE_LAYER_IDS.has(layer.id));

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

interface OpeningTitleScreenProps {
  /** Called once the zoom/fade-out transition finishes. */
  onStart: () => void;
}

/**
 * The full "game console title screen". Rendered inside <GameCanvas>, the
 * same fixed-aspect (2:3) frame every later scene uses too (see
 * GameCanvas.tsx) — so the title screen visually hands off into the rest
 * of the game instead of into a differently-framed page. Every
 * background/decorative layer's % position/size comes from
 * src/data/openingLayout.ts relative to that Canvas, so re-skinning the
 * scene is a matter of swapping PNGs and/or editing numbers there, not
 * touching this component. The logo/eggsy/start-button trio is grouped
 * into <OpeningContent>, a smaller fixed-2:3 box centered within the
 * Canvas (GAME_CONTENT_WIDTH), so their relative spacing stays constant
 * regardless of how much the outer Canvas gets cropped — later scenes'
 * Eggsy/dialogue panel size off that same reference box. Rendered by
 * OpeningGame when sceneId === "title", inside the same <AudioProvider>
 * as the rest of the opening, so BGM started here keeps playing once the
 * player moves on.
 */
export default function OpeningTitleScreen({ onStart }: OpeningTitleScreenProps) {
  const { playSfx, fadeOutBgm } = useGameAudio();
  const [showIdleBubble, setShowIdleBubble] = useState(false);
  const [started, setStarted] = useState(false);
  const [zooming, setZooming] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleShownRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    idleTimerRef.current = setTimeout(() => {
      if (!idleShownRef.current && !startedRef.current) {
        idleShownRef.current = true;
        setShowIdleBubble(true);
      }
    }, 3000);
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  async function handleStart() {
    if (startedRef.current) return;
    startedRef.current = true;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setShowIdleBubble(false);
    setStarted(true); // disables the button + triggers Eggsy's pulse

    playSfx("start-click");
    playSfx("sparkle");
    const bgmFadeOut = fadeOutBgm(400);

    await wait(280); // let the button burst + Eggsy pulse play
    setZooming(true);
    await wait(650); // let the screen zoom/fade finish

    await bgmFadeOut; // ensure the bgm is paused & reset before leaving

    onStart();
  }

  return (
    <GameCanvas>
      <motion.div
        animate={zooming ? { scale: 1.08, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <OpeningBackground />

        {DECORATIVE_LAYERS.map((layer) => (
          <OpeningLayer key={layer.id} layer={layer} />
        ))}

        <AnimatedSun />
        <SparkleField />
        <IntroSpeechCloud />

        <OpeningContent
          pulse={started}
          disabled={started}
          showIdleBubble={showIdleBubble}
          onDismissIdleBubble={() => setShowIdleBubble(false)}
          onStart={handleStart}
        />

        <p
          className="absolute whitespace-nowrap font-heading text-sunny-brown"
          style={{
            left: "50%",
            bottom: "1.8%",
            transform: "translateX(-50%)",
            zIndex: 58,
            fontSize: 15,
            letterSpacing: 4,
            opacity: 0.72,
          }}
        >
          SUNNY SIDE UP
        </p>

        {/* left/width/transform (not right:12 alone) — right:12 would
            anchor to Canvas's own right edge, which sits off-screen on
            most devices (Canvas is deliberately wider than the real
            screen — see GameCanvas.tsx's cover-fit crop). 100cqw matches
            the true viewport width, so pr-3 here lands 12px from the
            *real* screen edge regardless of how much wider Canvas is. */}
        <div
          className="absolute flex justify-end pr-3"
          style={{ left: "50%", width: "100cqw", transform: "translateX(-50%)", top: 12, zIndex: 80 }}
        >
          <SoundToggle />
        </div>
      </motion.div>
    </GameCanvas>
  );
}
