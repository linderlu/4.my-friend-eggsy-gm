"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  emoji: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "홈", emoji: "🏠" },
  { href: "/map", label: "지도", emoji: "🗺️" },
  { href: "/pokedex", label: "정령도감", emoji: "📖" },
  { href: "/mypage", label: "마이페이지", emoji: "🙂" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-sunny-yolkLight bg-sunny-white/95 backdrop-blur">
      <ul className="max-w-md mx-auto grid grid-cols-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 text-xs font-heading transition-colors ${
                  isActive
                    ? "text-sunny-coral"
                    : "text-sunny-brownLight hover:text-sunny-orange"
                }`}
              >
                <span
                  className={`text-xl leading-none ${
                    isActive ? "scale-110" : ""
                  } transition-transform`}
                  aria-hidden
                >
                  {item.emoji}
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
