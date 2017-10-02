const express = require('express');
const app = express();

var cors = require('cors');
var bodyParser = require('body-parser');

//Question helper functions
var handleGetQuestion = require('.././db/models/questions.js').getQuestion;
var handlePostQuestion = require('.././db/models/questions.js').postQuestion;
var handleDeleteQuestion = require('.././db/models/questions.js').deleteQuestion;
var handleUpdateQuestion = require('.././db/models/questions.js').updateQuestion;



app.use(cors());

app.use(bodyParser.json());

/*QUESTION ROUTING*/

//Fetches questions of a particular "questionType", selects one at random to send back
//This should eventually be optimized to only send questions to which the user has not responded
app.get('/questions', handleGetQuestion);

//Adds question to database, creates unizue '_id' which contains the timeStamp
app.post('/questions', handlePostQuestion);

//Delete a question from database by '_id'
app.post('/questions/remove', handleDeleteQuestion);

//Updates certain properties for a question bt '_id'
app.post('/questions/update', handleUpdateQuestion);


module.exports = app;
