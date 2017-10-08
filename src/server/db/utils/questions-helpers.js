/********DATA CRUD METHODS********/
var mongodb = require("mongodb");
var ObjectId = mongodb.ObjectId;

//Using 'insert' to insert data to our collection
var insertQ = function(db, question, callback) {
  //Specify the collection where we will 'insert' in this case 'questions'
  var collection = db.collection('test-questions');
  //can use 'insertMany' to insert and array of JSON objects into collection
  collection.insert(question, function(err, result) {

    console.log('Inserted a question', question, 'into Mongo collection');
    callback(result.ops);
  });
}

var insertManyQs = function(db, questionsArray, callback) {
  //Specify the collection where we will 'insert' in this case 'questions'
  var collection = db.collection('test-questions');
  //can use 'insertMany' to insert and array of JSON objects into collection
  collection.insertMany(questionsArray, function(err, result) {

    console.log('Inserted a list of  questions', questionsArray, 'into Mongo collection');
    callback(result.ops);
  });
}


var findAllQ = function(db, callback) {
  var collection = db.collection('test-questions');
    //Find question, empty should return all
    collection.find({})
    .toArray(function(err, docs) {
      console.log('Found the following record(s)...');
      callback(docs);
    });
}

//Using 'find' to return data row(s) for a given questionType
var findQByType = function(db, questionType, callback) {
  //Specify the collection where we will 'find' in this case 'questions'

  var collection = db.collection('test-questions');
    //Find question, empty should return all
    collection.find({questionType: questionType})
    .toArray(function(err, questions) {
      console.log('Found the following record(s)...');
      callback(questions);
    });
}

var findQByCategory = function(db, questionType, callback) {
  //Specify the collection where we will 'find' in this case 'questions'

  var collection = db.collection('test-questions');
    //Find question, empty should return all
    collection.find({category: questionType})
    .toArray(function(err, questions) {
      console.log('Found the following record(s)...');
      callback(questions);
    });
}

//Using 'find' to return data row(s) for a given questionId
var findQById = function(db, questionId, callback) {
  //Specify the collection where we will 'find' in this case 'questions'

  var collection = db.collection('test-questions');
  console.log('id', questionId)
    //Find question, empty should return all
  collection.find({_id: ObjectId(questionId)})
  .toArray(function(err, question) {
    console.log('Found the following record(s)...', question);
    callback(question[0]);
  });
}

//Update data row
var updateQ = function(db, id, property, callback) {
  //Specify the collection where we will 'update' in this case 'questions'
  var collection = db.collection('test-questions');
  //Update selections where the first argument is the 'find' and the second argument is the 'replace'
  collection.updateOne({_id: id}, { $set: property}, function(err, result) {
    //assert.equal(err, null);
    //assert.equal(1, result.result.n);
    console.log("Updated question where _id = ", id, 'to contain', property);
    callback(result);
  })
}

//Remove data row
var removeQ = function(db, id, callback) {
  //Specify the collection where we will 'remove' in this case 'questions'
  var collection = db.collection('test-questions');
  // Delete document where a is 3
  collection.deleteOne({ _id : id }, function(err, result) {
    //assert.equal(err, null);
    //assert.equal(1, result.result.n);
    console.log("Removed a question where _id = ", id);
    callback(result);
  });
}


module.exports = {
  insertQ: insertQ,
  findQByType: findQByType,
  findQByCategory: findQByCategory,
  findQById: findQById,
  updateQ: updateQ,
  removeQ: removeQ,
  findAllQ: findAllQ,
  insertManyQs: insertManyQs
}
