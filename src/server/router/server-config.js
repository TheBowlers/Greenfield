'use strict';
const express = require('express');
const app = express();
const publicDir = '/src/client';

var cors = require('cors');
var bodyParser = require('body-parser');

// Middleware
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../../../config.js');  //credentials
const auth = require('./../auth/auth'); // take care of auth routing
const handlebars = require('express-handlebars');
const path = require('path');
const markdown = require('helper-markdown'); //allows markdown view rendering

// Morgan request logging
const morgan = require('morgan');
app.use(morgan(
    '[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer" '));

// View engine
const viewPath = path.join(__dirname, 'views');
console.log('Views are in', viewPath);
app.set('views', viewPath);
//handlebars.registerHelper('markdown', markdown());
const hbEngine = handlebars({
  defaultLayout: 'main',
  layoutsDir: viewPath + "/layouts/",
  helpers: {
    markdown: markdown
  }
});

app.engine('handlebars', hbEngine);
app.set('view engine', 'handlebars');



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'quiz me not',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);



//User handler functions
var handlePostUser = require('.././db/models/users.js').postUser;
var handleUserDataGoogle = require('.././db/models/users.js').handleUserDataGoogle;
var handleGetUser = require('.././db/models/users.js').getUser;
var handleGetAllUsers = require('.././db/models/users.js').getAllUsers;
var handleUpdateUserScore = require('.././db/models/users.js').updateScore;

/*USER ROUTING*/

//Fetches user data from email
app.get('/users/email', handleGetUser);
//Fetches all users
app.get('/users', handleGetAllUsers);
//Updates user's score
app.put('/users/update', handleUpdateUserScore);

/*END USER ROUTING*/

//serializing of users is to associate the connected client with a user in the database.
// This is currently set to use memory
// todo: Update to user only the user.id and query the db for the user entry.

passport.serializeUser(function(user, done) {
  console.log('User profile has been received and is:', user );
  console.log('DISPLAYNAME', user._json.displayName);




  //TODO: A function which tests if user is in db by email
  handleUserDataGoogle(user)
  done(null, user);  // todo: only pass user.id when we can do a DB lookup
});

console.log(passport._serializers.toString());

passport.deserializeUser(function(user, done) { // todo: Once above method is updated to user.id, pass userId when we can do a DB lookup
  //user.findById(id)...
  done(null, user);
});

// Passport configuration with Google strategy
passport.use(new GoogleStrategy({
      clientID: config.Google.clientID,
      clientSecret: config.Google.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    function(req, accessToken, refreshToken, profile, done) {
      return done(null, profile);
/*  // todo: Create the user or log them in.
      User.findOrCreate({googleId: profile.id}, function(err, user) {
        if (err) {
          return console.error(err);
        }
        //call done here;
      });
*/
    }
));
/////////////// End Passport config


// Global Vars for Handlebars

app.use(function (req, res, next) {
  if(req.user) {
    res.locals.user = req.user;
    res.locals.email = req.user.emails[0].value;
    res.locals.image = req.user.image;
  } else {
    res.locals.user = null;
    res.locals.email = '';
    res.locals.image = 'http://www.holidaybibleweek.co.uk/wp-content/uploads/mystery-300x300.png';
  }

  console.log('USER EXTRACTED:', res.locals.user);
  next();
});



app.get('/', function(req, res, next) {
    console.log('Curerent logged in user:', req.user);
    console.log('GETTING WITH HANDLEBARS');
    res.render('index');
});

app.get('/admin', function(req, res, next) {
  if(req.user) {
    res.render('admin');
  } else {
    res.redirect('/');
  }

});

app.get('/logout', function(req, res, next) {
  console.log('USER WILL LOGOUT NOW', req.user );
  req.logout();
  res.redirect('/');
  next();
});


// To API docs
app.get('/api', function(req, res, next) {
  res.render('api');
});


app.use(express.static(__dirname.substring(0, __dirname.length - 18) + publicDir));
console.log('public directory is: ' + __dirname.substring(0, __dirname.length - 18) + publicDir);











//Question handler functions
var handleGetQuestions = require('.././db/models/questions.js').getQuestion;
var handleGetQuestionFromCategory = require('.././db/models/questions.js').getQuestionFromCategory;
var handlePostQuestion = require('.././db/models/questions.js').postQuestion;
var handleDeleteQuestion = require('.././db/models/questions.js').deleteQuestion;
var handleUpdateQuestion = require('.././db/models/questions.js').updateQuestion;

/*QUESTION ROUTING*/

//Fetches all questions
app.get('/questions', handleGetQuestions);
//Fetches a random question for given 'category'
app.get('/questions/categories', handleGetQuestionFromCategory);
//Adds question to database, creates unizue '_id' which contains the timeStamp
app.post('/questions', handlePostQuestion);
//Delete a question from database by '_id'
app.post('/questions/remove', handleDeleteQuestion);
//Updates certain properties for a question bt '_id'
app.post('/questions/update', handleUpdateQuestion);
/*END QUESTION ROUTING*/


// Login routing

app.post('/login', passport.authenticate('local', { successRedirect: '/',
  failureRedirect: '/login' }));

app.post('/login', passport.authenticate('local'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.redirect('/users/' + req.user.username);
    });

app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true })
);






module.exports = app;
