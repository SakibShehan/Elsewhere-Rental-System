import { Router } from 'express'
import { analyzeMood } from '../controllers/ai.controller'

const router = Router()

router.post('/mood', analyzeMood)

export default router
