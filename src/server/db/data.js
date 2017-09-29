//Data CRUD operations
var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

//Connection URL

// This url is for our production server

// var url = 'mongodb://zackbiernat:ourGreenfieldpa$$word@datagreenfield-shard-00-00-nk723.mongodb.net:27017,datagreenfield-shard-00-01-nk723.mongodb.net:27017,datagreenfield-shard-00-02-nk723.mongodb.net:27017/test?ssl=true&replicaSet=DataGreenfield-shard-0&authSource=admin'

//Add test url here
var url = '';

//Use connect method to connect to the server


//This code is for INSERT aka POST

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log('Connected to MongoDB server');
//   insertDocuments(db, function() {
//     //closes connection with callback after inserting data
//     db.close();
//   });
// });

//This code is for FIND aka GET

// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log('Connected to MongoDB server');
//   findDocuments(db, function() {
//     //closes connection with callback after inserting data
//     db.close();
//   });
// });

//This code is for UPDATE aka PUT
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log('Connected to MongoDB server');
//   updateDocument(db, function() {
//     //closes connection with callback after inserting data
//     db.close();
//   });
// });

//This code is for REMOVE aka DELETE
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log('Connected to MongoDB server');
//   removeDocument(db, function() {
//     //closes connection with callback after inserting data
//     db.close();
//   });
// });


//This code is for INDEXing a collection by a given key
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log('Connected to MongoDB server');
//   indexCollection(db, function() {
//     //closes connection with callback after inserting data
//     db.close();
//   });
// });

/********DATA METHODS********/

//Using 'insertMany' to insert data to our collection
var insertDocuments = function(db, callback) {
  //Specify the collection where we will 'insert' in this case 'documents'
  var collection = db.collection('documents');
  //use insertMany to insert and array of JSON objects into collection
  collection.insertMany([
    //{name: "zack"}, {name: "jonathon"}, {name: "kent"}

    //more likely collection.insertMany(someArry of objects, function( err, results) {...})

    ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n); //result.result Result sent from MongoDB
    assert.equal(3, result.ops.length); // Includes added '_id' fields
    //result.connection contains the connection used to perfrom the insert
    console.log('Inserted 3 documents into Mongo collection');
    callback(result);
  });
}

//Using 'find' to return data
var findDocuments = function(db, callback) {
  //Specify the collection where we will 'find' in this case 'documents'
  var collection = db.collection('documents');
    //Find documents, empty should return all. Specify a JSON porperty you are searching for ex: collection.find({name: "zack"})
    collection.find({})
    .toArray(function(err, docs) {
      assert.equal(err, null);
      console.log('Found the following records...');
      console.log(docs);
      callback(docs);
    });
}

//Update data row
var updateDocument = function(db, callback) {
  //Specify the collection where we will 'find' in this case 'documents'
  var collection = db.collection('documents');
  //Update selections where the first argument is the 'find' and the second argument is the 'replace'
  collection.updateOne({name: "kent"}, { $set: {location: "Kentucky"}}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated user 'kent' location");
    callback(result);
  })
}

//Remove data row
var removeDocument = function(db, callback) {
  //Specify the collection where we will 'find' in this case 'documents'
  var collection = db.collection('documents');
  // Delete document where a is 3
  collection.deleteOne({ name : "zack" }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed a document where name='zack'");
    callback(result);
  });
}

//Make a "hashed" index on collection
var indexCollection = function(db, callback) {
  //Specify the collection where we will 'find' in this case 'documents'
  db.collection('documents')
  .createIndex(
  {"name": 1},
  null,
  function(err, results) {
    console.log("Created index on 'name' property");
    console.log(results);
    callback();
  }
  )
}
