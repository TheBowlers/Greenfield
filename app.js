'use strict';
const express = require('express');
const app = require('./src/server/router/server-config.js');

app.set('port', 8080);
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('The Quizzard is listening on', app.get('port'));
}
//
module.exports = app;