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

// Morgan request logging
const morgan = require('morgan');
app.use(morgan(
    '[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer" '));

app.use(express.static(__dirname.substring(0, __dirname.length - 18) + publicDir));
console.log('public directory is: ' + __dirname.substring(0, __dirname.length - 18) + publicDir);


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
// var handleUserData = require('.././db/models/users.js').handleUserData;
// var handleUpdateUser = require('.././db/models/users.js').updateUser;

/*USER ROUTING*/

//Festches user data from email
// app.get('/users', handleGetUser);

/*END USER ROUTING*/

//serializing of users is to associate the connected client with a user in the database.
// This is currently set to use memory
// todo: Update to user only the user.id and query the db for the user entry.

passport.serializeUser(function(user, done) {
  console.log('User profile has been received and is:', user );
  //TODO: A function which tests if user is in db by email
  //handleUserData(user)//////TODO
  done(null, user);  // todo: only pass user.id when we can do a DB lookup
});

passport.deserializeUser(function(user, done) { // todo: Once above method is updated to user.id, pass userId when we can do a DB lookup
  //user.findById(id)...
  done(null, user);
});

// Passport configuration with Google strategy
passport.use(new GoogleStrategy({
      clientID: config.Google.clientID,
      clientSecret: config.Google.clientSecret,
      callbackURL: "http://localhost:8080/auth/google/callback"
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


//Question handler functions
var handleGetQuestion = require('.././db/models/questions.js').getQuestion;
var handlePostQuestion = require('.././db/models/questions.js').postQuestion;
var handleDeleteQuestion = require('.././db/models/questions.js').deleteQuestion;
var handleUpdateQuestion = require('.././db/models/questions.js').updateQuestion;

/*QUESTION ROUTING*/

//Fetches questions of a particular "questionType", selects one at random to send back
//This should eventually be optimized to only send questions to which the user has not responded
app.get('/questions', handleGetQuestion);

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

app.post('/login',
    passport.authenticate('local'),
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
