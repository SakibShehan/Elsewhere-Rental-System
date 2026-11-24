import type { NavMenu } from '@/types/navigation'

// "#" links for now, real pages come with the backend
export const navMenus: NavMenu[] = [
  {
    label: 'Discover',
    items: [
      { label: 'Hidden Gems', href: '#' },
      { label: 'Unusual Stays', href: '#' },
      { label: 'City Discoveries', href: '#' },
    ],
  },
  {
    label: 'Collections',
    items: [
      { label: 'Peaceful Escapes', href: '#' },
      { label: 'Romantic Getaways', href: '#' },
      { label: 'Beach Holidays', href: '#' },
    ],
  },
  {
    label: 'Destinations',
    items: [
      { label: 'Maldives', href: '#' },
      { label: 'Amalfi Coast', href: '#' },
      { label: 'British Columbia', href: '#' },
    ],
  },
]