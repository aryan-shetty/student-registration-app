const express = require('express')
const Registration = require('../models/registrationsModel')

const router = express.Router()

router.post('/', async (req, res) => {
  const {student, course, registered_at} = req.body

  try {
    const registration = await Registration.create({student, course, registered_at})
    const populated = await registration.populate(['student', 'course'])
    res.json(populated)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

router.get('/', async (req, res) => {
  const registrations = await Registration.find().populate(['student', 'course'])
  res.json(registrations)
})

router.patch('/:id', async (req, res) => {
  try {
    const updated = await Registration.findByIdAndUpdate(req.params.id, {...req.body}, {new: true}).populate(['student', 'course'])
    res.json(updated)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id)
    res.json(deleted)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router