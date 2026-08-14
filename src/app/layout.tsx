import type { Metadata } from "next";
import { Jua, Gowun_Dodum } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jua",
  display: "swap",
});

const gowunDodum = Gowun_Dodum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gowun",
  display: "swap",
});

// Used to resolve relative og:image / twitter:image URLs. Override with
// NEXT_PUBLIC_SITE_URL once the app has a real deployed domain.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const TITLE = "Sunny Side Up🐣";
const DESCRIPTION = "이상한 내 친구 에그시와 함께하는 로컬여행";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: "/eggsy-icon.png",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: siteUrl,
    siteName: "이상한 내 친구, 에그시",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${jua.variable} ${gowunDodum.variable} min-h-dvh flex flex-col bg-sunny-white antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
