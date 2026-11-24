import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import testRoutes from './routes/test.routes'

const app = express()
const port = Number(process.env.PORT) || 5000

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())

app.use('/api', testRoutes)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})