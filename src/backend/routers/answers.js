let router = module.exports = require('express').Router();

const axios = require('axios').default;
const BodyCheck = require('./helper/bodychecker');

const config = require('./../config');

// todo REMOVE AFTER DEMO
axios.defaults.headers.common['X-CSRFToken'] = config.token;
axios.defaults.headers.common['X-Database'] = 'lab';

router.get('/answer', (req, rsp) => {
    axios.get(config.baseURL + '/v5/var')
        .then((response) => {
            const elements = response.data.var;

            let answers = [];

            for (let i = 0; i < elements.length; i++) {

                try {
                    let answer = JSON.parse(elements[i].label);

                    if (answer.type === config.answer) {
                        answers.push({
                            id: elements[i].vh,
                            label: answer.label,
                            correct: answer.correct
                        })
                    }

                } catch (e) {
                }

            }

            rsp.status(200).json(answers);

        }).catch((err) => {
        rsp.json(err);
    })
});

router.get('/answer/:answer_id', (req, rsp) => {
    axios.get(config.baseURL + '/v5/var/' + req.params.answer_id)
        .then((response) => {
            let element = response.data.var[0];

            try {
                let answer = JSON.parse(element.label);

                rsp.status(200).json({
                    id: element.vh,
                    label: answer.label,
                    correct: answer.correct
                });

            } catch (e) {
                rsp.status(400).send();
            }
        }).catch( (err) => {
            rsp.status(400).json(err);
    });
});

router.post('/answer', (req, rsp) => {

    //checking if body of request has all arguments needed
    let bodyCheck = new BodyCheck();
    let result = bodyCheck.checkPOSTanswer(req.body);
    if (result.length !== 0) {
        rsp.status(400).json({error: result});
        return;
    }

    let payload = {
        type: config.answer,
        label: req.body.label,
        correct: req.body.correct
    };

    axios.post(config.baseURL + '/v5/var', {
        label: JSON.stringify(payload),
        vartype: 'item',
        datatype: 'text'
    }).then((response) => {
        rsp.status(201).json({id: response.data.vh});
    }).catch((err) => {
        rsp.json(err.data);
    })
});

router.put('/answer/:answer_id', (req, rsp) => {

    let changes = {};

    if (req.body.label !== undefined) changes.label = req.body.label;
    if (req.body.correct !== undefined) changes.correct = req.body.correct;

    async function continu() {
        let works = true;
        const response = await axios.get(config.baseURL + '/v5/var/' + req.params.answer_id).catch((err) => {
            rsp.json(err);
            works = false;
        });

        if (! works) return;

        let answer = response.data.var[0];
        let details = answer.label;
        try {
            details = JSON.parse(answer.label);

            if (changes.label !== undefined) details.label = changes.label;
            if (changes.correct !== undefined) details.correct = changes.correct;
        } catch (e) {}

        axios.put(config.baseURL + '/v5/var/' + req.params.answer_id, {
            label: JSON.stringify(details)
        }).then( (resp) => {
            rsp.json(resp)
        }).catch ( (err) => {
            rsp.json(err);
        });
    }

    continu();
});

router.delete('/answer/:answer_id', (req, rsp) => {
    let isSuccessful = false;

    //really weird is happening there
    //if request is good, it goes to 'then' and 'catch' causes
    axios.delete(config.baseURL + '/v5/var/' + req.params.answer_id)
        .then( (response) => {
            isSuccessful = true;
            rsp.status(200).json(response);
        }).catch( (err) => {
            if (isSuccessful) rsp.status(200).send();
            else rsp.status(400).json(err);
    })
});
