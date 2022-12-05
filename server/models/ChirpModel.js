const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chirpSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 16,
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

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 16,
    },
    passHash: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 280,
    },
    pfpUrl: {
      type: String,
      required: true,
      maxLength: 100,
    },
    verified: {
      type: Boolean,
      required: true,
    },
    followers: [{
      username: {type: String, maxLength: 16,}
    }],
    follows: [{
      username: {type: String, maxLength: 16,}
    }],
  },
  { timestamps: true }
)


module.exports = mongoose.model('Chirp', chirpSchema)
module.exports = mongoose.model('User', userSchema)
