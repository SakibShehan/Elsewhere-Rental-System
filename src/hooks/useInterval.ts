import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Keep the latest function (avoids the stale closure)
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Start the timer; null means "no timer"
  useEffect(() => {
    if (delay === null) return

    const timer = setInterval(() => savedCallback.current(), delay)

    // Cleanup: stop the timer when delay changes or the component goes away
    return () => clearInterval(timer)
  }, [delay])
}