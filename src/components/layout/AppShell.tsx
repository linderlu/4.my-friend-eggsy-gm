"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import BottomNav from "./BottomNav";

// Routes that are full-screen game experiences: no app header, no bottom nav.
const GAME_ROUTES = new Set(["/"]);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGameRoute = GAME_ROUTES.has(pathname);

  if (isGameRoute) {
    return <main className="mx-auto h-[100dvh] w-full max-w-[430px]">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-24 pt-4">{children}</main>
      <BottomNav />
    </>
  );
}
