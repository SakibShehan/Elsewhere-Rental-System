import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import pinIcon from '@/assets/icons/location.svg'
import starIcon from '@/assets/icons/star-gold.svg'
import type { Property } from '@/types/property'
import { formatPrice, formatReviewCount } from '@/utils/format'
import styles from './PropertyCard.module.css'

// Context: shares the property with every part of the card
const PropertyContext = createContext<Property | null>(null)

function useProperty() {
  const property = useContext(PropertyContext)

  if (!property) {
    throw new Error('Card parts must be used inside <PropertyCard>')
  }

  return property
}

// Root
interface PropertyCardProps {
  property: Property
  children: ReactNode
}

function PropertyCard({ property, children }: PropertyCardProps) {
  return (
    <PropertyContext.Provider value={property}>
      <article className={styles.card}>{children}</article>
    </PropertyContext.Provider>
  )
}

// Parts
function CardImage() {
  const property = useProperty()

  return (
    <>
      {/* alt is empty because the title already names the place */}
      <img src={property.image} alt="" className={styles.image} />
      <div className={styles.overlay} />
    </>
  )
}

function CardTag() {
  const property = useProperty()
  return <span className={styles.tag}>{property.tag}</span>
}

// Slot for buttons (the heart goes here)
function CardActions({ children }: { children: ReactNode }) {
  return <div className={styles.actions}>{children}</div>
}

function CardDetails({ children }: { children: ReactNode }) {
  return <div className={styles.details}>{children}</div>
}

function CardTitle() {
  const property = useProperty()
  return <h3 className={styles.title}>{property.name}</h3>
}

function CardLocation() {
  const property = useProperty()

  return (
    <p className={styles.location}>
      <img src={pinIcon} alt="" className={styles.pin} />
      {property.location}
    </p>
  )
}

function CardRating() {
  const property = useProperty()

  return (
    <p className={styles.rating}>
      <img src={starIcon} alt="" className={styles.star} />
      <strong>{property.rating.toFixed(1)}</strong>
      <span>({formatReviewCount(property.reviewCount)} reviews)</span>
    </p>
  )
}

function CardPrice() {
  const property = useProperty()

  return (
    <p className={styles.price}>
      From <strong>{formatPrice(property.pricePerNight)}</strong> / night
    </p>
  )
}

// Attach the parts to the root: <PropertyCard.Title />
PropertyCard.Image = CardImage
PropertyCard.Tag = CardTag
PropertyCard.Actions = CardActions
PropertyCard.Details = CardDetails
PropertyCard.Title = CardTitle
PropertyCard.Location = CardLocation
PropertyCard.Rating = CardRating
PropertyCard.Price = CardPrice

export default PropertyCard