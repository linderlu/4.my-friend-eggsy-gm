# the-sunniest-in-jeonju

Next.js + TypeScript + Tailwind CSS 기반의 모바일 우선 웹앱. "Sunny Side Up" 브랜드처럼 밝고 유쾌하고 따뜻한 톤으로 구성했습니다.

홈 화면(`/`)은 "이상한 내 친구, 에그시"의 첫 번째 플레이 가능한 게임 오프닝입니다 (타이틀 → 첫 만남 → 선택 → 팝업 미션 소개 → 임시 STEP 1 미션). 지도 / 정령도감 / 마이페이지는 아직 라우팅 골격만 있는 placeholder입니다.

## 화면 구성

- `/` — 홈 (에그시 오프닝 게임)
- `/map` — 지도 (placeholder)
- `/pokedex` — 정령도감 (placeholder)
- `/mypage` — 마이페이지 (placeholder)

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속 (모바일 뷰 권장, 데스크톱에서는 가운데 최대 430px 폭으로 표시됩니다)

## 폴더 구조

```
src/
  app/
    layout.tsx              # 루트 레이아웃 (폰트 + AppShell)
    page.tsx                 # 홈 = <OpeningGame />
    map/page.tsx              # 지도 placeholder
    pokedex/page.tsx           # 정령도감 placeholder
    mypage/page.tsx            # 마이페이지 placeholder
    globals.css                # Tailwind + 브랜드 컬러 토큰
  components/
    layout/
      AppShell.tsx           # "/"에서는 헤더/하단내비 숨김, 그 외 라우트는 기존과 동일
      Header.tsx
      BottomNav.tsx
    game/
      OpeningGame.tsx         # 오프닝 상태머신 (씬 전환, 진행률 저장 등)
      EggsyCharacter.tsx       # 임시 CSS 캐릭터 (교체 방법은 파일 내 주석 참고)
      DialogueBox.tsx          # 말풍선 (터치로 다음 대사)
      ChoiceButton.tsx / GameButton.tsx
      ProgressDots.tsx
      MissionCard.tsx / MissionStepScreen.tsx
      GameBackground.tsx       # 떠다니는 구름 + 반짝이는 빛 입자
      GameTopBar.tsx           # 뒤로가기 / 처음부터
      SparkleBurst.tsx         # 중요 순간 파티클
  data/
    story.ts                  # 타이틀 + 대사 + 선택지 (오프닝 대본)
    missions.ts                # STEP 데이터 (STEP 2~12, 다른 도시 확장 지점)
  hooks/
    useOpeningProgress.ts       # localStorage 기반 진행 상태
  types/
    game.ts                    # SceneId / DialogueScene / MissionStep 등 공용 타입
```

## 브랜드 컬러 (tailwind.config.ts)

- `sunny.yolk` — 메인 노랑 (달걀노른자)
- `sunny.white` / `sunny.cream` / `sunny.skyLight` — 배경
- `sunny.orange` / `sunny.coral` — 포인트 컬러
- `sunny.brown` — 텍스트

## 스토리/미션 확장하기

- 새 대사 씬을 추가하려면 `src/types/game.ts`의 `SceneId`에 값을 추가하고, `src/data/story.ts`의 `DIALOGUE_SCENES`에 항목을 채우세요.
- STEP 2~12나 다른 도시를 추가하려면 `src/data/missions.ts`의 `MISSION_STEPS` 배열에 같은 형태로 항목을 추가하면 됩니다 (화면 컴포넌트는 이미 이 배열 기반으로 동작하도록 되어 있습니다).
