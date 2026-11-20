import { useMediaQuery } from '@/hooks/useMediaQuery'

// Phone: 1 card, tablet: 2 cards, laptop and larger: 3 cards
export function useVisibleCount(): number {
  const isTabletUp = useMediaQuery('(min-width: 760px)')
  const isLaptopUp = useMediaQuery('(min-width: 1024px)')

  if (isLaptopUp) return 3
  if (isTabletUp) return 2
  return 1
}