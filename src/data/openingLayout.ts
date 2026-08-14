import type { CSSProperties } from "react";

/**
 * The opening title screen renders inside a fixed-aspect (2:3, matching the
 * 1024x1536 source art) Canvas that's centered over the real viewport and
 * scaled with a "cover" fit (max()/aspect-ratio, overflow:hidden) — it may
 * crop left/right or top/bottom on off-ratio screens, but never stretches.
 * See the wrapper in OpeningTitleScreen.tsx. Every background/decorative
 * layer below is position:absolute *relative to that Canvas*, with every
 * number broken out into its own field (top/bottom/left/right, width — all
 * %, translateX, translateY, scale, zIndex) so future tweaks — "태양을
 * 5% 줄여줘", "로고를 15px 위로 올려줘" — are a one-line edit here, never a
 * component change. `width` is a percentage of the Canvas, never vw/vh —
 * the Canvas itself keeps the 2:3 ratio consistent across devices, so no
 * px min/max clamps are needed on top of it.
 *
 * The three ids that make up the title screen's central content group —
 * logo, eggsy, start-button — are the exception: their top/bottom/left/
 * width numbers are percentages of <OpeningContent>'s own box (a smaller,
 * fixed-2:3 box centered within the Canvas), not the outer Canvas. That
 * keeps the logo-to-eggsy gap and eggsy/button overlap constant across
 * devices regardless of how much the outer Canvas itself gets cropped.
 * See OpeningContent.tsx.
 *
 * Purely decorative entries are rendered generically by <OpeningLayer> —
 * no component changes needed for those. A handful of ids (background,
 * sun, logo, eggsy, start-button, intro-speech-cloud) are rendered by
 * dedicated components instead, because they need extra behavior
 * (entrance choreography, sound effects, click handling, a blink loop,
 * overlaid text) — but even those read every number straight from this
 * file.
 */

export type OpeningLayerAnimation = "none" | "sway" | "flutter" | "drift-left" | "drift-right";

export interface OpeningLayerConfig {
  id: string;
  /** public/ path, e.g. "/images/opening/cloud-1.png" */
  src: string;
  alt: string;
  /** true = purely decorative (aria-hidden, no meaningful alt text) */
  decorative: boolean;
  zIndex: number;
  /** Exactly one of top/bottom, and exactly one of left/right. CSS length/percentage strings. */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Preferred width, as a percentage of the Canvas, e.g. "80%". */
  width: string;
  /** Static horizontal offset, e.g. "-50%" for centering off a left:"50%" anchor. */
  translateX?: string;
  /** Static vertical nudge, e.g. "-15px". */
  translateY?: string;
  /** Static uniform scale, default 1. */
  scale?: number;
  /** Static rotation in degrees — only for non-animated layers (camera, polaroid). */
  rotate?: number;
  animate: OpeningLayerAnimation;
  priority?: boolean;
}

const BASE_PATH = "/images/opening";

