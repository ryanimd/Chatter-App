const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

// NEW //
users.get('/new', (req, res) => {
  res.render('users/new.ejs',
  {
    currentUser: req.session.currentUser
  })
})

// CREATE //
users.post('/', (req, res) => {
  //Hashes original user password 10x
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  //req.body now includes new hashed password
  User.create(req.body, (err, createdUser) => {
    //Thought about making this page redirect to the home page once the user signed up, but kept it the same to make sure the users credentials work when logging in
    res.redirect('/')
  })
})

module.exports = users;
