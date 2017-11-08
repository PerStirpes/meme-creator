var express = require("express");
var app = express();
var cors = require('cors');
var request = require("request");
var bodyParser = require("body-parser");
var userRoutes = require("./routes/users");
var authRoutes = require("./routes/auth");
var memeRoutes = require("./routes/memes");
var authMiddleware = require("./middleware/auth");
var db = require("./models");

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.send("start with /api/users");
});

app.use('/api/users/:id/memes', authMiddleware.loginRequired,
        authMiddleware.ensureCorrectUser, memeRoutes);
app.use('/api/users', authMiddleware.loginRequired, userRoutes);

app.use('/api/auth', authRoutes);

app.get('/memes/options', function(req,res){
  request.get("https://api.imgflip.com/get_memes",
    function(error, response, body) {
      if (error) {
        next(error);
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(body);
    }
  );
});

app.get('/memes', function(req, res, next) {
  db.Meme.find({}, function(err, memes) {
    if (err) {
      next(err);
    } else {
      res.status(200).send(memes);
    }

  });
});

app.use(function(err, req, res, next) {
  res.send(err);
});

app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
