import type { FormEvent, RefObject } from 'react'
import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import sparkleIcon from '@/assets/icons/sparkles.svg'
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
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className={styles.bar} onSubmit={handleSubmit} role="search">
      <img src={sparkleIcon} alt="" className={styles.sparkle} />

      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. I want a peaceful escape in nature..."
        aria-label="Describe how you feel"
      />

      <button
        type="submit"
        className={styles.submit}
        aria-label="Search stays"
        
      >
        <img src={arrowRightIcon} alt="" />
      </button>
    </form>
  )
}

export default MoodSearchBar