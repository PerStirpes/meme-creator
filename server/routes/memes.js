const express = require('express')
const request = require('request')
const router = express.Router({mergeParams: true})
const db = require('../models')
const auth = require('../middleware/auth')

router.get('/', (req, res) => {
  db.User.findById(req.params.id)
    .populate('memes')
    .then(user => {
      res.status(200).send(user.memes)
    })
})

router.post('/', (req, res, next) => {
  const form = {
    text0: req.body.top,
    text1: req.body.bottom,
    template_id: req.body.template_id,
    username: process.env.IMG_FLIP_USERNAME,
    password: process.env.IMG_FLIP_PASSWORD
  }
  request.post(
    {
      url: 'https://api.imgflip.com/caption_image',
      form
    },
    (error, response, body) => {
      if (error || response.statusCode >= 400) {
        next(error)
      } else {
        body = JSON.parse(body)
        const newMeme = {
          top: req.body.top,
          bottom: req.body.bottom,
          url: body.data.url,
          user_id: req.params.id
        }
        db.Meme.create(newMeme).then(
          meme => {
            db.User.findById(req.params.id).then(user => {
              user.memes.push(meme.id)
              user.save().then(user => {
                res.status(200).send(meme)
              })
            })
          },
          err => next(err)
        )
      }
    }
  )
})

router.delete('/:meme_id', (req, res) => {
  db.Meme.findById(req.params.meme_id)
    .then(meme => {
      meme.remove().then(() => {
        res.status(204).send(meme)
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

module.exports = router
