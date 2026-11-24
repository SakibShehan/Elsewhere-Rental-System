import arrowRightIcon from '@/assets/icons/arrow-right.svg'
import Carousel from '../../ui/Carousel/Carousel'
import { stories } from '../../../data/stories'
import styles from './InspirationBanner.module.css'

function InspirationBanner() {
  return (
    <section className={styles.section}>
      <Carousel
        count={stories.length}
        autoPlayMs={5000}
        label="Travel inspiration"
        className={styles.banner}
      >
        {({ index, count, next, prev }) => (
          <>
            {/* All photos are stacked; only the current one is visible */}
            {stories.map((story, position) => (
              <img
                key={story.id}
                src={story.image}
                alt=""
                className={`${styles.image} ${
                  position === index ? styles.imageActive : ''
                }`}
              />
            ))}

            <div className={styles.overlay} />

            {/* New key = new element = the fade-in animation plays again */}
            <div key={stories[index].id} className={styles.content}>
              <p className={styles.eyebrow}>Travel inspiration</p>
              <h2 className={styles.title}>{stories[index].title}</h2>
              <button type="button" className={styles.link}>
                Explore more stories →
              </button>
            </div>

            <div className={styles.controls}>
              <span className={styles.counter}>
                {index + 1} / {count}
              </span>
              <button
                type="button"
                className={`${styles.round} ${styles.prev}`}
                onClick={prev}
                aria-label="Previous story"
              >
                <img src={arrowRightIcon} alt="" />
              </button>
              <button
                type="button"
                className={styles.round}
                onClick={next}
                aria-label="Next story"
              >
                <img src={arrowRightIcon} alt="" />
              </button>
            </div>
          </>
        )}
      </Carousel>
    </section>
  )
}

export default InspirationBanner