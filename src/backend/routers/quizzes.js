let router = module.exports = require('express').Router();
const axios = require('axios').default;
axios.defaults.headers.common['X-CSRFToken'] = '0c35663c9570daf03d0ef3b1eaecf1adbd409f518778e07e06179fbd43bdaabe213692b147e0d4a5dfd1e516b730cfac4d3b00966dee45937b5c492d4f9e9fd9';
axios.defaults.headers.common['X-Database'] = 'lab';
axios.defaults.headers.common['Content-Type'] = 'application/json';
var baseURL = 'https://lab.dev.easion.nl/backend/api/v5';
var tn;


router.post('/quizzes', (req, rsp) => {

    req.body.id = "1";
    req.body.color= 'kkk';
    req.body.logo = 'gggg';
    req.body.title = 'hhh';
    req.body.description='hh';


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

//get quizzes
router.get('/quizzes', (req, rsp) => {
    axios.get(baseURL + '/template').then((response) =>{

        let responseData = response.data.template;
        let quizzes=[];


        for (let i = 0; i <responseData.length ; i++) {
            var colorNew, logoNew, activeNew;


            axios.get(baseURL + '/template/' + responseData[i].tn + '/content').then((response) =>{
                console.log(response.data.content.content);

                colorNew = response.data.content.content.color;
                logoNew = response.data.content.content.logo;
                activeNew = response.data.content.content.active;



                rsp.status(200).json(quiz);
            }).catch((error) =>{
                rsp.status(400).json(error);
            });
            let quiz = {
                title: responseData[i].label,
                description: responseData[i].description,
                color: colorNew,
                logo: logoNew,
                active: activeNew

            }

            quizzes.push(quiz);
        }

        rsp.status(200).json(quizzes);
    }).catch((error) =>{
        rsp.status(400).json(error);
    })

});



//get one  particular quiz
// router.get('/quizzes/:quiz_id', (req, rsp) => {
//     axios.get(baseURL + '/template/${tn}/content').then((response) =>{
//
//         console.log(quizzes);
//         rsp.status(200).json(quizzes);
//     }).catch((error) =>{
//         rsp.status(400).json(error);
//     })
//
// });

//post new quiz
router.post('/quizzes', (req, rsp) => {

    req.body.id = "1";
    req.body.color= 'kkk';
    req.body.logo = 'gggg';
    req.body.title = 'hhh';
    req.body.description='hh';


    const templateContent = {
      type: 'quiz',
      properties: {
        id: req.body.id,
        color: req.body.color,
        logo: req.body.logo,
        title: req.body.title,
        description: req.body.description
      }
    };
    axios.post(baseURL + '/template', {
        type: 'form_json',
        module: 'survey',
        status: 'active',
        templateContent: 'JSON',
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