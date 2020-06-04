let router = module.exports = require('express').Router();
const axios = require('axios').default;
const token = '6b1fb098df45c37f5e8178654f5065b2f30ea0da5642deb685067a30f04fd557010f7b2c95cce110035ff4f3011838072d3bd0719bf21c786dfb75c43b36e24f'
axios.defaults.headers.common['X-CSRFToken'] = '6b1fb098df45c37f5e8178654f5065b2f30ea0da5642deb685067a30f04fd557010f7b2c95cce110035ff4f3011838072d3bd0719bf21c786dfb75c43b36e24f';
axios.defaults.headers.common['X-Database'] = 'lab';
axios.defaults.headers.common['Content-Type'] = 'application/json';
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5";



//get all quizzes -> id, color and title
router.get('/', (req, rsp) => {
    axios.get(baseUrl + '/template',{
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }
    }).then((response) =>{

        let responseData = response.data.template;
        let quizzes=[];

        for (let i = 0; i <responseData.length ; i++) {
            let quiz = {
                id: responseData[i].tn,
                title: responseData[i].label,
                description: responseData[i].description,


            };
            quizzes.push(quiz);

        }
        rsp.status(200).json(quizzes);
    }).catch((error) =>{
        rsp.status(400).json(error);
    })

});

//get the rest information about particular quiz
router.get('/:quizId/content', (req, rsp) => {

    axios.get(`${baseUrl}/template/${req.params.quizId}/content`, {
        headers: {
            'X-CSRFToken': token,
            'X-Database': 'lab',
            'Content-Type': 'application/json'
        }

    }).then(function (response) {

        rsp.send(response.data.content.content)

    }).catch(error => rsp.send(error))

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
    }).catch((error) =>{
        rsp.status(400).json(error)
    })
});






//post new quiz
router.post('/', (req, rsp) => {


    // to get from user input

    req.body.active = true;
    req.body.color= 'blue';
    req.body.logo = 'http';
    req.body.title = 'What do you know';
    req.body.description = 'here is the description';

    axios.post(`${baseUrl}/template/`, {


        label: req.body.color,
        description: req.body.description,      
        type: 'form_json',
        module: 'survey',
        status: 'active',
        contenttype: 'JSON',
        content: {
            logo : req.body.logo,
            active : req.body.active,
            title: req.body.title
        }

    }).then((response) => {
        rsp.status(201).json(response.data);
    }).catch((err) => {
        rsp.status(404).json(err);

    });
});



//edit quiz
router.put('/:quiz.id', (req, rsp) => {

   let active = req.body.active;
   let color = req.body.color;
   let logo = req.body.logo;
   let title = req.body.title;
   let description = req.body.description;

    axios.put(`${baseUrl}/template/${req.params.quizId}`,{

            label: color,
            description: description,
            status: "active",
            content: {
                logo: logo,
                active: active,
                title: title
            }

    }).then((response) => {
        rsp.status(200).json(response)
    }).catch((error) =>{
        rsp.status(400).json(error)
    })

});




