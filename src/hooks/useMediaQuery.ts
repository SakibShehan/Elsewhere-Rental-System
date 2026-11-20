import { useCallback, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  // Subscribe: tell React when the answer changes
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)

      // Cleanup: stop listening when the component goes away
      return () => media.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches, // value in the browser
    () => false, // value when rendering on a server (for Next.js later)
  )
}