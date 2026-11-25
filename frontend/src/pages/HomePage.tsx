import { useEffect, useState } from 'react'
import Hero from '@/components/sections/Hero/Hero'
import styles from './HomePage.module.css'
import Navbar from '@/components/layout/Navbar/Navbar'
import CategoryBar from '@/components/sections/CategoryBar/CategoryBar'
import PeacefulEscapes from '@/components/sections/PeacefulEscapes/PeacefulEscapes'
import InspirationBanner from '@/components/sections/InspirationBanner/InspirationBanner'
import Footer from '@/components/layout/Footer/Footer'
import {
  detectMood,
  fetchMoods,
} from '@/services/properties'

function HomePage() {
  const [moods, setMoods] = useState<string[]>([])
  const [moodError, setMoodError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  useEffect(() => {
    let isCurrent = true

    fetchMoods()
      .then((availableMoods) => {
        if (isCurrent) setMoods(availableMoods)
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setMoodError(
            error instanceof Error
              ? `Could not load available moods: ${error.message}`
              : 'Could not load available moods.',
          )
        }
      })

    return () => {
      isCurrent = false
    }
  }, [])

  async function handleSearch(description: string) {
    setIsSearching(true)
    setSearchError(null)

    try {
      const { mood, reason } = await detectMood(description)
      const query = new URLSearchParams({ mood, reason })
      window.location.assign(`/results?${query}`)
    } catch (error) {
      setSearchError(
        error instanceof Error ? error.message : 'Could not detect a mood.',
      )
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className={styles.page}>
         <Navbar />
      <main>
        <Hero
          moods={moods}
          moodError={moodError}
          isSearching={isSearching}
          searchError={searchError}
          onSearch={handleSearch}
        />
        <CategoryBar />
         <PeacefulEscapes />
              <InspirationBanner />
              <Footer/>
      </main>
    </div>
  )
}

export default HomePage