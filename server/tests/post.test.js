const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')



afterAll(() => {
    mongoose.connection.close()
})