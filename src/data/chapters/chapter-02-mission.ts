import type { GameScene } from "../gameScenes";

/**
 * Chapter 2 — the Jeonju numeric-clue puzzles (STEP 1/2). See
 * src/data/gameScenes.ts for how chapters combine.
 */

const EGGSY = "/characters/eggsy/eggsy.png";

export const chapterMissionScenes: GameScene[] = [
{
  id: "mission-step-1",
  sceneType: "quiz",
  image: "/missions/step1-sole.png",
  imageAlt: "에그시가 7살 때 그린 계란 모양의 태양 그림",
  title: "첫 번째 관문",
  body: `지난 주에 우즈베키스탄
여자애 한명도 아주 까불었다가

내가 우리 수업에서
노래부르라고 했다! 이자식들

그래도 오솔레미오를 
아주 잘부르더만 
역시 스탄애들이 노래 잘불러

({name}: 미친 레이시스트..! 여전해)

뭐!? 오솔레미오 뜻이 뭔지 몰라?
오 나의 태양이라는 뜻이지!
SOLE은 이탈리아어로 태양이야
그리고 ..
(TMI TMI 주저리 주저리)

흠.. 그러고 보니
지난 주 전시회 같다가 신기한 회사를 봤지

SUNNY SIDE UP이라는 회사인데
대표가 어렸을때 해를 마치 
계란처럼 그렸다고 해서
회사이름이 써니사이드업이라더군

Sunny side Up = SOLE인거지 허허ㅋㅋ
마케팅적으로도 참 기발한 발상이야

그럼 여기서 문제다 이놈들
Sunny side down은 뭘까?`,
  interactionType: "four-digit",
  primaryButtonLabel: "정답 제출하기",
  showHint: true,
  showSkip: true,
  hint: "나는 바보다, 세번 외쳐라!",
  correctAnswer: "3705",
  validator: "exact",
  failureMessage: "땡! 이것도 몰라! 쯧",
  next: "step1-success",
  skipTo: "mission-step-2",
},
{
  id: "step1-success",
  sceneType: "reward",
  image: EGGSY,
  body: `그래도 공부를 좀 했나보군

그래 SOLE을 거꾸로 뒤집으면
3705가 된거지!

SUNNY SIDE UP은 SOLE,
SUNNY SIDE DOWN은 3705
껄껄껄 재밌지?`,
  interactionType: "message",
  primaryButtonLabel: "하.하. 재밌네요 교수님",
  next: "mission-step-2",
},
{
  id: "mission-step-2",
  sceneType: "quiz",
  image: "/missions/step2-heggllo.png",
  imageAlt: "헬로 문제 사진",
  title: "STEP 2",
  body: "오 자네도 이런 개그 좋아하나?\n좀 마음에 드는군? \n\n 그럼 좀더 얘기를 해주지\n 여기는 자기들만의\n 인사법도 있더라고\n\n내가 많은 나라를 다녀봤지만\n이런건 또 처음이었지 \n\n 맞춰봐라!",
  interactionType: "text-code",
  digitCount: 7,
  primaryButtonLabel: "정답 제출",
  showHint: true,
  showSkip: true,
  hint: "사랑해요 최낙환!이라고 외쳐라!",
  correctAnswer: "HEGGLLO",
  validator: "exact",
  failureMessage: "다시 생각해라, 이놈! ㅋㅋㅋ",
  next: "step2-success",
  skipTo: "mission-step-2-ar-skip",
},
{
  id: "step2-success",
  sceneType: "reward",
  image: "/missions/step2-heggllo-egg.png",
  imageAlt: "헬로 정답 사진",
  body: `그래 거기서는
에글로! 하고 인사한다고

소비자들에게 인식을
강하게 남겨서 
고려상품군으로 자리잡게 하려는
마케팅 방법이지
`,
  interactionType: "message",
  primaryButtonLabel: "H는 묵음! 명심하겠습니다!",
  next: "mission-step-2-ar",
},
{
  id: "mission-step-2-ar",
  sceneType: "reward",
  title: "MISSION",
  body: `근데 방금 "에글로!" 하던
계란 아저씨 기억나나?

그 회사는 특이하게
528개의 계란 그림을
가지고 있어서
고객들이 그걸 모으게 만들더군

제품 뿐만 아니라 세계관을
만들어서 지속적인 방문과
구매를 만드는 마케팅 방식이지

그 에글로 아저씨를 찾아가면
자네들의 기억속에 남아있는
마케팅 지식을 더 알려준다고 하네!
(기억 안나면 왼쪽 위에
뒤로가기 눌러서 보고와랅 ㅋㅋㅋ)`,
  interactionType: "message",
  primaryButtonLabel: "📷 에글로 아저씨 찾기",
  arMissionTargetId: 3,
  next: "mission-step-3",
  arMissionSkipNext: "mission-step-2-ar-skip",
},
{
  id: "mission-step-2-ar-skip",
  sceneType: "reward",
  image: EGGSY,
  body: `ㅋㅋㅋㅋ

자네 미쳤나?
스킵!!!??

그런 정신으로
어떻게 세상을 살려고! `,
  interactionType: "message",
  primaryButtonLabel: "다..다시할게요",
  next: "mission-step-2",
},

  {
    id: "mission-step-3",
    sceneType: "quiz",
    image: "/missions/step3-ketchup-ver2.png",
    imageAlt: "헬로 정답 사진",
    title: "STEP 3",
    body: "아참 그러고 보니 \n 오늘 누군가 오기로 했지! \n 그 사람이 누군지 알아야한다 \n \n 그래야 마중나갈 준비를 하지!\n 누군지 아냐?!",
    interactionType: "text-code",
    digitCount: 6,
    primaryButtonLabel: "정답 제출",
    showHint: true,
    showSkip: true,
    hint: "분명 12년전에 봤는데..",
    correctAnswer: "JINSUK",
    validator: "exact",
    failureMessage: "모른다고..?",
    next: "mission-step-4",
    skipTo: "mission-step-2-ar-skip",
  },

    {
    id: "mission-step-4",
    sceneType: "dialogue",
    image: "/missions/jinsuk.png",
    title: "STEP 4",
    body: "오빠 나야! 진숙이! \n 기억나지?!\n 키키키키키 \n 나도 이제 곧 성인이야!",
    interactionType: "message",
    primaryButtonLabel: "헉 오랜만이야! 진숙아",
    next: "coming-soon",
  },

 {
    id: "mission-step-5",
    sceneType: "quiz",
    image: "/missions/jinsuk.png",
    imageAlt: "헬로 정답 사진",
    title: "내가 실수한 이유..",
    body: "그때 실수했던건... 나도 미안해\n전날 저녁에 이상한 꿈을 꿨거든..\n\n내가 꿈을 꿨는데\n미국에 와있었어\n거울에 비친 나는\n손에 장미를 가득 들고 있었고..!\n물론 장미는 좀 작았지\n하지만 너무나도 아름다웠어!\n\n아..참! 근데 꿈에서 들고있던\n 장미는 몇송이나 됐을까?\n\n 한번 맞춰봐!ㅋㅋㅋ\n 2%정도 억지가있지만(?)\nbut it makes sense!",
    interactionType: "four-digit",
  primaryButtonLabel: "정답 제출하기",
  showHint: true,
  showSkip: true,
  hint: "문제를 한줄한줄 잘 읽어봐!",
  correctAnswer: "9207",
  validator: "exact",
  failureMessage: "땡! 틀렸어!",
  next: "coming-soon",
  skipTo: "coming-soon",
  },

];

