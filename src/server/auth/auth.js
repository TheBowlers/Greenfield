'use strict';

const express = require('express');
const passport = require ('passport');
const router = express.Router();

router.route('/google/callback')
.get(passport.authenticate('google', {
  successRedirect: '/index.html',
  failure: '/error/'
}));

router.route('/google')
.get(passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
}));

module.exports = router;