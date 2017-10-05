var MongoClient = require('mongodb').MongoClient;
//Use proper url for MongoDB cluster
var url = require('../../../.././config.js').dbUrl;
//User helper functions
var signupUser = require('.././utils/users-helpers.js').signupUser;
var findUserByEmail = require('.././utils/users-helpers.js').findUserByEmail;
var updateUserScore = require('.././utils/users-helpers.js').updateUserScore;
var updateUserQuestions = require('.././utils/users-helpers.js').updateUserQuestions;

//Question helper functions
var findQById = require('.././utils/questions-helpers.js').findQById;


exports.formatUserData = function(user) {
  //The user object which will be added
  let newUser = {
    displayName: user._json.displayName,
    email: user._json.emails[0].value,
    score: 0,
    token: user._json.etag.split('"').join(''), // Trims token from '"someToken"' to resemble a simple string. May have unintended consequences down the road.-ZB
    image: user._json.image.url, //TODO: Give default value in case Google doesn't have an image...maybe Google automatically assigns an image to this data || SOME_DEFAULT_URL ,
    questionsAnswered: {}
  }

  //should eliminate circular reference. NOT TOTALLY SURE THIS IS NECESSARY
  //let newUser = JSON.parse(JSON.stringify(newUserObj))

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

  let email = req.query.email;

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

// Builds new Entry for user's 'questionsAnswered'
exports.formatResponseData = function(params, db, callback) {
  let questionId = params.question_id
  let pointsScored = 0;
  let max = 0;
  let pointsAccumulated = 0;
  let bestTime = 0;
  findQById(db, questionId, function(question) {
    pointsScored = question.difficulty * 1000;
    pointsScored += question.difficulty * (question.time - params.timeToAnswer);
    max = question.difficulty * 1000;
    max += question.difficulty * question.time;
    //console.log('question', question)
    //console.log('max',max,'points',pointsScored)
    findUserByEmail(db, params.email, function(userResponseData) {
      console.log(questionId,'id')
        console.log('questions', userResponseData[0].questionsAnswered[questionId])
      if (userResponseData[0].questionsAnswered[questionId]) {
        pointsAccumulated = userResponseData[0].questionsAnswered[questionId].pointsAwarded;
        bestTime = userResponseData[0].questionsAnswered[questionId].bestTimeToAnswer
      console.log(bestTime, 'bbgggggbb', pointsAccumulated, 'ppgggggpppp')
      }
      console.log(bestTime, 'bbbb', pointsAccumulated, 'pppppp')

      if (pointsAccumulated + pointsScored < max) {
        pointsScored += pointsAccumulated;
      } else {
        pointsScored = max;
      }

      if (bestTime === 0 || bestTime > params.timeToAnswer) {
        bestTime = params.timeToAnswer
      }
      if (!params.isCorrect) {
        pointsScored = 0;
      }

      let netPoints = pointsScored - pointsAccumulated;
      if (netPoints < 0) {
        netPoints = 0;
      }
      let questionData = {
        id: questionId,
        bestTimeToAnswer: bestTime,
        pointsAwarded: pointsScored,
        respondedCorrect: params.isCorrect,
        lastPoints: netPoints
      }
      console.log('line 105',questionData)
      callback(questionData);
    });
  });
}

// exports.calcMaxScore = function(questionId, db) {
//   findQById(db, questionId, function(question) {
//     let base = question.baseScore;
//     let timeAllowed = question.time;
//   });
// }

exports.updateScore = function(req, res) {

  let email = req.body.email;

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Could not connect', err);
    } else {
      //render questionResponseData
      let questionData = exports.formatResponseData(req.body, db, function(questionData) {
        let points = questionData.lastPoints;
        updateUserScore(db, email, points, function(response) {
        console.log('Updated user score:', response.value.score, 'to be', points + response.value.score)

          updateUserQuestions(db, email, questionData, function(response) {
            console.log('RESPONSE',response)
            res.status(200).send(response.value);
          })
        })
      });
    }
  })
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