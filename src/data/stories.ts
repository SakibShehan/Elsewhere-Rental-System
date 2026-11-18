import balloonsImage from '@/assets/images/Sunrise Hot Air Balloon Valley.png'
import forestImage from '@/assets/images/property-1.jpeg'
import heroImage from '@/assets/images/Santorini Sunset Terrace View.png'
import type { Story } from '@/types/story'

export const stories: Story[] = [
  {
    id: 'unexpected-places',
    title: 'Unexpected Places, Unforgettable Stays',
    image: balloonsImage,
  },
  {
    id: 'slow-mornings',
    title: 'Slow Mornings by the Sea',
    image: heroImage,
  },
  {
    id: 'forest-and-lake',
    title: 'Where the Forest Meets the Lake',
    image: forestImage,
  },
]