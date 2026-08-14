"use client";

import type { CSSProperties } from "react";
import OpeningLogo from "./OpeningLogo";
import AnimatedEggsy from "./AnimatedEggsy";
import StartGameButton from "./StartGameButton";

interface OpeningContentProps {
  pulse: boolean;
  disabled: boolean;
  showIdleBubble: boolean;
  onDismissIdleBubble: () => void;
  onStart: () => void;
}

const CONTENT_STYLE: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  // cqw, not vw — this box sits inside OpeningTitleScreen's Canvas, which
  // is itself sized off the wrapper's own box (container-query units), not
  // the true browser viewport. Using vw here would size this box off the
  // real window again and undo that, drifting off-center on any desktop
  // window wider than the app shell's max-w-[430px] column.
  width: "min(92cqw, 620px)",
  aspectRatio: "2 / 3",
  // 56, not 40 — this element's own z-index (being position:absolute)
  // opens a *new* stacking context, so children's z-indices (start-button
  // is 60) only rank against each other inside this box, never against
  // Canvas-level siblings. The highest decorative Canvas sibling is
  // bottom-clouds at 55, so anything lower than that here would let
  // bottom-clouds paint over (and steal clicks from) the button — 56 keeps
  // this whole group above every decorative layer, while staying under
  // the always-on-top subtitle text (58) and sound toggle (80).
  zIndex: 56,
  pointerEvents: "none",
};

/**
 * Groups logo + eggsy + start-button into a single centered box, sized
 * independently of the outer background Canvas (see OpeningTitleScreen.tsx)
 * — so their relative spacing (logo-to-eggsy gap, eggsy/button overlap)
 * stays constant across devices even when the Canvas itself gets cropped
 * differently per screen ratio. Each child's top/bottom/left/width in
 * openingLayout.ts is a percentage of *this* box, not the outer Canvas.
 *
 * This whole box is pointer-events:none (it's mostly decorative/idle
 * animation), except the start button, which re-enables pointer-events on
 * its own wrapper so it stays clickable.
 */
export default function OpeningContent({
  pulse,
  disabled,
  showIdleBubble,
  onDismissIdleBubble,
  onStart,
}: OpeningContentProps) {
  return (
    <div style={CONTENT_STYLE}>
      <OpeningLogo />
      <AnimatedEggsy
        pulse={pulse}
        showIdleBubble={showIdleBubble}
        onDismissIdleBubble={onDismissIdleBubble}
      />
      <div className="pointer-events-auto">
        <StartGameButton onClick={onStart} disabled={disabled} />
      </div>
    </div>
  );
}
