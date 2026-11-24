import { useState } from 'react'
import { useInterval } from '@/hooks/useInterval'

type Phase = 'typing' | 'holding' | 'erasing' | 'waiting'

// How long each phase waits before its next step (milliseconds)
const DELAYS: Record<Phase, number> = {
  typing: 70, // time between letters
  holding: 1800, // the full sentence stays on screen
  erasing: 35, // erasing is faster than typing
  waiting: 500, // empty pause before typing again
}

export function useTypewriter(text: string, enabled = true) {
  const [length, setLength] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  // One step of the animation
  function step() {
    switch (phase) {
      case 'typing': {
        const next = Math.min(length + 1, text.length)
        setLength(next)
        if (next === text.length) setPhase('holding')
        break
      }
      case 'holding':
        setPhase('erasing')
        break
      case 'erasing': {
        const next = Math.max(length - 1, 0)
        setLength(next)
        if (next === 0) setPhase('waiting')
        break
      }
      case 'waiting':
        setPhase('typing')
        break
    }
  }

  // One timer: its delay changes with the phase, null stops it
  useInterval(step, enabled ? DELAYS[phase] : null)

  return {
    text: text.slice(0, length),
    isMoving: phase === 'typing' || phase === 'erasing',
  }
}