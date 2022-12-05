const mongoose = require('mongoose')

const Schema = mongoose.Schema
const chirpSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxLength: 280,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Chirp', chirpSchema)
