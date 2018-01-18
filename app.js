'use strict';
const express = require('express');
const app = require('./src/server/router/server-config.js');
const port = process.env.PORT || 8080

app.set('port', port);
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('The Quizzard is listening on', app.get('port'));
}
//
module.exports = app;