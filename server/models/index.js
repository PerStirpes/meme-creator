var mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/meme-auth')
mongoose.Promise = Promise;

module.exports.User = require("./user")
module.exports.Meme = require("./meme")
