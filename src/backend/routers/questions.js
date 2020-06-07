let router = module.exports = require('express').Router();

const config = require('./../config');

const BodyChecker = require('./helper/bodychecker');

const axios = require('axios').default;

axios.defaults.headers.common['X-CSRFToken'] = config.token;
axios.defaults.headers.common['X-Database'] = 'lab';

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
                        time: question.time
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
                    answers: result.answers
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
                        image: question.image,
                        time: question.time,
                        answers: question.answers
                    });
                }
            } catch (e) {
            }
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
        rsp.json({id: response.data.vh});
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

    async function contin() {

        let response = await axios.get(config.baseURL + '/v5/var/' + req.params.question_id);

        let label = response.data.var[0].label;

        try {
            label = JSON.parse(label);

            if (changes.title !== undefined) label.title = changes.title;
            if (changes.description !== undefined) label.description = changes.description;
            if (changes.image !== undefined) label.image = changes.image;
            if (changes.time !== undefined) label.time = changes.time;

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
            }).then( (response) => {
                rsp.status(200).json(response);
            }).catch( (err) => {
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
                    question.answers.splice(i,1);
                }
            }

            axios.put(config.baseURL + '/v5/var/' + req.params.question_id, {
                label: JSON.stringify(question)
            }).then( (response) => {
                rsp.status(200).json(response);
            }).catch( (err) => {
                rsp.json(err);
            });

        } catch (e) {
            rsp.status(400).json({error: 'question id is not valid'});
        }
    }
    f();
});

router.delete('/question/:question_id', (req, rsp) => {
    axios.delete(config.baseURL + '/v5/var/' + req.params.question_id)
        .then((response) => {
            rsp.status(200).json({message: "deleted"});
        }).catch((err) => {
        rsp.json(err);
    });
});

