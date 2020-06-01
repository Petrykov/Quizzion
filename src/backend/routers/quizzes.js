let router = module.exports = require('express').Router();
const axios = require('axios').default;
axios.defaults.headers.common['X-CSRFToken'] = '5e6543f41c254f996a5e0beead5b858f810167f1ed4aea2bcde172d1947e26e953fa66ca7370630b7dd43d64541e13bf7b3ec63fee229ba46e27aa8a04f8f389';
axios.defaults.headers.common['X-Database'] = 'lab';
axios.defaults.headers.common['Content-Type'] = 'application/json';
var baseURL = 'https://lab.dev.easion.nl/backend/api/v5';
var tn;


router.post('/quizzes', (req, rsp) => {
    const templateContent = {
        type: 'quiz'
    };
    axios.post(baseURL + '/template', {
        type: 'form_json',
        module: 'survey',
        status: 'active',
        label: req.body.title,
        description: req.body.description,
        content: templateContent
    }).then((response) => {
        tn = response.data.tn;
            axios.post(baseURL + '/form',{
                frm_label: req.body.title,
                type: 'survey',
                tn: tn,
                field: {
                    id: req.body.id,
                    color: req.body.color,
                    logo: req.body.logo,
                    //questions?
                }
            }).catch((error) => {
                rsp.status(400).json(error)
            })
    }).catch((err) => {
        rsp.status(400).json(err);

    });
});


//get all quizzes
router.get('/quizzes', (req, rsp) => {
    axios.get(baseURL + '/template').then((response) =>{
        let quizzes = response.data.message;
        rsp.status(200).json(quizzes);
    }).catch((error) =>{
        rsp.status(400).json(error);
    })

});

//post new quiz
router.post('/quizzes', (req, rsp) => {

    const templateContent = {
      type: 'quiz',
      properties: {
        id: req.body.id,
        color: req.body.color,
        logo: req.body.logo,
        //questions?

      }
    };
    axios.post(baseURL + '/template', {
        type: 'form_json',
        module: 'survey',
        status: 'active',
        label: req.body.title,
        description: req.body.description,
        content: templateContent
    }).then((response) => {
        rsp.status(201).json(response.data);
    }).catch((err) => {
        rsp.status(400).json(err);

    });
});



//edit quiz
router.put('/quizzes/{quiz.id}', (req, rsp) => {
    axios.put(baseURL + '/template/{tn}',{

    }).then((response) => {
        rsp.status(200).json(response.data)
    }).catch((error) =>{
        rsp.status(400).json(error)
    })

});

//delete quiz
router.delete('/quizzes/{quiz.id}', (req, rsp) => {
    axios.delete(baseURL + '/template/{tn}',{

    }).then((response) => {
        rsp.status(200).json(response.data)
    }).catch((error) =>{
        rsp.status(400).json(error)
    })
});