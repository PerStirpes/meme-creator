require('dotenv').load()

const express = require('express')
const router = express.Router()
const db = require('../models')
const jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
  db.User.findOne({username: req.body.username}).then(
    user => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          const token = jwt.sign({user_id: user.id}, process.env.SECRET_KEY)
          res.status(200).send({id: user.id, token})
        } else {
          res.status(400).send('Invalid Credentials')
        }
      })
    },
    function(err) {
      res.status(400).send('Invalid Credentials')
    }
  )
})

router.post('/signup', (req, res) => {
  db.User.create(req.body).then(user => {
    const token = jwt.sign({user_id: user.id}, process.env.SECRET_KEY)
    res.status(200).send({id: user.id, token})
  })
})

router.get('/logout', (req, res) => {
  req.session.user_id = null
  req.flash('message', 'logged out!')
  res.redirect('/login')
})

module.exports = router
