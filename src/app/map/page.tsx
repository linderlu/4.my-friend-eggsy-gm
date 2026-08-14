export default function MapPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="sunny-card flex flex-col items-center text-center gap-3">
        <div className="text-4xl" aria-hidden>
          🗺️
        </div>
        <h2 className="font-heading text-2xl text-sunny-brown">지도</h2>
        <p className="text-sm text-sunny-brownLight">
          전주 곳곳의 햇살 가득한 장소를 지도로 소개할 예정이에요.
        </p>
        <span className="sunny-badge">지도 화면 · 준비 중</span>
      </section>
    </div>
  );
}
