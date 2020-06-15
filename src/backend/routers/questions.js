let router = module.exports = require('express').Router();

const config = require('./../config');

const BodyChecker = require('./helper/bodychecker');

const axios = require('axios').default;

axios.defaults.headers.common['X-Database'] = 'lab';

router.use((req, rsp, next) => {
    axios.defaults.headers.common['X-CSRFToken'] = req.headers.authorization;
    next();
});

router.get('/question', (req, rsp) => {
    axios.get(config.baseURL + '/v5/var').then((response) => {
        let elements = response.data.var;
        let questions = [];
        for (let i = 0; i < elements.length; i++) {
            try {
                // the line below produces an error if the label does not have a json wrapped in it
                let question = JSON.parse(elements[i].label);

                if (question.type === config.question) {

                    let quest = {
                        id: elements[i].vh,
                        title: question.title,
                        description: question.description,
                        image: question.image,
                        time: question.time,
                        name: elements[i].name
                    };

                    if (question.answers !== undefined) quest.answers = question.answers;

                    questions.push(quest);
                }
            } catch (e) {
            }
        }
        rsp.status(200).json(questions);
    }).catch((error) => {
        rsp.status(400).json(error);
    });
});

router.get('/question/:question_id', (req, rsp) => {
    axios.get(config.baseURL + '/v5/var/' + req.params.question_id)
        .then((response) => {
            try {
                let result = JSON.parse(response.data.var[0].label);

                let res = {
                    id: req.params.question_id,
                    title: result.title,
                    description: result.description,
                    image: result.image,
                    time: result.time,
                    answers: result.answer,
                    name: response.data.var[0].name
                };

                rsp.status(200).json(res);
            } catch (e) {
            }
        }).catch((err) => {
        rsp.json(err);
    });
});

router.get('/quizzes/:quiz_id/question', (req, rsp) => {

    axios.get(config.baseURL + '/v5/var').then((response) => {
        let allQuestions = response.data.var;
        let questions = [];
        for (let i = 0; i < allQuestions.length; i++) {
            try {
                // the line below produces an error if the label does not have a json wrapped in it
                let question = JSON.parse(allQuestions[i].label);

                if (question.quiz_id === req.params.quiz_id) {
                    questions.push({
                        id: allQuestions[i].vh,
                        title: question.title,
                        description: question.description,
                        quiz_id: question.quiz_id,
                        image: question.image,
                        time: question.time,
                        answers: question.answers,
                        name: allQuestions[i].name
                    });
                }
            } catch (e) {}
        }
        rsp.status(200).json(questions);
    }).catch((error) => {
        rsp.status(400).json(error);
    });
});

router.post('/quizzes/:quiz_id/question', (req, rsp) => {
    //check if all field are present in body

    let bodyChecker = new BodyChecker();

    let inspectionResult = bodyChecker.checkPOSTquestion(req.body);

    console.log(req.body);

    if (inspectionResult.length !== 0) {
        rsp.status(400).json({error: inspectionResult});
        return;
    }

    let payload = {
        type: config.question,
        quiz_id: req.params.quiz_id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        time: req.body.time,
        answers: req.body.answers
    };

    let payloadString = JSON.stringify(payload);

    axios.post(config.baseURL + '/v5/var', {
        label: payloadString,
        vartype: 'item',
        datatype: 'text'
    }).then((response) => {

        async function f() {

            let isGood = false;

            let quizDetails = await axios.get('http://localhost:3000/api/quizzes/' + req.params.quiz_id + "/content", {
                headers: {
                    Authorization: req.headers.authorization
                }
            });

            quizDetails = quizDetails.data;

            quizDetails.questions.push(response.data.vh);

            axios.put('http://localhost:3000/api/quizzes/' + req.params.quiz_id + "/content", quizDetails, {
                headers: {
                    Authorization: req.headers.authorization
                }
            }).then((res) => {
                rsp.json({
                    id: response.data.vh,
                    name: response.data.name
                });
            }).catch((errr) => {
                rsp.status(400).json(errr);
            })
        }

        f();
    }).catch((err) => {
        rsp.json(err);
    });
});

