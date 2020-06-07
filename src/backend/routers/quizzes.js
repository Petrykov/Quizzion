let router = module.exports = require('express').Router();
const axios = require('axios').default;
const token = 'edf4a556f48b23ca4b76fb2eb6e8e56c1fb2209fc38d43bd4673660d32a9e84c8689b3181eb54cdcffe47f7c9d4146976314b7dac7ddfba92414715706ffc5f1'
axios.defaults.headers.common['X-CSRFToken'] = 'edf4a556f48b23ca4b76fb2eb6e8e56c1fb2209fc38d43bd4673660d32a9e84c8689b3181eb54cdcffe47f7c9d4146976314b7dac7ddfba92414715706ffc5f1';
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
        content: JSON.stringify({
            logo : req.body.logo,
            active : req.body.active,
            title: req.body.title
        })
    }).then((response) => {
        rsp.status(201).json(response.data);
    }).catch((err) => {
        rsp.status(404).json(err);

    });
});



//edit quiz
router.put('/:quizId', (req, rsp) => {

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

// create new form

router.post('/start', (req, rsp) => {
    axios.post(`${baseUrl}/form`, {
        frm_label: 'Some label',
        type: 'survey',
        uh: "user hash list",
        th: req.body.th,
        field:{
            frm_date_start: new Date().getFullYear
        }
    }).then((response) => {
        rsp.status(201).json(response.data);
    }).catch((err) => {
        console.log("error");
        rsp.status(400).json(err);
    });
});


// get existing form

router.get('/start', (req, rsp) => {

    axios.get(baseUrl+`/form`, {
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

