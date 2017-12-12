const express = require("express");
const app = express();
const cors = require('cors');
const request = require("request");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const memeRoutes = require("./routes/memes");
const authMiddleware = require("./middleware/auth");
const db = require("./models");

if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config()
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) => {
  res.send("start with /api/users");
});

app.use('/api/users/:id/memes', authMiddleware.loginRequired,
        authMiddleware.ensureCorrectUser, memeRoutes);
app.use('/api/users', authMiddleware.loginRequired, userRoutes);

app.use('/api/auth', authRoutes);

app.get('/memes/options', (req,res) => {
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

app.get('/memes', (req, res, next) => {
  db.Meme.find({}, (err, memes) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send(memes);
    }

  });
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
