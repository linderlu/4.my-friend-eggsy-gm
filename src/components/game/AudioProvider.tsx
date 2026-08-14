"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type SfxName = "start-click" | "pop" | "sparkle";

interface GameAudioContextValue {
  muted: boolean;
  toggleMuted: () => void;
  playSfx: (name: SfxName) => void;
  fadeOutBgm: (durationMs?: number) => Promise<void>;
}

const SFX_SRC: Record<SfxName, string> = {
  "start-click": "/sounds/start-click.mp3",
  pop: "/sounds/pop.mp3",
  sparkle: "/sounds/sparkle.mp3",
};
const BGM_SRC = "/sounds/opening-bgm.mp3";
const MUTE_STORAGE_KEY = "eggsy-audio-muted";
const SFX_VOLUME = 0.35;
const BGM_VOLUME = 0.25;
const BGM_FADE_OUT_MS = 400;

const GameAudioContext = createContext<GameAudioContextValue | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const bgmStartedRef = useRef(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(MUTE_STORAGE_KEY);
      if (stored === "true") setMuted(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (bgmRef.current) bgmRef.current.muted = muted;
  }, [muted]);

  // Prepare the bgm element up front, but don't play it yet — browsers
  // block audio.play() until a user gesture, so we wait for the first
  // pointerdown anywhere on the page and start it there instead.
  useEffect(() => {
    const audio = new Audio(BGM_SRC);
    audio.loop = true;
    audio.volume = BGM_VOLUME;
    audio.muted = muted;
    bgmRef.current = audio;

    const startBgmOnFirstInteraction = async () => {
      if (bgmStartedRef.current) return;
      bgmStartedRef.current = true;
      try {
        audio.volume = BGM_VOLUME;
        audio.loop = true;
        await audio.play();
      } catch (error) {
        console.error("Opening BGM play failed:", error);
        bgmStartedRef.current = false;
      }
    };

    document.addEventListener("pointerdown", startBgmOnFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("pointerdown", startBgmOnFirstInteraction);
      audio.pause();
      audio.src = "";
      if (bgmRef.current === audio) bgmRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(MUTE_STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const playSfx = useCallback(
    (name: SfxName) => {
      if (muted) return;
      try {
        const audio = new Audio(SFX_SRC[name]);
        audio.volume = SFX_VOLUME;
        audio.play().catch(() => {});
      } catch {
        /* ignore */
      }
    },
    [muted]
  );

  const fadeOutBgm = useCallback((durationMs: number = BGM_FADE_OUT_MS) => {
    return new Promise<void>((resolve) => {
      const audio = bgmRef.current;
      if (!audio) {
        resolve();
        return;
      }
      const startVolume = audio.volume;
      const startTime = performance.now();

      function step(now: number) {
        if (!audio) {
          resolve();
          return;
        }
        const progress = Math.min((now - startTime) / durationMs, 1);
        audio.volume = startVolume * (1 - progress);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          audio.pause();
          audio.currentTime = 0;
          resolve();
        }
      }

      requestAnimationFrame(step);
    });
  }, []);

  return (
    <GameAudioContext.Provider value={{ muted, toggleMuted, playSfx, fadeOutBgm }}>
      {children}
    </GameAudioContext.Provider>
  );
}

export function useGameAudio(): GameAudioContextValue {
  const ctx = useContext(GameAudioContext);
  if (!ctx) throw new Error("useGameAudio must be used within an <AudioProvider>");
  return ctx;
}
