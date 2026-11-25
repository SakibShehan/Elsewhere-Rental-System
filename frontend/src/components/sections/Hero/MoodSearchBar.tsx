import { useState } from 'react'
import type { FormEvent, RefObject } from 'react'
import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import sparkleIcon from '@/assets/icons/sparkles.svg'
import TypingPlaceholder from './TypingPlaceholder'
import styles from './MoodSearchBar.module.css'

interface MoodSearchBarProps {
  value: string
  moods: string[]
  isSearching: boolean
  onChange: (value: string) => void
  onSubmit: () => void
  inputRef: RefObject<HTMLInputElement | null>
}

function MoodSearchBar({
  value,
  moods,
  isSearching,
  onChange,
  onSubmit,
  inputRef,
}: MoodSearchBarProps) {
  // Is the user inside the box?
  const [isFocused, setIsFocused] = useState(false)

  // The animation shows only while the box is empty and not clicked
  const showAnimation = value === '' && !isFocused

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className={styles.bar} onSubmit={handleSubmit} role="search">
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
          onBlur={() => setIsFocused(false)}
          aria-label="Search by telling your mood or destination"
          list="available-moods"
        />
        <datalist id="available-moods">
          {moods.map((mood) => (
            <option key={mood} value={mood} />
          ))}
        </datalist>

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
    </form>
  )
}

export default MoodSearchBar