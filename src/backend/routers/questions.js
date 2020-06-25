const router = module.exports = require('express').Router();

const config = require('./../config');

const BodyChecker = require('./helper/bodychecker');

const axios = require('axios').default;

axios.defaults.headers.common['X-Database'] = 'lab';

router.use((req, rsp, next) => {
  axios.defaults.headers.common['X-CSRFToken'] = req.headers.authorization;
  next();
});

/**
 * @api {get} /question Get all quiz master's questions
 * @apiGroup Questions
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess {Object[]} questions List of questions.
 * @apiSuccess  {String} questions.id Id of the question.
 * @apiSuccess  {String} questions.title Title of the question.
 * @apiSuccess  {String} questions.description Description of the question.
 * @apiSuccess  {String} questions.image Image of the question.
 * @apiSuccess  {Number} questions.time Time of the question.
 * @apiSuccess  {String} questions.name Name of the question.
 * @apiSuccess  {String} questions.quizId Quiz id of the question.
 * @apiSuccess  {Array} questions.answers Answers of the question.
 * @apiError (400) {String} message Bad Request
 */
router.get('/question', (req, rsp) => {
  axios.get(config.baseURL + '/v5/var').then((response) => {
    const elements = response.data.var;
    const questions = [];
    for (let i = 0; i < elements.length; i++) {
      try {
        //the line below produces an error if the label does not have a json wrapped in it
        const question = JSON.parse(elements[i].label);

        if (question.type === config.question) {
          const quest = {
            id: elements[i].vh,
            title: question.title,
            description: question.description,
            image: question.image,
            time: question.time,
            name: elements[i].name,
            quizId: question.quizId
          };

          if (question.answers !== undefined) quest.answers = question.answers;

          questions.push(quest);
        }
      } catch (e) {
      }
    }
    rsp.status(200).json(questions);
  }).catch((error) => {
    rsp.status(400).json(error);
  });
});

/**
 * @api {get} /question/:question_id Get a question by id
 * @apiGroup Questions
 * @apiParam {String} Question Id
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess {Object} question A question.
 * @apiSuccess  {String} question.id Id of the question.
 * @apiSuccess  {String} question.title Title of the question.
 * @apiSuccess  {String} question.description Description of the question.
 * @apiSuccess  {String} question.image Image of the question.
 * @apiSuccess  {Number} question.time Time of the question.
 * @apiSuccess  {String} question.name Name of the question.
 * @apiSuccess  {String} question.quizId Quiz id of the question.
 * @apiSuccess  {Array} question.answers Answers of the question.
 * @apiError (400) {String} message Bad Request
 */
router.get('/question/:question_id', (req, rsp) => {
  axios.get(config.baseURL + '/v5/var/' + req.params.question_id)
    .then((response) => {
      try {
        const result = JSON.parse(response.data.var[0].label);

        const res = {
          id: req.params.question_id,
          title: result.title,
          description: result.description,
          image: result.image,
          time: result.time,
          quizId: result.quizId,
          answers: result.answers,
          name: response.data.var[0].name
        };

        rsp.status(200).json(res);
      } catch (e) {
      }
    }).catch((err) => {
      rsp.status(400).json(err);
    });
});

/**
 * @api {get} /quizzes/:quizId/question Get questions from 1 quiz
 * @apiGroup Questions
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} quizId Id of the quiz
 * @apiSuccess {Object[]} questions List of questions.
 * @apiSuccess  {String} questions.id Id of the question.
 * @apiSuccess  {String} questions.title Title of the question.
 * @apiSuccess  {String} questions.description Description of the question.
 * @apiSuccess  {String} questions.image Image of the question.
 * @apiSuccess  {Number} questions.time Time of the question.
 * @apiSuccess  {String} questions.name Name of the question.
 * @apiSuccess  {String} questions.quizId Quiz id of the question.
 * @apiSuccess  {Array} questions.answers Answers of the question.
 * @apiError (400) {String} message Bad Request
 */
