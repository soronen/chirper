const express = require('express')
const {
  register,
  login,
  getUser
} = require('../controllers/userController')

const router = express.Router()

// POST register request
router.post('/register', register)

// POST login request
router.post('/login', login)

// GET user
router.get('/:id', getUser)


module.exports = router