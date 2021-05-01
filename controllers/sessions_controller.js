const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

// NEW //
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs',
{
  currentUser: req.session.currentUser
})
})

// CREATE //
sessions.post('/', (req, res) => {
  User.findOne(
    {
      username: req.body.username
    },
    (err, foundUser) => {
      if (err) {
        console.log(err);
        res.send('The database had a problem')
      } else if (!foundUser) {
        //If user is not found, redirects back to log in page
        res.send('<a href="/sessions/new"> Sorry, no user found</a>')
      } else {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
          req.session.currentUser = foundUser
          // console.log(req);
          res.redirect('/')
        } else {
          //If password doesn't match, redirects back to log in page
          res.send('<a href="/sessions/new">Password does not match</a>')
        }
      }
    })
  })

// DELETE //
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions;
