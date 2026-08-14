"use client";

import OpeningBackground from "./OpeningBackground";
import OpeningLayer from "./OpeningLayer";
import { getLayer } from "@/data/openingLayout";

// Exactly the 4 layers the opening screen is built on — sky, both city
// silhouettes, and the ground-level clouds. Every scene after the title
// screen reuses these unchanged (same positions/sizes, from the same
// openingLayout.ts entries) so the world never resets or re-skins as the
// player moves from the title screen into dialogue/missions — it's meant
// to read as one continuous place, not a title screen handing off to a
// separate app. Deliberately excludes the title-only flourishes (sun,
// drifting clouds, birds, signpost, subtitle ribbon) — those are part of
// the title screen's own composition, not the shared world backdrop.
const PERSISTENT_LAYER_IDS = [
  "background-city-left",
  "background-city-right",
  "bottom-clouds",
] as const;

/**
 * `isolate` (a new stacking context) keeps these layers' own z-index
 * values (bottom-clouds is 55, from openingLayout.ts) from ever ranking
 * above the game UI on top of them (top bar z-20, content z-10, etc.) —
 * without it, 55 would otherwise beat those and the ground art would
 * paint over the UI.
 */
export default function GameBackground() {
  return (
    <div className="isolate">
      <OpeningBackground />
      {/* The sky stays the same vivid, crisp blue as the opening screen,
          but the buildings/ground below it should stay quiet, atmospheric
          detail — never compete with the UI card on top. A slight blur
          plus a soft white wash over just that lower band mutes them
          without touching the sky. */}
      <div className="blur-[4px]">
        {PERSISTENT_LAYER_IDS.map((id) => (
          <OpeningLayer key={id} layer={getLayer(id)} />
        ))}
      </div>
      <div
        className="absolute inset-x-0 bottom-0"
        style={{ top: "38%", background: "rgba(255,255,255,0.5)", zIndex: 90 }}
        aria-hidden
      />
    </div>
  );
}
