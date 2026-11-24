import { useCallback, useSyncExternalStore } from 'react'

// Default: the bar changes after 80px of scrolling
const defaultThreshold = () => 80

export function useScrolled(getThreshold: () => number = defaultThreshold): boolean {
  // Subscribe: tell React when the scroll position or window size changes
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener('scroll', onChange, { passive: true })
    window.addEventListener('resize', onChange)

    // Cleanup: stop listening when the component goes away
    return () => {
      window.removeEventListener('scroll', onChange)
      window.removeEventListener('resize', onChange)
    }
  }, [])

  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > getThreshold(), // value in the browser
    () => false, // value on a server (for Next.js later)
  )
}