let router = module.exports = require('express').Router();

const axios = require('axios').default;

axios.defaults.headers.common['X-CSRFToken'] = '72f32fe15b96d81d6e276f35185c3c7325d3bb4e3efc49c232d430121b368ca719dafb91c579020e25038faedfd75e292c0763db71b014801241534a96ada767';
axios.defaults.headers.common['X-Database'] = 'lab';

router.get('/quizzes/:quiz_id/question', (req, rsp) => {

    axios.get(getBaseURL() + '/v5/var').then((response) => {
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
                        time: question.time
                        //may be also the todo ANSWERS
                    });
                }
            } catch (e) {
            }
        }
        rsp.status(200).json(questions);
    }).catch((error) => {
        console.log("Error");
        console.log(error);
        rsp.status(400).json(error);
    });
});

router.post('/quizzes/:quiz_id/question', (req, rsp) => {
    //dummy data
    // req.body.title = 'title sample 2';
    // req.body.description = 'description 2 ';
    // req.body.image = 'some image here is definitely probably';
    // req.body.time = 230;

    let payload = {
        quiz_id: req.params.quiz_id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        time: req.body.time
    };

    //if some of field are undefined

    let payloadString = JSON.stringify(payload);

    axios.post(getBaseURL() + '/v5/var', {
        label: payloadString,
        vartype: 'item',
        datatype: 'text'
    }).then((response) => {
        rsp.status(201).json(response);
    }).catch((err) => {
        console.log("Error");
        rsp.json(err);
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
    axios.delete(getBaseURL() + '/v5/var/' + req.params.question_id)
        .then((response) => {
            rsp.status(200).json({message: "deleted"});
        }).catch((err) => {
        rsp.json(err);
    });
});

function getBaseURL() {
    return 'https://lab.dev.easion.nl/backend/api';
}
