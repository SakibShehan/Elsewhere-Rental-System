import type { Category } from '@/types/category'
import styles from './CategoryItem.module.css'

interface CategoryItemProps {
  category: Category
}

function CategoryItem({ category }: CategoryItemProps) {
  return (
    <button type="button" className={styles.item}>
      <img src={category.icon} alt="" className={styles.icon} />
      <span className={styles.label}>{category.label}</span>
    </button>
  )
}

export default CategoryItem