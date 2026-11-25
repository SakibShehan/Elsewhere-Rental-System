import type { RequestHandler } from 'express'
import { getMoods, getPropertiesByMood } from '../services/moods.service'

// GET /api/moods  ->  { moods: ["adventure", "beach", ...] }
export const listMoods: RequestHandler = (_req, res) => {
  res.json({ moods: getMoods() })
}

// GET /api/properties?mood=romantic  ->  { mood, count, properties: [...] }
export const listProperties: RequestHandler = (req, res) => {
  const mood =
    typeof req.query.mood === 'string' ? req.query.mood.trim().toLowerCase() : ''

  // No mood in the address
  if (mood === '') {
    res.status(400).json({
      error: { message: `Add ?mood=... Available moods: ${getMoods().join(', ')}` },
    })
    return
  }

  const properties = getPropertiesByMood(mood)

  // A mood that has no file
  if (!properties) {
    res.status(404).json({
      error: { message: `Unknown mood "${mood}". Available: ${getMoods().join(', ')}` },
    })
    return
  }

  res.json({ mood, count: properties.length, properties })
}