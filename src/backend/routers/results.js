let router = module.exports = require('express').Router();
const axios = require('axios')
const baseUrl = "https://lab.dev.easion.nl/backend/api/v5"

// router.get('/:quizId', (req, rsp) => {
//     let results = []
//     let responsesId = []
//     results.push({
//         uid: req.uid,
//         displayName: req.displayName,
//         quizId: req.params.quizId,
//         responses: responsesIds
//     })
//     rsp.send(results)
// })

router.get('/respondent', (req, rsp) => {

    // let questionsVarName = ['h7mq3t2q4', 'q_0019']
    let questionsVarName = req.body.questions
    axios.get(`${baseUrl}/data`, {
        params: {
            vars: questionsVarName
        }
    }).then((res) => {
        let questionsIds = res.data.list
        for (var key in questionsIds) {
            let answerId = questionsIds[key]
            responsesIds.push(key)
            answerIds.push(answerId)
            let answer = findAnswerByName(answerId)
            result.push({
                questionId: key,
                answer: answer.title,
                isCorrect: answer.isCorrect,
                score: 10 
            })
        }

        rsp.status(200).json(result)
        
        //find answer by id -> then put the user id in there
    })
        .catch(err => rsp.json(err))

})

async function findAnswerByName(answerId){
    
    let answer;
    await axios.get(`http://localhost:3000/api/answer/${answerId}`)
    .then((res)=>{
        answer = res
    }).catch(err => console.log({error: err}))
    return answer;

}