export const OPENING_LAYOUT: OpeningLayerConfig[] = [
  {
    id: "background",
    src: `${BASE_PATH}/background-sky.png`,
    alt: "",
    decorative: true,
    zIndex: 0,
    top: "0",
    left: "0",
    width: "100%",
    animate: "none",
    priority: true,
  },
  {
    id: "sun",
    src: `${BASE_PATH}/sun.png`,
    alt: "",
    decorative: true,
    zIndex: 10,
    top: "0%",
    right: "0%",
    width: "30%",
    animate: "sway",
  },
  {
    id: "cloud-1",
    src: `${BASE_PATH}/cloud-1.png`,
    alt: "",
    decorative: true,
    zIndex: 15,
    top: "8%",
    left: "-6%",
    width: "31%",
    animate: "drift-left",
  },
  {
    id: "cloud-2",
    src: `${BASE_PATH}/cloud-2.png`,
    alt: "",
    decorative: true,
    zIndex: 15,
    top: "19%",
    right: "-7%",
    width: "26%",
    animate: "drift-right",
  },
  {
    id: "cloud-3",
    src: `${BASE_PATH}/cloud-3.png`,
    alt: "",
    decorative: true,
    zIndex: 15,
    top: "4%",
    left: "38%",
    width: "21%",
    animate: "drift-left",
  },
  {
    id: "bird",
    src: `${BASE_PATH}/bird.png`,
    alt: "",
    decorative: true,
    zIndex: 16,
    top: "16%",
    left: "6%",
    width: "14%",
    animate: "flutter",
  },
  {
    id: "background-city-left",
    src: `${BASE_PATH}/background-city-left.png`,
    alt: "",
    decorative: true,
    zIndex: 18,
    bottom: "-40%",
    left: "-3%",
    width: "120%",
    animate: "none",
  },
  {
    id: "background-city-right",
    src: `${BASE_PATH}/background-city-right.png`,
    alt: "",
    decorative: true,
    zIndex: 18,
    bottom: "0%",
    right: "-40%",
    width: "58%",
    animate: "none",
  },
  {
    id: "intro-speech-cloud",
    src: `${BASE_PATH}/intro-cloud.png`,
    alt: "",
    decorative: true,
    zIndex: 24,
    top: "2%",
    left: "-2%",
    width: "34%",
    animate: "none",
  },
  {
    id: "signpost",
    src: `${BASE_PATH}/signpost.png`,
    alt: "",
    decorative: true,
    zIndex: 35,
    bottom: "18%",
    right: "1%",
    width: "24%",
    animate: "sway",
  },
  {
    id: "subtitle-ribbon",
    src: `${BASE_PATH}/subtitle-ribbon.png`,
    alt: "",
    decorative: true,
    zIndex: 39,
    top: "32%",
    left: "50%",
    translateX: "-50%",
    width: "60%",
    animate: "none",
  },
  {
    id: "logo",
    src: `${BASE_PATH}/logo.png`,
    alt: "이상한 내 친구, 에그시",
    decorative: false,
    zIndex: 40,
    top: "-23%",
    left: "50%",
    translateX: "-50%",
    width: "90%",
    animate: "none", // bespoke entrance/idle handled by OpeningLogo itself
    priority: true,
  },
  {
    id: "eggsy",
    src: `${BASE_PATH}/eggsy.png`,
    alt: "에그시",
    decorative: false,
    zIndex: 45,
    top: "30%",
    left: "50%",
    translateX: "-50%",
    width: "50%",
    animate: "none", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },  
  {
    id: "1",
    src: `${BASE_PATH}/1.png`,
    alt: "1",
    decorative: false,
    zIndex: 45,
    top: "70%",
    left: "15%",
    translateX: "-50%",
    width: "15%",
    animate: "sway", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },
    {
    id: "2",
    src: `${BASE_PATH}/2.png`,
    alt: "2",
    decorative: false,
    zIndex: 45,
    top: "75%",
    left: "25%",
    translateX: "-50%",
    width: "15%",
    animate: "sway", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },
    {
    id: "3",
    src: `${BASE_PATH}/3.png`,
    alt: "3",
    decorative: false,
    zIndex: 45,
    top: "70%",
    left: "35%",
    translateX: "-50%",
    width: "15%",
    animate: "sway", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },
    {
    id: "4",
    src: `${BASE_PATH}/4.png`,
    alt: "4",
    decorative: false,
    zIndex: 45,
    top: "75%",
    left: "45%",
    translateX: "-50%",
    width: "15%",
    animate: "sway", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },
    {
    id: "5",
    src: `${BASE_PATH}/5.png`,
    alt: "5",
    decorative: false,
    zIndex: 45,
    top: "70%",
    left: "55%",
    translateX: "-50%",
    width: "15%",
    animate: "sway", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },
    {
    id: "6",
    src: `${BASE_PATH}/6.png`,
    alt: "6",
    decorative: false,
    zIndex: 45,
    top: "75%",
    left: "65%",
    translateX: "-50%",
    width: "15%",
    animate: "sway", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },
    {
    id: "7",
    src: `${BASE_PATH}/7.png`,
    alt: "7",
    decorative: false,
    zIndex: 45,
    top: "70%",
    left: "75%",
    translateX: "-50%",
    width: "15%",
    animate: "sway", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },
    {
    id: "8",
    src: `${BASE_PATH}/8.png`,
    alt: "8",
    decorative: false,
    zIndex: 45,
    top: "75%",
    left: "85%",
    translateX: "-50%",
    width: "15%",
    animate: "sway", // bespoke entrance/idle handled by AnimatedEggsy itself
    priority: true,
  },
  {
    id: "camera",
    src: `${BASE_PATH}/camera.png`,
    alt: "",
    decorative: true,
    zIndex: 52,
    bottom: "2.5%",
    right: "3%",
    width: "18%",
    rotate: 7,
    animate: "none",
  },
  {
    id: "polaroid",
    src: `${BASE_PATH}/polaroid.png`,
    alt: "",
    decorative: true,
    zIndex: 52,
    bottom: "2.5%",
    left: "3%",
    width: "18%",
    rotate: -8,
    animate: "none",
  },
  {
    id: "bottom-clouds",
    src: `${BASE_PATH}/bottom-clouds.png`,
    alt: "",
    decorative: true,
    zIndex: 55,
    bottom: "-1%",
    left: "0",
    width: "100%",
    animate: "none",
  },
  {
    id: "start-button",
    src: `${BASE_PATH}/start-button.png`,
    alt: "게임 시작하기",
    decorative: false,
    zIndex: 60,
    bottom: "16%",
    left: "50%",
    translateX: "-50%",
    width: "68%",
    animate: "none", // bespoke idle pulse/hover/tap handled by StartGameButton
  },
];

