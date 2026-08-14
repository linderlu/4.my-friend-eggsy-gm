export default function PokedexPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="sunny-card flex flex-col items-center text-center gap-3">
        <div className="text-4xl" aria-hidden>
          📖
        </div>
        <h2 className="font-heading text-2xl text-sunny-brown">정령도감</h2>
        <p className="text-sm text-sunny-brownLight">
          전주 곳곳에 숨어있는 정령들을 모으고 살펴볼 수 있는 도감이 준비되고 있어요.
        </p>
        <span className="sunny-badge">정령도감 화면 · 준비 중</span>
      </section>
    </div>
  );
}
