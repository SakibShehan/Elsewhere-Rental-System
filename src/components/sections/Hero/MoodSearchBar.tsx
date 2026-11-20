import type { FormEvent, RefObject } from 'react'
import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import sparkleIcon from '@/assets/icons/sparkles.svg'
import TypingPlaceholder from './TypingPlaceholder'
import styles from './MoodSearchBar.module.css'

interface MoodSearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  inputRef: RefObject<HTMLInputElement | null>
}

function MoodSearchBar({
  value,
  onChange,
  onSubmit,
  inputRef,
}: MoodSearchBarProps) {
  const isEmpty = value === ''

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className={styles.bar} onSubmit={handleSubmit} role="search">
      <img src={sparkleIcon} alt="" className={styles.sparkle} />

      <div className={styles.inputWrap}>
        <input
          ref={inputRef}
          type="text"
          className={`${styles.input} ${isEmpty ? styles.inputEmpty : ''}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Search by telling your mood or destination"
        />

        {/* Only while the bar is empty: typing removes it, clearing brings it back */}
        {isEmpty && <TypingPlaceholder />}
      </div>

      <button
        type="submit"
        className={styles.submit}
        aria-label="Search stays"
        disabled={value.trim() === ''}
      >
        <img src={arrowRightIcon} alt="" />
      </button>
    </form>
  )
}

export default MoodSearchBar