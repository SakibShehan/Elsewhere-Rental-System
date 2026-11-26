import { useState } from 'react'
import Hero from '@/components/sections/Hero/Hero'
import styles from './HomePage.module.css'
import Navbar from '@/components/layout/Navbar/Navbar'
import CategoryBar from '@/components/sections/CategoryBar/CategoryBar'
import PeacefulEscapes from '@/components/sections/PeacefulEscapes/PeacefulEscapes'
import InspirationBanner from '@/components/sections/InspirationBanner/InspirationBanner'
import Footer from '@/components/layout/Footer/Footer'
import { detectMood } from '@/services/properties'

function HomePage() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

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