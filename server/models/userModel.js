const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        type: String,
        maxlength: 16
      }],
      follows: [{
        type: String,
        maxlength: 16
      }],
    },
    { timestamps: true }
  )

module.exports = mongoose.model('User', userSchema)