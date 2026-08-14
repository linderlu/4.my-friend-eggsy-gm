import type { GameScene } from "../gameScenes";

/**
 * Chapter 3 — placeholder ending until STEP 3+ content is written. See
 * src/data/gameScenes.ts for how chapters combine.
 */

const EGGSY = "/characters/eggsy/eggsy.png";

export const chapterEndingScenes: GameScene[] = [
  {
    id: "coming-soon",
    sceneType: "ending",
    image: EGGSY,
    body: "써니사이드업에 온걸 \n 환영해 NHUNG! \n Chào mừng NHUNG\n đến với Sunny Side Up!\n\nThật hạnh phúc khi\nchúng ta trở thành bạn bè! 💛 ",
    interactionType: "message",
  },
];
