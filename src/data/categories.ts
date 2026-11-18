import cityIcon from '@/assets/icons/city-buildings.svg'
import familyIcon from '@/assets/icons/family.svg'
import gemIcon from '@/assets/icons/gem.svg'
import mountainIcon from '@/assets/icons/mountain.svg'
import sunIcon from '@/assets/icons/sun.svg'
import type { Category } from '@/types/category'

export const categories: Category[] = [
  { id: 'hidden-gems', label: 'Hidden Gems', icon: gemIcon },
  { id: 'dream-escapes', label: 'Dream Escapes', icon: sunIcon },
  { id: 'unusual-stays', label: 'Unusual Stays', icon: mountainIcon },
  { id: 'city-discoveries', label: 'City Discoveries', icon: cityIcon },
  { id: 'family-friendly', label: 'Family Friendly', icon: familyIcon },
]