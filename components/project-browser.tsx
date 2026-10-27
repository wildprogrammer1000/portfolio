"use client"

import { useState } from "react"

import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import type { Project } from "@/src/data/projects"

const allCategories = "all"

export function ProjectBrowser({
  projects,
  categories,
}: {
  projects: Project[]
  categories: string[]
}) {
  const [category, setCategory] = useState(allCategories)
  const visible =
    category === allCategories
      ? projects
      : projects.filter((project) => project.category === category)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">프로젝트</h2>
        <div role="group" aria-label="카테고리" className="flex flex-wrap gap-2">
          <Button
            variant={category === allCategories ? "default" : "outline"}
            aria-pressed={category === allCategories}
            onClick={() => setCategory(allCategories)}
          >
            전체
          </Button>
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? "default" : "outline"}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
      <div aria-live="polite">
        <p className="sr-only">{visible.length}개의 프로젝트</p>
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            이 카테고리의 프로젝트가 없습니다.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {visible.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
