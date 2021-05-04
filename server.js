//___________________
//DEPENDENCIES
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session')
const app = express();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//PORT
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;
//___________________
//DATABASE
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
//___________________
//MIDDLEWARE
//___________________
//use public folder for static assets
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false}));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
//needed for sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)
//___________________
//CONTROLLERS
//___________________
// const landingController = require('./controllers/landing_controller.js')
// app.use('/landing', landingController)
const postController = require('./controllers/posts_controller.js')
app.use('/posts', postController)
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
const sessionController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionController)
// const myPageController = require('./controllers/mypage_controller.js')
// app.use('/mypage', myPageController)
//___________________
// ROUTES
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  // res.send('Hello World!');
  res.redirect('/posts')
});
//___________________
//LISTENER
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
