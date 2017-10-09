var MongoClient = require('mongodb').MongoClient;
//Use proper url for MongoDB cluster
var url = require('../../../.././config.js').dbUrl;
//User helper functions
var signupUser = require('.././utils/users-helpers.js').signupUser;
var findUserByEmail = require('.././utils/users-helpers.js').findUserByEmail;
var updateUserScore = require('.././utils/users-helpers.js').updateUserScore;
var updateUserQuestions = require('.././utils/users-helpers.js').updateUserQuestions;
var updateUserQuestionsData = require('.././utils/users-helpers.js').updateUserQuestionsData;
var findUserResponseDataByEmail = require('.././utils/users-helpers.js').findUserResponseDataByEmail;
var findAllUsers = require('.././utils/users-helpers.js').findAllUsers;



//Question helper functions
var findQById = require('.././utils/questions-helpers.js').findQById;


exports.formatUserData = function(user) {
  //The user object which will be added
  let newUser = {
    displayName: user._json.displayName,
    email: user._json.emails[0].value,
    score: 0,
    token: user._json.etag.split('"').join(''), // Trims token from '"someToken"' to resemble a simple string. May have unintended consequences down the road.-ZB
    image: user._json.image.url,
    questionsAnswered: [],
    questionsAttempted: 0,
    questionsCorrect: 0
  }

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to MongoDB server');
      signupUser(db, newUser, function() {
        //inserts user to table
        console.log('Signed Up new user with email:', newUser.email);
        db.close();
      });
    }
  });
}

//Sends user object for given email address
exports.getUser = function(req, res) {

  let errorBool = false;
  let errorMessage = '';
  let email = req.query.email;
  if (!email) {
    errorMessage += "No 'email' in request body. \n";
    errorBool = true;
  }
  if (errorBool) { // If req.body did not include the required fields an error is sent. Otherwise the user's data is fetched. If it is not found the response is an error message.
    res.status(404).send(errorMessage);

  } else {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Could not connect', err);
      } else {
        findUserByEmail(db, email, function(userData) {
          res.status(200).send(userData[0]);
        }, function(userData) {
          res.status(404).send('Could not get data for user with that email');
        })
      }
    })
  }
}

exports.getAllUsers = function(req, res) {

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Could not connect', err);
    } else {
      findAllUsers(db, function(userData) {
        res.status(200).send(userData);
      }, function(userData) {
        res.status(404).send('Could not get users, check auth');
      })
    }
  })
}

// Builds new Entry for user's 'questionsAnswered'
exports.formatResponseData = function(params, db, callback) {
  let questionId = params.question_id
  let pointsScored = 0;
  let max = 0;
  let pointsAccumulated = 0;
  let bestTime = 0;
  answeredPrior = false;
  findQById(db, questionId, function(question) {
    pointsScored = question.difficulty * 1000;
    if (question.time - params.timeToAnswer > 0) {
      pointsScored += question.difficulty * (question.time - params.timeToAnswer);
    }
    max = question.difficulty * 1000;
    max += question.difficulty * question.time;
    //console.log('question', question)
    //console.log('max',max,'points',pointsScored)

    findUserResponseDataByEmail(db, params.email, function(userResponseData) {

      let questionResponseData;
      for (let i = 0; i < userResponseData[0].questionsAnswered.length; i++) {
        if (userResponseData[0].questionsAnswered[i].id === questionId) {
          questionResponseData = userResponseData[0].questionsAnswered[i];
        }
      }
      if (questionResponseData) {
        answeredPrior = true;
        pointsAccumulated = questionResponseData.pointsAwarded;
        bestTime = questionResponseData.bestTimeToAnswer
        console.log(bestTime, 'Best time thus far', pointsAccumulated, 'Points awarded thus far')
      }
      if (pointsAccumulated + pointsScored < max) {
        pointsScored += pointsAccumulated;
      } else {
        pointsScored = max;
      }

      if (bestTime === 0 || bestTime > params.timeToAnswer) {
        bestTime = params.timeToAnswer
      }
      if (!params.answeredCorrect) {
        pointsScored = 0;
      }

      let netPoints = pointsScored - pointsAccumulated;
      if (netPoints < 0) {
        netPoints = 0;
      }
      let questionData = {
        id: questionId,
        bestTimeToAnswer: bestTime,
        pointsAwarded: netPoints,
        respondedCorrect: params.isCorrect,
        lastPoints: pointsScored

      }
      console.log('line 105',questionData)
      callback(questionData, answeredPrior);
    });
  });
}

exports.updateScore = function(req, res) {
  let errorBool = false;
  let errorMessage = '';
  let email = req.body.email;
  let question_id = req.body.question_id;
  let timeToAnswer = req.body.timeToAnswer;
  let isCorrect = JSON.parse(req.body.answeredCorrect);
  if (!email) {
    errorMessage += "No 'email' in request body. \n";
    errorBool = true;
  }
  if (!question_id) {
    errorMessage += "No 'question_id' in request body. \n";
    errorBool = true;
  }
  if (!timeToAnswer) {
    errorMessage += "No 'timeToAnswer' in request body. \n";
    errorBool = true;
  }
  if (isCorrect === undefined) {
    errorMessage += "No 'answeredCorrect' in request body. \n";
    errorBool = true;
  }
  if (errorBool) { // If req.body did not include the required fields an error is sent. Otherwise the question response is logged in user's data.
    res.status(404).send(errorMessage);

  } else {

    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Could not connect', err);
      } else {
        //render questionResponseData
        let questionData = exports.formatResponseData(req.body, db, function(questionData, answeredPrior) {
          let points = questionData.lastPoints;
          updateUserScore(db, email, points, isCorrect, function(response) {
            console.log(response)
            console.log('Updated user score:', response.value.score, 'to be', points + response.value.score)
          //Score property is not updated in this response. But the next one will be
            if (answeredPrior) {
              console.log('answeredPrior')
             // update only that field
              updateUserQuestionsData(db, email, questionData, function(response) {
                res.status(200).send(response.value);
              })
            } else {
              updateUserQuestions(db, email, questionData, function(response) {
                res.status(200).send(response.value);
              })
            }
          })
        });
      }
    })
  }
}

exports.handleUserDataGoogle = function(user) {

  //User email
  let email = user._json.emails[0].value;

  if (!email) {
    console.log('No valid email to create account with');
  } else {
    MongoClient.connect(url, function(err, db) {
      if(err) {
        return console.error(err);
      }
      console.log('Connected to MongoDB server');
      findUserByEmail(db, email,
        function(userData) {//found User callback
          console.log('Found data for user with email:', userData[0]);
          //session initialization?
        }, function() {//did not find User callback
          exports.formatUserData(user);
      })
      db.close();
    });
  }
}