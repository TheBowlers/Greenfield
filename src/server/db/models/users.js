var MongoClient = require('mongodb').MongoClient;
//Use proper url for MongoDB cluster
var url = require('../../../.././config.js').dbUrl;
//User helper functions
var signupUser = require('.././utils/users-helpers.js').signupUser;
var checkUser = require('.././utils/users-helpers.js').checkUser;
var updateUserScore = require('.././utils/users-helpers.js').updateUserScore;

exports.postUser = function(user) {
  //The user object which will be added
  let newUserObj = {
    displayName: user._json.displayName,
    email: user._json.emails[0].value,
    score: 0,
    token: user._json.etag,
    image: user._json.image.url, //TODO: Give default value in case Google doesn't have an image...maybe Google automatically assigns an image to this data || SOME_DEFAULT_URL ,
    questionsAnswered: []
  }
  //should eliminate circular reference
  let newUser = JSON.parse(JSON.stringify(newUserObj))
  console.log('newUser', newUser);
  console.log('olduser', newUserObj)

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
      checkUser(db, email, function(userData) {
        res.status(200).send(userData[0]);
      }, function(userData) {
        res.status(404).send('Could not get data for user with that email');
      })
    }
  })
}

exports.updateScore = function(req, res) {

  let email = req.body.email;
  let points = req.body.points

  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Could not connect', err);
    } else {
      updateUserScore(db, email, points, function(response) {
        console.log('response line 66', response.value);
        res.status(200).send(response.value);
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
      checkUser(db, email,
        function(userData) {//found User callback
          console.log('Found data for user with email:', userData[0]);
        }, function() {//did not find User callback
          exports.postUser(user);
      })
      db.close();
    });
  }
}