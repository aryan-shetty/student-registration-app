require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const studentRoutes = require('./routes/student')
const coursesRoutes = require('./routes/courses')
const registrationsRoutes = require('./routes/registrations')

const app = express()

app.use(cors())
app.use(express.json())

// routes
app.use('/api/students', studentRoutes)
app.use('/api/courses', coursesRoutes)
app.use('/api/registrations', registrationsRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`)
    })
  })
  .catch ((error) => {
    console.log(error)
  })