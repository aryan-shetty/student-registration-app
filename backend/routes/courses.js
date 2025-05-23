const express = require('express')
const Course = require('../models/coursesModel')

const router = express.Router()

router.post('/', async (req, res) => {
  const {title, description} = req.body

  try {
    const course = await Course.create({title, description})
    res.json(course)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

router.get('/', async (req, res) => {
  const courses = await Course.find()
  res.json(courses)
})

router.patch('/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
    res.json(updated)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id)
    res.json(deleted)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router