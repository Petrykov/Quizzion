const router = module.exports = require('express').Router();
const axios = require('axios').default;

axios.defaults.headers.common['X-Database'] = 'lab';

const baseUrl = 'https://lab.dev.easion.nl/backend/api/v5';

router.use((req, rsp, next) => {
  axios.defaults.headers.common['X-CSRFToken'] = req.headers.authorization;
  next();
});

/**
 * @api {get} /quizzes/all Get all quizzes' information
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess {Object[]} quizzes List of quizzes.
 * @apiSuccess  {String} quizzes.id Id of the quiz.
 * @apiSuccess  {String} quizzes.color Color of the quiz.
 * @apiSuccess  {String} quizzes.description Description of the quiz.
 * @apiSuccess  {String} quizzes.owner Owner of the quiz.
 * @apiSuccess  {String} quizzes.title Title of the quiz.
 * @apiSuccess  {String} quizzes.logo Logo of the quiz.
 * @apiSuccess  {Array} quizzes.questions Questions of the quiz.
 * @apiSuccess  {Boolean} quizzes.active Status of the quiz.
 * @apiError (400) {String} message Bad Request
 */
router.get('/all', (req, rsp) => {
  axios.get(`${baseUrl}/template`, {
    headers: {
      'X-Database': 'lab',
      'Content-Type': 'application/json'
    }

  }).then((response) => {
    async function f() {
      const responseData = response.data.template;
      const quizzes = [];
      for (let i = 0; i < responseData.length; i++) {
        const id = responseData[i].tn;

        const response = await axios.get(`${baseUrl}/template/` + id + '/content', {

          headers: {
            'X-Database': 'lab',
            'Content-Type': 'application/json'
          }
        });

        const content = JSON.parse(response.data.content.content);


        const quiz = {
          id: id,
          color: responseData[i].label,
          description: responseData[i].description,
          owner: content.owner,
          title: content.title,
          logo: content.logo,
          questions: content.questions,
          active: content.active

        };
        quizzes.push(quiz);
      }
      rsp.status(200).json(quizzes);
    }

    f();
  }).catch((error) => {
    rsp.status(400).json(error);
  });
});

/**
 * @api {get} /quizzes/:quizId Get a quiz by id
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} quizId Quiz unique ID
 * @apiSuccess {Object} quiz Quiz Object.
 * @apiSuccess  {String} quiz.id Id of the quiz.
 * @apiSuccess  {String} quiz.color Color of the quiz.
 * @apiSuccess  {String} quiz.description Description of the quiz.
 * @apiSuccess  {String} quiz.owner Owner of the quiz.
 * @apiSuccess  {String} quiz.title Title of the quiz.
 * @apiSuccess  {String} quiz.logo Logo of the quiz.
 * @apiSuccess  {Array} quiz.questions Questions of the quiz.
 * @apiSuccess  {Boolean} quiz.active Status of the quiz.
 * @apiError (400) {String} message Bad Request
 */
router.get('/:quizId', (req, rsp) => {
  let firstReady = false;
  let secondReady = false;

  const quiz = {};

  axios.get(baseUrl + '/template' + '/' + req.params.quizId, {
    headers: {
      'X-Database': 'lab',
      'Content-Type': 'application/json'
    }
  })
    .then((res1) => {
      const responseData = res1.data.template;
      quiz.id = responseData.tn;
      quiz.color = responseData.label;
      quiz.description = responseData.description;

      firstReady = true;

      if (secondReady) {
        rsp.status(200).json(quiz);
      }
    }).catch((error) => {
      if (!secondReady) {
        rsp.status(400).json(error);
        firstReady = true;
      }
    });

  axios.get(`${baseUrl}/template/${req.params.quizId}/content`, {
    headers: {
      'X-Database': 'lab',
      'Content-Type': 'application/json'
    }
  })
    .then((res2) => {
      let content = res2.data.content.content;
      try {
        content = JSON.parse(content);

        quiz.owner = content.owner;
        quiz.title = content.title;
        quiz.logo = content.logo;
        quiz.questions = content.questions;
        quiz.active = content.active;
      } catch (e) {

      }

      secondReady = true;

      if (firstReady) {
        rsp.status(200).json(quiz);
      }
    }).catch((error) => {
      if (!firstReady) {
        rsp.status(400).json(error);
        secondReady = true;
      }
    });
});

/**
 * @api {get} /quizzes/ Get all quizzes' basic info
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiSuccess {Object[]} quizzes List of quizzes.
 * @apiSuccess  {String} quizzes.id Id of the quiz.
 * @apiSuccess  {String} quizzes.color Color of the quiz.
 * @apiSuccess  {String} quizzes.description Description of the quiz.
 * @apiError (400) {String} message Bad Request
 */
