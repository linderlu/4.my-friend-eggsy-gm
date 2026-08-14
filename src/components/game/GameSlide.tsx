"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { KeyboardEvent } from "react";
import GameButton from "./GameButton";
import DigitInput from "./DigitInput";
import { gameTheme } from "@/data/gameTheme";
import type { InteractionType } from "@/data/gameScenes";

export interface GameSlideProps {
  image?: string;
  imageAlt?: string;
  title?: string;
  body?: string;
  interactionType: InteractionType;
  placeholder?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  showHint?: boolean;
  hint?: string;
  showSkip?: boolean;
  choices?: string[];
  digitCount?: number;
  /** Result of the *last* submit attempt, for four-digit/number-input —
   * owned by the flow controller (it's the one that knows the answer). */
  feedback?: "idle" | "success" | "fail";
  failureMessage?: string;
  successMessage?: string;
  onSubmit?: (value?: string) => void;
  onHint?: () => void;
  onSkip?: () => void;
}

/**
 * The one template every post-opening scene renders through — same card,
 * same image slot, same text treatment, same button/input language.
 * Which interaction UI shows is driven entirely by `interactionType`; a
 * new scene never means a new component, just a new entry in
 * src/data/gameScenes.ts. See GameFlow.tsx for the renderer that looks a
 * scene up and passes its fields straight in as props.
 */
export default function GameSlide({
  image,
  imageAlt = "",
  title,
  body,
  interactionType,
  placeholder,
  primaryButtonLabel,
  secondaryButtonLabel,
  showHint,
  hint,
  showSkip,
  choices,
  digitCount = 4,
  feedback = "idle",
  failureMessage,
  successMessage,
  onSubmit,
  onHint,
  onSkip,
}: GameSlideProps) {
  const [textValue, setTextValue] = useState("");
  const [digits, setDigits] = useState("");
  const [hintOpen, setHintOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  // Mirrors the `feedback` prop, but also gets locally cleared the moment
  // the player edits the digits again after a wrong answer — otherwise
  // "다시 생각해봐" would sit there stale while they're already retyping.
  const [localFeedback, setLocalFeedback] = useState(feedback);

  useEffect(() => {
    setLocalFeedback(feedback);
  }, [feedback]);

  // GameFlow keys each scene's wrapper by sceneId, which remounts this
  // whole component on a normal scene change — but resetting here too is
  // cheap insurance against any path that swaps `image` without a key
  // change, so a broken-image state from a previous slide can never leak
  // into a new one that has a perfectly good image.
  useEffect(() => {
    setImageFailed(false);
  }, [image]);

  function submitText() {
    const trimmed = textValue.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
  }

  function submitDigits() {
    if (digits.length < digitCount) return;
    onSubmit?.(digits);
  }

 function handleEnter(event: KeyboardEvent<HTMLInputElement>) {
  if (event.key !== "Enter") return;

  if (
    interactionType === "four-digit" ||
    interactionType === "text-code"
  ) {
    submitDigits();
    return;
  }

  submitText();
}

  return (
    <div className={gameTheme.card}>
      {image && !imageFailed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mb-4 ${gameTheme.imageWrapper}`}
        >
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            sizes="200px"
            className={gameTheme.image}
            onError={() => setImageFailed(true)}
          />
        </motion.div>
      )}

      {(title || body) && (
        <div className="flex flex-col gap-1.5">
          {title && <p className={gameTheme.title}>{title}</p>}
          {body && <p className={gameTheme.body}>{body}</p>}
        </div>
      )}

      <div className="mt-6 flex flex-col items-center gap-3">
        {interactionType === "text-input" && (
          <>
            <input
              value={textValue}
              onChange={(event) => setTextValue(event.target.value)}
              onKeyDown={handleEnter}
              placeholder={placeholder}
              autoFocus
              className={gameTheme.input}
            />
            <GameButton
              label={primaryButtonLabel ?? "다음"}
              onClick={submitText}
              disabled={!textValue.trim()}
            />
          </>
        )}

        {interactionType === "number-input" && (
          <>
            <input
              value={textValue}
              onChange={(event) => setTextValue(event.target.value.replace(/[^0-9]/g, ""))}
              onKeyDown={handleEnter}
              placeholder={placeholder}
              inputMode="numeric"
              pattern="[0-9]*"
              autoFocus
              className={gameTheme.input}
            />
            <GameButton
              label={primaryButtonLabel ?? "제출"}
              onClick={submitText}
              disabled={!textValue.trim()}
            />
          </>
        )}
{(interactionType === "four-digit" || interactionType === "text-code") && (
  <>
    {interactionType === "four-digit" ? (
      <DigitInput
        length={digitCount}
        value={digits}
        onChange={(next) => {
          setDigits(next);
          if (localFeedback === "fail") setLocalFeedback("idle");
        }}
        disabled={localFeedback === "success"}
      />
    ) : (
      <input
        type="text"
        value={digits}
        onKeyDown={handleEnter}
        maxLength={digitCount}
        disabled={localFeedback === "success"}
        autoCapitalize="characters"
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => {
          const next = e.target.value
            .toUpperCase()
            .replace(/[^A-Z]/g, "");

          setDigits(next);

          if (localFeedback === "fail") {
            setLocalFeedback("idle");
          }
        }}
        className="w-full rounded-2xl border-2 border-sunny-orange bg-white px-4 py-3 text-center font-heading text-2xl uppercase tracking-[0.25em] text-sunny-brown outline-none focus:ring-2 focus:ring-sunny-orange/30 disabled:opacity-60"
        placeholder={"_".repeat(digitCount)}
      />
    )}

    <GameButton
      label={primaryButtonLabel ?? "정답 제출"}
      onClick={submitDigits}
      disabled={localFeedback === "success" || digits.length < digitCount}
    />

    {localFeedback !== "idle" && (
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`font-heading ${
          localFeedback === "success"
            ? "text-sunny-coral"
            : "text-sunny-orange"
        }`}
      >
        {localFeedback === "success"
          ? successMessage ?? "정답이야! 🎉"
          : failureMessage}
      </motion.p>
    )}

    {showHint && hint && localFeedback !== "success" && (
      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => {
            setHintOpen((prev) => !prev);
            onHint?.();
          }}
          className="font-heading text-sm text-sunny-orange underline-offset-2 hover:underline"
        >
          {secondaryButtonLabel ?? "힌트 보기"}
        </button>

        {hintOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-sunny-brownLight"
          >
            {hint}
          </motion.p>
        )}
      </div>
    )}

    {showSkip && localFeedback !== "success" && (
      <button
        type="button"
        onClick={onSkip}
        className="text-sm text-sunny-brownLight/70 hover:underline"
      >
        스킵
      </button>
    )}
  </>
)}

        {interactionType === "confirm" && (
          <GameButton label={primaryButtonLabel ?? "확인"} onClick={() => onSubmit?.()} />
        )}

        {interactionType === "message" && primaryButtonLabel && (
          <GameButton label={primaryButtonLabel} onClick={() => onSubmit?.()} />
        )}

        {interactionType === "choice" && choices && (
          <div className="flex w-full flex-col gap-3">
            {choices.map((choice) => (
              <GameButton
                key={choice}
                label={choice}
                variant="ghost"
                onClick={() => onSubmit?.(choice)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
