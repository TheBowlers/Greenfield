var MongoClient = require('mongodb').MongoClient;
//Use proper url for MongoDB cluster
var url = require('../../../.././config.js').dbUrl;
//User helper functions
var signupUser = require('.././utils/users-helpers.js').signupUser;
var fetchUserByEmail = require('.././utils/users-helpers.js').fetchUserByEmail;
var updateUserScore = require('.././utils/users-helpers.js').updateUserScore;
var updateUserQuestions = require('.././utils/users-helpers.js').updateUserQuestions;

exports.formatUserData = function(user) {
  //The user object which will be added
  let newUser = {
    displayName: user._json.displayName,
    email: user._json.emails[0].value,
    score: 0,
    token: user._json.etag.split('"').join(''), // Trims token from '"someToken"' to resemble a simple string. May have unintended consequences down the road.-ZB
    image: user._json.image.url, //TODO: Give default value in case Google doesn't have an image...maybe Google automatically assigns an image to this data || SOME_DEFAULT_URL ,
    questionsAnswered: []
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
      fetchUserByEmail(db, email, function(userData) {
        res.status(200).send(userData[0]);
      }, function(userData) {
        res.status(404).send('Could not get data for user with that email');
      })
    }
  })
}

//TODO: question_id, timeToAnswer, pointsAwarded
// Builds
exports.formatResponseData = function(params, points) {
  let questionData = {
    question_id: params.question_id,
    timeToAnswer: params.timeToAnswer,
    pointsAwarded: points,
    respondedCorrect: points > 0
  }
  return questionData
}


exports.updateScore = function(req, res) {

  let email = req.body.email;
  let points = req.body.pointsAwarded;
  let questionData = exports.formatResponseData(req.body, points);
  //OLD WAY: let questionData = req.body.questionData;

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Could not connect', err);
    } else {
      updateUserScore(db, email, points, function(response) {
        console.log('Updated user score:', response.value.score, 'to be', points + response.value.score)
        //Score property is not updated in this response. But the next one will be
        updateUserQuestions(db, email, questionData, function(response) {
          res.status(200).send(response.value);
        })
      })
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
      fetchUserByEmail(db, email,
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