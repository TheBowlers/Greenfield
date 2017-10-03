const express = require('express');
const morgan = require('morgan');



// Middleware

// For ALL authentication. Goes to router







const server = function() {







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