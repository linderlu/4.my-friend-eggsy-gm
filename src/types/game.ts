/**
 * Shared types for "이상한 내 친구, 에그시" opening game.
 *
 * Scene *content* (image/text/interaction) lives entirely in
 * src/data/gameScenes.ts, not here — this file only has the id enum and
 * what gets persisted to localStorage.
 */

// Every screen the opening flow can be in.
export type SceneId =
  | "title"
  | "name-input"
  | "ceo-intro"
  | "known-yes"
  | "known-no"
  | "gift-explain"
  | "role-intro"
  | "mission-step-1"
  | "step1-success"
  | "mission-step-2"
  | "step2-success"
  | "mission-step-2-ar"
  | "mission-step-2-ar-skip"
  | "mission-step-3"
  | "mission-step-4"  
  | "mission-step-5"
  | "mission-step-6"
  | "coming-soon";

// What gets persisted to localStorage. Note: sceneId/history are written
// here but deliberately never read back on load — see readProgress() in
// useOpeningProgress.ts, which always forces sceneId back to "title".
export interface OpeningProgress {
  sceneId: SceneId;
  history: SceneId[];
  playerName: string | null;
  /** Whether the player said they already knew Eggsy (#2 choice). */
  knowsEggsy: "yes" | "no" | null;
  completedSteps: string[];
  updatedAt: number;
}
