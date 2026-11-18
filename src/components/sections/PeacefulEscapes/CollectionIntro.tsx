import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import styles from './CollectionIntro.module.css'

interface CollectionIntroProps {
  eyebrow: string
  title: string
  description: string
  buttonLabel: string
}

function CollectionIntro({
  eyebrow,
  title,
  description,
  buttonLabel,
}: CollectionIntroProps) {
  return (
    <div className={styles.intro}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      {/* Does nothing yet: a real page for the collection comes with the backend */}
      <button type="button" className={styles.button}>
        {buttonLabel}
        <img src={arrowRightIcon} alt="" className={styles.arrow} />
      </button>
    </div>
  )
}

export default CollectionIntro