"use client";

import type { ReactNode } from "react";

interface GameCanvasProps {
  children: ReactNode;
}

// 2:3 (matching the 1024x1536 source art) is the design reference ratio —
// shared by every scene, opening or not, so the "camera" never changes
// shape as the player moves through the game.
const CANVAS_ASPECT_W = 2;
const CANVAS_ASPECT_H = 3;

/**
 * The fixed-aspect (2:3) game "Canvas", cropped to cover its wrapper —
 * shared by OpeningTitleScreen (the title screen) and OpeningGame (every
 * scene after it), so the whole opening-to-quiz flow reads as one
 * continuous game world instead of a title screen handing off to a
 * regular web page. See OpeningTitleScreen.tsx's original inline version
 * for the full container-query-unit rationale (cqw/cqh instead of
 * vw/dvh, because this lives inside the app shell's `max-w-[430px]
 * mx-auto` column).
 */
export default function GameCanvas({ children }: GameCanvasProps) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100%", height: "100dvh", containerType: "size" }}
    >
      <div
        className="absolute overflow-hidden"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          aspectRatio: `${CANVAS_ASPECT_W} / ${CANVAS_ASPECT_H}`,
          width: `max(100cqw, calc(100cqh * ${CANVAS_ASPECT_W} / ${CANVAS_ASPECT_H}))`,
          height: `max(100cqh, calc(100cqw * ${CANVAS_ASPECT_H} / ${CANVAS_ASPECT_W}))`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Same reference box <OpeningContent> uses — every post-title scene's
 * central content group (Eggsy + dialogue panel) sizes off this exact
 * width, so nothing "jumps" in scale when the title screen hands off. */
export const GAME_CONTENT_WIDTH = "min(92cqw, 620px)";
