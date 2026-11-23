import { properties } from '@/data/property'
import type { SavedItem } from './favoritesSlice'

// "v1" lets us change the saved shape later without breaking old data
const STORAGE_KEY = 'elsewhere:favorites:v1'

// Only ids that still exist in the data are accepted
const knownIds = new Set(properties.map((property) => property.id))

// Is this value really a saved item?
function isSavedItem(value: unknown): value is SavedItem {
  if (typeof value !== 'object' || value === null) return false

  const item = value as Record<string, unknown>

  return (
    typeof item.propertyId === 'string' &&
    typeof item.savedAt === 'string' &&
    knownIds.has(item.propertyId)
  )
}

// Read: never throws, falls back to an empty list
export function loadSavedItems(): SavedItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []

    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isSavedItem) : []
  } catch {
    return []
  }
}

// Write: never throws
export function saveSavedItems(items: SavedItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage is full or blocked: the app keeps working, it just won't remember
  }
}