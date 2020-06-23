const request = require('supertest');
const app = require('../server.js');

 return;

let token = '';

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

describe('GET /api/answer', function () {
    it('returns list of all answers', function (done) {
        request(app)
            .get('/api/answer')
            .set('Authorization', token)
            .expect(200, done);
    });
});

let answerId;

describe('POST /api/answer', function () {
    it('adds the answer to the answer list', function (done) {
        request(app)
            .post('/api/answer')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .send({label: "Answer created in automated test", correct: false})
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);

                //id of the answer
                answerId = res.body.id;

                return done();
            });
    });
});

describe('GET /api/answer/:id', function () {
    it('returns an object with a newly created question', function (done) {
        request(app)
            .get('/api/answer/' + answerId)
            .set('Authorization', token)
            .expect(200, done);
    });
});

describe('PUT /api/answer/:id', function () {
    it('change "label" and "correct" fields into different', function (done) {
        request(app)
            .put('/api/answer/' + answerId)
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .send({label: "Changed in automated test", correct: true})
            .expect(200, done);
    });

    it('verify that fields are changed', function (done) {
        request(app)
            .get('/api/answer/' + answerId)
            .set('Authorization', token)
            .expect(200, {
                id: answerId,
                label: "Changed in automated test",
                correct: true
            }, done)
    })
});

describe('DELETE /api/answer/:id', function () {
    it('remove the answer newly created', function (done) {
        request(app)
            .delete('/api/answer/' + answerId)
            .set('Authorization', token)
            .expect(200, done);
    });
});
