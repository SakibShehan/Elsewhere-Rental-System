import { categories } from '@/data/categories'
import CategoryItem from './CategoryItem'
import styles from './CategoryBar.module.css'

function CategoryBar() {
  return (
    <section className={styles.section}>
      <div className="container">
        <nav className={styles.bar} aria-label="Browse by category">
          <ul className={styles.list}>
            {categories.map((category) => (
              <li key={category.id} className={styles.cell}>
                <CategoryItem category={category} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default CategoryBar