const mongoose = require('mongoose')
const User = require('./user')

const memeSchema = new mongoose.Schema(
  {
    top: {
      type: String,
      required: true
    },
    bottom: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
)

memeSchema.pre('remove', next => {
  User.findById(this.user_id)
    .then(user => {
      user.memes.remove(this.id)
      user.save().then(function(e) {
        next()
      })
    })
    .catch(err => {
      next(err)
    })
})
memeSchema.pre('remove', next => {
  User.findById(this.user_id)
    .then(user => {
      user.memes.remove(this.id)
      user.save().then(e => {
        next()
      })
    })
    .catch(err => {
      next(err)
    })
})

const Meme = mongoose.model('Meme', memeSchema)
module.exports = Meme
