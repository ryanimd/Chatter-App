const express = require('express')
const Post = require('../models/posts.js')
const posts = express.Router()


//SEED ROUTE FOR DEMO//
posts.get('/demo/seed', (req, res) => {
  Post.create(
    [
      {
        title: "Here\'s an example",
        message: "First post here. Let\'s see how this goes 😬"
      },
      {
        message: "This post won\'t have a title"
      },
      {
        title: "Random thought",
        message: "Which letter is silent in the word 'Scent', the 'S' or the 'C'?"
      }
    ]
  )
})
