import { useMemo, useState } from 'react'
import type { FocusEvent, FormEvent, RefObject } from 'react'
import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import sparkleIcon from '@/assets/icons/sparkles.svg'
import TypingPlaceholder from './TypingPlaceholder'
import styles from './MoodSearchBar.module.css'

interface MoodSearchBarProps {
  value: string
  searchPrompts: string[]
  isSearching: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  onSelect: (value: string) => void
  inputRef: RefObject<HTMLInputElement | null>
}

function MoodSearchBar({
  value,
  searchPrompts,
  isSearching,
  onChange,
  onSubmit,
  onSelect,
  inputRef,
}: MoodSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const showAnimation = value === '' && !isFocused
  const matchingPrompts = useMemo(() => {
    const normalizedQuery = value.trim().toLocaleLowerCase()

    return normalizedQuery
      ? searchPrompts.filter((prompt) =>
          prompt.toLocaleLowerCase().includes(normalizedQuery),
        )
      : searchPrompts
  }, [searchPrompts, value])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    if (
      !(event.relatedTarget instanceof Node) ||
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      setIsFocused(false)
    }
  }

  return (
    <form
      className={styles.bar}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      role="search"
    >
      <span className={styles.sparkleWrap}>
        <img src={sparkleIcon} alt="" className={styles.sparkle} />
      </span>

      <div className={styles.inputWrap}>
        <input
          ref={inputRef}
          type="text"
          className={`${styles.input} ${showAnimation ? styles.inputEmpty : ''}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setIsFocused(true)}
          aria-label="Search by telling your mood or destination"
          aria-autocomplete="list"
          aria-expanded={isFocused && matchingPrompts.length > 0}
          aria-controls="search-prompt-suggestions"
        />

        {showAnimation && <TypingPlaceholder />}
      </div>

      <button
        type="submit"
        className={styles.submit}
        aria-label="Search stays"
        disabled={value.trim() === '' || isSearching}
      >
        <img src={arrowRightIcon} alt="" />
      </button>
      {isFocused && matchingPrompts.length > 0 && (
        <ul
          id="search-prompt-suggestions"
          className={styles.suggestions}
          role="list"
          aria-label="Previously searched prompts"
        >
          {matchingPrompts.map((prompt) => (
            <li key={prompt}>
              <button
                type="button"
                className={styles.suggestion}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onSelect(prompt)
                  inputRef.current?.focus()
                }}
              >
                {prompt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default MoodSearchBar