export default function MyPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="sunny-card flex flex-col items-center text-center gap-3">
        <div className="text-4xl" aria-hidden>
          🙂
        </div>
        <h2 className="font-heading text-2xl text-sunny-brown">마이페이지</h2>
        <p className="text-sm text-sunny-brownLight">
          나만의 전주 기록과 설정을 관리하는 공간이 될 거예요.
        </p>
        <span className="sunny-badge">마이페이지 · 준비 중</span>
      </section>
    </div>
  );
}
