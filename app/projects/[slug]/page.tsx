import type { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PageContainer } from "@/components/page-container"
import { cn } from "@/lib/utils"
import { getProjectBySlug, projects } from "@/src/data/projects"

export function generateStaticParams() {
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
          className="w-fit text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          목록
        </Link>
        <header className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">{project.category}</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {project.summary}
          </p>
        </header>
        <div className="grid gap-8 sm:grid-cols-2">
          <DetailBlock title="문제" className="sm:col-span-2">
            <p className="max-w-2xl">{project.problem}</p>
          </DetailBlock>
          <DetailBlock title="맡은 역할" className="sm:col-span-2">
            <p className="max-w-2xl">{project.role}</p>
          </DetailBlock>
          <DetailBlock title="기술 스택">
            <p>{project.stack.join(" · ")}</p>
          </DetailBlock>
          <DetailBlock title="기간">
            <p>{project.period}</p>
          </DetailBlock>
          {project.links.length > 0 ? (
            <DetailBlock title="링크" className="sm:col-span-2">
              <ul className="flex flex-wrap gap-4">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {link.label}
                      <span className="sr-only"> (새 탭)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </DetailBlock>
          ) : null}
        </div>
        {project.screenshots.length > 0 ? (
          <section className="flex flex-col gap-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              스크린샷
            </h2>
            <ul className="flex flex-col gap-6">
              {project.screenshots.map((screenshot) => (
                <li key={screenshot.src}>
                  <figure className="flex flex-col gap-2">
                    <Image
                      src={screenshot.src}
                      alt=""
                      width={1200}
                      height={800}
                      unoptimized
                      className="h-auto w-full border border-border bg-muted"
                    />
                    <figcaption className="text-sm text-muted-foreground">
                      {screenshot.alt}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </PageContainer>
    </main>
  )
}
