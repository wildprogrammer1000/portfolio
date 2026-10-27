import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"

import { cn } from "@/lib/utils"
import { profile } from "@/src/data/profile"

import "./globals.css"

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: `${profile.name} · 포트폴리오`,
    template: `%s · ${profile.name}`,
  },
  description: `${profile.name}의 프로젝트 포트폴리오`,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={cn("h-full antialiased", "font-sans", notoSansKr.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
