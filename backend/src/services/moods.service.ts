import fs from 'node:fs'
import path from 'node:path'
import type { Property } from '../types/property'

// backend/data/moods: the same path works from src/ (dev) and dist/ (build)
const DATA_DIR = path.join(__dirname, '../../data/moods')

// Stop with a message that says exactly where the data is wrong
function fail(where: string, problem: string): never {
  throw new Error(`Bad data in ${where}: ${problem}`)
}

// Check one item of a file and turn it into a Property
function toProperty(raw: unknown, mood: string, where: string): Property {
  if (typeof raw !== 'object' || raw === null) {
    fail(where, 'each item must be an object { ... }')
  }

  const {
    id,
    name,
    location,
    mood: itemMood,
    rating,
    reviewCount,
    pricePerNight,
    categories,
  } = raw as Record<string, unknown>

  if (typeof id !== 'number' || !Number.isInteger(id)) {
    fail(where, '"id" must be a whole number')
  }
  if (typeof name !== 'string' || name.trim() === '') {
    fail(where, '"name" must be text')
  }
  if (typeof location !== 'string' || location.trim() === '') {
    fail(where, '"location" must be text')
  }
  if (typeof itemMood !== 'string' || itemMood.toLowerCase() !== mood) {
    fail(where, `"mood" must be "${mood}" (the same as the file name)`)
  }
  if (typeof rating !== 'number' || rating < 0 || rating > 5) {
    fail(where, '"rating" must be a number from 0 to 5')
  }
  if (typeof reviewCount !== 'number' || !Number.isInteger(reviewCount) || reviewCount < 0) {
    fail(where, '"reviewCount" must be a whole number, 0 or more')
  }
  if (typeof pricePerNight !== 'number' || pricePerNight < 0) {
    fail(where, '"pricePerNight" must be a number, 0 or more')
  }
  if (!Array.isArray(categories) || !categories.every((c) => typeof c === 'string')) {
    fail(where, '"categories" must be a list of text, like ["Villas", "Luxury"]')
  }

  return { id, name, location, mood: itemMood, rating, reviewCount, pricePerNight, categories }
}

// Read every file in data/moods: { "romantic" => [...], "beach" => [...] }
function loadAll(): Map<string, Property[]> {
  if (!fs.existsSync(DATA_DIR)) {
    throw new Error(`Data folder not found: ${DATA_DIR}`)
  }

  const files = fs
    .readdirSync(DATA_DIR)
    .filter((file) => file.endsWith('.json'))
    .sort()

  if (files.length === 0) {
    throw new Error(`No .json files found in ${DATA_DIR}`)
  }

  const byMood = new Map<string, Property[]>()
  const seenIds = new Map<number, string>() // id -> where it was first used

  for (const file of files) {
    // The file name is the mood: romantic.json -> "romantic"
    const mood = path.basename(file, '.json').toLowerCase()

    let raw: unknown
    try {
      raw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'))
    } catch (error) {
      fail(file, `not valid JSON (${(error as Error).message})`)
    }

    if (!Array.isArray(raw)) {
      fail(file, 'the file must contain a list [ ... ] of properties')
    }

    const properties = raw.map((item, index) => {
      const where = `${file}, item ${index + 1}`
      const property = toProperty(item, mood, where)

      // An id may appear only once across all files
      const firstUse = seenIds.get(property.id)
      if (firstUse) {
        fail(where, `id ${property.id} is already used in ${firstUse}`)
      }
      seenIds.set(property.id, where)

      return property
    })

    byMood.set(mood, properties)
  }

  return byMood
}

// Runs once, when this file is first imported (at server start)
const propertiesByMood = loadAll()

// ["adventure", "beach", ...]
export function getMoods(): string[] {
  return [...propertiesByMood.keys()]
}

// The properties of one mood, or undefined if there is no such mood
export function getPropertiesByMood(mood: string): Property[] | undefined {
  return propertiesByMood.get(mood.trim().toLowerCase())
}