var MongoClient = require('mongodb').MongoClient;
//Use proper url for MongoDB cluster
var url = require('../../../.././config.js').dbUrl;
//Question helper functions
var insertQ = require('.././utils/questions-helpers.js').insertQ;
var findQByType = require('.././utils/questions-helpers.js').findQByType;
var findQByCategory = require('.././utils/questions-helpers.js').findQByCategory;
var updateQ = require('.././utils/questions-helpers.js').updateQ;
var removeQ = require('.././utils/questions-helpers.js').removeQ;
var findAllQ = require('.././utils/questions-helpers.js').findAllQ;
var insertManyQs = require('.././utils/questions-helpers.js').insertManyQs;

/*This function is not currently being used to handle any request. It will eventually be combined with it's sibling function, getQuestionFromCategory to double filter the body of questions from which one question is sent to the client*/
exports.getQuestionFromType = function(req, res) {
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
        if (!response.length) {
          res.status(404).send('No questions for that category.')
        }
        else if (response.length === 1) {
          res.status(200).send(response[0])
        } else {
          let chooseOne = Math.floor(Math.random() * response.length);
          res.send(response[chooseOne]);
        }
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
      findQByType(db, questionType, function(questions) {
        questions.forEach(function(question) {
          response.push(question);
          console.log(response)
        });
        if (response.length === 1) {
          res.send(response[0])
        } else {
          let chooseOne = Math.floor(Math.random() * response.length);
          res.send(response[chooseOne]);
        }
        db.close();
      });
    });
    }
}


exports.getQuestionFromCategory = function(req, res) {
  //fetched questions are pushed to array
  let response = [];

  //Question genre id
  let category = req.query.category;

  //sends all questions
  if (!category) {
    /*START TODO*/
    /* This code represents sending a random question back to the server if no category is defined. For now we will send all questions when no category is defined.*/
    // MongoClient.connect(url, function(err, db) {
    //   if(err){
    //     return console.error(err);
    //   } else {
    //     let response = [];
    //     findAllQ(db, function(questions) {
    //       questions.forEach(function(question) {
    //         response.push(question);
    //         console.log(response)
    //       });
    //       if (response.length === 1) {
    //       res.send(response[0])
    //     } else {
    //       let chooseOne = Math.floor(Math.random() * response.length);
    //       res.status(200).send(response[chooseOne]);
    //     }
    //     });
    //   }
    // });
    /*END TODO*/
    MongoClient.connect(url, function(err, db) {
      if (err) {
        return console.error(err);
      } else {
        let response = [];
        findAllQ(db, function(questions) {
          questions.forEach(function(question) {
            response.push(question);
          });

        res.status(200).send(response);
        })
      }
    })
  } else {
    MongoClient.connect(url, function(err, db) {
      if(err){
        return console.error(err);
      }
      console.log('Connected to MongoDB server');
      findQByCategory(db, category, function(questions) {
        questions.forEach(function(question) {
          response.push(question);
          console.log(response)
        });
        if (response.length === 1) { //TODO: Use better logic lines 42-47
          res.send(response[0])
        } else {
          let chooseOne = Math.floor(Math.random() * response.length);
          res.send(response[chooseOne]);
        }
        db.close();
      });
    });
  }
}
//Accepts an array of questions or a single question object which it iterates through and posts
exports.postQuestion = function(req, res) {
  //The question object which will be added
  if (Array.isArray(req.body)) {
    let checkedQuestions = [];
    let errorMessage = '';
    let index = 0;
    //foreach element render a question
    req.body.forEach(function(question) {
      let rendered = renderQuestion(question);
      if (typeof rendered === 'string') {
        errorMessage += 'Found errors at position ' + index + '\n';
        errorMessage += rendered;
      } else {
        checkedQuestions.push(rendered);
      }
      index ++;
    });
    if (errorMessage.length) {
      res.status(404).send(errorMessage);
    } else if (checkedQuestions.length) {
      MongoClient.connect(url, function(err, db) {
        console.log('Connected to MongoDB server');
        insertManyQs(db, checkedQuestions, function(questions) {

          // Sends questions + _id
          res.status(200).send(questions);
          db.close();
        });
      });
    } else res.status(404).send('None of those questions could be posted.')
  } else {

    let question = renderQuestion(req.body);
    if (typeof question === 'string') {
      res.status(404).send(question);
    }

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
var renderQuestion = function(question) {

  let errorBool = false;
  let errorMessage = '';
  let questionType = question.questionType;
  let category = question.category;
  let questionText = question.questionText;
  let answerText = question.answerText;
  let difficulty = question.difficulty;
  let time = question.time;

  if (!questionType) {
    errorMessage += "No 'questionType' in request body. \n";
    errorBool = true;
  }
  if (!category) {
    errorMessage += "No 'category' in request body. \n";
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
    return errorMessage;

  } else return {
    questionType: question.questionType,
    category: question.category,
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