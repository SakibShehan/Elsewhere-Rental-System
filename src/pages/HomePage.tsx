import Hero from '@/components/sections/Hero/Hero'
import styles from './HomePage.module.css'
import Navbar from '@/components/layout/Navbar/Navbar'
import CategoryBar from '@/components/sections/CategoryBar/CategoryBar'
import PeacefulEscapes from '@/components/sections/PeacefulEscapes/PeacefulEscapes'
import InspirationBanner from '@/components/sections/InspirationBanner/InspirationBanner'


function HomePage() {
  return (
    <div className={styles.page}>
         <Navbar />
      <main>
        <Hero />
        <CategoryBar />
         <PeacefulEscapes />
              <InspirationBanner />
      </main>
    </div>
  )
}

export default HomePage