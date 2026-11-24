import { useCallback, useState } from 'react'

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  // useCallback keeps the same function between renders (stable reference)
  const toggle = useCallback(() => setValue((prev) => !prev), [])
  const open = useCallback(() => setValue(true), [])
  const close = useCallback(() => setValue(false), [])

  return { value, toggle, open, close }
}