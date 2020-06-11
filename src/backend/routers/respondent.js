let router = module.exports = require('express').Router();
const axios = require('axios').default
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5"

axios.defaults.headers.common['X-Database'] = 'lab';

router.post('/join', (req, res) => {
    // const fid = "2ea7708e7229e8ddb2e179882388d13c"
    var fid = req.body.quizId
    let data = { form: fid }
    axios.post(`${baseUrl}/account/link`, {
        parameter: data
    })
        .then((rsp) => {
            res.status(200).send({ token: rsp.data.token })
        })
        .catch((error) => {
            console.log("get response1")
            res.status(500).send({ err: error })
        })
})

//api for user to write their answer
router.put('/answer', (req, res) => {
    let qVarName = req.body.questionVarName
    let aVarName = req.body.answerVarName
    let mockBodyContent = {
        "q_0019": "aq_0019_a1"
    }
    let mockFromMark = {
        'h7mq3t2q4': '5rggp2gf6'
    }

    let savedResponse = {
        qVarName: aVarName
    }
    axios.put(`${baseUrl}/data`, {
        vars: mock
    }
    )
        .then((rsp) => {
            res.send(rsp.data)
        })
        .catch((err) => {
            console.log(err.response.data)
            res.send(err)
        })
})
