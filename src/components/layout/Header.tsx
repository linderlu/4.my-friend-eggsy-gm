export default function Header() {
  return (
    <header className="w-full bg-sunny-yolk shadow-sunny">
      <div className="max-w-md mx-auto flex items-center gap-2 px-4 py-3">
        <span className="text-2xl" aria-hidden>
          ☀️
        </span>
        <h1 className="font-heading text-lg text-sunny-brown tracking-tight">
          가장 맑은 전주
        </h1>
      </div>
    </header>
  );
}
