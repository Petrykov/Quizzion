const request = require('supertest');
const app = require('../server.js');

describe('GET /api/quizzes', function () {
    it('returns all quizzes with basic information', function (done) {
        request(app)
            .get('/api/quizzes')
            .expect(200, done);
    });
});

describe('GET /api/quizzes/:quizId/content', function() {
    it('gets content of a particular quiz', function(done) {
      request(app)
          .get('/api/quizzes/:quizId/content')
          .expect(200, done);
    });
});

describe('GET /api/quizzes/all', function() {
    it('gets all quizzes with all the information', function(done) {
      request(app)
          .get('/api/quizzes/all')
          .expect(200, done);
    });
});

// describe('GET /api/quizzes/:quizId', function() {
//     it('get all information of a particular quiz', function(done) {
//       request(app)
//           .get('/api/quizzes/:quizId')
//           .expect(200, done);
//     });
// });
  

describe('POST /api/quizzes/', function () {
    it('creates a new quiz', function (done) {
        request(app)
            .post('/api/quizzes/')
            .set('Content-Type', 'application/json')
            .send({
                "label":"#008080",
                "description": "Random things you should know!",
                "owner": "WandaE",
                "title": "Pubquiz - Quarantine edition",
                "logo": "looogo",
                "questions": ["dt6r"],
                "active": "false"  
            })
            .expect(201, done)
           
    });
});

describe('DELETE /api/quizzes/:quizId', function() {
    it('removes a quiz', function(done) {
      request(app)
          .delete('/api/quizzes/:quizId')
          .expect(200, done);
    });
});

describe('PUT /api/quizzes/:quizId/edit', function () {
    it('updates a new quiz', function (done) {
        request(app)
            .put('/api/quizzes/:quizId/edit')
            .set('Content-Type', 'application/json')
            .send({
                "label":"#008080",
                "description": "Random things you should know!",
                "owner": "WandaE",
                "title": "Pubquiz - Quarantine edition",
                "logo": "looogo",
                "questions": ["dt6r"],
                "active": "false"  
            })
            .expect(200, done)
           
    });
});