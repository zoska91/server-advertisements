import express from 'express'
import jwt from 'jsonwebtoken'

import { FavoritesModel } from '../models/favorites.js'

const router = express.Router()

router.get('/user-favorites', async (req, res) => {
  const token = await req.headers.authorization.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'no logged user' })

  const { id } = jwt.verify(token, 'abfewvsdvarebr')

  const favorites = await FavoritesModel.find({
    userId: id,
  }).exec()

  if (favorites.length === 0) res.json('No results')
  else res.json(favorites)
})

router.put('/update', async (req, res) => {
  const token = await req.headers.authorization.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'no logged user' })
  console.log(token)
  const { id: userId } = jwt.verify(token, 'abfewvsdvarebr')
  const { advertisementId } = req.body
  console.log({ userId, advertisementId })
  const favorites = await FavoritesModel.findOne({
    userId,
    advertisementId,
  }).exec()
  console.log(favorites)
  let newFav = null

  if (favorites) {
    newFav = await FavoritesModel.findOneAndUpdate(
      { userId, advertisementId },
      { isFav: !favorites.isFav },
      { new: true }
    )
  } else {
    const createdFav = new FavoritesModel({
      userId,
      advertisementId,
      isFav: true,
    })
    console.log({ createdFav })

    newFav = await createdFav.save()
  }
  console.log({ newFav })
  if (!newFav) return res.status(400).json('Something went wrong')
  else res.json(newFav)
})

export default router
