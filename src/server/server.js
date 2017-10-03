const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const config = require('../../config.js');
const auth = require('./auth/auth');


// Middleware

app.use(morgan(
    '[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer" '));
// For ALL authentication. Goes to router
app.use('/auth', auth);


passport.use(new GoogleStrategy({
      clientID: config.Google.clientID,
      clientSecret: config.Google.clientSecret,
      callbackURL: "http://www.devcareerguide.com/auth/google/callback"
    },
    function(req, accessToken, refreshToken, profile, donne) {
      // todo: Create the user or log them in.
      User.findOrCreate({googleId: profile.id}, function(err, user) {
        if (err) {
          return console.error(err);
        }
        cb(null, user);
      });

    }
));



const server = function() {



  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



  app.get('/auth/google',
      passport.authenticate('google', {scope: ['profile']}));

  app.get('/auth/google/callback',
      passport.authenticate('google', {failureRedirect: '/login'}),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

  const routes = require('./router/routes');

};

module.exports = server;