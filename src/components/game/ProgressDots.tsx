interface ProgressDotsProps {
  total: number;
  current: number;
}

/** Plain progress dots — no icon, just size/color: the current step is a
 * bigger coral pill, completed steps are small solid dots, upcoming steps
 * are faint. Information at a glance, nothing decorative. */
export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current
              ? "w-6 bg-sunny-coral"
              : i < current
                ? "w-2 bg-sunny-coral/50"
                : "w-2 bg-sunny-brown/15"
          }`}
        />
      ))}
    </div>
  );
}
