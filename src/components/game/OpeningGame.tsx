"use client";

import { motion } from "framer-motion";
import GameCanvas from "./GameCanvas";
import GameBackground from "./GameBackground";
import GameFlow from "./GameFlow";
import { AudioProvider } from "./AudioProvider";
import OpeningTitleScreen from "./OpeningTitleScreen";
import { useOpeningProgress } from "@/hooks/useOpeningProgress";

/**
 * "이상한 내 친구, 에그시" — entry point.
 *
 * Owns nothing but the top-level split: the title screen (its own
 * hand-built component, see OpeningTitleScreen.tsx) vs. everything after
 * it, which is a slide-template system — see GameFlow.tsx (the
 * renderer/branching logic) and src/data/gameScenes.ts (the actual
 * content). Adding a new post-title scene never touches this file.
 *
 * Wrapped in <AudioProvider> so BGM started by the title screen's
 * start-button sequence keeps playing (same <audio> element, same mute
 * state) once the player moves into name-input and beyond — it's never
 * re-created or restarted mid-opening.
 */
export default function OpeningGame() {
  const { progress, hydrated, update, reset } = useOpeningProgress();

  if (!hydrated) {
    return (
      <AudioProvider>
        <GameCanvas>
          <GameBackground />
          <div className="relative z-10 flex h-full items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              className="text-3xl"
              aria-hidden
            >
              🥚
            </motion.span>
          </div>
        </GameCanvas>
      </AudioProvider>
    );
  }

  if (progress.sceneId === "title") {
    return (
      <AudioProvider>
        <OpeningTitleScreen
          onStart={() =>
            update((prev) => ({
              ...prev,
              sceneId: "name-input",
              history: [...prev.history, prev.sceneId],
            }))
          }
        />
      </AudioProvider>
    );
  }

  return (
    <AudioProvider>
      <GameFlow progress={progress} update={update} reset={reset} />
    </AudioProvider>
  );
}
