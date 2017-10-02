'use strict';
const express = require('express');
const morgan = require('morgan');
const app = require('./src/server/router/server-config.js')

//app.use(morgan({ format: "default" }));
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
//app.use(morgan('tiny'));
//app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
app.use(morgan('[:date[clf]] | ":method :url" | STATUS: :status :res[content-length] ":referrer" '));


app.set('port', 8080);


const publicDir = '/src/client';
app.use(express.static(__dirname + publicDir));
console.log('public directory is: ' + __dirname + publicDir);


if (!module.parent) {
  app.listen(app.get('port'));
  console.log('The Quizzard is listening on', app.get('port'));
}
