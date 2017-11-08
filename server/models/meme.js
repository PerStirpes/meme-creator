var mongoose = require("mongoose");
var User = require("./user");

var memeSchema = new mongoose.Schema({
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
}, {
  timestamps: true
});

memeSchema.pre('remove', function(next){
  User.findById(this.user_id).then((user)=> {
    user.memes.remove(this.id);
    user.save().then(function(e){
      next()
    });
  }).catch(function(err){
    next(err)
  })
});
memeSchema.pre('remove', function(next){
  User.findById(this.user_id).then(user => {
    user.memes.remove(this.id);
    user.save().then(function(e){
      next();
    });
  }).catch(function(err) {
    next(err);
  });
});

var Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;
