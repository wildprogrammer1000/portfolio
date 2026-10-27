import Image from "next/image"
import Link from "next/link"

import type { Project } from "@/src/data/projects"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card outline-none transition-colors hover:border-primary focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <Image
        src={project.thumbnail}
        alt=""
        width={1200}
        height={675}
        priority
        unoptimized
        className="aspect-video w-full bg-muted object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm text-muted-foreground">{project.category}</p>
        <h2 className="text-lg font-medium">{project.title}</h2>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>
      </div>
    </Link>
  )
}
