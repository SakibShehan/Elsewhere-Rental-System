import Hero from '@/components/sections/Hero/Hero'
import styles from './HomePage.module.css'
import Navbar from '@/components/layout/Navbar/Navbar'

function HomePage() {
  return (
    <div className={styles.page}>
         <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}

export default HomePage