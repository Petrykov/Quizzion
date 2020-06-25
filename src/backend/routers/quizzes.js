let router = module.exports = require('express').Router();
const axios = require('axios').default;

axios.defaults.headers.common['X-Database'] = 'lab';

const baseUrl = "https://lab.dev.easion.nl/backend/api/v5";

router.use((req, rsp, next) => {
    axios.defaults.headers.common['X-CSRFToken'] = req.headers.authorization;
    next();
});

/**
 * @api {get} /quizzes/all Get all quizzes' information
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess {Object[]} quizzes List of quizzes. 
 * @apiSuccess  {String} quizzes.id Id of the quiz.
 * @apiSuccess  {String} quizzes.color Color of the quiz.
 * @apiSuccess  {String} quizzes.description Description of the quiz.
 * @apiSuccess  {String} quizzes.owner Owner of the quiz.
 * @apiSuccess  {String} quizzes.title Title of the quiz.
 * @apiSuccess  {String} quizzes.logo Logo of the quiz.
 * @apiSuccess  {Array} quizzes.questions Questions of the quiz.
 * @apiSuccess  {Boolean} quizzes.active Status of the quiz.
 * @apiError (400) {String} message Bad Request 
 */
router.get('/all', (req, rsp) => {

    axios.get(`${baseUrl}/template`, {
        headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then((response) => {

        async function f() {
            let responseData = response.data.template;
            let quizzes = [];
            for (let i = 0; i < responseData.length; i++) {
                id = responseData[i].tn;

                let response = await axios.get(`${baseUrl}/template/` + id + `/content`, {

                    headers: {
                        'X-Database': 'lab',
                        'Content-Type': 'application/json'
                    },
                });

                let content = JSON.parse(response.data.content.content);


                let quiz = {
                    id: id,
                    color: responseData[i].label,
                    description: responseData[i].description,
                    owner: content.owner,
                    title: content.title,
                    logo: content.logo,
                    questions: content.questions,
                    active: content.active

                };
                quizzes.push(quiz);
            }
            rsp.status(200).json(quizzes);
        }

        f();

    }).catch((error) => {
        rsp.status(400).json(error);
    })
});

/**
 * @api {get} /quizzes/:quizId Get a quiz by id
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} quizId Quiz unique ID
 * @apiSuccess {Object} quiz Quiz Object. 
 * @apiSuccess  {String} quiz.id Id of the quiz.
 * @apiSuccess  {String} quiz.color Color of the quiz.
 * @apiSuccess  {String} quiz.description Description of the quiz.
 * @apiSuccess  {String} quiz.owner Owner of the quiz.
 * @apiSuccess  {String} quiz.title Title of the quiz.
 * @apiSuccess  {String} quiz.logo Logo of the quiz.
 * @apiSuccess  {Array} quiz.questions Questions of the quiz.
 * @apiSuccess  {Boolean} quiz.active Status of the quiz.
 * @apiError (400) {String} message Bad Request 
 */
router.get('/:quizId', (req, rsp) => {

    let firstReady = false;
    let secondReady = false;

    let quiz = {};

    axios.get(baseUrl + '/template' + '/' + req.params.quizId, {
        headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        },
    })
        .then((res1) => {
            let responseData = res1.data.template;
            quiz.id = responseData.tn;
            quiz.color = responseData.label;
            quiz.description = responseData.description;

            firstReady = true;

            if (secondReady) {
                rsp.status(200).json(quiz);
            }
        }).catch((error) => {
            if (!secondReady) {
                rsp.status(400).json(error)
                firstReady = true;
            }
        });

    axios.get(`${baseUrl}/template/${req.params.quizId}/content`, {
        headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        },
    })
        .then((res2) => {
            let content = res2.data.content.content;
            try {
                content = JSON.parse(content);

                quiz.owner = content.owner;
                quiz.title = content.title;
                quiz.logo = content.logo;
                quiz.questions = content.questions;
                quiz.active = content.active;

            } catch (e) {

            }

            secondReady = true;

            if (firstReady) {
                rsp.status(200).json(quiz);
            }

        }).catch((error) => {
            if (!firstReady) {
                rsp.status(400).json(error);
                secondReady = true;
            }
        });

});

