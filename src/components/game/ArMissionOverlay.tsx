"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ArMissionOverlayProps {
  /** postcards.json `id` this mission should recognize — the only thing
   * that ever needs to change to point a future mission at a different
   * postcard (see arMissionTargetId on GameScene). */
  missionTargetId: number;
  /** Player found + tapped the mission's character in AR. */
  onComplete: () => void;
  /** Player backed out without completing the mission. */
  onClose: () => void;
  /** Player confirmed "이번만 스킵" inside the AR overlay's own confirm
   * dialog — distinct from onClose: this should still advance the story
   * (via arMissionSkipNext), just without the success beats. */
  onSkip: () => void;
}

/**
 * Full-screen AR mission overlay, portaled straight to document.body so it
 * always covers the real viewport regardless of GameCanvas's transformed
 * (translate) ancestor — a `position: fixed` element nested inside a
 * transformed ancestor is fixed *to that ancestor*, not the viewport.
 *
 * Renders /ar/mission.html (a page dedicated to this in-game mission —
 * separate from /ar/index.html, which stays untouched) in an iframe.
 * Unmounting this component (done by the parent on close/complete) tears
 * the iframe's whole document down, which is what actually resets the
 * camera stream / audio / AR target state for next time — there is no
 * separate manual "reset" step to keep in sync.
 */
export default function ArMissionOverlay({ missionTargetId, onComplete, onClose, onSkip }: ArMissionOverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "ar-mission-complete") {
        onComplete();
      } else if (event.data?.type === "ar-mission-skip") {
        onSkip();
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onComplete, onSkip]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-black">
      <button
        type="button"
        onClick={onClose}
        aria-label="AR 미션 닫기"
        className="absolute z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-lg text-white"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 12px)", left: "calc(env(safe-area-inset-left, 0px) + 12px)" }}
      >
        ✕
      </button>

      <iframe
        src={`/ar/mission.html?missionTargetId=${missionTargetId}`}
        title="에글로 아저씨 찾기 - AR 미션"
        allow="camera; microphone; autoplay; fullscreen; accelerometer; gyroscope; magnetometer"
        className="h-full w-full border-0"
      />
    </div>,
    document.body
  );
}
