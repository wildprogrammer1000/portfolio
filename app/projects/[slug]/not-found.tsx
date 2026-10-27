import Link from "next/link"

import { PageContainer } from "@/components/page-container"

export default function ProjectNotFound() {
  return (
    <main>
      <PageContainer className="flex flex-col gap-4 py-16">
        <h1 className="text-2xl font-semibold">프로젝트를 찾을 수 없습니다</h1>
        <p className="text-sm text-muted-foreground">
          주소가 바뀌었거나 목록에 없는 프로젝트입니다.
        </p>
        <Link
          href="/"
          className="w-fit text-sm text-primary underline-offset-4 hover:underline"
        >
          목록으로 돌아가기
        </Link>
      </PageContainer>
    </main>
  )
}
