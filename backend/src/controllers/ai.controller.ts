import type { RequestHandler } from 'express'
import {
  detectMoodFromText,
  AIServiceError,
} from '../services/llm.service'

export const analyzeMood: RequestHandler = async (req, res, next) => {
  const text = typeof req.body?.text === 'string' ? req.body.text.trim() : ''

  if (!text) {
    res.status(400).json({ error: { message: 'Enter a description to search.' } })
    return
  }

  try {
    res.json(await detectMoodFromText(text))
  } catch (error) {
    if (error instanceof AIServiceError) {
      res.status(error.status).json({ error: { message: error.message } })
      return
    }

    next(error)
  }
}