/** Ids rendered by dedicated components instead of the generic <OpeningLayer>. */
export const BESPOKE_LAYER_IDS: ReadonlySet<string> = new Set([
  "background",
  "sun",
  "logo",
  "eggsy",
  "start-button",
  "intro-speech-cloud",
]);

export function getLayer(id: string): OpeningLayerConfig {
  const layer = OPENING_LAYOUT.find((entry) => entry.id === id);
  if (!layer) throw new Error(`Unknown opening layer id: "${id}"`);
  return layer;
}

/**
 * Static (never Framer-animated) absolute-position style for a layer —
 * top/bottom/left/right/width/zIndex plus one combined `transform` built
 * from translateX/translateY/scale/rotate. This is only ever applied to a
 * plain, non-motion wrapper element. Each bespoke/generic renderer nests
 * a separate <motion.div> *inside* that wrapper for entrance/idle
 * animation, so the animated element never has its own position/transform
 * to fight over — Framer owns the inner element's transform completely,
 * this function owns the outer element's transform completely.
 */
export function layerPositionStyle(layer: OpeningLayerConfig): CSSProperties {
  const transformParts: string[] = [];
  if (layer.translateX) transformParts.push(`translateX(${layer.translateX})`);
  if (layer.translateY) transformParts.push(`translateY(${layer.translateY})`);
  if (layer.scale !== undefined && layer.scale !== 1) transformParts.push(`scale(${layer.scale})`);
  if (layer.rotate) transformParts.push(`rotate(${layer.rotate}deg)`);

  return {
    position: "absolute",
    top: layer.top,
    bottom: layer.bottom,
    left: layer.left,
    right: layer.right,
    width: layer.width,
    zIndex: layer.zIndex,
    transform: transformParts.length > 0 ? transformParts.join(" ") : undefined,
  };
}

export interface SparklePosition {
  left: string;
  top: string;
  size: number;
}

// Fixed twinkle positions, expressed as % so they scale with the screen —
// never randomized.
export const SPARKLE_POSITIONS: SparklePosition[] = [
  { left: "8%", top: "8%", size: 14 },
  { left: "84%", top: "6%", size: 9 },
  { left: "90%", top: "26%", size: 15 },
  { left: "20%", top: "38%", size: 10 },
  { left: "78%", top: "43%", size: 8 },
  { left: "5%", top: "50%", size: 7 },
  { left: "87%", top: "57%", size: 10 },
  { left: "15%", top: "66%", size: 9 },
];
