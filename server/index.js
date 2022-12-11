require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors')


const postRoutes = require('./routes/postRouter')
const userRoutes = require('./routes/userRouters')
const imageRoutes = require('./routes/imageRouter')

// express app
const server = express()

// middleware
server.use(express.json())
server.use(cors())
server.use(morgan(':remote-addr :method :url :status'));


// routes
server.use('/api/posts', postRoutes)
server.use('/api/user', userRoutes)
server.use('/api/image', imageRoutes)



// connect to db
mongoose.connect(process.env.DB_URL)
  .then(() => {
    // listen for requests
    server.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT || 4000)
    })
  })
  .catch((error) => {
    console.log(error)
})


module.exports = server