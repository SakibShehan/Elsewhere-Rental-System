import { useRef, useState } from 'react'
import heroImage from '@/assets/images/Santorini Sunset Terrace View.png'
import { suggestions } from '@/data/suggestions'
import MoodSearchBar from './MoodSearchBar'
import SuggestionPills from './SuggestionPills'
import styles from './Hero.module.css'

function Hero() {
  // The text in the search bar
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Pill click: fill the search bar and focus it
  function handleSuggestionSelect(text: string) {
    setQuery(text)
    inputRef.current?.focus()
  }

  // Temporary: real search comes in commit 5
  function handleSearch() {
    console.log('Search:', query)
  }

  return (
    <section className={styles.hero}>
      <img className={styles.image} src={heroImage} alt="" />
      <div className={styles.overlay} />

      {/* <div className={`container ${styles.content}`}> */}
      <div className={styles.content}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Find somewhere extraordinary</p>
          <h1 className={styles.title}>Tell us how you feel…</h1>
         <p className={styles.subtitle}>
  and we’ll help you{' '}
  <span className={styles.accent}>
    find the perfect stay.
    {/* Painted stroke: a filled shape, thick in the middle, thin at both ends */}
    <svg
      className={styles.swoosh}
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2 9 C70 5.5 170 4 296 6.5 C200 8 90 9.5 2 9 Z" />
    </svg>
  </span>
</p>
        </div>

        <MoodSearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          inputRef={inputRef}
        />

        <SuggestionPills
          suggestions={suggestions}
          onSelect={handleSuggestionSelect}
        />
      </div>
       {/* <div className={styles.scrollHint} aria-hidden="true" /> */}
    </section>
  )
}

export default Hero