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
    images: {
      type: [String],
      validate: [
        {
          validator: value => value.length <= 4,
          message: 'Array must have a length of 0-4',
        },
        {
          validator: value => value.every(str => str.length <= 100),
          message: 'Strings in array must be less than 100 characters long',
        },
      ],
    },
    likes: [{
      type: String,
      maxlength: 16
    }],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Chirp', chirpSchema)

