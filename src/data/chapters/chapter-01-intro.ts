import type { GameScene } from "../gameScenes";

/**
 * Chapter 1 — name input through "here's today's mission" setup, before
 * the first puzzle. See src/data/gameScenes.ts for how chapters combine.
 */

const EGGSY = "/characters/eggsy/eggsy.png";

const GIFT_INTRO =
  "내가 친구가 된 기념으로 선물을 주겠닭!\n하지만 그냥 주면 재미없으니까ㅋㅋㅋ\n아래 글자들을 모두 모으면 내가 선물을 줄게!";

export const chapterIntroScenes: GameScene[] = [
  {
    id: "name-input",
    sceneType: "intro",
    image: EGGSY,
    title: "SSUP!",
    body: "야 이놈들아! \n 빨리 빨리 안올래? \n\n 이자식들은 세월이 지나도\n 똑같고만 아주 \n\n 거기 너! 너도 GM이지?\n다 똑같이 생겨서 \n이름도 기억이 안나네\n\n니 이름이 뭐였지?",
    interactionType: "text-input",
    placeholder: "니 이름이 뭐냐고!",
    primaryButtonLabel: "입니다!",
    next: "ceo-intro",
  },
  {
    id: "ceo-intro",
    sceneType: "dialogue",
    image: EGGSY,
    body: "그래 {name}이! \n 말 지지리도 안듣던 놈! \n\n너 이자식 나 옛날에 \n 교수평가 몇점 줬어? \n\n {name} :아마 4점..요? \n\n 4점!?!? 야인마!! \n 내가 4점짜리 교수냐?",
    interactionType: "message",
    primaryButtonLabel: "(5점은 아닌것 같은데..)",
    next: "gift-explain",
  },

  {
    id: "gift-explain",
    sceneType: "dialogue",
    image: EGGSY,
    body: "꿀먹었냐!!\n 니가 4점짜리 교수라고 했으니까 \n 내가 내는 문제 한번 풀어봐라 \n\n 못풀면 너 내 수업와서 \n 노래부를 준비해!!  ",
    interactionType: "message",
    primaryButtonLabel: "(학...ㅈ됐다!)",
    next: "mission-step-1",
  },
];
