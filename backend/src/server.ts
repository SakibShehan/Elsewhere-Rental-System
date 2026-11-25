import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import type { ErrorRequestHandler } from 'express'
import fs from 'node:fs'
import path from 'node:path'
import aiRoutes from './routes/ai.routes'
import propertiesRoutes from './routes/properties.routes'
import testRoutes from './routes/test.routes'
import { getMoods } from './services/moods.service'


// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || 'http://localhost:5173',
//     credentials: true,
//   }),
// )
// app.use(express.json())

// app.use('/api', testRoutes)

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`)
// })




const app = express()
const port = Number(process.env.PORT) || 5000

// The built frontend (made by "npm run build" inside frontend/)
const frontendDist = path.join(__dirname, '../../frontend/dist')

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

// 1. API routes: /api/...
app.use('/api', testRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api', propertiesRoutes)

// 2. Unknown /api address: answer with JSON, not with the web page
app.use('/api', (req, res) => {
  res.status(404).json({
    error: { message: `Not found: ${req.method} ${req.originalUrl}` },
  })
})

// 3. Files of the built frontend: JS, CSS, images
app.use(express.static(frontendDist))

// 4. Any other address (/home, ...): send the React page
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'))
})

// 5. Errors: always answer with JSON
const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  // Too late to change the answer: let Express finish it
  if (res.headersSent) {
    next(err)
    return
  }

  console.error(err)

  const status = typeof err?.status === 'number' ? err.status : 500
  res.status(status).json({
    error: { message: status >= 500 ? 'Something went wrong' : err.message },
  })
}
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  console.log(`Moods loaded: ${getMoods().join(', ')}`)

  if (
    !process.env.LLM_PROVIDER ||
    !process.env.LLM_MODEL ||
    !process.env.LLM_API_KEY ||
    !process.env.LLM_BASE_URL
  ) {
    console.warn('LLM configuration is incomplete: AI search will not work yet')
  }
  if (!fs.existsSync(frontendDist)) {
    console.warn('Frontend not built yet: run "npm run build" inside frontend/')
  }
})