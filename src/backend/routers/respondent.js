let router = module.exports = require('express').Router();
const { v4: uuidv4 } = require('uuid');
var _ = require('lodash');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('responses.db');
let quizList = []

/**
 * @api {post} /respondent/join/:quizId Join a quiz as a respondent
 * @apiGroup Respondents
 * @apiParam {String} quizId Id of the Invited quiz.
 * @apiParam {String} name  Name of the respondent.
 * @apiSuccess {Object} respondent Respondent
 * @apiSuccess {String} id Unique id for respondent
 * @apiError (500) {String} message Errors occured!
 */
router.post('/respondent/join/:quizId', (req, rsp) => {
    let uniqueId = uuidv4();
    db.prepare('insert into respondents (id, displayName, quizId) values(?,?,?)').run(uniqueId, req.body.name, req.params.quizId)
    if (rsp) {
        rsp.send({ id: uniqueId })
    }
    else rsp.send("Errors occured!")
})

//QUIZ_INIT
router.get('/quizzes/:quizId/invite', (req, rsp) => {
    let stateQuiz = findItemById(req.params.quizId)
    rsp.send(stateQuiz)
})

//QUIZ_START
/**
 * @api {post} /quizzes/:quizId/start Start the quiz
 * @apiGroup Quizzes
 * @apiParam {String} quizId Id of the Invited quiz.
 * @apiParam {Object} request Request.
 * @apiParam {Object} request.quiz Quiz information
 * @apiParam {Array} request.questions Questions of the quiz
 * @apiParam {Array} request.answers Answers of the quiz
 * @apiSuccess {Array} quizList temporary quiz list
 * @apiError (500) {String} message Errors occured!
 */
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
    else res.send("Some errors occured")
})

//RESPONDENT_ANSER
/**
 * @api {post} /respondent/:quizId/answer Start the quiz
 * @apiGroup Respondents
 * @apiParam {String} quizId Id of the Invited quiz.
 * @apiParam {Object} request Request.
 * @apiParam {String} request.uid Quiz information
 * @apiParam {String} request.answerLabel Questions of the quiz
 * @apiParam {String} request.isCorrect Answers of the quiz
 * @apiParam {String} request.questionTitle Answers of the quiz
 * @apiParam {String} request.time Answers of the quiz
 * @apiParam {String} request.totalTime Answers of the quiz
 * @apiSuccess {String} message Successfully added!
 * @apiError (500) {String} message Errors occured!
 */
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
    db.run("DELETE FROM responses WHERE quizId = ?", [req.params.quizId], (err, rsp) => {
        if (err) {
            res.send(err)
        }
        else {
            for (let i = 0; i < quizList.length; i++) {
                if (quizList[i].id === currentQuiz.id) {
                    quizList.splice(i, 1);
                }
            }
            res.send({
                message: "Deleted!"
            })
        }
    })

})

router.delete('/respondent/:id/logout', (req, res) => {
    db.delete("DELETE FROM respondents WHERE id = ?", [req.params.id], (err, rsp) => {
        if (rsp) res.send("Deleted!")
        else rsp.send(err)
    })
})

// RESPONDENT_RESULT
/**
 * @api {get} /:quizId/result/respondent/:id Get respondent's result
 * @apiGroup Results
 * @apiParam {String} quizId Id of the Invited quiz.
 * @apiParam {String} id Id of the Respondent
 * @apiSuccess {Object} result Respondent's result
 * @apiSuccess {String} result.questionTitle Respondent's result
 * @apiSuccess {String} result.answerLabel Respondent's result
 * @apiSuccess {String} result.correct Respondent's result
 * @apiSuccess {String} result.score Respondent's result
 * @apiError (500) {String} message Errors occured!
 */
router.get('/:quizId/result/respondent/:id', (req, res) => {

    db.all("select questionTitle,answerLabel, correct, score  from responses where quizId = ? AND uid = ?", [req.params.quizId, req.params.id], (err, rsp) => {
        if (rsp) {
            res.send(rsp)
        }
        else res.send(err)
    })
})

// QUIZMASTER_RESULT
/**
 * @api {get} /results/:quizId Get Quiz's result
 * @apiGroup Results
 * @apiParam {String} quizId Id of the Invited quiz.
 * @apiSuccess {Object} result respondents' result
 * @apiSuccess {String} result.uid Respondents id
 * @apiSuccess {Object[]} result.uid.result Respondent's result
 * @apiSuccess {Object} result.uid.result.object Respondent's result
 * @apiSuccess {String} result.uid.result.object.displayName Respondent's name
 * @apiSuccess {String} result.uid.result.object.correct Respondent's isCorrect
 * @apiSuccess {String} result.uid.result.object.score Respondent's score
 * @apiError (500) {String} message Errors occured!
 */
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
        } else res.send({ "Error occurs:": err })
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
        if(time === 0){
            return 2
        }
        return Math.round(time * base)
    }
    else {
        return 0
    }
}