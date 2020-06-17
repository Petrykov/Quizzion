let router = module.exports = require('express').Router();
const axios = require('axios').default
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5"
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const sqlite3 = require('sqlite3');
const { question } = require('../config');
let db = new sqlite3.Database('responses.db');
let quizList = []

// db.exec(fs.readFileSync('schema.sql').toString());

axios.defaults.headers.common['X-Database'] = 'lab';

// router.post('/join', (req, res) => {
//     // const fid = "2ea7708e7229e8ddb2e179882388d13c"
//     console.log(req.body);
//     var fid = req.body.quizId
//     let data = { form: fid }
//     axios.post(`${baseUrl}/account/link`, {
//         parameter: data
//     })
//         .then((rsp) => {
//             res.status(200).send({ token: rsp.data.token })
//         })
//         .catch((error) => {
//             console.log("get response1")
//             res.status(500).send({ err: error })
//         })
// })

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

// RESPONDENT_JOIN

router.post('/respondent/join/:quizId', (req, rsp) => {
    let uniqueId = uuidv4();
    db.prepare('insert into respondents (id, displayName, quizId) values(?,?,?)').run(uniqueId, req.body.name, req.params.quizId)
    if (rsp) {
        rsp.send({ "id": uniqueId })
    }
    else rsp.send("Errors occured!")
})

//QUIZ_INIT
router.get('/quizzes/:quizId/invite', (req, rsp) => {
    let stateQuiz = findItemById(req.params.quizId)
    rsp.send(stateQuiz)
})

//QUIZ_START
router.post('/quizzes/:quizId/start', (req, res) => {

    if (res) {
        let request = {
            id: req.params.quizId,
            title: req.body.title,
            description: req.body.description,
            active: true,
            logo: req.body.logo,
            color: req.body.color,
            questions: req.body.questions,
            answers: req.body.answers
        }
        let currentQuiz = findItemById(req.params.quizId)
        if (currentQuiz == null) {
            currentQuiz = request
            quizList.push(currentQuiz)
        } else {
            currentQuiz = request
        }
        res.send(findItemById(req.params.quizId))
    }
    else rsp.send("Some errors occured")

})

function findItemById(quizId) {
    for (let item of quizList) {
        if (item.id === quizId) {
            return item
        }
    }
    return null;
}


router.get("/:quizId/responses", (req, res) => {
    db.all('select * from responses where quizId=?', [req.params.quizId], (err, questions) => {
        if (questions) res.send(questions)
        else res.send("Errors occured!")
    })
})

//RESPONDENT_ANSER
router.post('/respondent/:quizId/answer', (req, res) => {
    db.prepare("INSERT INTO responses (uid,answerLabel, correct , questionTitle,time,totalTime , quizId, score) values(?,?,?,?,?,?,?,?)").run(req.body.uid, req.body.answerLabel, req.body.isCorrect, req.body.questionTitle, req.body.time, req.body.totalTime, req.params.quizId,
        caculateScore(req.body.isCorrect, req.body.totalTime, req.body.time,));
    if (res) res.send("Successful")
    else res.send("Errors occured!")
})


router.get("/respondent/:id", (req, res) => {
    // let resId = req.params.id
    db.all("select * from respondents where id=?", [req.params.id], function (err, respondents) {
        if (respondents) res.send(respondents)
        else res.send(err)
    })
})

router.delete('/:quizId/stop', (req, res) => {
    let currentQuiz = quizList.find(quiz => quiz.id === req.params.quizId);
    for (let i = 0; i < quizList.length; i++) {
        if (quizList[i].id === currentQuiz.id) {
            quizList.splice(i, 1);
            res.send({ message: "successfull!", quizList: quizList })
        }
    }
})

router.delete('/respondent/:id/logout', (req, res) => {
    db.delete("DELETE FROM respondents WHERE id = ?", [req.params.id], (err, rsp) => {
        if (rsp) res.send("Deleted!")
        else rsp.send(err)
    })
})


router.get('/:quizId/result/respondent/:id', (req, res) => {

    db.all("select questionTitle,answerLabel, correct, score  from responses where quizId = ? AND uid = ?", [req.params.quizId, req.params.id], (err, rsp) => {
        if (rsp) {
            res.send(rsp)
        }
        else res.send(err)
    })
})

function caculateScore(isCorrect, total, time) {
    let score;
    let scale = total / 4
    if (isCorrect) {
        if (time <= scale) {
            score = 10
        }
        else if (scale < time && time <= (total / 2)) {
            score = 7
        }
        else if (scale * 2 < time && time <= scale * 3) {
            score = 5
        }
        else if (time > scale * 3) {
            score = 2
        }
    }
    else { score = 0 }

    return score;
}

router.get('/results/:quizId', (req, rsp) => {

    let copy = []
    let players = []
    let results = []
    db.all(`SELECT DISTINCT displayName,uid
    FROM respondents
    INNER JOIN
    responses 
    ON respondents.id = responses.uid
    WHERE responses.quizId =?`, [req.params.quizId], (err, res) => {
        if (res) {
            players = res
            for (let i of players) {
                console.log("here")
                 db.all("select correct, score from responses where uid = ?", [i.uid], function (err, resp) {
                    if (resp) {
                        let response = {
                            user: "i",
                            response: resp
                        }
                        results.push(response)
                        console.log(results)
                    }
                })
            }
            console.log("here2")
            rsp.send(results)
        }
    })

})
