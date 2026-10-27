import { Mail } from "lucide-react"
import Link from "next/link"

import { PageContainer } from "@/components/page-container"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { profile } from "@/src/data/profile"

type SiteHeaderProps = {
  variant: "home" | "compact"
}

function ContactLink({ size }: { size: "default" | "lg" }) {
  return (
    <a
      href={`mailto:${profile.email}`}
      className={cn(buttonVariants({ size }))}
    >
      <Mail aria-hidden="true" />
      연락하기
    </a>
  )
}

export function SiteHeader({ variant }: SiteHeaderProps) {
  switch (variant) {
    case "home":
      return (
        <header className="border-b border-border">
          <PageContainer className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {profile.name}
              </h1>
              <div className="flex flex-col gap-1">
                {profile.intro.map((line) => (
                  <p key={line} className="text-base leading-7">
                    {line}
                  </p>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                프로그래밍 경력 {profile.yearsOfExperience}년
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="w-fit text-sm text-foreground underline-offset-4 hover:underline"
              >
                {profile.email}
              </a>
            </div>
            <ContactLink size="lg" />
          </PageContainer>
        </header>
      )
    case "compact":
      return (
        <header className="border-b border-border">
          <PageContainer className="flex items-center justify-between gap-4 py-4">
            <Link href="/" className="text-sm font-medium">
              {profile.name}
            </Link>
            <ContactLink size="default" />
          </PageContainer>
        </header>
      )
    default: {
      const exhaustive: never = variant
      return exhaustive
    }
  }
}
