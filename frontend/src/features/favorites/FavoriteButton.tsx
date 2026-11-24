import heartFilled from '@/assets/icons/heart-filled.svg'
import heartOutline from '@/assets/icons/love.svg'
import { useFavorite } from './useFavorite'
import styles from './FavoriteButton.module.css'

interface FavoriteButtonProps {
  propertyId: string
  propertyName: string
}

function FavoriteButton({ propertyId, propertyName }: FavoriteButtonProps) {
  const { isSaved, toggle } = useFavorite(propertyId)

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
      aria-pressed={isSaved}
      aria-label={`Save ${propertyName}`}
    >
      <img
        src={isSaved ? heartFilled : heartOutline}
        alt=""
        className={`${styles.icon} ${isSaved ? '' : styles.outline}`}
      />
    </button>
  )
}

export default FavoriteButton