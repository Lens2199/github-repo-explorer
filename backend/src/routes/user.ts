import express, { Response } from 'express'
import User from '../models/User'
import { protect, AuthRequest } from '../middleware/auth'

const router = express.Router()

// GET /user/favorites - get all favorites
router.get('/favorites', protect, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    res.status(200).json(user.favorites)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /user/favorites - save a repo
router.post('/favorites', protect, async (req: AuthRequest, res) => {
  const { repoId, name, html_url } = req.body
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    user.favorites.push({ repoId, name, html_url })
    await user.save()
    res.status(201).json(user.favorites)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /user/favorites/:id - remove a repo
router.delete('/favorites/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }
    user.favorites = user.favorites.filter(
      (fav) => (fav as any)._id?.toString() !== req.params.id
    )
    await user.save()
    res.status(200).json(user.favorites)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

export default router