router.get('/quizzes/:quizId/question', (req, rsp) => {
  axios.get(config.baseURL + '/v5/var').then((response) => {
    const allQuestions = response.data.var;
    const questions = [];
    for (let i = 0; i < allQuestions.length; i++) {
      try {
        //the line below produces an error if the label does not have a json wrapped in it
        const question = JSON.parse(allQuestions[i].label);

        if (question.quizId === req.params.quizId) {
          questions.push({
            id: allQuestions[i].vh,
            title: question.title,
            description: question.description,
            quizId: question.quizId,
            image: question.image,
            time: question.time,
            answers: question.answers,
            name: allQuestions[i].name
          });
        }
      } catch (e) {}
    }
    rsp.status(200).json(questions);
  }).catch((error) => {
    rsp.status(400).json(error);
  });
});


/**
 * @api {post} /quizzes/:quizId/question Create new question
 * @apiGroup Questions
 * @apiParam quizId Id of the quiz
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {Object} question The question object.
 * @apiParam  {String} question.title Title of the question.
 * @apiParam  {String} question.description Description of the question.
 * @apiParam  {String} question.image Image of the question.
 * @apiParam  {Number} question.time Time of the question.
 * @apiParam  {Array} question.answers Answers of the question.
 * @apiSuccess (201) {String} id Id of the newly created question.
 * @apiSuccess (201) {String} name Name of the newly created question.
 * @apiError (400) {String} message Bad Request
 */
router.post('/quizzes/:quizId/question', (req, rsp) => {
  const bodyChecker = new BodyChecker();

  const inspectionResult = bodyChecker.checkPOSTquestion(req.body);

  if (inspectionResult.length !== 0) {
    rsp.status(400).json({error: inspectionResult});
    return;
  }
  const payload = {
    type: config.question,
    quizId: req.params.quizId,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    time: req.body.time,
    answers: req.body.answers
  };

  const payloadString = JSON.stringify(payload);

  axios.post(config.baseURL + '/v5/var', {
    label: payloadString,
    vartype: 'item',
    datatype: 'text'
  }).then(async(response) => {
    let error = false;

    let quizDetails = await axios.get('http://localhost:3000/api/quizzes/' + req.params.quizId + '/content', {
      headers: {
        Authorization: req.headers.authorization
      }
    }).catch(() => {
      rsp.status(400).json({error: 'Quiz does not exist'});
      error = true;
    });
    if (error) return;

    quizDetails = quizDetails.data;

    if (typeof quizDetails === 'string') quizDetails = JSON.parse(quizDetails);

    if (quizDetails === undefined) {
      rsp.status(400).json({error: 'Quiz id ' + req.params.quizId + ' does not exists!'});
      return;
    }

    quizDetails.questions.push(response.data.vh);

    axios.put('http://localhost:3000/api/quizzes/' + req.params.quizId + '/content', quizDetails, {
      headers: {
        Authorization: req.headers.authorization
      }
    }).then((res) => {
      rsp.json({
        id: response.data.vh,
        name: response.data.name
      });
    }).catch((errr) => {
      rsp.status(400).json(errr);
    });
  }).catch((err) => {
    rsp.json(err);
  });
});


/**
 * @api {put} /question/:question_id Update a question
 * @apiGroup Questions
 * @apiParam question_id Id of the question
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {Object} question The question object.
 * @apiParam  {String} question.title Title of the question.
 * @apiParam  {String} question.description Description of the question.
 * @apiParam  {String} question.image Image of the question.
 * @apiParam  {Number} question.time Time of the question.
 * @apiParam  {Array} question.answers Array of string with id`s of answers
 * @apiSuccess (200) {Array} message Empty message from Parantion's backend
 * @apiError (400) {String} message Bad Request
 */
