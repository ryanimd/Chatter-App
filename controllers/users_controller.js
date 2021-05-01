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
    res.redirect('/')
  })
})

module.exports = users;
