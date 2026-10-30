import type { Metadata } from "next"
import type { ReactNode } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { CategoryChip } from "@/components/category-chip"
import { PageContainer } from "@/components/page-container"
import { ScreenshotCarousel } from "@/components/screenshot-carousel"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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

function DetailBlock({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-2", className)}>
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="text-base leading-7">{children}</div>
    </section>
  )
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
      <PageContainer className="flex flex-col gap-10 py-8 sm:py-12">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "lg",
              className: "w-fit text-base",
            }),
          )}
        >
          <ChevronLeft />
          목록
        </Link>
        {project.screenshots.length > 0 ? (
          <ScreenshotCarousel
            title={project.title}
            screenshots={project.screenshots}
          />
        ) : null}
        <header className="flex flex-col gap-3">
          <CategoryChip>{project.category}</CategoryChip>
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {project.summary}
          </p>
        </header>
        <DetailBlock title="기술 스택">
          <dl className="flex flex-col gap-3">
            {project.stack.map((group) => (
              <div
                key={group.role}
                className="grid grid-cols-[7.5rem_1fr] gap-4"
              >
                <dt className="text-sm text-muted-foreground">{group.role}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </DetailBlock>
        <div className="grid gap-8 sm:grid-cols-2">
          <DetailBlock title="기간">
            <p>{project.period}</p>
          </DetailBlock>
          {project.links.length > 0 ? (
            <DetailBlock title="링크">
              <ul className="flex flex-col gap-2">
                {project.links.map((link) => (
                  <li
                    key={link.href}
                    className="flex flex-wrap items-baseline gap-x-2"
                  >
                    <span className="text-sm text-muted-foreground">
                      {link.label}
                    </span>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-primary underline-offset-4 hover:underline"
                    >
                      {link.href}
                      <span className="sr-only"> (새 탭)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </DetailBlock>
          ) : null}
        </div>
      </PageContainer>
    </main>
  )
}
