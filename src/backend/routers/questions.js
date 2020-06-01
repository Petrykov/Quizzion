let router = module.exports = require('express').Router();
const axios = require('axios').default;

axios.defaults.headers.common['X-CSRFToken'] = 'b2228a5703ffdcab1459672d2da782db17b95e916ca45b2ad71a2300dbc3e13bf0e43a7a5ed9f0921bc73a4be4f1478a512c7dfe2753966cba2188300778544f';
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
        rsp.status(500).json(err);
        // throw err;
    });
});


function getBaseURL() {
    return 'https://lab.dev.easion.nl/backend/api';
}
