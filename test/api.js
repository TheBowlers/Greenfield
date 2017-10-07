var MongoClient = require('mongodb').MongoClient;
var url = require('../config.js').dbUrl;
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../app.js');
var Users = require('../src/server/db/models/users.js');
var UserUtils = require('../src/server/db/utils/users-helpers.js');

app.listen(app.get('port'));
console.log('Testing is listening on', app.get('port'));   //starts the app.

var getBody = function (res) {
  return JSON.parse(res.text);
};

describe('RESTful API', function () {

  describe('/users', function () {

    describe('GET', function () {

      it('responds with a 200 (OK)', function (done) {

        request(app)
          .get('/users')
          .expect(200, done);

      });

      it('respond with json', function(done) {
        request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done, setTimeout(process.exit, 2000));


      });

    });
  });
});


