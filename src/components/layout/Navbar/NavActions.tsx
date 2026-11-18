import bookmarkIcon from '@/assets/icons/save.svg'
import heartIcon from '@/assets/icons/love.svg'
import searchIcon from '@/assets/icons/search.svg'
import { useAppSelector } from '@/app/hooks'
import { selectSavedCount } from '@/features/favorites/favoritesSlice'
import styles from './NavActions.module.css'

function NavActions() {
  // Read the saved count from the store
  const savedCount = useAppSelector(selectSavedCount)

  return (
    <div className={styles.actions}>
      <button type="button" className={styles.iconButton} aria-label="Search">
        <img src={searchIcon} alt="" />
      </button>

      <button
        type="button"
        className={styles.iconButton}
        aria-label={
          savedCount > 0 ? `Favorites, ${savedCount} saved` : 'Favorites'
        }
      >
                {savedCount > 0 && <span className={styles.badge}>{savedCount}</span>}

        <img src={heartIcon} alt="" />
      </button>

      <button type="button" className={styles.savedButton}>
        <img src={bookmarkIcon} alt="" />
        Saved ({savedCount})
      </button>
    </div>
  )
}

export default NavActions