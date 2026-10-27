import Link from "next/link"

import { PageContainer } from "@/components/page-container"
import { SiteHeader } from "@/components/site-header"

export default function NotFound() {
  return (
    <>
      <SiteHeader variant="compact" />
      <main>
        <PageContainer className="flex flex-col gap-4 py-16">
          <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다</h1>
          <p className="text-sm text-muted-foreground">
            주소가 잘못되었거나 없는 페이지입니다.
          </p>
          <Link
            href="/"
            className="w-fit text-sm text-primary underline-offset-4 hover:underline"
          >
            홈으로 돌아가기
          </Link>
        </PageContainer>
      </main>
    </>
  )
}
