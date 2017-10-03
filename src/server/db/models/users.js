var MongoClient = require('mongodb').MongoClient;
//Use proper url for MongoDB cluster
var url = require('../../../.././config.js').dbUrl;
//User helper functions
var signupUser = require('.././utils/users-helpers.js').signupUser;
var findUser = require('.././utils/users-helpers.js').findUser;
var updateUserScore = require('.././utils/users-helpers.js').updateUserScore;

exports.postUser = function(req, res) {
  //The user object which will be added
  let question = req.body;

  MongoClient.connect(url, function(err, db) {
    console.log('Connected to MongoDB server');
    signupUser(db, user, function() {
      //inserts user to table
      res.status(200).send('User added to database');
      db.close();
    });
  });
}

exports.handleUserData = function(user, res) {
  //fetched questions are pushed to array

  //User email
  let email = user.emails[0].value;

  if (!email) {
    console.log('No valid email');
    //Could also be made to give an utterly random question
  } else {
    MongoClient.connect(url, function(err, db) {
      if(err){
        return console.error(err);
      }
      console.log('Connected to MongoDB server');
      findUser(db, email,
        function(user) {//found User callback

        }, function(user) {//did not find User callback

      })
      db.close();
    });
  }
}