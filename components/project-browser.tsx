"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"

import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import {
  fadeUpVariants,
  reducedMotionSafe,
  softTransition,
  staggerContainerVariants,
} from "@/lib/motion"
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
  const reducedMotion = useReducedMotion()
  const itemVariants = reducedMotionSafe(reducedMotion, fadeUpVariants)
  const visible =
    category === allCategories
      ? projects
      : projects.filter((project) => project.category === category)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">프로젝트</h2>
        {categories.length > 0 ? (
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
        ) : null}
      </div>
      <div aria-live="polite">
        <p className="sr-only">{visible.length}개의 프로젝트</p>
        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            등록된 프로젝트가 없습니다.
          </p>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {visible.length === 0 ? (
              <motion.p
                key="empty"
                className="text-sm text-muted-foreground"
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={softTransition}
              >
                이 카테고리의 프로젝트가 없습니다.
              </motion.p>
            ) : (
              <motion.ul
                key={category}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                initial="hidden"
                animate="visible"
                exit={reducedMotion ? undefined : { opacity: 0 }}
                variants={
                  reducedMotion ? undefined : staggerContainerVariants
                }
                transition={softTransition}
              >
                {visible.map((project) => (
                  <motion.li
                    key={project.slug}
                    variants={itemVariants}
                    transition={softTransition}
                    layout={!reducedMotion}
                  >
                    <ProjectCard project={project} />
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
