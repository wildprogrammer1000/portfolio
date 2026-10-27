export type ProjectLink = {
  label: string
  href: string
}

export type ProjectScreenshot = {
  src: string
  alt: string
}

export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  thumbnail: string
  problem: string
  role: string
  stack: string[]
  period: string
  links: ProjectLink[]
  screenshots: ProjectScreenshot[]
}

export const projects: Project[] = [
  {
    slug: "store-order-board",
    title: "매장 주문 보드",
    category: "웹",
    summary: "키오스크와 배달 주문을 한 보드에서 접수부터 완료까지 넘기게 했다.",
    thumbnail: "/projects/store-order-board/thumbnail.svg",
    problem:
      "점심 피크에 직원은 키오스크, 배달 앱, 카운터를 번갈아 봤다. 제조 순서가 밀리고, 이미 나간 주문을 다시 만드는 일이 하루에 몇 번씩 생겼다.",
    role: "접수, 제조, 완료 칸으로 나눈 보드를 설계하고 구현했다. 매장 직원이 한 손으로 상태를 바꿀 수 있게 동작 버튼을 크게 두었다.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    period: "2024.03 – 2024.07",
    links: [
      {
        label: "서비스",
        href: "https://example.com/store-order-board",
      },
      {
        label: "저장소",
        href: "https://github.com/example/store-order-board",
      },
    ],
    screenshots: [
      {
        src: "/projects/store-order-board/board.svg",
        alt: "접수, 제조, 완료 칸으로 나뉜 주문 보드",
      },
      {
        src: "/projects/store-order-board/detail.svg",
        alt: "아메리카노 주문의 상태를 바꾸는 화면",
      },
    ],
  },
]

export function getCategories() {
  return [...new Set(projects.map((project) => project.category))]
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
