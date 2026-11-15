"use client"

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { duration, easeOutSoft } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function ScreenshotCarousel({
  title,
  screenshots,
}: {
  title: string
  screenshots: string[]
}) {
  const [[index, direction], setPage] = useState([0, 0])
  const reducedMotion = useReducedMotion()
  const count = screenshots.length
  const src = screenshots[index]

  if (!src) {
    return null
  }

  function show(delta: number) {
    const wrapped = (index + delta + count) % count
    setPage([wrapped, delta > 0 ? 1 : -1])
  }

  function goTo(shotIndex: number) {
    if (shotIndex === index) {
      return
    }

    setPage([shotIndex, shotIndex > index ? 1 : -1])
  }

  const slideVariants = {
    enter: (dir: number) =>
      reducedMotion
        ? { opacity: 0 }
        : { x: dir > 0 ? 48 : -48, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: (dir: number) =>
      reducedMotion
        ? { opacity: 0 }
        : { x: dir > 0 ? -48 : 48, opacity: 0 },
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
          show(-1)
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          show(1)
        }
      }}
    >
      <div className="relative h-[min(70vh,32rem)] overflow-hidden rounded-lg border border-border bg-muted">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={src}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reducedMotion ? duration.fast : duration.normal,
              ease: easeOutSoft,
            }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={`${title} 스크린샷 ${index + 1}`}
              fill
              unoptimized
              priority={index === 0}
              className="object-contain"
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
          </motion.div>
        </AnimatePresence>
        {count > 1 ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-3 z-10 -translate-y-1/2 bg-background/90"
              aria-label="이전 스크린샷"
              onClick={() => show(-1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-3 z-10 -translate-y-1/2 bg-background/90"
              aria-label="다음 스크린샷"
              onClick={() => show(1)}
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
                  "h-2 overflow-hidden rounded-full transition-[width,background-color] duration-200",
                  shotIndex === index
                    ? "w-5 bg-primary"
                    : "w-2 bg-border",
                )}
                onClick={() => goTo(shotIndex)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
