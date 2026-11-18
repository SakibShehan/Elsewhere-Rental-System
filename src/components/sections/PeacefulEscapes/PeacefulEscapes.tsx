import PropertyCard from '@/components/property/PropertyCard/PropertyCard'
import { properties } from '@/data/property'
import FavoriteButton from '@/features/favorites/FavoriteButton'
import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import CollectionIntro from './CollectionIntro'
import styles from './PeacefulEscapes.module.css'

function PeacefulEscapes() {
    return (
        <section className={styles.section}>
            <div className={styles.layout}>
                <CollectionIntro
                    eyebrow="Handpicked for you"
                    title="Peaceful Escapes"
                    description="Unwind in extraordinary places around the world."
                    buttonLabel="Explore Collection"
                />

                {/* Wrapper: cards and button together, so the button can sit on the cards */}
                <div className={styles.carousel}>
                    <ul className={styles.cards}>
                        {properties.map((property) => (
                            <li key={property.id}>
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
                        ))}
                    </ul>

                    <button type="button" className={styles.next} aria-label="Next">
                        <img src={arrowRightIcon} alt="" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PeacefulEscapes