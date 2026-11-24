import { Router, Request, Response } from 'express'

const router = Router()

router.get('/test', (_req: Request, res: Response) => {
  res.status(200).json({
    ok: true,
    message: 'Backend test route is working!',
  })
})

export default router