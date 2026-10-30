"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ScreenshotCarousel({
  title,
  screenshots,
}: {
  title: string
  screenshots: string[]
}) {
  const [index, setIndex] = useState(0)
  const count = screenshots.length
  const src = screenshots[index]

  if (!src) {
    return null
  }

  function show(next: number) {
    setIndex((next + count) % count)
  }

  return (
    <div
      className="flex flex-col gap-3"
      role="region"
      aria-roledescription="캐러셀"
      aria-label={`${title} 스크린샷`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          show(index - 1)
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          show(index + 1)
        }
      }}
    >
      <div className="relative h-[min(70vh,32rem)] overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          src={src}
          alt={`${title} 스크린샷 ${index + 1}`}
          fill
          unoptimized
          priority={index === 0}
          className="object-contain"
          sizes="(min-width: 1024px) 64rem, 100vw"
        />
        {count > 1 ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 bg-background/90"
              aria-label="이전 스크린샷"
              onClick={() => show(index - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-3 z-10 -translate-y-1/2 bg-background/90"
              aria-label="다음 스크린샷"
              onClick={() => show(index + 1)}
            >
              <ChevronRight />
            </Button>
          </>
        ) : null}
      </div>
      {count > 1 ? (
        <div className="flex justify-center">
          <p className="sr-only" aria-live="polite">
            {index + 1} / {count}
          </p>
          <div className="flex gap-2">
            {screenshots.map((shot, shotIndex) => (
              <button
                key={`${shot}-${shotIndex}`}
                type="button"
                aria-label={`${shotIndex + 1}번째 스크린샷`}
                aria-current={shotIndex === index ? "true" : undefined}
                className={cn(
                  "size-2 rounded-full",
                  shotIndex === index ? "bg-primary" : "bg-border",
                )}
                onClick={() => setIndex(shotIndex)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
