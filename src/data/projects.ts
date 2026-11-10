export type ProjectLink = {
  label: string
  href: string
}

export type ProjectStack = {
  role: string
  items: string[]
}

export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  thumbnail: string
  stack: ProjectStack[]
  period: string
  links: ProjectLink[]
  screenshots: string[]
}

export const projects: Project[] = [
  {
    slug: "yachtdice",
    title: "요트다이스",
    category: "웹게임",
    summary: "실시간 멀티플레이로 즐기는 3D 요트 다이스 보드게임.",
    thumbnail: "https://yachtdice.makerju.com/icon-512.png",
    stack: [
      { role: "웹", items: ["React", "TypeScript", "Vite"] },
      { role: "스타일", items: ["Tailwind CSS"] },
      { role: "상태 관리", items: ["Zustand"] },
      { role: "웹 3D", items: ["React Three Fiber", "Rapier"] },
      { role: "실시간 통신", items: ["Socket.IO", "Fastify"] },
      {
        role: "배포",
        items: ["Vercel", "AWS Lightsail", "AWS Route 53", "Docker"],
      },
    ],
    period: "2026.10.10 ~ 2026.10.25",
    links: [{ label: "URL", href: "https://yachtdice.makerju.com" }],
    screenshots: [
      "https://yachtdice.makerju.com/01-home.png",
      "https://yachtdice.makerju.com/02-room.png",
      "https://yachtdice.makerju.com/03-ingame.png",
      "https://yachtdice.makerju.com/04-scoreboard.png",
    ],
  },
  {
    slug: "numberbaseball",
    title: "숫자야구",
    category: "웹게임",
    summary:
      "3·4·5자리 숫자를 스트라이크와 볼로 맞히는 싱글·실시간 멀티플레이 숫자 퍼즐게임",
    thumbnail: "https://numberbaseball.makerju.com/logo.png",
    stack: [
      { role: "웹", items: ["React", "TypeScript", "Vite"] },
      { role: "스타일", items: ["Pure CSS"] },
      { role: "실시간 통신", items: ["Nakama Game Server"] },
      { role: "인증", items: ["Google OAuth"] },
      { role: "분석", items: ["Firebase Analytics"] },
      {
        role: "배포",
        items: ["Vercel", "AWS Lightsail", "AWS Route 53", "Docker"],
      },
    ],
    period: "2026.6.15 ~ 2026.7.5",
    links: [{ label: "URL", href: "https://numberbaseball.makerju.com" }],
    screenshots: [
      "https://numberbaseball.makerju.com/01-home.png",
      "https://numberbaseball.makerju.com/02-ingame.png",
      "https://numberbaseball.makerju.com/03-result.png",
      "https://numberbaseball.makerju.com/04-leaderboard.png",
    ],
  },
  {
    slug: "cryptid",
    title: "크립티드",
    category: "웹게임",
    summary: "단서를 숨기고 서식지를 찾는 추리 보드게임.",
    thumbnail: "https://cryptid.makerju.com/logo.png",
    stack: [
      { role: "웹", items: ["React", "TypeScript", "Vite"] },
      { role: "스타일", items: ["Pure CSS"] },
      { role: "모션", items: ["Framer Motion"] },
      { role: "실시간 통신", items: ["Nakama Game Server"] },
      { role: "인증", items: ["Google OAuth"] },
      {
        role: "배포",
        items: ["Vercel", "AWS Lightsail", "AWS Route 53", "Docker"],
      },
    ],
    period: "2026.11.9 ~ 2026.11.10",
    links: [{ label: "URL", href: "https://cryptid.makerju.com" }],
    screenshots: [
      "https://cryptid.makerju.com/01-home.png",
      "https://cryptid.makerju.com/02-room.png",
      "https://cryptid.makerju.com/03-game.png",
      "https://cryptid.makerju.com/04-result.png",
    ],
  },
]

export function getCategories() {
  return [...new Set(projects.map((project) => project.category))]
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
