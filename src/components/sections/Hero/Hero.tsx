import heroImage from '@/assets/images/Santorini Sunset Terrace View.png'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero}>
      <img className={styles.image} src={heroImage} alt="" />
      <div className={styles.overlay} />
    </section>
  )
}

export default Hero