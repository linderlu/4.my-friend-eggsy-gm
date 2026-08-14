"use client";

import type { MouseEvent } from "react";

interface GameTopBarProps {
  showBack: boolean;
  onBack: () => void;
  onReset: () => void;
}

/** Back button (left, hidden on the title screen) + a small dev "restart" (right). */
export default function GameTopBar({ showBack, onBack, onReset }: GameTopBarProps) {
  function handleBack(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onBack();
  }

  function handleReset(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (typeof window === "undefined" || window.confirm("정말 처음부터 다시 시작할까요?")) {
      onReset();
    }
  }

  return (
    // left/width/transform (not inset-x-0) — this bar sits inside
    // GameCanvas, which is deliberately wider than the real screen on
    // most devices (cover-fit crop, see GameCanvas.tsx). inset-x-0 would
    // anchor to *Canvas's* edges, pushing these buttons off the visible
    // screen; 100cqw is the real viewport width, so this box matches the
    // screen exactly regardless of how much wider the Canvas itself is.
    <div
      className="absolute top-0 z-20 flex items-center justify-between px-3 pt-3"
      style={{ left: "50%", width: "100cqw", transform: "translateX(-50%)" }}
    >
      <div>
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로 가기"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-sunny-brown shadow-sunny"
          >
            ←
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={handleReset}
        className="rounded-full px-2 py-1 text-[11px] text-sunny-brownLight/70 hover:text-sunny-brownLight hover:underline"
      >
        처음부터
      </button>
    </div>
  );
}
