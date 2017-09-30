//server-config.js
const express = require('express');
const app = express();

var cors = require('cors');
var bodyParser = require('body-parser');
//Connection handler
var MongoClient = require('.././questions-handlers.js').MongoClient;
//Request handlers
var insertQ = require('.././questions-handlers.js').insertQ;
var findQ = require('.././questions-handlers.js').findQ;
var updateQ = require('.././questions-handlers.js').updateQ;
var removeQ = require('.././questions-handlers.js').removeQ;
var indexQ = require('.././questions-handlers.js').indexQ;
//Use proper url for MongoDB cluster
var url = require('../../../../config.js').dbUrl;


app.use(cors());

app.use(bodyParser.json());

//Fetches questions of a particular "questionType", selects one at random to send back
//This should eventually be optimized to only send questions to which the user has not responded
app.get('/questions', function(req, res) {
  //fetched questions are pushed to array
  let response = [];

  //Question genre id
  let questionType = req.query.questionType;

  if (!questionType) {
    res.send('No question type given');
    //Could also be made to give an utterly random question
  } else {
    MongoClient.connect(url, function(err, db) {
      console.log('Connected to MongoDB server');
      findQ(db, questionType, function(questions) {
        questions.forEach(function(question) {
          response.push(question);
        });
        if (response.length === 1) { //TODO: Use better logic lines 42-47
          res.send(response[0])
        } else {
          let chooseOne = Math.floor(Math.random * response.length);
          res.send(response[chooseOne]);
        }
        db.close();
      });
    });
    }
});

//Adds question to database
app.post('/questions', function(req, res) {
  //The question object which will be added
  let question = req.body;
  MongoClient.connect(url, function(err, db) {
    console.log('Connected to MongoDB server');
    insertQ(db, question, function() {
      //inserts to table and creates a unique index based on prompt
      indexQ(db, function() {
        res.status(200).send('Question added to database');
        db.close();
      });
    });
  });
});

//Delete a question from database
app.post('/questions/remove', function(req, res) {
  //id determines which question
  let id = req.body.id;

  MongoClient.connect(url, function(err, db) {
    //assert.equal(null, err);
    console.log('Connected to MongoDB server');
    removeQ(db, id, function() {
      db.close();
    });
  });
});

//Updates certain parts of a question. Only admins should be able to this in response to bug reports
app.post('/questions/update', function(req, res) {
  //id determines which question
  let id = req.body.id;
  //property is an object where key:value pairs to be updated or added will be defined
  let property = req.body.property

  MongoClient.connect(url, function(err, db) {
    console.log('Connected to MongoDB server');
    updateQ(db, id, function() {
      db.close();
    });
  });
});


module.exports = app;
