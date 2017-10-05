#!/bin/bash
START= command -v start
OPEN= command -v open

npm install
npm run build
if [ -n START ];
then
start http://localhost:8080
fi
if [ -n OPEN ];
then
open http://localhost:8080
fi
nodemon app.js