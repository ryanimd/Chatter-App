const express = require('express')
const myPage = express.Router()

// INDEX //
myPage.get('/', (req, res) => {
  res.render('mypage/mypage.ejs',
{
  currentUser: req.session.currentUser
})
})

module.exports = myPage;
