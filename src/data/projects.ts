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

export const projects: Project[] = []

export function getCategories() {
  return [...new Set(projects.map((project) => project.category))]
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
