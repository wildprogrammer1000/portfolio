import type { Transition, Variants } from "framer-motion"

export const easeOutSoft = [0.22, 1, 0.36, 1] as const

export const duration = {
  fast: 0.18,
  normal: 0.28,
  slow: 0.36,
} as const

export const softTransition: Transition = {
  duration: duration.normal,
  ease: easeOutSoft,
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

export function reducedMotionSafe(
  reduced: boolean | null,
  animated: Variants,
): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 1 },
      visible: { opacity: 1 },
    }
  }

  return animated
}
