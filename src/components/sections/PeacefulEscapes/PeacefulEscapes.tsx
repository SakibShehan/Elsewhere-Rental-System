import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import PropertyCard from '@/components/property/PropertyCard/PropertyCard'
import Carousel from '@/components/ui/Carousel/Carousel'
import { properties } from '@/data/property'
import FavoriteButton from '@/features/favorites/FavoriteButton'
import CollectionIntro from './CollectionIntro'
import styles from './PeacefulEscapes.module.css'

// How many cards are visible at once
const VISIBLE_COUNT = 3

// Takes `count` items starting at `start`, wrapping around the end of the list
function getVisibleItems<T>(items: T[], start: number, count: number): T[] {
  const length = Math.min(count, items.length)

  return Array.from(
    { length },
    (_, offset) => items[(start + offset) % items.length],
  )
}

function PeacefulEscapes() {
  // The button is only needed when there are more cards than fit
  const canRotate = properties.length > VISIBLE_COUNT

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
              <ul className={styles.cards}>
                {getVisibleItems(properties, index, VISIBLE_COUNT).map(
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