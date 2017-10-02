const express = require('express');
const app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

//Question helper functions
var handleGet = require('.././db/models/questions.js').getQuestion;
var handlePost = require('.././db/models/questions.js').postQuestion;
var handleDelete = require('.././db/models/questions.js').deleteQuestion;
var handleUpdate = require('.././db/models/questions.js').updateQuestion;



app.use(cors());

app.use(bodyParser.json());

//Fetches questions of a particular "questionType", selects one at random to send back
//This should eventually be optimized to only send questions to which the user has not responded
app.get('/questions', handleGet);

//Adds question to database, creates unizue '_id' which contains the timeStamp
app.post('/questions', handlePost);

//Delete a question from database by '_id'
app.post('/questions/remove', handleDelete);

//Updates certain properties for a question bt '_id'
app.post('/questions/update', handleUpdate);


module.exports = app;
