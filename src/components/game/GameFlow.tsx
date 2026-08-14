"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GameCanvas, { GAME_CONTENT_WIDTH } from "./GameCanvas";
import GameBackground from "./GameBackground";
import GameTopBar from "./GameTopBar";
import GameSlide from "./GameSlide";
import ProgressDots from "./ProgressDots";
import SparkleBurst from "./SparkleBurst";
import ArMissionOverlay from "./ArMissionOverlay";
import { getGameScene, CHOICE_TRANSITIONS, GAME_DOT_COUNT, getSceneDotIndex } from "@/data/gameScenes";
import { validateAnswer } from "@/utils/validateAnswer";
import type { OpeningProgress, SceneId } from "@/types/game";

interface GameFlowProps {
  progress: OpeningProgress;
  update: (updater: (prev: OpeningProgress) => OpeningProgress) => void;
  reset: () => void;
}

/**
 * Renders every scene after the title screen through one template:
 * looks the current scene up in src/data/gameScenes.ts and hands its
 * fields straight to <GameSlide>. This is the only place that knows how a
 * submitted value turns into "which scene comes next" — GameSlide itself
 * stays a dumb template, and gameScenes.ts stays plain data. Adding a new
 * scene is one entry in gameScenes.ts; branching choices are one entry in
 * CHOICE_TRANSITIONS. Neither ever requires touching this file.
 */
export default function GameFlow({ progress, update, reset }: GameFlowProps) {
  const [burstKey, setBurstKey] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "success" | "fail">("idle");
  const [arMissionOpen, setArMissionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sceneId = progress.sceneId;
  const scene = getGameScene(sceneId);

  // The scroll container persists across scene changes (only the
  // AnimatePresence child remounts), so a leftover scrollTop from the
  // previous scene would otherwise carry over and shift the new scene's
  // content up/down instead of it opening centered. Feedback is also
  // scene-local — a stale "정답!"/"틀렸어" from the last puzzle shouldn't
  // leak into the next one.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setFeedback("idle");
  }, [sceneId]);

  function withName(text?: string) {
    if (!text) return text;
    return text.replaceAll("{name}", progress.playerName?.trim() || "친구");
  }

  function playBurst() {
    const key = Date.now();
    setBurstKey(key);
    window.setTimeout(() => {
      setBurstKey((current) => (current === key ? null : current));
    }, 1200);
  }

  function goToScene(next: SceneId) {
    update((prev) => ({
      ...prev,
      sceneId: next,
      history: [...prev.history, prev.sceneId],
    }));
  }

  function goBack() {
    update((prev) => {
      if (prev.history.length === 0) return prev;
      const nextHistory = [...prev.history];
      const last = nextHistory.pop() as SceneId;
      return { ...prev, sceneId: last, history: nextHistory };
    });
  }

  function handleSubmit(value?: string) {
    if (!scene) return;

    if (scene.interactionType === "text-input") {
      if (!scene.next) return;
      const next = scene.next;
      update((prev) => ({
        ...prev,
        playerName: value ?? prev.playerName,
        sceneId: next,
        history: [...prev.history, prev.sceneId],
      }));
      return;
    }

    if (scene.interactionType === "choice") {
      const target = (value && CHOICE_TRANSITIONS[sceneId]?.[value]) ?? scene.next;
      if (!target) return;
      playBurst();
      update((prev) => ({
        ...prev,
        knowsEggsy: sceneId === "ceo-intro" ? (value === "있음" ? "yes" : "no") : prev.knowsEggsy,
        sceneId: target,
        history: [...prev.history, prev.sceneId],
      }));
      return;
    }

    if (
  scene.interactionType === "four-digit" ||
  scene.interactionType === "number-input" ||
  scene.interactionType === "text-code"
) {
      const isCorrect = validateAnswer({
        value: value ?? "",
        validator: scene.validator,
        correctAnswer: scene.correctAnswer,
        acceptedAnswers: scene.acceptedAnswers,
      });
      if (!isCorrect) {
        setFeedback("fail");
        return;
      }
      setFeedback("success");
      playBurst();
      update((prev) => ({
        ...prev,
        completedSteps: prev.completedSteps.includes(sceneId)
          ? prev.completedSteps
          : [...prev.completedSteps, sceneId],
      }));
      if (scene.next) {
        const next = scene.next;
        window.setTimeout(() => {
          update((prev) => ({
            ...prev,
            sceneId: next,
            history: [...prev.history, prev.sceneId],
          }));
        }, 900);
      }
      return;
    }

    // confirm / message
    if (scene.arMissionTargetId) {
      setArMissionOpen(true);
      return;
    }
    if (scene.next) goToScene(scene.next);
  }

  function handleSkip() {
    if (scene?.skipTo) goToScene(scene.skipTo);
  }

  function handleArMissionComplete() {
    setArMissionOpen(false);
    if (scene?.next) goToScene(scene.next);
  }

  function handleArMissionClose() {
    setArMissionOpen(false);
  }

  function handleArMissionSkip() {
    setArMissionOpen(false);
    const skipTarget = scene?.arMissionSkipNext ?? scene?.next;
    if (skipTarget) goToScene(skipTarget);
  }

  if (!scene) return null;

  return (
    <>
      <GameCanvas>
        <GameBackground />

        <GameTopBar showBack={progress.history.length > 0} onBack={goBack} onReset={reset} />

        {burstKey !== null && <SparkleBurst triggerKey={burstKey} />}

        <div
          ref={scrollRef}
          className="relative z-10 flex h-full flex-col items-center overflow-y-auto px-4 pb-6 pt-14"
        >
          <div
            style={{ width: GAME_CONTENT_WIDTH }}
            className="flex w-full flex-1 flex-col items-center justify-center gap-3"
          >
            <ProgressDots total={GAME_DOT_COUNT} current={getSceneDotIndex(sceneId)} />

            <AnimatePresence mode="wait">
              <motion.div
                key={sceneId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="flex w-full justify-center"
              >
                <GameSlide
                  image={scene.image}
                  imageAlt={scene.imageAlt}
                  title={scene.title}
                  body={withName(scene.body)}
                  interactionType={scene.interactionType}
                  placeholder={scene.placeholder}
                  primaryButtonLabel={scene.primaryButtonLabel}
                  secondaryButtonLabel={scene.secondaryButtonLabel}
                  showHint={scene.showHint}
                  hint={scene.hint}
                  showSkip={scene.showSkip}
                  choices={scene.choices}
                  digitCount={scene.digitCount}
                  feedback={feedback}
                  failureMessage={scene.failureMessage}
                  successMessage={scene.successMessage}
                  onSubmit={handleSubmit}
                  onSkip={handleSkip}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </GameCanvas>

      {arMissionOpen && scene.arMissionTargetId && (
        <ArMissionOverlay
          missionTargetId={scene.arMissionTargetId}
          onComplete={handleArMissionComplete}
          onClose={handleArMissionClose}
          onSkip={handleArMissionSkip}
        />
      )}
    </>
  );
}
