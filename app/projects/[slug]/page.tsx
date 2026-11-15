import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { PageContainer } from "@/components/page-container"
import { ProjectDetail } from "@/components/project-detail"
import { getProjectBySlug, projects } from "@/src/data/projects"

const placeholderSlug = "__placeholder__"

export function generateStaticParams() {
  if (projects.length === 0) {
    return [{ slug: placeholderSlug }]
  }

  return projects.map((project) => ({ slug: project.slug }))
}

export const instant = false

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: "프로젝트를 찾을 수 없습니다" }
  }

  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main>
      <PageContainer className="py-8 sm:py-12">
        <ProjectDetail project={project} />
      </PageContainer>
    </main>
  )
}
