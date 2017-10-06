var MongoClient = require('mongodb').MongoClient;
//Use proper url for MongoDB cluster
var url = require('../../../.././config.js').dbUrl;
//Question helper functions
var insertQ = require('.././utils/questions-helpers.js').insertQ;
var findQ = require('.././utils/questions-helpers.js').findQ;
var updateQ = require('.././utils/questions-helpers.js').updateQ;
var removeQ = require('.././utils/questions-helpers.js').removeQ;
var findAllQ = require('.././utils/questions-helpers.js').findAllQ;

exports.getQuestion = function(req, res) {
  //fetched questions are pushed to array
  let response = [];

  //Question genre id
  let questionType = req.query.questionType;

  //sends all questions
  if (!questionType) {
    MongoClient.connect(url, function(err, db) {
      if(err){
        return console.error(err);
      } else {
        let response = [];
        findAllQ(db, function(questions) {
          questions.forEach(function(question) {
            response.push(question);
            console.log(response)
          });
      res.status(200).send(response);
        });
      }
    });

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
  let errorBool = false;
  let errorMessage = '';
  let questionType = req.body.questionType;
  let title = req.body.title;
  let questionText = req.body.questionText;
  let answerText = req.body.answerText;
  let difficulty = req.body.difficulty;
  let time = req.body.time;

  if (!questionType) {
    errorMessage += "No 'questionType' in request body. \n";
    errorBool = true;
  }
  if (!title) {
    errorMessage += "No 'title' in request body. \n";
    errorBool = true;
  }
  if (!questionText) {
    errorMessage += "No 'questionText' in request body. \n";
    errorBool = true;
  }
  if (!answerText) {
    errorMessage += "No 'answerText' in request body. \n";
    errorBool = true;
  }
  if (!difficulty) {
    errorMessage += "No 'difficulty' in request body. \n";
    errorBool = true;
  }
  if (difficulty < 1 || difficulty > 5 || !difficulty) {
    errorMessage += "Difficulty should be between 1 and 5 \n";
    errorBool = true;
  }
  if (!time) {
    errorMessage += "No 'time' in request body. \n";
    errorBool = true;
  }
  if (time < 2000) {
    errorMessage += "Time must be at least 2000 ms \n";
    errorBool = true;
  }
  if (errorBool) { // If req.body did not include the required fields an error is sent. Otherwise the question is posted.
    res.status(404).send(errorMessage);

  } else {

    let question = exports.renderQuestion(req.body);

    MongoClient.connect(url, function(err, db) {
      console.log('Connected to MongoDB server');
      insertQ(db, question, function(question) {

        // Sends question + _id
        res.status(200).send(question[0]);
        db.close();
        });
    });
  }
}

// Sterilizes posted questions in case the request body contains extra information
//TODO: change this section if other type of questions are included in database
exports.renderQuestion = function(question) {
  return {
    questionType: question.questionType,
    title: question.title,
    questionText: question.questionText,
    answerText: question.answerText,
    difficulty: question.difficulty,
    time: question.time
  }
}


/*********** TODO: determine if the following functions are necessary ***************/
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