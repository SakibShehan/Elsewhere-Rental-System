import leafIcon from '@/assets/icons/leaf.svg'
import mountainIcon from '@/assets/icons/mountain.svg'
import palmIcon from '@/assets/icons/tree.svg'
import spaIcon from '@/assets/icons/family.svg'
import type { Suggestion } from '@/types/search'

export const suggestions: Suggestion[] = [
  {
    label: 'A romantic getaway',
    query: 'romantic',
    icon: leafIcon,
  },
  {
    label: 'An adventure in the mountains',
    query: 'adventure',
    icon: mountainIcon,
  },
  {
    label: 'A beach holiday',
    query: 'beach',
    icon: palmIcon,
  },
  {
    label: 'A peaceful escape',
    query: 'peaceful',
    icon: spaIcon,
  },
]