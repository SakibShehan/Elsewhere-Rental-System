import { useEffect, useRef, useState } from 'react'
import heroImage from '@/assets/images/Santorini Sunset Terrace View.png'
import { suggestions } from '@/data/suggestions'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { recordSearchPrompt, selectSearchPrompts } from '@/features/searchHistory/searchHistorySlice'
import MoodSearchBar from './MoodSearchBar'
import SuggestionPills from './SuggestionPills'
import styles from './Hero.module.css'

interface HeroProps {
  isSearching: boolean
  searchError: string | null
  onSearch: (mood: string) => void
}

function Hero({
  isSearching,
  searchError,
  onSearch,
}: HeroProps) {
  // The text in the search bar
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const searchPrompts = useAppSelector(selectSearchPrompts)

  useEffect(() => {
    function resetSearchOnPageShow() {
      setQuery('')
      inputRef.current?.blur()
    }

    window.addEventListener('pageshow', resetSearchOnPageShow)
    return () => window.removeEventListener('pageshow', resetSearchOnPageShow)
  }, [])

  function handleSuggestionSelect(prompt: string) {
    setQuery(prompt)
    inputRef.current?.focus()
  }

  function handleSearch() {
    if (isSearching) return
    const prompt = query.trim()
    if (!prompt) return

    dispatch(recordSearchPrompt(prompt))
    onSearch(prompt)
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
          searchPrompts={searchPrompts}
          isSearching={isSearching}
          onChange={setQuery}
          onSubmit={handleSearch}
          onSelect={setQuery}
          inputRef={inputRef}
        />

        <SuggestionPills
          suggestions={suggestions}
          onSelect={handleSuggestionSelect}
        />

        {isSearching && <p role="status">Finding the right mood...</p>}
        {searchError && <p role="alert">{searchError}</p>}
      </div>
       {/* <div className={styles.scrollHint} aria-hidden="true" /> */}
    </section>
  )
}

export default Hero