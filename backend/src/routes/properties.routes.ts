import { Router } from 'express'
import { listMoods, listProperties } from '../controllers/properties.controller'

const router = Router()

router.get('/moods', listMoods)
router.get('/properties', listProperties)

export default router