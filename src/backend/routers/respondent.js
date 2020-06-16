let router = module.exports = require('express').Router();
const axios = require('axios').default
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5"

const fs = require('fs')
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('responses.db');

// db.exec(fs.readFileSync('schema.sql').toString());

axios.defaults.headers.common['X-Database'] = 'lab';

router.post('/join', (req, res) => {
    // const fid = "2ea7708e7229e8ddb2e179882388d13c"
    console.log(req.body);
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
        vars: savedResponse
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

router.get('/questions/all', (req, res) => {
    db.all('select * from questions', (err, questions) => {
        if (questions) res.send(questions)
        else res.send("Errors occured")
    })
})

router.post('/:quiz_id/questions', (req, res) => {
    db.prepare("INSERT INTO questions (id, title, description, quizId) values(?,?,?,?)").run(req.body.id, req.body.title, req.body.description, req.params.quiz_id)
    if (res) res.json("Successfully added!")
    else res.send("Errors occured")
})

router.post('/:questionId/answers', (req, res) => {
    db.prepare("INSERT INTO answers (id, label, isCorrect, questionId) values(?,?,?,?)").run(req.body.id, req.body.label, req.body.isCorrect, req.params.questionId)
    if (res) res.send("Successfuly added!")
    else res.send("Errors occured")
})

router.post('/answer', (req, res) => {
    db.prepare("INSERT INTO responses (answerId, questionId,time) values(?,?,?)").run(req.body.answerId, req.body.questionId, req.body.time);
    if (res) res.send("Successful")
    else res.send("Errors occured")
})
