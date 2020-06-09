let router = module.exports = require('express').Router();

// all the request for  here

router.use('/user', require('./users'));
router.use('/quizzes', require('./quizzes'));
router.use('/', require('./questions'));
router.use('/', require('./answers'));
