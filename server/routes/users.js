const express = require('express')
const router = express.Router()
const db = require('../models')
const auth = require('../middleware/auth')

router.get('/', (req, res) => {
  db.User.find().then(users => {
    res.status(200).send(users)
  })
})

router.get('/:id', (req, res) => {
  db.User.findById(req.params.id).then(user => {
    res.status(200).send(user)
  })
})

router.post('/', (req, res) => {
  db.User.create(req.body).then(user => {
    res.status(201).send(user)
  })
})

router.patch('/:id', auth.ensureCorrectUser, (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).then(user => {
    res.status(200).send(user)
  })
})

router.delete('/:id', auth.ensureCorrectUser, (req, res) => {
  db.User.findByIdAndRemove(req.params.id).then(user => {
    res.status(204).send(user)
  })
})

module.exports = router
