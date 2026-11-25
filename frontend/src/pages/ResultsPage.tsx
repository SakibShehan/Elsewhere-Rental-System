import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar/Navbar'
import Footer from '@/components/layout/Footer/Footer'
import { fetchPropertiesByMood } from '@/services/properties'
import type { MoodPropertiesResponse } from '@/services/properties'
import { formatPrice, formatReviewCount } from '@/utils/format'
import styles from './ResultsPage.module.css'

function ResultsPage() {
  const params = new URLSearchParams(window.location.search)
  const mood = params.get('mood')?.trim() ?? ''
  const reason = params.get('reason')?.trim() ?? ''
  const [results, setResults] = useState<MoodPropertiesResponse | null>(null)
  const [isLoading, setIsLoading] = useState(Boolean(mood))
  const [error, setError] = useState<string | null>(
    mood ? null : 'No mood was provided. Please start a new search.',
  )

  useEffect(() => {
    if (!mood) return

    let isCurrent = true

    fetchPropertiesByMood(mood)
      .then((response) => {
        if (isCurrent) setResults(response)
      })
      .catch((requestError: unknown) => {
        if (isCurrent) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Could not load matching properties.',
          )
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [mood])

  return (
    <>
      <Navbar variant="solid" />
      <main className={styles.page}>
        <div className={styles.content}>
          <a className={styles.back} href="/">
            Back to search
          </a>

          {isLoading && <p role="status">Loading stays...</p>}
          {error && <p className={styles.error} role="alert">{error}</p>}

          {results && (
            <>
              <p className={styles.eyebrow}>Your mood, your stay</p>
              <h1 className={styles.title}>
                {results.count} {results.count === 1 ? 'stay' : 'stays'} for{' '}
                {results.mood}
              </h1>
              {reason && <p className={styles.reason}>{reason}</p>}

              {results.properties.length === 0 ? (
                <p>No properties match this mood yet.</p>
              ) : (
                <ul className={styles.list}>
                  {results.properties.map((property) => (
                    <li className={styles.card} key={property.id}>
                      <h2 className={styles.name}>{property.name}</h2>
                      <p className={styles.location}>{property.location}</p>
                      <p className={styles.details}>
                        <span>
                          {property.rating.toFixed(1)} ·{' '}
                          {formatReviewCount(property.reviewCount)} reviews
                        </span>
                        <span>{formatPrice(property.pricePerNight)} / night</span>
                      </p>
                      <p className={styles.categories}>
                        {property.categories.join(' · ')}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ResultsPage
