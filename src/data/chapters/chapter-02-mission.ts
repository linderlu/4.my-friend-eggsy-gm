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
  title: "에그시가 7살 때 그린 그림",
  body: `그렇다면 책상에 앉아랅!
종이랑 펜이 필요하면 쓰도록해 ㅋㅋㅋ

우리 써니사이드업을
소개하도록하지

이건 내가 7살 때 그린 그림이닭!
계란을 너무 좋아해서
해도 계란처럼 그렸지

그래서 우리 회사 이름도
써니사이드업이되었닭!

({name}: 너무 귀여워요!)

그렇지? 그럼 문제닭!
태양은 영어로는 SUN!
이탈리어로는 SOLE이다

그러니까 내 그림에서
SUNNY SIDE UP = SOLE인데

그렇다면..
SUNNY SIDE DOWN은 
뭘까? ㅋㅋㅋ`,
  interactionType: "four-digit",
  primaryButtonLabel: "정답 제출하기",
  showHint: true,
  showSkip: true,
  hint: "힌트주세요! 에그시! 라고 외쳐랅!",
  correctAnswer: "3705",
  validator: "exact",
  failureMessage: "땡! 아니닭!!",
  next: "step1-success",
  skipTo: "mission-step-2",
},
{
  id: "step1-success",
  sceneType: "reward",
  image: EGGSY,
  body: `정답이닭!! ㅋㅋㅋㅋ

SOLE을 거꾸로 뒤집으면
3705가 된닭!

SUNNY SIDE UP은 SOLE,
SUNNY SIDE DOWN은 3705
몸풀기 문제였닭 ㅋㅋㅋ
어렵지 않지?`,
  interactionType: "message",
  primaryButtonLabel: "ㅋㅋㅋ 다음 문제 가자!",
  next: "mission-step-2",
},
{
  id: "mission-step-2",
  sceneType: "quiz",
  image: "/missions/step2-heggllo.png",
  imageAlt: "헬로 문제 사진",
  title: "STEP 2",
  body: "첫번째 문제를 잘 완수했군? ㅋㅋㅋ \n\n 두번째는\n 써니사이드업의\n인사법이닭!\n\n 인간들은 \n 충성! 필승! 같이 \n 인사한다고 하더군? \n\n하지만 우리는 이렇게 인사한닭\n0000000!\n (알파벳 7글자)\n\n힌트는 위에 암호를\n풀면 알수있닭!",
  interactionType: "text-code",
  digitCount: 7,
  primaryButtonLabel: "정답 제출",
  showHint: true,
  showSkip: true,
  hint: "도와줘요! 에그시!라고 크게 소리쳐랅!",
  correctAnswer: "HEGGLLO",
  validator: "exact",
  failureMessage: "다시 생각해봐랅! ㅋㅋㅋ",
  next: "step2-success",
  skipTo: "mission-step-3",
},
{
  id: "step2-success",
  sceneType: "reward",
  image: "/missions/step2-heggllo-egg.png",
  imageAlt: "헬로 정답 사진",
  body: `정답이닭!!
ㅋㅋㅋㅋㅋㅋ
생각보다 기본기가
되어있는 친구닭!

우리는
에글로!
하고 인사한닭!
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
계란 아저씨 기억나냙?

평범한 아저씨 같지만
528명의 부대원 중
37번에 위치한
높은 계급의 간부닭!

문은 열고 에글로 대령을 찾아가랅!
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

이번엔 특별히
봐주겠닭!

다음에는 꼭
같이 찾아보잙!`,
  interactionType: "message",
  primaryButtonLabel: "다음으로 이동 →",
  next: "mission-step-3",
},

    {
    id: "mission-step-3",
    sceneType: "quiz",
    image: "/missions/step3-ketchup-ver2.png",
    imageAlt: "헬로 정답 사진",
    title: "STEP 3",
    body: "아참 그러고 보니 \n 오늘 누군가를 만나기로 했닭!! \n 그 사람이 누군지 알아야한닭 \n \n 그래야 마중나갈 준비를 하지!\n 누군지 아냙?!",
    interactionType: "text-code",
    digitCount: 5,
    primaryButtonLabel: "정답 제출",
    showHint: true,
    showSkip: true,
    hint: "영어이름이었던거 같은데..",
    correctAnswer: "NHUNG",
    validator: "exact",
    failureMessage: "모른다고..?",
    next: "coming-soon",
    skipTo: "coming-soon",
  },

    {
    id: "mission-step-4",
    sceneType: "dialogue",
    image: EGGSY,
    title: "STEP 4",
    body: "써니사이드업에 온걸 \n 환영해 NHUNG! \n Chào mừng NHUNG\n đến với Sunny Side Up!\n\nThật hạnh phúc khi\nchúng ta trở thành bạn bè! 💛",
    interactionType: "message",
    primaryButtonLabel: "고맙습니닭!\n(앗 내말투가 왜이러지)",
    next: "coming-soon",
  },

 {
    id: "mission-step-5",
    sceneType: "quiz",
    image: "/missions/rose.png",
    imageAlt: "헬로 정답 사진",
    title: "STEP 3",
    body: "우린 해외출장에서 만나는 인연들이 \n매일 배달음식에\n매일 저녁 같은 음식을 먹지\n\n 우린 홍콩에 갈때마다\n로즈라는 식당에 가고\n이제 사장님이랑\n절친이 되었닭ㅋㅋㅋㅋ\n꿈에 로즈식당이 나올 지경이지\n\n아 그럼 여기서\n문제 하나 낼까?\n\n<문제닭!>\n내가 꿈을 꿨는데\n미국에 와있었닭\n거울에 비친 나는\n손에 장미를 가득 들고 있었닭!\n물론 장미는 좀 작았지\n하지만 너무나도 아름다웠닭!\n\n과연 장미는 몇송이나 됐을까?\n\n 한번 맞춰봐랅ㅋㅋㅋ\n너의 센스를 보겠닭! \n2%정도 억지가있닭(?)\nbut it makes sense!",
    interactionType: "four-digit",
  primaryButtonLabel: "정답 제출하기",
  showHint: true,
  showSkip: true,
  hint: "힌트주세요! 에그시! 라고 외쳐랅!",
  correctAnswer: "9207",
  validator: "exact",
  failureMessage: "땡! 아니닭!!",
  next: "coming-soon",
  skipTo: "coming-soon",
  },

];

