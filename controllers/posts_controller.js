const express = require('express')
const Post = require('../models/posts.js')
const posts = express.Router()


const seed = [
  {
    title: "Here\'s an example",
    message: "First post here. Let\'s see how this goes 😬"
  },
  {
    title: "",
    message: "This post won\'t have a title"
  },
  {
    title: "Random thought",
    message: "Which letter is silent in the word Scent, the S or the C?"
  }
]

// INDEX //
posts.get('/', (req, res) => {
  Post.find({}, (err, allPosts) => {
    res.render('posts/index.ejs', {
      posts: allPosts
    })

  })
})

// SEED ROUTE FOR DEMO //
posts.get('/demo/seed', (req, res) => {
  console.log('seed route accessed');
  for (i in seed) {
    Post.create(seed[i], (err, data) => {
        if (err){
          console.log(err);
        } else {
          console.log(data);
        }
      }
    )
  }
  res.redirect('/posts')
})

// NEW //
posts.get('/new', (req, res) => {
  res.render('posts/new.ejs')
})

// CREATE //
posts.post('/', (req, res) => {
  Post.create(req.body, (err, createdPost) => {
    if (err){
      console.log(err);
    } else {
      console.log(req.body);
    }
    res.redirect('/')
  })
})

module.exports = posts;
