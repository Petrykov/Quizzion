let router = module.exports = require('express').Router();

const axios = require('axios').default;
const BodyCheck = require('./helper/bodychecker');

const config = require('./../config');

axios.defaults.headers.common['X-Database'] = 'lab';


router.use((req, rsp, next) => {
    axios.defaults.headers.common['X-CSRFToken'] = req.headers.authorization;
    next();
});
/**
 * @api {get} /answer Get all answers
 * @apiGroup Answers
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess {Object[]} answers Answers list
 * @apiSuccess  {String} answers.id Id of the answer.
 * @apiSuccess  {String} answers.label Label of the answer.
 * @apiSuccess  {String} answers.name Name of the answer.
 * @apiSuccess  {String} answers.correct Answer isCorrect value.
 * @apiError (400) {String} message Bad Request 
 */
router.get('/answer', (req, rsp) => {
    axios.get(config.baseURL + '/v5/var')
        .then((response) => {
            const elements = response.data.var;
            let answers = [];
            for (let i = 0; i < elements.length; i++) {
                try {
                    let answer = JSON.parse(elements[i].label);

                    if (answer.type === config.answer) {
                        answers.push({
                            id: elements[i].vh,
                            name: elements[i].name,
                            label: answer.label,
                            correct: answer.correct
                        })
                    }

                } catch (e) {
                }

            }

            rsp.status(200).json(answers);

        }).catch((err) => {
        rsp.json(err);
    })
});

/**
 * @api {get} /answer/:answer_id Get answer by id
 * @apiGroup Answers
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} answer_id Id of the answer
 * @apiSuccess {Object} answer The Answer
 * @apiSuccess  {String} answers.id Id of the answer.
 * @apiSuccess  {String} answers.label Label of the answer.
 * @apiSuccess  {String} answers.name Name of the answer.
 * @apiSuccess  {String} answers.correct Answer isCorrect value.
 * @apiError (400) {String} message Bad Request 
 */
router.get('/answer/:answer_id', (req, rsp) => {
    axios.get(config.baseURL + '/v5/var/' + req.params.answer_id)
        .then((response) => {
            let element = response.data.var[0];
            try {
                let answer = JSON.parse(element.label);
                rsp.status(200).json({
                    id: element.vh,
                    name: element.name,
                    label: answer.label,
                    correct: answer.correct
                });
            } catch (e) {
                rsp.status(400).send();
            }
        }).catch( (err) => {
            rsp.status(400).json(err);
    });
});

/**
 * @api {post} /answer Create a new answer
 * @apiGroup Answers
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {Object} request Request body
 * @apiParam  {String} request.label Label of the answer.
 * @apiParam  {String} request.correct Answer isCorrect value.
 * @apiParam  {String} request.questionId Id of the question containing this answer
 * @apiSuccess (201)  {Object} response Response
 * @apiSuccess (201) {String} response.id New answer's id
 * @apiSuccess (201) {Object} response.name New answer's name
 * @apiError (400) {String} message Bad Request 
 */
router.post('/answer', (req, rsp) => {
    //checking if body of request has all arguments needed
    let bodyCheck = new BodyCheck();
    let result = bodyCheck.checkPOSTanswer(req.body);
    if (result.length !== 0) {
        rsp.status(400).json({error: result});
        return;
    }

    let payload = {
        type: config.answer,
        label: req.body.label,
        correct: req.body.correct
    };

    axios.post(config.baseURL + '/v5/var', {
        label: JSON.stringify(payload),
        vartype: 'item',
        datatype: 'text'
    }).then((response) => {
        axios.put(`http://localhost:3000/api/question/${req.body.questionId}/add/${response.data.vh}`, null, {headers: {authorization: req.headers.authorization}}).then().catch();
        rsp.status(201).json({
            id: response.data.vh,
            name: response.data.name
        });
    }).catch((err) => {
        rsp.status(400).json(err.data);
    })
});

/**
 * @api {put} /answer/:answer_id Update an answer
 * @apiGroup Answers
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} answer_id Id of the answer
 * @apiParam {Object} request Request body
 * @apiParam  {String} request.label Label of the answer.
 * @apiParam  {String} request.correct Answer isCorrect value.
 * @apiSuccess {Array} message Message from Parantion's backend
 * @apiError (400) {String} message Bad Request 
 */
router.put('/answer/:answer_id', (req, rsp) => {

    let changes = {};

    if (req.body.label !== undefined) changes.label = req.body.label;
    if (req.body.correct !== undefined) changes.correct = req.body.correct;

    async function continu() {
        let works = true;
        const response = await axios.get(config.baseURL + '/v5/var/' + req.params.answer_id).catch((err) => {
            rsp.json(err);
            works = false;
        });

        if (! works) return;

        let answer = response.data.var[0];
        let details = answer.label;
        try {
            details = JSON.parse(answer.label);

            if (changes.label !== undefined) details.label = changes.label;
            if (changes.correct !== undefined) details.correct = changes.correct;
        } catch (e) {}

        axios.put(config.baseURL + '/v5/var/' + req.params.answer_id, {
            label: JSON.stringify(details)
        }).then((resp) => {
            rsp.json(resp)
        }).catch((err) => {
            rsp.json(err);
        });
    }

    continu();
});

/**
 * @api {delete} /answer/:answer_id Delete answer by id
 * @apiGroup Answers
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} answer_id Id of the answer
 * @apiSuccess (200) {String} message empty message from parantion's backend
 * @apiError (400) {String} message Bad Request 
 */
router.delete('/answer/:answer_id', (req, rsp) => {
    let isSuccessful = false;

    //really weird is happening there
    //if request is good, it goes to 'then' and 'catch' causes
    axios.delete(config.baseURL + '/v5/var/' + req.params.answer_id)
        .then( (response) => {
            isSuccessful = true;
            rsp.status(200).json(response);
        }).catch( (err) => {
            if (isSuccessful) rsp.status(200).send();
            else rsp.status(400).json(err);
    })
});
