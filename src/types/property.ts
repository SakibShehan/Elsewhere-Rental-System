export type PropertyCategory =
  | 'hidden-gems'
  | 'dream-escapes'
  | 'unusual-stays'
  | 'city-discoveries'
  | 'family-friendly'

export type PropertyTag = 'Nature' | 'Luxury' | 'Boutique'

export interface Property {
  id: string
  name: string
  location: string
  tag: PropertyTag
  rating: number
  reviewCount: number
  pricePerNight: number
  image: string
  categories: PropertyCategory[]
  moods: string[] // keywords used by the mood search later
}