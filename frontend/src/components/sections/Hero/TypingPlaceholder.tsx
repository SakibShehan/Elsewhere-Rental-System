import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTypewriter } from '@/hooks/useTypewriter'
import styles from './TypingPlaceholder.module.css'

const FULL_TEXT = 'Search here by telling your mood or destination type'

// Shorter on phones, so the whole line fits in the bar
const SHORT_TEXT = 'Search by mood or destination'

function TypingPlaceholder() {
  const isPhone = useMediaQuery('(max-width: 640px)')
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const sentence = isPhone ? SHORT_TEXT : FULL_TEXT
  const { text, isMoving } = useTypewriter(sentence, !reduceMotion)

  return (
    <span className={styles.wrap} aria-hidden="true">
      <span className={styles.line}>
        {/* People who turned off animations see the full sentence, still */}
        {reduceMotion ? sentence : text}

        {!reduceMotion && (
          <span
            className={`${styles.caret} ${isMoving ? styles.caretSolid : ''}`}
          />
        )}
      </span>
    </span>
  )
}

export default TypingPlaceholder