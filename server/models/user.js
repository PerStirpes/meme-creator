const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  memes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meme'
    }
  ]
})

userSchema.pre('save', next => {
  const user = this

  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, 10).then(
    hashedPassword => {
      user.password = hashedPassword
      next()
    },
    err => next(err)
  )
})

userSchema.methods.comparePassword = (candidatePassword, next) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next(err)
    next(null, isMatch)
  })
}

const User = mongoose.model('User', userSchema)
module.exports = User
