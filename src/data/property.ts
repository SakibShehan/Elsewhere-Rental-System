import forestCabin from '@/assets/images/property-1.jpeg'
import oceanVilla from '@/assets/images/property-2.jpeg'
import cliffsideVilla from '@/assets/images/property-3.jpg'
import lakeshore from '@/assets/images/property-4.jpg'
import poolside from '@/assets/images/property-5.jpg'
import type { Property } from '../types/property'

export const properties: Property[] = [
  {
    id: 'forest-cabin-retreat',
    name: 'Forest Cabin Retreat',
    location: 'British Columbia, Canada',
    tag: 'Nature',
    rating: 4.9,
    reviewCount: 1200,
    pricePerNight: 180, 
    image: forestCabin,
    categories: ['hidden-gems', 'unusual-stays'],
    moods: ['peaceful', 'nature', 'quiet', 'escape', 'mountains', 'adventure'],
  },
  {
    id: 'ocean-villa',
    name: 'Ocean Villa',
    location: 'Maldives',
    tag: 'Luxury',
    rating: 4.8,
    reviewCount: 856,
    pricePerNight: 420,
    image: oceanVilla,
    categories: ['dream-escapes'],
    moods: ['romantic', 'beach', 'luxury', 'relaxing', 'getaway', 'spa'],
  },
  {
    id: 'cliffside-villa',
    name: 'Cliffside Villa',
    location: 'Amalfi Coast, Italy',
    tag: 'Boutique',
    rating: 4.9,
    reviewCount: 742,
    pricePerNight: 360,
    image: cliffsideVilla,
    categories: ['dream-escapes', 'hidden-gems'],
    moods: ['romantic', 'sea', 'views', 'getaway', 'beach'],
  },
   {
    id: 'Lakeshore-villa',
    name: 'Lakeshore Villa',
    location: 'Amalfi Coast, Italy',
    tag: 'Luxury',
    rating: 4.5,
    reviewCount: 700,
    pricePerNight: 360,
    image: lakeshore,
    categories: ['dream-escapes', 'hidden-gems'],
    moods: ['romantic', 'homely', 'swimming', 'getaway', 'city'],
  },
  {
    id: 'PoolView',
    name: 'PoolView',
    location: 'Bali, Indonesia',
    tag: 'Luxury',
    rating: 4.8,
    reviewCount: 824,
    pricePerNight: 400,
    image: poolside,
    categories: ['dream-escapes', 'hidden-gems'],
    moods: ['romantic', 'relaxing', 'swimming', 'getaway', 'Luxury'],
  }
]