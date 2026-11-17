import leafIcon from '@/assets/icons/leaf.svg'
import mountainIcon from '@/assets/icons/mountain.svg'
import palmIcon from '@/assets/icons/tree.svg'
import spaIcon from '@/assets/icons/family.svg'
import type { Suggestion } from '@/types/search'

export const suggestions: Suggestion[] = [
  {
    label: 'A romantic getaway',
    query: 'I want a romantic getaway',
    icon: leafIcon,
  },
  {
    label: 'An adventure in the mountains',
    query: 'I want an adventure in the mountains',
    icon: mountainIcon,
  },
  {
    label: 'A beach holiday',
    query: 'I want a beach holiday',
    icon: palmIcon,
  },
  {
    label: 'A relaxing spa retreat',
    query: 'I want a relaxing spa retreat',
    icon: spaIcon,
  },
]