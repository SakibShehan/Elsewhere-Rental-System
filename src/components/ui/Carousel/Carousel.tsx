import { useCallback, useState } from 'react'
import type { ReactNode } from 'react'
import { useInterval } from '@/hooks/useInterval'

// What the caller receives to build its own UI
export interface CarouselControls {
  index: number
  count: number
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

interface CarouselProps {
  count: number
  label: string
  autoPlayMs?: number
  className?: string
  children: (controls: CarouselControls) => ReactNode
}

function Carousel({
  count,
  label,
  autoPlayMs,
  className,
  children,
}: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Wrap around: after the last slide comes the first
  const next = useCallback(
    () => setIndex((current) => (current + 1) % count),
    [count],
  )
  const prev = useCallback(
    () => setIndex((current) => (current - 1 + count) % count),
    [count],
  )
  const goTo = useCallback((target: number) => setIndex(target), [])

  // Timer runs only when auto-play is on, not paused, and there is more than one slide
  const delay =
    autoPlayMs !== undefined && !isPaused && count > 1 ? autoPlayMs : null
  useInterval(next, delay)

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {children({ index, count, next, prev, goTo })}
    </div>
  )
}

export default Carousel