router.put('/question/:question_id', (req, rsp) => {

    let changes = {};

    //shortcut
    let b = req.body;

    if (b.title !== undefined) changes.title = b.title;
    if (b.description !== undefined) changes.description = b.description;
    if (b.image !== undefined) changes.image = b.image;
    if (b.time !== undefined) changes.time = b.time;
    if (b.answers !== undefined) changes.answers = b.answers;
    if (b.quiz_id !== undefined) changes.quiz_id = b.quiz_id;

    async function contin() {

        let response = await axios.get(config.baseURL + '/v5/var/' + req.params.question_id);

        let label = response.data.var[0].label;

        try {
            label = JSON.parse(label);

            if (changes.title !== undefined) label.title = changes.title;
            if (changes.description !== undefined) label.description = changes.description;
            if (changes.image !== undefined) label.image = changes.image;
            if (changes.time !== undefined) label.time = changes.time;
            if (changes.answers !== undefined) label.answers = changes.answers;
            if (changes.quiz_id !== undefined) label.quiz_id = changes.quiz_id;
        } catch (e) {
        }

        label = JSON.stringify(label);

        axios.put(config.baseURL + '/v5/var/' + req.params.question_id, {
            label: label
        }).then((response) => {
            rsp.json(response);
        }).catch((err) => {
            rsp.json(err);
        });
    }

    contin();
});

router.put('/question/:question_id/add/:answer_id', (req, rsp) => {

    async function f() {
        let works = true;

        const response = await axios.get(config.baseURL + '/v5/var/' + req.params.question_id).catch((err) => {
            works = false;
        });

        if (!works) {
            rsp.status(400).json({error: 'question id is not valid'});
            return;
        }

        let element = response.data.var[0];

        try {
            let question = JSON.parse(element.label);

            question.answers.push(req.params.answer_id);

            axios.put(config.baseURL + '/v5/var/' + req.params.question_id, {
                label: JSON.stringify(question)
            }).then((response) => {
                rsp.status(200).json(response);
            }).catch((err) => {
                rsp.json(err);
            });

        } catch (e) {
            rsp.status(400).json({error: 'question id is not valid'});
        }
    }

    f();

});

router.delete('/question/:question_id/remove/:answer_id', (req, rsp) => {
    async function f() {
        let works = true;

        const response = await axios.get(config.baseURL + '/v5/var/' + req.params.question_id).catch((err) => {
            works = false;
        });

        if (!works) {
            rsp.status(400).json({error: 'question id is not valid'});
            return;
        }

        let element = response.data.var[0];

        try {
            let question = JSON.parse(element.label);

            if (question.answers === undefined) {
                rsp.status(400).json({error: "Answers for question " + req.params.question_id + " does not exist"});
                return;
            }

            let removed = false;

            for (let i = 0; i < question.answers.length; i++) {
                if (req.params.answer_id === question.answers[i]) {
                    //removing an element from array
                    question.answers.splice(i, 1);
                }
            }

            axios.put(config.baseURL + '/v5/var/' + req.params.question_id, {
                label: JSON.stringify(question)
            }).then((response) => {
                rsp.status(200).json(response);
            }).catch((err) => {
                rsp.json(err);
            });

        } catch (e) {
            rsp.status(400).json({error: 'question id is not valid'});
        }
    }

    f();
});

router.delete('/question/:question_id', async (req, rsp) => {

    let response = await axios.get('http://localhost:3000/api/question/' + req.params.question_id, {
        headers: {
            Authorization: req.headers.authorization
        }
    });

    const quiz_id = response.data.quiz_id;

    axios.delete(config.baseURL + '/v5/var/' + req.params.question_id)
        .then(async (response) => {

            let quiz = await axios.get('http://localhost:3000/api/quizzes/' + quiz_id + '/content', {
                headers: {
                    Authorization: req.headers.authorization
                }
            });

            quiz = quiz.data;

            if (quiz.questions === undefined) {
                rsp.status(400).json({error: "Question is not in the quiz list"});
                return;
            }
            for (let i = 0; i < quiz.questions.length; i++) {
                if (quiz.questions[i] === req.params.question_id) {
                    quiz.questions.splice(i, 1);
                }
            }

            axios.put('http://localhost:3000/api/quizzes/' + quiz_id + '/content', quiz, {
                headers: {
                    Authorization: req.headers.authorization
                }
            }).then((resp) => {
                rsp.status(200).json({message: "deleted"})
            }).catch((errr) => {
                rsp.status(400).json(errr);
            });

        }).catch((err) => {
        rsp.json(err);
    });

});

