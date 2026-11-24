import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import PropertyCard from '@/components/property/PropertyCard/PropertyCard'
import Carousel from '@/components/ui/Carousel/Carousel'
import { properties } from '@/data/property'
import FavoriteButton from '@/features/favorites/FavoriteButton'
import CollectionIntro from './CollectionIntro'
import { useVisibleCount } from './useVisibleCount'
import styles from './PeacefulEscapes.module.css'

// Takes `count` items starting at `start`, wrapping around the end of the list
function getVisibleItems<T>(items: T[], start: number, count: number): T[] {
  const length = Math.min(count, items.length)

  return Array.from(
    { length },
    (_, offset) => items[(start + offset) % items.length],
  )
}

function PeacefulEscapes() {
  // 1, 2 or 3 depending on the screen
  const visibleCount = useVisibleCount()

  // The button is only needed when there are more cards than fit
  const canRotate = properties.length > visibleCount

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <CollectionIntro
          eyebrow="Handpicked for you"
          title="Peaceful Escapes"
          description="Unwind in extraordinary places around the world."
          buttonLabel="Explore Collection"
        />

        <Carousel
          count={properties.length}
          label="Peaceful escapes"
          className={styles.carousel}
        >
          {({ index, next }) => (
            <>
              {/* Columns come from the same number that picks the cards */}
              <ul
                className={styles.cards}
                style={{
                  gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
                }}
              >
                {getVisibleItems(properties, index, visibleCount).map(
                  (property) => (
                    <li key={property.id} className={styles.item}>
                      <PropertyCard property={property}>
                        <PropertyCard.Image />
                        <PropertyCard.Tag />
                        <PropertyCard.Actions>
                          <FavoriteButton
                            propertyId={property.id}
                            propertyName={property.name}
                          />
                        </PropertyCard.Actions>
                        <PropertyCard.Details>
                          <PropertyCard.Title />
                          <PropertyCard.Location />
                          <PropertyCard.Rating />
                          <PropertyCard.Price />
                        </PropertyCard.Details>
                      </PropertyCard>
                    </li>
                  ),
                )}
              </ul>

              {canRotate && (
                <button
                  type="button"
                  className={styles.next}
                  onClick={next}
                  aria-label="Show next stay"
                >
                  <img src={arrowRightIcon} alt="" />
                </button>
              )}
            </>
          )}
        </Carousel>
      </div>
    </section>
  )
}

export default PeacefulEscapes