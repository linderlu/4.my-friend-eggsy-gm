import type { SceneId } from "@/types/game";
import { chapterIntroScenes } from "./chapters/chapter-01-intro";
import { chapterMissionScenes } from "./chapters/chapter-02-mission";
import { chapterEndingScenes } from "./chapters/chapter-03-ending";

/**
 * All narrative + puzzle content for the opening lives here as plain
 * data, split into one file per chapter under src/data/chapters/ (see
 * below). Every scene after the title screen renders through the exact
 * same <GameSlide> template (see GameSlide.tsx / GameFlow.tsx) — adding a
 * new scene is adding one object to a chapter file, never a new
 * component or new JSX. Adding a whole new chapter is a new file under
 * chapters/ plus one line in the `gameScenes` merge below.
 */

export type InteractionType =
  | "text-input"
  | "number-input"
  | "text-code"
  | "four-digit"
  | "choice"
  | "confirm"
  | "message";

/** What *kind* of beat a scene is — purely descriptive/organizational for
 * now (doesn't change rendering; GameSlide picks UI from interactionType
 * alone). Lets you filter/reason about the story ("show me every quiz")
 * without parsing interactionType + content together. */
export type SceneType =
  | "intro"
  | "dialogue"
  | "quiz"
  | "reward"
  | "photo"
  | "ending"
  | "map"
  | "video";

/** How a submitted answer is checked — see src/utils/validateAnswer.ts.
 * Defaults to "exact" when omitted. */
export type AnswerValidator = "exact" | "contains" | "multiple";

export interface GameScene {
  id: SceneId;
  /** What kind of beat this is — organizational only, see SceneType. */
  sceneType?: SceneType;
  /** public/ path. Omit for a text-only slide — the layout doesn't break. */
  image?: string;
  imageAlt?: string;
  title?: string;
  /** Main body copy. Any "{name}" token is swapped for the player's saved
   * name at render time (see GameFlow.tsx). */
  body?: string;
  interactionType: InteractionType;
  placeholder?: string;
  primaryButtonLabel?: string;
  /** Shown as the hint-toggle button's label (four-digit only). */
  secondaryButtonLabel?: string;
  showHint?: boolean;
  showSkip?: boolean;
  hint?: string;
  /** Option labels for `interactionType: "choice"`. */
  choices?: string[];
  /** four-digit / number-input answer check against `correctAnswer` (or
   * `acceptedAnswers` for "multiple") — see src/utils/validateAnswer.ts.
   * Defaults to "exact". */
  validator?: AnswerValidator;
  correctAnswer?: string;
  /** Any one of these counts as correct when `validator: "multiple"`. */
  acceptedAnswers?: string[];
  /** Digit-box count for `interactionType: "four-digit"` — defaults to 4. */
  digitCount?: number;
  failureMessage?: string;
  successMessage?: string;
  /** Scene to advance to: after confirm/message/text-input, or a correct
   * four-digit/number-input answer. Omit to make this a dead end.
   * When `arMissionTargetId` is set, `next` instead means "where to go
   * once that AR mission completes" — see below. */
  next?: SceneId;
  /** Scene the skip button jumps to (four-digit only). */
  skipTo?: SceneId;
  /** postcards.json `id` this scene's AR mission looks for. When set, a
   * "message"/"confirm" scene's primary button opens the full-screen AR
   * mission overlay (see ArMissionOverlay.tsx) instead of navigating
   * straight to `next` — `next` only fires once the player finds and taps
   * that postcard's character in AR. Changing this one number is the only
   * thing needed to point a future scene at a different postcard mission. */
  arMissionTargetId?: number;
  /** Scene to advance to when the player skips this AR mission instead of
   * completing it (only meaningful alongside `arMissionTargetId`). Falls
   * back to `next` if omitted. */
  arMissionSkipNext?: SceneId;
}

/** One chapter = one file under chapters/, one array here. Order matters
 * only in that it's what the progress dots below are numbered against —
 * scene *flow* is entirely driven by each scene's own `next`/`skipTo`/
 * CHOICE_TRANSITIONS, not by this array's order. */
export const gameScenes: GameScene[] = [
  ...chapterIntroScenes,
  ...chapterMissionScenes,
  ...chapterEndingScenes,
];

/** Only scenes whose `choice` selection branches to a *different* next
 * scene per option need an entry here — everything else just uses
 * `next`. Adding a new branching choice scene is still one data entry,
 * never a code change. */
export const CHOICE_TRANSITIONS: Partial<Record<SceneId, Record<string, SceneId>>> = {
  "ceo-intro": { 있음: "known-yes", 없음: "known-no" },
};

export function getGameScene(id: SceneId): GameScene | undefined {
  return gameScenes.find((scene) => scene.id === id);
}

const DOT_INDEX: Partial<Record<SceneId, number>> = {
  "name-input": 0,
  "ceo-intro": 1,
  "known-yes": 2,
  "known-no": 2,
  "gift-explain": 3,
  "role-intro": 4,
  "mission-step-1": 5,
  "step1-success": 6,
  "mission-step-2": 7,
  "step2-success": 8,
  "mission-step-2-ar": 9,
  "mission-step-2-ar-skip": 9,
  "mission-step-3": 10,
  "mission-step-4": 11,
  "mission-step-5": 12,
  "coming-soon": 13,
};

export const GAME_DOT_COUNT = 8;

export function getSceneDotIndex(id: SceneId): number {
  return DOT_INDEX[id] ?? 0;
}
