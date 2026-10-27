import { PageContainer } from "@/components/page-container"
import { ProjectBrowser } from "@/components/project-browser"
import { SiteHeader } from "@/components/site-header"
import { getCategories, projects } from "@/src/data/projects"

export default function HomePage() {
  return (
    <>
      <SiteHeader variant="home" />
      <main>
        <PageContainer className="py-8 sm:py-12">
          <ProjectBrowser projects={projects} categories={getCategories()} />
        </PageContainer>
      </main>
    </>
  )
}
