
//Insert user data if it doesn't exist
var signupUser = function(db, user, callback) {
  //Specify the collection where we will 'insert' in this case 'users'
  var collection = db.collection('test-users');

  collection.insert(user, function(err, result) {

    console.log('Signed up a user', user, 'into Mongo collection');
    callback(result);
  });
}

//Find a user by email address
var findUserByEmail = function(db, email, success, failure) {
  //Specify the collection where we will 'find' in this case 'users'
  var collection = db.collection('test-users');
    //Find question, empty should return all
  // For testing purposes if you need to drop table:collection.drop()
  collection.find({ email: email }).toArray(function(err, user) {
    if (user.length) {
      success(user);
    } else {
      failure();
    }
  });
}

var findAllUsers = function(db, success, failure) {
  //Specify the collection where we will 'find' in this case 'users'
  var collection = db.collection('test-users');
    //Find question, empty should return all
  // For testing purposes if you need to drop table:collection.drop()
  collection.find({questionsAttempted: {$gt: 0}}).project({ _id: 0, displayName: 1, score: 1 , questionsAttempted: 1, questionsCorrect: 1}).sort({ score: -1}).toArray(function(err, user) {
    if (user.length) {
      success(user);
    } else {
      failure();
    }
  });
}


//Update user's score
var updateUserScore = function (db, email, points, isCorrect, callback) {


    var collection = db.collection('test-users');
    if (isCorrect === true) {
      collection.findOneAndUpdate(
        { email: email },
        { $inc: { "score" : points, questionsAttempted: 1, questionsCorrect: 1 } } //adds number of points to user's score
      , function(err, response) {
        callback(response);
      })
    } else {
      collection.findOneAndUpdate(
        { email: email },
        { $inc: { "score" : points, questionsAttempted: 1} } //adds number of points to user's score
      , function(err, response) {
        callback(response);
      })
    }



}

var updateUserQuestions = function(db, email, questionData, callback) {
  console.log(questionData)
  var collection = db.collection('test-users');
  let questionId = questionData.id;

  collection.findOneAndUpdate(
      { email: email},// "questionsAnswered._id": questionId },
      { $push: {
          questionsAnswered: questionData
        }
      }
      //adds question response data to user's data
    , function(err, response) {
      console.log('err',err,'res',response)
      callback(response);
    })
}

var updateUserQuestionsData = function(db, email, questionData, callback) {

  var collection = db.collection('test-users');
  let questionId = questionData.id;
  let queryString = "questionsAnswered.$." + questionId;

  collection.findAndModify(
      { email: email, questionsAnswered: {
          $elemMatch: {
            id: questionId
          }
        }
      },
      [],
      { $set: {"questionsAnswered.$": questionData}
      }
      //adds question response data to user's data
    , function(err, response) {
      console.log('err',err,'res',response)
      callback(response);
    })
}

var findUserResponseDataByEmail = function(db, email, success, failure) {
  //Specify the collection where we will 'find' in this case 'users'

  var collection = db.collection('test-users');
    //Find question, empty should return all
  // For testing purposes if you need to drop table:collection.drop()
  collection.find({ email: email }, {questionsAnswered: 1}).toArray(function(err, user) {
    if (user.length) {
      success(user);
    } else {
      failure();
    }
  });
}


module.exports = {
  signupUser: signupUser,
  findUserByEmail: findUserByEmail,
  findAllUsers: findAllUsers,
  updateUserScore: updateUserScore,
  updateUserQuestions: updateUserQuestions,
  updateUserQuestionsData: updateUserQuestionsData,
  findUserResponseDataByEmail: findUserResponseDataByEmail
}
