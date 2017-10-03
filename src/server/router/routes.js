const routes = function(){


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




};

module.exports = routes;