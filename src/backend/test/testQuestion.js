const request = require('supertest');
const app = require('../server.js');

let token = '';


describe('POST /api/user/login', function () {
    it('generates a token', function (done) {
        request(app)
            .post('/api/user/login')
            .send({
                "username": "quizzion_user2",
                "password": "ff47967c96b6e97403997b6ef1168fef"
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

describe('GET /api/question', function () {
    it('returns list of all questions', function (done) {
        request(app)
            .get('/api/question')
            .set('Authorization', token)
            .expect(200, done);
    });
});

let questionId;
let quiz_id = '';


describe('POST /api/quizzes/:quiz_id/question', function () {

    it('creates a mock quiz, where question will be added', function (done) {
        request(app)
            .post('/api/quizzes/')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .send({
                label: "test color (generated in automated testing)",
                description: "Test name (generated in automated testing)",
                owner: "Test owner (generated in automated testing)",
                title: "Test title (generated in automated testing)",
                logo: "test logo (generated in automated testing)",
                questions: [
                    "-1- (generated in automated testing)",
                    "-1- (generated in automated testing)"
                ],
                active: "false"
            })
            .expect(201)
            .end((err, rsp) => {
                if (err) throw err;
                quiz_id = rsp.body.tn;
                return done();
            })
    })

    it('creates a question', function (done) {
        request(app)
            .post('/api/quizzes/' + quiz_id + '/question')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .send({
                "title": "question created by automated testing",
                "description": "description created by automated testing",
                "image": "some link for image created by automated testing",
                "time": 15,
                "answers": ["answer_id_1", "answer_id_2", "answer_id_3"]
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;

                //id of the answer
                questionId = res.body.id;

                return done();
            });
    });

    it('verify that quiz has id of newly created question', function (done) {
        request(app)
            .get('/api/quizzes/' + quiz_id + '/content')
            .set('Authorization', token)
            .expect(200)
            .end((err, rsp) => {
                if (err) throw err;
                let questionDetails = rsp.body;

                let questionIdExists = false;
                for (let i = 0; i < questionDetails.questions.length; i++) {
                    if (questionDetails.questions[i] === questionId) questionIdExists = true;
                }

                if (!questionIdExists) {
                    throw "POST /api/quizzes/:quiz_id/question does not add question id to list if id"
                }
                return done();
            })

    })
});

describe.skip('PUT /api/question/:id', function () {
    it('updates the newly created question', function (done) {
        request(app)
            .put('/api/question/' + questionId)
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
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
            .set('Authorization', token)
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

describe.skip('PUT /api/question/:id/add/:answer_id', function () {
    it('adds new answer to the array of answers for created question', function (done) {
        request(app)
            .put('/api/question/' + questionId + '/add/new_sample_answer_id')
            .set('Authorization', token)
            .expect(200, done);
    });

    it('verify that the answer id was added to array', function (done) {
        request(app)
            .get('/api/question/' + questionId)
            .set('Authorization', token)
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

describe.skip('DELETE /api/question/:id/remove/:answer_id', function () {
    it('removes previously created answer from the array of answers for created question', function (done) {
        request(app)
            .delete('/api/question/' + questionId + '/remove/new_sample_answer_id')
            .set('Authorization', token)
            .expect(200, done);
    });

    it('verify that the answer id was removed from answers array', function (done) {
        request(app)
            .get('/api/question/' + questionId)
            .set('Authorization', token)
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
    it('removes a newly created question', function (done) {
        request(app)
            .delete('/api/question/' + questionId)
            .set('Authorization', token)
            .expect(200, done);
    })

    it('removes the id removed question in quiz`s answers[] array', function (done) {
        request(app)
            .get('/api/quizzes/' + quiz_id + '/content')
            .set('Authorization', token)
            .expect(200)
            .end((err, rsp) => {
                if (err) throw err;
                let questionDetails = rsp.body;

                let questionIdExists = true;
                for (let i = 0; i < questionDetails.questions.length; i++) {
                    if (questionDetails.questions[i] === questionId) questionIdExists = false;
                }

                if (!questionIdExists) {
                    throw "POST /api/quizzes/:quiz_id/question does not remove a ";
                }
                return done();
            })
    });
});

describe('Removes a test quiz', function () {
    it('does that', function (done) {
        request(app)
            .delete('/api/quizzes/' + quiz_id)
            .set('Authorization', token)
            .expect(200)
            .end((err, rsp) => {
                if (err) throw err;
                done();
            });
    });
});
