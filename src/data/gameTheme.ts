/**
 * Single source of truth for the post-opening "slide" design system.
 * Colors/radius/shadow themselves are defined once in tailwind.config.ts
 * (the `sunny.*` palette, `shadow-soft` / `shadow-sunny`) — this file just
 * composes them into the reusable class groups GameSlide.tsx, GameButton.tsx
 * and DigitInput.tsx apply. No scene, and no other component, re-implements
 * card/button/input styling from scratch — they all import from here.
 */
export const gameTheme = {
  card: "w-[85%] max-w-[400px] rounded-[2rem] bg-white/95 px-6 py-8 shadow-soft",
  // Fixed-size box (not max-height) + overflow:hidden — this can never
  // grow to fit a broken/loading image; the image (rendered with next/image
  // `fill`) is always exactly this box's size, object-contain'd inside it.
  imageWrapper: "relative mx-auto h-32 w-full max-w-full overflow-hidden",
  image: "object-contain",
  title: "text-center font-heading text-xl leading-snug text-sunny-brown",
  body: "whitespace-pre-line text-center font-body text-[15px] leading-relaxed text-sunny-brown",
  input:
    "w-full rounded-2xl border-2 border-sunny-yolk bg-white px-4 py-3.5 text-center font-body text-lg text-sunny-brown outline-none focus:border-sunny-orange",
  digitBox:
    "h-14 w-12 rounded-2xl border-2 border-sunny-yolk bg-white text-center font-heading text-2xl text-sunny-brown outline-none focus:border-sunny-orange disabled:opacity-60",
  buttonBase:
    "relative block w-full rounded-full px-6 py-4 text-center font-heading text-xl outline-none focus-visible:ring-4 focus-visible:ring-sunny-coral/60 disabled:cursor-not-allowed disabled:opacity-50",
  buttonPrimary:
    "border-2 border-sunny-yolkDark bg-gradient-to-b from-sunny-yolkLight to-sunny-yolk text-sunny-brown shadow-sunny",
  buttonGhost: "border-2 border-sunny-yolk bg-white text-sunny-brown",
} as const;
