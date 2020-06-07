const request = require('supertest');
const app = require('../server.js');

/**
 * Make sure that the list is empty in the beginning of the application
 */

describe('GET /api/answer', function () {
    it('returns list of all answers', function (done) {
        request(app)
            .get('/api/answer')
            .expect(200, done);
    });
});

let answerId;

describe('POST /api/answer', function () {
    it('adds the answer to the answer list', function (done) {
        request(app)
            .post('/api/answer')
            .set('Content-Type', 'application/json')
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
            .expect(200, done);
    });
});

describe('PUT /api/answer/:id', function () {
    it('change "label" and "correct" fields into different', function (done) {
        request(app)
            .put('/api/answer/' + answerId)
            .set('Content-Type', 'application/json')
            .send({label: "Changed in automated test", correct: true})
            .expect(200, done);
    });

    it('verify that fields are changed', function (done) {
        request(app)
            .get('/api/answer/' + answerId)
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
            .expect(200, done);
    });
});
