//server-config.js

var app = require('../../../../app.js').app;

var cors = require('cors');
var bodyParser = require('body-parser');
//Connection handler
var MongoClient = require('./db/questions-handlers.js').MongoClient;
//Request handlers
var insertQ = require('./db/questions-handlers.js').insertQ;
var findQ = require('./db/questions-handlers.js').findQ;
var updateQ = require('./db/questions-handlers.js').updateQ;
var removeQ = require('./db/questions-handlers.js').removeQ;
var indexQ = require('./db/questions-handlers.js').indexQ;
//Use proper url for MongoDB cluster
var url = require('../../config.js').dbUrl;


app.use(cors());

app.use(bodyParser.json());

//Fetches questions of a particular "questionType", selects one at random to send back
//This should eventually be optimized to only send questions to which the user has not responded
app.get('/questions', function(req, res, next) {
  let response = [];

  //Question genre id
  let questionType = req.query.questionType;

  if (!questionType) {
    console.log('No question type given');
    //Could also be made to give an utterly random question
  } else {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log('Connected to MongoDB server');
      findQ(db, function(questions) {
        questions.forEach(function(question) {
          response.push(question);
        });
        let chooseOne = Math.floor(Math.random * response.length);
        res.send(response[chooseOne]);
        db.close();
      });
    });
    }
});

//Adds question to database
app.post('/questions', function(req, res) {

  //The question object which will be added
  let question = req.body;

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected to MongoDB server');
    insertQ(db, function() {
      //inserts to table and creates a unique index based on prompt
      indexQ(db function() {
        res.send('Added question to database')
        db.close();
      });
    });
  });
});

//Delete a question from database
app.post('/questions/remove', function(req, res) {
  let id =
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected to MongoDB server');
    removeQ(db, function() {
      db.close();
    });
  });
});

