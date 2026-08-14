"use client";

import { useGameAudio } from "./AudioProvider";

interface SoundToggleProps {
  className?: string;
}

/** Small 🔊/🔇 toggle — mute state is shared (and persisted) via AudioProvider. */
export default function SoundToggle({ className = "" }: SoundToggleProps) {
  const { muted, toggleMuted } = useGameAudio();

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={muted ? "소리 켜기" : "소리 끄기"}
      aria-pressed={muted}
      className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-lg shadow-sunny ${className}`}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
