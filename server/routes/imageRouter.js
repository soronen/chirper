const express = require('express')
const {
  upload
} = require('../controllers/imageController')

const {auth} = require('../auth/authentication')

const router = express.Router()

// upload image
router.post('/upload', auth, upload)

module.exports = router