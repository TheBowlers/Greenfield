var MongoClient = require('mongodb').MongoClient;
//Use proper url for MongoDB cluster
var url = require('../../../.././config.js').dbUrl;
////Question helper functions
var insertQ = require('.././utils/questions-helpers.js').insertQ;
var findQ = require('.././utils/questions-helpers.js').findQ;
var updateQ = require('.././utils/questions-helpers.js').updateQ;
var removeQ = require('.././utils/questions-helpers.js').removeQ;
var indexQ = require('.././utils/questions-helpers.js').indexQ;

exports.getQuestion = function(req, res) {
  //fetched questions are pushed to array
  let response = [];

  //Question genre id
  let questionType = req.query.questionType;

  if (!questionType) {
    res.send('No question type given');
    //Could also be made to give an utterly random question
  } else {
    MongoClient.connect(url, function(err, db) {
      if(err){
        return console.error(err);
      }
      console.log('Connected to MongoDB server');
      findQ(db, questionType, function(questions) {
        questions.forEach(function(question) {
          response.push(question);
          console.log(response)
        });
        if (response.length === 1) { //TODO: Use better logic lines 42-47
          res.send(response[0])
        } else {
          let chooseOne = Math.floor(Math.random() * response.length);
          console.log(response.length)
          res.send(response[chooseOne]);
        }
        db.close();
      });
    });
    }
}

exports.postQuestion = function(req, res) {
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
}

exports.deleteQuestion = function(req, res) {
  //id determines which question
  let id = req.body.id;

  MongoClient.connect(url, function(err, db) {
    //assert.equal(null, err);
    console.log('Connected to MongoDB server');
    removeQ(db, id, function() {
      res.status(200).send('Question removed');
      db.close();
    });
  });
}

exports.updateQuestion = function(req, res) {
  //id determines which question
  let id = req.body._id;
  //property is an object where key:value pairs to be updated or added will be defined
  let property = req.body.property

  MongoClient.connect(url, function(err, db) {
    console.log('Connected to MongoDB server');
    updateQ(db, id, property, function() {
      res.status(200).send('Question updated');
      db.close();
    });
  });
}