router.get('/', (req, rsp) => {
  axios.get(baseUrl + '/template', {
    headers: {
      'X-Database': 'lab',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    const responseData = response.data.template;

    const quizzes = [];

    for (let i = 0; i < responseData.length; i++) {
      const quiz = {
        id: responseData[i].tn,
        color: responseData[i].label,
        description: responseData[i].description
      };
      quizzes.push(quiz);
    }

    rsp.status(200).json(quizzes);
  }).catch((error) => {
    rsp.status(400).json(error);
  });
});

/**
 * @api {get} /quizzes/:quizId/content Get a quiz's content by id
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} quizId Quiz unique ID
 * @apiSuccess {Object} quiz Quiz Object.
 * @apiSuccess  {String} quiz.owner Owner of the quiz.
 * @apiSuccess  {String} quiz.title Title of the quiz.
 * @apiSuccess  {String} quiz.logo Logo of the quiz.
 * @apiSuccess  {Array} quiz.questions Questions of the quiz.
 * @apiSuccess  {Boolean} quiz.active Status of the quiz.
 * @apiError (400) {String} message Bad Request
 */
router.get('/:quizId/content', (req, rsp) => {
  axios.get(`${baseUrl}/template/${req.params.quizId}/content`, {
    headers: {
      'X-Database': 'lab',
      'Content-Type': 'application/json'
    }
  }).then(function(response) {
    const result = (response.data.content.content);
    rsp.setHeader('Content-Type', 'application/json');
    rsp.send(result);
  }).catch(error => rsp.send(error));
});

//delete quiz by Id
/**
 * @api {delete} /quizzes/:quizId Delete quiz by id
 * @apiGroup Quizzes
 * @apiParam {String} quizId Quiz unique ID
 * @apiSuccess {Array} message Empty Message.
 * @apiError (400) {String} message Bad Request
 */
router.delete('/:quizId', (req, rsp) => {
  axios.delete(`${baseUrl}/template/${req.params.quizId}`, {
    headers: {
      'X-Database': 'lab',
      'Content-Type': 'application/json'
    }

  }).then(function(response) {
    rsp.status(200).json(response.data);
  }).catch((error) => {
    rsp.status(400).json(error);
  });
});

/**
 * @api {post} /quizzes Create new quiz
 * @apiGroup Quizzes
 * @apiSuccess {Object} quiz Quiz Object.
 * @apiSuccess  {String} quiz.id Id of the quiz.
 * @apiSuccess  {Array} quiz.message Message from Parantion's backend.
 * @apiError (400) {String} message Bad Request
 */
router.post('/', (req, rsp) => {
  const active = req.body.active;
  const logo = req.body.logo;
  const title = req.body.title;
  const owner = req.body.owner;
  const questions = req.body.questions;


  axios.post(`${baseUrl}/template`, {
    label: req.body.label, //save color as a label
    description: req.body.description,
    type: 'form_json',
    module: 'survey',
    status: 'active',
    contenttype: 'JSON',
    content: JSON.stringify({
      owner: owner,
      title: title,
      logo: logo,
      questions: questions,
      active: active
    })

  }).then((response) => {
    rsp.status(201).json(response.data);
  }).catch((err) => {
    console.log(err);
    rsp.status(400).json(err);
  });
});

/**
 * @api {put} /quizzes/:quizId/edit Update a quiz by id
 * @apiGroup Quizzes
 * @apiHeader {String} Authorization Moderator's token.
 * @apiParam {String} quizId Quiz unique ID
 * @apiParam {Object} quiz Quiz Object.
 * @apiParam  {String} quiz.label Color of the quiz.
 * @apiParam  {String} quiz.description Description of the quiz.
 * @apiParam  {String} quiz.owner Owner of the quiz.
 * @apiParam  {String} quiz.title Title of the quiz.
 * @apiParam  {String} quiz.logo Logo of the quiz.
 * @apiParam  {Array} quiz.questions Questions of the quiz.
 * @apiParam  {Boolean} quiz.active Status of the quiz.
 * @apiSuccess  {Array} message Message from Parantion's backend.
 * @apiError (400) {String} message Bad Request
 */
router.put('/:quizId/edit', (req, rsp) => {
  let firstReady = false;
  let secondReady = false;
  const label = req.body.label;
  const description = req.body.description;
  const owner = req.body.owner;
  const title = req.body.title;
  const logo = req.body.logo;
  const questions = req.body.questions;
  const active = req.body.active;

  axios.put(`${baseUrl}/template/${req.params.quizId}`, {
    label: label,
    description: description,
    status: 'active'

  })
    .then((res1) => {
      if (secondReady) {
        rsp.json(res1.data);
      } else {
        firstReady = true;
      }
    }).catch((error) => {
      if (!secondReady) {
        rsp.status(400).json(error);
        firstReady = true;
      }
    });

  axios.put(`${baseUrl}/template/${req.params.quizId}/content`, {
    contenttype: 'JSON',
    content: JSON.stringify({
      owner: owner,
      title: title,
      logo: logo,
      questions: questions,
      active: active
    })

  })
    .then((res2) => {
      if (firstReady) {
        rsp.json(res2.data);
      } else {
        secondReady = true;
      }
    }).catch((error) => {
      if (!firstReady) {
        rsp.status(400).json(error);
        secondReady = true;
      }
    });
});

//edit quiz details
//COULD BE DELETED
router.put('/:quizId/content', (req, rsp) => {
  const owner = req.body.owner;
  const title = req.body.title;
  const logo = req.body.logo;
  const questions = req.body.questions;
  const active = req.body.active;

  const contentObject = {
    owner: owner,
    title: title,
    logo: logo,
    questions: questions,
    active: active
  };

  let wasGood = false;

  axios.put(`${baseUrl}/template/${req.params.quizId}/content`, {
    contenttype: 'JSON',
    content: JSON.stringify(contentObject)
  }).then((response) => {
    wasGood = true;
    rsp.status(200).send(response.data);
  }).catch((error) => {
    if (!wasGood) {
      rsp.status(400).json(error);
    }
  });
});

//update a quiz color and description

router.put('/:quizId', (req, rsp) => {
  axios.put(`${baseUrl}/template/${req.params.quizId}`, {

    label: req.body.label, //color
    description: req.body.description,
    status: 'active'


  }).then((response) => {
    rsp.json(response.data);
  }).catch((error) => {
    rsp.status(400).json(error);
  });
});

