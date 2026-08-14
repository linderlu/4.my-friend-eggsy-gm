"use client";

import { useCallback, useEffect, useState } from "react";
import type { OpeningProgress } from "@/types/game";

const STORAGE_KEY = "eggsy-opening-progress";

const DEFAULT_PROGRESS: OpeningProgress = {
  sceneId: "title",
  history: [],
  playerName: null,
  knowsEggsy: null,
  completedSteps: [],
  updatedAt: 0,
};

function readProgress(): OpeningProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<OpeningProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      // Every fresh load/refresh of "/" always starts at the title screen
      // — only playerName/knowsEggsy/completedSteps carry over. The scene
      // position itself is never restored, so a reload can never reopen
      // mid-flow (name-input, a mission step, etc.) at random.
      sceneId: "title",
      history: [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function writeProgress(progress: OpeningProgress) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage may be unavailable (private mode, quota, etc). Fail silently —
    // the game still works within the current session via React state.
  }
}

/**
 * Owns the opening game's mission progress (player name, whether they know
 * Eggsy, completed mission steps), backed by localStorage so that data
 * survives a refresh. Scene *position* is the deliberate exception: every
 * mount (i.e. every load/refresh of "/") always starts at "title" — see
 * readProgress() — so the player never lands back in the middle of a
 * dialogue or mission at random. Pressing Start is what moves off "title";
 * see OpeningTitleScreen's onStart / OpeningGame's goToScene("name-input").
 */
export function useOpeningProgress() {
  const [progress, setProgress] = useState<OpeningProgress>(DEFAULT_PROGRESS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setHydrated(true);
  }, []);

  const update = useCallback(
    (updater: (prev: OpeningProgress) => OpeningProgress) => {
      setProgress((prev) => {
        const next = { ...updater(prev), updatedAt: Date.now() };
        writeProgress(next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => {
    const fresh = { ...DEFAULT_PROGRESS, updatedAt: Date.now() };
    writeProgress(fresh);
    setProgress(fresh);
  }, []);

  return { progress, hydrated, update, reset };
}
