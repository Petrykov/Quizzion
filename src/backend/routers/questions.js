let router = module.exports = require('express').Router();
const axios = require('axios').default;

axios.defaults.headers.common['X-CSRFToken'] = 'f2a219ca242cfe271f394fccc59382291bc5a0c581024f5d8d0af5973df969927839af7c9498ee1a72f7ee69a66788fea0fd9ee97e41a8ccd00f6e30a4de5b9c';
axios.defaults.headers.common['X-Database'] = 'lab';
axios.defaults.headers.common['Content-Type'] = 'application/json';


router.get('/quizzes/:quiz_id/question', (req, rsp) => {

    axios.get(getBaseURL() + '/v5/varoption').then((response) => {
        let allQuestions = response.data.varoptiongroup;
        let questions = [];
        for (let i = 0; i < allQuestions.length; i++) {
            if (allQuestions[i].label === req.params.quiz_id) {
                questions.push(allQuestions[i]);
            }
        }
        rsp.status(200).json(questions);
    }).catch((error) => {
        console.log("Error");
        rsp.status(400).json(error);
    });


});

router.post('/quizzes/:quiz_id/question', (req, rsp) => {

    //in body of request are:
    // * question name
    // * quiz ID

    if (req.body.name === undefined) {
        rsp.status(400).json({error: 'The name of question was not provided'});
    }

    console.log("To be sent to server: " + JSON.stringify({
        name: req.body.name,
        label: req.params.quiz_id
    }));

    axios.post(getBaseURL() + '/v5/varoption', {
        name: req.body.name,
        label: req.params.quiz_id
    }).then((response) => {
        rsp.status(201).json(response.data);
    }).catch((err) => {
        console.log("error");
        rsp.status(400).json(err);
    });
});

router.put('/quizzes/:quiz_id/question/:question_id', (req, rsp) => {

    let name = req.body.name;

    if (name === undefined) {
        rsp.status(400).json({error: 'The name in body was not included'});
        return;
    }

    axios.put(getBaseURL() + "/v5/varoption/" + req.params.question_id, {
        name: name,
        label: "something"
    }).then((response) => {
        rsp.status(200).json(response);
    }).catch((err) => {
        console.log("Error with PUT of question");
        rsp.status(500).json(err);
    });

});

router.delete('/quizzes/:quiz_id/question/:question_id', (req, rsp) => {
    axios.delete(getBaseURL() + '/v5/varoption/' + req.params.question_id)
        .then((response) => {
            rsp.status(200).json(response);
        }).catch((err) => {
            rsp.status(200).json(err);
    });
});

function getBaseURL() {
    return 'https://lab.dev.easion.nl/backend/api';
}
