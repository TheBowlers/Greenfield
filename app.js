'use strict';
const express = require('express');
const app = require('./src/server/router/server-config.js');




const publicDir = '/src/client';
app.use(express.static(__dirname + publicDir));
console.log('public directory is: ' + __dirname + publicDir);

app.set('port', 8080);

if (!module.parent) {
  app.listen(app.get('port'));
  console.log('The Quizzard is listening on', app.get('port'));
}
