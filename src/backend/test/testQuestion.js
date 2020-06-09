const request = require('supertest');
const app = require('../server.js');

describe('GET /api/question', function () {
    it('returns list of all questions', function (done) {
        request(app)
            .get('/api/question')
            .expect(200, done);
    });
});

let questionId;
const quizId = 'testQuiz';

describe('POST /api/quizzes/:quiz_id/question', function () {
    it('creates a question', function (done) {
        request(app)
            .post('/api/quizzes/' + quizId + '/question')
            .set('Content-Type', 'application/json')
            .send({
                "title": "question created by automated testing",
                "description": "description created by automated testing",
                "image": "some link for image created by automated testing",
                "time": 15,
                "answers": ["answer_id_1", "answer_id_2", "answer_id_3"]
            })
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);

                //id of the answer
                questionId = res.body.id;

                return done();
            });
    });
});

describe('PUT /api/question/:id', function () {
    it('updates the newly created question', function (done) {
        request(app)
            .put('/api/question/' + questionId)
            .set('Content-Type', 'application/json')
            .send({
                time: 666,
                title: "changed title in automated tests",
                description: "changed description in automated tests",
                image: "changed image in automated tests",
                answers: ['changed_id_1', 'changed_id_2']
            })
            .expect(200, done);
    });

    it('verify newly created object is changed', function (done) {
        request(app)
            .get('/api/question/' + questionId)
            .expect(200, {
                time: 666,
                title: "changed title in automated tests",
                description: "changed description in automated tests",
                image: "changed image in automated tests",
                answers: ['changed_id_1', 'changed_id_2'],
                id: questionId
            }, done);
    })
})

describe('PUT /api/question/:id/add/:answer_id', function () {
    it('adds new answer to the array of answers for created question', function (done) {
        request(app)
            .put('/api/question/' + questionId + '/add/new_sample_answer_id')
            .expect(200, done);
    });

    it('verify that the answer id was added to array', function (done) {
        request(app)
            .get('/api/question/' + questionId)
            .expect(200, {
                title: "changed title in automated tests",
                description: "changed description in automated tests",
                image: "changed image in automated tests",
                time: 666,
                answers: ['changed_id_1', 'changed_id_2', 'new_sample_answer_id'],
                id: questionId
            }, done);
    });
});

describe('DELETE /api/question/:id/remove/:answer_id', function () {
    it('removes previously created answer from the array of answers for created question', function (done) {
        request(app)
            .delete('/api/question/' + questionId + '/remove/new_sample_answer_id')
            .expect(200, done);
    });

    it('verify that the answer id was removed from answers array', function (done) {
        request(app)
            .get('/api/question/' + questionId)
            .expect(200, {
                title: "changed title in automated tests",
                description: "changed description in automated tests",
                image: "changed image in automated tests",
                time: 666,
                answers: ['changed_id_1', 'changed_id_2'],
                id: questionId
            }, done);
    });
});

describe('DELETE /api/question/:id', function () {
    it ('removes a newly created question', function (done) {
        request(app)
            .delete('/api/question/' + questionId)
            .expect(200, done);
    })
})