/**
 * @api {get} /quizzes/ Get all quizzes' basic info
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess {Object[]} quizzes List of quizzes. 
 * @apiSuccess  {String} quizzes.id Id of the quiz.
 * @apiSuccess  {String} quizzes.color Color of the quiz.
 * @apiSuccess  {String} quizzes.description Description of the quiz.
 * @apiError (400) {String} message Bad Request 
 */
router.get('/', (req, rsp) => {
    axios.get(baseUrl + '/template', {
        headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }
    }).then((response) => {

        let responseData = response.data.template;

        let quizzes = [];

        for (let i = 0; i < responseData.length; i++) {
            let quiz = {
                id: responseData[i].tn,
                color: responseData[i].label,
                description: responseData[i].description
            };
            quizzes.push(quiz);
        }

        rsp.status(200).json(quizzes);

    }).catch((error) => {
        rsp.status(400).json(error);
    })

});

/**
 * @api {get} /quizzes/:quizId/content Get a quiz's content by id
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} quizId Quiz unique ID
 * @apiSuccess {Object} quiz Quiz Object. 
 * @apiSuccess  {String} quiz.owner Owner of the quiz.
 * @apiSuccess  {String} quiz.title Title of the quiz.
 * @apiSuccess  {String} quiz.logo Logo of the quiz.
 * @apiSuccess  {Array} quiz.questions Questions of the quiz.
 * @apiSuccess  {Boolean} quiz.active Status of the quiz.
 * @apiError (400) {String} message Bad Request 
 */
