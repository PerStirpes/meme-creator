# Meme Server

The sever does token based authentication plus saving and deleting meme's that have been created via the [image flip api](https://api.imgflip.com/).

## Setup

The server is a NodeJS application that uses express and mongoDB.  To get setup:

* Clone this repository locally
* run: `npm install`
* In the root of this project, copy the `.env.template` file to `.env`:

```
cp .env.template .env
```
* Go to [https://imgflip.com/](https://imgflip.com/) and make an account for testing.
* Put your username and password into the `.env` file.  __DO NOT CHECK IN THIS FILE__
* npm start

