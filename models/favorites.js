import mongoose from 'mongoose'

const FavoritesSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  advertisementId: { type: String, require: true },
  isFav: { type: Boolean, require: true },
})

export const FavoritesModel = mongoose.model('Favorites', FavoritesSchema)
