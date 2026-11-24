import { useEffect } from 'react'
import type { RefObject } from 'react'

export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void,
) {
  useEffect(() => {
    function handleMouseDown(event: MouseEvent) {
      const element = ref.current

      // Ignore clicks inside the element
      if (!element || element.contains(event.target as Node)) return

      handler()
    }

    document.addEventListener('mousedown', handleMouseDown)

    // Cleanup: remove the listener when the component goes away
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [ref, handler])
}