let router = module.exports = require('express').Router();
const axios = require('axios').default;
const token = 'ec876434fd97e327784f9f59b408a403ee2993ac6f9c1d95858d0059058000bb182aecc26d3af714ec80f9811d25332b9e4da589de61a41b501e05d299397fd8'
axios.defaults.headers.common['X-CSRFToken'] = 'ec876434fd97e327784f9f59b408a403ee2993ac6f9c1d95858d0059058000bb182aecc26d3af714ec80f9811d25332b9e4da589de61a41b501e05d299397fd8';
axios.defaults.headers.common['X-Database'] = 'lab';
axios.defaults.headers.common['Content-Type'] = 'application/json';
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5";



//
//
// function getAll(url) {
//     return new Promise(function (resolve, reject) {
//         console.log("inside Promise method");
//         axios.get(url, function (error, response, body) {
//             console.log("inside axios");
//             if (!error && response.statusCode == 200) {
//                 resolve(body);
//             }
//             else {
//                 reject(error);
//             }
//         })
//     });
// }
// router.get('/quizzes', function (req, res) {
//     //get the post with post id 100
//     getAll('https://lab.dev.easion.nl/backend/api/v5/template').then(function (result) {
//         console.log("inside the  first request")
//         let responseData = result.data.template;
//         //var obj = JSON.parse(result);
//        // let quizzes=[];
//
//         for (let i = 0; i <responseData.length ; i++) {
//             // let quiz = {
//             //     id: responseData[i].tn,
//             //     title: responseData[i].label,
//             //     description: responseData[i].description,
//             // };
//             // quizzes.push(quiz);
//             // console.log(quizzes);
//             return getAll('https://lab.dev.easion.nl/backend/api/v5' + responseData[i].tn + '/content')
//         }
//
//
//     })
//         .catch(function (e) {
//             console.log(e);
//         })
//         .then(function (result) {
//             res.end(result);
//         })
// })


 //get all data
router.get('/', (req, rsp) => {

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

                console.log(response.data);
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
                console.log(i);
                quizzes.push(quiz);
            }
            console.log("to send")
            rsp.status(200).json(quizzes);
        }

        f();

    }).catch((error) =>{
        rsp.status(400).json(error);
    })



});

// //get all data about one quiz
router.get('/:quizId', (req, rsp) => {

    let   quizOwner,
         quizTitle,
        quizLogo,
         quizQuestions,
         quizActive;


    async function getDetails(){
        let response = await axios.get(`${baseUrl}/template/${req.params.quizId}/content`,{
            headers: {
                'X-CSRFToken': token,
                'X-Database': 'lab',
                'Content-Type': 'application/json'
            },
        });
        console.log("im getting here")
        let content = response.data.content.content;
        try{
            content = JSON.parse(content);
            quizOwner=content.owner;
            quizTitle=content.title;
            quizLogo=content.logo;
            quizQuestions=content.questions;
            quizActive=content.active;

        } catch (e) {

        }
    }

    axios.get(`${baseUrl}/template/${req.params.quizId}`,{
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then((response) =>{

        let responseData = response.data.template;


       // let quizzes = [];

        // for (let i = 0; i < responseData.length; i++) {
            let quiz = {
                id: responseData.tn,
                color: responseData.label,
                description : responseData.description,

                owner: quizOwner,
                title: quizTitle,
                logo: quizLogo,
                questions: quizQuestions,
                active: quizActive

            };
           // quizzes.push(quiz);

        // }



        rsp.status(200).json(quiz);

    }).catch((error) =>{
        rsp.status(400).json(error);
    })
    getDetails();
});