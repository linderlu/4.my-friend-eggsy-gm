import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // gameTheme.ts holds the shared class strings for the post-opening
    // slide system (GameSlide.tsx et al.) — without this, Tailwind's JIT
    // scanner never sees those class names and purges them entirely.
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Sunny Side Up" brand palette — bright, cheerful, warm
        sunny: {
          yolk: "#FFC93C", // egg-yolk yellow, primary
          yolkLight: "#FFE18A",
          yolkDark: "#FFAF00",
          white: "#FFFDF5", // egg-white cream, background
          cream: "#FFF6E3",
          orange: "#FF8C42", // warm orange, secondary
          coral: "#FF6B4A", // accent / CTA
          sky: "#7FD8E8", // playful accent for chips/badges
          skyLight: "#EAF7FF", // opening-game background gradient top
          brown: "#6B4A2E", // warm text color
          brownLight: "#9A7B57",
        },
      },
      fontFamily: {
        heading: ["var(--font-jua)", "sans-serif"],
        body: ["var(--font-gowun)", "sans-serif"],
      },
      borderRadius: {
        blob: "2rem",
      },
      boxShadow: {
        sunny: "0 8px 24px -8px rgba(255, 140, 66, 0.35)",
        // Gentle card shadow — deliberately softer/quieter than `sunny`
        // (which is for buttons/stickers), so the one main card reads as
        // calm UI, not another decorative sticker.
        soft: "0 12px 32px -16px rgba(107, 74, 46, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
