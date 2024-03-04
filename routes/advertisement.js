import express from 'express'
import jwt from 'jsonwebtoken'

import { AdvertisementModel } from '../models/advertisement.js'
// import { AdvertisementModel } from '../models/advertisement.js'

const router = express.Router()

router.get('/all-user', async (req, res) => {
  if (!req.headers?.authorization)
    return res.status(401).json({ message: 'no logged user' })

  const token = await req.headers.authorization.split(' ')[1]
  const { id } = jwt.verify(token, 'abfewvsdvarebr')

  const advertisements = await AdvertisementModel.find({
    userId: id,
  }).exec()

  if (advertisements.length === 0) res.json([])
  else res.json(advertisements)
})

router.get('/all', async (req, res) => {
  const advertisements = await AdvertisementModel.find().exec()

  if (advertisements.length === 0) res.json([])
  else res.json(advertisements)
})

router.post('/add', async (req, res) => {
  const token = await req.headers.authorization.split(' ')[1]
  console.log(token)

  let id = null
  if (token) id = jwt.verify(token, 'abfewvsdvarebr').id

  const newAdvertisement = new AdvertisementModel({
    ...req.body,
    userId: id,
    createDate: new Date(),
  })

  const advertisementData = await newAdvertisement.save()
  if (!advertisementData)
    return res.status(400).json('Something wrong with saving user')

  res.json({ message: 'success' })
})

export default router
