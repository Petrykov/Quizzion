let router = module.exports = require('express').Router();
const { v4: uuidv4 } = require('uuid');
var _ = require('lodash');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('responses.db');
let quizList = []

// RESPONDENT_JOIN
router.post('/respondent/join/:quizId', (req, rsp) => {
    let uniqueId = uuidv4();
    db.prepare('insert into respondents (id, displayName, quizId) values(?,?,?)').run(uniqueId, req.body.name, req.params.quizId)
    if (rsp) {
        rsp.send({ id: uniqueId})
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
            quiz: req.body.quiz,
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
        res.send(quizList)
    }
    else rsp.send("Some errors occured")
})

//RESPONDENT_ANSER
router.post('/respondent/:quizId/answer', (req, res) => {
    db.prepare("INSERT INTO responses (uid,answerLabel, correct , questionTitle,time,totalTime , quizId, score) values(?,?,?,?,?,?,?,?)").run(req.body.uid, req.body.answerLabel, req.body.isCorrect, req.body.questionTitle, req.body.time, req.body.totalTime, req.params.quizId,
        calculateScore(req.body.isCorrect, req.body.totalTime, req.body.time), (err, rsp) => {
            if (err) res.send({ "Errors occured!": err })
            else res.send("Successfully added!")
        });
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

// RESPONDENT_RESULT
router.get('/:quizId/result/respondent/:id', (req, res) => {

    db.all("select questionTitle,answerLabel, correct, score  from responses where quizId = ? AND uid = ?", [req.params.quizId, req.params.id], (err, rsp) => {
        if (rsp) {
            res.send(rsp)
        }
        else res.send(err)
    })
})

// QUIZMASTER_RESULT
router.get('/results/:quizId', (req, res) => {
    let players = []
    let results = []
    const query = `SELECT displayName,uid,correct,score
        FROM respondents
        INNER JOIN
        responses 
        ON respondents.id = responses.uid
                    WHERE responses.quizId =? `
    db.all(query, [req.params.quizId], (err, rsp) => {
        if (rsp) {
            results = rsp
            let result = groupResultByid(results)
            // console.log(Object.keys(result))
            res.send(result)
        }else res.send({"Error occurs:": err})
    })
})

function groupResultByid(results) {
    var grouped = _.mapValues(_.groupBy(results, 'uid'),
        clist => clist.map(result => _.omit(result, 'uid')));
    console.log(grouped)
    return grouped;
}

function findItemById(quizId) {
    for (let item of quizList) {
        if (item.quiz.id === quizId) {
            return item
        }
    }
    return null;
}

function calculateScore(isCorrect, total, time) {
    let base = 10 / total
    if (isCorrect) {
        return Math.round(time * base)
    }
    else {
        return 0;
    }
}