router.get('/:quizId/content', (req, rsp) => {

    axios.get(`${baseUrl}/template/${req.params.quizId}/content`, {
        headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {

        let result = (response.data.content.content);
        rsp.setHeader('Content-Type', 'application/json');
        rsp.send(result);

    }).catch(error => rsp.send(error))

})

//delete quiz by Id
/**
 * @api {delete} /quizzes/:quizId Delete quiz by id
 * @apiGroup Quizzes
 * @apiParam {String} quizId Quiz unique ID
 * @apiSuccess {Array} message Empty Message. 
 * @apiError (400) {String} message Bad Request 
 */
router.delete('/:quizId', (req, rsp) => {
    axios.delete(`${baseUrl}/template/${req.params.quizId}`, {
        headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then(function (response) {
        rsp.status(200).json(response.data)
    }).catch((error) => {
        rsp.status(400).json(error)
    })

});

/**
 * @api {post} /quizzes Create new quiz
 * @apiGroup Quizzes
 * @apiSuccess {Object} quiz Quiz Object. 
 * @apiSuccess  {String} quiz.id Id of the quiz.
 * @apiSuccess  {Array} quiz.message Message from Parantion's backend.
 * @apiError (400) {String} message Bad Request 
 */
router.post('/', (req, rsp) => {

    let active = req.body.active;
    let logo = req.body.logo;
    let title = req.body.title;
    let owner = req.body.owner;
    let questions = req.body.questions;


    axios.post(`${baseUrl}/template`, {
        label: req.body.label, //save color as a label
        description: req.body.description,
        type: 'form_json',
        module: 'survey',
        status: 'active',
        contenttype: 'JSON',
        content: JSON.stringify({
            "owner": owner,
            "title": title,
            "logo": logo,
            "questions": questions,
            "active": active
        })

    }).then((response) => {
        rsp.status(201).json(response.data);
    }).catch((err) => {
        console.log(err);
        rsp.status(400).json(err);

    });

});

/**
 * @api {put} /quizzes/:quizId/edit Update a quiz by id
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} quizId Quiz unique ID
 * @apiParam {Object} quiz Quiz Object. 
 * @apiParam  {String} quiz.label Color of the quiz.
 * @apiParam  {String} quiz.description Description of the quiz.
 * @apiParam  {String} quiz.owner Owner of the quiz.
 * @apiParam  {String} quiz.title Title of the quiz.
 * @apiParam  {String} quiz.logo Logo of the quiz.
 * @apiParam  {Array} quiz.questions Questions of the quiz.
 * @apiParam  {Boolean} quiz.active Status of the quiz.
 * @apiSuccess  {Array} message Message from Parantion's backend.
 * @apiError (400) {String} message Bad Request 
 */
router.put('/:quizId/edit', (req, rsp) => {

    let firstReady = false;
    let secondReady = false;
    let label = req.body.label;
    let description = req.body.description;
    let owner = req.body.owner;
    let title = req.body.title;
    let logo = req.body.logo;
    let questions = req.body.questions;
    let active = req.body.active;

    axios.put(`${baseUrl}/template/${req.params.quizId}`, {
        label: label,
        description: description,
        status: 'active'

    })
        .then((res1) => {
            if (secondReady) {
                rsp.json(res1.data);
            } else {
                firstReady = true;
            }
        }).catch((error) => {
            if (!secondReady) {
                rsp.status(400).json(error)
                firstReady = true;
            }
        });

    axios.put(`${baseUrl}/template/${req.params.quizId}/content`, {
        contenttype: 'JSON',
        content: JSON.stringify({
            "owner": owner,
            "title": title,
            "logo": logo,
            "questions": questions,
            "active": active
        })

    })
        .then((res2) => {
            if (firstReady) {
                rsp.json(res2.data);
            } else {
                secondReady = true;
            }
        }).catch((error) => {
            if (!firstReady) {
                rsp.status(400).json(error)
                secondReady = true;
            }
        });

});

//edit quiz details
//COULD BE DELETED
router.put('/:quizId/content', (req, rsp) => {

    let owner = req.body.owner;
    let title = req.body.title;
    let logo = req.body.logo;
    let questions = req.body.questions;
    let active = req.body.active;

    let contentObject = {
        owner: owner,
        title: title,
        logo: logo,
        questions: questions,
        active: active
    };

    let wasGood = false;

    axios.put(`${baseUrl}/template/${req.params.quizId}/content`, {
        contenttype: 'JSON',
        content: JSON.stringify(contentObject)
    }).then((response) => {
        wasGood = true;
        rsp.status(200).send(response.data);
    }).catch((error) => {
        if (!wasGood) {
            rsp.status(400).json(error)
        }
    })

});

// update a quiz color and description

router.put('/:quizId', (req, rsp) => {
    axios.put(`${baseUrl}/template/${req.params.quizId}`, {

        label: req.body.label, //color
        description: req.body.description,
        status: 'active'


    }).then((response) => {
        rsp.json(response.data)
    }).catch((error) => {
        rsp.status(400).json(error)
    })

});

// create new form
//SHOULD BE DELETED
router.post('/start', async (req, rsp) => {

    const getQuestions = axios.get(`http://localhost:3000/api/quizzes/${req.body.tn}/question`, { headers: { authorization: req.headers.authorization } });
    const getAnswers = axios.get(`http://localhost:3000/api/answer`, { headers: { authorization: req.headers.authorization } });

    let answers, questions;
    await axios.all([getQuestions, getAnswers]).then(axios.spread((...responses) => {
        questions = responses[0];
        answers = responses[1];
    })).catch(errors => {
        console.log(errors)
    });

    axios.post(`${baseUrl}/form`, {
        frm_label: JSON.stringify(questions.data),
        type: 'survey',
        uh: req.body.uh,
        tn: req.body.tn,

        field: JSON.stringify({
            "frm_date_start": new Date().getFullYear
        })
    }).then((response) => {
        rsp.status(201).json(response.data);
    }).catch((err) => {
        console.log(err)
        rsp.status(400).json(err);

    });
});

// get existing forms
//SHOULD BE DELETED
router.get('/start', (req, rsp) => {

    axios.get(`${baseUrl}/form`, {
        headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then((response) => {

        rsp.status(200).json(response);

    }).catch((err) => {
        rsp.status(400).json(err);

    });
})

//get particular form (by fh)
//SHOULD BE DELETED
router.get('/start/:formId', (req, rsp) => {

    axios.get(`${baseUrl}/form/${req.params.formId}`, {
        headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then(function (response) {

        rsp.send(response.data)

    }).catch(error => rsp.send(error))

})