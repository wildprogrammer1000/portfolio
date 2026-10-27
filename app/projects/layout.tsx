import type { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header"

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader variant="compact" />
      {children}
    </>
  )
}
