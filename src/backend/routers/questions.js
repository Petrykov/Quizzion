let router = module.exports = require('express').Router();

const axios = require('axios').default;

axios.defaults.headers.common['X-CSRFToken'] = 'c6c598ed0016430830344f897f6cb2e9990185dea32ca85a5e88cbf12574c5fa1560f748c53fbbf01e46d6ede2cbe205567ad67ba5ce57d2fe99985910f7b280';
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
            } catch (e) {}
        }
        rsp.status(200).json(questions);
    }).catch((error) => {
        rsp.status(400).json(error);
    });
});

router.get('/quizzes/:quiz_id/question/:question_id', (req, rsp) => {
    axios.get(getBaseURL() + '/v5/var/' + req.params.question_id)
        .then((response) => {

            try {
                let result = JSON.parse(response.data.var[0].label);

                let res = {
                    id: req.params.question_id,
                    title: result.title,
                    description: result.description,
                    image: result.image,
                    time: result.time
                };

                rsp.status(200).json(res);
            } catch (e) {}
        }).catch((err) => {
            rsp.json(err);
    });
})

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
        rsp.json(response);
    }).catch((err) => {
        rsp.json(err);
    });
});

router.put('/quizzes/:quiz_id/question/:question_id', (req, rsp) => {

    let changes = {};

    //shortcut
    let b = req.body;

    if (b.title !== undefined) changes.title = b.title;
    if (b.description !== undefined) changes.description = b.description;
    if (b.image !== undefined) changes.image = b.image;
    if (b.time !== undefined) changes.time = b.time;

    console.log("Changes");
    console.log(changes);

    async function contin() {

        let response = await axios.get(getBaseURL() + '/v5/var/' + req.params.question_id);

        let label = response.data.var[0].label;

        try {
            label = JSON.parse(label);

            console.log('response');
            console.log(label);

            if (changes.title !== undefined) label.title = changes.title;
            if (changes.description !== undefined) label.description = changes.description;
            if (changes.image !== undefined) label.image = changes.image;
            if (changes.time !== undefined) label.time = changes.time;

            console.log("changed: ");
            console.log(label);
        } catch (e) {
        }

        console.log('Sending PUT');

        label = JSON.stringify(label);

        axios.put(getBaseURL() + '/v5/var/' + req.params.question_id, {
            label: label
        }).then((response) => {
            rsp.json(response);
        }).catch((err) => {
            rsp.json(err);
        });
    }

    contin();
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
