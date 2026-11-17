import type { Suggestion } from '@/types/search'
import styles from './SuggestionPills.module.css'

interface SuggestionPillsProps {
  suggestions: Suggestion[]
  onSelect: (query: string) => void
}

function SuggestionPills({ suggestions, onSelect }: SuggestionPillsProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Try these:</span>

      <ul className={styles.list}>
        {suggestions.map((suggestion) => (
          <li key={suggestion.label}>
            <button
              type="button"
              className={styles.pill}
              onClick={() => onSelect(suggestion.query)}
            >
              <img src={suggestion.icon} alt="" />
              {suggestion.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SuggestionPills