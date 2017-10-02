
const server = {

  const morgan = require('morgan');
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

  app.use(morgan('[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer" '));


  var GoogleStrategy = require('passport-google-oauth').Strategy;

  passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://www.example.com/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
  ));


  app.get('/auth/google',
      passport.authenticate('google', { scope: ['profile'] }));

  app.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });





  const routes = require('./router/routes');

































}





module.exports = server;