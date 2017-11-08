var express = require("express");
var request = require("request");
var router = express.Router({mergeParams: true});
var db = require("../models")
var auth = require('../middleware/auth')

router.get('/', function(req,res){
  db.User.findById(req.params.id)
    .populate('memes')
    .then(function(user){
      res.status(200).send(user.memes)
    });
});

router.post('/', function(req,res,next){
  const form = {
    text0: req.body.top,
    text1: req.body.bottom,
    template_id: req.body.template_id,
    username: process.env.IMG_FLIP_USERNAME,
    password: process.env.IMG_FLIP_PASSWORD,
  };
  request.post({
    url: "https://api.imgflip.com/caption_image",
    form
  }, function(error, response, body) {
    if (error || response.statusCode >= 400) {
      next(error);
    } else {
      body = JSON.parse(body);
      const newMeme = {
        top: req.body.top,
        bottom: req.body.bottom,
        url: body.data.url,
        user_id: req.params.id
      };
      db.Meme.create(newMeme).then(function(meme){
        db.User.findById(req.params.id).then(function(user){
          user.memes.push(meme.id)
          user.save().then(function(user) {
            res.status(200).send(meme);
          });
        });
      }, function(err){
        next(err)
      });
    }
  });
});

router.delete('/:meme_id', function(req,res){
  db.Meme.findById(req.params.meme_id).then(function(meme){
    meme.remove().then(function() {
      // meme looks right here
      res.status(204).send(meme);
    });
  }).catch(function(err){
    res.status(500).send(err)
  })
});

module.exports = router;
