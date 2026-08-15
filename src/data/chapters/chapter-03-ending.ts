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
    image: "/missions/step5-gm27.png",
    body: "{name}!\n오늘은 우리가 함께한지 벌써 \n 4537일째 되는날이야! \n\n 4천일이 넘는 시간동안 \n 우리와 함께해줘서 고마워 {name}아 \n\n 각자의 삶을 사느라 \n 예전만큼 가깝게 지내지 못하고 있지만 \n\n마음만은 항상 우리를 생각하고 있어\n\n함께해줘서 고마웠고 \n 앞으로도 영원히 함께하자\n\n -The End-",
    interactionType: "message",
  },
];
