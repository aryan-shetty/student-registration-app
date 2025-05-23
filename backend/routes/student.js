const express = require('express')
const Student = require('../models/studentModel')

const router = express.Router()

router.post('/', async (req, res) => {
  const {name, email} = req.body

  try {
    const student = await Student.create({name, email})
    res.json(student)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

router.get('/', async (req, res) => {
  const students = await Student.find()
  res.json(students)
})

router.patch('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
    res.json(updated)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id)
    res.json(deleted)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router