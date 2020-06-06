let router = module.exports = require('express').Router();

const config = require('./../config');

const axios = require('axios').default;

// todo REMOVE AFTER DEMO
axios.defaults.headers.common['X-CSRFToken'] = config.token;
axios.defaults.headers.common['X-Database'] = 'lab';

router.get('/answer', (req, rsp) => {
    axios.get(config.baseURL + '/v5/var')
        .then( (response) => {
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

                } catch (e) {}

            }

            rsp.status(200).json(answers);

        }).catch( (err) => {
            rsp.json(err);
    })
});

router.post('/answer', (req, rsp) => {

    // for answer
    // * name
    // * isCorrect

    let payload = {
        type: config.answer,
        label: req.body.label,
        correct: req.body.correct
    };

    console.log(payload);

    axios.post(config.baseURL + '/v5/var', {
        label: JSON.stringify(payload),
        vartype: 'item',
        datatype: 'text'
    }).then( (response) => {
        rsp.json({id: response.data.vh});
    }).catch( (err) => {
        rsp.json(err.data);
    })
});
