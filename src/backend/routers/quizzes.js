let router = module.exports = require('express').Router();
const axios = require('axios').default;
const token = 'ec876434fd97e327784f9f59b408a403ee2993ac6f9c1d95858d0059058000bb182aecc26d3af714ec80f9811d25332b9e4da589de61a41b501e05d299397fd8'
axios.defaults.headers.common['X-CSRFToken'] = 'ec876434fd97e327784f9f59b408a403ee2993ac6f9c1d95858d0059058000bb182aecc26d3af714ec80f9811d25332b9e4da589de61a41b501e05d299397fd8';
axios.defaults.headers.common['X-Database'] = 'lab';
axios.defaults.headers.common['Content-Type'] = 'application/json';
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5";




//get quizzes, with all the possible information (can take a while)
router.get('/all', (req, rsp) => {

    axios.get(`${baseUrl}/template`,{
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then((response) =>{

        async function f() {
            let responseData = response.data.template;
            let quizzes = [];
            for (let i = 0; i < responseData.length; i++) {
                id = responseData[i].tn;

                let response = await axios.get(`${baseUrl}/template/`+id+`/content`,{

                    headers: {
                        'X-CSRFToken': token,
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

    }).catch((error) =>{
        rsp.status(400).json(error);
    })
});

//get all data about one quiz - by id
router.get('/:quizId', (req, rsp) => {

    let firstReady = false;
    let secondReady = false;

    let quiz = {};

    axios.get(baseUrl + '/template' + '/' + req.params.quizId, {
        headers: {
            'X-CSRFToken': token,
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
        });

    axios.get(`${baseUrl}/template/${req.params.quizId}/content`,{
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        },
    } )
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

            if (firstReady) {
                rsp.status(200).json(quiz);
            } else {
                secondReady = true;
            }
        });

    return;
});

//get all quizzes -> id, color for the left side of the dashboard page
router.get('/', (req, rsp) => {
    axios.get(baseUrl + '/template', {
        headers: {
            'X-CSRFToken': token,
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

    //output - list of quizzes
    //[
    //     {
    //         "id": "6f6732v7g",
    //         "color": "#800080"
    //          "description":"gggg"
    //     },
    //     {
    //         "id": "evxzmj4mm",
    //         "color": "#008080"
    //           "description":"gggg"
    //     }
    // ]
});

//get the rest of information about particular quiz - by id
router.get('/:quizId/content', (req, rsp) => {

    axios.get(`${baseUrl}/template/${req.params.quizId}/content`, {
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then(function (response) {

        let result = (response.data.content.content);
        rsp.send(result);

    }).catch(error => rsp.send(error))

    //input - query params
    // quizId = "8dcesqfth'

    //output
    //{"owner": "WandaE",
    // "title": "Pubquiz - Quarantine edition",
    // "logo": "logo address",
    // "questions": "dt6r",
    // "active": "false"
    // }

})

//delete quiz by Id
router.delete('/:quizId', (req, rsp) => {
    axios.delete(`${baseUrl}/template/${req.params.quizId}`, {
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then(function (response) {
        rsp.status(200).json(response.data)
    }).catch((error) => {
        rsp.status(400).json(error)
    })


    //Query params:
    // quizId
    // output
    //{
    //     "message": []
    // }
});


//post new quiz
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
        rsp.status(400).json(err);

    });
    //input
    //{
    //     "label": "#008080",
    //     "description": "Random things you should know!",
    //     "type":"form_json",
    //     "status":"active",
    //     "contenttype": "JSON",
    //     "content" : {
    //             "owner": "WandaE",
    //             "title": "General knowledge",
    //             "logo": "logo address",
    //             "questions": "dr5rty",
    //             "active": "false"
    //
    //     }
    //
    // }

    //output
    //{
    //     "message": [],
    //     "tn": "evxzmj4mm"
    // }
});


//edit quiz details
router.put('/:quizId/content', (req, rsp) => {

    let active = req.body.active;
    let logo = req.body.logo;
    let title = req.body.title;
    let owner = req.body.owner;
    let questions = req.body.questions;

    axios.put(`${baseUrl}/template/${req.params.quizId}/content`, {

        tn: req.params.quizId,
        contenttype: 'JSON',
        content: {
            "owner": owner,
            "title": title,
            "logo": logo,
            "questions": questions,
            "active": active
        }

    }).then((response) => {
        rsp.status(200).json(response)
    }).catch((error) => {
        rsp.status(400).json(error)
    })

});


// update a quiz color and description
router.put('/:quizId/', (req, rsp) => {
    axios.put(`${baseUrl}/template/${req.params.quizId}`, {

        label: req.body.label, //color
        description: req.body.description,
        status: 'active'


    }).then((response) => {
        rsp.status(200).json(response)
    }).catch((error) => {
        rsp.status(400).json(error)
    })

});


// create new form
router.post('/start', (req, rsp) => {
    axios.post(`${baseUrl}/form`, {
        frm_label: 'Some label',
        type: 'survey',
        uh: req.body.uh,
        tn: req.body.tn,

        field: JSON.stringify({
            "frm_date_start": new Date().getFullYear
        })
    }).then((response) => {
        rsp.status(201).json(response.data);
    }).catch((err) => {
        rsp.status(400).json(err);
    });
});


// get existing form
router.get('/start', (req, rsp) => {

    axios.get(baseUrl + `/form`, {
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then(function (response) {

        rsp.send(response.data)

    }).catch(error => rsp.send(error))

})

//get particular form (by fh)
router.get('/start/:formId', (req, rsp) => {

    axios.get(`${baseUrl}/form/${req.params.formId}`, {
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then(function (response) {

        rsp.send(response.data)

    }).catch(error => rsp.send(error))

})

