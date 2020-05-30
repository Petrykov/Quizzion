let router = module.exports = require('express').Router();
const axios = require('axios').default;

router.get('/quizzes/:quiz_id/questions', (req, rsp) => {

    axios.get()

    rsp.status(200).send("Back: " + req.params.quiz_id);
});