router.put('/question/:question_id', (req, rsp) => {
  const changes = {};

  //shortcut
  const b = req.body;

  if (b.title !== undefined) changes.title = b.title;
  if (b.description !== undefined) changes.description = b.description;
  if (b.image !== undefined) changes.image = b.image;
  if (b.time !== undefined) changes.time = b.time;
  if (b.answers !== undefined) changes.answers = b.answers;
  if (b.quizId !== undefined) changes.quizId = b.quizId;

  async function contin() {
    const response = await axios.get(config.baseURL + '/v5/var/' + req.params.question_id);

    let label = response.data.var[0].label;

    try {
      label = JSON.parse(label);

      if (changes.title !== undefined) label.title = changes.title;
      if (changes.description !== undefined) label.description = changes.description;
      if (changes.image !== undefined) label.image = changes.image;
      if (changes.time !== undefined) label.time = changes.time;
      if (changes.answers !== undefined) label.answers = changes.answers;
      if (changes.quizId !== undefined) label.quizId = changes.quizId;
    } catch (e) {
    }

    label = JSON.stringify(label);

    axios.put(config.baseURL + '/v5/var/' + req.params.question_id, {
      label: label
    }).then((response) => {
      rsp.json(response);
    }).catch((err) => {
      rsp.json(err);
    });
  }

  contin();
});
//Update doc
router.put('/question/:question_id/add/:answer_id', async(req, rsp) => {
  let works = true;

  const response = await axios.get(config.baseURL + '/v5/var/' + req.params.question_id).catch(() => {
    works = false;
  });

  if (!works) {
    rsp.status(400).json({error: 'question id is not valid'});
    return;
  }

  const element = response.data.var[0];

  try {
    const question = JSON.parse(element.label);

    question.answers.push(req.params.answer_id);

    axios.put(config.baseURL + '/v5/var/' + req.params.question_id, {
      label: JSON.stringify(question)
    }).then((response) => {
      rsp.status(200).json(response);
    }).catch((err) => {
      rsp.json(err);
    });
  } catch (e) {
    rsp.status(400).json({error: 'question id is not valid'});
  }
});


/**
 * @api {delete} /question/:question_id/remove/:answer_id Remove an answer from a question
 * @apiGroup Answers
 * @apiParam question_id Id of the question
 * @apiParam answer_id Id of the answer
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess (200) {Array} message Message from Parantion's backend
 * @apiError (400) {Object} error Answers for does not exist
 */
router.delete('/question/:question_id/remove/:answer_id', async(req, rsp) => {
  let works = true;

  const response = await axios.get(config.baseURL + '/v5/var/' + req.params.question_id).catch(() => {
    works = false;
  });

  if (!works) {
    rsp.status(400).json({error: 'question id is not valid'});
    return;
  }

  const element = response.data.var[0];

  try {
    const question = JSON.parse(element.label);

    if (question.answers === undefined) {
      rsp.status(400).json({error: 'Answers for question ' + req.params.question_id + ' does not exist'});
      return;
    }

    for (let i = 0; i < question.answers.length; i++) {
      if (req.params.answer_id === question.answers[i]) {
        //removing an element from array
        question.answers.splice(i, 1);
      }
    }

    axios.put(config.baseURL + '/v5/var/' + req.params.question_id, {
      label: JSON.stringify(question)
    }).then((response) => {
      rsp.status(200).json(response);
    }).catch((err) => {
      rsp.json(err);
    });
  } catch (e) {
    rsp.status(400).json({error: 'question id is not valid'});
  }
});


/**
 * @api {delete} /question/:question_id/question Remove a question using id
 * @apiGroup Questions
 * @apiParam question_id Id of the question
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess (200) {Object} message Deleted
 * @apiError (400) {String} message Bad Request
 */
router.delete('/question/:question_id', async(req, rsp) => {
  let error = false;

  const response = await axios.get('http://localhost:3000/api/question/' + req.params.question_id, {
    headers: {
      Authorization: req.headers.authorization
    }
  }).catch((err) => {
    error = true;
    console.log(err);
    rsp.status(400).json({error: 'Question does not exists'});
  });

  if (error) return;

  const quizId = response.data.quizId;

  axios.delete(config.baseURL + '/v5/var/' + req.params.question_id)
    .then(async(response) => {
      let quiz = await axios.get('http://localhost:3000/api/quizzes/' + quizId + '/content', {
        headers: {
          Authorization: req.headers.authorization
        }
      }).catch((err) => {
        console.log(err);
        rsp.status(400).json({error: 'Quiz (where quesion is assigned to) does not exist'});
        error = true;
      });

      if (error) return;

      quiz = quiz.data;

      if (quiz.questions === undefined) {
        rsp.status(400).json({error: 'Question is not in the quiz list'});
        return;
      }
      for (let i = 0; i < quiz.questions.length; i++) {
        if (quiz.questions[i] === req.params.question_id) {
          quiz.questions.splice(i, 1);
        }
      }

      axios.put('http://localhost:3000/api/quizzes/' + quizId + '/content', quiz, {
        headers: {
          Authorization: req.headers.authorization
        }
      }).then((resp) => {
        rsp.status(200).json({message: 'deleted'});
      }).catch((errr) => {
        rsp.status(400).json(errr);
      });
    }).catch((err) => {
      rsp.json(err);
    });
});

