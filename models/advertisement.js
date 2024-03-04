import mongoose from 'mongoose'

const AdvertisementSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  phone: { type: String },
  province: { type: String },
  type: { type: String },
  price: { type: String },
  category: { type: String },
  city: { type: String },
  userId: { type: String },
})

export const AdvertisementModel = mongoose.model(
  'Advertisement',
  AdvertisementSchema
)
