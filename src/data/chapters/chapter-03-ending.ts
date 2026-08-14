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
    body: "..이...\n...자식..\n일어나라! 이놈자식!!!\n\n수업시간에 자빠져 자고있어?\n\n{name}:앗...꿈?\n\n 나가서 내 담배나 사와!\n\n 네..넵!...\n (ㅈ같은꿈이군..) \n\n -The End-",
    interactionType: "message",
  },
];
