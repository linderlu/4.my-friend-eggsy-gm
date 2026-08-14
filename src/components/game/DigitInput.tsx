"use client";

import { useRef } from "react";
import type { ChangeEvent, ClipboardEvent, KeyboardEvent, MouseEvent } from "react";
import { gameTheme } from "@/data/gameTheme";

interface DigitInputProps {
  length: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/** Segmented "□ □ □ □" numeric answer boxes with auto-advance focus and
 * paste support (pasting "5387" anywhere in the row fills every box). */
export default function DigitInput({ length, value, onChange, disabled }: DigitInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function setDigit(index: number, char: string) {
    const next = digits.slice();
    next[index] = char;
    onChange(next.join(""));
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const onlyDigits = event.target.value.replace(/[^0-9]/g, "");
    const char = onlyDigits.slice(-1);
    setDigit(index, char);
    if (char && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    if (!pasted) return;
    event.preventDefault();
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  }

  function stop(event: MouseEvent) {
    event.stopPropagation();
  }

  return (
    <div className="flex justify-center gap-2" onClick={stop}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={digit}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          disabled={disabled}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          aria-label={`정답 ${index + 1}번째 자리`}
          className={gameTheme.digitBox}
        />
      ))}
    </div>
  );
}
