import Hero from '@/components/sections/Hero/Hero'
import styles from './HomePage.module.css'
import Navbar from '@/components/layout/Navbar/Navbar'
import CategoryBar from '@/components/sections/CategoryBar/CategoryBar'


function HomePage() {
  return (
    <div className={styles.page}>
         <Navbar />
      <main>
        <Hero />
        <CategoryBar />
      </main>
    </div>
  )
}

export default HomePage