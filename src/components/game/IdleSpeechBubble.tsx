"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGameAudio } from "./AudioProvider";

interface IdleSpeechBubbleProps {
  onDismiss: () => void;
}

/**
 * Shown once, next to Eggsy, after 3s of no interaction on the title screen.
 * Parent wraps this in <AnimatePresence> so the exit animation actually plays.
 */
export default function IdleSpeechBubble({ onDismiss }: IdleSpeechBubbleProps) {
  const { playSfx } = useGameAudio();

  useEffect(() => {
    playSfx("pop");
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sunny-card absolute right-[-6%] top-0 z-[70] max-w-[160px] -translate-y-[110%] rounded-2xl bg-white px-4 py-3 text-center shadow-sunny"
    >
      <p className="font-heading text-sm leading-snug text-sunny-brown">
        SSUP!
        <br />
        시작 버튼을 눌러봐랅!
      </p>
      <div className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white" />
    </motion.div>
  );
}
