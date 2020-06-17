const request = require('supertest');
const app = require('../server.js');

let token = '';


return;

describe('POST /api/user/login', function () {
    it ('generates a token', function (done) {
        request(app)
            .post('/api/user/login')
            .send({
                "username" : "quizzion_user2",
                "password" : "ff47967c96b6e97403997b6ef1168fef"
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                //receiving token
                token = res.body.token;
                return done();
            });
    })
});

describe('GET /api/quizzes', function () {
    it('returns all quizzes with basic information', function (done) {
        request(app)
            .get('/api/quizzes')
            .set('Authorization', token)
            .expect(200, done);
    });
});

describe('GET /api/quizzes/:quizId/content', function() {
    it('gets content of a particular quiz', function(done) {
      request(app)
          .get('/api/quizzes/:quizId/content')
          .set('Authorization', token)
          .expect(200, done);
    });
});


describe('GET /api/quizzes/:quizId', function() {
    it('get all information of a particular quiz', function(done) {
      request(app)
          .get('/api/quizzes/:quizId')
          .set('Authorization', token)
          .expect(200, done());
    });
});

describe('GET /api/quizzes/all', function() {
    it('gets all quizzes with all the information', function(done) {
      request(app)
          .get('/api/quizzes/all')
          .set('Authorization', token)
          .expect(200, done());
    });
});

describe('POST /api/quizzes/', function () {
    it('creates a new quiz', function (done) {
        request(app)
            .post('/api/quizzes/')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
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

describe('PUT /api/quizzes/:quizId/edit', function () {
    it('updates a new quiz', function (done) {
        request(app)
            .put('/api/quizzes/:quizId/edit')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .send({
                "label":"#008080",
                "description": "Random things you should know!",
                "owner": "WandaE",
                "title": "Pubquiz - Quarantine edition",
                "logo": "looogo",
                "questions": ["dt6r"],
                "active": "false"
            })
            .expect(200, done())

    });
});

describe('PUT /api/quizzes/:quizId', function () {
    it('updates basic information about one quiz', function (done) {
        request(app)
            .put('/api/quizzes/:quizId')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .send({
                "label":"#008080",
                "description": "Random things you should know!",
            })
            .expect(200, done)
    });
});

describe('PUT /api/quizzes/:quizId/content', function () {
    it('updates information about one quiz', function (done) {
        request(app)
            .put('/api/quizzes/:quizId/content')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .send({
                "owner": "WandaE",
                "title": "Pubquiz - Quarantine edition",
                "logo": "looogo",
                "questions": ["dt6r"],
                "active": "false"
            })
            .expect(200, done)

    });
});

describe('DELETE /api/quizzes/:quizId', function() {
    it('removes a quiz', function(done) {
      request(app)
          .delete('/api/quizzes/:quizId')
          .set('Authorization', token)
          .expect(200, done());
    });
});



describe('POST /api/quizzes/start', function () {
    it('creates a new form', function (done) {
        request(app)
            .post('/api/quizzes/start')
            .set('Authorization', token)
            .send({
                "uh": "b42050a333bd7ad0befd7dfbb9dc4879",
                "tn": "b2mh4t9jr"
            })
            .expect(201, done)

    });

});

describe('GET api/quizzes/start', function() {
    it('gets  forms with all the information', function(done) {
      request(app)
          .get('/start')
          .set('Authorization', token)
          .expect(200, done());
    });
});

describe('GET api/quizzes/start/:formId', function() {
    it('gets a form with all the information', function(done) {
      request(app)
          .get('/start/:formId')
          .set('Authorization', token)
          .expect(200, done());
    });
});
