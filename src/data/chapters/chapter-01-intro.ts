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
    body: "안녕!\n 나는 써니사이드업의 \n CEO '에그시'닭! \n\n 어...? 너는 이번에\n우리랑 같이 메가어스에 가기로한\n그... 그...\n\n이름이 뭐였짉? ㅋㅋ\n 에그시 기억력 안좋닭",
    interactionType: "text-input",
    placeholder: "이름을 입력해랅!",
    primaryButtonLabel: "입니다!",
    next: "ceo-intro",
  },
  {
    id: "ceo-intro",
    sceneType: "dialogue",
    image: EGGSY,
    body: "그래 {name}! \n이제 기억하도록 하지!\n만나서 반가워! ㅋㅋㅋㅋ\n\n처음 만났으니까!\n써니사이드업에 대해 소개좀 해줄까?",
    interactionType: "message",
    primaryButtonLabel: "오 좋아요!",
    next: "gift-explain",
  },

  {
    id: "gift-explain",
    sceneType: "dialogue",
    image: EGGSY,
    body: "같이 박람회 하려면 \n SSUP의 DNA를 이식받아야 하거든 ㅋㅋㅋ \n\n 지금부터 측정해보겠닭! \n\n조금 어려울수도 있어 ㅋㅋ \n(너무 걱정마 ㅋㅋ 힌트줄게)\n 자신있나!?",
    interactionType: "message",
    primaryButtonLabel: "네! 자신있습니다!",
    next: "mission-step-1",
  },
];
